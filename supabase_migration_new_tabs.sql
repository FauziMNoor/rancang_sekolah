-- ==========================================
-- MIGRASI: Tambahkan kolom baru ke tabel blueprints
-- Jalankan SQL ini di Supabase SQL Editor
-- ==========================================

ALTER TABLE blueprints ADD COLUMN IF NOT EXISTS data_roadmap JSONB;
ALTER TABLE blueprints ADD COLUMN IF NOT EXISTS data_profil_alumni JSONB;
ALTER TABLE blueprints ADD COLUMN IF NOT EXISTS data_diferensiasi JSONB;
ALTER TABLE blueprints ADD COLUMN IF NOT EXISTS data_kurikulum JSONB;
