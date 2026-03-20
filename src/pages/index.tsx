import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Ops for Small Agencies</title>
        <meta name="description" content="Practical AI operations systems for small agencies. No hype — only actionable workflows, tools, and templates." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-semibold text-gray-900 text-sm tracking-tight">AI Ops Agency</span>
          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/start-here" className="hover:text-gray-900">Start Here</Link>
            <Link href="/guides" className="hover:text-gray-900">Guides</Link>
            <Link href="/tools" className="hover:text-gray-900">Tools</Link>
            <Link href="/templates" className="hover:text-gray-900">Templates</Link>
            <Link href="/newsletter" className="hover:text-gray-900">Newsletter</Link>
            <Link href="/about" className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">

        {/* Block 1 — Hero */}
        <section className="py-20 border-b border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            AI operations systems<br />for small agencies
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Practical workflows, tools, and templates to run lean and deliver better. No hype — only implementation.
          </p>
          <div className="flex gap-3">
            <Link href="/start-here" className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-gray-700 transition-colors">
              Start Here
            </Link>
            <Link href="/guides" className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded hover:border-gray-400 transition-colors">
              Browse Guides
            </Link>
          </div>
        </section>

        {/* Block 2 — Positioning */}
        <section className="py-14 border-b border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-3">
            This site is built for small agencies and service teams — the 2–10 person shops that need to move fast and can't afford bloated processes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            You'll find practical AI systems for operations: client onboarding, internal workflows, tool stacks, SOPs, and delivery processes — all designed for lean teams.
          </p>
          <p className="text-gray-700 leading-relaxed">
            No AI news. No hype. No theory. Only implementation.
          </p>
        </section>

        {/* Block 3 — Content Highlights */}
        <section className="py-14 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Guide', title: 'How to automate client onboarding for a small agency', href: '/guides/automate-client-onboarding-small-agency' },
              { label: 'Tools', title: 'Best AI tools for small agencies in 2026', href: '/tools/best-ai-tools-small-agencies' },
              { label: 'Tools', title: 'Best AI meeting assistants for agency teams', href: '/tools/best-ai-meeting-assistants-agencies' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</span>
                <p className="mt-2 text-sm font-medium text-gray-800 group-hover:text-gray-900 leading-snug">{item.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Block 4 — Start Here Callout */}
        <section className="py-14 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Start Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { number: '01', title: 'Best AI tools for small agencies', href: '/tools/best-ai-tools-small-agencies' },
              { number: '02', title: 'How to automate client onboarding', href: '/guides/automate-client-onboarding-small-agency' },
              { number: '03', title: 'AI Ops Starter Kit', href: '/templates/client-onboarding-ai-checklist' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group flex gap-4 items-start border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors">
                <span className="text-2xl font-bold text-gray-100 group-hover:text-gray-200 shrink-0 select-none">{item.number}</span>
                <p className="text-sm font-medium text-gray-800 leading-snug">{item.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Block 5 — Content Categories */}
        <section className="py-14 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Content Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Client Onboarding & Delivery',
                topics: ['Intake & proposals', 'Kickoffs & handoffs', 'Follow-up workflows'],
                href: '/guides',
              },
              {
                title: 'Internal Ops & SOPs',
                topics: ['Docs & processes', 'Meeting workflows', 'Recurring task systems'],
                href: '/guides',
              },
              {
                title: 'Tools & Stacks',
                topics: ['Best tool roundups', 'Comparisons', 'Budget AI stacks'],
                href: '/tools',
              },
            ].map((pillar) => (
              <Link key={pillar.title} href={pillar.href} className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">{pillar.title}</h3>
                <ul className="space-y-1">
                  {pillar.topics.map((t) => (
                    <li key={t} className="text-sm text-gray-500">{t}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* Block 6 — Lead Magnet */}
        <section className="py-14 border-b border-gray-100">
          <div className="bg-gray-50 rounded-xl p-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Free Download</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI Ops Starter Kit for Small Agencies</h2>
            <p className="text-sm text-gray-600 mb-6">
              10 workflows, a starter tool stack, an onboarding checklist, and SOP prompts — ready to use.
            </p>
            <Link href="/templates/client-onboarding-ai-checklist" className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-gray-700 transition-colors inline-block">
              Download free
            </Link>
          </div>
        </section>

        {/* Block 7 — Trust Signals */}
        <section className="py-14 border-b border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              'Practical, no-fluff AI ops content',
              'Designed for small teams',
              'Focused on implementation, not hype',
            ].map((signal) => (
              <p key={signal} className="text-sm text-gray-500 font-medium">{signal}</p>
            ))}
          </div>
        </section>

        {/* Block 8 — Newsletter CTA */}
        <section className="py-14">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Get weekly practical AI systems for small agencies</h2>
          <p className="text-sm text-gray-600 mb-6">One workflow, one tool, one template. No hype.</p>
          <form className="flex gap-3 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@agency.com"
              className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <button type="submit" className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-gray-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </section>

      </main>

      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-4xl mx-auto px-6 py-6 text-xs text-gray-400">
          AI Ops Agency — practical systems for small teams
        </div>
      </footer>
    </>
  )
}
