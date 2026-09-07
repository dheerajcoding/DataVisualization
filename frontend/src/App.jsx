import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import KpiCards from './components/KpiCards';
import IntensityYearChart from './components/charts/IntensityYearChart';
import LikelihoodRelevanceScatter from './components/charts/LikelihoodRelevanceScatter';
import SectorDoughnutChart from './components/charts/SectorDoughnutChart';
import PestleRadarChart from './components/charts/PestleRadarChart';
import RegionBarChart from './components/charts/RegionBarChart';
import D3GlobalClusterChart from './components/charts/D3GlobalClusterChart';
import SwotChart from './components/charts/SwotChart';
import TopTopicsChart from './components/charts/TopTopicsChart';
import DataTable from './components/DataTable';
import InsightModal from './components/InsightModal';
import { 
  BarChart3, 
  Table as TableIcon, 
  Compass, 
  Sparkles, 
  RotateCcw,
  Layers,
  Filter
} from 'lucide-react';

const INITIAL_FILTERS = {
  end_year: [],
  topic: [],
  sector: [],
  region: [],
  pestle: [],
  source: [],
  swot: [],
  country: [],
  city: [],
  search: ''
};

export default function App() {
  // Always default to clean, bright Light Mode
  const [isDark, setIsDark] = useState(false);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'strategic' | 'table'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [options, setOptions] = useState({
    end_years: [],
    topics: [],
    sectors: [],
    regions: [],
    pestles: [],
    sources: [],
    swots: [],
    countries: [],
    cities: []
  });

  const [stats, setStats] = useState({});
  const [timelineData, setTimelineData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [pestleData, setPestleData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [topTopicsData, setTopTopicsData] = useState([]);
  const [swotData, setSwotData] = useState([]);

  // Table State
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [sortBy, setSortBy] = useState('added');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedInsight, setSelectedInsight] = useState(null);

  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  // Clear any stored dark mode in localStorage on initial mount
  useEffect(() => {
    localStorage.removeItem('theme');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // 1. Initial Load: Filter Options
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await api.getFilterOptions();
        if (res.success && res.options) {
          setOptions(res.options);
        }
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    loadOptions();
  }, []);

  // 2. Fetch Aggregated Charts and Stats whenever filters change
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        statsRes,
        timelineRes,
        sectorRes,
        regionRes,
        pestleRes,
        scatterRes,
        topicsRes,
        swotRes
      ] = await Promise.all([
        api.getStats(filters),
        api.getIntensityTimeline(filters),
        api.getSectorDistribution(filters),
        api.getRegionAnalysis(filters),
        api.getPestleMatrix(filters),
        api.getRelevanceLikelihood(filters),
        api.getTopTopics(filters),
        api.getSwotDistribution(filters)
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (timelineRes.success) setTimelineData(timelineRes.data);
      if (sectorRes.success) setSectorData(sectorRes.data);
      if (regionRes.success) setRegionData(regionRes.data);
      if (pestleRes.success) setPestleData(pestleRes.data);
      if (scatterRes.success) setScatterData(scatterRes.data);
      if (topicsRes.success) setTopTopicsData(topicsRes.data);
      if (swotRes.success) setSwotData(swotRes.data);
    } catch (err) {
      console.error('Error fetching dashboard visualizations:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 3. Fetch Paginated Table Data
  const fetchTableData = useCallback(async () => {
    try {
      const res = await api.getData(filters, {
        page: pagination.page,
        limit: pagination.limit,
        sortBy,
        order: sortOrder
      });
      if (res.success) {
        setTableData(res.data);
        setPagination((prev) => ({
          ...prev,
          total: res.pagination.total,
          totalPages: res.pagination.totalPages
        }));
      }
    } catch (err) {
      console.error('Error fetching table items:', err);
    }
  }, [filters, pagination.page, pagination.limit, sortBy, sortOrder]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // Filter Actions
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearchChange = (term) => {
    setFilters((prev) => ({ ...prev, search: term }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPagination((prev) => ({ ...prev, page: 1 }));
    showToast('Filters reset to all data');
  };

  const handleApplyPreset = (type) => {
    if (type === 'energy') {
      setFilters({ ...INITIAL_FILTERS, sector: ['Energy'] });
      showToast('Filtered: Energy Sector');
    } else if (type === 'usa') {
      setFilters({ ...INITIAL_FILTERS, country: ['United States of America'] });
      showToast('Filtered: United States of America');
    } else if (type === 'oil') {
      setFilters({ ...INITIAL_FILTERS, topic: ['oil', 'gas'] });
      showToast('Filtered: Oil & Gas Insights');
    } else if (type === 'tech') {
      setFilters({ ...INITIAL_FILTERS, pestle: ['Technological'] });
      showToast('Filtered: Technological Forces');
    }
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleTopicSelection = (topic) => {
    const current = filters.topic || [];
    const updated = current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic];
    handleFilterChange('topic', updated);
    showToast(`Filtered by Topic: ${topic}`);
  };

  // Sort & Pagination Handlers
  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  // Export CSV Handler
  const handleExportCSV = async () => {
    try {
      showToast('Exporting CSV...');
      const res = await api.getAllFilteredData(filters);
      const rows = res.data || [];
      if (rows.length === 0) return;

      const headers = Object.keys(rows[0]).filter((k) => k !== '__v');
      const csvContent = [
        headers.join(','),
        ...rows.map((row) =>
          headers
            .map((field) => {
              let val = row[field] ?? '';
              val = String(val).replace(/"/g, '""');
              return `"${val}"`;
            })
            .join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `insights_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('CSV downloaded successfully');
    } catch (err) {
      showToast('Failed to export CSV');
    }
  };

  // Export JSON Handler
  const handleExportJSON = async () => {
    try {
      showToast('Exporting JSON...');
      const res = await api.getAllFilteredData(filters);
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(res.data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `insights_export_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('JSON downloaded successfully');
    } catch (err) {
      showToast('Failed to export JSON');
    }
  };

  const activeFilterCount =
    Object.entries(filters).reduce(
      (acc, [key, val]) => acc + (Array.isArray(val) ? val.length : val ? 1 : 0),
      0
    ) - (filters.search ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0284c7] text-white px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Light Header */}
      <Header
        searchTerm={filters.search}
        setSearchTerm={handleSearchChange}
        isDark={false}
        setIsDark={() => {}}
        toggleFilterSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeFilterCount={activeFilterCount}
        onResetFilters={handleResetFilters}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
      />

      {/* Main Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          options={options}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onApplyPreset={handleApplyPreset}
        />

        {/* Dashboard Workspace */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden space-y-5">
          
          {/* Active Filter Badges */}
          {activeFilterCount > 0 && (
            <div className="card-panel p-2.5 px-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#64748b] uppercase text-[10px]">
                Active Filters ({activeFilterCount}):
              </span>
              {Object.entries(filters).map(([key, list]) => {
                if (key === 'search' || !Array.isArray(list) || list.length === 0) return null;
                return list.map((val) => (
                  <span
                    key={`${key}-${val}`}
                    className="badge badge-primary flex items-center gap-1 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      const updated = list.filter((item) => item !== val);
                      handleFilterChange(key, updated);
                    }}
                  >
                    <span className="capitalize">{key}:</span> {val}
                    <span className="ml-0.5 text-[10px] font-bold">✕</span>
                  </span>
                ));
              })}
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#e11d48] hover:underline font-semibold ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* KPI Cards (Clean 6-column grid) */}
          <KpiCards stats={stats} totalUniverse={1000} />

          {/* Clean View Tabs */}
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <div className="flex items-center gap-1.5 bg-[#f1f5f9] p-1 rounded-lg border border-[#e2e8f0]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Executive Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('strategic')}
                className={`tab-btn ${activeTab === 'strategic' ? 'active' : ''}`}
              >
                <Compass className="w-4 h-4" />
                <span>Strategic & Regional</span>
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`}
              >
                <TableIcon className="w-4 h-4" />
                <span>Data Records ({pagination.total || 0})</span>
              </button>
            </div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden btn btn-secondary text-xs"
            >
              <Filter className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Filter Panel</span>
            </button>
          </div>

          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fade-in">
              <div className="chart-grid-2">
                <div>
                  <IntensityYearChart data={timelineData} isDark={false} />
                </div>
                <div>
                  <SectorDoughnutChart data={sectorData} isDark={false} />
                </div>
              </div>

              <div className="chart-grid-2">
                <div>
                  <LikelihoodRelevanceScatter data={scatterData} isDark={false} />
                </div>
                <div>
                  <RegionBarChart data={regionData} isDark={false} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STRATEGIC & REGIONAL */}
          {activeTab === 'strategic' && (
            <div className="space-y-5 animate-fade-in">
              <div className="chart-grid-3">
                <div>
                  <D3GlobalClusterChart
                    data={topTopicsData}
                    isDark={false}
                    onSelectTopic={handleTopicSelection}
                  />
                </div>
                <div>
                  <PestleRadarChart data={pestleData} isDark={false} />
                </div>
                <div>
                  <SwotChart data={swotData} isDark={false} />
                </div>
              </div>

              <div className="chart-grid-2-even">
                <div>
                  <RegionBarChart data={regionData} isDark={false} />
                </div>
                <div>
                  <TopTopicsChart
                    data={topTopicsData}
                    onSelectTopic={handleTopicSelection}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DATA RECORDS EXPLORER */}
          {activeTab === 'table' && (
            <div className="animate-fade-in">
              <DataTable
                data={tableData}
                pagination={pagination}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                onSelectInsight={(item) => setSelectedInsight(item)}
              />
            </div>
          )}

        </main>
      </div>

      {/* Detailed Record Inspector Modal */}
      {selectedInsight && (
        <InsightModal
          item={selectedInsight}
          onClose={() => setSelectedInsight(null)}
        />
      )}
    </div>
  );
}
