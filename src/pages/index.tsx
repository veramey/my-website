import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

interface FeaturedItem {
  label: string
  title: string
  whoItIsFor: string
  ctaText: string
  href: string
}

const featuredContent: FeaturedItem[] = [
  {
    label: 'Guide',
    title: 'How to Automate Client Onboarding for a Small Agency',
    whoItIsFor: 'For teams whose new projects still start with chaos',
    ctaText: 'Read guide →',
    href: '/guides/automate-client-onboarding-small-agency',
  },
  {
    label: 'Template',
    title: 'AI Ops Starter Kit',
    whoItIsFor: 'For teams that want practical assets, not theory',
    ctaText: 'Download kit →',
    href: '/templates/client-onboarding-ai-checklist',
  },
  {
    label: 'Tools',
    title: 'Best AI Tools for Small Agencies',
    whoItIsFor: 'For teams that want a lean stack under control',
    ctaText: 'Explore tools →',
    href: '/tools/best-ai-tools-small-agencies',
  },
]

const startHereCards = [
  {
    number: '01',
    title: 'Start Here — find your path',
    href: '/start-here',
  },
  {
    number: '02',
    title: 'Browse all guides',
    href: '/guides',
  },
  {
    number: '03',
    title: 'Download AI Ops Starter Kit',
    href: '/templates/client-onboarding-ai-checklist',
  },
]

const pillars = [
  {
    title: 'Client Onboarding & Delivery',
    description: '',
    topics: ['Intake and intake forms', 'Proposals and kickoffs', 'Client follow-ups', 'Handoff processes'],
    href: '/guides#onboarding',
  },
  {
    title: 'Internal Ops & SOPs',
    description: '',
    topics: ['Process documentation', 'Meeting workflows', 'Recurring task systems', 'Internal reporting'],
    href: '/guides#internal-ops',
  },
  {
    title: 'Tools & Stacks',
    description: '',
    topics: ['Best tools by category', 'Head-to-head comparisons', 'Budget stacks', 'Tool reviews'],
    href: '/tools',
  },
  {
    title: 'Templates & Starter Systems',
    description: 'Ready-to-use assets to help you implement faster and stop starting from scratch.',
    topics: ['Onboarding checklist', 'SOP prompt pack', 'Workflow templates', 'Starter tool stack'],
    href: '/templates',
  },
]


const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

export default function Home() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const text = `📧 New newsletter subscriber:\n${email}`
      const params = new URLSearchParams({ chat_id: TELEGRAM_CHAT_ID!, text })
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        { method: 'POST', body: params }
      )
      if (!res.ok) {
        const err = await res.json()
        throw new Error(JSON.stringify(err))
      }
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error('Telegram error:', err)
      setStatus('error')
    }
  }

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
                href="/templates/client-onboarding-ai-checklist"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-gray-500 transition-colors"
              >
                Download the starter kit
              </Link>
            </div>
          </div>
        </section>

        {/* Core Problem — Where small agencies lose time */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">Where small agencies lose time</h2>
          <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-2xl">
            Most small agencies don&apos;t have an AI problem — they have a systems problem. Onboarding is inconsistent, SOPs live in people&apos;s heads, follow-ups are manual, and tools get added without a workflow behind them. This site helps fix that with practical systems.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Messy onboarding', 'Inconsistent delivery', 'Undocumented processes', 'Too much admin work'].map((label) => (
              <div key={label} className="border border-gray-200 rounded-lg p-5">
                <p className="text-sm font-medium text-gray-800">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/guides/automate-client-onboarding-small-agency"
              className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
            >
              Read the onboarding guide
            </Link>
          </div>
        </section>

        {/* Block 3 — Content Highlights */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Featured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredContent.map((item) => (
              <div key={item.href} className="border border-gray-100 rounded-lg p-5 flex flex-col">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.label}</span>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.whoItIsFor}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {item.ctaText}
                </Link>
              </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} data-testid="pillar-card" className="border-t-2 border-gray-900 pt-5">
                <h3 className="text-sm font-semibold text-gray-900">{pillar.title}</h3>
                {pillar.description && (
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{pillar.description}</p>
                )}
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

        {/* Block 8 — Newsletter CTA */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-xl font-bold text-gray-900">Get weekly practical AI systems for small agencies</h2>
              <p className="mt-2 text-sm text-gray-500">One workflow, one tool, one template — every week. No hype.</p>
              {status === 'success' ? (
                <p className="mt-6 text-sm text-green-600 font-medium">✓ You&apos;re subscribed. Talk soon.</p>
              ) : (
                <form className="mt-6 flex gap-2" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    required
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending…' : 'Subscribe'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-2 text-xs text-red-500">Something went wrong — try again.</p>
              )}
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
