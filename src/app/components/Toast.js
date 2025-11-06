"use client";

export default function Toast({ show, message, bgColor, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 transform">
      <div
        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg ${bgColor}`}
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
          <svg
            className="h-3 w-3"
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
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 rounded p-1 hover:bg-white/20"
        >
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
      </div>
    </div>
  );
}
