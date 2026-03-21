import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const guides = [
  {
    category: 'Client Onboarding',
    title: 'How to Automate Client Onboarding for a Small Agency',
    description: 'Step-by-step workflow to cut onboarding time and reduce manual back-and-forth.',
    href: '/guides/automate-client-onboarding-small-agency',
  },
]

export default function Guides() {
  return (
    <>
      <Head>
        <title>Guides — AI Ops for Small Agencies</title>
        <meta name="description" content="How-to guides, workflows, and implementation resources for small agencies using AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Guides — AI Ops for Small Agencies" />
        <meta property="og:description" content="How-to guides, workflows, and implementation resources for small agencies using AI." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Guides</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              How-to guides and workflows
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Practical implementation guides for small agencies. No theory — only steps you can follow today.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block border border-gray-100 rounded-lg p-6 hover:border-gray-300 transition-colors"
                >
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{guide.category}</span>
                  <h2 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                    {guide.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{guide.description}</p>
                </Link>
              ))}
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
