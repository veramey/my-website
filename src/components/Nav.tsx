'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/start-here', label: 'Start Here' },
  { href: '/guides', label: 'Guides' },
  { href: '/tools', label: 'Tools' },
  { href: '/templates', label: 'Templates' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900 text-sm tracking-tight">
          AI Ops Agency
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gray-900 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm text-gray-600">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-900 transition-colors py-1"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
