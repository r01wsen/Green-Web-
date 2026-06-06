'use client'
import { useState } from 'react'
import { ShoppingBag, Plus, Filter, Star, MapPin, ArrowRight, Leaf, ShoppingCart } from 'lucide-react'

const DEMO_LISTINGS = [
  { id: '1', title: 'Fresh Maize (Pioneer Hybrid)', category: 'crop', price: 0.45, unit: 'kg', quantity: 5000, seller: 'Walid Nosir', is_organic: true, status: 'active', harvest_date: '2026-08-15', images: ['https://images.unsplash.com/photo-1601593346740-9251b5a7b68d?w=400'] },
  { id: '2', title: 'Organic Tomatoes (Roma VF)', category: 'crop', price: 1.20, unit: 'kg', quantity: 800, seller: 'Walid Nosir', is_organic: true, status: 'active', harvest_date: '2026-08-01', images: ['https://images.unsplash.com/photo-1546470427-227c7b3f6b31?w=400'] },
  { id: '3', title: 'Wheat Grain (Durum Grade A)', category: 'crop', price: 0.35, unit: 'kg', quantity: 12000, seller: 'GreenFarm Co-op', is_organic: false, status: 'active', harvest_date: '2026-03-10', images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'] },
  { id: '4', title: 'Brahman Heifers (2 years)', category: 'livestock', price: 1200, unit: 'head', quantity: 4, seller: 'GreenFarm Co-op', is_organic: false, status: 'active', harvest_date: null, images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'] },
  { id: '5', title: 'Soybean Seeds (Williams 82)', category: 'seed', price: 2.80, unit: 'kg', quantity: 300, seller: 'Walid Nosir', is_organic: true, status: 'active', harvest_date: '2026-09-20', images: ['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400'] },
  { id: '6', title: 'NPK Fertilizer 10-10-10', category: 'processed', price: 85, unit: 'bag', quantity: 50, seller: 'AgriSupply Ltd', is_organic: false, status: 'active', harvest_date: null, images: ['https://images.unsplash.com/photo-1585314062340-f1a2a3d4b0dc?w=400'] },
]

const CATEGORIES = ['all', 'crop', 'livestock', 'processed', 'seed', 'equipment']

export default function MarketplacePage() {
  const [listings, setListings] = useState(DEMO_LISTINGS)
  const [filter, setFilter] = useState('all')
  const [showSellForm, setShowSellForm] = useState(false)
  const [newListing, setNewListing] = useState({ title: '', category: 'crop', price: '', quantity: '', unit: 'kg', is_organic: false, description: '' })

  const addListing = () => {
    if (!newListing.title || !newListing.price) return
    setListings([{
      id: Date.now().toString(),
      ...newListing,
      price: parseFloat(newListing.price),
      quantity: parseFloat(newListing.quantity) || 0,
      seller: 'Walid Nosir',
      status: 'active',
      harvest_date: null,
      images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400']
    }, ...listings])
    setNewListing({ title: '', category: 'crop', price: '', quantity: '', unit: 'kg', is_organic: false, description: '' })
    setShowSellForm(false)
  }

  const filtered = filter === 'all' ? listings : listings.filter(l => l.category === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-green-700" />
            </div>
            Marketplace
          </h1>
          <p className="text-gray-500 mt-1">Buy and sell produce, livestock, and agricultural inputs</p>
        </div>
        <button onClick={() => setShowSellForm(!showSellForm)}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> Sell Produce
        </button>
      </div>

      {/* Sell form */}
      {showSellForm && (
        <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Listing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input type="text" value={newListing.title} onChange={e => setNewListing({ ...newListing, title: e.target.value })}
                placeholder="e.g. Fresh Maize (Pioneer Hybrid)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={newListing.category} onChange={e => setNewListing({ ...newListing, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                <option value="crop">Crop</option>
                <option value="livestock">Livestock</option>
                <option value="processed">Processed</option>
                <option value="seed">Seed</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organic?</label>
              <label className="flex items-center gap-2 h-full px-3 py-2">
                <input type="checkbox" checked={newListing.is_organic} onChange={e => setNewListing({ ...newListing, is_organic: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-green-600" />
                <span className="text-sm text-gray-700">Certified Organic</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit ($)</label>
              <input type="number" step="0.01" value={newListing.price} onChange={e => setNewListing({ ...newListing, price: e.target.value })}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
              <div className="flex gap-2">
                <input type="number" value={newListing.quantity} onChange={e => setNewListing({ ...newListing, quantity: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                <input type="text" value={newListing.unit} onChange={e => setNewListing({ ...newListing, unit: e.target.value })}
                  placeholder="kg"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addListing} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Create Listing</button>
            <button onClick={() => setShowSellForm(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
            }`}>
            {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(listing => (
          <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
            <div className="relative">
              <img src={listing.images[0]} alt={listing.title} className="w-full h-48 object-cover" />
              {listing.is_organic && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Organic
                </span>
              )}
              <span className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                {listing.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-500">{listing.seller}</span>
                <span className="text-gray-300">·</span>
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-500">4.8</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-green-700">${listing.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">/{listing.unit}</span>
                </div>
                <span className="text-sm text-gray-500">{listing.quantity.toLocaleString()} {listing.unit} available</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Buy Now
                </button>
                <button className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 flex items-center justify-center gap-1">
                  Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-green-200">
          <ShoppingBag className="w-12 h-12 text-green-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-500 mb-6">Be the first to list in this category</p>
          <button onClick={() => setShowSellForm(true)} className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700">
            <Plus className="w-4 h-4" /> Create Listing
          </button>
        </div>
      )}
    </div>
  )
}