import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const featuredContent = [
  {
    category: 'Tools',
    title: 'Best AI Tools for Small Agencies in 2026',
    description: 'A practical roundup of the tools that actually move the needle for lean agency teams.',
    href: '/tools/best-ai-tools-small-agencies',
  },
  {
    category: 'Guides',
    title: 'How to Automate Client Onboarding',
    description: 'Step-by-step workflow to cut onboarding time and reduce manual back-and-forth.',
    href: '/guides/automate-client-onboarding-small-agency',
  },
  {
    category: 'Tools',
    title: 'Best AI Meeting Assistants for Agency Teams',
    description: 'Stop taking manual notes. Here are the tools worth using in 2026.',
    href: '/tools/best-ai-meeting-assistants-agencies',
  },
]

const startHereCards = [
  {
    number: '01',
    title: 'Browse all AI tool recommendations',
    href: '/tools',
  },
  {
    number: '02',
    title: 'Explore all implementation guides',
    href: '/guides',
  },
  {
    number: '03',
    title: 'AI Ops Starter Kit',
    href: '/templates/client-onboarding-ai-checklist',
  },
]

const pillars = [
  {
    title: 'Client Onboarding & Delivery',
    topics: ['Intake and intake forms', 'Proposals and kickoffs', 'Client follow-ups', 'Handoff processes'],
    href: '/guides#onboarding',
  },
  {
    title: 'Internal Ops & SOPs',
    topics: ['Process documentation', 'Meeting workflows', 'Recurring task systems', 'Internal reporting'],
    href: '/guides#internal-ops',
  },
  {
    title: 'Tools & Stacks',
    topics: ['Best tools by category', 'Head-to-head comparisons', 'Budget stacks', 'Tool reviews'],
    href: '/tools',
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Ops for Small Agencies</title>
        <meta name="description" content="Practical AI operations systems for small agencies. No hype — only actionable workflows, tools, and templates." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Ops for Small Agencies" />
        <meta property="og:description" content="Practical AI operations systems for small agencies. No hype — only actionable workflows, tools, and templates." />
        <meta property="og:url" content="https://www.aiopagency.com/" />
        <link rel="canonical" href="https://www.aiopagency.com/" />
      </Head>

      <Nav />

      <main>
        {/* Block 1 — Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              AI operations systems for small agencies
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Practical workflows, tools, and templates to help lean teams run tighter operations and deliver better client work.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/start-here"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
              >
                Start Here
              </Link>
              <Link
                href="/guides"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-gray-500 transition-colors"
              >
                Browse Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Block 2 — Position Statement */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <p className="text-gray-700 text-base leading-relaxed max-w-2xl">
              This site is for small agencies and service teams — 2 to 10 people — who want to use AI to run leaner operations without drowning in hype. You get practical systems for onboarding, delivery, documentation, and tools. No AI news. No speculation. Only implementation.
            </p>
          </div>
        </section>

        {/* Block 3 — Content Highlights */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Featured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredContent.map((item) => (
              <Link key={item.href} href={item.href} className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.category}</span>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Block 4 — Start Here Callout */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Start Here</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {startHereCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex items-start gap-4 bg-white border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
                >
                  <span className="text-2xl font-bold text-gray-200 leading-none">{card.number}</span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-gray-600 transition-colors leading-snug">{card.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Block 5 — Content Categories */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Content Pillars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="border-t-2 border-gray-900 pt-5">
                <h3 className="text-sm font-semibold text-gray-900">{pillar.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {pillar.topics.map((topic) => (
                    <li key={topic} className="text-sm text-gray-500">{topic}</li>
                  ))}
                </ul>
                <Link href={pillar.href} className="mt-4 inline-block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  Browse →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Block 6 — Lead Magnet */}
        <section className="border-t border-gray-100 bg-gray-900">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Free Download</span>
              <h2 className="mt-3 text-2xl font-bold text-white leading-snug">
                AI Ops Starter Kit for Small Agencies
              </h2>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                10 workflow templates, a starter tool stack, onboarding checklist, and SOP prompt pack — ready to use in your agency.
              </p>
              <Link
                href="/templates/client-onboarding-ai-checklist"
                className="mt-6 inline-block px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded hover:bg-gray-100 transition-colors"
              >
                Download free
              </Link>
            </div>
          </div>
        </section>

        {/* Block 7 — Trust Signals */}
        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                'Practical, no-fluff AI ops content',
                'Designed for small teams',
                'Focused on implementation, not hype',
              ].map((signal) => (
                <p key={signal} className="text-sm text-gray-500 font-medium">{signal}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Block 8 — Newsletter CTA */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-xl font-bold text-gray-900">Get weekly practical AI systems for small agencies</h2>
              <p className="mt-2 text-sm text-gray-500">One workflow, one tool, one template — every week. No hype.</p>
              <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
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
