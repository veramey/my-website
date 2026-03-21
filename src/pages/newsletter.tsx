import Head from 'next/head'
import Nav from '@/components/Nav'
import Link from 'next/link'

export default function Newsletter() {
  return (
    <>
      <Head>
        <title>Newsletter — AI Ops Agency</title>
        <meta name="description" content="Weekly practical AI systems for small agencies. One workflow, one tool, one template — every week." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
        <p className="mt-4 text-gray-600">Weekly practical AI systems — coming soon.</p>
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
