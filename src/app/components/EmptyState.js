"use client";

export default function EmptyState({ message }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
