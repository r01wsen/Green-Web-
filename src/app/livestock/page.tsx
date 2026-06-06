'use client'
import { useState } from 'react'
import { Leaf, Plus, Syringe, Scale, HeartPulse, Users } from 'lucide-react'

const DEMO_LIVESTOCK = [
  { id: '1', tag: 'BW-001', species: 'Bos taurus', breed: 'Brahman', gender: 'female', weight_kg: 485, status: 'active', next_event: '2026-06-15', event_type: 'Vaccination' },
  { id: '2', tag: 'BW-002', species: 'Bos taurus', breed: 'Brahman', gender: 'male', weight_kg: 520, status: 'active', next_event: '2026-06-20', event_type: 'Health Check' },
  { id: '3', tag: 'CH-001', species: 'Gallus gallus', breed: 'Rhode Island Red', gender: 'female', weight_kg: 2.1, status: 'active', next_event: '2026-06-10', event_type: 'Deworming' },
  { id: '4', tag: 'SG-001', species: 'Capra hircus', breed: 'Boer', gender: 'female', weight_kg: 62, status: 'active', next_event: '2026-06-18', event_type: 'Breeding' },
]

export default function LivestockPage() {
  const [animals, setAnimals] = useState(DEMO_LIVESTOCK)
  const [showForm, setShowForm] = useState(false)
  const [newAnimal, setNewAnimal] = useState({ tag: '', species: '', breed: '', gender: '', weight_kg: '' })

  const addAnimal = () => {
    if (!newAnimal.tag || !newAnimal.species) return
    setAnimals([...animals, { id: Date.now().toString(), ...newAnimal, weight_kg: parseFloat(newAnimal.weight_kg) || 0, status: 'active', next_event: '', event_type: '' }])
    setNewAnimal({ tag: '', species: '', breed: '', gender: '', weight_kg: '' })
    setShowForm(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-700" />
            </div>
            Livestock
          </h1>
          <p className="text-gray-500 mt-1">Track animals, health records, and vaccination schedules</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> Add Animal
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Register New Animal</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Tag Number', key: 'tag', placeholder: 'e.g. BW-003' },
              { label: 'Species', key: 'species', placeholder: 'e.g. Bos taurus' },
              { label: 'Breed', key: 'breed', placeholder: 'e.g. Brahman' },
              { label: 'Gender', key: 'gender', placeholder: 'male/female' },
              { label: 'Weight (kg)', key: 'weight_kg', type: 'number', placeholder: 'e.g. 450' },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type={type || 'text'} value={newAnimal[key as keyof typeof newAnimal]} onChange={e => setNewAnimal({ ...newAnimal, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addAnimal} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Register</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Animals', value: animals.length, icon: Users },
          { label: 'Active', value: animals.filter(a => a.status === 'active').length, icon: HeartPulse },
          { label: 'Upcoming Events', value: animals.filter(a => a.next_event).length, icon: Syringe },
          { label: 'Avg Weight', value: `${Math.round(animals.reduce((s, a) => s + a.weight_kg, 0) / animals.length)} kg`, icon: Scale },
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

      {/* Animal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {animals.map(animal => (
          <div key={animal.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-300 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{animal.tag}</h3>
                  <p className="text-sm text-gray-500">{animal.breed} · {animal.gender}</p>
                </div>
              </div>
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full capitalize">{animal.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">Species</p>
                <p className="text-sm font-medium text-gray-900 italic truncate">{animal.species}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-sm font-medium text-gray-900">{animal.weight_kg} kg</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">Next Event</p>
                <p className="text-sm font-medium text-gray-900">{animal.next_event ? new Date(animal.next_event).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</p>
              </div>
            </div>
            {animal.next_event && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-800">{animal.event_type}</span>
                </div>
                <span className="text-xs text-orange-600 font-medium">{animal.next_event}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}