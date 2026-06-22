// supabase/functions/maya-demo/index.ts
//
// Public Maya demo chat for the Half Ave marketing site.
//
// - Uses the PRODUCTION Maya prompt, loaded live from chatbot_config (id=1),
//   so it always tracks prod. Building name swapped to the demo building and a
//   fictional resident account appended.
// - Logs every exchange (what the visitor said + Maya's reply) to
//   maya_demo_messages, so you can see what people ask. No work orders, no
//   knowledge-gap writes, nothing touches live ops.
// - Guards: message cap, per-message length cap, max_tokens cap, IP rate
//   limit, CORS locked to halfave.co.
//
// Deploy:  supabase functions deploy maya-demo --no-verify-jwt
// Secret:  supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)

import { createClient } from "jsr:@supabase/supabase-js@2";

// === CONFIG ===
const MODEL = "claude-sonnet-4-6"; // set to the model Maya uses in production
const MAX_USER_MESSAGES = 10;      // hard cap per conversation (mirrors the UI)
const MAX_CHARS = 600;             // per message
const MAX_TOKENS = 320;            // bounds cost per reply
const RATE_LIMIT = 40;             // requests per IP per window
const RATE_WINDOW_MIN = 60;        // window length in minutes

const DEMO_BUILDING_NAME = "Milano Brooklyn";
const DEMO_UNIT = "3C";
const DEMO_RESIDENT = "Jordan Reyes";
const PROD_BUILDING_NAME = "The Astor"; // name in the production prompt, swapped out

const ALLOWED_ORIGINS = [
  "https://halfave.co",
  "https://www.halfave.co",
  "http://localhost:5173",
];

// Appended to the production prompt for the public demo only.
const DEMO_ADDENDUM = `

===== THIS IS A PUBLIC DEMO =====
You are running on the Half Ave marketing site so a prospective building owner can try you out. The resident account below is FICTIONAL demo data. Treat it as real and answer from it naturally. If someone directly asks whether this is a demo or whether you are automated, you may briefly confirm it is a live demo of Maya on a sample account, then keep helping in character. Do not volunteer that it is a demo otherwise.

===== THE FICTIONAL DEMO ACCOUNT (treat as real, you pulled it live) =====
- Building: ${DEMO_BUILDING_NAME}, a 25-unit rent-stabilized building at 440 Stuyvesant Avenue, Stuyvesant Heights, Brooklyn.
- Resident of record (the person texting you): ${DEMO_RESIDENT}, Unit ${DEMO_UNIT}, a 1-bedroom.
- Lease: runs Aug 1 to Jul 31, rent $2,450/month. Lease ends in about 6 weeks; a renewal offer is being prepared and is not out yet.
- Ledger: $1,200 past due from last month. No payment promise on file. Paid on time the prior 5 months.
- Renters insurance: their policy LAPSED last month. The lease requires active coverage. The building master policy covers the structure only, not their belongings.
- Rent payment: through the resident portal, or check by mail to the office.

===== BUILDING INFORMATION (answer directly from these facts) =====
- Address: 440 Stuyvesant Avenue, Stuyvesant Heights, Brooklyn. Closest trains are the A/C at Utica Avenue and the J at Halsey Street.
- Size: a small, walk-up-style boutique building, 25 units, 6 stories.
- Super: Marco, on site Monday through Friday. For after-hours emergencies (no heat or hot water, gas, flood, fire), residents call the 24/7 emergency line and 911 if it is life-safety.
- Elevator: yes, one elevator serving all floors.
- WiFi: there is no building-wide WiFi. Residents set up their own internet; the building is wired for Verizon Fios and Spectrum.
- Packages: there is no front desk or package room, so packages are left in the vestibule inside the locked first door. For anything valuable, residents can request signature on delivery or use a nearby parcel locker.
- Laundry: a small laundry room in the basement with two washers and two dryers, card-operated, open 6am to 11pm.
- Gym: the building does not have a gym.
- Lounge / common space: the building does not have a residents' lounge or roof deck.
- Pets: cats and dogs are allowed with management approval; there is a 2-pet limit per unit and a weight guideline of about 50 lbs per dog. Aggressive breeds are not permitted. There is no pet rent.
- Bike storage: yes, a small bike room in the basement, first come first served, free for residents.
- Trash and recycling: chute on each floor for trash; recycling bins are in the basement.
- Heat / hot water: building-provided, included in rent.
- Smoking: the building is smoke-free in all units and common areas.

When the resident asks about THEIR account, lease, balance, or insurance, answer from these facts as if pulled live. When they ask about the building (wifi, gym, packages, super, elevator, pets, laundry, bikes, trash), answer from the BUILDING INFORMATION above. For anything not covered here, hedge and say you'll check with the team.

===== DEMO OVERRIDE (this supersedes earlier rules) =====
For this demo only, the BUILDING INFORMATION and DEMO ACCOUNT sections above are your confirmed source of truth. You MAY state that the building does or does not have something when it is listed above (for example, you can say there is no gym, no lounge, and no building WiFi, because those are confirmed here). This overrides the general rule about not inferring absence from silence and the rule about escalating out-of-building questions, but ONLY for facts explicitly listed above. For anything genuinely not listed, still hedge and offer to check with the team.`;

// Fallback prompt if chatbot_config can't be read (keeps the demo alive).
const FALLBACK_PROMPT = `You are Maya, a warm, professional member of the property management team at ${DEMO_BUILDING_NAME}. Keep replies under 3 sentences, plain text, no markdown, no em dashes. For maintenance: acknowledge, ask one clarifying question if needed, confirm entry permission, then say you've logged the request (never promise a timeline). If you don't know something, say you'll check with the team and get back to them.` + DEMO_ADDENDUM;

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Cache the prod prompt in-instance so we don't hit the DB every message.
let cachedPrompt: string | null = null;
let cachedAt = 0;
async function getSystemPrompt(supabase: ReturnType<typeof createClient>): Promise<string> {
  const now = Date.now();
  if (cachedPrompt && now - cachedAt < 5 * 60 * 1000) return cachedPrompt;
  try {
    const { data } = await supabase
      .from("chatbot_config")
      .select("system_prompt, global_policies")
      .eq("id", 1)
      .single();
    if (data?.system_prompt) {
      let p = data.system_prompt as string;
      if (data.global_policies) p += "\n\n===== BUILDING & POLICY REFERENCE =====\n" + data.global_policies;
      p = p.split(PROD_BUILDING_NAME).join(DEMO_BUILDING_NAME);
      cachedPrompt = p + DEMO_ADDENDUM;
      cachedAt = now;
      return cachedPrompt;
    }
  } catch (e) {
    console.error("prompt load failed, using fallback", e);
  }
  return FALLBACK_PROMPT;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }

  try {
    const body = await req.json().catch(() => null);
    const messages = body?.messages;
    const sessionId: string = (body?.sessionId && String(body.sessionId).slice(0, 64)) || "anon";
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400, headers });
    }

    const clean = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
    while (clean.length && clean[0].role === "assistant") clean.shift();
    if (clean.length === 0) {
      return new Response(JSON.stringify({ error: "no messages" }), { status: 400, headers });
    }

    const userCount = clean.filter((m) => m.role === "user").length;
    if (userCount > MAX_USER_MESSAGES) {
      return new Response(JSON.stringify({
        reply: "That's the end of the preview. I cap it at 10 messages here. Book a call and I'll show you the real thing, live in your buildings.",
        capped: true,
      }), { headers });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // rate limit by IP
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    const salt = Deno.env.get("DEMO_IP_SALT") ?? "halfave-demo-salt";
    const ipHash = await sha256(ip + salt);
    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("maya_demo_usage")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if ((count ?? 0) >= RATE_LIMIT) {
      return new Response(JSON.stringify({
        reply: "Looks like you've put me through my paces. Book a call to see Maya live in your own buildings.",
        capped: true,
      }), { headers });
    }
    await supabase.from("maya_demo_usage").insert({ ip_hash: ipHash });

    const systemPrompt = await getSystemPrompt(supabase);

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY")!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: clean,
      }),
    });

    if (!resp.ok) {
      console.error("anthropic error", resp.status, await resp.text());
      return new Response(JSON.stringify({ error: "model error" }), { status: 502, headers });
    }

    const data = await resp.json();
    const reply = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim() || "Sorry, I didn't catch that. Could you say it another way?";

    // Log what the visitor said and what Maya replied. Best effort, never blocks the reply.
    const lastUser = [...clean].reverse().find((m) => m.role === "user")?.content ?? "";
    supabase.from("maya_demo_messages").insert({
      session_id: sessionId,
      user_message: lastUser,
      maya_reply: reply,
    }).then(({ error }: { error: unknown }) => { if (error) console.error("log insert", error); });

    return new Response(JSON.stringify({ reply }), { headers });
  } catch (e) {
    console.error("server error", e);
    return new Response(JSON.stringify({ error: "server error" }), { status: 500, headers });
  }
});