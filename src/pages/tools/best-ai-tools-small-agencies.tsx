import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const tools = [
  {
    category: 'Meeting Assistants',
    name: 'Otter.ai',
    description:
      'Automatically transcribes and summarizes meetings. Useful for agencies running discovery calls, kickoffs, and internal standups. Reduces the time spent writing meeting notes from 30+ minutes to near zero.',
    bestFor: 'Teams doing a lot of calls and needing fast, shareable summaries.',
    href: '/tools/best-ai-meeting-assistants-agencies',
  },
  {
    category: 'Meeting Assistants',
    name: 'Fireflies.ai',
    description:
      'Records, transcribes, and indexes meetings with action item extraction. Integrates with most video conferencing tools and CRMs. Particularly strong if you want searchable call archives.',
    bestFor: 'Agencies managing multiple client relationships with recurring calls.',
    href: '/tools/best-ai-meeting-assistants-agencies',
  },
  {
    category: 'Workflow Automation',
    name: 'Make (formerly Integromat)',
    description:
      'Visual workflow automation that connects your tools without code. Handles complex multi-step workflows better than Zapier at a lower price point. Ideal for onboarding sequences, lead routing, and internal notifications.',
    bestFor: 'Agencies with repetitive cross-tool processes that eat up admin time.',
    href: '/guides',
  },
  {
    category: 'Workflow Automation',
    name: 'Zapier',
    description:
      'The most widely supported automation platform. Simpler to set up than Make, with a larger app library. Best used for straightforward two-step triggers rather than complex logic.',
    bestFor: 'Teams that need automation fast and want maximum app compatibility.',
    href: '/guides',
  },
  {
    category: 'Proposals & Docs',
    name: 'ChatGPT (GPT-4)',
    description:
      'Drafts proposals, SOPs, client briefs, and internal documentation at speed. Most useful when you have clear prompts and review everything before sending. Not a replacement for judgment — a replacement for blank-page friction.',
    bestFor: 'Any writing-heavy task: proposals, onboarding docs, status updates, SOPs.',
    href: '/guides',
  },
  {
    category: 'Knowledge & SOPs',
    name: 'Notion AI',
    description:
      'Notion with AI built in. Useful for teams already using Notion for documentation. AI features assist with summarising pages, generating drafts, and filling in structured templates. Best when your knowledge base is already in Notion.',
    bestFor: 'Agencies using Notion who want AI to extend — not replace — their existing workflows.',
    href: '/guides',
  },
  {
    category: 'Knowledge & SOPs',
    name: 'Guru',
    description:
      'A knowledge management platform that keeps team information accurate and surfaced in context. Works inside Slack and Chrome. Useful for agencies where the same questions keep getting asked or institutional knowledge lives in someone\'s head.',
    bestFor: 'Teams scaling past 5 people who need structured, findable internal knowledge.',
    href: '/guides',
  },
  {
    category: 'Client Communication',
    name: 'Loom',
    description:
      'Async video messaging for client updates, walkthroughs, and feedback. Cuts down on unnecessary calls and gives clients a clear, personal update without scheduling overhead. AI features can auto-generate titles and summaries.',
    bestFor: 'Agencies with remote clients or those looking to reduce unnecessary meetings.',
    href: '/guides',
  },
]

const categories = [...new Set(tools.map((t) => t.category))]

export default function BestAiToolsSmallAgencies() {
  return (
    <>
      <Head>
        <title>Best AI Tools for Small Agencies in 2026 — AI Ops Agency</title>
        <meta
          name="description"
          content="A practical roundup of the AI tools worth using in small agencies: meeting assistants, workflow automation, proposals, SOPs, and client comms."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Best AI Tools for Small Agencies in 2026" />
        <meta
          property="og:description"
          content="A practical roundup of the AI tools worth using in small agencies: meeting assistants, workflow automation, proposals, SOPs, and client comms."
        />
      </Head>

      <Nav />

      <main>
        {/* Article Header */}
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Tools</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Best AI Tools for Small Agencies in 2026
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            A practical roundup of AI tools that move the needle for lean agency teams. No hype — just tools that solve real operations problems.
          </p>
          <div className="mt-6 flex items-center gap-6 text-xs text-gray-400">
            <span>Category: Tools Roundup</span>
            <span>Updated March 2026</span>
          </div>
        </section>

        {/* Intro */}
        <section className="border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="prose prose-gray max-w-none text-base text-gray-700 leading-relaxed space-y-4">
              <p>
                Most AI tool lists are written for enterprise teams or solo creators. This one is for small agencies — teams of 2 to 10 people — where every hour of admin overhead comes directly at the expense of client work.
              </p>
              <p>
                The tools below are selected based on one criterion: do they actually reduce the time or friction involved in running a small agency? That means meetings, proposals, onboarding, documentation, and client communication.
              </p>
              <p>
                This is not an exhaustive list. It is a starting point for building a lean AI ops stack without wasting time evaluating tools that won&apos;t fit your context.
              </p>
            </div>
          </div>
        </section>

        {/* Tools by Category */}
        {categories.map((category) => (
          <section key={category} className="border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-6 py-12">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
                {category}
              </h2>
              <div className="flex flex-col gap-8">
                {tools
                  .filter((t) => t.category === category)
                  .map((tool) => (
                    <div key={tool.name} className="border border-gray-100 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                      <div className="mt-4 flex items-start gap-2">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide shrink-0 mt-0.5">
                          Best for:
                        </span>
                        <span className="text-xs text-gray-500 leading-relaxed">{tool.bestFor}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-xl font-bold text-gray-900">Build your agency&apos;s AI stack</h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-xl">
              Tools are only useful inside a working system. The guides below walk through how to implement these tools into your agency&apos;s day-to-day operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/guides/automate-client-onboarding-small-agency"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
              >
                How to automate client onboarding
              </Link>
              <Link
                href="/tools/best-ai-meeting-assistants-agencies"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-gray-500 transition-colors"
              >
                Best AI meeting assistants
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-gray-400">
          <span>AI Ops Agency</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
            <Link href="/newsletter" className="hover:text-gray-600 transition-colors">Newsletter</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
