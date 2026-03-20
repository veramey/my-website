import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900 text-sm tracking-tight">
          AI Ops Agency
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/start-here" className="hover:text-gray-900 transition-colors">Start Here</Link>
          <Link href="/guides" className="hover:text-gray-900 transition-colors">Guides</Link>
          <Link href="/tools" className="hover:text-gray-900 transition-colors">Tools</Link>
          <Link href="/templates" className="hover:text-gray-900 transition-colors">Templates</Link>
          <Link href="/newsletter" className="hover:text-gray-900 transition-colors">Newsletter</Link>
          <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
        </div>
      </div>
    </nav>
  )
}
