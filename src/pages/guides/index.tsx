'use client'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { guides, GuideSubcategory } from '@/lib/guides'

const FILTERS: { label: string; value: GuideSubcategory | null }[] = [
  { label: 'All', value: null },
  { label: 'Onboarding', value: 'Client Onboarding' },
  { label: 'Internal Ops', value: 'Internal Operations' },
  { label: 'Delivery', value: 'Delivery & Client Work' },
  { label: 'Automation', value: 'Team Productivity' },
]

export default function GuidesIndex() {
  const [active, setActive] = React.useState<GuideSubcategory | null>(null)

  const filtered = active ? guides.filter((g) => g.subcategory === active) : guides

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

        <div className="mt-6 flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setActive(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                active === f.value
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-14 text-sm text-gray-400">No guides in this category yet.</p>
        ) : (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={article.href}
                className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
              >
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{article.subcategory}</span>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
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
