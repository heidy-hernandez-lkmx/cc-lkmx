"use client";

import { useState, useEffect } from "react";
import {
  getApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  getCurrentUserId,
} from "@/lib/apiKeys";
import { generateApiKey } from "@/app/utils/apiKeyUtils";

/**
 * Hook personalizado para manejar las API keys
 */
export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Cargar API keys desde Supabase
  useEffect(() => {
    const loadApiKeys = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const currentUserId = await getCurrentUserId();
        setUserId(currentUserId);
        const { data, error: fetchError } = await getApiKeys(currentUserId);

        if (fetchError) {
          throw fetchError;
        }

        // Mapear los datos de Supabase al formato esperado
        const formattedKeys = (data || []).map((key) => ({
          id: key.id,
          name: key.name,
          key: key.key,
          description: key.description || "",
          usage: key.usage || 0,
          monthlyLimit: key.monthly_limit || undefined,
          isVisible: key.is_visible || false,
          createdAt: key.created_at,
          updatedAt: key.updated_at,
        }));

        setApiKeys(formattedKeys);
      } catch (err) {
        console.error("Error loading API keys:", err);
        setError(err.message || "Error al cargar las API keys");
      } finally {
        setIsLoading(false);
      }
    };

    loadApiKeys();
  }, []);

  const createKey = async (formData) => {
    if (!userId) {
      setError("Usuario no identificado");
      return { error: new Error("Usuario no identificado") };
    }

    setError(null);

    try {
      const newKeyData = {
        user_id: userId,
        name: formData.name,
        key: formData.key || generateApiKey(),
        description: formData.description || null,
        usage: 0,
        monthly_limit: formData.limitEnabled ? formData.monthlyLimit : null,
        is_visible: false,
      };

      const { data, error: createError } = await createApiKey(newKeyData);

      if (createError) throw createError;

      // Agregar la nueva key al estado local
      const newKey = {
        id: data.id,
        name: data.name,
        key: data.key,
        description: data.description || "",
        usage: data.usage || 0,
        monthlyLimit: data.monthly_limit || undefined,
        isVisible: data.is_visible || false,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setApiKeys([newKey, ...apiKeys]);

      return { data: newKey };
    } catch (err) {
      console.error("Error creating API key:", err);
      setError(err.message || "Error al crear la API key");
      return { error: err };
    }
  };

  const updateKey = async (id, formData) => {
    setError(null);

    try {
      const { data, error: updateError } = await updateApiKey(id, {
        name: formData.name,
        key: formData.key,
        description: formData.description || null,
        monthly_limit: formData.limitEnabled ? formData.monthlyLimit : null,
      });

      if (updateError) throw updateError;

      // Actualizar el estado local
      const updatedKey = {
        id: data.id,
        name: data.name,
        key: data.key,
        description: data.description || "",
        monthlyLimit: data.monthly_limit || undefined,
        updatedAt: data.updated_at,
      };

      setApiKeys(
        apiKeys.map((k) => (k.id === id ? { ...k, ...updatedKey } : k))
      );

      return { data: updatedKey };
    } catch (err) {
      console.error("Error updating API key:", err);
      setError(err.message || "Error al actualizar la API key");
      return { error: err };
    }
  };

  const deleteKey = async (id) => {
    try {
      setError(null);
      const { error: deleteError } = await deleteApiKey(id);

      if (deleteError) throw deleteError;

      // Actualizar el estado local
      setApiKeys(apiKeys.filter((k) => k.id !== id));

      return { success: true };
    } catch (err) {
      console.error("Error deleting API key:", err);
      setError(err.message || "Error al eliminar la API key");
      return { error: err };
    }
  };

  const toggleVisibility = async (id) => {
    const key = apiKeys.find((k) => k.id === id);
    if (!key) return { error: new Error("API key no encontrada") };

    const newVisibility = !key.isVisible;

    try {
      setError(null);
      const { error: updateError } = await updateApiKey(id, {
        is_visible: newVisibility,
      });

      if (updateError) throw updateError;

      // Actualizar el estado local
      setApiKeys(
        apiKeys.map((k) =>
          k.id === id ? { ...k, isVisible: newVisibility } : k
        )
      );

      return { success: true };
    } catch (err) {
      console.error("Error toggling visibility:", err);
      setError(err.message || "Error al cambiar la visibilidad");
      return { error: err };
    }
  };

  return {
    apiKeys,
    isLoading,
    error,
    userId,
    setError,
    createKey,
    updateKey,
    deleteKey,
    toggleVisibility,
  };
}
