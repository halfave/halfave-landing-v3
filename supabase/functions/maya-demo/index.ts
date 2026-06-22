// supabase/functions/maya-demo/index.ts
//
// Public Maya demo chat for the Half Ave marketing site.
//
// - Uses the PRODUCTION Maya prompt, loaded live from chatbot_config (id=1),
//   so it always tracks prod. The building name is swapped to the demo
//   building and a fictional resident account is appended.
// - Demo conversations generate REAL artifacts, but quarantined to the demo
//   building (id 9001, archived) and tagged source='public_demo':
//     * maintenance flow that completes -> work_orders row
//     * Maya hits a knowledge gap        -> knowledge_gaps row
//   So you can review what people ask and Maya gets smarter, with zero
//   contamination of live operational queues.
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

const DEMO_BUILDING_ID = 9001;     // Milano Brooklyn (archived demo building)
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
- Building: ${DEMO_BUILDING_NAME}, a 25-unit rent-stabilized building at 215 Court Street, Brooklyn.
- Resident of record (the person texting you): ${DEMO_RESIDENT}, Unit ${DEMO_UNIT}, a 1-bedroom.
- Lease: runs Aug 1 to Jul 31, rent $2,450/month. Lease ends in about 6 weeks; a renewal offer is being prepared and is not out yet.
- Ledger: $1,200 past due from last month. No payment promise on file. Paid on time the prior 5 months.
- Renters insurance: their policy LAPSED last month. The lease requires active coverage. The building master policy covers the structure only, not their belongings.
- Rent payment: through the resident portal, or check by mail to the office.
When the resident asks about THEIR account, lease, balance, or insurance, answer from these facts as if pulled live. For anything not covered here, hedge and say you'll check with the team.

===== MACHINE TAGS (DEMO ONLY, INTERNAL) =====
At the very END of your reply, when one of these is true, append exactly one tag on its own line. The tag is stripped before the resident sees it, so never reference it.
- If you have just told the resident you logged or opened a maintenance work order, append: [[WORKORDER: short issue summary | category | priority(low|medium|high)]]
- If you are hedging because you do not know the answer (saying you'll check with the team and get back to them), append: [[KNOWLEDGEGAP: short topic summary]]
Only append a tag when it genuinely applies to THIS reply. Never append more than one. Never explain the tag.`;

// Fallback prompt if chatbot_config can't be read (keeps the demo alive).
const FALLBACK_PROMPT = `You are Maya, a warm, professional member of the property management team at ${DEMO_BUILDING_NAME}. Keep replies under 3 sentences, plain text, no markdown, no em dashes. For maintenance: acknowledge, ask one clarifying question if needed, confirm entry permission, then say you've logged the work order (never promise a timeline). If you don't know something, say you'll check with the team and get back to them.` + DEMO_ADDENDUM;

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

// Pull a [[TAG: ...]] off the end of Maya's reply. Returns cleaned reply + parsed tag.
function extractTag(reply: string): { clean: string; workorder?: string[]; gap?: string } {
  const woMatch = reply.match(/\[\[WORKORDER:\s*([^\]]+)\]\]/i);
  const kgMatch = reply.match(/\[\[KNOWLEDGEGAP:\s*([^\]]+)\]\]/i);
  const clean = reply
    .replace(/\[\[WORKORDER:[^\]]*\]\]/ig, "")
    .replace(/\[\[KNOWLEDGEGAP:[^\]]*\]\]/ig, "")
    .trim();
  const out: { clean: string; workorder?: string[]; gap?: string } = { clean };
  if (woMatch) out.workorder = woMatch[1].split("|").map((s) => s.trim());
  if (kgMatch) out.gap = kgMatch[1].trim();
  return out;
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
    const rawText = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim() || "Sorry, I didn't catch that. Could you say it another way?";

    const { clean: reply, workorder, gap } = extractTag(rawText);
    const lastUser = [...clean].reverse().find((m) => m.role === "user")?.content ?? "";

    // Write demo artifacts, quarantined to the demo building. Best effort.
    if (workorder) {
      const [issue, category, priority] = workorder;
      supabase.from("work_orders").insert({
        building_id: DEMO_BUILDING_ID,
        unit_number: DEMO_UNIT,
        tenant_name: DEMO_RESIDENT,
        issue: issue || "Demo maintenance request",
        description: lastUser,
        category: category || null,
        priority: (priority || "medium").toLowerCase(),
        status: "open",
        caller: DEMO_RESIDENT,
        source: "public_demo",
        source_id: sessionId,
        called_date: new Date().toISOString().slice(0, 10),
      }).then(({ error }: { error: unknown }) => { if (error) console.error("work_order insert", error); });
    }
    if (gap) {
      supabase.from("knowledge_gaps").insert({
        resident_message: lastUser,
        maya_holding_response: reply,
        phone_from: "demo:" + sessionId,
        phone_to: "demo",
        building_id: DEMO_BUILDING_ID,
        building_name: DEMO_BUILDING_NAME,
        resident_name: DEMO_RESIDENT,
        unit_number: DEMO_UNIT,
        gap_type: "demo",
        topic_summary: gap,
        status: "pending",
      }).then(({ error }: { error: unknown }) => { if (error) console.error("knowledge_gap insert", error); });
    }

    return new Response(JSON.stringify({ reply }), { headers });
  } catch (e) {
    console.error("server error", e);
    return new Response(JSON.stringify({ error: "server error" }), { status: 500, headers });
  }
});