import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

interface RouteCard {
  title: string
  pain: string
  outcome: string
  ctaLabel: string
  href: string
}

const routeCards: RouteCard[] = [
  {
    title: "I'm new to AI ops",
    pain: "Not sure where to start with AI for your agency.",
    outcome: "Get the essential tools, workflows, and a starter kit in one reading path.",
    ctaLabel: "Start the reading path",
    href: "/tools/best-ai-tools-small-agencies",
  },
  {
    title: "I want quick wins",
    pain: "You have a specific problem to fix — meeting notes, proposals, onboarding.",
    outcome: "Find a focused workflow you can implement this week.",
    ctaLabel: "See quick wins",
    href: "/guides",
  },
  {
    title: "I'm choosing tools",
    pain: "Too many AI tools, not sure which ones are worth it for a small team.",
    outcome: "Honest roundups, comparisons, and budget stacks built for agencies.",
    ctaLabel: "Browse tools",
    href: "/tools",
  },
  {
    title: "I want ready-made resources",
    pain: "You want to skip the setup and get straight to using something.",
    outcome: "Download templates, checklists, and systems ready to use today.",
    ctaLabel: "See templates",
    href: "/templates",
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

        {/* Block 2 — Route Cards */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Where do you want to start?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {routeCards.map((card) => (
                <div key={card.href + card.title} className="bg-white border border-gray-100 rounded-lg p-5 flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.pain}</p>
                  <p className="text-sm text-gray-600">{card.outcome}</p>
                  <Link
                    href={card.href}
                    className="self-start bg-gray-900 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    {card.ctaLabel}
                  </Link>
                </div>
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

        {/* What to expect from the content */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What you&apos;ll find here</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Guides</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Step-by-step workflows — onboarding, proposals, meetings, SOPs — with specific tools and prompts included.</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Tools</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Roundups and comparisons built around one question: what actually earns its place in a small agency stack?</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Templates</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Ready-to-use assets — checklists, prompts, and workflow templates — that you can adapt and run this week.</p>
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
