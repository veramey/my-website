import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

const services = [
  {
    name: 'AI Ops Audit',
    description: 'A structured review of your workflows, tool stack, and operations. We identify bottlenecks and give you a clear implementation roadmap.',
  },
  {
    name: 'AI Ops Setup',
    description: 'Done-for-you implementation of core AI systems — onboarding, delivery, internal ops, and documentation — tailored to your agency.',
  },
]

export default function Services() {
  return (
    <>
      <Head>
        <title>Services — AI Ops for Small Agencies</title>
        <meta name="description" content="AI Ops services for small agencies — including the AI Ops Audit and AI Ops Setup. Join the waitlist to be first in line." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Services — AI Ops for Small Agencies" />
        <meta property="og:description" content="AI Ops services for small agencies — including the AI Ops Audit and AI Ops Setup. Join the waitlist to be first in line." />
        <meta property="og:url" content="https://www.aiopagency.com/services" />
        <link rel="canonical" href="https://www.aiopagency.com/services" />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Done-for-you AI ops
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Practical AI systems implemented in your agency. No theory — just working setups built for lean teams.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Available services</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              {services.map((service) => (
                <div key={service.name} className="border border-gray-100 rounded-lg p-6 bg-white">
                  <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{service.description}</p>
                  <span className="mt-4 inline-block text-xs font-medium text-gray-400 uppercase tracking-widest">Coming soon</span>
                </div>
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
