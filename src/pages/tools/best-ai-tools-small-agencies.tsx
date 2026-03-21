import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useState } from 'react'

const toolCategories = [
  {
    id: 'meeting-notes',
    category: 'Meeting & Notes',
    intro: 'Stop losing action items after client calls. These tools record, transcribe, and summarize meetings automatically.',
    tools: [
      {
        name: 'Otter.ai',
        tagline: 'Meeting transcription and summaries',
        description:
          'Automatically records, transcribes, and summarizes meetings. Works with Zoom, Google Meet, and Teams. Generates action items from the transcript without manual effort.',
        bestFor: 'Teams running 5+ client calls per week',
        pricing: 'Free tier available; Pro from $16.99/month',
      },
      {
        name: 'Fireflies.ai',
        tagline: 'AI meeting assistant with CRM sync',
        description:
          'Records and transcribes calls, then lets you search across all past meetings. Integrates with HubSpot, Salesforce, and Slack — useful if you need meeting context inside your CRM.',
        bestFor: 'Agencies with active sales pipelines',
        pricing: 'Free tier available; Pro from $18/month',
      },
    ],
  },
  {
    id: 'writing-proposals',
    category: 'Writing & Proposals',
    intro: 'AI writing tools work best when you give them a strong template. These are the ones worth building into your proposal and SOP workflows.',
    tools: [
      {
        name: 'Claude',
        tagline: 'General-purpose AI for writing and thinking',
        description:
          'Best for drafting proposals, scopes of work, client emails, and SOPs. More reliable than most models for long-form outputs. Pair it with a strong system prompt and a template, and it will produce consistent first drafts.',
        bestFor: 'Proposals, SOPs, client communication',
        pricing: 'Free tier available; Pro at $20/month',
      },
      {
        name: 'Notion AI',
        tagline: 'AI built into your knowledge base',
        description:
          'If your team already runs in Notion, the built-in AI is worth enabling. Useful for summarizing meeting notes, drafting documentation, and writing first drafts without leaving your workspace.',
        bestFor: 'Teams already using Notion for internal docs',
        pricing: 'Add-on to Notion plans; $8/member/month',
      },
    ],
  },
  {
    id: 'automation',
    category: 'Automation & Workflows',
    intro: 'The highest-leverage category. One well-built automation can save hours every week. Start with your onboarding and reporting flows.',
    tools: [
      {
        name: 'Make',
        tagline: 'Visual workflow automation',
        description:
          'Build multi-step automations without code. Connects to 1,000+ apps including Gmail, Slack, Airtable, and Notion. More flexible than Zapier for complex workflows, and cheaper at higher volumes.',
        bestFor: 'Automating client onboarding, reporting, and follow-ups',
        pricing: 'Free tier; Core from $9/month',
      },
      {
        name: 'Zapier',
        tagline: 'Simple trigger-based automation',
        description:
          'Best for simple, one-step automations that need to reliably just work. Easier to set up than Make but more expensive at scale. Good starting point if you are new to automation.',
        bestFor: 'Quick wins and simple two-step automations',
        pricing: 'Free tier; Starter from $19.99/month',
      },
    ],
  },
  {
    id: 'sops-docs',
    category: 'SOPs & Documentation',
    intro: 'Documenting processes is one of the highest-leverage things a small agency can do. These tools cut the time it takes.',
    tools: [
      {
        name: 'Scribe',
        tagline: 'Auto-generate SOPs from screen recordings',
        description:
          'Records your screen as you work through a task, then automatically creates a step-by-step guide with annotated screenshots. Cuts documentation time from hours to minutes.',
        bestFor: 'Creating process docs and onboarding materials for new hires or clients',
        pricing: 'Free tier; Pro from $23/month',
      },
      {
        name: 'ChatGPT',
        tagline: 'Fast first drafts for internal documentation',
        description:
          'Useful for turning rough notes or bullet points into structured SOP drafts. Not a replacement for thinking through the process — but a fast way to get a working first draft you can edit.',
        bestFor: 'Drafting SOPs, FAQs, and internal guides',
        pricing: 'Free tier; Plus at $20/month',
      },
    ],
  },
]

const relatedContent = [
  {
    category: 'Guides',
    title: 'How to Automate Client Onboarding',
    href: '/guides/automate-client-onboarding-small-agency',
  },
  {
    category: 'Tools',
    title: 'Best AI Meeting Assistants for Agency Teams',
    href: '/tools/best-ai-meeting-assistants-agencies',
  },
]

export default function BestAIToolsSmallAgencies() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus('success')
    setEmail('')
  }

  return (
    <>
      <Head>
        <title>Best AI Tools for Small Agencies in 2026 — AI Ops Agency</title>
        <meta
          name="description"
          content="A practical roundup of AI tools that actually move the needle for lean agency teams — meeting notes, writing, automation, SOPs, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Best AI Tools for Small Agencies in 2026" />
        <meta
          property="og:description"
          content="A practical roundup of AI tools that actually move the needle for lean agency teams."
        />
      </Head>

      <Nav />

      <main>
        {/* Article Header */}
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Tools</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Best AI Tools for Small Agencies in 2026
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              A practical roundup of the AI tools worth using if you run a lean agency. Organized by use case, not hype. No tools added just because they raised a big funding round.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-gray-400">
              <span>8 min read</span>
              <span>·</span>
              <span>Updated March 2026</span>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">In this article</h2>
            <ol className="space-y-2">
              {toolCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {cat.category}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tool Categories */}
        <div className="max-w-3xl mx-auto px-6">
          {toolCategories.map((cat, idx) => (
            <section
              key={cat.id}
              id={cat.id}
              className={`py-14 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
            >
              <h2 className="text-xl font-bold text-gray-900">{cat.category}</h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{cat.intro}</p>

              <div className="mt-8 space-y-6">
                {cat.tools.map((tool) => (
                  <div key={tool.name} className="border border-gray-100 rounded-lg p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{tool.name}</h3>
                        <p className="mt-0.5 text-xs text-gray-400">{tool.tagline}</p>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-100 rounded px-2 py-1">
                        {tool.pricing}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                    <p className="mt-3 text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">Best for:</span> {tool.bestFor}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Related Content */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Related</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedContent.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block border border-gray-100 bg-white rounded-lg p-5 hover:border-gray-300 transition-colors"
                >
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.category}</span>
                  <p className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="max-w-md">
              <h2 className="text-xl font-bold text-gray-900">Get weekly AI systems for small agencies</h2>
              <p className="mt-2 text-sm text-gray-500">One workflow, one tool, one template — every week. No hype.</p>
              {status === 'success' ? (
                <p className="mt-6 text-sm font-medium text-gray-900">
                  Thank you! You are on the list.
                </p>
              ) : (
                <form className="mt-6 flex gap-2" onSubmit={handleSubscribe}>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
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
