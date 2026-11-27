import Link from 'next/link'
import {
  Sprout, Leaf, Warehouse, FlaskConical, ShoppingBag, Map, TrendingUp, Satellite,
  ArrowRight, CheckCircle2, Tractor, Users, GraduationCap, Mail,
} from 'lucide-react'
import { FieldMap } from '@/components/FieldMap'

const tools = [
  { icon: Map, title: 'GIS field mapping', desc: 'Draw field boundaries on satellite maps and follow each field’s NDVI over the season.', href: '/gis-map' },
  { icon: FlaskConical, title: 'AI disease detection', desc: 'Photograph a leaf and get a diagnosis, confidence score, severity and treatment.', href: '/ai-disease' },
  { icon: Sprout, title: 'Crop cycles', desc: 'Plan from planting to harvest with fertilizer schedules and yield estimates.', href: '/crops' },
  { icon: Leaf, title: 'Livestock records', desc: 'Health, vaccinations and breeding records for every animal in one place.', href: '/livestock' },
  { icon: Warehouse, title: 'Farm inventory', desc: 'Seed, fertilizer and pesticide stock with low-stock and expiry alerts.', href: '/inventory' },
  { icon: ShoppingBag, title: 'Direct marketplace', desc: 'List produce, take orders and track deliveries without a middleman.', href: '/marketplace' },
  { icon: Satellite, title: 'Satellite data', desc: 'NASA MODIS and Sentinel-2 NDVI composites, cached so maps load fast in the field.', href: '/gis-map' },
  { icon: TrendingUp, title: 'Yield forecasts', desc: 'Models that combine your field history, NDVI and weather into a harvest forecast.', href: '/crops' },
]

const stats = [
  { value: '22+', label: 'years of agronomy experience' },
  { value: '200+', label: 'farmers engaged worldwide' },
  { value: '4', label: 'patents licensed' },
  { value: '38', label: 'crop diseases recognized' },
]

const steps = [
  { title: 'Map your fields', desc: 'Outline each field once on the satellite map. Crops, planting dates and inputs attach to it.' },
  { title: 'Watch crop health', desc: 'Fresh NDVI imagery shows which parts of a field are thriving and which are falling behind.' },
  { title: 'Act early', desc: 'Get an alert when a field drops, confirm the cause with a leaf photo, and treat only where needed.' },
]

const audiences = [
  { icon: Tractor, title: 'Farmers', desc: 'One place for fields, crops, animals and sales, on your phone.' },
  { icon: Users, title: 'Cooperatives & agribusiness', desc: 'See every member farm’s field health and plan inputs and buying together.' },
  { icon: GraduationCap, title: 'Institutes & extension', desc: 'Teach precision agriculture with real satellite data and field records.' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none" viewBox="0 0 800 400">
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M-20 ${40 + i * 26} C 180 ${10 + i * 26}, 420 ${80 + i * 26}, 820 ${20 + i * 26}`} stroke="#e2b85a" strokeWidth="1" fill="none" />
          ))}
        </svg>
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-28">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-wheat-300">GreenWeb Institute · Precision agriculture</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              See every field from space. Act before the harvest is at risk.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-100">
              Satellite crop-health maps, AI disease diagnosis, farm records and a direct marketplace, in one platform built for farmers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/farm" className="inline-flex items-center justify-center gap-2 rounded-xl bg-wheat-300 px-6 py-3.5 font-semibold text-forest-950 transition-colors hover:bg-wheat-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat-200">
                Start with your farm <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/ai-disease" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FlaskConical className="h-4 w-4" /> Diagnose a crop photo
              </Link>
            </div>
            <p className="mt-8 text-sm text-forest-200">Imagery from NASA MODIS and ESA Sentinel-2.</p>
          </div>
          <div className="min-w-0 lg:pl-6">
            <FieldMap />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-field-line bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="border-l-2 border-wheat-300 pl-4">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-semibold text-forest-700 tabular md:text-4xl">{value}</dd>
              <dd className="mt-1 text-sm text-field-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat-600">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest-900 md:text-4xl">From a satellite pass to a decision in the field</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-field-line bg-white p-6">
              <span className="font-display text-4xl font-semibold text-wheat-300 tabular">{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-forest-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-field-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tools */}
      <section className="bg-forest-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat-600">The platform</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-forest-900 md:text-4xl">Everything the farm runs on</h2>
            </div>
            <p className="max-w-md text-field-muted">Eight tools that share the same fields, crops and records, so you enter things once.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map(({ icon: Icon, title, desc, href }) => (
              <Link key={title} href={href} className="card-hover group flex flex-col rounded-2xl border border-field-line bg-white p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest-500">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-700 text-wheat-200">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold text-forest-900">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-field-muted">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-600 group-hover:gap-2 transition-all">Open <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI diagnosis */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat-600">AI crop diagnosis</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-forest-900 md:text-4xl">A plant pathologist in your pocket</h2>
            <p className="mt-4 text-lg leading-relaxed text-field-muted">
              Photograph an affected leaf. GreenWeb identifies the likely disease, rates its severity and tells you what to do next.
            </p>
            <ul className="mt-6 space-y-3">
              {['Recognizes 38 crop disease categories', 'Confidence score on every diagnosis', 'Severity from low to critical', 'Treatment steps you can act on today', 'History kept for season-to-season comparison'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-field-ink">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/ai-disease" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-forest-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-800">
              Try a diagnosis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl bg-forest-900 p-6 sm:p-10">
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-field-muted">Diagnosis · Field C-03</p>
                  <p className="mt-1 font-display text-xl font-semibold text-forest-900">Northern corn leaf blight</p>
                  <p className="text-sm italic text-field-muted">Exserohilum turcicum</p>
                </div>
                <span className="rounded-full bg-wheat-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-wheat-600">High</span>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-field-muted">Confidence</span>
                  <span className="font-semibold text-forest-700 tabular">94.2%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-forest-50">
                  <div className="h-2 rounded-full bg-forest-500" style={{ width: '94.2%' }} />
                </div>
              </div>
              <div className="mt-6 border-t border-field-line pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-field-muted">Recommended action</p>
                <p className="mt-2 text-sm leading-relaxed text-field-ink">Apply a labeled fungicide within 48 hours, remove heavily infected leaves and improve field drainage.</p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-forest-200">Example result. Always follow local label rules for crop protection products.</p>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-t border-field-line bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-forest-900 md:text-4xl">Built for the whole farm community</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {audiences.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-wheat-100 text-wheat-600"><Icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-semibold text-forest-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-field-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-forest-800 px-6 py-14 text-center text-white sm:px-12 md:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold md:text-4xl">Put your first field on the map today</h2>
          <p className="mx-auto mt-4 max-w-xl text-forest-100">Set up your farm in minutes. Partnerships, pilots and training programs: write to us.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/farm" className="inline-flex items-center gap-2 rounded-xl bg-wheat-300 px-7 py-3.5 font-semibold text-forest-950 transition-colors hover:bg-wheat-200">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="mailto:contact@greenweb.institute" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:bg-white/10">
              <Mail className="h-4 w-4" /> contact@greenweb.institute
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
