'use client'
import { useState, useEffect } from 'react'
import { Map, Layers, TrendingUp, AlertTriangle, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

// Dynamic import for Leaflet (no SSR)
const MapComponent = dynamic(() => import('@/components/LeafletMap'), { ssr: false, loading: () => (
  <div className="w-full h-full bg-green-100 rounded-xl flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-sm text-green-700">Loading map...</p>
    </div>
  </div>
)})

const DEMO_NDVI = [
  { date: '2026-01-15', mean: 0.42, min: 0.31, max: 0.55 },
  { date: '2026-02-01', mean: 0.48, min: 0.35, max: 0.61 },
  { date: '2026-02-15', mean: 0.55, min: 0.40, max: 0.68 },
  { date: '2026-03-01', mean: 0.62, min: 0.48, max: 0.75 },
  { date: '2026-03-15', mean: 0.71, min: 0.58, max: 0.82 },
  { date: '2026-04-01', mean: 0.68, min: 0.52, max: 0.79 },
  { date: '2026-04-15', mean: 0.58, min: 0.44, max: 0.70 },
  { date: '2026-05-01', mean: 0.65, min: 0.50, max: 0.77 },
  { date: '2026-05-15', mean: 0.72, min: 0.59, max: 0.83 },
]

const DEMO_FIELDS = [
  { id: '1', name: 'North Field', lat: 37.7749, lng: -122.4194, ndvi: 0.72, crop: 'Maize', area: 12.5 },
  { id: '2', name: 'South Orchard', lat: 37.7700, lng: -122.4150, ndvi: 0.55, crop: 'Tomato', area: 8.2 },
  { id: '3', name: 'West Paddock', lat: 37.7780, lng: -122.4250, ndvi: 0.38, crop: 'Wheat', area: 15.6 },
  { id: '4', name: 'East Terrace', lat: 37.7760, lng: -122.4100, ndvi: 0.65, crop: 'Soybean', area: 9.8 },
]

export default function GISMapPage() {
  const [selectedField, setSelectedField] = useState<typeof DEMO_FIELDS[0] | null>(null)
  const [ndviData] = useState(DEMO_NDVI)
  const [showLegend, setShowLegend] = useState(true)

  const getNdviColor = (ndvi: number) => {
    if (ndvi >= 0.6) return 'text-green-600'
    if (ndvi >= 0.3) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getNdviLabel = (ndvi: number) => {
    if (ndvi >= 0.6) return 'Healthy'
    if (ndvi >= 0.3) return 'Stressed'
    return 'Critical'
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
              <Map className="w-5 h-5 text-green-700" />
            </div>
            GIS Field Map
          </h1>
          <p className="text-sm text-gray-500">Satellite NDVI health view · {DEMO_FIELDS.length} fields tracked</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <Layers className="w-4 h-4" /> Legend
          </button>
          <span className="text-xs text-gray-400">Sentinel-2 · Updated 2 days ago</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Area */}
        <div className="flex-1 relative">
          <MapComponent fields={DEMO_FIELDS} selectedField={selectedField} onFieldClick={setSelectedField} />

          {/* Legend overlay */}
          {showLegend && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg z-[1000] min-w-[200px]">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">NDVI Legend</h4>
              <div className="space-y-2">
                {[
                  { color: 'bg-green-500', label: 'Healthy', ndvi: '> 0.6' },
                  { color: 'bg-yellow-400', label: 'Stressed', ndvi: '0.3 – 0.6' },
                  { color: 'bg-red-500', label: 'Critical', ndvi: '< 0.3' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${item.color}`} />
                    <div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-xs text-gray-400 ml-1">{item.ndvi}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">NDVI = Normalized Difference Vegetation Index</p>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="w-96 bg-white border-l border-gray-100 overflow-y-auto p-5 space-y-6">
          {/* Field selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Select Field</label>
            <select
              onChange={e => setSelectedField(DEMO_FIELDS.find(f => f.id === e.target.value) || null)}
              value={selectedField?.id || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">All Fields</option>
              {DEMO_FIELDS.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.crop})</option>
              ))}
            </select>
          </div>

          {/* Field info */}
          {selectedField ? (
            <>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{selectedField.name}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border">
                    <p className="text-xs text-gray-500 mb-1">Crop</p>
                    <p className="font-semibold text-gray-900">{selectedField.crop}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <p className="text-xs text-gray-500 mb-1">Area</p>
                    <p className="font-semibold text-gray-900">{selectedField.area} ha</p>
                  </div>
                </div>
              </div>

              {/* NDVI Status */}
              <div className={`rounded-xl p-4 border-2 ${selectedField.ndvi >= 0.6 ? 'bg-green-50 border-green-200' : selectedField.ndvi >= 0.3 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">NDVI Health</span>
                  <span className={`font-bold text-lg ${getNdviColor(selectedField.ndvi)}`}>
                    {selectedField.ndvi.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                  <div
                    className={`h-2.5 rounded-full ${selectedField.ndvi >= 0.6 ? 'bg-green-500' : selectedField.ndvi >= 0.3 ? 'bg-yellow-400' : 'bg-red-500'}`}
                    style={{ width: `${Math.round(selectedField.ndvi * 100)}%` }}
                  />
                </div>
                <span className={`text-sm font-bold ${getNdviColor(selectedField.ndvi)}`}>{getNdviLabel(selectedField.ndvi)}</span>
              </div>

              {/* NDVI Chart */}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  NDVI Trend (6 months)
                </h4>
                <div className="bg-gray-50 rounded-xl p-3 border">
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={ndviData}>
                      <defs>
                        <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.split('-')[1] + '/' + d.split('-')[2]} />
                      <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} tickFormatter={v => v.toFixed(1)} />
                      <Tooltip
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                        formatter={(v: number) => [v.toFixed(3), 'NDVI']}
                      />
                      <Area type="monotone" dataKey="mean" stroke="#16a34a" fill="url(#ndviGrad)" strokeWidth={2} dot={{ r: 3 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Last updated: June 4, 2026</p>
              </div>

              {/* Alerts */}
              {selectedField.ndvi < 0.3 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 text-sm">Critical NDVI Alert</p>
                    <p className="text-xs text-red-600 mt-1">Field health is critically low. Immediate inspection recommended. Check for pest damage or nutrient deficiency.</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Map className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select a field to view NDVI details</p>
              <p className="text-xs mt-1">Click a field marker on the map</p>
            </div>
          )}

          {/* All fields summary */}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-3">All Fields Overview</h4>
            <div className="space-y-2">
              {DEMO_FIELDS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedField(f)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedField?.id === f.id ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{f.name}</span>
                    <span className={`text-sm font-bold ${getNdviColor(f.ndvi)}`}>{f.ndvi.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{f.crop} · {f.area} ha</span>
                    <span className={`text-xs font-semibold ${getNdviColor(f.ndvi)}`}>{getNdviLabel(f.ndvi)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}