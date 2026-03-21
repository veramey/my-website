import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

type Status = 'idle' | 'success' | 'error'

const perks = [
  { label: '1 practical workflow', description: 'A real system you can implement in your agency this week.' },
  { label: '1 tool recommendation', description: 'Honest picks — only tools that actually help lean teams.' },
  { label: '1 useful template or idea', description: 'A ready-to-use asset or concept you can apply immediately.' },
  { label: 'No hype, no AI spam', description: 'No trend chasing. Only implementation-focused content.' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status === 'error') setStatus('idle')
    setEmail(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Newsletter — AI Ops for Small Agencies</title>
        <meta name="description" content="Weekly AI systems for small agencies. Practical workflows, tools and templates to help lean teams automate delivery and internal ops." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Newsletter — AI Ops for Small Agencies" />
        <meta property="og:description" content="Weekly AI systems for small agencies. Practical workflows, tools and templates to help lean teams automate delivery and internal ops." />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Newsletter</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
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
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">What you get each week</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {perks.map((perk) => (
                <div key={perk.label} className="bg-white border border-gray-100 rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-gray-900">{perk.label}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sign-up form */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-900">Join the newsletter</h2>
            <p className="mt-2 text-sm text-gray-500">
              One email per week. Unsubscribe any time.
            </p>

            {status === 'success' ? (
              <div className="mt-8 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">Thank you!</p>
                <p className="mt-1 text-sm text-gray-500">You&apos;re on the list. First issue coming your way soon.</p>
              </div>
            ) : (
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="you@agency.com"
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                >
                  Join the newsletter
                </button>
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
