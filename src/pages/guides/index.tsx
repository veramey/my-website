import Head from 'next/head'
import Nav from '@/components/Nav'

export default function Guides() {
  return (
    <>
      <Head>
        <title>Guides — AI Ops for Small Agencies</title>
        <meta name="description" content="Practical AI guides for small agencies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Guides</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Practical AI guides
            </h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Step-by-step guides to help small agencies implement AI workflows.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
