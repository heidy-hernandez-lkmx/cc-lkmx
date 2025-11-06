"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "@/app/components/Notification";

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidNotification, setShowValidNotification] = useState(false);
  const [showInvalidNotification, setShowInvalidNotification] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Validar la API key llamando al endpoint
      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.valid) {
        // Si es válida, guardar en sessionStorage y redirigir a /protected
        sessionStorage.setItem("apiKeyToValidate", apiKey.trim());
        setShowValidNotification(true);

        // Redirigir a /protected después de mostrar la notificación
        setTimeout(() => {
          router.push("/protected");
        }, 1000);
      } else {
        // Si es inválida, mostrar notificación y quedarse en /playground
        setShowInvalidNotification(true);
        setIsSubmitting(false);

        // Auto-cerrar la notificación después de 5 segundos
        setTimeout(() => {
          setShowInvalidNotification(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error validating API key:", error);
      setShowInvalidNotification(true);
      setIsSubmitting(false);

      // Auto-cerrar la notificación después de 5 segundos
      setTimeout(() => {
        setShowInvalidNotification(false);
      }, 5000);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Barra superior verde */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"></div>

      {/* Notificaciones */}
      <Notification
        showValidApiKey={showValidNotification}
        showInvalidApiKey={showInvalidNotification}
        onCloseValid={() => setShowValidNotification(false)}
        onCloseInvalid={() => setShowInvalidNotification(false)}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto pt-16">
        <div className="px-8 py-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            API Playground
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your API key to validate and access protected resources.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
          >
            <div className="mb-6">
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="cc-lkmx-..."
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-gray-500">
                Enter your API key to validate and access protected content.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !apiKey.trim()}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
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
                  Validating...
                </span>
              ) : (
                "Validate API Key"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
