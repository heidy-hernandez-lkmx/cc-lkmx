"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Notification from "@/app/components/Notification";

export default function Protected() {
  const [isValidating, setIsValidating] = useState(true);
  const [showValidNotification, setShowValidNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = () => {
      // Obtener la API key de sessionStorage
      const apiKey = sessionStorage.getItem("apiKeyToValidate");

      if (!apiKey) {
        // Si no hay API key, redirigir a playground
        router.push("/playground");
        return;
      }

      // Si hay API key, significa que ya fue validada en /playground
      setIsValidating(false);
      setShowValidNotification(true);

      // Auto-cerrar la notificación después de 5 segundos
      setTimeout(() => {
        setShowValidNotification(false);
      }, 5000);
    };

    checkAccess();
  }, [router]);

  return (
    <div className="flex h-screen bg-white">
      {/* Barra superior verde */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"></div>

      {/* Notificaciones */}
      <Notification
        showValidApiKey={showValidNotification}
        onCloseValid={() => setShowValidNotification(false)}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto pt-16">
        <div className="px-8 py-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Protected Page
          </h1>
          <p className="text-gray-600 mb-8">
            This page is protected and requires a valid API key to access.
          </p>

          {isValidating ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <svg
                  className="h-5 w-5 animate-spin"
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
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-green-900">
                    Access Granted
                  </h2>
                  <p className="text-sm text-green-700">
                    Your API key is valid. You can now access this protected
                    page.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm text-gray-700">
                  This is a protected resource that requires a valid API key to
                  access. Your API key has been validated successfully.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
