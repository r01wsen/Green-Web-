'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Sprout, Menu, X, Leaf, Tractor, Warehouse, FlaskConical, ShoppingBag, Map, User } from 'lucide-react'

const navItems = [
  { href: '/farm', label: 'My Farm', icon: Tractor },
  { href: '/crops', label: 'Crop Cycles', icon: Sprout },
  { href: '/livestock', label: 'Livestock', icon: Leaf },
  { href: '/inventory', label: 'Inventory', icon: Warehouse },
  { href: '/ai-disease', label: 'AI Detection', icon: FlaskConical },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { href: '/gis-map', label: 'GIS Map', icon: Map },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-field-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 transition-colors group-hover:bg-forest-800">
              <Sprout className="h-5 w-5 text-wheat-300" />
            </div>
            <div className="leading-none">
              <span className="block font-display text-lg font-semibold text-forest-900">GreenWeb</span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-wheat-600">Institute</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname?.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-forest-50 text-forest-800'
                      : 'text-field-muted hover:bg-forest-50 hover:text-forest-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-800"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden rounded-lg p-2 text-field-muted transition-colors hover:bg-forest-50"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-field-line py-4">
            <div className="flex flex-col gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-forest-50 text-forest-800'
                        : 'text-field-muted hover:bg-forest-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                )
              })}
              <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-field-muted hover:bg-forest-50">
                <User className="h-5 w-5" />
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}