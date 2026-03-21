import Head from 'next/head'
import Nav from '@/components/Nav'

const perks = [
  { label: '1 practical workflow', description: 'A system you can implement this week.' },
  { label: '1 tool recommendation', description: 'Honest, no-affiliate-fluff picks.' },
  { label: '1 useful template or idea', description: 'Ready to drop into your agency.' },
  { label: 'No hype, no AI spam', description: 'Only what actually helps small teams.' },
]

export default function Newsletter() {
  return (
    <>
      <Head>
        <title>Newsletter — AI Ops for Small Agencies</title>
        <meta name="description" content="Weekly practical AI systems for small agencies. One workflow, one tool, one template — every week. No hype." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Newsletter — AI Ops for Small Agencies" />
        <meta property="og:description" content="Weekly practical AI systems for small agencies. No hype, no AI spam." />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Newsletter</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
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
            <div className="grid md:grid-cols-2 gap-6">
              {perks.map((perk) => (
                <div key={perk.label} className="bg-white border border-gray-100 rounded-lg p-5">
                  <p className="text-sm font-semibold text-gray-900">{perk.label}</p>
                  <p className="mt-1 text-sm text-gray-500">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup form */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-md">
            <h2 className="text-xl font-bold text-gray-900">Join the newsletter</h2>
            <p className="mt-2 text-sm text-gray-500">One email a week. Unsubscribe any time.</p>
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
                Join the newsletter
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-gray-400">
          <span>AI Ops Agency</span>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-gray-600 transition-colors">About</a>
            <a href="/newsletter" className="hover:text-gray-600 transition-colors">Newsletter</a>
          </div>
        </div>
      </footer>
    </>
  )
}
