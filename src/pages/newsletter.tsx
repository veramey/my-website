import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function Newsletter() {
  return (
    <>
      <Head>
        <title>Newsletter — AI Ops for Small Agencies</title>
        <meta name="description" content="Weekly practical AI systems for small agencies. One workflow, one tool, one template — every week." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Newsletter — AI Ops for Small Agencies" />
        <meta property="og:description" content="Weekly practical AI systems for small agencies." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Newsletter</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Weekly AI systems for small agencies
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Practical workflows, tools and templates to help lean teams automate delivery and internal ops.
            </p>

            <ul className="mt-8 space-y-2 text-sm text-gray-600">
              <li>1 practical workflow</li>
              <li>1 tool recommendation</li>
              <li>1 useful template or idea</li>
              <li>No hype, no AI spam</li>
            </ul>

            <form className="mt-8 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
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
            <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
            <Link href="/newsletter" className="hover:text-gray-600 transition-colors">Newsletter</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
