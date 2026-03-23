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

        <section className="border-t border-gray-100">
          <div className="py-14">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Why templates matter</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="mt-0.5 text-gray-400" aria-hidden="true">—</span>
                <span className="text-sm text-gray-600">Remove blank-page work — start from a working structure, not from zero</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-gray-400" aria-hidden="true">—</span>
                <span className="text-sm text-gray-600">Standardize repeated tasks — every client gets the same quality experience</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-gray-400" aria-hidden="true">—</span>
                <span className="text-sm text-gray-600">Implement faster — spend time adapting, not building from scratch</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/templates/client-onboarding-ai-checklist"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700"
              >
                Get the starter kit
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100">
          <div className="py-14">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Coming soon</h2>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-500">Proposal workflow template</li>
              <li className="text-sm text-gray-500">Kickoff agenda template</li>
              <li className="text-sm text-gray-500">SOP drafting prompt pack</li>
              <li className="text-sm text-gray-500">Client follow-up template</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/newsletter"
                className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
              >
                Join newsletter for new templates
              </Link>
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
