import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getGuidesGrouped } from '@/lib/guides'

const groupedGuides = getGuidesGrouped()

export default function GuidesIndex() {
  return (
    <>
      <Head>
        <title>Guides — AI Ops for Small Agencies</title>
        <meta name="description" content="Practical how-to guides, workflows, and implementation playbooks for small agencies using AI to run leaner operations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Guides — AI Ops for Small Agencies" />
        <meta property="og:description" content="Practical how-to guides, workflows, and implementation playbooks for small agencies using AI to run leaner operations." />
      </Head>

      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Guides</h1>
          <p className="mt-3 text-base text-gray-500 max-w-xl">
            How-to articles, workflows, and implementation systems for small agencies.
          </p>
        </div>

        {groupedGuides.length === 0 ? null : (
          <div className="space-y-14">
            {groupedGuides.map(({ subcategory, guides }) => (
              <section key={subcategory}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  {subcategory}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {guide.description}
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
