# Configuración de Supabase

Esta guía te ayudará a conectar tu aplicación con Supabase para almacenar las API keys en una base de datos.

## Pasos para configurar Supabase

### 1. Crear un proyecto en Supabase

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Inicia sesión o crea una cuenta
3. Haz clic en "New Project"
4. Completa la información del proyecto:
   - **Name**: Nombre de tu proyecto
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la región más cercana a ti
5. Haz clic en "Create new project"

### 2. Crear la tabla en la base de datos

1. En tu proyecto de Supabase, ve a **SQL Editor** (en el menú lateral)
2. Haz clic en **New Query**
3. Copia y pega el contenido del archivo `supabase-schema.sql`
4. Haz clic en **Run** para ejecutar el script
5. Verifica que la tabla `api_keys` se haya creado correctamente

### 3. Obtener las credenciales de API

1. En tu proyecto de Supabase, ve a **Settings** (en el menú lateral)
2. Haz clic en **API**
3. Encuentra las siguientes credenciales:
   - **Project URL**: Esta es tu `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: Esta es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configurar las variables de entorno

1. En la raíz de tu proyecto, crea un archivo llamado `.env.local`
2. Copia el contenido de `.env.local.example` y reemplaza los valores:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

**Ejemplo:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Reiniciar el servidor de desarrollo

Si ya tienes el servidor corriendo, deténlo y vuelve a iniciarlo:

```bash
npm run dev
```

## Estructura de la base de datos

La tabla `api_keys` tiene las siguientes columnas:

- `id` (UUID): Identificador único de la API key
- `user_id` (TEXT): ID del usuario propietario
- `name` (TEXT): Nombre de la API key
- `key` (TEXT): La API key encriptada
- `description` (TEXT, opcional): Descripción de la API key
- `usage` (INTEGER): Número de requests usados
- `monthly_limit` (INTEGER, opcional): Límite mensual de requests
- `is_visible` (BOOLEAN): Si la key está visible u oculta
- `created_at` (TIMESTAMP): Fecha de creación
- `updated_at` (TIMESTAMP): Fecha de última actualización

## Autenticación de usuarios (Opcional)

Actualmente, la aplicación usa un `user_id` por defecto (`"default-user-id"`). Para implementar autenticación real:

1. Instala el paquete de autenticación de Supabase:

   ```bash
   npm install @supabase/auth-helpers-nextjs
   ```

2. Actualiza `src/lib/apiKeys.js` para obtener el usuario autenticado:

   ```javascript
   import { createClient } from "@supabase/supabase-js";
   import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

   export async function getCurrentUserId() {
     const supabase = createServerComponentClient();
     const {
       data: { user },
     } = await supabase.auth.getUser();
     return user?.id || null;
   }
   ```

3. Habilita Row Level Security (RLS) en Supabase y descomenta las políticas en `supabase-schema.sql`

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Verifica que las variables están correctamente escritas
- Reinicia el servidor de desarrollo

### Error: "relation 'api_keys' does not exist"

- Ejecuta el script SQL en el SQL Editor de Supabase
- Verifica que la tabla se creó correctamente en la pestaña "Table Editor"

### Error de conexión

- Verifica que las credenciales de Supabase son correctas
- Verifica que tu proyecto de Supabase está activo
- Revisa la consola del navegador para más detalles del error

## Archivos creados

- `src/lib/supabase.js`: Configuración del cliente de Supabase
- `src/lib/apiKeys.js`: Funciones CRUD para API keys
- `supabase-schema.sql`: Script SQL para crear la tabla
- `.env.local.example`: Plantilla de variables de entorno
