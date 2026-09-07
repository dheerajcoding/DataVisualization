const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const buildQueryParams = (filters, extra = {}) => {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.end_year && filters.end_year.length > 0) {
      params.append('end_year', filters.end_year.join(','));
    }
    if (filters.topic && filters.topic.length > 0) {
      params.append('topic', filters.topic.join(','));
    }
    if (filters.sector && filters.sector.length > 0) {
      params.append('sector', filters.sector.join(','));
    }
    if (filters.region && filters.region.length > 0) {
      params.append('region', filters.region.join(','));
    }
    if (filters.pestle && filters.pestle.length > 0) {
      params.append('pestle', filters.pestle.join(','));
    }
    if (filters.source && filters.source.length > 0) {
      params.append('source', filters.source.join(','));
    }
    if (filters.swot && filters.swot.length > 0) {
      params.append('swot', filters.swot.join(','));
    }
    if (filters.country && filters.country.length > 0) {
      params.append('country', filters.country.join(','));
    }
    if (filters.city && filters.city.length > 0) {
      params.append('city', filters.city.join(','));
    }
    if (filters.search && filters.search.trim() !== '') {
      params.append('search', filters.search.trim());
    }
  }

  Object.entries(extra).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      params.append(key, String(val));
    }
  });

  return params.toString() ? `?${params.toString()}` : '';
};

export const api = {
  // Fetch high-level KPIs
  async getStats(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/stats${qs}`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Fetch unique filter choices with occurrence counts
  async getFilterOptions() {
    const res = await fetch(`${API_BASE}/filters/options`);
    if (!res.ok) throw new Error('Failed to fetch filter options');
    return res.json();
  },

  // Fetch paginated data table
  async getData(filters, { page = 1, limit = 10, sortBy = 'added', order = 'desc' } = {}) {
    const qs = buildQueryParams(filters, { page, limit, sortBy, order });
    const res = await fetch(`${API_BASE}/data${qs}`);
    if (!res.ok) throw new Error('Failed to fetch data list');
    return res.json();
  },

  // Fetch all filtered records for CSV/JSON export
  async getAllFilteredData(filters) {
    const qs = buildQueryParams(filters, { limit: 2000, page: 1 });
    const res = await fetch(`${API_BASE}/data${qs}`);
    if (!res.ok) throw new Error('Failed to fetch export data');
    return res.json();
  },

  // Chart aggregations
  async getIntensityTimeline(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/intensity-timeline${qs}`);
    return res.json();
  },

  async getSectorDistribution(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/sector-distribution${qs}`);
    return res.json();
  },

  async getRegionAnalysis(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/region-analysis${qs}`);
    return res.json();
  },

  async getPestleMatrix(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/pestle-matrix${qs}`);
    return res.json();
  },

  async getRelevanceLikelihood(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/relevance-likelihood${qs}`);
    return res.json();
  },

  async getCountryRankings(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/country-rankings${qs}`);
    return res.json();
  },

  async getTopTopics(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/top-topics${qs}`);
    return res.json();
  },

  async getSwotDistribution(filters) {
    const qs = buildQueryParams(filters);
    const res = await fetch(`${API_BASE}/charts/swot-distribution${qs}`);
    return res.json();
  }
};
