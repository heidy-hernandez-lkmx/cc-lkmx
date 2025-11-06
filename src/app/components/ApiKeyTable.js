"use client";

import ApiKeyTableRow from "./ApiKeyTableRow";

export default function ApiKeyTable({
  apiKeys,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              NAME
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              USAGE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              KEY
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              OPTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {apiKeys.map((apiKey) => (
            <ApiKeyTableRow
              key={apiKey.id}
              apiKey={apiKey}
              onToggleVisibility={onToggleVisibility}
              onCopy={onCopy}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
