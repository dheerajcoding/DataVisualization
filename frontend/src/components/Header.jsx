import React from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  SlidersHorizontal, 
  Download, 
  RotateCcw,
  BarChart2,
  TrendingUp,
  LogOut,
  User
} from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  isDark,
  setIsDark,
  toggleFilterSidebar,
  activeFilterCount,
  onResetFilters,
  onExportCSV,
  onExportJSON,
  currentUser,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-surface-glass)] backdrop-blur-md border-b border-[var(--border-color)] px-4 lg:px-8 py-2.5 transition-all shadow-xs">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Logo */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7367F0] to-[#9E95F5] flex items-center justify-center text-white shadow-sm shadow-[#7367f035]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M4.5 4.5 L9.5 19.5 L14.5 4.5 L19.5 19.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-[var(--text-heading)]">
                  Vuexy
                </h1>
                <span className="badge badge-primary text-[10px] px-1.5 py-0.5 font-bold">
                  Analytics
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block"></span>
                InsightPulse Dashboard
              </p>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={toggleFilterSidebar}
            className="md:hidden btn btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="badge badge-primary text-[10px] px-1.5">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Global Instant Search */}
        <div className="w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords in insights, topics, sectors, countries..."
            className="form-input pl-9 pr-8 py-1.5 text-xs w-full rounded-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-heading)]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Filter Trigger Button */}
          <button
            onClick={toggleFilterSidebar}
            className="btn btn-secondary text-xs"
            title="Toggle Filter Sidebar"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284c7]" />
            <span className="font-medium">Filter Panel</span>
            {activeFilterCount > 0 && (
              <span className="bg-[#0284c7] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="btn btn-secondary text-xs text-[#e11d48] hover:bg-[#e11d4810]"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Export Actions */}
          <div className="flex items-center gap-1 border-l border-[var(--border-color)] pl-2">
            <button
              onClick={onExportCSV}
              className="btn btn-secondary text-xs px-2.5 py-1.5"
              title="Export as CSV"
            >
              <Download className="w-3 h-3 text-[#059669]" />
              <span className="hidden lg:inline">CSV</span>
            </button>
            <button
              onClick={onExportJSON}
              className="btn btn-secondary text-xs px-2.5 py-1.5"
              title="Export as JSON"
            >
              <Download className="w-3 h-3 text-[#0284c7]" />
              <span className="hidden lg:inline">JSON</span>
            </button>
          </div>

          {/* User Profile & Logout */}
          {currentUser && (
            <div className="flex items-center gap-2 border-l border-[var(--border-color)] pl-2">
              <div className="w-7 h-7 rounded-full bg-[#e0f2fe] text-[#0284c7] font-bold text-xs flex items-center justify-center border border-[#bae6fd]" title={currentUser.email}>
                {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
              </div>
              <button
                onClick={onLogout}
                className="btn-icon text-xs text-[#64748b] hover:text-[#e11d48] hover:bg-[#fff1f2]"
                title="Logout / Switch Account"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
