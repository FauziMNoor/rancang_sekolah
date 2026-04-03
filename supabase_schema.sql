-- ==========================================
-- 1. TABEL PROFILES (Ekstensi dari auth.users)
-- ==========================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  institution_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Hapus policy lama jika ada untuk menghindari duplikat
DROP POLICY IF EXISTS "Pengguna dapat mengelola profil mereka sendiri" ON profiles;
CREATE POLICY "Pengguna dapat mengelola profil mereka sendiri" 
  ON profiles FOR ALL USING (auth.uid() = id);

-- Trigger untuk otomatis buat profil saat user mendaftar di Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==========================================
-- 2. TABEL BLUEPRINTS
-- ==========================================
CREATE TABLE IF NOT EXISTS blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Sekolah Impian Baru',
  status TEXT NOT NULL DEFAULT 'draft',
  data_mindmap JSONB,
  data_timeline JSONB,
  data_coreskills JSONB,
  data_visimisi JSONB,
  data_roadmap JSONB,
  data_profil_alumni JSONB,
  data_diferensiasi JSONB,
  data_kurikulum JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Pengguna mengelola blueprint miliknya sendiri" ON blueprints;
CREATE POLICY "Pengguna mengelola blueprint miliknya sendiri" 
  ON blueprints FOR ALL USING (auth.uid() = user_id);

-- Trigger auto-update timezone untuk blueprint
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_blueprints_updated_at ON blueprints;
CREATE TRIGGER update_blueprints_updated_at
BEFORE UPDATE ON blueprints
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();


-- ==========================================
-- 3. TABEL CHAT_SESSIONS (Riwayat Obrolan)
-- ==========================================
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blueprint_id UUID NOT NULL REFERENCES blueprints(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Pengguna mengelola chat dari blueprint miliknya" ON chat_sessions;
CREATE POLICY "Pengguna mengelola chat dari blueprint miliknya"
  ON chat_sessions FOR ALL USING (
    EXISTS (SELECT 1 FROM blueprints WHERE id = chat_sessions.blueprint_id AND user_id = auth.uid())
  );
