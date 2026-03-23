import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Nav from '@/components/Nav'

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

const whatIsInside = [
  { title: '10 workflow templates', description: 'Ready-to-use AI workflows for intake, kickoff, delivery, and follow-up.' },
  { title: 'Starter tool stack', description: 'A lean, opinionated list of tools that work for 2–10 person agencies.' },
  { title: 'Onboarding checklist', description: 'Step-by-step checklist to take a new client from signed contract to active project.' },
  { title: 'SOP prompt pack', description: 'Reusable AI prompts for writing and maintaining your internal SOPs.' },
]

const howToUseSteps = [
  { number: '01', title: 'Download the kit', description: 'Get the full package — templates, checklist, and prompt pack in one download.' },
  { number: '02', title: 'Pick your first workflow', description: 'Start with the area where your onboarding breaks down most often — intake, kickoff, or handoff.' },
  { number: '03', title: 'Adapt to your process', description: 'Each template is built to be edited. Replace placeholder text with your own steps, tools, and language.' },
  { number: '04', title: 'Run it once manually', description: 'Walk through the workflow with a real client before automating anything. Identify gaps.' },
  { number: '05', title: 'Automate incrementally', description: 'Once a workflow runs smoothly manually, layer in automation tools (Zapier, Make, or native integrations).' },
]

const expectedOutcomes = [
  'Reduce onboarding chaos',
  'Standardize repeated tasks',
  'Move faster from intake to kickoff',
  'Create documentation faster',
]

const assetItems = [
  { label: '10 workflow templates', format: 'Google Docs / Notion' },
  { label: 'Onboarding checklist', format: 'PDF + editable doc' },
  { label: 'SOP prompt pack', format: 'Plain text prompts' },
  { label: 'Starter tool stack', format: 'Reference sheet' },
]

const faqs = [
  { q: 'Is this really free?', a: 'Yes. Enter your email and you get the full kit — no upsell, no paid tier.' },
  { q: 'What format are the templates in?', a: 'Templates are provided as Google Docs and Notion pages. You can copy them into any tool you already use.' },
  { q: 'Do I need technical skills to use this?', a: 'No. The kit is built for non-technical operators. Everything is plain-language and edit-ready.' },
  { q: 'How long does it take to implement?', a: 'Most teams pick one workflow, adapt it, and run it with a real client within a week. Full implementation varies.' },
  { q: 'What tools do I need?', a: 'None are required upfront. The starter tool stack is a recommendation, not a requirement. The templates work with whatever you currently use.' },
]

export default function ClientOnboardingAiChecklist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const text = `📥 New lead magnet download (AI Ops Starter Kit):\n${email}`
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
        <title>AI Ops Starter Kit for Small Agencies — Free Template</title>
        <meta name="description" content="Free download: AI Ops Starter Kit for small agencies. 10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Ops Starter Kit for Small Agencies — Free Template" />
        <meta property="og:description" content="Free download: AI Ops Starter Kit for small agencies. 10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack." />
        <meta property="og:url" content="https://www.aiopagency.com/templates/client-onboarding-ai-checklist" />
        <link rel="canonical" href="https://www.aiopagency.com/templates/client-onboarding-ai-checklist" />
      </Head>

      <Nav />

      <main>
        {/* Section 1 — Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Free Template</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              AI Ops Starter Kit for Small Agencies
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Everything you need to build a repeatable, AI-assisted client onboarding system — without starting from scratch.
            </p>
          </div>
        </section>

        {/* Section 2 — What problem it solves */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What problem it solves</h2>
            <div className="max-w-2xl space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                Most small agencies onboard clients the same way every time — by improvising. There&apos;s no documented system, no repeatable process, and no consistent experience from one project to the next.
              </p>
              <p>
                The result is fragmented onboarding: missed steps, inconsistent kickoffs, slow starts, and unnecessary back-and-forth. Clients don&apos;t get a great first impression. Your team spends more time managing chaos than delivering work.
              </p>
              <p>
                This kit gives you a starting system. One set of templates, one checklist, one tool stack recommendation — built specifically for lean teams that want to run tighter operations without hiring a head of ops.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — Who it's for */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Who it&apos;s for</h2>
          <div className="max-w-2xl space-y-4 text-base text-gray-600 leading-relaxed">
            <p>
              This kit is built for small agencies and service businesses with 2–10 people. If you&apos;re a boutique studio, a freelancer scaling to a small team, or a service business that delivers client work, this is for you.
            </p>
            <p>
              You don&apos;t need a dedicated ops person, a large budget, or technical expertise. You need a system. This kit gives you one you can start using this week.
            </p>
          </div>
        </section>

        {/* Section 4 — What's inside */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What&apos;s inside</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              {whatIsInside.map((item) => (
                <div key={item.title} className="border-t-2 border-gray-900 pt-4">
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — How to use it */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">How to use it</h2>
          <div className="flex flex-col gap-6 max-w-xl">
            {howToUseSteps.map((step) => (
              <div key={step.number} className="flex items-start gap-5">
                <span className="text-2xl font-bold text-gray-200 leading-none shrink-0">{step.number}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — Expected Outcomes */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">After using this kit, you should be able to:</h2>
            <ul className="flex flex-col gap-3 max-w-md" aria-label="Expected outcomes">
              {expectedOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
            <a
              href="#download-form"
              className="mt-6 inline-block px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors self-start"
            >
              Download free
            </a>
          </div>
        </section>

        {/* Block 7 — Asset Preview */}
        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What&apos;s in the package</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              {assetItems.map((item) => (
                <div key={item.label} className="border-t-2 border-gray-900 pt-4">
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.format}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-xl space-y-3 text-sm text-gray-600">
              <p>Ready to use in Notion, Google Docs, or any workspace</p>
              <p>Most teams get their first workflow running in under an hour</p>
            </div>
            <div className="mt-8">
              <a
                href="#download-form"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors self-start inline-block"
              >
                Get the full package
              </a>
            </div>
          </div>
        </section>

        {/* Block 8 — FAQ */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Frequently asked</h2>
            <div className="flex flex-col gap-8 max-w-2xl">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <p className="text-sm font-semibold text-gray-900">{faq.q}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Block 9 — Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Ready to start</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              Download the AI Ops Starter Kit
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Turn your onboarding from improvised to repeatable.
            </p>
            <div className="mt-8">
              <a href="#download-form" className="px-6 py-3 bg-gray-900 text-white text-base font-medium rounded hover:bg-gray-700 transition-colors">Download free</a>
            </div>
          </div>
        </section>

        {/* Section 7 — Download CTA */}
        <section id="download-form" className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="max-w-md">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Free Download</p>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                Get the AI Ops Starter Kit
              </h2>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack — free for small agencies.
              </p>

              {status === 'success' ? (
                <div className="mt-8 p-5 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">Thank you!</p>
                  <p className="mt-1 text-sm text-gray-500">Your download is on its way. Check your inbox.</p>
                </div>
              ) : (
                <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="download-email" className="text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id="download-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === 'loading'}
                      className="px-4 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors self-start disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending…' : 'Download free'}
                  </button>
                  {status === 'error' && (
                    <p className="text-xs text-red-500">Something went wrong — try again.</p>
                  )}
                </form>
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
