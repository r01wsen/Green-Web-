'use client'
import { useState } from 'react'
import { Sprout, Plus, Calendar, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'

const DEMO_CROPS = [
  { id: '1', field: 'North Field', crop_type: 'Maize', variety: 'Pioneer P0573', planting_date: '2026-04-15', expected_harvest: '2026-08-15', status: 'growing', yield_kg: null },
  { id: '2', field: 'South Orchard', crop_type: 'Tomato', variety: 'Roma VF', planting_date: '2026-05-01', expected_harvest: '2026-08-01', status: 'planted', yield_kg: null },
  { id: '3', field: 'West Paddock', crop_type: 'Wheat', variety: 'Durum', planting_date: '2025-11-10', expected_harvest: '2026-03-10', status: 'harvested', yield_kg: 4200 },
  { id: '4', field: 'East Terrace', crop_type: 'Soybean', variety: 'Williams 82', planting_date: '2026-05-20', expected_harvest: '2026-09-20', status: 'planned', yield_kg: null },
]

const STATUS_CONFIG = {
  planned: { label: 'Planned', bg: 'bg-blue-100', text: 'text-blue-700', icon: Calendar },
  planted: { label: 'Planted', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Sprout },
  growing: { label: 'Growing', bg: 'bg-green-100', text: 'text-green-700', icon: Sprout },
  harvesting: { label: 'Harvesting', bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertTriangle },
  harvested: { label: 'Harvested', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
  failed: { label: 'Failed', bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
}

export default function CropsPage() {
  const [crops, setCrops] = useState(DEMO_CROPS)
  const [showForm, setShowForm] = useState(false)
  const [newCrop, setNewCrop] = useState({ field: '', crop_type: '', variety: '', planting_date: '', expected_harvest: '' })

  const addCrop = () => {
    if (!newCrop.field || !newCrop.crop_type) return
    const crop = {
      id: Date.now().toString(),
      ...newCrop,
      status: 'planned',
      yield_kg: null,
    }
    setCrops([...crops, crop])
    setNewCrop({ field: '', crop_type: '', variety: '', planting_date: '', expected_harvest: '' })
    setShowForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-green-700" />
            </div>
            Crop Cycles
          </h1>
          <p className="text-gray-500 mt-1">Track planting, growth, and harvest for all your fields</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> Add Crop Cycle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">New Crop Cycle</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
              <select value={newCrop.field} onChange={e => setNewCrop({ ...newCrop, field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                <option value="">Select field</option>
                <option value="North Field">North Field</option>
                <option value="South Orchard">South Orchard</option>
                <option value="West Paddock">West Paddock</option>
                <option value="East Terrace">East Terrace</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
              <select value={newCrop.crop_type} onChange={e => setNewCrop({ ...newCrop, crop_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                <option value="">Select crop</option>
                <option value="Maize">Maize</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Soybean">Soybean</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Cassava">Cassava</option>
                <option value="Cotton">Cotton</option>
                <option value="Coffee">Coffee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
              <input type="text" value={newCrop.variety} onChange={e => setNewCrop({ ...newCrop, variety: e.target.value })}
                placeholder="e.g. Pioneer P0573"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
              <input type="date" value={newCrop.planting_date} onChange={e => setNewCrop({ ...newCrop, planting_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Harvest</label>
              <input type="date" value={newCrop.expected_harvest} onChange={e => setNewCrop({ ...newCrop, expected_harvest: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addCrop} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Save Cycle</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">Cancel</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Cycles', value: crops.length },
          { label: 'Growing', value: crops.filter(c => c.status === 'growing').length },
          { label: 'Harvested', value: crops.filter(c => c.status === 'harvested').length },
          { label: 'Avg Yield (kg)', value: crops.filter(c => c.yield_kg).length ? Math.round(crops.filter(c => c.yield_kg).reduce((s, c) => s + c.yield_kg!, 0) / crops.filter(c => c.yield_kg).length) : 0 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Crops Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-green-50">
                {['Field', 'Crop', 'Variety', 'Planted', 'Expected Harvest', 'Status', 'Yield (kg)', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {crops.map(crop => {
                const config = STATUS_CONFIG[crop.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.planned
                return (
                  <tr key={crop.id} className="hover:bg-green-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-gray-900">{crop.field}</td>
                    <td className="px-4 py-3.5 text-green-700 font-medium">{crop.crop_type}</td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm">{crop.variety || '—'}</td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm">{crop.planting_date}</td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm">{crop.expected_harvest}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-mono text-sm">{crop.yield_kg ? crop.yield_kg.toLocaleString() : '—'}</td>
                    <td className="px-4 py-3.5">
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}