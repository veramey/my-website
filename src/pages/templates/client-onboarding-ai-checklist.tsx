import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

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

export default function ClientOnboardingAiChecklist() {
  return (
    <>
      <Head>
        <title>AI Ops Starter Kit for Small Agencies — Free Template</title>
        <meta name="description" content="Free download: AI Ops Starter Kit for small agencies. 10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Ops Starter Kit for Small Agencies — Free Template" />
        <meta property="og:description" content="Free download: AI Ops Starter Kit for small agencies. 10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack." />
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

        {/* Section 6 — Download CTA */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="max-w-xl">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Free Download</p>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                Get the AI Ops Starter Kit
              </h2>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                10 workflow templates, starter tool stack, onboarding checklist, and SOP prompt pack — free for small agencies.
              </p>
              <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Download coming soon. In the meantime, explore related resources:</p>
                <ul className="mt-4 flex flex-col gap-3">
                  <li>
                    <Link
                      href="/guides/automate-client-onboarding-small-agency"
                      className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors"
                    >
                      How to automate client onboarding →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tools/best-ai-tools-small-agencies"
                      className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors"
                    >
                      Best AI tools for small agencies →
                    </Link>
                  </li>
                </ul>
              </div>
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
