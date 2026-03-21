import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function ClientOnboardingAiChecklist() {
  return (
    <>
      <Head>
        <title>AI Ops Starter Kit — Client Onboarding Checklist — AI Ops</title>
        <meta name="description" content="Free download: 10 workflow templates, a starter tool stack, onboarding checklist, and SOP prompt pack for small agencies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Ops Starter Kit — Client Onboarding Checklist" />
        <meta property="og:description" content="Free download: 10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              <Link href="/templates" className="hover:text-gray-600 transition-colors">Templates</Link>
              {' / '}Free
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              AI Ops Starter Kit for Small Agencies
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              10 workflow templates, a starter tool stack, onboarding checklist, and SOP prompt pack — ready to use in your agency.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="max-w-xl">
              <h2 className="text-sm font-semibold text-gray-900 mb-6">What&apos;s inside</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="text-gray-300">—</span>
                  <span>10 workflow templates for common agency operations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-300">—</span>
                  <span>Starter tool stack recommendation (free and paid options)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-300">—</span>
                  <span>Client onboarding checklist (intake to kickoff)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-300">—</span>
                  <span>SOP prompt pack for common agency processes</span>
                </li>
              </ul>

              <form className="mt-10 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                >
                  Download free
                </button>
              </form>
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
