import React from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  SlidersHorizontal, 
  Download, 
  RotateCcw,
  BarChart2,
  TrendingUp
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
  onExportJSON
}) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-surface-glass)] backdrop-blur-md border-b border-[var(--border-color)] px-4 lg:px-8 py-2.5 transition-all shadow-xs">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Logo */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white shadow-sm shadow-[#2563eb30]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-[var(--text-heading)]">
                  InsightPulse
                </h1>
                <span className="badge badge-primary text-[10px] px-1.5 py-0.5 font-bold">
                  Live Analytics
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block"></span>
                Global Trends & Forecast Dashboard
              </p>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={toggleFilterSidebar}
            className="md:hidden btn btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
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
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="font-medium">Filter Panel</span>
            {activeFilterCount > 0 && (
              <span className="bg-[#2563EB] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
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

          {/* Theme Switcher */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="btn-icon rounded-lg"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#d97706]" /> : <Moon className="w-4 h-4 text-[#2563EB]" />}
          </button>
        </div>

      </div>
    </header>
  );
}
