-- ============================================================
-- GreenWeb Institute - Row Level Security Policies
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestock ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestock_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ndvi_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_types ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- FARMERS: user sees only their own row
-- ============================================================
DROP POLICY IF EXISTS farmers_select ON farmers;
DROP POLICY IF EXISTS farmers_update ON farmers;
DROP POLICY IF EXISTS farmers_insert ON farmers;

CREATE POLICY farmers_select ON farmers FOR SELECT USING (auth.uid() = id);
CREATE POLICY farmers_update ON farmers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY farmers_insert ON farmers FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- FIELDS: farmer sees own fields only
-- ============================================================
DROP POLICY IF EXISTS fields_all ON fields;

CREATE POLICY fields_all ON fields FOR ALL USING (farmer_id = auth.uid());

-- ============================================================
-- CROP CYCLES: via fields (ownership inherited)
-- ============================================================
DROP POLICY IF EXISTS crop_cycles_all ON crop_cycles;

CREATE POLICY crop_cycles_all ON crop_cycles FOR ALL
    USING (field_id IN (SELECT id FROM fields WHERE farmer_id = auth.uid()));

-- ============================================================
-- LIVESTOCK: own livestock
-- ============================================================
DROP POLICY IF EXISTS livestock_all ON livestock;

CREATE POLICY livestock_all ON livestock FOR ALL USING (farmer_id = auth.uid());

-- ============================================================
-- LIVESTOCK LOGS: via livestock
-- ============================================================
DROP POLICY IF EXISTS livestock_logs_all ON livestock_logs;

CREATE POLICY livestock_logs_all ON livestock_logs FOR ALL
    USING (livestock_id IN (SELECT id FROM livestock WHERE farmer_id = auth.uid()));

-- ============================================================
-- INVENTORY: own inventory
-- ============================================================
DROP POLICY IF EXISTS inventory_all ON inventory;

CREATE POLICY inventory_all ON inventory FOR ALL USING (farmer_id = auth.uid());

-- ============================================================
-- INVENTORY TRANSACTIONS: via inventory
-- ============================================================
DROP POLICY IF EXISTS inventory_transactions_all ON inventory_transactions;

CREATE POLICY inventory_transactions_all ON inventory_transactions FOR ALL
    USING (inventory_id IN (SELECT id FROM inventory WHERE farmer_id = auth.uid()));

-- ============================================================
-- MARKETPLACE LISTINGS: own listings + public active listings
-- ============================================================
DROP POLICY IF EXISTS listings_all ON marketplace_listings;

CREATE POLICY listings_all ON marketplace_listings FOR ALL
    USING (seller_id = auth.uid() OR (status = 'active' AND seller_id IS NOT NULL));

-- ============================================================
-- ORDERS: buyer or seller
-- ============================================================
DROP POLICY IF EXISTS orders_all ON orders;

CREATE POLICY orders_all ON orders FOR ALL
    USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- ============================================================
-- ORDER ITEMS: via orders
-- ============================================================
DROP POLICY IF EXISTS order_items_all ON order_items;

CREATE POLICY order_items_all ON order_items FOR ALL
    USING (order_id IN (SELECT id FROM orders WHERE buyer_id = auth.uid() OR seller_id = auth.uid()));

-- ============================================================
-- AI ANALYSES: own analyses
-- ============================================================
DROP POLICY IF EXISTS ai_analyses_all ON ai_analyses;

CREATE POLICY ai_analyses_all ON ai_analyses FOR ALL USING (farmer_id = auth.uid());

-- ============================================================
-- NDVI READINGS: via fields
-- ============================================================
DROP POLICY IF EXISTS ndvi_readings_all ON ndvi_readings;

CREATE POLICY ndvi_readings_all ON ndvi_readings FOR ALL
    USING (field_id IN (SELECT id FROM fields WHERE farmer_id = auth.uid()));

-- ============================================================
-- AUDIT LOGS: admins only
-- ============================================================
DROP POLICY IF EXISTS audit_logs_all ON audit_logs;

CREATE POLICY audit_logs_all ON audit_logs FOR SELECT
    USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM farmers WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- CROP TYPES: read-only public reference table
-- ============================================================
DROP POLICY IF EXISTS crop_types_all ON crop_types;

CREATE POLICY crop_types_all ON crop_types FOR SELECT USING (true);

-- ============================================================
-- SERVICE ROLE BYPASS (for admin operations)
-- Run these with service_role key only:
-- Supabase Dashboard → Database → Functions
-- ============================================================
-- Note: Never enable INSERT/UPDATE/DELETE on crop_types via anon key