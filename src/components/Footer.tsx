import Link from 'next/link'
import { Sprout } from 'lucide-react'

const columns: { title: string; links: [string, string][] }[] = [
  { title: 'Farm', links: [['/farm', 'My farm'], ['/crops', 'Crop cycles'], ['/livestock', 'Livestock'], ['/inventory', 'Inventory']] },
  { title: 'Tools', links: [['/gis-map', 'GIS field map'], ['/ai-disease', 'AI disease detection'], ['/marketplace', 'Marketplace'], ['/profile', 'Profile']] },
]

export function Footer() {
  return (
    <footer className="mt-auto bg-forest-950 text-forest-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-700">
                <Sprout className="h-5 w-5 text-wheat-300" />
              </div>
              <span className="font-display text-lg font-semibold text-white">GreenWeb Institute</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-forest-200">
              Precision agriculture for every farm: satellite crop-health maps, AI disease detection and farm management in one place.
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat-300">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-forest-200 transition-colors hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat-300">Contact</h4>
            <p className="mt-4 text-sm text-forest-200">Partnerships, pilots and training programs:</p>
            <a href="mailto:contact@greenweb.institute" className="mt-1 inline-block text-sm font-medium text-white underline decoration-wheat-300/60 underline-offset-4 hover:decoration-wheat-300">
              contact@greenweb.institute
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-forest-300 sm:flex-row sm:items-center">
          <p>© 2026 GreenWeb Institute. Built for farmers, by agritech innovators.</p>
          <p>Precision farming · Geospatial intelligence · AI for agriculture</p>
        </div>
      </div>
    </footer>
  )
}
