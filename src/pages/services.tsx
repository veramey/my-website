import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Nav from '@/components/Nav'

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

const services = [
  {
    name: 'AI Ops Audit',
    description: 'A structured review of your workflows, tool stack, and operations. We identify bottlenecks and give you a clear implementation roadmap.',
  },
  {
    name: 'AI Ops Setup',
    description: 'Done-for-you implementation of core AI systems — onboarding, delivery, internal ops, and documentation — tailored to your agency.',
  },
]

export default function Services() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const text = `🛎️ New services waitlist signup:\n${email}`
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
        <title>Services — AI Ops for Small Agencies</title>
        <meta name="description" content="AI Ops services for small agencies — including the AI Ops Audit and AI Ops Setup. Join the waitlist to be first in line." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Services — AI Ops for Small Agencies" />
        <meta property="og:description" content="AI Ops services for small agencies — including the AI Ops Audit and AI Ops Setup. Join the waitlist to be first in line." />
        <meta property="og:url" content="https://www.aiopagency.com/services" />
        <link rel="canonical" href="https://www.aiopagency.com/services" />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Done-for-you AI ops
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Practical AI systems implemented in your agency. No theory — just working setups built for lean teams.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Available services</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              {services.map((service) => (
                <div key={service.name} className="border border-gray-100 rounded-lg p-6 bg-white">
                  <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{service.description}</p>
                  <span className="mt-4 inline-block text-xs font-medium text-gray-400 uppercase tracking-widest">Coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist form */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-900">Join the waitlist</h2>
            <p className="mt-2 text-sm text-gray-500">Be first to know when services open up.</p>

            {status === 'success' ? (
              <div className="mt-8 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">You&apos;re on the list.</p>
                <p className="mt-1 text-sm text-gray-500">Thanks for signing up. We&apos;ll be in touch when spots open.</p>
              </div>
            ) : (
              <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="waitlist-email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
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
                  {status === 'loading' ? 'Sending…' : 'Join the waitlist'}
                </button>
                {status === 'error' && (
                  <p className="text-xs text-red-500">Something went wrong — try again.</p>
                )}
              </form>
            )}
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
