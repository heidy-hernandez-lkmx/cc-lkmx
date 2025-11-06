"use client";

import Link from "next/link";

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <aside
      className={`relative shrink-0 border-r border-gray-200 bg-white pt-16 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Botón para colapsar/expandir */}
      <button
        onClick={onToggle}
        className={`absolute top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 ${
          isOpen ? "right-2" : "right-1"
        }`}
        title={isOpen ? "Colapsar sidebar" : "Expandir sidebar"}
      >
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      <div className={`${isOpen ? "px-6" : "px-3"} pb-6`}>
        {isOpen ? (
          <>
            <p className="text-xs text-gray-500 mb-1">Pages / Overview</p>
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          </>
        ) : (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <nav className={`${isOpen ? "px-4" : "px-2"}`}>
        <Link
          href="/dashboards"
          className={`flex items-center gap-3 mb-1 rounded-lg transition-colors ${
            isOpen
              ? "px-3 py-2 bg-purple-50 text-purple-600 hover:bg-purple-50"
              : "px-2 py-2 justify-center hover:bg-gray-50"
          }`}
          title={!isOpen ? "Overview" : ""}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {isOpen && <span className="font-medium">Overview</span>}
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 mb-1 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
            isOpen ? "px-3 py-2" : "px-2 py-2 justify-center"
          }`}
          title={!isOpen ? "Research Assistant" : ""}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          {isOpen && <span>Research Assistant</span>}
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 mb-1 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
            isOpen ? "px-3 py-2" : "px-2 py-2 justify-center"
          }`}
          title={!isOpen ? "Research Reports" : ""}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm1 8a1 1 0 100 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          {isOpen && <span>Research Reports</span>}
        </Link>
        <Link
          href="/playground"
          className={`flex items-center gap-3 mb-1 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
            isOpen ? "px-3 py-2" : "px-2 py-2 justify-center"
          }`}
          title={!isOpen ? "API Playground" : ""}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          {isOpen && <span>API Playground</span>}
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 mb-1 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
            isOpen ? "px-3 py-2" : "px-2 py-2 justify-center"
          }`}
          title={!isOpen ? "Invoices" : ""}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {isOpen && <span>Invoices</span>}
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 mb-1 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
            isOpen ? "px-3 py-2" : "px-2 py-2 justify-center"
          }`}
          title={!isOpen ? "Documentation" : ""}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {isOpen && <span>Documentation</span>}
          {isOpen && (
            <svg
              className="w-4 h-4 ml-auto shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </Link>
      </nav>
    </aside>
  );
}
