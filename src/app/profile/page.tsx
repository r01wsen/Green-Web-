'use client'
import { User, Mail, Phone, MapPin, Globe, Shield, Bell, LogOut } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-700 to-green-800 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-3xl font-bold">
              WN
            </div>
            <div>
              <h2 className="text-2xl font-bold">Dr. Walid Nosir</h2>
              <p className="text-green-200">Director of Agronomy · GreenWeb Institute</p>
              <span className="inline-block mt-2 text-xs bg-green-600/50 border border-green-500/30 px-3 py-1 rounded-full">
                Director of Agronomy
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Mail, label: 'Email', value: 'w.nosir@gmail.com' },
            { icon: Phone, label: 'Phone', value: '+1 (585) 300-1319' },
            { icon: MapPin, label: 'Location', value: 'Newburgh, IN, USA' },
            { icon: Globe, label: 'Language', value: 'English' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Icon className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="font-medium text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        {[
          { icon: Bell, label: 'Notifications', desc: 'Email and SMS alerts for crop events, livestock reminders' },
          { icon: Shield, label: 'Security', desc: 'Password, two-factor authentication, session history' },
          { icon: Globe, label: 'Language & Region', desc: 'Preferred language, currency, units' },
        ].map(({ icon: Icon, label, desc }) => (
          <button key={label} className="w-full text-left bg-white rounded-xl border border-gray-100 p-5 hover:border-green-200 transition-colors flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-green-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{label}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          </button>
        ))}

        <button className="w-full text-left bg-red-50 rounded-xl border border-red-100 p-5 hover:bg-red-100 transition-colors flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-red-700">Sign Out</h3>
            <p className="text-sm text-red-500">Log out of your GreenWeb account</p>
          </div>
        </button>
      </div>
    </div>
  )
}