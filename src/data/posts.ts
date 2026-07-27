// src/data/posts.ts
// Blog content lives here. Each post renders at /blog/:slug and is listed at /blog.
// Body is an ordered list of blocks so we can render headings, paragraphs, and lists
// without dangerouslySetInnerHTML.

// Inline runs, used by the 'rich' block. A plain string is literal text;
// an object can mark it italic and/or turn it into a link.
export type Span =
  | string
  | { text: string; em?: boolean; strong?: boolean; href?: string }

export type Block =
  | { type: 'p'; text: string; spans?: Span[] }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'transcript'; turns: { speaker: string; text: string }[] }
  | { type: 'cta'; label: string; href: string }

export interface Post {
  slug: string
  title: string
  // Optional <title> override. Keep under 60 chars so it survives SERP truncation.
  // Falls back to `title` when absent.
  seoTitle?: string
  // Short meta description for <meta name="description"> and the index card.
  description: string
  // ISO date, used for <time> and Article schema.
  date: string
  // ISO date of last substantive revision. Feeds schema dateModified.
  updated?: string
  // Reading-time label, e.g. "5 min read"
  readingTime: string
  // Optional eyebrow/category label
  category: string
  body: Block[]
}

export const POSTS: Post[] = [
  {
    slug: 'why-property-managers-dont-respond',
    title: 'Why Property Managers Never Respond',
    description:
      'A 24-to-48hr reply time and 9-5 office hours are the property management standard. Here is the opportunity that creates.',
    date: '2026-02-18',
    readingTime: '5 min read',
    category: 'Property management',
    body: [
      { type: 'p', text: 'Two guys are chatting in the hallway. \u201cThe elevator is still broken. I emailed Jamie and she didn\u2019t respond,\u201d one says. \u201cDude, I\u2019m still waiting on her to respond to my email from last May,\u201d the other replies.' },

      { type: 'h2', text: 'A 24-48 hour reply window is a promise that has already failed' },
      { type: 'p', text: 'Open almost any tenant handbook and you\u2019ll find some version of the same sentence: Non-emergency requests will be answered within 24 to 48 hours.' },
      { type: 'p', text: 'Two days to get a confirmation that you exist! Not the repair. Not the schedule. Just somebody saying, we got your message. And do not forget that the 24 to 48 hours de facto applies only to business days.' },
      { type: 'p', text: 'Now let us do a little math. A nine-to-five, Monday-through-Friday office is reachable for 40 of the 168 hours in a week. That is 23.8 percent. For the other 128 hours, meaning most of your tenant\u2019s actual life inside your building, the default answer to every question is silence.' },
      { type: 'p', text: 'I hereby coin a phrase: The 23.8% Building.' },
      { type: 'p', text: 'A promise of 24-48 hour responses across just 23.8% of the week is doomed from the moment it enters the world.' },
      { type: 'p', text: 'Think of the friend who says, \u201cI\u2019ll try my best to be there!\u201d We all know what that means. They won\u2019t be there.' },
      { type: 'p', text: 'A promise designed to lower expectations should be interpreted exactly that way.' },
      { type: 'p', text: 'And sure enough, 24-48 hours quietly stretches into days, then weeks, until not responding becomes normal.' },

      { type: 'h2', text: 'So what is actually broken?' },
      { type: 'p', text: 'So why does this happen?' },
      { type: 'p', text: 'Whenever someone doesn\u2019t do the thing, there are generally only three explanations:' },
      { type: 'ul', items: [
        '🧠 They didn\u2019t have the knowledge.',
        '🔑 They didn\u2019t have the authority.',
        '🔥 They didn\u2019t have the motivation.',
      ] },
      { type: 'p',
        text: 'Property management isn\u2019t rocket science, and most day-to-day decisions aren\u2019t gated behind approvals. More often than not, it comes down to motivation.',
        spans: [
        'Property management isn\u2019t rocket science, and most day-to-day decisions aren\u2019t gated behind approvals. More often than not, it comes down to ',
        { text: 'motivation', em: true },
        '.',
        ],
      },

      { type: 'h2', text: '1. Squeakiest wheel gets the grease' },
      { type: 'p', text: 'Jamie is wearing six hats before lunch. She has a police report to file after a big security incident, while a lease renewal email sits in her inbox. Guess which one gets answered first?' },
      { type: 'p', text: 'That is a completely rational choice, by the way. Property managers routinely spend their entire day making triage decisions. Every hour becomes a question of, \u201cWhat\u2019s on fire?\u201d' },
      { type: 'p', text: 'Fortunately your lease renewal isn\u2019t on fire. So you wait. And while you\u2019re waiting, others are sending angry follow ups. The tenant who calls five times gets a response before the tenant who patiently waits. The emergency jumps ahead of the lease renewal. Multiply that by every day of the year and eventually even the simplest questions become frustrating experiences.' },

      { type: 'h2', text: '2. The work is genuinely draining' },
      { type: 'p', text: 'Here is the thing nobody says out loud: absorbing other people\u2019s problems for eight hours a day is exhausting. Property management is administrative, repetitive, and emotionally heavy in a way that quietly wears people down. Worse, it\u2019s a job where solving one problem means solving hundreds of smaller problems.' },
      { type: 'p', text: 'A tenant asks one simple question about her rent. Answering it honestly means pulling the ledger, matching payments against charges, finding the month somebody applied a credit incorrectly, checking whether the late fee was waived, and reassembling the whole puzzle before you can type a single sentence back.' },
      { type: 'p', text: 'That\u2019s forty minutes of detective work hiding behind a two-line reply.' },
      { type: 'p', text: 'Suddenly, \u201cI\u2019ll answer that after lunch\u201d turns into tomorrow.' },

      { type: 'h2', text: '3. No incentive to excel' },
      { type: 'p', text: 'This is the subtle one, and I think it is the most important of the three.' },
      { type: 'p', text: 'When you fail to respond, no alarm sounds. No system flags it. Nobody walks into your office. The message just sits there, the day moves on, and by Thursday it has scrolled off the screen entirely.' },
      { type: 'p', text: 'The same thing applies when you respond right away after-hours and with bright helpful energy. Your boss doesn\u2019t congratulate you. Only one person ever sees it. You start wondering \u201cwhy even try?\u201d.' },
      { type: 'p', text: 'People respond to incentives. Yet most property management companies neither reward exceptional responsiveness nor measure it consistently.' },

      { type: 'h2', text: 'How to Fix This Issue' },
      { type: 'p', text: 'The first step is cultural. Set expectations that encourage people to go above and beyond, not just do the bare minimum. Recognize great service. Measure response times. Survey your tenants regularly.' },
      { type: 'p', text: 'Every good property management company should do those things.' },
      { type: 'p', text: 'But culture alone isn\u2019t enough. People still get overwhelmed. Emergencies still happen. The squeakiest wheel will always get the grease.' },
      { type: 'p', text: 'So we added a fail-safe.' },
      { type: 'p', text: 'We built Maya, an AI property manager that serves as the first point of contact for every tenant. Her job is simple: make sure nobody is ever met with silence.' },
      { type: 'p', text: 'A tenant sends a text and gets a real answer in about six seconds, whether that\u2019s at two in the afternoon, or eleven on Sunday night. Maya responds with the same empathy and attention whether the tenant is polite, frustrated, or furious. She doesn\u2019t get tired, she doesn\u2019t get distracted by emergencies, and she doesn\u2019t need incentives to perform consistently.' },
      { type: 'p',
        text: 'Now, you are probably skeptical that software can handle a real conversation. I would be too. So rather than argue, we published the transcripts. Go read them and judge for yourself.',
        spans: [
          'Now, you are probably skeptical that software can handle a real conversation. I would be too. So rather than argue, we published the transcripts. ',
          { text: 'Go read them', href: '/#conversations' },
          ' and judge for yourself.',
        ],
      },
      { type: 'cta', label: 'Read the transcripts', href: '/#conversations' },
      { type: 'p',
        text: 'Ask yourself this: do tenants care if they\u2019re speaking to Jamie from property management or Justin from leasing? They want an answer, and everything else is a detail. The guy with the broken elevator wants to know when it will be fixed. He is not conducting a Turing test.',
        spans: [
        'Ask yourself this: do tenants care if they\u2019re speaking to Jamie from property management or Justin from leasing? They want an answer, and everything else is a detail. The guy with the broken elevator wants to know when it will be fixed. He is not conducting a ',
        { text: 'Turing test', href: 'https://en.wikipedia.org/wiki/Turing_test' },
        '.',
        ],
      },
      { type: 'p', text: 'Which makes this a rare thing in business, an honest win on both sides. The tenant stops living in silence. You get your hours back, so when something genuinely needs a human, a hardship case, a dispute, a real judgment call, there is one available with the time to do it properly.' },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'Why doesn\u2019t my property manager respond to me?' },
      { type: 'p', text: 'Usually it is nothing personal. Your manager splits attention across many buildings, so smaller questions lose to bigger emergencies every time. The work is draining, and a simple-looking question often takes real digging to answer. And nothing happens when a message goes unanswered, so it quietly drops off the list.' },

      { type: 'h2', text: 'What is a normal property management response time?' },
      { type: 'p', text: 'Most companies publish 24 to 48 hours for non-emergency requests, and many staff their phones only Monday through Friday during business hours. A message sent Friday evening may sit until Monday or Tuesday.' },

      { type: 'h2', text: 'What can a landlord do about slow response times?' },
      { type: 'p',
        text: 'Measure first: time to first response, plus the share of conversations that ever got a second follow-up. Most owners find the real gap is the follow-up. From there your options are extending coverage, cutting units per manager, or putting a virtual property manager at level one so routine questions get answered immediately.',
        spans: [
        'Measure first: time to first response, plus the share of conversations that ever got a second follow-up. Most owners find the real gap is the follow-up. From there your options are extending coverage, cutting units per manager, or putting a ',
        { text: 'virtual property manager', href: '/blog/what-is-a-virtual-property-manager' },
        ' at level one so routine questions get answered immediately.',
        ],
      },
    ],
  },

  {
    slug: 'self-manage-vs-property-management-company',
    title: 'Should I Self-Manage My Property?',
    seoTitle: 'Should I Self-Manage My NYC Rental Property?',
    description:
      'What a NYC management company actually costs, what the fee quietly excludes, and why the model is built to work at a scale where service falls apart.',
    date: '2026-06-04',
    readingTime: '6 min read',
    category: 'Property management',
    body: [
      { type: 'p', text: 'If you own a rental building in Queens, Brooklyn, the Bronx, Staten Island, or Manhattan, you have asked yourself this question at least once. Why pay for something you could do yourself?' },

      { type: 'h2', text: 'How much does a property management company cost?' },
      { type: 'p', text: 'Anywhere from 1.5% to 10% of gross income, depending on your portfolio size.' },
      { type: 'p',
        text: 'A large portfolio, several hundred units under one owner, can negotiate down toward 1.5% to 3%. A six-unit walk-up in Astoria or a two-family in Ridgewood is paying at the top of that range, often 8% to 10%, because the building generates too little revenue to interest anyone at a lower number. We break the local numbers down further in our guide to NYC property management fees.',
        spans: [
          'A large portfolio, several hundred units under one owner, can negotiate down toward 1.5% to 3%. A six-unit walk-up in Astoria or a two-family in Ridgewood is paying at the top of that range, often 8% to 10%, because the building generates too little revenue to interest anyone at a lower number. We break the local numbers down further in our guide to ',
          { text: 'NYC property management fees', href: '/blog/property-management-fees-nyc' },
          '.',
        ],
      },

      { type: 'h2', text: 'How the arrangement actually works' },
      { type: 'p', text: 'The management company opens an operating account for your building. Rent collects into that account. Expenses get disbursed out of it: payroll, utilities, repairs, vendors, insurance. You receive a monthly statement and, when there is money left, a distribution.' },
      { type: 'p', text: 'Which means your cash sits in an account you do not control, moved by people you did not hire, and you learn what happened weeks after it happened. Hold that thought.' },

      { type: 'h2', text: 'What the management fee includes' },
      { type: 'ul', items: [
        '👷 Building staff: hiring, supervising, and managing the super and porters. Payroll itself comes out of the operating account as an operating expense.',
        '💬 Tenant communications and maintenance intake',
        '💵 Rent collection and arrears follow-up',
        '🚨 Violations: tracking, correcting, and certifying with HPD, DOB, and OATH',
        '📅 Compliance filings and the annual deadline calendar',
        '🕓 Payroll administration and time cards for building staff',
        '💻 Property management software and the bookkeeping that runs on it',
      ] },

      { type: 'h2', text: 'What the fee does not include' },
      { type: 'p', text: 'This is the part that surprises owners, usually in year two.' },
      { type: 'ul', items: [
        '📄 Owner filings such as RPIE, the Real Property Income and Expense statement the Department of Finance requires annually',
        '🧾 Your tax return, and anything your accountant needs assembled',
        '🏷️ Re-leasing and marketing vacant units, which is billed separately',
      ] },
      { type: 'p', text: 'And these are commonly billed separately and marked up, which is to say they are a profit center rather than a cost:' },
      { type: 'ul', items: [
        '🔨 Unit turnovers',
        '📝 Lease renewals',
        '📬 Annual safety notices',
      ] },
      { type: 'p', text: 'Management companies routinely mark down the headline fee and make the difference back in ancillary fees and vendor arrangements. Many of the large firms operate an insurance arm under the same parent company, then collect broker fees on policies placed through that affiliate. The number you negotiated is rarely the number you pay.' },

      { type: 'h2', text: 'Why the model breaks' },
      { type: 'p', text: 'The structural problem has nothing to do with any one firm.' },
      { type: 'p', text: 'Management is a thin-margin service business. Run the numbers at the typical fee for each portfolio size, assuming an NYC average rent of $2,500 a unit:' },
      { type: 'ul', items: [
        '20 units at 7%: $600,000 gross, so $42,000 a year to the management company, or $175 per unit per month',
        '50 units at 5%: $1.5M gross, so $75,000 a year, or $125 per unit per month',
        '100 units at 3%: $3M gross, so $90,000 a year, or $75 per unit per month',
        '200 units at 2.5%: $6M gross, so $150,000 a year, or $62.50 per unit per month',
      ] },
      { type: 'p', text: 'Look at the top line. A 20-unit building generates $42,000 a year in total revenue for the firm managing it. That does not cover one salary, let alone a manager + admin staff + software + office + profit. Your building cannot possibly be somebody\u2019s full-time job, because your building does not pay for one. Meanwhile, $150,000 a year is more than enough for one full-time staffer, but the staffer you get is likely assigned to at least a half-dozen other properties.' },
      { type: 'p', text: 'Besides adding more units, the other way for management companies to make money is minimizing the main expense: headcount. Every firm is therefore pushed toward increasing the number of units one manager can carry.' },
      { type: 'p', text: 'The model is designed to work at scale, and service fundamentally deteriorates at scale. Look at the largest names in New York City and the pattern is visible in public. AKAM and FirstService Residential are two of the biggest firms operating in the Big Apple. Look either one up on public review platforms and the picture is not flattering.' },
      { type: 'p',
        text: 'I have watched a version of this up close. A well-regarded management company was fired from a rental building where arrears had gotten out of control. During the handover, they found CityFHEPS checks sitting uncashed for over five months. Not disputed, not appealed. Just never deposited. The void-after date is printed on the face of those checks and it is 90 days, so the owner had to go back to the government and have every one of them reissued.',
        spans: [
          'I have watched a version of this up close. A well-regarded management company was fired from a rental building where arrears had gotten out of control. During the handover, they found ',
          { text: 'CityFHEPS', href: '/blog/cityfheps-landlord-guide' },
          ' checks sitting uncashed for over five months. Not disputed, not appealed. Just never deposited. The void-after date is printed on the face of those checks and it is 90 days, so the owner had to go back to the government and have every one of them reissued.',
        ],
      },
      { type: 'p', text: 'That is what a thin margin buys you at scale, from one of the \u201cbest\u201d in the industry.' },

      { type: 'h2', text: 'So why do owners hire out anyway?' },
      { type: 'p', text: 'Two honest reasons, and both deserve respect.' },
      { type: 'p', text: 'The first is staffing. Self-managing sounds like a decision until you realize it is a hiring problem. Somebody has to answer tenants, chase rent, coordinate the plumber, and run payroll for the super. Most owners of a Queens rental building or a Bed-Stuy brownstone do not have that team and do not want to build one from scratch.' },
      { type: 'p', text: 'The second is compliance knowledge. New York is hard. Local Law 1 lead notices go out between January 1 and January 16. Local Law 55 inspections, annual HPD registration, boiler and elevator filings through DOB NOW, Local Law 152 gas piping, facade cycles, bedbug reporting, window guard notices. Miss one and the penalty dwarfs the filing fee that would have prevented it.' },

      { type: 'h2', text: 'Why you should self-manage anyway' },
      { type: 'p',
        text: 'The golden rule is this. No one will ever care about your building as much as you do. It\u2019s for this reason that the advantages of self-management usually outweigh the costs.',
        spans: [
          'The golden rule is this. No one will ever care about your building as much as ',
          { text: 'you', em: true },
          ' do. It\u2019s for this reason that the advantages of self-management usually outweigh the costs.',
        ],
      },
      { type: 'p', text: '1. Quality. Your name is on the building, and you can enforce a higher standard than any contract can or will. You have complete control over the reputation of a 30-year asset.' },
      { type: 'p',
        text: '2. Visibility while problems are still small. Arrears noticed in week one usually end in a payment plan. Arrears noticed in month three end in housing court. A violation caught the day it is issued is a repair; the same violation caught after the correction window is a penalty. Early information is worth more than expertise applied late.',
        spans: [
          '2. Visibility while problems are still small. ',
          { text: 'Arrears noticed in week one', href: '/blog/why-property-managers-dont-respond' },
          ' usually end in a payment plan. Arrears noticed in month three end in housing court. A violation caught the day it is issued is a repair; the same violation caught after the correction window is a penalty. Early information is worth more than expertise applied late.',
        ],
      },
      { type: 'p', text: '3. Building your own team. Once you have a super and a handyman you trust, you own that relationship rather than renting it from an agent who may reassign them next quarter. The same applies to all your vendor and tenant relationships. Being the person who dispenses the money gives you enormous leverage that you should not readily give up.' },
      { type: 'p', text: '4. Controlling costs. In addition to controlling spend, managing in house gives you the ability to shift where the spend comes from. You control whether renewals, turnovers, or filing fees are a management expense or an operating expense on your P&L.' },

      { type: 'h2', text: 'What makes self-managing practical now' },
      { type: 'p', text: 'The two obstacles above, staffing and compliance knowledge, were genuine blockers for a long time. They are what Half Ave was built to remove.' },
      { type: 'p', text: 'We plug into whatever property management software you already use, so this is not a migration project or a rip and replace.' },
      { type: 'p', text: '📅 The compliance module tells you exactly what is due when, per building. Not a generic checklist. Your buildings, your deadlines, in order.' },
      { type: 'p', text: '🚨 The violations module pulls in new violations every day, so you learn about an HPD or DOB issue while the correction window is still open rather than when the penalty arrives.' },
      { type: 'p',
        text: '💬 And Maya, our AI property manager, handles tenant communication and arrears follow-up: answering residents in about six seconds at any hour, chasing every promise to pay, and escalating to you when something actually needs a decision.',
        spans: [
          '💬 And Maya, our ',
          { text: 'AI property manager', href: '/blog/what-is-a-virtual-property-manager' },
          ', handles tenant communication and arrears follow-up: answering residents in about six seconds at any hour, chasing every promise to pay, and escalating to you when something actually needs a decision.',
        ],
      },
      { type: 'p', text: 'None of that makes you a management company. It removes the reason you needed one.' },
      { type: 'cta', label: 'See Maya in real conversations', href: '/#conversations' },

      { type: 'p',
        text: 'Already decided? This is how to fire your management company without wrecking your building, including the data migration almost nobody plans for.',
        spans: [
          'Already decided? This is ',
          { text: 'how to fire your management company', href: '/blog/how-to-fire-your-property-management-company' },
          ' without wrecking your building, including the data migration almost nobody plans for.',
        ],
      },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'Should I self-manage my rental property in NYC?' },
      { type: 'p', text: 'If your building is local and your main obstacles are coverage and compliance tracking, self-managing usually wins. You keep the 1.5% to 10% of gross income, you see problems while they are still small, and you control vendor costs directly. Hiring out makes more sense if you live far from the property, have no local presence, or simply prefer not to be involved in operations.' },

      { type: 'h2', text: 'How much do property management companies charge in NYC?' },
      { type: 'p', text: 'Between roughly 1.5% and 10% of gross income, driven mostly by scale. Large portfolios negotiate toward the low end; small buildings in Queens, Brooklyn, or the Bronx typically pay 8% to 10% because the revenue per building is too small to justify a lower rate. Re-leasing, turnover, and owner filings such as RPIE usually sit outside that fee.' },

      { type: 'h2', text: 'What does a property management fee actually cover?' },
      { type: 'p', text: 'Typically building staff supervision, tenant communications, rent collection, violation tracking and certification, compliance filings, payroll and time cards for building staff, and the property management software and bookkeeping. It generally excludes owner filings like RPIE, your tax return, re-leasing and marketing, and turnover work.' },

      { type: 'h2', text: 'Can I self-manage without a full-time team?' },
      { type: 'p', text: 'Yes, and that is the change worth understanding. The two historic blockers were staffing and compliance knowledge. Software now covers the compliance calendar per building, pulls new violations daily, and handles routine tenant communication and arrears follow-up, which leaves the owner with judgment calls and a super rather than an entire back office.' },
    ],
  },

  {
    slug: 'how-to-fire-your-property-management-company',
    title: 'How to Fire Your Property Management Company',
    description:
      'The contract, the handover list, and the data migration almost nobody plans for. Notes from overseeing two management transitions and several software migrations.',
    date: '2026-07-09',
    readingTime: '6 min read',
    category: 'Property management',
    body: [
      { type: 'p', text: 'I have overseen two management company transitions and several property management software migrations. The transitions were harder, and not for the reason anybody expects.' },
      { type: 'p', text: 'Everyone plans for the awkward conversation. Almost nobody plans for the data.' },
      { type: 'p', text: 'What to know before you pull the plug.' },

      { type: 'h2', text: '1. Read the contract carefully, and know your rights' },
      { type: 'p', text: 'Management agreements are drafted by management companies, which tells you most of what you need. Find four things before you say a word to anyone.' },
      { type: 'ul', items: [
        '📆 The termination clause and notice period. Thirty days is common and fair. Sixty or ninety is common and worth negotiating out of your next agreement.',
        '💸 Any early termination fee, and whether it is tied to the remaining term. That number can be startling.',
        '⚖️ Whether termination requires cause, or whether you may terminate for convenience. If yours requires cause, document everything before you notify.',
        '🧾 Any post-termination commission. Some agreements claim leasing fees on tenants they placed even after the relationship ends. Read that paragraph twice.',
      ] },
      { type: 'p', text: 'Send notice in writing, by the delivery method the contract specifies, and keep proof. This is a business divorce and it should leave a paper trail.' },

      { type: 'h2', text: '2. Write the handover list, then schedule a weekly call' },
      { type: 'p', text: 'Put the full list in the termination letter with a deadline. Do not ask for it piecemeal, because the company that was slow to return your calls will not be fast to assemble a package.' },
      { type: 'ul', items: [
        '🏦 Security deposits, transferred with a per-tenant accounting and the bank records showing where they have been held.',
        '📄 Every executed lease and rider, including renewals and any side agreements.',
        '📊 The full rent ledger per unit, with balance history rather than only the current number.',
        '🔧 Every open maintenance request and its status.',
        '🚨 All open violations across HPD, DOB, and OATH, with what has been certified and what has not.',
        '📅 Compliance records: annual notice mailings, inspection documentation, registrations, and filings.',
        '👷 Vendor list with contacts, plus warranty documentation on recent work.',
        '🔑 Keys, fobs, access codes, and alarm credentials.',
        '📱 Tenant contact information, which sounds obvious and is the thing most often missing.',
        '⚖️ Correspondence on any pending dispute or legal matter.',
      ] },
      { type: 'p', text: 'Then schedule a weekly handover call and hold it. A standing thirty minutes does more than twenty emails, because it forces someone to answer out loud.' },
      { type: 'p', text: 'On those calls, make them tell you exactly what they filed and when. Not whether the building is compliant. What was filed, on what date, with which agency. Those are different questions and only one of them has a verifiable answer.' },

      { type: 'h2', text: '3. Migrating the data, which is where transitions actually fail' },
      { type: 'p', text: 'This is the part I want you to take seriously, because it is invisible until it is catastrophic.' },
      { type: 'p', text: 'You are moving every tenant record out of their property management system into yours. If a balance ports over wrong, the damage runs well past the number itself. Every decision you make about that tenant from that day forward is built on it. Who you chase. Who you leave alone. Who gets a payment plan. Who ends up in housing court over money they already paid.' },
      { type: 'p', text: 'Get it wrong and you will be making confident, well-reasoned, completely incorrect decisions for months.' },

      { type: 'h2', text: 'The rule: mirror before cutover' },
      { type: 'p',
        text: 'Your database must be a mirror of theirs BEFORE the management company stops working. Not the same week. Before.',
        spans: [
          'Your database must be a mirror of theirs ',
          { text: 'BEFORE', strong: true },
          ' the management company stops working. Not the same week. Before.',
        ],
      },
      { type: 'p', text: 'While they are still under contract, they are still obligated to answer questions. The moment the relationship ends, your leverage goes to zero and every discrepancy becomes an unanswerable mystery. Verify while somebody is still on the hook.' },

      { type: 'h2', text: 'The method: by hand, and checked by two people' },
      { type: 'p', text: 'I know how that sounds in 2026. Do it anyway.' },
      { type: 'p', text: 'Exports lie in quiet ways. Fields get truncated, dates flip format, credits land as charges, and a unit numbering convention that made sense in their system becomes nonsense in yours. An automated import will accept all of it without complaint.' },
      { type: 'p', text: 'So go category by category, unit by unit, and have a second person verify independently. Two people checking the same list catch different errors, which is the entire reason to use two.' },

      { type: 'h2', text: 'What to verify, one category at a time' },
      { type: 'ul', items: [
        '🏢 Units and rents. Legal rent, actual rent, and lease dates per unit. For stabilized units, reconcile against your DHCR registration rather than against their file.',
        '📱 Contact information. Phone, email, and preferred channel for every resident. This is the most commonly incomplete category and the one that quietly breaks arrears follow-up.',
        '🔧 Work orders. Open tickets, their age, and what has been promised to whom. An inherited ticket with no history is a resident who thinks you are ignoring them.',
        '🏦 Deposit reconciliation. Treat this as the most important line on the list. Deposits are the tenant\u2019s money held in trust, and in New York, buildings of six or more units require a separate interest-bearing account. Reconcile every deposit against every lease and against the actual bank records before you release anyone from anything.',
        '🚗 Rentable items. Storage, parking, bike room, laundry. Recurring charges that sit outside base rent and vanish silently in a migration.',
        '📎 Attachments. Leases, riders, notices, inspection reports, photos. Bulk export is rarely offered, so a short Playwright script that walks the old portal and downloads every file is worth the afternoon. An AI assistant will write one for you.',
        '🎁 Concessions. Free months, reduced-rent periods, negotiated arrangements. Miss one and you will bill a resident for money they were promised they would not owe.',
        '🏛️ CityFHEPS documentation. The approval letter, HRA correspondence, and the security voucher. Losing these is expensive in a way that is hard to reverse.',
      ] },
      { type: 'p', text: 'Work down that list in order and tick each category off only when two people agree it is clean.' },

      { type: 'h2', text: '4. Communication, and the walkthrough' },
      { type: 'p', text: 'Now the human half, which is cheaper to get right and just as damaging to get wrong.' },
      { type: 'p', text: 'Write a short FAQ for residents and post it everywhere: lobby, elevator, every door if you have to, plus text and email. Where to pay now. What happens to a payment sent to the old portal. Who to contact for a repair. What is not changing. Expect to repeat it three times regardless, because some residents will keep paying the old system for months.' },
      { type: 'p', text: 'And if staff are changing, walk the building with the outgoing staff before they leave. Not after. The super who has been there nine years knows which valve is mislabeled, which tenant to call before shutting the water, and where the previous owner buried something odd. None of that is written down anywhere, and it walks out the door with him.' },
      { type: 'p', text: 'Two more things to watch during the gap. Violation correction windows keep running whether or not anyone is tracking them, so pull your own report on day one rather than trusting the handover to be complete. And vendors have a relationship with the management company, not with you, so call each one yourself. The worst time to discover that is during a leak.' },

      { type: 'h2', text: 'Timing' },
      { type: 'p', text: 'Avoid firing mid-eviction, since continuity matters in a proceeding and a handover creates gaps a tenant attorney will find. Avoid the weeks around a renewal cycle. And give yourself real overlap, because a week with nobody managing your building is a week of problems that never got logged.' },
      { type: 'p',
        text: 'If what actually failed was coverage and follow-up rather than expertise, the next question is whether to hire another firm at all. We work through whether you should self-manage separately.',
        spans: [
          'If what actually failed was coverage and follow-up rather than expertise, the next question is whether to hire another firm at all. We work through ',
          { text: 'whether you should self-manage', href: '/blog/self-manage-vs-property-management-company' },
          ' separately.',
        ],
      },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'How much notice do I have to give a property management company?' },
      { type: 'p', text: 'Thirty days is most common, though some agreements require sixty or ninety, and a few permit termination only for cause rather than for convenience. Check the termination clause before doing anything, and send notice in writing using the delivery method the contract specifies.' },

      { type: 'h2', text: 'What should I ask for when leaving a property manager?' },
      { type: 'p', text: 'Security deposits with a per-tenant accounting and supporting bank records, all leases and riders, complete rent ledgers with balance history, open maintenance requests, open violations across HPD, DOB, and OATH, compliance and filing records, vendor contacts, keys and access credentials, and tenant contact information. Put the list in the termination letter with a deadline, and hold a weekly handover call.' },

      { type: 'h2', text: 'How do I migrate data from one property management system to another?' },
      { type: 'p', text: 'Category by category, by hand, verified independently by two people, and completed before the outgoing company stops working. Cover units and rents, contact information, work orders, deposit reconciliation, rentable items, attachments, concessions, and any subsidy documentation. Your database should mirror theirs while they are still obligated to answer questions.' },

      { type: 'h2', text: 'What goes wrong when firing a property manager?' },
      { type: 'p', text: 'Most often the data. Balances, deposits, and concessions port over incorrectly and every subsequent decision about that tenant inherits the error. After that: residents continuing to pay the old portal, violation correction windows running unnoticed during the gap, vendors who had a relationship with the agent rather than the owner, and undocumented building knowledge leaving with the outgoing super.' },
    ],
  },

  {
    slug: 'property-management-fees-nyc',
    title: 'Property Management Fees in NYC: What You Pay, and the Ratio That Matters More',
    seoTitle: 'Property Management Fees in NYC: 2026 Rates',
    description:
      'NYC rental buildings typically run 4 to 8 percent of collected rent, well below the national average. Why that is, which fee models to distrust, and the number that predicts service better than price does.',
    date: '2026-06-25',
    readingTime: '5 min read',
    category: 'Property management',
    body: [
      { type: 'p', text: 'Every owner asks what the fee should be. It is the wrong first question, and I will get to the right one, but let us start with the numbers because you came here for numbers.' },

      { type: 'h2', text: 'What NYC actually charges' },
      { type: 'ul', items: [
        '🏢 Rental buildings in Manhattan and Brooklyn: roughly 4 to 8 percent of gross collected rent, according to firms operating in those markets.',
        '🏘️ Smaller residential and single properties: closer to 8 to 10 percent citywide, with Brooklyn quotes commonly reaching 8 to 12 percent and premium service arrangements going higher.',
        '🏢 Larger multifamily, meaning twenty units and up in one location: often 4 to 7 percent on economies of scale.',
        '🏠 Co-ops and condos: usually a flat structure, commonly quoted around $500 to $1,200 per apartment per year.',
        '🤝 Hybrid or co-management arrangements, where the firm handles emergencies and compliance while you keep tenant relations: typically 3 to 5 percent.',
      ] },
      { type: 'p', text: 'Compare that to the national average of about 8.49 percent and you will notice New York sits low. That surprises owners who assume everything here costs more.' },

      { type: 'h2', text: 'Why the percentage is lower in an expensive city' },
      { type: 'p', text: 'Because the dollars matter more than the percentage.' },
      { type: 'p', text: 'Percentage fees fall as market rents rise, for the simple reason that the manager\u2019s take is already sufficient. Eight percent of an $800 rent is $64, which cannot fund a service business. Five percent of a $3,200 rent is $160, which can.' },
      { type: 'p', text: 'So a low quoted percentage in New York comes down to arithmetic. Which means comparing your 5 percent quote to a national 8 percent average tells you almost nothing useful.' },

      { type: 'h2', text: 'The fee model that should make you nervous' },
      { type: 'p', text: 'Three structures are common in this city, and they are not equally safe.' },
      { type: 'p', text: 'Percentage of collected rent is the dominant model for rental buildings and the most owner-friendly, because the firm earns nothing on rent that never arrives. Check specifically that your agreement says collected rather than due.' },
      { type: 'p', text: 'Flat monthly fees are typical for condo and co-op associations, where common charges rather than rent drive the financial model. Predictable, and fine.' },
      { type: 'p', text: 'Percentage of operating budget is the one to scrutinize hard. It pays the firm more as your costs rise, which is a misaligned incentive sitting quietly in your contract. Your manager should have no financial reason to prefer the expensive repair.' },

      { type: 'h2', text: 'The other fees, which are most of the money' },
      { type: 'p', text: 'The headline percentage is one of five to eight charges in a typical agreement. Nationally, total first-year cost commonly reaches 18 to 20 percent of gross rent once everything is counted.' },
      { type: 'p', text: 'Lease-up fees are the big one here, and they scale with turnover rather than with doors. A twelve-unit building running 20 percent annual turnover pays two to three lease-up fees a year, every year. Model that before you sign.' },
      { type: 'p', text: 'Then renewal fees, maintenance markups, eviction administration, setup fees, and whatever the vacancy clause on page four says.' },

      { type: 'h2', text: 'Now the question that actually predicts your experience' },
      { type: 'p', text: 'Stop asking what the fee is. Ask how many buildings your specific manager carries.' },
      { type: 'p', text: 'One NYC firm puts it about as well as it can be put: the management fee is a proxy for scope of service rather than a shorthand for quality, and a 5 percent fee from a firm where your manager carries 80 buildings is a worse deal than 7 percent where they carry 15.' },
      { type: 'p', text: 'I would go further. That ratio is the single most predictive number in the entire relationship, and almost no owner asks for it.' },
      { type: 'p', text: 'Ask it during the pitch. Ask who specifically will be assigned to you, how many buildings and units that person carries today, and what happens to your building when that person leaves. Watch what happens to the room.' },

      { type: 'h2', text: 'The compliance exposure hiding behind a cheap quote' },
      { type: 'p', text: 'And this is what makes fee shopping dangerous in this city rather than merely annoying.' },
      { type: 'p', text: 'A manager who misses an annual HPD registration renewal, which carries a $13 filing fee, can expose your building to penalties in the four figures. That is the shape of nearly every compliance failure here: trivial to do, expensive to miss.' },
      { type: 'p', text: 'Now recall that the overloaded manager is the one who misses filings, and that the cheapest quote is usually the one attached to the highest building count. The savings from a lower percentage can be erased by one dropped deadline.' },

      { type: 'h2', text: 'What is actually negotiable' },
      { type: 'p', text: 'More than owners think, and the top-line percentage is the hardest part to move.' },
      { type: 'ul', items: [
        '📝 Lease-up and renewal fees. Frequently waived or capped to win the business.',
        '🛠️ Setup and onboarding fees. Almost always negotiable.',
        '📆 Notice period. Push for thirty days rather than sixty or ninety.',
        '🛑 A maintenance approval cap, so nothing above a set dollar amount happens without your sign-off.',
        '⏱️ A stated response time for tenant emergencies, written into the agreement rather than implied.',
        '📦 Portfolio bundling. Ten or more units commonly earns one to two points off the standard rate.',
      ] },

      { type: 'h2', text: 'And the comparison nobody runs' },
      { type: 'p', text: 'Take your building. Multiply gross annual rent by your all-in fee percentage, then add the lease-up fees your actual turnover generates. That is your real annual spend on management.' },
      { type: 'p', text: 'Now ask what portion of that spend is buying judgment, and what portion is buying follow-up: rent reminders, balance questions, insurance certificates, appointment scheduling, compliance dates.' },
      { type: 'p', text: 'For most owner-operators the second number is the larger one, and it is the one that no longer requires a firm to cover.' },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'How much does property management cost in NYC?' },
      { type: 'p', text: 'Rental buildings in Manhattan and Brooklyn typically run 4 to 8 percent of gross collected rent, with smaller properties quoted closer to 8 to 12 percent. Larger multifamily can reach 4 to 7 percent. Co-ops and condos usually pay a flat structure around $500 to $1,200 per apartment annually. Hybrid arrangements run 3 to 5 percent.' },

      { type: 'h2', text: 'Why are NYC property management fees lower than the national average?' },
      { type: 'p', text: 'Because percentage fees fall as rents rise. The national average is around 8.49 percent, but that reflects markets where a smaller percentage would not produce enough revenue. At New York rent levels a lower percentage still yields a workable dollar amount per unit.' },

      { type: 'h2', text: 'What is a fair property management fee?' },
      { type: 'p', text: 'The percentage matters less than the service scope behind it. A lower fee from a firm assigning your building to a manager carrying 80 buildings generally delivers worse outcomes than a higher fee where that manager carries 15. Ask for the per-manager building and unit count before comparing prices.' },

      { type: 'h2', text: 'Are property management fees negotiable in NYC?' },
      { type: 'p', text: 'The ancillary fees usually are: setup, lease-up, and renewal fees are commonly waived or capped, and owners with ten or more units often negotiate one to two points off the base rate. Contract terms like notice period, maintenance approval caps, and stated emergency response times are also negotiable and often more valuable than a small rate reduction.' },
    ],
  },

  {
    slug: 'what-is-a-virtual-property-manager',
    title: 'What Is a Virtual Property Manager? A Definition Worth Being Precise About',
    seoTitle: 'What Is a Virtual Property Manager?',
    description:
      'Not a chatbot, not property management software, not an offshore assistant, not a management company. What a virtual property manager actually is, what it does, and where it stops.',
    date: '2026-03-24',
    readingTime: '5 min read',
    category: 'AI property management',
    body: [
      { type: 'p', text: 'A new category always arrives with a naming problem, and this one is worse than most, because four different products are currently wearing the same label.' },
      { type: 'p', text: 'So let me define the term properly, including what it excludes. Definitions that exclude nothing are just advertising.' },
      { type: 'p', text: 'A virtual property manager is software that performs the operating work of managing a building rather than merely recording it. It initiates contact instead of waiting for it, carries deadlines instead of displaying them, completes routine work end to end, and escalates to the owner when a situation requires judgment.' },
      { type: 'p', text: 'The load-bearing word in that sentence is performs.' },

      { type: 'h2', text: 'What it is not' },
      { type: 'p', text: 'Four things get called this, and only one of them fits.' },
      { type: 'p', text: 'It is not a chatbot. A chatbot is reactive by design. It sits in the corner of a website waiting to be asked something, and its whole ambition is to be useful when you arrive. A virtual property manager sends more messages than it receives, because chasing rent and lapsed insurance is something you go out and start.' },
      { type: 'p', text: 'Nor is it property management software. Buildium, DoorLoop, and their peers are excellent systems of record. They hold the ledger, the leases, and the tickets, and they show you the state of things beautifully. But a system of record waits for a human to act on what it displays. Displaying an overdue balance and chasing an overdue balance are different jobs.' },
      { type: 'p', text: 'A remote human assistant is something else again. Virtual assistant firms place a person offshore to handle admin. That is a labor arrangement, and it inherits every human constraint: hours, memory, turnover, mood.' },
      { type: 'p', text: 'And nobody in this category is a management company. None of them take over your building, holds your keys, signs on your behalf, or makes your decisions. If a vendor implies otherwise, ask who is legally responsible for what.' },

      { type: 'h2', text: 'What it actually does' },
      { type: 'p', text: 'The honest description is that it occupies level one, the layer every serious service organization has and property management skipped.' },
      { type: 'ul', items: [
        '⚡ Answers residents directly, at any hour, in seconds rather than in days.',
        '💵 Chases arrears on a schedule, tracks who promised what, and verifies whether the money actually landed.',
        '💬 Handles the recurring questions: balances, payment confirmations, late policy, receipts, insurance certificates.',
        '🔧 Takes maintenance requests and carries them through dispatch, follow-up, and close-out rather than stopping at intake.',
        '📅 Holds the compliance calendar and surfaces filings and deadlines before they become penalties.',
        '🚨 Tracks open violations and the correction windows attached to them.',
        '🙋 Escalates to the owner with the context already gathered when judgment is required.',
      ] },
      { type: 'p', text: 'Read that list and notice the common thread. Nearly all of it is follow-up, which is exactly the work that dies first when a human being gets busy, and exactly the work that nothing flags when it gets skipped.' },

      { type: 'h2', text: 'Where it stops, which is the more useful list' },
      { type: 'p', text: 'A definition without limits is marketing, so here are the limits.' },
      { type: 'p', text: 'It cannot answer questions about your building that nobody wrote down. Which plumber you use, whether 4B has an informal arrangement with you, when the boiler was last serviced. If the answer lives only in your head, the correct behavior is to say so and hand off, never to improvise.' },
      { type: 'p', text: 'It cannot make your decisions. Approving a payment plan, waiving a fee, renewing a lease, authorizing an expense, starting a proceeding. Those carry financial and legal weight and they belong to the owner.' },
      { type: 'p', text: 'It cannot give legal advice. Housing law is complicated and the consequences of getting it wrong arrive with a docket number.' },
      { type: 'p', text: 'It cannot do anything physical. No inspections, no meeting the contractor, no hand on the radiator to check whether the heat is truly on, no signatures.' },
      { type: 'p',
        text: 'And it should not be the one handling a person in genuine crisis. Somebody facing eviction or a family emergency needs a human being. The right behavior there is to recognize it quickly and get you involved. We set out the full list of what an AI property manager cannot do elsewhere.',
        spans: [
        'And it should not be the one handling a person in genuine crisis. Somebody facing eviction or a family emergency needs a human being. The right behavior there is to recognize it quickly and get you involved. We set out ',
        { text: 'the full list of what an AI property manager cannot do', href: '/blog/does-ai-property-manager-work' },
        ' elsewhere.',
        ],
      },

      { type: 'h2', text: 'Who it makes sense for' },
      { type: 'p', text: 'Owner-operators, mostly. People who self-manage and are the escalation path themselves, where the constraint is hours rather than knowledge.' },
      { type: 'p', text: 'It also fits owners currently paying for management primarily to get coverage and follow-up rather than expertise, which turns out to be most of them.' },
      { type: 'p', text: 'It fits management companies too, incidentally, since the only lever they have on a thin margin is units per manager, and this raises that ceiling without the usual quality collapse.' },
      { type: 'p', text: 'It fits poorly if you are far from the property with nobody local, since somebody still has to stand in the hallway, or if you would simply rather not be a landlord at all. Those are real cases and software is the wrong answer to them.' },

      { type: 'h2', text: 'The test to apply to any vendor' },
      { type: 'p', text: 'Ask two questions and you will sort the category quickly.' },
      { type: 'p', text: 'First: does it start conversations, or only answer them? Check the ratio of outbound to inbound messages. If the product only replies, it is a chatbot with a better name.' },
      { type: 'p', text: 'Second: ask something jurisdiction-specific and see whether the answer is precise. In New York, ask what happens when a CityFHEPS payment arrives on the 28th, or what the correction window is on a Class C violation. Confidence is easy. Precision is the product.' },

      { type: 'h2', text: '📣 What this looks like with Maya' },
      { type: 'p', text: 'I have described the category. So let me make the case for ours plainly, because hedging it would waste your time.' },
      { type: 'p', text: 'Maya is a virtual property manager built for NYC owner-operators. Not a leasing bot bolted onto an enterprise stack, and not another dashboard telling you what you already know. She does the work.' },
      { type: 'ul', items: [
        '⚡ Six seconds. That is what a resident waits for a real answer, at 2pm or at 2am on a Sunday.',
        '💵 Every arrears balance chased on schedule, every promise to pay logged, every broken promise surfaced to you.',
        '📅 Your compliance calendar, per building. Every filing dated and ordered, surfaced while there is still time to act on it.',
        '🚨 New HPD and DOB violations pulled daily, while the correction window is still open.',
        '🔌 Plugs into whatever property management software you already run. No migration, no rip and replace.',
        '🙋 A clean handoff the moment a case needs judgment, with the context already gathered.',
      ] },
      { type: 'p',
        text: 'The honest pitch is this. You are already doing this work. You are doing it at 11pm from your phone, from memory, in between everything else, and you are doing it worse than you would like because there are not enough hours. Maya does the eighty percent that never needed you. You keep the twenty that always did.',
        spans: [
          'The honest pitch is this. You are already doing this work. You are doing it at 11pm from your phone, from memory, in between everything else, and you are doing it worse than you would like because there are not enough hours. ',
          { text: 'Maya does the eighty percent that never needed you.', strong: true },
          ' You keep the twenty that always did.',
        ],
      },
      { type: 'p', text: 'Do not take my word for any of it. We publish the transcripts, including the awkward ones.' },
      { type: 'cta', label: 'Read real conversations with Maya', href: '/#conversations' },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'What is a virtual property manager?' },
      { type: 'p', text: 'Software that performs routine property management work rather than only recording it. It contacts residents directly, chases arrears and tracks promises to pay, answers recurring questions at any hour, carries maintenance requests through to close-out, holds the compliance calendar, and escalates to the owner when a situation needs judgment.' },

      { type: 'h2', text: 'What is the difference between a virtual property manager and property management software?' },
      { type: 'p', text: 'Property management software is a system of record. It stores ledgers, leases, and tickets and shows you the current state, but it waits for a person to act. A virtual property manager acts: it initiates the contact, runs the follow-up, and only involves you when judgment is required.' },

      { type: 'h2', text: 'Is a virtual property manager the same as a chatbot?' },
      { type: 'p', text: 'No. A chatbot is reactive and waits to be asked. A virtual property manager is outbound, typically sending more messages than it receives, because collections and compliance work start with someone reaching out rather than someone asking a question.' },

      { type: 'h2', text: 'Can a virtual property manager replace a property management company?' },
      { type: 'p', text: 'It replaces the routine follow-up layer, which is what most owners are actually paying for. It cannot perform physical tasks, make ownership decisions, or provide legal advice, so owners who need local physical presence or who simply prefer not to be involved are still better served by hiring.' },
    ],
  },

  {
    slug: 'cityfheps-landlord-guide',
    title: 'CityFHEPS for NYC Landlords: A Comprehensive Guide',
    seoTitle: 'CityFHEPS for Landlords: 2026 Payment Standards',
    description:
      'The 2026 CityFHEPS payment standards went down. What the program actually pays NYC owners, the late fee rule almost everyone gets wrong, and the five-business-day notifications that get landlords disqualified.',
    date: '2026-05-19',
    readingTime: '14 min read',
    category: 'NYC compliance',
    body: [
      { type: 'p', text: 'Start with a number that slipped past almost everybody.' },
      { type: 'p', text: 'The 2026 CityFHEPS payment standards took effect on April 1, and they went down. Not up. Down, in every single bedroom count.' },
      { type: 'p', text: 'A two-bedroom that carried a $3,058 maximum in 2025 now carries $2,997. A studio went from $2,646 to $2,604. A three-bedroom fell from $3,811 to $3,753. Small numbers individually, and I am guessing you did not get a phone call about it.' },
      { type: 'p', text: 'So here is the whole program, written the way an owner-operator would want it explained rather than the way a fact sheet explains it. I am going to be specific, because vagueness is how people end up on a disqualification list.' },

      { type: 'h2', text: 'What CityFHEPS actually is' },
      { type: 'p', text: 'CityFHEPS is a rental assistance supplement run by the Department of Social Services, which includes HRA and DHS. It helps people find and keep an apartment, a room, or an SRO unit. If you house a CityFHEPS tenant, DSS and HRA pay you directly.' },
      { type: 'p', text: 'Rent levels are indexed to the Section 8 standard adopted by NYCHA, which is why they move when NYCHA moves.' },
      { type: 'p', text: 'One wrinkle worth knowing up front. A full apartment can be rented with CityFHEPS anywhere in New York State. A single room in a shared apartment, or an SRO unit, only works inside the five boroughs.' },

      { type: 'h2', text: 'The 2026 payment standards' },
      { type: 'p', text: 'These are the maximum subsidy amounts, and they assume all utilities are included in the lease. If the tenant pays utilities, a utility allowance gets subtracted from these figures.' },
      { type: 'ul', items: [
        'SRO, one person: $1,953 (was $1,985)',
        'Studio, one person: $2,604 (was $2,646)',
        'One bedroom, one or two people: $2,734 (was $2,762)',
        'Two bedroom, three or four people: $2,997 (was $3,058)',
        'Three bedroom, five or six people: $3,753 (was $3,811)',
        'Four bedroom, seven or eight people: $4,077 (was $4,111)',
        'Five bedroom, nine or ten people: $4,689 (was $4,728)',
        'Six bedroom, eleven or twelve people: $5,301 (was $5,345)',
      ] },
      { type: 'p', text: 'Renting a room rather than a unit works differently. The maximum rent is $1,100, and the supplement covers the gap between the actual rent and the tenant\u2019s contribution, which is $50 or their monthly shelter allowance, whichever is greater. Heat, hot water, electricity, and cooking gas all have to be included if the stove is not electric.' },
      { type: 'p', text: 'Check nyc.gov/dsshousing before you rely on any of these figures. They are revised annually and this post will eventually go stale.' },

      { type: 'h2', text: 'The money that arrives up front' },
      { type: 'p', text: 'This is the part owners underrate, and it is unusually generous.' },
      { type: 'p', text: 'For a new apartment or SRO, you can take the first month\u2019s rent in full plus the next three months of the supplement, paid up front. For a room, it is the first four months in full, unless the household receives a shelter allowance, in which case it is the first month in full plus three months of the supplement.' },
      { type: 'p', text: 'On top of that, a unit hold incentive equal to one month\u2019s rent is available if you agree to hold the apartment while the housing packet gets processed. Brokers can collect a fee of up to 15% of annual rent.' },
      { type: 'p', text: 'After that, monthly payments run for up to five years as long as your tenant stays eligible and you stay compliant, with extensions past five years available for good cause.' },
      { type: 'p', text: 'Add it up and you are looking at four months of rent in hand plus a held-unit payment before the tenant has unpacked. Very few private-market deals in this city front-load like that.' },

      { type: 'h2', text: 'The late fee rule that almost everyone gets wrong' },
      { type: 'p', text: 'This is the single most misunderstood provision in the program, and it causes real fights.' },
      { type: 'p',
        text: 'If the payment is made in the month that the rent is due, it is not late. That is the rule. Your lease may say rent is due on the first with a late fee after the fifth, and for a CityFHEPS payment, that language does not control.',
        spans: [
          { text: 'If the payment is made in the month that the rent is due, it is not late.', strong: true },
          ' That is the rule. Your lease may say rent is due on the first with a late fee after the fifth, and for a CityFHEPS payment, that language does not control.',
        ],
      },
      { type: 'p', text: 'The fact sheet is blunt about it. When HRA issues the monthly rental assistance payment in full by the final day of the month, the payment is deemed timely, regardless of any provisions in the lease to the contrary.' },
      { type: 'p', text: 'And it goes further. Under state law, a landlord cannot successfully bring a tenant to housing court just for late fees, and cannot bring the tenant to small claims court for late fees charged on the CityFHEPS portion of the rent.' },
      { type: 'p', text: 'So if your ledger is automatically assessing a late fee on the sixth of the month against a CityFHEPS balance, you are generating a number you cannot collect and a conversation you cannot win. Fix the ledger.' },

      { type: 'h2', text: 'Side deals will end you' },
      { type: 'p', text: 'Under the CityFHEPS rules, side deals are strictly prohibited. You must not demand, request, or receive any amount above the rent and the reasonable fees stipulated in the lease. That holds regardless of any change in household composition.' },
      { type: 'p', text: 'You are also required to accept the HRA security voucher in place of a cash security deposit, and you may not ask the tenant for anything additional on top of it.' },
      { type: 'p', text: 'And note that the subsidy covers rent only. Amenity fees, service charges, and similar extras are not covered, so do not build a deal that assumes they are.' },

      { type: 'h2', text: 'The five-business-day rules, which is where owners actually get hurt' },
      { type: 'p', text: 'Now we arrive at the part of this program that has nothing to do with money and everything to do with follow-up. These are the obligations that get landlords disqualified, and every one of them is an administrative task that is easy to forget.' },
      { type: 'ul', items: [
        '⏰ You must notify HRA within five business days of learning that the household no longer resides in the unit.',
        '⚖️ You must notify HRA within five business days if any legal proceeding affecting the participant\u2019s tenancy is commenced.',
        '🔄 You must notify HRA promptly if the landlord, the owner of the premises, or the management company changes.',
        '↩️ If the household stops living in the unit, you must return any HRA payments covering the period they were not there.',
        '💰 You must promptly return any overpayment, including money paid in error or paid because of inaccurate or incomplete information you submitted.',
        '🚫 You may not move a household from one unit to another without prior written approval from both HRA and the household.',
      ] },
      { type: 'p', text: 'Notifications have to be in writing, sent to CityFHEPS at the NYC Human Resources Administration, 109 East 16th Street, 10th Floor, New York, NY 10003.' },
      { type: 'p', text: 'And here is the consequence, stated plainly in the fact sheet. Landlords may be banned from participation in City rental assistance programs for violating any of the landlord requirements. Before you land on a disqualification list, HRA will notify you and give you a chance to object in writing.' },
      { type: 'p', text: 'Read that sentence again with an operator\u2019s eyes. You can be banned from a program that pays you four months up front for failing to send a letter within five business days.' },

      { type: 'h2', text: 'Rent reasonableness and the DHCR check' },
      { type: 'p', text: 'Every unit goes through a rent reasonableness assessment. The rent you are charging cannot exceed what comparable units in the development or the vicinity command.' },
      { type: 'p', text: 'If the unit is rent stabilized, DSS pulls DHCR data to verify the stabilization status and the maximum legal rent, and confirms your number sits at or below the legal limit.' },
      { type: 'p', text: 'If your registered legal rent and the rent on your proposed lease disagree, this is where that gets discovered. Reconcile it beforehand rather than during the review.' },

      { type: 'h2', text: '⚖️ Selecting and rejecting tenants' },
      { type: 'p', text: 'This is where owners get themselves into genuine legal trouble, so let me be direct.' },
      { type: 'p',
        text: 'The HPD and HDC Marketing Handbook, updated April 2025, is the governing document for city-assisted housing, and it says this plainly: applicants may not be rejected solely on the basis that they receive Section 8 or other qualifying government rental subsidy. CityFHEPS is named in the handbook as one of the two most common subsidy types.',
        spans: [
          'The ',
          { text: 'HPD and HDC Marketing Handbook', href: 'https://www.nyc.gov/assets/hpd/downloads/pdfs/services/marketing-handbook-8-21.pdf' },
          ', updated April 2025, is the governing document for city-assisted housing, and it says this plainly: ',
          { text: 'applicants may not be rejected solely on the basis that they receive Section 8 or other qualifying government rental subsidy', strong: true },
          '. CityFHEPS is named in the handbook as one of the two most common subsidy types.',
        ],
      },
      { type: 'p', text: 'Lawful source of income is a protected class, alongside race, color, religion, gender, sexual orientation, gender identity or expression, national origin, age, disability, veteran status, immigration status, lawful occupation, marital or partnership status, pregnancy, presence of children, height and weight, and status as a survivor of domestic violence, sexual violence, or stalking.' },

      { type: 'h2', text: 'Voucher-holders are not judged on income' },
      { type: 'p', text: 'This one trips up owners constantly. Applicants with tenant-based Section 8 or another qualifying subsidy are not subject to your advertised minimum income levels at all.' },
      { type: 'p', text: 'They must be considered so long as the subsidy\u2019s payment standard, net of any utility allowance, meets the advertised rent. They still have to satisfy your other criteria, including maximum income, but you cannot apply a minimum income test to somebody whose rent is being paid by the city.' },
      { type: 'p', text: 'Two related points. Shelter clients may qualify for Augmented CityFHEPS, which uses a higher payment standard, and a shelter letter is sufficient proof of eligibility. And where a voucher-holder is processed for non-tax-code units only, the review is streamlined: the voucher eligibility determination itself satisfies income eligibility, so no further income documentation is required.' },

      { type: 'h2', text: 'You cannot invent a reason later' },
      { type: 'p', text: 'One structural rule gets missed almost universally.' },
      { type: 'p',
        text: 'Your rejection criteria have to be specified in the Marketing Plan and approved by the Agency during pre-marketing, before you ever see an applicant. An applicant may not be rejected for any reason that is not consistent with those approved criteria and the Agency selection policies, and the criteria must be applied fairly and equitably to every applicant.',
        spans: [
          'Your rejection criteria have to be specified in the Marketing Plan and approved by the Agency ',
          { text: 'during pre-marketing, before you ever see an applicant', strong: true },
          '. An applicant may not be rejected for any reason that is not consistent with those approved criteria and the Agency selection policies, and the criteria must be applied fairly and equitably to every applicant.',
        ],
      },
      { type: 'p', text: 'No application may be found ineligible before it enters the lottery. Every application gets a log number first.' },
      { type: 'p', text: 'Separately, the HPD and HDC tenant selection criteria describe the most stringent screening permitted. You may always be less strict. You may never be stricter. Off limits for every applicant:' },
      { type: 'ul', items: [
        '🚫 Housing court history or prior landlord-tenant actions',
        '🚫 Home visits, photos, or video of the applicant\u2019s current home',
        '🚫 Debt-to-income ratios',
        '🚫 Lack of credit history or lack of rental history',
        '🚫 Requiring a guarantor or co-signer',
        '🚫 Personal references',
        '🚫 Contacting a previous landlord or neighbors for information',
      ] },
      { type: 'p',
        text: 'And the one that surprises nearly everybody: credit checks are not permitted at all for voucher-holders, homeless referrals, or clients in process for project-based subsidy or supportive units. If your screening runs credit on a CityFHEPS applicant, stop today.',
        spans: [
          'And the one that surprises nearly everybody: ',
          { text: 'credit checks are not permitted at all for voucher-holders', strong: true },
          ', homeless referrals, or clients in process for project-based subsidy or supportive units. If your screening runs credit on a CityFHEPS applicant, stop today.',
        ],
      },

      { type: 'h2', text: 'So what do you do if you think you have a valid reason?' },
      { type: 'p', text: 'Do not decide alone. That is the whole point of the process.' },
      { type: 'p', text: 'Take it to your Agency monitor, HPD or HDC depending on the project, and check the reason against the rejection criteria approved in your Marketing Plan and the detailed selection policies in Section 5 of the handbook. The handbook is explicit that questions arising during review go to the Agency.' },
      { type: 'p', text: 'If you do reject, the applicant may appeal in writing, and their place on the log is held while it is reviewed. That appeal must be reviewed by a supervisor who was not the initial reviewer. If the rejection stands, the appeal rejection notice has to give specific and detailed reasons, on the Agency template. The applicant then has five business days to complain directly to HPD or HDC.' },
      { type: 'p', text: 'And note two hard stops. No lease may be signed and nobody may move in until the Agency has completed its review of the applicant screening. You also may not collect a security deposit or rent from a prospective resident before that review is finished.' },
      { type: 'p',
        text: 'A rejection reviewed against approved criteria and documented is a defensible business decision. The same rejection made alone on a Tuesday afternoon is a complaint waiting to be filed, and your recollection of why will not help you a year later.',
        spans: [
          { text: 'A rejection reviewed against approved criteria and documented is a defensible business decision.', strong: true },
          ' The same rejection made alone on a Tuesday afternoon is a complaint waiting to be filed, and your recollection of why will not help you a year later.',
        ],
      },
      { type: 'p', text: 'One scope note. All of the above governs city-assisted affordable housing with a Marketing Plan and an Agency monitor. If you are a private owner renting at market rate and simply accepting a CityFHEPS voucher, you have no marketing agent to call, but the source of income protections apply to you exactly the same. Write your criteria down before you advertise, apply them identically to everyone, and keep the file.' },

      { type: 'h2', text: '🔒 Criminal history: what you may and may not consider' },
      { type: 'p',
        text: 'Read this section carefully and then talk to your attorney before acting on any of it. This is the single most legally dangerous decision an owner makes, the rules are narrower than almost anyone expects, and getting it wrong is a discrimination claim rather than a paperwork problem. What follows is a plain-English summary of HPD and HDC guidance, not legal advice.',
        spans: [
          { text: 'Read this section carefully and then talk to your attorney before acting on any of it.', strong: true },
          ' This is the single most legally dangerous decision an owner makes, the rules are narrower than almost anyone expects, and getting it wrong is a discrimination claim rather than a paperwork problem. What follows is a plain-English summary of HPD and HDC guidance, not legal advice.',
        ],
      },
      { type: 'p',
        text: 'The guidance is Attachment AA-1 to the Marketing Handbook, and it applies to anyone who determines eligibility: case managers, project managers, clerks, and independent contractors alike.',
        spans: [
          'The guidance is ',
          { text: 'Attachment AA-1', href: 'https://pub-8148357eae8a439fa3a35df4c60df703.r2.dev/building/trio/ATTACHMENT%20AA-1%20-%20Justice%20Involvement%20-%20GUIDANCE%2008-2021.PDF' },
          ' to the Marketing Handbook, and it applies to anyone who determines eligibility: case managers, project managers, clerks, and independent contractors alike.',
        ],
      },

      { type: 'h2', text: 'What you may never consider' },
      { type: 'ul', items: [
        '🚫 Arrests that did not result in a conviction',
        '🚫 Youthful offender adjudications',
        '🚫 Convictions excused by pardon, overturned on appeal, sealed, or otherwise vacated',
        '🚫 Any offense committed before the applicant turned 17. There is no exception to this one.',
        '🚫 Any conviction that does not appear on the list described below',
      ] },
      { type: 'p', text: 'Only prior convictions count, and only for offenses that involved physical violence to persons or property, or that adversely affected the health, safety, and welfare of other people.' },

      { type: 'h2', text: 'The list is the gate' },
      { type: 'p',
        text: 'Attachment AA-4 sets out 160 applicable New York State Penal Law convictions. If a conviction is not on that list, it may not be factored into the application at all. For a conviction under some other body of law, you must determine whether it is comparable in nature and severity to something on the list, and articulate that reasoning in writing.',
        spans: [
          { text: 'Attachment AA-4', href: 'https://pub-8148357eae8a439fa3a35df4c60df703.r2.dev/building/trio/Attachment_AA-4.pdf' },
          ' sets out 160 applicable New York State Penal Law convictions. ',
          { text: 'If a conviction is not on that list, it may not be factored into the application at all.', strong: true },
          ' For a conviction under some other body of law, you must determine whether it is comparable in nature and severity to something on the list, and articulate that reasoning in writing.',
        ],
      },

      { type: 'h2', text: 'The lookback windows' },
      { type: 'p', text: 'Even a listed conviction ages out. You may only consider:' },
      { type: 'ul', items: [
        '⏱️ A felony conviction within five years prior to consideration',
        '⏱️ A conviction resulting in incarceration where release occurred within one year prior',
        '⏱️ A misdemeanor conviction within one year prior',
      ] },
      { type: 'p', text: 'Anything outside those windows may not be the basis for rejection or for further consideration. It is simply gone.' },

      { type: 'h2', text: 'And even then, it is never automatic' },
      { type: 'p', text: 'This is the part owners get wrong most often. A conviction that is on the list and inside the lookback window is still not grounds for automatic rejection.' },
      { type: 'p', text: 'You must perform an individualized assessment using the mandatory Worksheet, Attachment AA-2, weighing the offense against the applicant\u2019s age at the time, the time elapsed, and evidence of rehabilitation. No factor may be considered in isolation. Automatic bars exist only where HUD requires them for specific federally assisted programs, and even then you must give HPD or HDC prior notice and get approval before issuing a rejection.' },
      { type: 'p', text: 'On age, the guidance is explicit that offenses committed between 17 and 25 must be evaluated with the understanding that people who exercise poor judgment as young adults very often mature into law-abiding ones.' },
      { type: 'p', text: 'On rehabilitation, completed treatment, vocational or educational programming, employment, and volunteer work all count in the applicant\u2019s favor. Two traps here: the absence of drug or alcohol treatment must be treated neutrally rather than as a negative, because you may not assume a problem existed. And while community recommendations help, an applicant\u2019s failure to provide one from a current or former landlord cannot be held against them.' },

      { type: 'h2', text: 'What you owe the applicant' },
      { type: 'ul', items: [
        '📋 A written explanation of your background check procedures, and of their right to review, contest, and explain the record',
        '✉️ Outreach using Attachment AA-3 before any rejection on these grounds, giving no less than ten business days to respond',
        '💬 Their choice of submitting through Housing Connect, by email, or in person, plus the option to review it with you in person, by phone, or virtually',
        '📄 On rejection, a written explanation plus copies of every document you reviewed, including the completed Worksheet',
        '⚖️ No less than ten business days to appeal, and notice of their right to complain to HPD or HDC if the appeal fails',
        '🗄️ Records retained for a minimum of five years',
      ] },
      { type: 'p', text: 'Use a reputable background check company and comply with the Fair Credit Reporting Act. Under Part M of the Housing Stability and Tenant Protection Act of 2019, the fee you may charge for background and credit checks combined is capped at actual cost or $20, whichever is less, and must be waived entirely if the applicant hands you a check conducted within the past 30 days.' },
      { type: 'p',
        text: 'Last word, and I mean it. HPD says plainly that this guidance is not a comprehensive Fair Housing guide, and neither is this article. The rules change, they differ by program, and the consequences of a wrong call land on you rather than on whoever gave you the advice. Run your criminal history policy past counsel before you apply it to a single applicant.',
        spans: [
          { text: 'Last word, and I mean it.', strong: true },
          ' HPD says plainly that this guidance is not a comprehensive Fair Housing guide, and neither is this article. The rules change, they differ by program, and the consequences of a wrong call land on you rather than on whoever gave you the advice. Run your criminal history policy past counsel before you apply it to a single applicant.',
        ],
      },

      { type: 'h2', text: 'Getting a unit approved' },
      { type: 'p', text: 'The sequence runs roughly like this. The unit gets registered on the DSS Offer Registration site, by you or by the tenant\u2019s housing specialist. DSS runs the rent reasonableness assessment. A preclearance follows, and the unit and building have to be clear of a specific set of violations. Then a physical walkthrough gets scheduled.' },
      { type: 'p', text: 'Pass the walkthrough and the housing specialist helps assemble the packet and schedules a lease signing. The lease has to be signed and dated by both parties and must show the complete address including the unit number.' },
      { type: 'p', text: 'One line in the fact sheet deserves your attention: you, the landlord or broker, are responsible for providing all necessary documentation and for making sure the packet gets submitted. Not the caseworker. You.' },
      { type: 'p', text: 'After final review and approval, a key and check exchange gets scheduled. You hand over keys to the same unit shown on the lease, and you collect the unit hold payment, the first several months of rent, and the security voucher.' },

      { type: 'h2', text: 'Renewals, which are quietly the whole game' },
      { type: 'p', text: 'Tenants renew participation annually, and DSS recalculates the tenant contribution against their current income at renewal. Your total stays roughly stable while the split between HRA and tenant moves.' },
      { type: 'p', text: 'On your side, CityFHEPS landlords are not required to renew a tenant unless some other law requires it. But there is a real cost to walking away. A landlord who declines to offer a renewal lease may lose eligibility for the financial incentives to place another CityFHEPS tenant in that same unit, unless there was good cause.' },
      { type: 'p', text: 'In other words, the unit hold payment and the up-front months are not guaranteed to be there for you the second time around.' },

      { type: 'h2', text: 'And now the part that will sound familiar' },
      { type: 'p', text: 'For program questions and payment inquiries, you call the HRA Rental Assistance Call Center at 718-557-1399. It is open Monday through Friday, 9 AM to 5 PM.' },
      { type: 'p', text: 'Forty hours out of 168. The agency administering your tenant\u2019s rent is itself a 23.8% operation.' },
      { type: 'p', text: 'I point that out with sympathy rather than snark. HRA is doing a hard job with a hard caseload. But it does mean that when your tenant texts you at 9pm on a Saturday asking why HRA has not paid this month, nobody on that side is available to answer, and the question lands on you.' },
      { type: 'p', text: 'Which is the honest argument for having a level one of your own. The compliance calendar in this program is unforgiving and entirely mechanical: the five-day notifications, the annual renewal, the recertification, the ledger that has to know a CityFHEPS payment is not late. Every one of those is exactly the kind of task that gets deferred to next week until a disqualification notice arrives.' },
      { type: 'p', text: 'That is what Maya is for, and it is also precisely where she stops. She can track the calendar, answer the routine question at 9pm, and reconcile what HRA actually paid against what the ledger expected. She does not advise you on housing law, and she should not. For that, call your attorney.' },

      { type: 'p', text: 'Have further questions about running a CityFHEPS tenancy? We answer them.' },
      { type: 'cta', label: 'Email hello@halfave.co', href: 'mailto:hello@halfave.co' },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'How much does CityFHEPS pay a landlord in 2026?' },
      { type: 'p', text: 'For leases starting April 1, 2026 or later, the maximums are $2,604 for a studio, $2,734 for a one bedroom, $2,997 for a two bedroom, and $3,753 for a three bedroom, assuming all utilities are included. If the tenant pays utilities, a utility allowance is subtracted. Every 2026 figure is slightly lower than its 2025 counterpart.' },

      { type: 'h2', text: 'Can I charge a CityFHEPS tenant a late fee?' },
      { type: 'p', text: 'Not if the payment arrives within the month it is due. A payment made in the month rent is due is not considered late, and when HRA pays in full by the final day of the month it is deemed timely regardless of what your lease says. A landlord also cannot successfully take a tenant to housing court just for late fees, or to small claims court for late fees on the CityFHEPS portion.' },

      { type: 'h2', text: 'How does CityFHEPS pay landlords each month?' },
      { type: 'p', text: 'DSS issues a check to the landlord each month for the CityFHEPS portion of the rent. If the tenant has income, they pay their own portion separately, and that split is recalculated at each annual renewal.' },

      { type: 'h2', text: 'What can get a landlord banned from CityFHEPS?' },
      { type: 'p', text: 'Violating any of the landlord requirements can lead to disqualification from City rental assistance programs. The common ones are administrative: missing the five-business-day notification when a household moves out or when a legal proceeding starts, failing to return payments or overpayments, demanding money above the lease, refusing the HRA security voucher, or moving a household between units without written approval. HRA gives notice and an opportunity to object before placing a landlord on a disqualification list.' },

      { type: 'h2', text: 'Does CityFHEPS work outside New York City?' },
      { type: 'p', text: 'A full apartment can be rented with CityFHEPS anywhere in New York State, though the payment standards differ outside the five boroughs. Single rooms in shared apartments and SRO units are limited to the five boroughs.' },

      { type: 'h2', text: 'A necessary note' },
      { type: 'p', text: 'This is a plain-English summary of a government program, not legal advice, and it reflects the DSS fact sheet as of early 2026. Payment standards and utility allowances are updated annually. Confirm current figures at nyc.gov/dsshousing, and talk to your attorney about anything touching your specific tenancy.' },
    ],
  },

  {
    slug: 'half-ave-vs-eliseai',
    title: 'Half Ave vs. EliseAI',
    seoTitle: 'Half Ave vs EliseAI: An Honest Comparison',
    description:
      'EliseAI chases arrears, and does it well. So does Maya. The real difference is three letters: NYC. Compliance, violations, and everything an assistant does beyond collections.',
    date: '2026-07-22',
    readingTime: '5 min read',
    category: 'AI property management',
    body: [
      { type: 'p', text: 'Start with what you actually want from any of this.' },
      { type: 'p', text: 'Rent chased without you touching it. Violations you hear about while there is still time to correct them. Filing deadlines that reach you before the penalty does. Work orders that close instead of aging. And a phone that stops going off at 11pm on a Sunday.' },
      { type: 'p', text: 'EliseAI delivers the first one. They started in 2017, long before anybody was calling this AI, and they now serve roughly 70% of the top 50 rental housing operators in the country. Their delinquency workflow is excellent.' },
      { type: 'p', text: 'So the fair question is what separates Maya chasing arrears from Elise chasing arrears.' },
      { type: 'p',
        text: 'Almost nothing. Chasing rent is table stakes in 2026. The separation is everything on that list after the first item.',
        spans: [
          { text: 'Almost nothing.', strong: true },
          ' Chasing rent is table stakes in 2026. The separation is everything on that list after the first item.',
        ],
      },

      { type: 'h2', text: 'The difference is three letters' },
      { type: 'p', text: 'NYC.' },
      { type: 'p', text: 'A national platform has to be correct in fifty markets. We have to be correct in one. That trade shows up in three places, and each one carries a number attached to getting it wrong.' },

      { type: 'h2', text: '1. 📅 Compliance' },
      { type: 'p', text: 'Take Local Law 1. Between January 1 and January 16 you distribute the annual lead notice to every tenant in a pre-1960 multiple dwelling. Tenants have until February 15 to respond. You inspect the non-responders between February 16 and March 1, notify DOHMH about who you could not reach, and retain the whole file for ten years.' },
      { type: 'p',
        text: 'Failing to send the notice is itself a violation, with penalties running to $10,000. Missing an annual HPD registration, which carries a $13 filing fee, can expose a building to four figures. That is the shape of nearly every compliance obligation in this city: trivial to do, expensive to miss.',
        spans: [
          'Failing to send the notice is itself a violation, ',
          { text: 'with penalties running to $10,000', strong: true },
          '. Missing an annual HPD registration, which carries a $13 filing fee, can expose a building to four figures. That is the shape of nearly every compliance obligation in this city: trivial to do, expensive to miss.',
        ],
      },
      { type: 'p', text: 'Now stack Local Law 55, boiler and elevator filings through DOB NOW, gas piping under Local Law 152, facade cycles, bedbug reporting, window guards, and stove knob covers.' },
      { type: 'p', text: 'No national platform sequences Local Law 1 notices, because building that for New York while also serving Dallas and Phoenix would be a strange use of engineering time. So somebody in New York does it by hand every January, from a spreadsheet, and that somebody is you.' },
      { type: 'p', text: 'Half Ave holds that calendar per building. Every deadline that applies to your addresses, sorted by what falls due next.' },

      { type: 'h2', text: '2. 🚨 Violations' },
      { type: 'p', text: 'When a violation posts, a clock starts. An HPD mold violation gives you 30 days on a Class B and 21 on a Class C. Inside the window it is a repair. Outside it, the same condition becomes a penalty plus a re-inspection.' },
      { type: 'p', text: 'So everything depends on one number: how many of those days you spend not knowing.' },
      { type: 'p', text: 'To find out the day a violation posts, you are probably paying a compliance monitoring service like Jack Jaffa. It works. It is also a separate subscription, a separate login, and a separate thing to remember to check.' },
      { type: 'p',
        text: 'Half Ave pulls every new HPD and DOB violation on your properties daily and tells you. No extra subscription, no second portal. Violations, arrears, compliance dates, and work orders on one screen.',
        spans: [
          { text: 'Half Ave pulls every new HPD and DOB violation on your properties daily and tells you.', strong: true },
          ' No extra subscription, no second portal. Violations, arrears, compliance dates, and work orders on one screen.',
        ],
      },

      { type: 'h2', text: '3. 💬 Everything an assistant does' },
      { type: 'p', text: 'The work that consumes a property manager\u2019s day was never collections. It is the forty small things around collections, and Maya carries them:' },
      { type: 'ul', items: [
        '💵 Chases arrears and tracks every promise to pay',
        '🛡\uFE0F Chases renters insurance, catches lapses, confirms coverage',
        '\u2753 Answers the routine questions: balances, payment confirmations, late policy, receipts',
        '🔧 Creates work orders straight from a tenant message',
        '📖 Reads existing work orders and tells you what is open and how old it is',
        '🔔 Reminds staff what is outstanding, so chasing them stops being your job',
        '📋 Sends resident surveys and collects what comes back',
      ] },
      { type: 'p',
        text: 'That is an assistant property manager\u2019s entire job description, filled the day you turn it on. No posting the role, no interviewing, no six weeks of training, no handover when they leave in fourteen months for a better offer.',
        spans: [
          'That is an assistant property manager\u2019s entire job description, ',
          { text: 'filled the day you turn it on', strong: true },
          '. No posting the role, no interviewing, no six weeks of training, no handover when they leave in fourteen months for a better offer.',
        ],
      },
      { type: 'p', text: 'It also runs on the property management software you already have. No migration, no data cleanup project, no rip and replace.' },

      { type: 'h2', text: 'How you know it works before you commit' },
      { type: 'p', text: 'Two tests, and you can run both without talking to anybody.' },
      { type: 'p', text: 'First, read the transcripts. We publish real conversations between Maya and real residents, including the ones where somebody got annoyed and the ones where she stopped and handed the conversation to a human. Judge the tone yourself.' },
      { type: 'p',
        text: 'Second, ask any vendor a question only a New York operator could answer. Ask what happens when a CityFHEPS payment arrives on the 28th. The correct answer is that a payment made within the month it is due is not late, and that HRA paying in full by the final day of the month counts as timely no matter what the lease says. Vague answers to specific questions tell you everything.',
        spans: [
          'Second, ask any vendor a question only a New York operator could answer. Ask what happens when a ',
          { text: 'CityFHEPS', href: '/blog/cityfheps-landlord-guide' },
          ' payment arrives on the 28th. The correct answer is that a payment made within the month it is due is not late, and that HRA paying in full by the final day of the month counts as timely no matter what the lease says. ',
          { text: 'Vague answers to specific questions tell you everything.', strong: true },
        ],
      },
      { type: 'cta', label: 'Read real conversations with Maya', href: '/#conversations' },

      { type: 'h2', text: 'Where EliseAI is the better choice' },
      { type: 'p', text: 'There are portfolios where they are clearly the right call, and you should know which one you have.' },
      { type: 'p', text: 'They run voice, and voice is hard. They own the prospect side end to end, from first inquiry through tour scheduling and application. They have a full CRM reporting across leasing performance, renewals, delinquencies, and maintenance. They integrate deeply with the enterprise property management systems. They operate nationally. And they have years of conversation volume behind their models that a newer company does not.' },
      { type: 'p', text: 'If your expensive problem is vacancy across thousands of units in multiple states, that is the product built for you.' },

      { type: 'h2', text: 'Which problem is yours' },
      { type: 'p', text: 'Three questions settle it.' },
      { type: 'ul', items: [
        '\u2753 Is your money going out the door on empty units, or on penalties, arrears, and hours? Leasing funnels and operating burdens are different products.',
        '🗽 How much of your week is New York specific? If most of it, depth in one market beats breadth across fifty.',
        '🙋 When the AI escalates, who picks up? If a team does, buy for the team. If you do, buy something that hands you the context already gathered.',
      ] },
      { type: 'p', text: 'And one more that is less comfortable. Every month this stays unsolved has a price: the balance that grew, the correction window that closed, the renewal nobody sent. Those numbers are already in your books. Go look at last year\u2019s.' },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'What is the difference between Half Ave and EliseAI?' },
      { type: 'p', text: 'Both chase arrears. EliseAI is a national conversational AI platform covering the full resident lifecycle including leasing, prospect conversion, and voice, built for large multifamily operators. Half Ave is built only for New York: the compliance calendar per building, daily notification of new HPD and DOB violations, work order creation and follow-through, and the routine assistant work beyond collections.' },

      { type: 'h2', text: 'Is there an EliseAI alternative for NYC owner-operators?' },
      { type: 'p', text: 'EliseAI prices custom by unit count and communication volume and suits portfolios with dedicated leasing teams. Owner-operators running smaller regulated portfolios in New York generally need operating coverage rather than leasing conversion: Local Law deadlines, open violations and their correction windows, work orders, and arrears. That is the gap Maya is built for.' },

      { type: 'h2', text: 'Do I still need a separate violations monitoring service?' },
      { type: 'p', text: 'Not for the monitoring itself. Half Ave pulls new HPD and DOB violations on your properties every day and notifies you, with no additional subscription, alongside your compliance calendar and arrears. Correcting and certifying a violation still requires contractors and filings, which is work no software performs for you.' },

      { type: 'h2', text: 'Can AI handle NYC building compliance?' },
      { type: 'p', text: 'It handles the mechanical part, which is most of it: tracking deadlines across HPD, DOB, DEP, and DOHMH, prompting the annual notices, watching correction windows, and chasing documentation. It cannot perform an inspection, certify a correction, or advise you on a specific violation.' },

      { type: 'h2', text: 'A note on fairness' },
      { type: 'p', text: 'Everything stated here about EliseAI comes from their public materials and press coverage. Products in this category change quickly, so check their current site before deciding anything. If we have described them unfairly or a detail has gone stale, write to us and we will correct it.' },
    ],
  },

  {
    slug: 'real-conversations-with-maya',
    title: 'Read the Actual Conversations. We Will Wait.',
    seoTitle: 'Real AI Property Manager Conversations',
    description:
      'Eight real exchanges between Maya and real residents in real NYC buildings. Arrears, insurance, a failed payment, a CityFHEPS voucher, and the moment she stops and asks a human.',
    date: '2026-02-05',
    readingTime: '6 min read',
    category: 'Field notes',
    body: [
      { type: 'p', text: 'Every AI company tells you their product is remarkable. Almost none of them show you the receipts, which I have always found a little suspicious.' },
      { type: 'p', text: 'So here are the receipts.' },
      { type: 'p', text: 'Below are real conversations between Maya and real residents in buildings we run. First names have been changed and unit numbers removed. Nothing else has been touched, including the typos, the short replies, and the one where she did not know the answer.' },

      { type: 'h2', text: 'What to watch for while you read' },
      { type: 'ul', items: [
        '\u26A1 Speed. Most replies land in about six seconds, at whatever hour the resident happened to write.',
        '📤 Who starts. Maya sends more messages than she receives, because chasing rent is something you initiate.',
        '🧍 Tone under pressure. Conversation forty reads exactly like conversation one.',
        '🙋 The handoffs. The most important moment on this page is the one where she stops and goes to find a person.',
      ] },

      { type: 'h2', text: '1. The simplest possible win' },
      { type: 'transcript', turns: [
        { speaker: 'Maya', text: 'Hi Christine, your account is showing a past-due balance and I wanted to flag it before late fees pile up or your concessions get pulled. When were you thinking you could get this paid? Reply STOP to opt out.' },
        { speaker: 'Christine', text: 'Omg, thanks for reminding' },
        { speaker: 'Christine', text: 'Will pay it today' },
        { speaker: 'Maya', text: 'Okay, logged for June 18. I\u2019ll check on June 19 and follow up if the payment hasn\u2019t posted.' },
        { speaker: 'Christine', text: 'Np' },
      ] },
      { type: 'p',
        text: 'Look at Maya\u2019s last line. She does not say thank you and end the conversation. She logs a date and states that she will check the day after. That single habit, applied to every promise a resident makes, is most of the difference between controlled arrears and a balance that quietly grows.',
        spans: [
          'Look at Maya\u2019s last line. She does not say thank you and end the conversation. ',
          { text: 'She logs a date and states that she will check the day after.', strong: true },
          ' That single habit, applied to every promise a resident makes, is most of the difference between controlled arrears and a balance that quietly grows.',
        ],
      },

      { type: 'h2', text: '2. A payment plan, negotiated' },
      { type: 'transcript', turns: [
        { speaker: 'Maya', text: 'I\u2019m reaching out because there\u2019s a balance on your lease and I\u2019m trying to get a schedule in place to pay it off.' },
        { speaker: 'Resident', text: 'Yes I\u2019m paying 200 this Thursday & June 4th I will also try to make extra payments to get the balance down til they cover it' },
        { speaker: 'Resident', text: 'I just recently applied for a one shot deal' },
        { speaker: 'Maya', text: 'Okay, $200 by May 29 and $200 by June 4. That\u2019s a good start. Just to confirm, you\u2019re planning to keep making payments until HRA covers the rest, right?' },
        { speaker: 'Resident', text: 'Yes' },
      ] },
      { type: 'p', text: 'The resident mentions a one shot deal, which is HRA emergency rental assistance, and Maya keeps up without missing a beat. She also does the thing a good collector does: restates the loose commitment as two dated amounts, then confirms the plan out loud so both sides agree on what was said.' },

      { type: 'h2', text: '3. The payment that failed, and the answer nobody wants' },
      { type: 'transcript', turns: [
        { speaker: 'Maya', text: 'Okay, if the payment failed you\u2019ll want to try again. Sometimes it\u2019s a bank-side issue (insufficient funds, daily limit, wrong account info). Check those first, then try submitting again through the portal.' },
        { speaker: 'Resident', text: 'I upped the daily limit before trying to pay. Yeah it\u2019s not going through on my end. The funds are still in the account, I keep getting a payment failed notification.' },
        { speaker: 'Maya', text: 'I\u2019ll flag this for the team to look into on the payment processor side. In the meantime, if you want to try paying by check to avoid the late fee, you can mail it in and note your unit number.' },
        { speaker: 'Resident', text: 'Never mind it went through now! So it\u2019s saying I still owe a balance for June. I can pay that by end of day June 17th. I know I\u2019ll get a late fee right?' },
        { speaker: 'Maya', text: 'Yes, since June rent won\u2019t be fully paid by the 5th, a late fee will be added to your ledger.' },
        { speaker: 'Resident', text: 'Ok! I will pay all of june the 17th. thank you' },
        { speaker: 'Maya', text: 'Sounds good. I\u2019ll be watching the ledger and will reach out on June 18 if the payment hasn\u2019t posted.' },
      ] },
      { type: 'p',
        text: 'This is the one I would point a skeptic at. The resident asks a direct question with an unwelcome answer, and Maya gives it straight: yes, there will be a late fee. No hedging, no softening it into ambiguity. She also escalated the processor problem to a human before the resident asked her to.',
        spans: [
          'This is the one I would point a skeptic at. The resident asks a direct question with an unwelcome answer, and ',
          { text: 'Maya gives it straight: yes, there will be a late fee.', strong: true },
          ' No hedging, no softening it into ambiguity. She also escalated the processor problem to a human before the resident asked her to.',
        ],
      },

      { type: 'h2', text: '4. Chasing a check through the mail' },
      { type: 'transcript', turns: [
        { speaker: 'Resident', text: 'So far a payment for June has been sent. It\u2019s been sent out for May 23rd' },
        { speaker: 'Maya', text: 'Okay, so a June payment went out on May 23. I don\u2019t see it posted yet on our ledger, but checks can take up to a couple weeks to land. I\u2019ll watch for it. Can you get me the check number from your worker on Monday? That helps us track it on our end.' },
        { speaker: 'Resident', text: 'No problem' },
        { speaker: 'Maya', text: 'Sounds good. Let me know what you find out Monday.' },
      ] },
      { type: 'p', text: 'She reconciles what the resident says against what the ledger shows, explains the gap rather than disputing it, and asks for the one piece of information that would actually resolve it. This is the unglamorous work that goes undone when a person is busy.' },

      { type: 'h2', text: '5. A voucher holder, and a rule he had not heard' },
      { type: 'transcript', turns: [
        { speaker: 'Maya', text: 'Hi Leo, it\u2019s Maya on the management team. We don\u2019t have a current renters insurance policy on file for you, and the lease requires coverage. Can you reply with the carrier, policy number, and dates, or send a screenshot of the declarations page?' },
        { speaker: 'Leo', text: 'I\u2019m under a voucher' },
        { speaker: 'Maya', text: 'Got it. Renters insurance is still required by the lease even with a voucher. Most policies run around $10-15/month. If you can send the carrier name, policy number, and dates, I\u2019ll get it on file.' },
        { speaker: 'Leo', text: 'I was unaware of anything pertaining to the renters insurance policy. My voucher is under CityFHEPS. But I can make such a payment.' },
        { speaker: 'Maya', text: 'Right, the voucher covers rent, but renters insurance is separate. It covers your belongings and liability. Online signup takes about 5 minutes. Send me the details once you have it and I\u2019ll get it on file.' },
      ] },
      { type: 'p',
        text: 'Leo raises CityFHEPS as an objection, and Maya draws the correct line: the voucher pays rent, insurance covers his belongings and liability, and the two are unrelated. She also gives him a real price and a realistic time estimate rather than a policy quote. That is the local knowledge argument in five messages.',
        spans: [
          'Leo raises ',
          { text: 'CityFHEPS', href: '/blog/cityfheps-landlord-guide' },
          ' as an objection, and Maya draws the correct line: the voucher pays rent, insurance covers his belongings and liability, and the two are unrelated. She also gives him a real price and a realistic time estimate rather than a policy quote. That is the local knowledge argument in five messages.',
        ],
      },

      { type: 'h2', text: '6. The attachment that did not arrive' },
      { type: 'transcript', turns: [
        { speaker: 'Maya', text: 'Hi Felipe, it\u2019s Maya on the management team. We don\u2019t have a current renters insurance policy on file for you, and the lease requires coverage. Can you reply with the carrier, policy number, and start/end date, or send a screenshot of the declarations page?' },
        { speaker: 'Felipe', text: 'Let me know if this works' },
        { speaker: 'Maya', text: 'I didn\u2019t get an attachment with that message. Can you send the insurance dec page or policy details again?' },
        { speaker: 'Felipe', text: 'Hi Maya, attaching a screenshot of my current policy' },
        { speaker: 'Maya', text: 'Got the screenshot, thanks. I\u2019ll get this to the team to review and update your file.' },
        { speaker: 'Felipe', text: 'Great thanks' },
      ] },
      { type: 'p', text: 'Felipe thinks he sent something. He did not. Maya notices the attachment is missing and says so plainly instead of guessing at what he meant or letting the thread die. Small moment, and it is exactly where a compliance chase normally goes quiet for three weeks.' },

      { type: 'h2', text: '7. The one that took eight messages' },
      { type: 'transcript', turns: [
        { speaker: 'Maya', text: 'Hi Taylor, it\u2019s Maya on the management team. We don\u2019t have a current renters insurance policy on file for you, and the lease requires coverage. Can you send the declarations page?' },
        { speaker: 'Maya', text: 'Hi Taylor, circling back on the renters insurance declarations page. Got a moment to send it over?' },
        { speaker: 'Taylor', text: 'Sorry for the delay Maya. I\u2019m going to ask my husband to upload it' },
        { speaker: 'Maya', text: 'No problem. If he can send it right here as a photo or screenshot, that works too. I\u2019ll get it to the team either way.' },
        { speaker: 'Taylor', text: 'Not a problem. Thank you. Just give us until the end of the day. He works outside and sometimes doesn\u2019t have immediate access to his phone.' },
        { speaker: 'Maya', text: 'Sounds good, end of day works. I\u2019ll watch for it.' },
        { speaker: 'Taylor', text: '[attachment]' },
        { speaker: 'Maya', text: 'Got the photos, thanks. I\u2019ll get this to the team to confirm your policy is on file.' },
      ] },
      { type: 'p', text: 'Two follow-ups, an explanation about a husband who works outside, and a deadline the resident set herself. Maya accepts it without pushing and without disappearing. Notice she never expresses irritation, because there is none to express. That is the whole advantage in a compliance chase: the fourth ask sounds like the first.' },

      { type: 'h2', text: '8. The one where she does not know' },
      { type: 'transcript', turns: [
        { speaker: 'Mason', text: 'is there anywhere where i can print stuff near me' },
        { speaker: 'Maya', text: 'I don\u2019t have a list of nearby print shops on hand. Let me check with the team and get back to you.' },
        { speaker: 'Maya', text: 'Mason, I followed up on your printing question. The City Mailroom nearby has printing services, and most FedEx, UPS, and CVS locations offer this too.' },
      ] },
      { type: 'p',
        text: 'This is the most important conversation on the page, and it is three messages long. Mason asks something outside her records. She says she does not know, goes to a human, and comes back with the answer. The failure mode of AI in property management is a system that invents a confident answer instead. Watch what she does here, because it is the behavior everything else depends on.',
        spans: [
          'This is the most important conversation on the page, and it is three messages long. Mason asks something outside her records. ',
          { text: 'She says she does not know, goes to a human, and comes back with the answer.', strong: true },
          ' The failure mode of AI in property management is a system that invents a confident answer instead. Watch what she does here, because it is the behavior everything else depends on.',
        ],
      },

      { type: 'h2', text: 'What I did not expect' },
      { type: 'p', text: 'I went into these expecting residents to push back on talking to software. Read the eight above and count how many do. None.' },
      { type: 'p', text: 'Tenants want an answer to their question and they want it now. Everything else is a detail. Christine says omg thanks for reminding. Taylor apologizes for the delay and explains about her husband\u2019s job. Mason asks where to print something, the way you would ask anybody who works in the building.' },
      { type: 'p', text: 'The silence was never protecting anyone. It was just silence.' },
      { type: 'p',
        text: 'If you want the honest boundaries, including everything Maya should never be asked to do, we lay all of that out separately.',
        spans: [
          'If you want the honest boundaries, including ',
          { text: 'everything Maya should never be asked to do', href: '/blog/does-ai-property-manager-work' },
          ', we lay all of that out separately.',
        ],
      },
      { type: 'cta', label: 'See more conversations', href: '/#conversations' },
    ],
  },

  {
    slug: 'does-ai-property-manager-work',
    title: 'Does an AI Property Manager Actually Work? Here Is the Honest Answer',
    seoTitle: 'Does an AI Property Manager Actually Work?',
    description:
      'Most AI product pages pretend the software has no limits. Where Maya earns her keep for NYC owner-operators, where she stops cold, and why the second list is the reason to trust the first.',
    date: '2025-12-04',
    readingTime: '6 min read',
    category: 'AI property management',
    body: [
      { type: 'p', text: 'Most AI product pages are written as though the software has no limits whatsoever. Everything is seamless. Everything is effortless. Nothing ever goes sideways at 11pm on a Saturday.' },
      { type: 'p', text: 'That is a terrible way to sell something you are going to point at your tenants, and an even worse way to run a building. So let me do the opposite and show you where the walls are.' },
      { type: 'p', text: 'Maya is an AI property manager for NYC owner-operators, built by us at Half Ave. There is a real and honestly quite large set of work she does well. There is also a real set of things she should never be asked to touch. Both lists matter, and I would argue the second list is the entire reason to believe the first one.' },
      { type: 'ul', items: [
        '✅ Maya can: chase late rent and collect arrears, track promises to pay and verify whether they landed, answer routine tenant questions, hold a calm conversation about money, stay reachable long after business hours, and pull you in when it counts.',
        '⛔ Maya cannot: answer building-specific questions nobody wrote down, make decisions that belong to you, give legal advice or run an eviction, inspect a unit or meet a contractor, or stand in for a human being during a real crisis.',
      ] },

      { type: 'h2', text: 'Chasing rent, which is where she earns her keep' },
      { type: 'p', text: 'Straight to the center of it.' },
      { type: 'p', text: 'Arrears are a follow-up problem dressed up as a persuasion problem. The overwhelming majority of late rent comes back through consistent, timely, non-hostile contact. Reach out early. Agree on a plan. Check whether the money actually showed up. Reach out again when it did not.' },
      { type: 'p', text: 'Every piece of that is mechanical, and every piece of it gets skipped the moment a human being gets busy. Nobody enjoys chasing money. It is awkward, it repeats forever, and it is always the task that slides quietly into next week.' },
      { type: 'p', text: 'Then next week arrives. The balance is bigger. The conversation is harder. The tenant has started letting it ring.' },
      { type: 'p', text: 'Maya has a few advantages here that are almost embarrassing in their simplicity. She never gets busy. She never finds it awkward. She does not forget to check on Friday. If a tenant says the 14th, then on the 14th something actually looks.' },
      { type: 'p', text: 'Following up on every promise, every time, is most of the distance between a portfolio with controlled arrears and one where balances climb while everybody feels busy.' },

      { type: 'h2', text: 'Answering the same eleven questions forever' },
      { type: 'p', text: 'A huge share of tenant contact is the same handful of questions on a loop. What is my balance. Did my payment go through. When does rent count as late. How do I pay. Can I get a receipt. What do I do about this renters insurance certificate.' },
      { type: 'p', text: 'These are answerable straight from the records. They are asked constantly. And answering them eats an astonishing portion of a manager\u2019s day while producing precisely zero judgment value.' },
      { type: 'p', text: 'Maya handles them right away, at any hour, with no queue. The win is speed, sure. The bigger win is that they stop landing on you at all, which gives your attention back to the things that deserve it.' },

      { type: 'h2', text: 'Tone, which matters more than anyone admits' },
      { type: 'p', text: 'People get skeptical when I claim software can handle a rent conversation with real warmth, and honestly the skepticism is fair. But consider the alternative.' },
      { type: 'p', text: 'Rent conversations are stressful in both directions. The tenant who is behind is often embarrassed, defensive, or frightened. The manager having this exact conversation for the fortieth time this month is often short with her. Tone curdles, the tenant goes quiet, the balance grows.' },
      { type: 'p', text: 'Maya is as calm and respectful in conversation number forty as in conversation number one. She does not get frustrated. She does not get accusatory. She does not make somebody feel judged for being behind.' },
      { type: 'p', text: 'In arrears work, tone is no mere nicety. Tone decides whether a tenant engages or vanishes.' },
      { type: 'p', text: 'She is also awake at eleven at night, which, in my experience, is exactly when someone finally works up the nerve to deal with it.' },

      { type: 'h2', text: 'Knowing when to get out of the way' },
      { type: 'p', text: 'Maya\u2019s single most important skill is knowing when to stop talking and go find you.' },
      { type: 'p', text: 'When a conversation stops being routine, a hardship case, a dispute, a repair that needs scheduling, a call that needs your decision, the right outcome is a clean handoff with the context already gathered. You pick up a conversation somebody has already understood, rather than starting from zero at the worst possible moment.' },

      { type: 'h2', text: 'Now the list that matters more' },
      { type: 'p', text: 'The failure mode of AI in property management deserves a name, so I will give it one: Confident Wrongness. That is a system answering a question it should have escalated, in your name, to your tenant.' },
      { type: 'p', text: 'So this is where she stops.' },

      { type: 'h2', text: 'Anything about your building that nobody wrote down' },
      { type: 'p', text: 'This is the real boundary, and it is worth being precise about it.' },
      { type: 'p', text: 'Maya works from records. If the answer lives in the system, a balance, a payment date, a lease term, a policy, she can retrieve it. If the answer lives in your head, she cannot, and she should say so rather than improvise.' },
      { type: 'p', text: 'Questions of that kind: which plumber you use and whether he works Saturdays. Whether 4B has an informal arrangement with you about paying mid-month. When the boiler was last serviced. Whether you would waive a late fee this once for a fifteen-year tenant. What is happening with the third-floor renovation.' },
      { type: 'p', text: 'None of that is retrievable. The correct move is to say so plainly and hand it to you. A system that guesses here is worse than no system at all, because now a tenant has been told something untrue and your name is on it.' },

      { type: 'h2', text: 'Decisions that are yours' },
      { type: 'p', text: 'Accept a payment plan. Waive a fee. Renew a lease. Approve an expense. Begin proceedings. Those carry financial and legal weight, and they belong to the owner. Maya gathers the facts and puts them in front of you in one place. You decide.' },

      { type: 'h2', text: 'Legal advice, which is what your attorney is for' },
      { type: 'p', text: 'NYC housing law is complicated in ways that catch experienced operators. Rent stabilization, CityFHEPS, Section 8, housing court procedure. Getting any of it wrong carries consequences that show up with a docket number.' },
      { type: 'p', text: 'Maya is built to operate correctly inside those rules. She stops well short of advising on them, interpreting them for one tenant\u2019s particular circumstances, or conducting any part of a proceeding. Call your lawyer. That is a very good use of the money.' },

      { type: 'h2', text: 'Anything with a body' },
      { type: 'p', text: 'She cannot inspect a unit, let a contractor in, put a hand on a radiator to see whether the heat is truly on, or sign a document. Property management is partly a physical job, and that part still requires a person standing in a hallway.' },

      { type: 'h2', text: 'A human being in a real crisis' },
      { type: 'p', text: 'When somebody is in genuine distress, facing eviction, dealing with a family emergency, sitting in a situation that requires another human being to actually hear it, the answer is a person. Maya\u2019s job in that moment is to recognize it fast and get you involved. Nothing more.' },

      { type: 'h2', text: 'So, does an AI property manager actually work?' },
      { type: 'p', text: 'For the slice of work described above, yes, and the slice is bigger than most owners expect. It is the repetitive, unglamorous, forever-deferred follow-up layer that swallows most of a manager\u2019s day and generates most of the complaints tenants make.' },
      { type: 'p', text: 'The honest framing is this. Your property manager keeps their job. But most of what makes property management fail was never judgment work in the first place.' },
      { type: 'p', text: 'It was the second phone call that never happened. The promise nobody checked on. The message that arrived at 8pm on a Friday and sat there.' },
      { type: 'p', text: 'Those failures come from a shortage of hours, not a shortage of skill. A shortage of hours is a wonderful thing to automate. The judgment, the presence, the decisions: those stay yours, exactly where they belong.' },

      { type: 'h2', text: 'Frequently asked questions' },

      { type: 'h2', text: 'Can AI collect rent arrears?' },
      { type: 'p', text: 'Yes, and it is where automation performs best. Arrears collection is mostly a follow-up problem. Most late rent comes back through consistent, timely, non-hostile contact and by tracking whether promised payments actually arrived. That is mechanical work, and mechanical work is the first thing to get skipped when people are busy.' },

      { type: 'h2', text: 'Can an AI property manager replace a human property manager?' },
      { type: 'p', text: 'No. It cannot inspect a unit, meet a contractor, sign anything, make an ownership decision, or give legal advice. It takes over the routine follow-up layer, which shifts human time toward the situations that actually require judgment.' },

      { type: 'h2', text: 'Can AI handle tenant conversations with empathy?' },
      { type: 'p', text: 'It can hold a calm, respectful, non-accusatory conversation about money at any hour, without getting tired or short-tempered. That matters enormously in arrears work, where tone decides whether a tenant engages or disappears. It is still no substitute for a human relationship, and a tenant in real crisis should be handed to a person.' },

      { type: 'h2', text: 'What can an AI property manager not answer?' },
      { type: 'p', text: 'Anything specific to your building that nobody wrote down. Which contractor you prefer, whether a tenant has an informal arrangement with you, when the boiler was last serviced, whether you will waive a fee this once. If the answer lives only in an owner\u2019s head, the system should hand off rather than guess.' },
    ],
  },

  {
    slug: 'i-watched-100-conversations-ai-property-manager',
    title: 'I Read 100 Conversations Between My Tenants and an AI. Here Is What Surprised Me.',
    seoTitle: '100 Tenant Conversations With an AI',
    description:
      'I expected to grade a chatbot. Instead I found something that starts the conversation, carries the relentless eighty percent, and knows the exact moment to hand the resident to a human.',
    date: '2026-01-15',
    readingTime: '4 min read',
    category: 'Field notes',
    body: [
      { type: 'p', text: 'I run my own buildings. For the past few months an AI has handled the tenant messaging in them: arrears, insurance, maintenance intake. So one weekend I did something slightly obsessive and went back and read every transcript.' },
      { type: 'p', text: 'Over 100 real conversations, across nearly 200 residents. Every single one with money or compliance riding on it.' },
      { type: 'p', text: 'I sat down expecting to grade a chatbot. That is not what I found, and the difference turned out to be the whole story.' },
      { type: 'p', text: 'Four things stuck with me.' },

      { type: 'h2', text: '1. Calling it a chatbot gets it exactly backwards' },
      { type: 'p', text: 'A chatbot is that little help bubble in the corner of a website. It waits for you. You have a question, you open it, it answers, it goes back to sleep.' },
      { type: 'p', text: 'Reactive by design. Its entire job is to be sitting there when you come looking. Order status, password reset, return policy. The product already works, and the bot tidies up the tail end.' },
      { type: 'p', text: 'What I was reading did the inverse.' },
      { type: 'p', text: 'The tell was sitting right there in the message log. It sent more messages than it received. Roughly 950 outbound against 590 inbound. It starts most of the conversations.' },
      { type: 'p', text: 'A chatbot cannot do that. A chatbot has nothing to say until spoken to. This thing texts the resident first, because chasing rent and lapsed insurance is something you go out and initiate rather than something you sit around waiting to be asked about.' },
      { type: 'p', text: 'That one ratio reframes everything. The tenant is answering a property manager who reached out first, and the property manager happens to be software.' },

      { type: 'h2', text: '2. What it is good at: the grind' },
      { type: 'p', text: 'I want to name the category of work that filled these transcripts, because I think the category is the actual product. I will call it The Relentless Eighty.' },
      { type: 'ul', items: [
        '💵 Reaching every delinquent resident, every cycle, and running the demand sequence correctly each time',
        '🛡️ Following up on renters insurance, chasing lapses, confirming coverage, logging it',
        '🔧 Taking maintenance requests as they arrive, day or night',
        '✅ Tracking who promised to pay what, and whether the money actually landed',
      ] },
      { type: 'p', text: 'None of this is hard in the clever sense. It is hard in the relentless sense: high volume, unforgiving on timing, and thoroughly thankless. It is the kind of work that drowns a capable person, and frankly the kind of work a capable person is wasted on.' },
      { type: 'p', text: 'This is where the machine shines. It does not get tired on the fortieth arrears message. It does not forget to circle back. It does not skip the resident nobody wants to call, and let me tell you, there is always a resident nobody wants to call.' },
      { type: 'p', text: 'Across 100-plus conversations, the routine middle of the job simply ran. Nobody touched it. That is why you hand it over.' },

      { type: 'h2', text: '3. What it is bad at, which I care about a good deal more' },
      { type: 'p', text: 'If I told you only the wins, I would be selling you a demo, and you would be right to close the tab.' },
      { type: 'p', text: 'So here is the honest half. The AI is good right up until the conversation stops being routine. The moment a case needs judgment instead of a rule, it should stop and hand the resident to a human. The system is built so that it does exactly that:' },
      { type: 'ul', items: [
        '💔 A resident in genuine crisis, where the right response is a conversation rather than the next step in a sequence',
        '⚖️ A legal gray area where the regulation refuses to apply cleanly',
        '🏛️ A voucher or subsidy timing question where the true answer is it depends, and somebody has to decide what it depends on',
        '🧭 Any moment where the correct move is deciding what the rule should be here, instead of following the rule',
      ] },
      { type: 'p', text: 'That last twenty percent belongs to a human being. Trying to automate it is how you end up as a viral screenshot of a bot saying something idiotic to somebody who is struggling.' },
      { type: 'p', text: 'The skill lies in knowing precisely where to stop.' },
      { type: 'p', text: 'One more thing it is bad at: pretending. The stakes in this business are a long way from a mistaken return policy. A botched demand sequence or a mistimed compliance notice is a legal liability.' },
      { type: 'p', text: 'Which means the rules that carry weight cannot live in a friendly prompt and a hopeful spirit. They have to be hard-coded and identical every single time. Sounding helpful is the easy part. Being correct about regulated, jurisdiction-specific work, every time, unsupervised, is the actual product.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'A chatbot answers a question after the work is already finished. It is reactive, it serves the tail, and it is measured by how few humans it drags into the room.' },
      { type: 'p', text: 'An assistant property manager does the work itself. It reaches out first. It carries The Relentless Eighty that grinds people down. It hands you the twenty that requires a person.' },
      { type: 'p', text: 'Same two letters. Completely different machine.' },
      { type: 'p', text: 'After 100-plus conversations, here is the cleanest way I can put it. A chatbot is the last mile. Maya is the first eighty.' },
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

// ---------------------------------------------------------------------------
// SEO helpers
// ---------------------------------------------------------------------------

/** <title> text. Prefers the short SEO variant, falls back to the H1. */
export function pageTitle(post: Post): string {
  return post.seoTitle ?? post.title
}

/**
 * FAQPage JSON-LD built from the trailing "Frequently asked questions" section.
 * Pairs each question-shaped h2 with the paragraph that follows it.
 * Returns null when a post has no FAQ section.
 */
export function faqSchema(post: Post): object | null {
  const b = post.body
  const start = b.findIndex(x => x.type === 'h2' && x.text === 'Frequently asked questions')
  if (start < 0) return null

  const faqs: { q: string; a: string }[] = []
  for (let i = start + 1; i < b.length; i++) {
    const h = b[i]
    const a = b[i + 1]
    if (h.type !== 'h2' || !h.text.trim().endsWith('?')) continue
    if (a?.type === 'p') faqs.push({ q: h.text, a: a.text })
  }
  if (!faqs.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** BlogPosting JSON-LD. Pass your canonical origin, e.g. 'https://halfave.com'. */
export function articleSchema(post: Post, origin: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': origin + '/blog/' + post.slug },
    author: { '@type': 'Organization', name: 'Half Ave', url: origin },
    publisher: { '@type': 'Organization', name: 'Half Ave', url: origin },
  }
}

/** Every URL for sitemap.xml generation, newest first. */
export function sitemapEntries(origin: string) {
  return [...POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(p => ({ loc: origin + '/blog/' + p.slug, lastmod: p.updated ?? p.date }))
}