import Link from 'next/link'
import { Sprout, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">GreenWeb Institute</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              Precision agriculture platform empowering farmers with AI disease detection,
              satellite mapping, and smart farm management.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-green-200 mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {['My Farm', 'Crop Cycles', 'Livestock', 'Inventory', 'AI Detection'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-').replace('ai-detection', 'ai-disease')}`}
                    className="text-green-300 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-green-200 mb-4 text-sm uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              {['GIS Map', 'Marketplace', 'Weather', 'Reports'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-green-300 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-green-200 mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <p className="text-green-300 text-sm mt-4">contact@greenweb.institute</p>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-400 text-sm">
            © 2026 GreenWeb Institute. Built for farmers, by agritech innovators.
          </p>
          <p className="text-green-500 text-xs">
            Precision Farming · Geospatial Intelligence · AI-Powered Agriculture
          </p>
        </div>
      </div>
    </footer>
  )
}