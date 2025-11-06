"use client";

export default function CurrentPlanCard({ totalRequests, apiLimit }) {
  const usagePercentage = Math.round((totalRequests / apiLimit) * 100);

  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            CURRENT PLAN
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">Researcher</h2>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-white">API Limit</span>
            <svg
              className="h-4 w-4 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="mt-1 text-sm text-white">
            {totalRequests}/{apiLimit} Requests
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Manage Plan
        </button>
      </div>
    </div>
  );
}
