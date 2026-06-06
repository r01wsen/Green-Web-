'use client'
import { useState } from 'react'
import { Warehouse, Plus, AlertTriangle, TrendingDown, Calendar, ArrowRight } from 'lucide-react'

const DEMO_INVENTORY = [
  { id: '1', category: 'seed', item_name: 'Maize Seeds (Pioneer P0573)', quantity: 150, unit: 'kg', expiry_date: '2026-12-31', supplier: 'Syngenta', cost_per_unit: 12.50 },
  { id: '2', category: 'fertilizer', item_name: 'NPK 10-10-10 Compound', quantity: 8, unit: 'bags', expiry_date: '2026-08-15', supplier: 'Yara International', cost_per_unit: 85.00 },
  { id: '3', category: 'pesticide', item_name: 'Glyphosate 360 SL', quantity: 25, unit: 'liters', expiry_date: '2027-03-20', supplier: 'Bayer CropScience', cost_per_unit: 18.75 },
  { id: '4', category: 'seed', item_name: 'Tomato Seeds (Roma VF)', quantity: 45, unit: 'packets', expiry_date: '2026-09-30', supplier: 'East-West Seed', cost_per_unit: 4.20 },
  { id: '5', category: 'equipment', item_name: 'Drip Irrigation Filter', quantity: 3, unit: 'units', expiry_date: null, supplier: 'Rivulis', cost_per_unit: 45.00 },
  { id: '6', category: 'fertilizer', item_name: 'Urea 46-0-0', quantity: 5, unit: 'bags', expiry_date: '2026-11-01', supplier: 'CF Industries', cost_per_unit: 72.00 },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  seed: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Seeds' },
  fertilizer: { bg: 'bg-green-100', text: 'text-green-700', label: 'Fertilizer' },
  pesticide: { bg: 'bg-red-100', text: 'text-red-700', label: 'Pesticide' },
  equipment: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Equipment' },
  harvested: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Harvested' },
  other: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Other' },
}

export default function InventoryPage() {
  const [items, setItems] = useState(DEMO_INVENTORY)
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({ category: 'seed', item_name: '', quantity: '', unit: 'kg', expiry_date: '', supplier: '', cost_per_unit: '' })

  const addItem = () => {
    if (!newItem.item_name) return
    setItems([...items, { id: Date.now().toString(), ...newItem, quantity: parseFloat(newItem.quantity) || 0, cost_per_unit: parseFloat(newItem.cost_per_unit) || 0 }])
    setNewItem({ category: 'seed', item_name: '', quantity: '', unit: 'kg', expiry_date: '', supplier: '', cost_per_unit: '' })
    setShowForm(false)
  }

  const lowStockItems = items.filter(i => i.quantity < 10)
  const expiringItems = items.filter(i => i.expiry_date && new Date(i.expiry_date) < new Date(Date.now() + 30 * 86400000))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-green-700" />
            </div>
            Inventory
          </h1>
          <p className="text-gray-500 mt-1">Track inputs, monitor stock levels, and get expiry alerts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Alerts */}
      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {lowStockItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-orange-800">Low Stock Alert</h3>
              </div>
              <p className="text-sm text-orange-700 mb-2">{lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} running low:</p>
              <ul className="space-y-1">
                {lowStockItems.map(i => (
                  <li key={i.id} className="text-sm text-orange-600 flex items-center justify-between">
                    <span>{i.item_name}</span>
                    <span className="font-mono font-bold">{i.quantity} {i.unit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {expiringItems.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-yellow-800">Expiring Soon</h3>
              </div>
              <p className="text-sm text-yellow-700 mb-2">{expiringItems.length} item{expiringItems.length > 1 ? 's' : ''} expire in 30 days:</p>
              <ul className="space-y-1">
                {expiringItems.map(i => (
                  <li key={i.id} className="text-sm text-yellow-600 flex items-center justify-between">
                    <span>{i.item_name}</span>
                    <span className="font-medium">{i.expiry_date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Add Inventory Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input type="text" value={newItem.item_name} onChange={e => setNewItem({ ...newItem, item_name: e.target.value })}
                placeholder="e.g. Maize Seeds (Pioneer)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                <option value="seed">Seed</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="pesticide">Pesticide</option>
                <option value="equipment">Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <div className="flex gap-2">
                <input type="number" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                <input type="text" value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                  placeholder="kg"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input type="date" value={newItem.expiry_date} onChange={e => setNewItem({ ...newItem, expiry_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <input type="text" value={newItem.supplier} onChange={e => setNewItem({ ...newItem, supplier: e.target.value })}
                placeholder="Supplier name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost per Unit ($)</label>
              <input type="number" step="0.01" value={newItem.cost_per_unit} onChange={e => setNewItem({ ...newItem, cost_per_unit: e.target.value })}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Add Item</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-green-50">
                {['Item', 'Category', 'Quantity', 'Unit Cost', 'Expiry', 'Supplier', 'Total Value', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => {
                const cat = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.other
                const isLow = item.quantity < 10
                const isExpiring = item.expiry_date && new Date(item.expiry_date) < new Date(Date.now() + 30 * 86400000)
                return (
                  <tr key={item.id} className={`hover:bg-green-50/50 transition-colors ${isLow ? 'bg-orange-50/30' : ''}`}>
                    <td className="px-4 py-3.5 font-medium text-gray-900">{item.item_name}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}>{cat.label}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`font-mono font-bold ${isLow ? 'text-orange-600' : 'text-gray-900'}`}>
                        {item.quantity} {item.unit}
                      </span>
                      {isLow && <AlertTriangle className="inline-block w-3.5 h-3.5 text-orange-500 ml-1" />}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 font-mono text-sm">${item.cost_per_unit.toFixed(2)}</td>
                    <td className="px-4 py-3.5">
                      {item.expiry_date ? (
                        <span className={`text-sm font-medium ${isExpiring ? 'text-orange-600' : 'text-gray-600'}`}>
                          {item.expiry_date}
                          {isExpiring && <AlertTriangle className="inline-block w-3 h-3 text-orange-500 ml-1" />}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm">{item.supplier || '—'}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-green-700">
                      ${(item.quantity * item.cost_per_unit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1">
                        Use <ArrowRight className="w-3 h-3" />
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