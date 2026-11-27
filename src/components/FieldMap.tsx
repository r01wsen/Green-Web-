// Hero illustration: a farm seen from orbit, each parcel coloured by its NDVI
// (normalized difference vegetation index: ~0.1 bare soil to ~0.9 dense, healthy canopy).
// Drawn in SVG so it is sharp at any size and needs no image files.

type Parcel = { id: string; crop: string; ndvi: number; points: string; label: [number, number]; rows: number }

const parcels: Parcel[] = [
  { id: 'A-04', crop: 'Maize', ndvi: 0.82, points: '18,22 214,14 226,148 26,160', label: [118, 86], rows: -8 },
  { id: 'A-07', crop: 'Soybean', ndvi: 0.74, points: '232,14 452,26 444,128 242,146', label: [342, 80], rows: 6 },
  { id: 'B-12', crop: 'Wheat', ndvi: 0.61, points: '28,176 226,164 236,300 36,318', label: [130, 242], rows: 4 },
  { id: 'C-03', crop: 'Maize', ndvi: 0.38, points: '244,162 380,150 390,296 252,300', label: [316, 226], rows: -4 },
  { id: 'C-05', crop: 'Fallow', ndvi: 0.16, points: '396,146 446,142 452,292 404,296', label: [424, 220], rows: 0 },
]

// NDVI colour ramp: soil brown → pale yellow → greens
const ramp: [number, string][] = [
  [0.1, '#9c6b3f'], [0.3, '#d8b45a'], [0.45, '#c9d36b'], [0.6, '#7fbf5a'], [0.75, '#3f9b4c'], [0.9, '#1d6b35'],
]
function ndviColor(v: number) {
  for (let i = 1; i < ramp.length; i++) if (v <= ramp[i][0]) return ramp[i][1]
  return ramp[ramp.length - 1][1]
}

export function FieldMap() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-forest-950 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-forest-200">
          <span className="font-medium tracking-wide">SENTINEL-2 · NDVI composite</span>
          <span className="tabular">12 Nov 2026 · 10 m/px</span>
        </div>
        <div className="relative">
          <svg viewBox="0 0 470 330" className="block h-auto w-full" role="img" aria-label="Satellite map of five fields coloured by crop health. Field C-03 shows low vegetation index and is flagged.">
            <defs>
              {parcels.map((p) => (
                <pattern key={p.id} id={`rows-${p.id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform={`rotate(${p.rows})`}>
                  <rect width="7" height="7" fill={ndviColor(p.ndvi)} />
                  <rect width="7" height="2" y="5" fill="#000" opacity="0.12" />
                </pattern>
              ))}
              <filter id="soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.4" /></filter>
            </defs>
            <rect width="470" height="330" fill="#2b2a1f" />
            {/* farm tracks */}
            <path d="M0 160 C120 150 300 160 470 140" stroke="#bfae86" strokeWidth="5" fill="none" opacity="0.55" />
            <path d="M236 0 L240 330" stroke="#bfae86" strokeWidth="4" fill="none" opacity="0.45" />
            {parcels.map((p) => (
              <g key={p.id}>
                <polygon points={p.points} fill={`url(#rows-${p.id})`} stroke="#f4f6f1" strokeOpacity="0.55" strokeWidth="1.2" filter="url(#soft)" />
                <g transform={`translate(${p.label[0]} ${p.label[1]})`}>
                  <rect x="-30" y="-13" width="60" height="26" rx="5" fill="#061a10" opacity="0.72" />
                  <text x="0" y="-1" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#f4f6f1">{p.id}</text>
                  <text x="0" y="9" textAnchor="middle" fontSize="8.5" fill="#e2b85a" className="tabular">{p.ndvi.toFixed(2)}</text>
                </g>
              </g>
            ))}
            {/* alert ring on the stressed parcel */}
            <circle cx="316" cy="226" r="44" fill="none" stroke="#e2b85a" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          <div aria-hidden="true" className="gw-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-wheat-200/10 to-transparent" />
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3 text-[11px] text-forest-200">
          <span>NDVI</span>
          <span className="tabular">0.1</span>
          <div className="h-2 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${ramp.map(([, c]) => c).join(', ')})` }} />
          <span className="tabular">0.9</span>
        </div>
      </div>

      {/* Alert card */}
      <div className="relative z-10 -mt-3 ml-auto mr-3 w-full max-w-[17rem] rounded-xl border border-forest-100 bg-white p-4 text-field-ink shadow-xl sm:mr-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-wheat-600">Scouting alert</p>
        <p className="mt-1 text-sm font-semibold">Field C-03 · Maize</p>
        <p className="mt-1 text-xs leading-relaxed text-field-muted">
          NDVI fell <span className="tabular font-semibold text-field-ink">0.71 → 0.38</span> in 10 days. Check for northern leaf blight before it spreads.
        </p>
      </div>
    </div>
  )
}
