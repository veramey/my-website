import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const templates: { title: string; description: string; href: string }[] = [
  {
    title: 'AI Ops Starter Kit',
    description: 'A complete starter kit for small agencies — 10 workflow templates, tool stack, onboarding checklist, and SOP prompt pack. Free download.',
    href: '/templates/client-onboarding-ai-checklist',
  },
]

export default function TemplatesIndex() {
  return (
    <>
      <Head>
        <title>Templates — AI Ops for Small Agencies</title>
        <meta
          name="description"
          content="Free and paid templates for small agencies — onboarding checklists, SOP packs, workflow templates, and more. Practical, ready to use."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Templates — AI Ops for Small Agencies" />
        <meta
          property="og:description"
          content="Free and paid templates for small agencies — onboarding checklists, SOP packs, workflow templates, and more. Practical, ready to use."
        />
        <meta property="og:url" content="https://www.aiopagency.com/templates" />
        <link rel="canonical" href="https://www.aiopagency.com/templates" />
      </Head>

      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Templates</h1>
        <p className="mt-3 text-base text-gray-500 max-w-xl">
          Ready-to-use templates for small agencies — free downloads and practical starting points for your AI ops workflows.
        </p>

        <div className="mt-14">
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Link
                key={template.href}
                href={template.href}
                className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-colors"
              >
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                  {template.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {template.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
