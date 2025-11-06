import { supabase } from "@/app/lib/supabaseClient";

/**
 * Obtener todas las API keys del usuario
 */
export async function getApiKeys(userId) {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return { data: null, error };
  }
}

/**
 * Crear una nueva API key
 */
export async function createApiKey(apiKeyData) {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .insert([apiKeyData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating API key:", error);
    return { data: null, error };
  }
}

/**
 * Actualizar una API key existente
 */
export async function updateApiKey(id, updates) {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error updating API key:", error);
    return { data: null, error };
  }
}

/**
 * Eliminar una API key
 */
export async function deleteApiKey(id) {
  try {
    const { error } = await supabase.from("api_keys").delete().eq("id", id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error deleting API key:", error);
    return { error };
  }
}

/**
 * Obtener el usuario actual (para desarrollo, puedes usar un ID fijo o autenticación)
 */
export async function getCurrentUserId() {
  // Por ahora, usaremos un userId por defecto
  // En producción, deberías obtener el userId del usuario autenticado
  // Ejemplo con autenticación de Supabase:
  // const { data: { user } } = await supabase.auth.getUser();
  // return user?.id;

  // Para desarrollo, retornamos un userId temporal
  // Puedes cambiarlo o implementar autenticación real
  return "default-user-id";
}
