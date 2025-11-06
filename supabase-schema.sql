-- Tabla para almacenar las API Keys
-- Ejecuta este script en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  key TEXT NOT NULL,
  description TEXT,
  usage INTEGER DEFAULT 0,
  monthly_limit INTEGER,
  is_visible BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para mejorar las consultas por user_id
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);

-- Índice para mejorar las consultas por created_at
CREATE INDEX IF NOT EXISTS idx_api_keys_created_at ON api_keys(created_at DESC);

-- Política RLS (Row Level Security) - Opcional
-- Si quieres habilitar RLS, descomenta y ajusta según tus necesidades:

-- ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo vean sus propias API keys
-- CREATE POLICY "Users can view their own API keys"
--   ON api_keys FOR SELECT
--   USING (auth.uid()::text = user_id);

-- Política para que los usuarios solo puedan insertar sus propias API keys
-- CREATE POLICY "Users can insert their own API keys"
--   ON api_keys FOR INSERT
--   WITH CHECK (auth.uid()::text = user_id);

-- Política para que los usuarios solo puedan actualizar sus propias API keys
-- CREATE POLICY "Users can update their own API keys"
--   ON api_keys FOR UPDATE
--   USING (auth.uid()::text = user_id);

-- Política para que los usuarios solo puedan eliminar sus propias API keys
-- CREATE POLICY "Users can delete their own API keys"
--   ON api_keys FOR DELETE
--   USING (auth.uid()::text = user_id);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_api_keys_updated_at
  BEFORE UPDATE ON api_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

