"use client";

import { useState } from "react";
import { useApiKeys } from "@/app/hooks/useApiKeys";
import CurrentPlanCard from "@/app/components/CurrentPlanCard";
import ApiKeyModal from "@/app/components/ApiKeyModal";
import ApiKeyTable from "@/app/components/ApiKeyTable";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorMessage from "@/app/components/ErrorMessage";
import EmptyState from "@/app/components/EmptyState";

export default function DashboardContent({
  onCopySuccess,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}) {
  const {
    apiKeys,
    isLoading,
    error,
    setError,
    createKey,
    updateKey,
    deleteKey,
    toggleVisibility,
  } = useApiKeys();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const handleOpenModal = (key = null) => {
    setEditingKey(key);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingKey(null);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingKey) {
        const result = await updateKey(editingKey.id, formData);
        if (!result.error) {
          onUpdateSuccess();
          handleCloseModal();
        }
      } else {
        const result = await createKey(formData);
        if (!result.error) {
          onCreateSuccess();
          handleCloseModal();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteKey(id);
    if (!result.error) {
      onDeleteSuccess();
    }
  };

  const handleToggleVisibility = async (id) => {
    await toggleVisibility(id);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      onCopySuccess();
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      setError("Error al copiar la API key");
    }
  };

  // Calcular total de requests
  const totalRequests = apiKeys.reduce((sum, key) => sum + (key.usage || 0), 0);
  const apiLimit = 1000;

  return (
    <>
      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto pt-16">
        <div className="px-8 py-8">
          {/* Current Plan Card */}
          <CurrentPlanCard totalRequests={totalRequests} apiLimit={apiLimit} />

          {/* API Keys Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
              <button
                onClick={() => handleOpenModal()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              The key is used to authenticate your requests to the Research API.
              To learn more, see the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                documentation page
              </a>
              .
            </p>

            {/* Mensaje de error */}
            <ErrorMessage error={error} onClose={() => setError(null)} />

            {/* Indicador de carga */}
            {isLoading ? (
              <LoadingSpinner message="Cargando API keys..." />
            ) : apiKeys.length === 0 ? (
              <EmptyState message="No hay API keys registradas. Crea una nueva para comenzar." />
            ) : (
              <ApiKeyTable
                apiKeys={apiKeys}
                onToggleVisibility={handleToggleVisibility}
                onCopy={handleCopy}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modal para Crear/Editar */}
      {/* Usar key para forzar remount cuando cambia editingKey, evitando useEffect */}
      <ApiKeyModal
        key={editingKey?.id || "new"}
        isOpen={isModalOpen}
        editingKey={editingKey}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
