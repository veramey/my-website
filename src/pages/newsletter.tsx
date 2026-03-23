import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Nav from '@/components/Nav'

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

const benefits = [
  { label: '1 practical workflow', description: 'A system you can implement this week.' },
  { label: '1 tool recommendation', description: 'Honest picks — no affiliate noise.' },
  { label: '1 useful template or idea', description: 'Something you can put to work immediately.' },
  { label: 'No hype, no AI spam', description: 'Only content that earns your attention.' },
]

async function submitToTelegram(email: string) {
  const text = `📧 New newsletter subscriber (newsletter page):\n${email}`
  const params = new URLSearchParams({ chat_id: TELEGRAM_CHAT_ID!, text })
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    { method: 'POST', body: params }
  )
  if (!res.ok) {
    const err = await res.json()
    throw new Error(JSON.stringify(err))
  }
}

function NewsletterForm({ inputId, buttonLabel }: { inputId: string; buttonLabel: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitToTelegram(email)
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error('Telegram error:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-8 p-5 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm font-semibold text-gray-900">You&apos;re in.</p>
        <p className="mt-1 text-sm text-gray-500">Thanks for subscribing. First issue coming your way soon.</p>
      </div>
    )
  }

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id={inputId}
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
        {status === 'loading' ? 'Sending…' : buttonLabel}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-500">Something went wrong — try again.</p>
      )}
    </form>
  )
}

export default function Newsletter() {
  return (
    <>
      <Head>
        <title>Newsletter — AI Ops for Small Agencies</title>
        <meta name="description" content="Weekly practical AI systems for small agencies. One workflow, one tool, one template — every week. No hype." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Newsletter — AI Ops for Small Agencies" />
        <meta property="og:description" content="Weekly practical AI systems for small agencies. One workflow, one tool, one template — every week. No hype." />
        <meta property="og:url" content="https://www.aiopagency.com/newsletter" />
        <link rel="canonical" href="https://www.aiopagency.com/newsletter" />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Newsletter</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Weekly AI systems for small agencies
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Practical workflows, tools and templates to help lean teams automate delivery and internal ops.
            </p>
          </div>
        </section>

        {/* What you get */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What you get</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              {benefits.map((item) => (
                <div key={item.label} className="border-t-2 border-gray-900 pt-4">
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup form */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-900">Join the newsletter</h2>
            <p className="mt-2 text-sm text-gray-500">One email per week. Unsubscribe any time.</p>
            <NewsletterForm inputId="email" buttonLabel="Join the newsletter" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-gray-900">Get one useful AI ops idea per week</h2>
              <NewsletterForm inputId="email-cta" buttonLabel="Subscribe" />
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
