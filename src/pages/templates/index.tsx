import Head from 'next/head'
import Nav from '@/components/Nav'
import Link from 'next/link'

export default function Templates() {
  return (
    <>
      <Head>
        <title>Templates — AI Ops Agency</title>
        <meta name="description" content="Free AI ops templates for small agency teams." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <p className="mt-4 text-gray-600">Free AI ops templates — coming soon.</p>
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
