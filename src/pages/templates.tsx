import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const templates = [
  {
    category: 'Free',
    title: 'AI Ops Starter Kit — Client Onboarding Checklist',
    description: '10 workflow templates, a starter tool stack, onboarding checklist, and SOP prompt pack.',
    href: '/templates/client-onboarding-ai-checklist',
  },
]

export default function Templates() {
  return (
    <>
      <Head>
        <title>Templates — AI Ops for Small Agencies</title>
        <meta name="description" content="Free and paid templates for small agencies. Checklists, SOPs, onboarding workflows, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Templates — AI Ops for Small Agencies" />
        <meta property="og:description" content="Free and paid templates for small agencies." />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Templates</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Ready-to-use templates
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Checklists, SOP packs, onboarding workflows, and more — built for small agency teams.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col gap-6">
              {templates.map((template) => (
                <Link
                  key={template.href}
                  href={template.href}
                  className="group block border border-gray-100 rounded-lg p-6 hover:border-gray-300 transition-colors"
                >
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{template.category}</span>
                  <h2 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                    {template.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{template.description}</p>
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
