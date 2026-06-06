# GreenWeb Institute — Precision Agriculture Platform

A full-stack agricultural SaaS platform built with Next.js 14, Supabase (PostgreSQL + PostGIS), and Leaflet.js for precision farming management.

## Features

- **Farm Management** — Create and manage field boundaries with PostGIS spatial queries
- **Crop Cycles** — Track planting, growth, and harvest with status management
- **Livestock Tracking** — Monitor animal health, vaccinations, and breeding records
- **Inventory Management** — Track seeds, fertilizers, pesticides with low-stock and expiry alerts
- **AI Disease Detection** — Upload crop photos for AI-powered disease diagnosis
- **Marketplace** — Buy and sell produce, livestock, and agricultural inputs
- **GIS Dashboard** — Interactive Leaflet maps with NDVI health overlays
- **Satellite Integration** — NASA MODIS / Sentinel-2 NDVI data pipeline

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS, Recharts |
| State | Zustand + TanStack Query |
| Maps | Leaflet.js + OpenStreetMap (free, no API key) |
| Backend | Next.js API Routes |
| Database | Supabase PostgreSQL 16 + PostGIS 3.4 |
| Auth | Supabase Auth |
| Deployment | Vercel (recommended) |

## Quick Start

### 1. Get Supabase credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Run database migrations

In your Supabase SQL Editor, run:
1. `db/migrations/001_initial_schema.sql`
2. `db/migrations/002_rls_policies.sql`

### 3. Install and run

```bash
cd greenweb-platform
npm install
# Add your credentials to .env.local
npm run dev
```

### 4. Deploy to Vercel

```bash
npm i -g vercel
vercel
# Add environment variables in Vercel dashboard
```

## Database Schema

- `farmers` — User accounts with PostGIS Point
- `fields` — Field boundaries with auto-computed area via ST_Area trigger
- `crop_cycles` — Temporal planting/harvest tracking
- `livestock` + `livestock_logs` — Health and vaccination records
- `inventory` + `inventory_transactions` — Stock management
- `marketplace_listings` + `orders` — Marketplace module
- `ai_analyses` — AI disease detection results
- `ndvi_readings` — Satellite NDVI time-series
- `audit_logs` — Full audit trail

All tables use **Row-Level Security (RLS)** — farmers only see their own data.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token  # Optional for MVP (Leaflet is free)
```

## Architecture

```
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── farm/      # Farm management
│   │   ├── crops/    # Crop cycle tracking
│   │   ├── livestock/ # Livestock management
│   │   ├── inventory/ # Stock management
│   │   ├── ai-disease/ # AI disease detection
│   │   ├── marketplace/ # Buy/sell produce
│   │   └── gis-map/  # GIS dashboard
│   ├── components/    # Shared UI components
│   └── lib/          # Supabase client utilities
├── db/
│   └── migrations/    # SQL schema + RLS policies
└── README.md
```

## License

MIT — GreenWeb Institute 2026