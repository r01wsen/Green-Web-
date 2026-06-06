import Link from 'next/link'
import {
  Sprout, Tractor, Leaf, Warehouse, FlaskConical, ShoppingBag,
  Map, TrendingUp, Satellite, Shield, Zap, Globe, ArrowRight,
  CheckCircle2, Star, Users, BarChart3
} from 'lucide-react'

const features = [
  { icon: FlaskConical, title: 'AI Disease Detection', desc: 'Upload crop photos for instant AI-powered disease diagnosis with confidence scores', color: 'bg-red-50 border-red-200 text-red-600' },
  { icon: Map, title: 'GIS Field Mapping', desc: 'Draw field boundaries on satellite maps and track NDVI health indices over time', color: 'bg-blue-50 border-blue-200 text-blue-600' },
  { icon: Sprout, title: 'Crop Cycle Management', desc: 'Track planting to harvest with yield predictions and fertilizer planning', color: 'bg-green-50 border-green-200 text-green-600' },
  { icon: Leaf, title: 'Livestock Tracking', desc: 'Monitor animal health, vaccinations, and breeding records in one place', color: 'bg-amber-50 border-amber-200 text-amber-600' },
  { icon: Warehouse, title: 'Smart Inventory', desc: 'Track seeds, fertilizers, pesticides with low-stock alerts and expiry warnings', color: 'bg-purple-50 border-purple-200 text-purple-600' },
  { icon: ShoppingBag, title: 'Direct Marketplace', desc: 'Sell produce directly to buyers with listings, orders, and delivery tracking', color: 'bg-orange-50 border-orange-200 text-orange-600' },
  { icon: Satellite, title: 'Satellite Integration', desc: 'NASA MODIS + Sentinel-2 NDVI composites with pre-fetch caching', color: 'bg-cyan-50 border-cyan-200 text-cyan-600' },
  { icon: TrendingUp, title: 'Yield Predictions', desc: 'ML models trained on your historical data + NDVI + weather for accurate forecasts', color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
]

const stats = [
  { value: '22+', label: 'Years Agronomy Experience', icon: Star },
  { value: '200+', label: 'Farmers Engaged Globally', icon: Users },
  { value: '345%', label: 'Engagement Growth Rate', icon: BarChart3 },
  { value: '4', label: 'Patents Licensed', icon: Shield },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-600/50 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium text-green-200">Precision Agriculture Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              The Future of <span className="text-green-300">Smart Farming</span> is Here
            </h1>
            <p className="text-lg md:text-xl text-green-100 leading-relaxed mb-8 max-w-2xl">
              AI-powered disease detection, satellite NDVI mapping, crop cycle management,
              livestock tracking, and a direct marketplace — all in one platform built for
              farmers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/farm"
                className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
              >
                Start Farming <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-disease"
                className="inline-flex items-center gap-2 bg-green-600/50 border border-green-500/50 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-green-600/60 transition-colors backdrop-blur-sm"
              >
                <FlaskConical className="w-4 h-4" />
                Try AI Diagnosis
              </Link>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 54C96 48 192 36 288 30C384 24 480 24 576 30C672 36 768 48 864 54C960 60 1056 60 1152 54C1248 48 1344 36 1392 30L1440 30V60H0Z" fill="#f0fdf4"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-green-800 mb-1">{value}</div>
                <div className="text-sm text-gray-600 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Farm Smarter
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From satellite-powered field maps to AI disease detection and direct market access —
            a complete platform for modern agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className={`card-hover rounded-2xl p-6 border ${color} bg-white`}>
              <div className="w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="bg-white border-y border-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1 mb-5">
                <Zap className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-semibold text-red-600">AI-POWERED</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Diagnose Crop Diseases in Seconds
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Upload a photo of your crop and our AI will identify potential diseases,
                assess severity, and recommend treatment — all within seconds.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '38 crop disease categories detected',
                  'Confidence score for every diagnosis',
                  'Severity rating: low to critical',
                  'Recommended action with treatment options',
                  'Stores history for seasonal comparison'
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/ai-disease"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Try AI Diagnosis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <FlaskConical className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Analysis Result</p>
                    <p className="text-xs text-gray-500">Corn Northern Leaf Blight</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confidence</span>
                    <span className="text-sm font-bold text-green-700">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Severity</span>
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">HIGH</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-1">Recommended Action</p>
                    <p className="text-sm text-gray-700">Apply fungicide within 48 hours. Remove infected leaves. Ensure proper field drainage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Join the next generation of precision agriculture. Start managing your farm
            smarter, today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/farm"
              className="inline-flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-colors text-lg"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/gis-map"
              className="inline-flex items-center gap-2 bg-green-600/50 border border-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors text-lg"
            >
              View GIS Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}