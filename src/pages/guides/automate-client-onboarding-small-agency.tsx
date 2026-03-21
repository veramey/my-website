import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function AutomateClientOnboarding() {
  return (
    <>
      <Head>
        <title>How to Automate Client Onboarding for a Small Agency — AI Ops</title>
        <meta name="description" content="Step-by-step workflow to cut onboarding time and reduce manual back-and-forth using AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="How to Automate Client Onboarding for a Small Agency" />
        <meta property="og:description" content="Step-by-step workflow to cut onboarding time and reduce manual back-and-forth using AI." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              <Link href="/guides" className="hover:text-gray-600 transition-colors">Guides</Link>
              {' / '}Client Onboarding
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              How to Automate Client Onboarding for a Small Agency
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Step-by-step workflow to cut onboarding time and reduce manual back-and-forth.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="max-w-2xl prose prose-gray text-sm text-gray-600 leading-relaxed space-y-6">
              <p>
                Client onboarding is one of the highest-leverage areas to automate in a small agency. A well-designed onboarding workflow reduces back-and-forth, sets clearer expectations, and frees up the first week of every engagement.
              </p>
              <p>
                This guide walks through a practical system you can implement this week — no custom software required.
              </p>
              <h2 className="text-base font-semibold text-gray-900 mt-8">Step 1: Standardize your intake form</h2>
              <p>
                Before automating anything, you need a single source of truth for client information. Use a form tool (Typeform, Tally, or a simple Google Form) that captures everything you need to kick off a project.
              </p>
              <h2 className="text-base font-semibold text-gray-900 mt-8">Step 2: Connect intake to your project management tool</h2>
              <p>
                Use Make or Zapier to route form submissions into your PM tool automatically — creating a new project, assigning tasks, and sending a welcome message to the client.
              </p>
              <h2 className="text-base font-semibold text-gray-900 mt-8">Step 3: Use AI to draft the kickoff document</h2>
              <p>
                Feed the intake form responses into a prompt template to generate a first-draft kickoff document. Review and edit — don&apos;t send raw AI output.
              </p>
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
