import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const tools = [
  {
    name: 'Fireflies.ai',
    tagline: 'Best for teams that need transcripts across every call',
    description:
      'Fireflies joins your video calls automatically and produces accurate transcripts with speaker labels. The search function is strong — useful when you need to pull up what a client said three weeks ago.',
    bestFor: 'Teams with high call volume who need a reliable, searchable record of every conversation.',
    limitations: 'The AI summaries can be generic. You will want to edit before sending to clients.',
    pricing: 'Free tier available. Pro starts at $10/seat/month.',
  },
  {
    name: 'Otter.ai',
    tagline: 'Best for real-time notes during calls',
    description:
      'Otter shows a live transcript as the call happens. Useful when you want to glance at what was just said without rewinding. It also lets you highlight and comment directly in the transcript.',
    bestFor: 'Solo operators and small teams who take notes during calls and want an assistant to do it for them.',
    limitations: 'Less strong on post-call workflow automation. Better for capture than action.',
    pricing: 'Free tier available. Pro at $16.99/month.',
  },
  {
    name: 'Notion AI (Meeting Notes)',
    tagline: 'Best if you already run your ops in Notion',
    description:
      'If your team lives in Notion, the AI meeting notes feature keeps everything in one place. Record externally, paste the transcript, and let Notion AI format a structured summary.',
    bestFor: 'Teams already using Notion for project management and documentation who want to avoid adding another tool.',
    limitations: 'Requires an existing recording — it does not auto-join calls. More manual than dedicated tools.',
    pricing: 'Included in Notion AI plans from $10/member/month.',
  },
  {
    name: 'tl;dv',
    tagline: 'Best for recording and clipping client calls',
    description:
      'tl;dv records video calls and lets you timestamp key moments during the call. You can share specific clips with clients or your team without sharing the whole recording.',
    bestFor: 'Agencies who share call recordings with clients or use clips for internal handoffs.',
    limitations: 'Primarily a recording tool — the AI summaries are a secondary feature.',
    pricing: 'Free tier available. Pro at $18/user/month.',
  },
  {
    name: 'Fathom',
    tagline: 'Best free option for individual users',
    description:
      'Fathom records Zoom, Google Meet, and Teams calls and produces clean summaries. The free plan is genuinely useful — no aggressive upsell during onboarding.',
    bestFor: 'Freelancers and small agencies who want a capable free tool without a subscription.',
    limitations: 'Less granular control over summary format. Works best with their default structure.',
    pricing: 'Free plan available. Team plan at $19/user/month.',
  },
]

export default function BestAIMeetingAssistants() {
  return (
    <>
      <Head>
        <title>Best AI Meeting Assistants for Agency Teams — AI Ops Agency</title>
        <meta
          name="description"
          content="Stop taking manual notes. The best AI meeting assistants for small agencies in 2026 — compared by use case, price, and what actually works."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Best AI Meeting Assistants for Agency Teams" />
        <meta
          property="og:description"
          content="Stop taking manual notes. The best AI meeting assistants for small agencies in 2026 — compared by use case, price, and what actually works."
        />
      </Head>

      <Nav />

      <main>
        {/* Header */}
        <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
          <div className="mb-4">
            <Link
              href="/tools"
              className="text-xs font-medium text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
            >
              Tools
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Best AI Meeting Assistants for Agency Teams
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Stop taking manual notes. Here are the tools worth using in 2026 — compared by use case, price, and what
            actually matters for small agency operations.
          </p>
          <p className="mt-3 text-sm text-gray-400">Updated March 2026 · 5 tools reviewed</p>
        </section>

        {/* Intro */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <div className="space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                Every agency runs on calls — discovery calls, kickoffs, check-ins, handoffs. Manual note-taking during
                those calls is slow, distracting, and inconsistent. AI meeting assistants automate the capture layer
                so you can focus on the conversation.
              </p>
              <p>
                The tools below are the ones that hold up in daily agency use. Not every tool fits every team — the
                right choice depends on your call volume, your existing stack, and whether you need transcripts, summaries,
                clips, or all three.
              </p>
              <p>
                This is not a sponsored list. The recommendations reflect what actually works for small teams.
              </p>
            </div>
          </div>
        </section>

        {/* Tool List */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-10">The Tools</h2>
          <div className="space-y-12">
            {tools.map((tool) => (
              <article key={tool.name} className="border-t border-gray-100 pt-8">
                <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{tool.tagline}</p>
                <p className="mt-4 text-base text-gray-700 leading-relaxed">{tool.description}</p>
                <dl className="mt-6 space-y-3">
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Best for</dt>
                    <dd className="mt-1 text-sm text-gray-700">{tool.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Limitations</dt>
                    <dd className="mt-1 text-sm text-gray-700">{tool.limitations}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pricing</dt>
                    <dd className="mt-1 text-sm text-gray-700">{tool.pricing}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* How to Choose */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to choose the right one</h2>
            <div className="space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                If you want the most capable free option, start with <strong>Fathom</strong>. It covers the basics
                without any cost.
              </p>
              <p>
                If you run a lot of calls and need a searchable record across your whole team, <strong>Fireflies.ai</strong>{' '}
                is the most complete option. The search alone justifies the cost for teams with high call volume.
              </p>
              <p>
                If you share recordings or clips with clients, <strong>tl;dv</strong> handles that workflow better than
                the others.
              </p>
              <p>
                If your team already lives in Notion, lean into <strong>Notion AI</strong> before adding another tool.
                Adding less software is almost always the right move.
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Related</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/tools/best-ai-tools-small-agencies"
                className="flex items-center justify-between group text-sm font-medium text-gray-800 border-b border-gray-100 pb-3 hover:text-gray-500 transition-colors"
              >
                <span>Best AI tools for small agencies</span>
                <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
              </Link>
            </li>
            <li>
              <Link
                href="/guides/automate-client-onboarding-small-agency"
                className="flex items-center justify-between group text-sm font-medium text-gray-800 border-b border-gray-100 pb-3 hover:text-gray-500 transition-colors"
              >
                <span>How to automate client onboarding</span>
                <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-gray-400">
          <span>AI Ops Agency</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/newsletter" className="hover:text-gray-600 transition-colors">
              Newsletter
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
