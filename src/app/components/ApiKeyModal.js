"use client";

import { useState } from "react";

// Función helper para obtener el estado inicial del formulario
const getInitialFormData = (editingKey) => {
  if (editingKey) {
    return {
      name: editingKey.name,
      key: editingKey.key,
      description: editingKey.description || "",
      limitEnabled: editingKey.monthlyLimit !== undefined,
      monthlyLimit: editingKey.monthlyLimit || 1000,
    };
  }
  return {
    name: "",
    key: "",
    description: "",
    limitEnabled: false,
    monthlyLimit: 1000,
  };
};

export default function ApiKeyModal({
  isOpen,
  editingKey,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  // Usar función de inicialización lazy para calcular el estado inicial
  // Esto se ejecuta solo una vez cuando el componente se monta
  // Para resetear el estado cuando cambia editingKey, usamos una key en el componente padre
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingKey)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          {editingKey ? "Edit API key" : "Create a new API key"}
        </h2>
        {!editingKey && (
          <p className="mb-6 text-sm text-gray-600">
            Enter a name and limit for the new API key.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Key Name"
            />
          </div>

          {editingKey && (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                API Key
              </label>
              <input
                type="text"
                required
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="tvly-..."
              />
            </div>
          )}

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.limitEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    limitEnabled: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Limit monthly usage*
              </span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.monthlyLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyLimit: parseInt(e.target.value) || 1000,
                })
              }
              disabled={!formData.limitEnabled}
              className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="1000"
            />
          </div>

          <p className="mb-6 text-xs text-gray-500">
            * If the combined usage of all your keys exceeds your plan&apos;s
            limit, all requests will be rejected.
          </p>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
              ) : editingKey ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
