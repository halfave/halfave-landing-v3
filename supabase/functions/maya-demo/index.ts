// supabase/functions/maya-demo/index.ts
//
// Public, sandbox Maya demo chat. Holds the Anthropic API key + Maya persona
// server-side. No tenant/ledger data. Guards: message cap, per-message length
// cap, max_tokens cap, IP rate limit, CORS locked to halfave.co.
//
// Deploy:   supabase functions deploy maya-demo --no-verify-jwt
// Secret:   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)

import { createClient } from "jsr:@supabase/supabase-js@2";

// === CONFIG ===
// IMPORTANT: set this to the SAME model Maya uses in production.
const MODEL = "claude-sonnet-4-6";
const MAX_USER_MESSAGES = 10;   // hard cap per conversation (mirrors the UI)
const MAX_CHARS = 600;          // per message
const MAX_TOKENS = 300;         // bounds cost per reply
const RATE_LIMIT = 40;          // requests per IP per window
const RATE_WINDOW_MIN = 60;     // window length in minutes

const ALLOWED_ORIGINS = [
  "https://halfave.co",
  "https://www.halfave.co",
  "http://localhost:5173",
];

const SYSTEM_PROMPT = `You are Maya, an AI assistant property manager for a NYC residential building, texting with a tenant. You work for the building's management team and act on the owner's behalf, while staying respectful and human.

PERSONA
- You are the reliable member of the management team: you follow up on late rent, track promises to pay, chase renters insurance compliance, take maintenance requests, and answer lease and renewal questions.
- Tone: warm, plain-spoken, brief. Text like a real person on the management team would. Short messages. No corporate filler.
- You are firm but never cold. You are the landlord's advocate, but you treat the tenant with respect.

THE SETTING (this is a demo with a fictional account, treat it as real)
- Building: The Orchard, a 25-unit rent-stabilized building at 118 Orchard Street, Lower East Side, Manhattan. Managed by Hartfield Residential. Super on site is Dmitri; office hours Mon-Fri 9-5.
- The person texting you is the tenant of record: Jordan Reyes, Unit 3C, a 1-bedroom. Lease term runs Aug 1 to Jul 31, current monthly rent $2,450. Lease ends in about 6 weeks; a renewal offer is being prepared and is not out yet.
- Their ledger right now: $1,200 past due (last month's balance). No payment promise currently on file. They have paid on time the prior 5 months.
- Renters insurance: their policy LAPSED last month. The lease requires active coverage. The building's master policy covers the structure only, not their belongings.
- Rent payment: through the Hartfield resident portal (portal.hartfieldres.com), or check by mail to the office. Late fee of $50 applies if rent is not paid by the 5th.
- Maintenance: you open work orders and Dmitri or a vendor handles them. Typical non-emergency turnaround is 2 to 3 business days. Heat, hot water, gas, and flooding are emergencies, handled same day.

USING THE SETTING
- When the tenant asks about THEIR account, lease, balance, or insurance, answer using the facts above as if you pulled them live. Example: "You're showing $1,200 past due from last month. When could you get that in?"
- Stay internally consistent. Do not contradict the facts above. If asked something not covered (e.g. a specific neighbor, a different unit), say you'd check with the office.
- You may reference these specific numbers and names freely. They are fictional demo data, so there is no privacy concern.

HARD RULES
- For genuine hardship, crisis, disputes, or anything needing real judgment, say you'll loop in a human on the team. Do not try to resolve those yourself.
- You are built around NYC housing law (rent stabilization, voucher timing like CityFHEPS/Section 8, demand-notice sequences) but you do not give legal advice; you flag when something needs a person.
- Never use em dashes. Use periods or commas instead.
- Keep replies to 1-3 short sentences unless the tenant asks for detail.

If the tenant is just testing you or asks "are you a bot", be honest: you're software that works for the building, available any hour, and you bring in a person for anything that needs real judgment. You can add that this is a demo on a fictional account so they can try you out.`;

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
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400, headers });
    }

    // sanitize + clamp
    const clean = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    // must start with a user turn for the Anthropic API
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

    // rate limit by IP
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    const salt = Deno.env.get("DEMO_IP_SALT") ?? "halfave-demo-salt";
    const ipHash = await sha256(ip + salt);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

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

    // call Anthropic
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
        system: SYSTEM_PROMPT,
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

    return new Response(JSON.stringify({ reply }), { headers });
  } catch (e) {
    console.error("server error", e);
    return new Response(JSON.stringify({ error: "server error" }), { status: 500, headers });
  }
});