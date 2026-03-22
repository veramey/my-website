import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function About() {
  return (
    <>
      <Head>
        <title>About — AI Ops for Small Agencies</title>
        <meta name="description" content="Builder and operator focused on practical AI systems for small agencies. No hype — only what actually helps lean teams operate better." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="About — AI Ops for Small Agencies" />
        <meta property="og:description" content="Builder and operator focused on practical AI systems for small agencies." />
        <meta property="og:url" content="https://www.aiopagency.com/about" />
        <link rel="canonical" href="https://www.aiopagency.com/about" />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">About</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Trust, positioning, and what this project is for
            </h1>
          </div>
        </section>

        {/* Section 1 — Who You Are */}
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Who You Are</h2>
              <div className="max-w-2xl">
                <p className="text-base text-gray-600 leading-relaxed">
                  Builder and operator mindset. The interesting problems are in the systems — how work actually flows, where it breaks, and what can be automated so the team can focus on what matters. AI is useful when it makes those systems tighter, not when it adds noise.
                </p>
                <p className="mt-4 text-base text-gray-600 leading-relaxed">
                  Background in small-agency operations — the kind of work where one person wears several hats and efficiency is survival. That context shapes everything here: the tools, the workflows, the templates. It all has to work for a lean team, not a 50-person department.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Section 2 — Why This Project */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <section>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Why This Project</h2>
            <div className="max-w-2xl">
              <p className="text-base text-gray-600 leading-relaxed">
                Small agencies don&apos;t need hype. They need working systems. Most AI content is written for enterprise teams or AI enthusiasts — neither of which describes a 4-person studio trying to keep onboarding from falling apart.
              </p>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                This project documents what actually helps lean teams operate better: the workflows that save real time, the tools that earn their place in the stack, the templates that get used instead of filed away. Nothing is here because it&apos;s trendy. Everything is here because it works.
              </p>
            </div>
          </section>
        </div>

        {/* Section 3 — Core Beliefs */}
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Core Beliefs</h2>
              <ul className="max-w-2xl space-y-3">
                <li className="text-base text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-900">Practical over trendy.</span> What works in a lean team beats what looks impressive in a demo.
                </li>
                <li className="text-base text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-900">Systems over chaos.</span> Repeatable processes create consistency; consistency creates capacity.
                </li>
                <li className="text-base text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-900">Implementation over inspiration.</span> Good ideas don&apos;t move the needle — working systems do.
                </li>
              </ul>
            </section>
          </div>
        </div>
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
