import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const newVisitorPath = [
  {
    number: '01',
    label: 'Read',
    title: 'Best AI tools for small agencies',
    href: '/tools/best-ai-tools-small-agencies',
  },
  {
    number: '02',
    label: 'Read',
    title: '7 workflows to automate first',
    href: '/guides/automate-client-onboarding-small-agency',
  },
  {
    number: '03',
    label: 'Download',
    title: 'AI Ops Starter Kit',
    href: '/templates/client-onboarding-ai-checklist',
  },
]

const quickWins = [
  { title: 'Automate meeting notes', href: '/guides' },
  { title: 'Improve proposals with AI', href: '/guides' },
  { title: 'Streamline client onboarding', href: '/guides/automate-client-onboarding-small-agency' },
  { title: 'Build SOPs faster', href: '/guides' },
]

const toolLinks = [
  { title: 'Best tools roundups', href: '/tools/best-ai-tools-small-agencies' },
  { title: 'Head-to-head comparisons', href: '/tools' },
  { title: 'Budget stacks under $150/mo', href: '/tools' },
]

const implementationLinks = [
  { title: 'Templates library', href: '/templates', available: true },
  { title: 'AI Ops Audit — coming soon', href: '/services', available: false },
  { title: 'Setup service — coming soon', href: '/services', available: false },
]

export default function StartHere() {
  return (
    <>
      <Head>
        <title>Start Here — AI Ops for Small Agencies</title>
        <meta name="description" content="New here? This is your guided entry point into practical AI operations content for small agencies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Start Here — AI Ops for Small Agencies" />
        <meta property="og:description" content="New here? This is your guided entry point into practical AI operations content for small agencies." />
        <meta property="og:url" content="https://www.aiopagency.com/start-here" />
        <link rel="canonical" href="https://www.aiopagency.com/start-here" />
      </Head>

      <Nav />

      <main>
        {/* Block 1 — What This Site Is */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Start Here</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              What this site is about
            </h1>
            <div className="mt-8 space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                This is not an AI news site. You won&apos;t find summaries of the latest model releases, opinion pieces on the future of work, or breathless takes on what GPT-5 means for humanity.
              </p>
              <p>
                This is a practical systems site. Every guide, tool recommendation, and template here is aimed at one thing: helping small agencies and service businesses use AI to run tighter operations and deliver better client work.
              </p>
              <p>
                If you run a 2–10 person agency or service business and want implementation over inspiration, you&apos;re in the right place.
              </p>
            </div>
          </div>
        </section>

        {/* Block 2 — If You're New */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">If you&apos;re new</h2>
            <p className="text-sm text-gray-600 mb-8 max-w-xl">Start with this reading path. It covers the essentials — tools, workflows, and a starter kit to get moving fast.</p>
            <div className="flex flex-col gap-4 max-w-xl">
              {newVisitorPath.map((item) => (
                <Link
                  key={item.href + item.number}
                  href={item.href}
                  className="group flex items-start gap-5 bg-white border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
                >
                  <span className="text-2xl font-bold text-gray-200 leading-none shrink-0">{item.number}</span>
                  <div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.label}</span>
                    <p className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Block 3 — If You Want Quick Wins */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">If you want quick wins</h2>
          <p className="text-sm text-gray-600 mb-8 max-w-xl">Pick a specific problem you want to solve today.</p>
          <ul className="flex flex-col gap-3 max-w-xl">
            {quickWins.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between group text-sm font-medium text-gray-800 border-b border-gray-100 pb-3 hover:text-gray-500 transition-colors"
                >
                  <span>{item.title}</span>
                  <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Block 4 — If You're Choosing Tools */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">If you&apos;re choosing tools</h2>
            <p className="text-sm text-gray-600 mb-8 max-w-xl">Cut through the noise. These pages are built to help you make decisions, not just discover options.</p>
            <ul className="flex flex-col gap-3 max-w-xl">
              {toolLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between group text-sm font-medium text-gray-800 border-b border-gray-100 pb-3 hover:text-gray-500 transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Trust Filter — This site is / is not */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What to expect</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-4">This site is</h2>
                <ul className="flex flex-col gap-3">
                  <li className="text-sm text-gray-600"><span className="text-gray-500">✓</span> Practical AI ops for small agencies</li>
                  <li className="text-sm text-gray-600"><span className="text-gray-500">✓</span> Implementation-focused guides and templates</li>
                  <li className="text-sm text-gray-600"><span className="text-gray-500">✓</span> Honest tool recommendations and comparisons</li>
                  <li className="text-sm text-gray-600"><span className="text-gray-500">✓</span> Built for 2–10 person service teams</li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-4">This site is not</h2>
                <ul className="flex flex-col gap-3">
                  <li className="text-sm text-gray-600"><span className="text-gray-400">✗</span> An AI news or trend site</li>
                  <li className="text-sm text-gray-600"><span className="text-gray-400">✗</span> Hype, predictions, or opinion pieces</li>
                  <li className="text-sm text-gray-600"><span className="text-gray-400">✗</span> Built for enterprise or large teams</li>
                  <li className="text-sm text-gray-600"><span className="text-gray-400">✗</span> Theory without practical application</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Block 5 — If You Want Done-for-You Implementation */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">If you want done-for-you</h2>
          <p className="text-sm text-gray-600 mb-8 max-w-xl">Ready-to-use resources and future services for teams that want to skip the setup work.</p>
          <ul className="flex flex-col gap-3 max-w-xl">
            {implementationLinks.map((item) => (
              <li key={item.title}>
                {item.available ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between group text-sm font-medium text-gray-800 border-b border-gray-100 pb-3 hover:text-gray-500 transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between text-sm font-medium text-gray-400 border-b border-gray-100 pb-3">
                    <span>{item.title}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Conversion block — 3 CTAs above footer */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/templates/client-onboarding-ai-checklist"
              className="bg-gray-900 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-gray-700 transition-colors text-center"
            >
              Download the AI Ops Starter Kit
            </Link>
            <Link
              href="/newsletter"
              className="border border-gray-900 text-gray-900 px-5 py-2.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Join the newsletter
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-gray-500 transition-colors flex items-center justify-center sm:justify-start"
            >
              Join the audit waitlist
            </Link>
          </div>
        </div>
      </section>

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
