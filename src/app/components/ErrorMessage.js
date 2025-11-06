"use client";

export default function ErrorMessage({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <div className="flex items-center justify-between">
        <span>{error}</span>
        {onClose && (
          <button onClick={onClose} className="text-red-600 hover:text-red-800">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
