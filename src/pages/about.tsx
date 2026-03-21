import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function About() {
  return (
    <>
      <Head>
        <title>About — AI Ops for Small Agencies</title>
        <meta name="description" content="Who's behind this site and why it exists." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="About — AI Ops for Small Agencies" />
        <meta property="og:description" content="Who's behind this site and why it exists." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">About</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Who's behind this
            </h1>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="max-w-2xl space-y-10">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Who I am</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Builder and operator with a focus on systems, automation, and practical business use of AI. Not a researcher or pundit — someone who builds and tests workflows for real teams.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Why this project</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Small agencies don&apos;t need more hype. They need working systems. This project documents what actually helps lean teams operate better — the workflows that cut real hours, the tools worth paying for, the templates that get used.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Core beliefs</h2>
                <ul className="space-y-2 text-base text-gray-600">
                  <li>Practical over trendy</li>
                  <li>Systems over chaos</li>
                  <li>Implementation over inspiration</li>
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
