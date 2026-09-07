import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Tag, 
  Layers, 
  Globe2, 
  ShieldCheck, 
  Building2, 
  Zap, 
  Compass,
  MapPin,
  Search,
  Check
} from 'lucide-react';

export default function FilterSidebar({
  isOpen,
  onClose,
  options,
  filters,
  onFilterChange,
  onResetFilters,
  onApplyPreset
}) {
  const [activeSection, setActiveSection] = useState({
    year: true,
    topic: true,
    sector: true,
    region: false,
    country: false,
    pestle: false,
    source: false,
    swot: false,
    city: false
  });

  const [filterSearch, setFilterSearch] = useState({
    topic: '',
    sector: '',
    country: '',
    source: '',
    region: '',
    city: ''
  });

  const toggleSection = (section) => {
    setActiveSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxToggle = (filterKey, value) => {
    const current = filters[filterKey] || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange(filterKey, updated);
  };

  const renderMultiSelect = (filterKey, items = [], searchKey = null) => {
    const currentSelected = filters[filterKey] || [];
    let list = items;

    if (searchKey && filterSearch[searchKey]) {
      const q = filterSearch[searchKey].toLowerCase();
      list = list.filter((item) => {
        const label = typeof item === 'string' ? item : item.label;
        return label.toLowerCase().includes(q);
      });
    }

    return (
      <div className="space-y-1.5 mt-2">
        {searchKey && items.length > 5 && (
          <div className="relative mb-1.5">
            <Search className="w-3 h-3 text-[var(--text-muted)] absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder={`Filter ${filterKey}...`}
              value={filterSearch[searchKey]}
              onChange={(e) =>
                setFilterSearch({ ...filterSearch, [searchKey]: e.target.value })
              }
              className="form-input text-xs py-1 pl-7 pr-2 rounded-md"
            />
          </div>
        )}

        <div className="max-h-44 overflow-y-auto space-y-0.5 pr-1">
          {list.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic py-1">No matching options</p>
          ) : (
            list.map((item) => {
              const label = typeof item === 'string' ? item : item.label;
              const count = typeof item === 'object' ? item.count : null;
              const isChecked = currentSelected.includes(label);

              return (
                <label
                  key={label}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                      : 'hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxToggle(filterKey, label)}
                      className="rounded text-[#7367F0] focus:ring-0 w-3.5 h-3.5 cursor-pointer accent-[#7367F0]"
                    />
                    <span className="truncate">{label}</span>
                  </div>
                  {count !== null && (
                    <span className="text-[10px] text-[var(--text-muted)] px-1.5 py-0.2 rounded bg-[var(--bg-active)]">
                      {count}
                    </span>
                  )}
                </label>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const countActive = (key) => (filters[key] ? filters[key].length : 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 md:top-[57px] left-0 h-screen md:h-[calc(100vh-57px)] w-72 max-w-[85vw] bg-[var(--bg-surface)] border-r border-[var(--border-color)] z-50 md:z-30 transition-transform duration-250 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#7367F0]" />
            <h2 className="text-xs font-bold text-[var(--text-heading)] uppercase tracking-wider">
              Filter Options
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onResetFilters}
              title="Reset all filters"
              className="p-1 text-xs text-[var(--text-muted)] hover:text-[#ef4444] rounded hover:bg-[var(--bg-subtle)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="md:hidden p-1 text-[var(--text-muted)] hover:text-[var(--text-heading)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="p-3 bg-[var(--bg-subtle)] border-b border-[var(--border-color)]">
          <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1.5 flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#f59e0b]" /> Quick Presets
          </p>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => onApplyPreset('energy')}
              className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-surface)] hover:bg-[#7367F0] hover:text-white border border-[var(--border-color)] transition-all"
            >
              ⚡ Energy
            </button>
            <button
              onClick={() => onApplyPreset('usa')}
              className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-surface)] hover:bg-[#7367F0] hover:text-white border border-[var(--border-color)] transition-all"
            >
              🇺🇸 USA
            </button>
            <button
              onClick={() => onApplyPreset('oil')}
              className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-surface)] hover:bg-[#7367F0] hover:text-white border border-[var(--border-color)] transition-all"
            >
              🛢️ Oil & Gas
            </button>
            <button
              onClick={() => onApplyPreset('tech')}
              className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-surface)] hover:bg-[#7367F0] hover:text-white border border-[var(--border-color)] transition-all"
            >
              💻 Tech
            </button>
          </div>
        </div>

        {/* Filter Accordion List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          
          {/* 1. End Year Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('year')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7367F0]" /> End Year
                {countActive('end_year') > 0 && (
                  <span className="badge badge-primary text-[10px] px-1 py-0">
                    {countActive('end_year')}
                  </span>
                )}
              </span>
              {activeSection.year ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.year && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto pr-1">
                  {options.end_years?.map((year) => {
                    const isSelected = filters.end_year?.includes(year);
                    return (
                      <button
                        key={year}
                        onClick={() => handleCheckboxToggle('end_year', year)}
                        className={`text-[11px] px-2 py-0.5 rounded border transition-all ${
                          isSelected
                            ? 'bg-[#7367F0] text-white border-[#7367F0] font-semibold'
                            : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[#7367F0]'
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. Topics Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('topic')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#06b6d4]" /> Topics
                {countActive('topic') > 0 && (
                  <span className="badge badge-info text-[10px] px-1 py-0">
                    {countActive('topic')}
                  </span>
                )}
              </span>
              {activeSection.topic ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.topic && renderMultiSelect('topic', options.topics, 'topic')}
          </div>

          {/* 3. Sector Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('sector')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#10b981]" /> Sector
                {countActive('sector') > 0 && (
                  <span className="badge badge-success text-[10px] px-1 py-0">
                    {countActive('sector')}
                  </span>
                )}
              </span>
              {activeSection.sector ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.sector && renderMultiSelect('sector', options.sectors, 'sector')}
          </div>

          {/* 4. Region Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('region')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#f59e0b]" /> Region
                {countActive('region') > 0 && (
                  <span className="badge badge-warning text-[10px] px-1 py-0">
                    {countActive('region')}
                  </span>
                )}
              </span>
              {activeSection.region ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.region && renderMultiSelect('region', options.regions, 'region')}
          </div>

          {/* 5. Country Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('country')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#ef4444]" /> Country
                {countActive('country') > 0 && (
                  <span className="badge badge-danger text-[10px] px-1 py-0">
                    {countActive('country')}
                  </span>
                )}
              </span>
              {activeSection.country ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.country && renderMultiSelect('country', options.countries, 'country')}
          </div>

          {/* 6. PESTLE Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('pestle')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7367F0]" /> PESTLE
                {countActive('pestle') > 0 && (
                  <span className="badge badge-primary text-[10px] px-1 py-0">
                    {countActive('pestle')}
                  </span>
                )}
              </span>
              {activeSection.pestle ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.pestle && renderMultiSelect('pestle', options.pestles)}
          </div>

          {/* 7. Source Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('source')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#06b6d4]" /> Source
                {countActive('source') > 0 && (
                  <span className="badge badge-info text-[10px] px-1 py-0">
                    {countActive('source')}
                  </span>
                )}
              </span>
              {activeSection.source ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.source && renderMultiSelect('source', options.sources, 'source')}
          </div>

          {/* 8. SWOT Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('swot')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#f59e0b]" /> SWOT
                {countActive('swot') > 0 && (
                  <span className="badge badge-warning text-[10px] px-1 py-0">
                    {countActive('swot')}
                  </span>
                )}
              </span>
              {activeSection.swot ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.swot && renderMultiSelect('swot', options.swots)}
          </div>

          {/* 9. City Filter */}
          <div className="border border-[var(--border-color)] rounded-lg p-2.5 bg-[var(--bg-card)]">
            <button
              onClick={() => toggleSection('city')}
              className="w-full flex items-center justify-between text-xs font-semibold text-[var(--text-heading)]"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#10b981]" /> City
                {countActive('city') > 0 && (
                  <span className="badge badge-success text-[10px] px-1 py-0">
                    {countActive('city')}
                  </span>
                )}
              </span>
              {activeSection.city ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {activeSection.city && renderMultiSelect('city', options.cities, 'city')}
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-2.5 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--text-muted)]">
            {Object.values(filters).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0)} filters selected
          </span>
          <button
            onClick={onResetFilters}
            className="text-[11px] text-[#7367F0] hover:underline font-semibold"
          >
            Clear All
          </button>
        </div>
      </aside>
    </>
  );
}
