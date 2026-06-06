'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Tractor, Plus, MapPin, Droplets, ChevronRight, Sprout, Edit2, Trash2 } from 'lucide-react'

const DEMO_FIELDS = [
  { id: '1', name: 'North Field', area_sqm: 12500, soil_type: 'Clay loam', irrigation_type: 'drip', crop: 'Maize', status: 'growing' },
  { id: '2', name: 'South Orchard', area_sqm: 8200, soil_type: 'Sandy loam', irrigation_type: 'rainfed', crop: 'Tomato', status: 'planted' },
  { id: '3', name: 'West Paddock', area_sqm: 15600, soil_type: 'Silt', irrigation_type: 'flood', crop: 'Wheat', status: 'harvesting' },
]

const CROP_STATUS_COLORS: Record<string, string> = {
  planned: 'bg-blue-100 text-blue-700',
  planted: 'bg-yellow-100 text-yellow-700',
  growing: 'bg-green-100 text-green-700',
  harvesting: 'bg-orange-100 text-orange-700',
  harvested: 'bg-gray-100 text-gray-600',
  failed: 'bg-red-100 text-red-600',
}

export default function FarmPage() {
  const [fields, setFields] = useState(DEMO_FIELDS)
  const [showForm, setShowForm] = useState(false)
  const [newField, setNewField] = useState({ name: '', soil_type: '', irrigation_type: '' })
  const supabase = createClient()

  const addField = () => {
    if (!newField.name) return
    const field = {
      id: Date.now().toString(),
      name: newField.name,
      area_sqm: Math.floor(Math.random() * 10000) + 5000,
      soil_type: newField.soil_type || 'Loam',
      irrigation_type: newField.irrigation_type || 'drip',
      crop: 'Not planted',
      status: 'planned',
    }
    setFields([...fields, field])
    setNewField({ name: '', soil_type: '', irrigation_type: '' })
    setShowForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Tractor className="w-5 h-5 text-green-700" />
            </div>
            My Farm
          </h1>
          <p className="text-gray-500 mt-1">Manage your fields, view boundaries, and track crop assignments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Field
        </button>
      </div>

      {/* Add Field Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Add New Field</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
              <input
                type="text"
                value={newField.name}
                onChange={e => setNewField({ ...newField, name: e.target.value })}
                placeholder="e.g. North Field"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
              <select
                value={newField.soil_type}
                onChange={e => setNewField({ ...newField, soil_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select soil</option>
                <option value="Clay loam">Clay loam</option>
                <option value="Sandy loam">Sandy loam</option>
                <option value="Silt">Silt</option>
                <option value="Sandy clay">Sandy clay</option>
                <option value="Loam">Loam</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation</label>
              <select
                value={newField.irrigation_type}
                onChange={e => setNewField({ ...newField, irrigation_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="drip">Drip</option>
                <option value="flood">Flood</option>
                <option value="rainfed">Rainfed</option>
                <option value="center_pivot">Center Pivot</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addField}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Save Field
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Fields', value: fields.length, icon: MapPin },
          { label: 'Active Crops', value: fields.filter(f => f.status !== 'planned').length, icon: Sprout },
          { label: 'Total Area', value: `${(fields.reduce((s, f) => s + f.area_sqm, 0) / 10000).toFixed(1)} ha`, icon: MapPin },
          { label: 'Irrigated', value: fields.filter(f => f.irrigation_type !== 'rainfed').length, icon: Droplets },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-500 font-medium">{label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fields.map(field => (
          <div key={field.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-300 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{field.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CROP_STATUS_COLORS[field.status] || 'bg-gray-100 text-gray-600'}`}>
                    {field.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Area</span>
                <span className="font-medium text-gray-900">{(field.area_sqm / 10000).toFixed(2)} ha</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Soil</span>
                <span className="font-medium text-gray-900">{field.soil_type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Irrigation</span>
                <span className="font-medium text-gray-900 capitalize">{field.irrigation_type.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Crop</span>
                <span className="font-medium text-green-700">{field.crop}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                View on Map
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-green-200">
          <Tractor className="w-12 h-12 text-green-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No fields yet</h3>
          <p className="text-gray-500 mb-6">Add your first field to start tracking your farm</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700"
          >
            <Plus className="w-4 h-4" /> Add First Field
          </button>
        </div>
      )}
    </div>
  )
}