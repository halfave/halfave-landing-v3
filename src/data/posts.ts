// src/data/posts.ts
// Blog content lives here. Each post renders at /blog/:slug and is listed at /blog.
// Body is an ordered list of blocks so we can render headings, paragraphs, and lists
// without dangerouslySetInnerHTML.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

export interface Post {
  slug: string
  title: string
  // Short meta description for <meta name="description"> and the index card.
  description: string
  // ISO date, used for <time> and Article schema.
  date: string
  // Reading-time label, e.g. "5 min read"
  readingTime: string
  // Optional eyebrow/category label
  category: string
  body: Block[]
}

export const POSTS: Post[] = [
  {
    slug: 'i-watched-100-conversations-ai-property-manager',
    title: "I Watched Over 100 Conversations Between Tenants and an AI Property Manager. Here's What I Learned.",
    description:
      'After reading 100+ real tenant conversations handled by an AI, the lesson was clear: an assistant property manager is the opposite of a chatbot. It reaches out first, carries the relentless 80%, and knows exactly where to hand off to a human.',
    date: '2026-06-22',
    readingTime: '6 min read',
    category: 'Field notes',
    body: [
      { type: 'p', text: 'I run my own buildings, and for the last few months an AI has been handling the tenant messaging — arrears, insurance, maintenance intake. So I went back and read the transcripts. Over 100 real conversations, across nearly 200 residents, every one of them with money or compliance on the line.' },
      { type: 'p', text: 'I expected to be grading a chatbot. I wasn\u2019t. What I was actually looking at was something closer to an assistant property manager, and the difference turned out to be the whole story.' },
      { type: 'p', text: 'Here\u2019s what I took away.' },

      { type: 'h2', text: '1. It\u2019s not a chatbot. The functionality is the opposite.' },
      { type: 'p', text: 'A chatbot is the help widget in the corner of a website. It waits for you. You have a question, you open it, it answers, it closes. It\u2019s reactive by design — its entire job is to be there when you come looking. Order status, password reset, return policy. The product already works; the bot mops up the tail.' },
      { type: 'p', text: 'An assistant property manager does the inverse. It doesn\u2019t wait for the tenant to show up with a problem. It does the actual recurring work of running a building, and most of that work is outbound.' },
      { type: 'p', text: 'The clearest signal was in the message log itself: it sent more messages than it received. Roughly 950 outbound to 590 inbound. It starts most of the conversations. A chatbot can\u2019t do that — it has nothing to say until spoken to. This thing texts the resident first, because chasing rent and lapsed insurance is something you initiate, not something you wait around to be asked about.' },
      { type: 'p', text: 'That one fact reframes everything. The tenant isn\u2019t opening a support ticket. The tenant is responding to a property manager who reached out first — it just happens to be software.' },

      { type: 'h2', text: '2. What it\u2019s genuinely good at: the 80% that grinds people down' },
      { type: 'p', text: 'The work that filled these transcripts is the work that eats a property manager\u2019s entire day:' },
      { type: 'ul', items: [
        'Reaching every delinquent resident, every cycle, and running the demand sequence correctly each time',
        'Following up on renters insurance — chasing lapses, confirming coverage, logging it',
        'Taking maintenance requests as they come in, day or night',
        'Tracking who promised to pay what, and whether it actually landed',
      ] },
      { type: 'p', text: 'None of this is hard in the sense of being clever. It\u2019s hard in the sense of being relentless, high-volume, and unforgiving on timing. It is exactly the kind of thing that drowns a person and that a person, frankly, is wasted on.' },
      { type: 'p', text: 'This is where the AI shines. It doesn\u2019t get tired on the fortieth arrears message. It doesn\u2019t forget to follow up. It doesn\u2019t skip the resident nobody wants to call. Across 100+ conversations, the routine middle of the job ran without anyone having to touch it. That\u2019s the 80%, and handing it off is the entire point.' },

      { type: 'h2', text: '3. What it\u2019s not good at — and this matters more than the wins' },
      { type: 'p', text: 'If I only told you what worked, I\u2019d be selling you a chatbot demo. So here\u2019s the honest other half.' },
      { type: 'p', text: 'The AI is good until the conversation stops being routine. The moment a case needs judgment instead of a rule, it should stop and hand the resident to a human — and the system is built so it does:' },
      { type: 'ul', items: [
        'A resident in genuine crisis, where the right response is a conversation, not the next step in a sequence',
        'A legal gray area where the regulation doesn\u2019t cleanly apply',
        'A voucher or subsidy timing question where the answer is \u201cit depends,\u201d and someone has to decide what it depends on',
        'Anything where the correct move isn\u2019t follow the rule, it\u2019s decide what the rule should be here',
      ] },
      { type: 'p', text: 'That last 20% is the human\u2019s job, and trying to automate it is how you get a viral screenshot of a bot saying something stupid to someone who\u2019s struggling. The skill isn\u2019t doing everything. It\u2019s knowing precisely where to stop and escalate.' },
      { type: 'p', text: 'The other thing it\u2019s not good at: pretending. The stakes here aren\u2019t a wrong return policy. A botched demand sequence or a mistimed compliance notice is a legal liability, not an annoyance. So the rules that carry weight can\u2019t live in a friendly prompt and good vibes — they have to be hard-coded, the same every time. \u201cSounds helpful\u201d is the easy part. \u201cIs correct about regulated, jurisdiction-specific work, every single time, unsupervised\u201d is the actual product.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'A chatbot answers the question after the work is already done. It\u2019s reactive, it serves the tail, and it\u2019s measured by how few humans it pulls in.' },
      { type: 'p', text: 'An assistant property manager does the work. It reaches out first, carries the repetitive 80% that grinds people down, and hands the human the 20% that actually needs a person.' },
      { type: 'p', text: 'Same letters — \u201cAI\u201d — completely different machine. After 100+ conversations, the cleanest way I can put it: a chatbot is the last mile. This is the first eighty.' },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
