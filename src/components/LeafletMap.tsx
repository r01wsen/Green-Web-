'use client'
import { useEffect } from 'react'
import { MapPin } from 'lucide-react'

interface Field {
  id: string
  name: string
  lat: number
  lng: number
  ndvi: number
  crop: string
  area: number
}

interface LeafletMapProps {
  fields: Field[]
  selectedField: Field | null
  onFieldClick: (field: Field) => void
}

export default function LeafletMap({ fields, selectedField, onFieldClick }: LeafletMapProps) {
  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const L = require('leaflet')
    require('leaflet/dist/leaflet.css')

    // Fix default marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })

    // Center on fields
    const centerLat = fields.reduce((s, f) => s + f.lat, 0) / fields.length
    const centerLng = fields.reduce((s, f) => s + f.lng, 0) / fields.length

    const map = L.map('leaflet-map').setView([centerLat, centerLng], 14)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add field markers
    fields.forEach(field => {
      const ndviColor = field.ndvi >= 0.6 ? '#16a34a' : field.ndvi >= 0.3 ? '#eab308' : '#ef4444'
      const ndviLabel = field.ndvi >= 0.6 ? 'Healthy' : field.ndvi >= 0.3 ? 'Stressed' : 'Critical'

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: white;
            border: 3px solid ${ndviColor};
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            cursor: pointer;
          ">
            <div style="
              background: ${ndviColor};
              width: 16px;
              height: 16px;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })

      const marker = L.marker([field.lat, field.lng], { icon }).addTo(map)

      const popupContent = `
        <div style="min-width: 180px; font-family: Inter, sans-serif;">
          <h3 style="font-weight: 700; font-size: 14px; margin: 0 0 4px; color: #111;">${field.name}</h3>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px;">${field.crop} · ${field.area} ha</p>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="background: ${ndviColor}; width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
            <span style="font-size: 12px; font-weight: 600; color: ${ndviColor};">NDVI: ${field.ndvi.toFixed(2)}</span>
            <span style="font-size: 11px; color: #888;">(${ndviLabel})</span>
          </div>
          <button
            onclick="window.parent.postMessage({type:'select-field', id:'${field.id}'}, '*')"
            style="
              margin-top: 8px;
              background: #16a34a;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            "
          >View Details</button>
        </div>
      `

      marker.bindPopup(popupContent)

      marker.on('click', () => {
        onFieldClick(field)
      })
    })

    // Listen for messages from popup buttons
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'select-field') {
        const field = fields.find(f => f.id === e.data.id)
        if (field) onFieldClick(field)
      }
    }
    window.addEventListener('message', handleMessage)

    return () => {
      map.remove()
      window.removeEventListener('message', handleMessage)
    }
  }, [fields, onFieldClick])

  return (
    <div className="relative w-full h-full">
      <div id="leaflet-map" className="w-full h-full rounded-none" style={{ minHeight: '500px' }} />
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
        }
        .leaflet-popup-content {
          margin: 12px;
        }
        .leaflet-popup-tip {
          box-shadow: none;
        }
      `}</style>
    </div>
  )
}