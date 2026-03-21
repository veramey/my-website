import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { guides, GuideSubcategory } from '@/lib/guides'

const SUBCATEGORY_ORDER: GuideSubcategory[] = [
  'Client Onboarding',
  'Delivery & Client Work',
  'Internal Operations',
  'Team Productivity',
]

function groupBySubcategory(articles: typeof guides) {
  const map = new Map<GuideSubcategory, typeof guides>()
  for (const article of articles) {
    if (!map.has(article.subcategory)) {
      map.set(article.subcategory, [])
    }
    map.get(article.subcategory)!.push(article)
  }
  return map
}

export default function GuidesIndex() {
  const grouped = groupBySubcategory(guides)
  const subcategories = SUBCATEGORY_ORDER.filter((cat) => grouped.has(cat))

  return (
    <>
      <Head>
        <title>Guides — AI Ops for Small Agencies</title>
        <meta
          name="description"
          content="Practical how-to guides and workflow systems for small agencies using AI — from client onboarding to internal operations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Guides — AI Ops for Small Agencies" />
        <meta
          property="og:description"
          content="Practical how-to guides and workflow systems for small agencies using AI — from client onboarding to internal operations."
        />
      </Head>

      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Guides</h1>
        <p className="mt-3 text-base text-gray-500 max-w-xl">
          How-to articles, workflow systems, and implementation guides for running a leaner agency with AI.
        </p>

        {subcategories.length === 0 ? null : (
          <div className="mt-14 space-y-14">
            {subcategories.map((subcategory) => (
              <section key={subcategory}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  {subcategory}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {grouped.get(subcategory)!.map((article) => (
                    <Link
                      key={article.slug}
                      href={article.href}
                      className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {article.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
