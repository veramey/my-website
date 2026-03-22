import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const tools = [
  {
    title: 'Best AI Tools for Small Agencies in 2026',
    description: 'A practical roundup of the tools that actually move the needle for lean agency teams.',
    href: '/tools/best-ai-tools-small-agencies',
    subcategory: 'Best Tools',
  },
  {
    title: 'Best AI Meeting Assistants for Agency Teams',
    description: 'Stop taking manual notes. Here are the tools worth using in 2026.',
    href: '/tools/best-ai-meeting-assistants-agencies',
    subcategory: 'Best Tools',
  },
]

export default function ToolsIndex() {
  return (
    <>
      <Head>
        <title>Tools — AI Ops for Small Agencies</title>
        <meta
          name="description"
          content="Tool reviews, comparisons, and stack recommendations for small agencies using AI — honest, practical, no affiliate fluff."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tools — AI Ops for Small Agencies" />
        <meta
          property="og:description"
          content="Tool reviews, comparisons, and stack recommendations for small agencies using AI — honest, practical, no affiliate fluff."
        />
        <meta property="og:url" content="https://www.aiopagency.com/tools" />
        <link rel="canonical" href="https://www.aiopagency.com/tools" />
      </Head>

      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tools</h1>
        <p className="mt-3 text-base text-gray-500 max-w-xl">
          Honest tool reviews, comparisons, and stack recommendations for lean agency teams.
        </p>

        <div className="mt-14 space-y-14">
          <section>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Best Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
