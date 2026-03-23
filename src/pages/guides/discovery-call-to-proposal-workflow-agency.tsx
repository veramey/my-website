import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const CANONICAL_URL = 'https://www.aiopagency.com/guides/discovery-call-to-proposal-workflow-agency'

export default function DiscoveryCallToProposalWorkflow() {
  return (
    <>
      <Head>
        <title>How to Turn Discovery Calls into Proposals with AI</title>
        <meta
          name="description"
          content="A repeatable workflow for small agencies: go from discovery call to polished proposal in under 45 minutes using AI transcription, extraction, and drafting."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="How to Turn Discovery Calls into Proposals with AI" />
        <meta
          property="og:description"
          content="A repeatable workflow for small agencies: go from discovery call to polished proposal in under 45 minutes using AI transcription, extraction, and drafting."
        />
        <meta property="og:url" content={CANONICAL_URL} />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>

      <Nav />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <article>
          <header>
            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-4">
              Guides
            </p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              How to Turn Discovery Calls into Proposals with AI
            </h1>
            <p className="mt-4 text-base text-gray-500 leading-relaxed">
              Most agencies spend 2&ndash;4 hours turning a single discovery call into a proposal. You take notes during the call, re-listen to parts you missed, manually pull out scope details, draft the proposal from scratch, format it, review it, and send it a day or two later. By then the prospect has cooled off &mdash; or worse, talked to a faster competitor. This guide walks through a five-step workflow that cuts that time to under 45 minutes using AI tools you can set up today.
            </p>
          </header>

          {/* Section 1: The Problem */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">The Problem: Why Discovery-to-Proposal Takes So Long</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              The typical agency discovery-to-proposal workflow has five manual bottlenecks. First, you&apos;re trying to take notes while also running the conversation &mdash; which means you miss details. Second, after the call you spend 20&ndash;30 minutes reconstructing what was said. Third, you manually extract scope, budget, timeline, and deliverables from scattered notes. Fourth, you open a blank document and draft the proposal from scratch. Fifth, you format, review, and send &mdash; usually the next day.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Each of those steps is a time sink, but the real cost is the delay. A proposal sent 48 hours after a discovery call converts at a measurably lower rate than one sent same-day. Speed signals competence. It tells the prospect you have systems, not chaos.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              The workflow below replaces most of the manual work with AI-assisted steps. You still review everything &mdash; AI doesn&apos;t replace your judgment &mdash; but it eliminates the blank-page problem and the reconstruction work that eats most of the time.
            </p>
          </section>

          {/* Section 2: Workflow Overview */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">The Workflow at a Glance</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              The full flow has five steps. Each one feeds into the next, and the entire sequence can run in under 45 minutes once you&apos;ve done it twice.
            </p>
            <ol className="mt-4 text-base text-gray-600 leading-relaxed space-y-2 list-decimal list-inside">
              <li><span className="font-medium">Record and transcribe</span> the discovery call automatically</li>
              <li><span className="font-medium">Extract key information</span> from the transcript using a structured AI prompt</li>
              <li><span className="font-medium">Generate a proposal draft</span> from the extracted data using a second prompt</li>
              <li><span className="font-medium">Review and personalize</span> &mdash; fix what AI gets wrong, add what only you know</li>
              <li><span className="font-medium">Send and follow up</span> &mdash; same day, while context is fresh</li>
            </ol>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              The time breakdown: Step 1 is passive (the tool records while you talk). Step 2 takes about 5 minutes. Step 3 takes 5 minutes. Step 4 &mdash; your review &mdash; takes 15&ndash;25 minutes. Step 5 takes 5 minutes. Total active time: roughly 30&ndash;40 minutes.
            </p>
          </section>

          {/* Step 1 */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Step 1: Record and Transcribe the Call</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Stop taking notes during discovery calls. Your job on the call is to listen, ask good questions, and build rapport. Let a recording tool handle the capture. Every major video conferencing platform now supports AI meeting assistants that join the call, record audio, and produce a transcript within minutes of the call ending.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Set your tool to auto-join all scheduled calls, or manually invite it when a call starts. After the call, you&apos;ll have a full transcript &mdash; usually within 2&ndash;5 minutes. Most tools also generate an automatic summary, but don&apos;t rely on that for proposal work. The generic summary misses the specific details you need. You want the full transcript for the next step.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              One important note: always tell the prospect you&apos;re recording. A simple &ldquo;I&apos;m going to have our note-taking tool join so I can focus on the conversation instead of typing&rdquo; works well. Nobody objects to this &mdash; it actually builds confidence that you&apos;re organized.
            </p>
            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Tools for recording and transcription</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1 leading-relaxed">
                <li><span className="font-medium">Fathom</span> &mdash; free tier is excellent. Auto-joins Zoom calls, produces transcripts and summaries fast. Best starting point for most agencies.</li>
                <li><span className="font-medium">Otter.ai</span> &mdash; strong transcription accuracy, real-time collaboration on notes. Good if you want to highlight key moments during the call.</li>
                <li><span className="font-medium">Fireflies.ai</span> &mdash; best integration ecosystem. Connects to Zoom, Google Meet, Teams, and pushes transcripts to Notion, Slack, or CRMs via Zapier.</li>
              </ul>
            </aside>
            <p className="mt-4 text-sm text-gray-500">
              For a detailed comparison of these tools, see{' '}
              <Link
                href="/tools/best-ai-meeting-assistants-agencies"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                the best AI meeting assistants for agency teams
              </Link>
              .
            </p>
          </section>

          {/* Step 2 */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Step 2: Extract Key Information with AI</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Once you have the transcript, the next step is pulling out the specific details you need for a proposal. Don&apos;t read the whole transcript manually &mdash; paste it into Claude or ChatGPT with a structured extraction prompt. The prompt tells the AI exactly what to look for and how to format the output.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              This step takes about 5 minutes: copy the transcript, paste it with the prompt, review the extracted output, and correct anything that looks off. The AI will occasionally misattribute who said what or infer scope details that weren&apos;t explicitly stated. Skim the output against your memory of the call before moving on.
            </p>
            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Extraction prompt</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Copy and paste this prompt with your transcript:
              </p>
              <pre className="mt-3 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
{`You are an agency operations assistant. I'm going to paste a transcript from a discovery call with a prospective client. Extract the following information in a structured format:

1. **Client name and company**
2. **Their core problem or need** (in their words, not paraphrased)
3. **Project scope** — what they want done, as specifically as stated
4. **Budget range** — if mentioned, even indirectly
5. **Timeline** — any deadlines or urgency signals
6. **Decision-making process** — who else is involved, what approvals are needed
7. **Success criteria** — how they'll judge whether the project worked
8. **Red flags or concerns** — anything they expressed hesitation about
9. **Key quotes** — 2-3 direct quotes that capture their priorities

If any field wasn't discussed, write "Not mentioned" — do not guess.

TRANSCRIPT:
[Paste transcript here]`}
              </pre>
            </aside>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              The output gives you a structured brief that would normally take 20&ndash;30 minutes to compile from notes. Save this output &mdash; it feeds directly into Step 3, and it&apos;s also useful as a CRM note or internal handoff document if someone else on your team will work on the project.
            </p>
          </section>

          {/* Step 3 */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Step 3: Generate the Proposal Draft</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              With the extracted information in hand, you now generate a first draft of the proposal. The key here is giving the AI a clear structure to follow &mdash; your agency&apos;s proposal format &mdash; along with the extracted data from Step 2. The AI fills in the sections; you refine them in Step 4.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Don&apos;t ask the AI to &ldquo;write a proposal.&rdquo; That produces generic, bloated output. Instead, give it the exact sections your proposal should contain and let the extracted data drive the content. The prompt below uses a standard agency proposal structure, but you should modify the sections to match whatever format you already send to clients.
            </p>
            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Proposal draft prompt</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Use this prompt with the output from Step 2:
              </p>
              <pre className="mt-3 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
{`Using the discovery call summary below, draft a client proposal with the following sections:

1. **Executive Summary** — 2-3 sentences restating their problem and how we'll solve it. Mirror their language.
2. **Scope of Work** — specific deliverables, broken into phases if applicable. Be concrete, not vague.
3. **Approach** — how we'll execute, including key milestones and checkpoints.
4. **Timeline** — realistic delivery schedule based on what was discussed.
5. **Investment** — [Leave placeholder for pricing — I'll fill this in manually]
6. **What We Need From You** — client responsibilities and inputs required.
7. **Next Steps** — clear call to action to move forward.

Tone: professional but direct. No filler language, no "we're excited to partner with you" padding. Write like a competent operator, not a sales deck.

DISCOVERY CALL SUMMARY:
[Paste Step 2 output here]`}
              </pre>
            </aside>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              This draft will be 70&ndash;80% ready. The structure will be right, the scope section will reflect what was actually discussed, and the language will be professional. What it won&apos;t get right: pricing, nuanced positioning, and anything that requires reading between the lines of the conversation. That&apos;s what Step 4 is for.
            </p>
          </section>

          {/* Step 4 */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Step 4: Review and Personalize</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              This is where your expertise matters most, and it&apos;s the step you should never skip. The AI draft gives you structure and a first pass at content. Your job is to make it accurate, specific, and human. Plan to spend 15&ndash;25 minutes here.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              There are five things AI consistently gets wrong in proposals that you need to fix every time:
            </p>
            <ul className="mt-3 text-base text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
              <li><span className="font-medium">Pricing</span> &mdash; always fill this in yourself. AI has no context for your rates, margins, or how you value the work.</li>
              <li><span className="font-medium">Scope boundaries</span> &mdash; AI tends to be vague about what&apos;s included vs. excluded. Tighten this. Ambiguous scope is where projects go sideways.</li>
              <li><span className="font-medium">Client-specific nuance</span> &mdash; if the prospect mentioned a past bad experience with another agency, or a specific internal constraint, weave that in. The AI might have captured it in the extraction but won&apos;t know how to use it strategically.</li>
              <li><span className="font-medium">Tone calibration</span> &mdash; some clients want formal, some want casual. Adjust to match how they spoke on the call.</li>
              <li><span className="font-medium">Over-promising</span> &mdash; AI drafts tend to be slightly more optimistic than you should be. Trim any deliverables or timelines that feel aggressive.</li>
            </ul>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              After your review, paste the proposal into your standard template &mdash; whether that&apos;s a Google Doc, Notion page, or dedicated proposal tool like PandaDoc or Qwilr. The AI draft is raw content; your template adds branding, formatting, and a professional finish.
            </p>
          </section>

          {/* Step 5 */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Step 5: Send and Follow Up</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Send the proposal the same day as the call. This is the whole point of the workflow &mdash; compressing a 2-day process into a same-day delivery. A proposal that arrives within hours of the conversation makes a strong impression and keeps the momentum alive.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Write a short cover email that references something specific from the call &mdash; not a generic &ldquo;thanks for your time.&rdquo; Mention a detail that shows you listened. Then attach or link to the proposal and state a clear next step: &ldquo;Let me know if you&apos;d like to discuss any of the scope details. I&apos;m available Thursday or Friday for a quick follow-up.&rdquo;
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Set a follow-up reminder for 3 business days out. If you haven&apos;t heard back, send a short check-in &mdash; not a &ldquo;just following up&rdquo; email, but something that adds value: a relevant case study, a clarification on something discussed, or an answer to a question they raised on the call.
            </p>
          </section>

          {/* Prompt Pack */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">The Full Prompt Pack</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Below are all the prompts used in this workflow, ready to copy and paste. Save these in a shared doc your team can access. Modify the proposal structure to match your actual format &mdash; the prompts work best when they reflect how your agency already writes proposals.
            </p>

            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Prompt 1: Discovery call extraction</h3>
              <pre className="mt-3 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
{`You are an agency operations assistant. I'm going to paste a transcript from a discovery call with a prospective client. Extract the following information in a structured format:

1. Client name and company
2. Their core problem or need (in their words, not paraphrased)
3. Project scope — what they want done, as specifically as stated
4. Budget range — if mentioned, even indirectly
5. Timeline — any deadlines or urgency signals
6. Decision-making process — who else is involved, what approvals are needed
7. Success criteria — how they'll judge whether the project worked
8. Red flags or concerns — anything they expressed hesitation about
9. Key quotes — 2-3 direct quotes that capture their priorities

If any field wasn't discussed, write "Not mentioned" — do not guess.

TRANSCRIPT:
[Paste transcript here]`}
              </pre>
            </aside>

            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Prompt 2: Proposal draft generation</h3>
              <pre className="mt-3 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
{`Using the discovery call summary below, draft a client proposal with the following sections:

1. Executive Summary — 2-3 sentences restating their problem and how we'll solve it. Mirror their language.
2. Scope of Work — specific deliverables, broken into phases if applicable. Be concrete, not vague.
3. Approach — how we'll execute, including key milestones and checkpoints.
4. Timeline — realistic delivery schedule based on what was discussed.
5. Investment — [Leave placeholder for pricing]
6. What We Need From You — client responsibilities and inputs required.
7. Next Steps — clear call to action to move forward.

Tone: professional but direct. No filler language. Write like a competent operator, not a sales deck.

DISCOVERY CALL SUMMARY:
[Paste extraction output here]`}
              </pre>
            </aside>

            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Prompt 3: Cover email draft</h3>
              <pre className="mt-3 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
{`Write a short cover email to send with a proposal after a discovery call. Use these inputs:

- Client name: [Name]
- One specific detail from the call to reference: [Detail]
- Proposal delivery method: [Attached / Link]

The email should:
- Be under 120 words
- Reference the specific detail to show I was listening
- Briefly state what's in the proposal
- End with a clear next step and availability for follow-up
- Sound like a real person, not a template

Do not use "excited" or "thrilled" or any filler enthusiasm.`}
              </pre>
            </aside>

            <aside className="bg-gray-50 border border-gray-100 rounded-lg p-5 mt-5">
              <h3 className="text-base font-medium text-gray-900">Prompt 4: Follow-up email (3 days later)</h3>
              <pre className="mt-3 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
{`Write a follow-up email for a proposal I sent 3 days ago. The client hasn't responded yet.

- Client name: [Name]
- Project type: [Brief description]
- One open question from the call: [Question]

The email should:
- Be under 80 words
- NOT say "just following up" or "checking in"
- Add value: either answer a question from the call, share a relevant insight, or clarify a scope detail
- End with a low-pressure next step
- Sound helpful, not pushy`}
              </pre>
            </aside>
          </section>

          {/* Related Resources */}
          <section className="border-t border-gray-200 pt-10 mt-12">
            <h2 className="text-xl font-semibold text-gray-900">Related resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Link
                href="/guides/automate-client-onboarding-small-agency"
                className="block rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors"
                aria-label="Read: How to Automate Client Onboarding for a Small Agency"
              >
                <p className="text-sm font-medium text-gray-900">How to Automate Client Onboarding</p>
                <p className="mt-1 text-sm text-gray-500">The full onboarding system — from intake form to follow-up handoff — that picks up where this guide leaves off.</p>
              </Link>
              <Link
                href="/tools/best-ai-meeting-assistants-agencies"
                className="block rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors"
                aria-label="Read: Best AI Meeting Assistants for Agency Teams"
              >
                <p className="text-sm font-medium text-gray-900">Best AI Meeting Assistants for Agencies</p>
                <p className="mt-1 text-sm text-gray-500">Detailed comparison of Fathom, Fireflies, and Otter — which to use for discovery calls and client meetings.</p>
              </Link>
              <Link
                href="/guides/7-workflows-automate-small-agency"
                className="block rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors"
                aria-label="Read: 7 Workflows Every Small Agency Should Automate with AI"
              >
                <p className="text-sm font-medium text-gray-900">7 Workflows to Automate First</p>
                <p className="mt-1 text-sm text-gray-500">Proposal creation is one of seven high-ROI automations. Here's the full list, ranked by time saved.</p>
              </Link>
            </div>
          </section>

          {/* Closing */}
          <section className="border-t border-gray-100 pt-8 mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Making This Your Default Workflow</h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              The first time you run this workflow, it will take about an hour as you get familiar with the prompts and adjust them to your proposal format. By the third time, you&apos;ll be under 45 minutes. By the fifth, it&apos;ll feel automatic.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              The key to making it stick: save your customized prompts somewhere your whole team can access them. A shared Notion page, a Google Doc, a Slack canvas &mdash; it doesn&apos;t matter where, as long as everyone on the team uses the same prompts. Consistency is what turns this from a hack into a system.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Start with your next discovery call. Record it, run the extraction prompt, generate the draft, review it, and send it same-day. One complete cycle will show you exactly where to customize the prompts for your agency&apos;s specific needs.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              This workflow connects to a broader system for{' '}
              <Link
                href="/guides/automate-client-onboarding-small-agency"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                automating client onboarding
              </Link>
              . Once the proposal is signed, the{' '}
              <Link
                href="/templates/client-onboarding-ai-checklist"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                client onboarding AI checklist
              </Link>
              {' '}picks up where this guide leaves off.
            </p>
          </section>
        </article>
      </div>
    </>
  )
}
