import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const tools = [
  {
    name: 'Fireflies.ai',
    tagline: 'Best for automated transcription and search',
    description:
      'Fireflies joins your calls automatically, transcribes in real time, and lets you search across every meeting you\'ve recorded. Good for agencies that need a searchable record of client conversations.',
    strengths: ['Auto-joins calls', 'Full-text search across transcripts', 'CRM integrations'],
    limitations: ['Transcription accuracy drops with accents', 'Free plan has limited storage'],
    bestFor: 'Teams that want set-it-and-forget-it recording with a searchable archive.',
  },
  {
    name: 'Otter.ai',
    tagline: 'Best for live note-taking during calls',
    description:
      'Otter provides a live transcript as your call happens, making it useful when you want to follow along in real time. It also generates summaries and action items automatically after the meeting.',
    strengths: ['Live transcript view', 'Auto-generated summaries', 'Easy sharing with clients'],
    limitations: ['Less reliable for non-English speakers', 'Summary quality varies by meeting structure'],
    bestFor: 'Client-facing teams that want to share clean meeting summaries quickly.',
  },
  {
    name: 'Fathom',
    tagline: 'Best free option for individual users',
    description:
      'Fathom records and summarizes Zoom calls with a generous free tier. It highlights key moments during the call so you can focus on the conversation instead of note-taking.',
    strengths: ['Generous free plan', 'Highlights key moments in real time', 'Clean UI'],
    limitations: ['Zoom-only (no Google Meet or Teams on free plan)', 'Limited team features on free tier'],
    bestFor: 'Solo operators or small agencies who primarily use Zoom and want a free solution.',
  },
  {
    name: 'Notion AI + Meeting Notes',
    tagline: 'Best for teams already in Notion',
    description:
      'If your agency runs on Notion, using Notion AI to process meeting transcripts can keep everything in one place. Paste a transcript, prompt it to extract action items, and you\'re done.',
    strengths: ['No additional tool to manage', 'Flexible formatting', 'Works with any transcript source'],
    limitations: ['Not automated — requires manual paste', 'Requires a Notion AI subscription'],
    bestFor: 'Notion-first teams who want to avoid adding another tool to their stack.',
  },
  {
    name: 'tl;dv',
    tagline: 'Best for timestamped highlights and client clips',
    description:
      'tl;dv lets you clip and share specific moments from recorded meetings. Useful when you want to send a client a 30-second clip instead of a full transcript.',
    strengths: ['Timestamped highlights', 'Easy clip sharing', 'Multilingual transcription'],
    limitations: ['Less useful if you only need text summaries', 'Some features behind paywall'],
    bestFor: 'Agencies delivering video-heavy client work or internal reviews where context clips matter.',
  },
]

const title = 'Best AI Meeting Assistants for Agency Teams (2026)'
const description =
  'A practical comparison of AI meeting assistants for small agency teams — focused on what actually saves time, not just what has the best marketing.'

export default function BestAIMeetingAssistants() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Tools</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Best AI Meeting Assistants for Agency Teams
          </h1>
          <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-2xl">
            Manual meeting notes are a time sink. The right AI assistant handles transcription,
            summaries, and action items automatically — so you can stay in the conversation instead of
            managing a notepad. Here&apos;s what actually works for small agency teams in 2026.
          </p>
          <p className="mt-3 text-sm text-gray-400">Updated March 2026 · 5 tools reviewed</p>
        </section>

        {/* What to look for */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">What to look for</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Most AI meeting tools do the same basic thing: record, transcribe, summarize. The
              differences that matter for agencies are integration with your existing tools, accuracy
              on real client calls, and whether the summaries are actually usable — not just a
              wall of bullet points.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                'Auto-join or manual record — does it need you to start it?',
                'Transcript quality on client calls with varied accents or jargon',
                'Summary format — action items, decisions, next steps',
                'Where output lands — email, Slack, Notion, CRM',
                'Team sharing — can clients or teammates access recordings easily?',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="text-gray-300 mt-0.5">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tool list */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-10">
            The tools
          </h2>
          <div className="space-y-12">
            {tools.map((tool, index) => (
              <div key={tool.name} className="border-t border-gray-100 pt-10 first:border-t-0 first:pt-0">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xs font-bold text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                </div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
                  {tool.tagline}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{tool.description}</p>
                <div className="grid sm:grid-cols-2 gap-6 mb-5">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Strengths
                    </p>
                    <ul className="space-y-1">
                      {tool.strengths.map((s) => (
                        <li key={s} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-gray-300 mt-0.5">+</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Limitations
                    </p>
                    <ul className="space-y-1">
                      {tool.limitations.map((l) => (
                        <li key={l} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-gray-300 mt-0.5">−</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 rounded px-4 py-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Best for:{' '}
                  </span>
                  <span className="text-sm text-gray-700">{tool.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom recommendation */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Bottom line</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              For most small agencies, <strong className="text-gray-800">Fireflies</strong> or{' '}
              <strong className="text-gray-800">Otter</strong> will cover 90% of what you need. If
              you&apos;re price-sensitive and mostly on Zoom, start with{' '}
              <strong className="text-gray-800">Fathom</strong> — the free plan is genuinely useful.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              The goal isn&apos;t to find the most feature-rich tool. It&apos;s to remove the manual step of
              writing notes so you can actually use the time saved. Pick one, set it up, and let it run.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Related
          </h2>
          <ul className="space-y-3">
            {[
              { title: 'Best AI tools for small agencies', href: '/tools/best-ai-tools-small-agencies' },
              { title: 'How to automate client onboarding', href: '/guides/automate-client-onboarding-small-agency' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between group text-sm font-medium text-gray-800 border-b border-gray-100 pb-3 hover:text-gray-500 transition-colors"
                >
                  <span>{item.title}</span>
                  <span aria-hidden="true" className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <div className="max-w-md">
              <h2 className="text-lg font-bold text-gray-900">Get weekly practical AI systems</h2>
              <p className="mt-2 text-sm text-gray-500">
                One workflow, one tool, one template — every week. No hype.
              </p>
              {submitted ? (
                <p className="mt-5 text-sm text-gray-600">Thanks! You&apos;re on the list.</p>
              ) : (
                <form className="mt-5 flex gap-2" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    aria-label="Email address"
                    placeholder="your@email.com"
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
