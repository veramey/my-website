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

const SUBCATEGORY_ANCHOR: Partial<Record<GuideSubcategory, string>> = {
  'Client Onboarding': 'onboarding',
  'Delivery & Client Work': 'delivery',
  'Internal Operations': 'internal-ops',
}

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
        <meta property="og:url" content="https://www.aiopagency.com/guides" />
        <link rel="canonical" href="https://www.aiopagency.com/guides" />
      </Head>

      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Guides</h1>
        <p className="mt-3 text-base text-gray-500 max-w-xl">
          How-to articles, workflow systems, and implementation guides for running a leaner agency with AI.
        </p>

        <nav aria-label="Topic navigation" className="mt-6">
          <div className="inline-flex items-center gap-x-3 flex-wrap">
            <a href="#onboarding" className="border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">Onboarding</a>
            <a href="#internal-ops" className="border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">Internal Ops</a>
            <a href="#delivery" className="border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">Delivery</a>
            <a href="#automation" className="border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">Automation</a>
          </div>
        </nav>

        {subcategories.length === 0 ? null : (
          <div className="mt-14 space-y-14">
            {subcategories.map((subcategory) => (
              <section key={subcategory} id={SUBCATEGORY_ANCHOR[subcategory]}>
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
                      {(article.readingTime || article.whoItIsFor) && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {article.readingTime && (
                            <span className="text-xs text-gray-400">{article.readingTime}</span>
                          )}
                          {article.whoItIsFor && (
                            <span className="text-xs text-gray-400">{article.whoItIsFor}</span>
                          )}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
        <section className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-sm font-semibold text-gray-900 tracking-tight">Coming next</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-sm text-gray-500">Proposal workflow guide</li>
            <li className="text-sm text-gray-500">SOP writing workflow guide</li>
            <li className="text-sm text-gray-500">Internal reporting system guide</li>
            <li className="text-sm text-gray-500">Client follow-up automation guide</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/newsletter"
              className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
            >
              Join newsletter for new guides
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
