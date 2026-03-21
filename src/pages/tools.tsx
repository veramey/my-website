import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const tools = [
  {
    category: 'Best Tools',
    title: 'Best AI Tools for Small Agencies in 2026',
    description: 'A practical roundup of the tools that actually move the needle for lean agency teams.',
    href: '/tools/best-ai-tools-small-agencies',
  },
  {
    category: 'Best Tools',
    title: 'Best AI Meeting Assistants for Agency Teams',
    description: 'Stop taking manual notes. Here are the tools worth using in 2026.',
    href: '/tools/best-ai-meeting-assistants-agencies',
  },
]

export default function Tools() {
  return (
    <>
      <Head>
        <title>Tools — AI Ops for Small Agencies</title>
        <meta name="description" content="Honest tool reviews, comparisons, and stacks for small agencies using AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tools — AI Ops for Small Agencies" />
        <meta property="og:description" content="Honest tool reviews, comparisons, and stacks for small agencies using AI." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Tools</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Tools and stacks for small agencies
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Roundups, comparisons, and honest reviews — focused on what small teams actually need.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block border border-gray-100 rounded-lg p-6 hover:border-gray-300 transition-colors"
                >
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{tool.category}</span>
                  <h2 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{tool.description}</p>
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
