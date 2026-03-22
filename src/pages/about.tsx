import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function About() {
  return (
    <>
      <Head>
        <title>About — AI Ops for Small Agencies</title>
        <meta name="description" content="Learn about AI Ops Agency — a practical resource for small agencies who want real AI systems, not hype. Built for lean teams focused on implementation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="About — AI Ops for Small Agencies" />
        <meta property="og:description" content="Learn about AI Ops Agency — a practical resource for small agencies who want real AI systems, not hype. Built for lean teams focused on implementation." />
        <meta property="og:url" content="https://www.aiopagency.com/about" />
        <link rel="canonical" href="https://www.aiopagency.com/about" />
      </Head>

      <Nav />

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">About</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              About this project
            </h1>
            <div className="mt-8 space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                I&apos;m a builder and operator interested in systems, automation, and the practical business use of AI — not the hype around it.
              </p>
              <p>
                Small agencies don&apos;t need another think piece on the future of work. They need working systems. This project documents what actually helps lean teams operate better: the workflows, tools, and templates that make a real difference in daily client work and internal ops.
              </p>
              <p>
                The core beliefs here are simple: practical over trendy, systems over chaos, implementation over inspiration.
              </p>
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
