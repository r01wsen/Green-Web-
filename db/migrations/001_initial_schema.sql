-- ============================================================
-- GreenWeb Institute - Initial Schema
-- Supabase Project: gvkqmzyrthppjwugwgtv
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable PostGIS and UUID extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- FARMERS (Users / Accounts)
-- ============================================================
CREATE TABLE IF NOT EXISTS farmers (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    phone           VARCHAR(50),
    language        VARCHAR(10) DEFAULT 'en',
    role            VARCHAR(20) DEFAULT 'farmer',
    farm_name       VARCHAR(255),
    location_point  GEOMETRY(Point, 4326),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    is_verified     BOOLEAN DEFAULT FALSE,
    auth_provider   VARCHAR(20) DEFAULT 'email'
);
CREATE INDEX IF NOT EXISTS idx_farmers_email ON farmers (email);
CREATE INDEX IF NOT EXISTS idx_farmers_location ON farmers USING GIST (location_point);

-- ============================================================
-- FIELDS (Spatial Units)
-- ============================================================
CREATE TABLE IF NOT EXISTS fields (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id       UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    boundary        GEOMETRY(Polygon, 4326) NOT NULL,
    area_sqm        DOUBLE PRECISION,
    elevation_avg   DOUBLE PRECISION,
    soil_type       VARCHAR(100),
    irrigation_type VARCHAR(50),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    metadata        JSONB DEFAULT '{}'
);

-- Auto-compute field area from boundary polygon
CREATE OR REPLACE FUNCTION compute_field_area()
RETURNS TRIGGER AS $$
BEGIN
    NEW.area_sqm := ST_Area(NEW.boundary::geography);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_field_area ON fields;
CREATE TRIGGER tr_field_area
    BEFORE INSERT OR UPDATE ON fields
    FOR EACH ROW EXECUTE FUNCTION compute_field_area();

CREATE INDEX IF NOT EXISTS idx_fields_farmer ON fields (farmer_id);
CREATE INDEX IF NOT EXISTS idx_fields_boundary ON fields USING GIST (boundary);

-- ============================================================
-- CROP CYCLES
-- ============================================================
CREATE TABLE IF NOT EXISTS crop_cycles (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id          UUID NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
    crop_type         VARCHAR(100) NOT NULL,
    variety           VARCHAR(100),
    planting_date     DATE NOT NULL,
    expected_harvest  DATE,
    actual_harvest    DATE,
    status            VARCHAR(30) DEFAULT 'planted',
    yield_kg          DOUBLE PRECISION,
    seed_source       VARCHAR(255),
    notes             TEXT,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_status CHECK (status IN ('planned', 'planted', 'growing', 'harvesting', 'harvested', 'failed'))
);
CREATE INDEX IF NOT EXISTS idx_crop_cycles_field ON crop_cycles (field_id);
CREATE INDEX IF NOT EXISTS idx_crop_cycles_status ON crop_cycles (status);
CREATE INDEX IF NOT EXISTS idx_crop_cycles_dates ON crop_cycles (planting_date, expected_harvest);

-- ============================================================
-- LIVESTOCK
-- ============================================================
CREATE TABLE IF NOT EXISTS livestock (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id        UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    field_id         UUID REFERENCES fields(id) ON DELETE SET NULL,
    tag_number       VARCHAR(50) UNIQUE NOT NULL,
    species          VARCHAR(100) NOT NULL,
    breed            VARCHAR(100),
    birth_date       DATE,
    acquisition_date DATE,
    acquisition_source VARCHAR(255),
    current_status   VARCHAR(30) DEFAULT 'active',
    gender           VARCHAR(10),
    weight_kg        DOUBLE PRECISION,
    notes            TEXT,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_livestock_status CHECK (current_status IN ('active', 'sold', 'deceased', 'slaughtered'))
);
CREATE INDEX IF NOT EXISTS idx_livestock_farmer ON livestock (farmer_id);
CREATE INDEX IF NOT EXISTS idx_livestock_tag ON livestock (tag_number);

CREATE TABLE IF NOT EXISTS livestock_logs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    livestock_id    UUID NOT NULL REFERENCES livestock(id) ON DELETE CASCADE,
    log_type        VARCHAR(30) NOT NULL,
    event_date      DATE NOT NULL,
    description     TEXT,
    weight_kg       DOUBLE PRECISION,
    medication      VARCHAR(255),
    dosage          VARCHAR(100),
    veterinarian    VARCHAR(255),
    cost_local      DOUBLE PRECISION,
    next_event_date DATE,
    attachments     JSONB DEFAULT '[]',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_log_type CHECK (log_type IN ('health_check', 'vaccination', 'treatment', 'weight', 'breeding', 'general'))
);
CREATE INDEX IF NOT EXISTS idx_livestock_logs_animal ON livestock_logs (livestock_id);
CREATE INDEX IF NOT EXISTS idx_livestock_logs_type ON livestock_logs (log_type);

-- ============================================================
-- INVENTORY
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id       UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    category        VARCHAR(50) NOT NULL,
    item_name       VARCHAR(255) NOT NULL,
    quantity        DOUBLE PRECISION NOT NULL,
    unit            VARCHAR(30) NOT NULL,
    batch_number    VARCHAR(100),
    purchase_date   DATE,
    expiry_date     DATE,
    cost_per_unit   NUMERIC(12,4),
    supplier        VARCHAR(255),
    storage_location VARCHAR(255),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_category CHECK (category IN ('seed', 'fertilizer', 'pesticide', 'equipment', 'harvested', 'other'))
);
CREATE INDEX IF NOT EXISTS idx_inventory_farmer ON inventory (farmer_id);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory (category);
CREATE INDEX IF NOT EXISTS idx_inventory_expiry ON inventory (expiry_date) WHERE expiry_date IS NOT NULL;

CREATE TABLE IF NOT EXISTS inventory_transactions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_id    UUID NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL,
    quantity_delta  DOUBLE PRECISION NOT NULL,
    reference       VARCHAR(255),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_txn_type CHECK (transaction_type IN ('addition', 'usage', 'sale', 'loss', 'adjustment'))
);
CREATE INDEX IF NOT EXISTS idx_inventory_txn_item ON inventory_transactions (inventory_id);

-- ============================================================
-- MARKETPLACE
-- ============================================================
CREATE TABLE IF NOT EXISTS marketplace_listings (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id           UUID NOT NULL REFERENCES farmers(id),
    category            VARCHAR(50) NOT NULL,
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    unit                VARCHAR(30) NOT NULL,
    price_per_unit      NUMERIC(12,2) NOT NULL,
    currency            VARCHAR(10) DEFAULT 'USD',
    quantity_available  DOUBLE PRECISION NOT NULL,
    quantity_unit       VARCHAR(30) NOT NULL,
    harvest_date        DATE,
    is_organic          BOOLEAN DEFAULT FALSE,
    certifications      JSONB DEFAULT '[]',
    delivery_options    JSONB DEFAULT '[]',
    status              VARCHAR(20) DEFAULT 'active',
    images              JSONB DEFAULT '[]',
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_listing_status CHECK (status IN ('active', 'sold_out', 'withdrawn'))
);
CREATE INDEX IF NOT EXISTS idx_listings_seller ON marketplace_listings (seller_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON marketplace_listings (status);
CREATE INDEX IF NOT EXISTS idx_listings_category ON marketplace_listings (category);

CREATE TABLE IF NOT EXISTS orders (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id        UUID NOT NULL REFERENCES farmers(id),
    seller_id       UUID NOT NULL REFERENCES farmers(id),
    status          VARCHAR(30) DEFAULT 'pending',
    total_amount    NUMERIC(12,2) NOT NULL,
    currency        VARCHAR(10) DEFAULT 'USD',
    delivery_address TEXT,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_order_status CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'))
);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders (buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders (seller_id);

CREATE TABLE IF NOT EXISTS order_items (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    listing_id  UUID NOT NULL REFERENCES marketplace_listings(id),
    quantity    DOUBLE PRECISION NOT NULL,
    unit_price  NUMERIC(12,2) NOT NULL,
    subtotal    NUMERIC(12,2) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);

-- ============================================================
-- AI ANALYSES (Disease Detection)
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_analyses (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id           UUID NOT NULL REFERENCES farmers(id),
    field_id            UUID REFERENCES fields(id) ON DELETE SET NULL,
    image_url           VARCHAR(1024) NOT NULL,
    image_filename      VARCHAR(255),
    captured_lat        DOUBLE PRECISION,
    captured_lon        DOUBLE PRECISION,
    capture_location    GEOMETRY(Point, 4326),
    model_version       VARCHAR(50) NOT NULL,
    model_provider      VARCHAR(30) NOT NULL,
    result_json         JSONB NOT NULL,
    primary_diagnosis   VARCHAR(255),
    confidence_score    DOUBLE PRECISION,
    severity            VARCHAR(20),
    recommended_action  TEXT,
    is_confirmed        BOOLEAN DEFAULT FALSE,
    confirmed_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_severity CHECK (severity IS NULL OR severity IN ('low', 'medium', 'high', 'critical'))
);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_farmer ON ai_analyses (farmer_id);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_field ON ai_analyses (field_id);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_diagnosis ON ai_analyses (primary_diagnosis);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_location ON ai_analyses USING GIST (capture_location);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_created ON ai_analyses (created_at DESC);

-- Full-text search on AI recommendations
ALTER TABLE ai_analyses ADD COLUMN search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('english', coalesce(primary_diagnosis, '') || ' ' || coalesce(recommended_action, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_ai_analyses_fts ON ai_analyses USING GIN (search_vector);

-- ============================================================
-- SATELLITE / NDVI READINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS satellite_tiles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id        UUID NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
    source          VARCHAR(30) NOT NULL,
    acquisition_date DATE NOT NULL,
    cloud_cover_pct DOUBLE PRECISION,
    tile_url        VARCHAR(1024),
    raw_tile_url    VARCHAR(1024),
    bounds          GEOMETRY(Polygon, 4326),
    processed_at    TIMESTAMPTZ,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(field_id, source, acquisition_date)
);

CREATE TABLE IF NOT EXISTS ndvi_readings (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id            UUID NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
    satellite_tile_id   UUID REFERENCES satellite_tiles(id),
    acquisition_date    DATE NOT NULL,
    mean_ndvi           DOUBLE PRECISION,
    min_ndvi            DOUBLE PRECISION,
    max_ndvi            DOUBLE PRECISION,
    stddev_ndvi         DOUBLE PRECISION,
    percentile_25       DOUBLE PRECISION,
    percentile_75      DOUBLE PRECISION,
    soil_moisture_index DOUBLE PRECISION,
    source              VARCHAR(30),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(field_id, acquisition_date)
);
CREATE INDEX IF NOT EXISTS idx_ndvi_field_date ON ndvi_readings (field_id, acquisition_date DESC);

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES farmers(id),
    action      VARCHAR(100) NOT NULL,
    table_name  VARCHAR(100),
    record_id   UUID,
    diff        JSONB,
    ip_address  VARCHAR(50),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_table ON audit_logs (table_name);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs (created_at DESC);

-- ============================================================
-- SEED DATA: Sample crop types
-- ============================================================
CREATE TABLE IF NOT EXISTS crop_types (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(200),
    category    VARCHAR(50),
    growing_season_days INT,
    ndvi_healthy_min DOUBLE PRECISION,
    ndvi_stressed_max DOUBLE PRECISION,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO crop_types (name, scientific_name, category, growing_season_days, ndvi_healthy_min, ndvi_stressed_max) VALUES
('Maize', 'Zea mays', 'cereal', 120, 0.6, 0.3),
('Wheat', 'Triticum aestivum', 'cereal', 100, 0.5, 0.2),
('Rice', 'Oryza sativa', 'cereal', 130, 0.65, 0.35),
('Soybean', 'Glycine max', 'legume', 100, 0.65, 0.35),
('Tomato', 'Solanum lycopersicum', 'vegetable', 90, 0.55, 0.25),
('Potato', 'Solanum tuberosum', 'vegetable', 100, 0.5, 0.25),
('Cassava', 'Manihot esculenta', 'root', 300, 0.55, 0.25),
('Cotton', 'Gossypium hirsutum', 'fiber', 180, 0.55, 0.3),
('Coffee', 'Coffea arabica', 'tree', 730, 0.7, 0.4),
('Sugarcane', 'Saccharum officinarum', 'grass', 365, 0.65, 0.35)
ON CONFLICT DO NOTHING;