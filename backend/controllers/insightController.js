import Insight from '../models/Insight.js';
import { getIsMongoConnected, getMemoryStore } from '../config/db.js';

// Helper: build MongoDB filter query from request query params
const buildMongoQuery = (query) => {
  const filter = {};

  if (query.end_year) {
    const years = Array.isArray(query.end_year) ? query.end_year : query.end_year.split(',').map((s) => s.trim());
    filter.end_year = { $in: years };
  }
  if (query.topic) {
    const topics = Array.isArray(query.topic) ? query.topic : query.topic.split(',').map((s) => s.trim());
    filter.topic = { $in: topics };
  }
  if (query.sector) {
    const sectors = Array.isArray(query.sector) ? query.sector : query.sector.split(',').map((s) => s.trim());
    filter.sector = { $in: sectors };
  }
  if (query.region) {
    const regions = Array.isArray(query.region) ? query.region : query.region.split(',').map((s) => s.trim());
    filter.region = { $in: regions };
  }
  if (query.pestle) {
    const pestles = Array.isArray(query.pestle) ? query.pestle : query.pestle.split(',').map((s) => s.trim());
    filter.pestle = { $in: pestles };
  }
  if (query.source) {
    const sources = Array.isArray(query.source) ? query.source : query.source.split(',').map((s) => s.trim());
    filter.source = { $in: sources };
  }
  if (query.swot) {
    const swots = Array.isArray(query.swot) ? query.swot : query.swot.split(',').map((s) => s.trim());
    filter.swot = { $in: swots };
  }
  if (query.country) {
    const countries = Array.isArray(query.country) ? query.country : query.country.split(',').map((s) => s.trim());
    filter.country = { $in: countries };
  }
  if (query.city) {
    const cities = Array.isArray(query.city) ? query.city : query.city.split(',').map((s) => s.trim());
    filter.city = { $in: cities };
  }

  if (query.search) {
    const searchRegex = new RegExp(query.search.trim(), 'i');
    filter.$or = [
      { title: searchRegex },
      { insight: searchRegex },
      { topic: searchRegex },
      { source: searchRegex },
      { country: searchRegex },
      { sector: searchRegex }
    ];
  }

  return filter;
};

// Helper: Filter in-memory array with the same rules
const filterMemoryStore = (data, query) => {
  return data.filter((item) => {
    if (query.end_year) {
      const years = Array.isArray(query.end_year) ? query.end_year : query.end_year.split(',').map((s) => s.trim());
      if (!years.includes(item.end_year)) return false;
    }
    if (query.topic) {
      const topics = Array.isArray(query.topic) ? query.topic : query.topic.split(',').map((s) => s.trim());
      if (!topics.includes(item.topic)) return false;
    }
    if (query.sector) {
      const sectors = Array.isArray(query.sector) ? query.sector : query.sector.split(',').map((s) => s.trim());
      if (!sectors.includes(item.sector)) return false;
    }
    if (query.region) {
      const regions = Array.isArray(query.region) ? query.region : query.region.split(',').map((s) => s.trim());
      if (!regions.includes(item.region)) return false;
    }
    if (query.pestle) {
      const pestles = Array.isArray(query.pestle) ? query.pestle : query.pestle.split(',').map((s) => s.trim());
      if (!pestles.includes(item.pestle)) return false;
    }
    if (query.source) {
      const sources = Array.isArray(query.source) ? query.source : query.source.split(',').map((s) => s.trim());
      if (!sources.includes(item.source)) return false;
    }
    if (query.swot) {
      const swots = Array.isArray(query.swot) ? query.swot : query.swot.split(',').map((s) => s.trim());
      if (!swots.includes(item.swot)) return false;
    }
    if (query.country) {
      const countries = Array.isArray(query.country) ? query.country : query.country.split(',').map((s) => s.trim());
      if (!countries.includes(item.country)) return false;
    }
    if (query.city) {
      const cities = Array.isArray(query.city) ? query.city : query.city.split(',').map((s) => s.trim());
      if (!cities.includes(item.city)) return false;
    }
    if (query.search) {
      const q = query.search.toLowerCase().trim();
      const match =
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.insight && item.insight.toLowerCase().includes(q)) ||
        (item.topic && item.topic.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        (item.sector && item.sector.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });
};

// 1. GET /api/data (Paginated, Searchable, Filtered Insights)
export const getInsights = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'added';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    if (getIsMongoConnected()) {
      const filter = buildMongoQuery(req.query);
      const total = await Insight.countDocuments(filter);
      const data = await Insight.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);

      return res.json({
        success: true,
        source: 'MongoDB',
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        },
        data
      });
    } else {
      let filtered = filterMemoryStore(getMemoryStore(), req.query);
      filtered.sort((a, b) => {
        const valA = a[sortBy] ?? '';
        const valB = b[sortBy] ?? '';
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 1 ? valA - valB : valB - valA;
        }
        return sortOrder === 1
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });

      const total = filtered.length;
      const paginated = filtered.slice(skip, skip + limit);

      return res.json({
        success: true,
        source: 'EmbeddedStore',
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        },
        data: paginated
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. GET /api/stats (High-level Dashboard KPIs)
export const getStats = async (req, res) => {
  try {
    let items;
    if (getIsMongoConnected()) {
      const filter = buildMongoQuery(req.query);
      items = await Insight.find(filter);
    } else {
      items = filterMemoryStore(getMemoryStore(), req.query);
    }

    const total = items.length;
    if (total === 0) {
      return res.json({
        success: true,
        stats: {
          totalInsights: 0,
          avgIntensity: 0,
          avgLikelihood: 0,
          avgRelevance: 0,
          maxIntensity: 0,
          countriesCount: 0,
          sectorsCount: 0,
          topicsCount: 0,
          sourcesCount: 0,
          regionsCount: 0
        }
      });
    }

    let sumIntensity = 0;
    let sumLikelihood = 0;
    let sumRelevance = 0;
    let maxIntensity = 0;

    const countries = new Set();
    const sectors = new Set();
    const topics = new Set();
    const sources = new Set();
    const regions = new Set();

    items.forEach((item) => {
      const int = Number(item.intensity) || 0;
      const lik = Number(item.likelihood) || 0;
      const rel = Number(item.relevance) || 0;

      sumIntensity += int;
      sumLikelihood += lik;
      sumRelevance += rel;
      if (int > maxIntensity) maxIntensity = int;

      if (item.country) countries.add(item.country);
      if (item.sector) sectors.add(item.sector);
      if (item.topic) topics.add(item.topic);
      if (item.source) sources.add(item.source);
      if (item.region) regions.add(item.region);
    });

    res.json({
      success: true,
      stats: {
        totalInsights: total,
        avgIntensity: Number((sumIntensity / total).toFixed(2)),
        avgLikelihood: Number((sumLikelihood / total).toFixed(2)),
        avgRelevance: Number((sumRelevance / total).toFixed(2)),
        maxIntensity,
        countriesCount: countries.size,
        sectorsCount: sectors.size,
        topicsCount: topics.size,
        sourcesCount: sources.size,
        regionsCount: regions.size
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. GET /api/filters/options (All unique filter choices with counts)
export const getFilterOptions = async (req, res) => {
  try {
    let items;
    if (getIsMongoConnected()) {
      items = await Insight.find({});
    } else {
      items = getMemoryStore();
    }

    const counts = {
      end_year: {},
      topic: {},
      sector: {},
      region: {},
      pestle: {},
      source: {},
      swot: {},
      country: {},
      city: {}
    };

    items.forEach((item) => {
      ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'swot', 'country', 'city'].forEach((key) => {
        const val = item[key];
        if (val && String(val).trim() !== '') {
          counts[key][val] = (counts[key][val] || 0) + 1;
        }
      });
    });

    const formatList = (obj) =>
      Object.keys(obj)
        .map((label) => ({ label, count: obj[label] }))
        .sort((a, b) => b.count - a.count);

    res.json({
      success: true,
      options: {
        end_years: Object.keys(counts.end_year).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
        topics: formatList(counts.topic),
        sectors: formatList(counts.sector),
        regions: formatList(counts.region),
        pestles: formatList(counts.pestle),
        sources: formatList(counts.source),
        swots: formatList(counts.swot),
        countries: formatList(counts.country),
        cities: formatList(counts.city)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. GET /api/charts/intensity-timeline
export const getIntensityTimeline = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const yearMap = {};

    items.forEach((item) => {
      const year = item.end_year || item.start_year || 'Unspecified';
      if (!yearMap[year]) {
        yearMap[year] = { count: 0, sumIntensity: 0, sumLikelihood: 0, sumRelevance: 0 };
      }
      yearMap[year].count += 1;
      yearMap[year].sumIntensity += Number(item.intensity) || 0;
      yearMap[year].sumLikelihood += Number(item.likelihood) || 0;
      yearMap[year].sumRelevance += Number(item.relevance) || 0;
    });

    const sortedYears = Object.keys(yearMap).sort((a, b) => {
      if (a === 'Unspecified') return 1;
      if (b === 'Unspecified') return -1;
      return a.localeCompare(b, undefined, { numeric: true });
    });

    const data = sortedYears.map((year) => ({
      year,
      count: yearMap[year].count,
      avgIntensity: Number((yearMap[year].sumIntensity / yearMap[year].count).toFixed(2)),
      avgLikelihood: Number((yearMap[year].sumLikelihood / yearMap[year].count).toFixed(2)),
      avgRelevance: Number((yearMap[year].sumRelevance / yearMap[year].count).toFixed(2))
    }));

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. GET /api/charts/sector-distribution
export const getSectorDistribution = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const sectorMap = {};
    items.forEach((item) => {
      const sector = item.sector || 'Others';
      if (!sectorMap[sector]) {
        sectorMap[sector] = { count: 0, sumIntensity: 0, sumRelevance: 0 };
      }
      sectorMap[sector].count += 1;
      sectorMap[sector].sumIntensity += Number(item.intensity) || 0;
      sectorMap[sector].sumRelevance += Number(item.relevance) || 0;
    });

    const data = Object.keys(sectorMap)
      .map((sector) => ({
        sector,
        count: sectorMap[sector].count,
        avgIntensity: Number((sectorMap[sector].sumIntensity / sectorMap[sector].count).toFixed(2)),
        avgRelevance: Number((sectorMap[sector].sumRelevance / sectorMap[sector].count).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 6. GET /api/charts/region-analysis
export const getRegionAnalysis = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const regionMap = {};
    items.forEach((item) => {
      const region = item.region || 'Unknown Region';
      if (!regionMap[region]) {
        regionMap[region] = { count: 0, sumIntensity: 0, sumLikelihood: 0, sumRelevance: 0 };
      }
      regionMap[region].count += 1;
      regionMap[region].sumIntensity += Number(item.intensity) || 0;
      regionMap[region].sumLikelihood += Number(item.likelihood) || 0;
      regionMap[region].sumRelevance += Number(item.relevance) || 0;
    });

    const data = Object.keys(regionMap)
      .map((region) => ({
        region,
        count: regionMap[region].count,
        avgIntensity: Number((regionMap[region].sumIntensity / regionMap[region].count).toFixed(2)),
        avgLikelihood: Number((regionMap[region].sumLikelihood / regionMap[region].count).toFixed(2)),
        avgRelevance: Number((regionMap[region].sumRelevance / regionMap[region].count).toFixed(2))
      }))
      .sort((a, b) => b.avgIntensity - a.avgIntensity);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 7. GET /api/charts/pestle-matrix
export const getPestleMatrix = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const pestleMap = {};
    items.forEach((item) => {
      const p = item.pestle || 'General / Unclassified';
      if (!pestleMap[p]) {
        pestleMap[p] = { count: 0, sumIntensity: 0, sumLikelihood: 0, sumRelevance: 0 };
      }
      pestleMap[p].count += 1;
      pestleMap[p].sumIntensity += Number(item.intensity) || 0;
      pestleMap[p].sumLikelihood += Number(item.likelihood) || 0;
      pestleMap[p].sumRelevance += Number(item.relevance) || 0;
    });

    const data = Object.keys(pestleMap)
      .map((pestle) => ({
        pestle,
        count: pestleMap[pestle].count,
        avgIntensity: Number((pestleMap[pestle].sumIntensity / pestleMap[pestle].count).toFixed(2)),
        avgLikelihood: Number((pestleMap[pestle].sumLikelihood / pestleMap[pestle].count).toFixed(2)),
        avgRelevance: Number((pestleMap[pestle].sumRelevance / pestleMap[pestle].count).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 8. GET /api/charts/relevance-likelihood (Scatter / Correlation Matrix)
export const getRelevanceLikelihood = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    // Limit to top 250 sample points for high rendering speed and optimal readability
    const data = items.slice(0, 300).map((item) => ({
      id: item._id,
      x: Number(item.likelihood) || 0,
      y: Number(item.relevance) || 0,
      r: Math.max(4, Math.min(24, ((Number(item.intensity) || 1) / 3) + 3)),
      intensity: Number(item.intensity) || 0,
      title: item.title,
      topic: item.topic || 'General',
      sector: item.sector || 'Unassigned',
      country: item.country || 'Global'
    }));

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 9. GET /api/charts/country-rankings
export const getCountryRankings = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const countryMap = {};
    items.forEach((item) => {
      const country = item.country || 'Global / Unspecified';
      if (!countryMap[country]) {
        countryMap[country] = { count: 0, sumIntensity: 0, sumLikelihood: 0, sumRelevance: 0 };
      }
      countryMap[country].count += 1;
      countryMap[country].sumIntensity += Number(item.intensity) || 0;
      countryMap[country].sumLikelihood += Number(item.likelihood) || 0;
      countryMap[country].sumRelevance += Number(item.relevance) || 0;
    });

    const data = Object.keys(countryMap)
      .map((country) => ({
        country,
        count: countryMap[country].count,
        avgIntensity: Number((countryMap[country].sumIntensity / countryMap[country].count).toFixed(2)),
        avgLikelihood: Number((countryMap[country].sumLikelihood / countryMap[country].count).toFixed(2)),
        avgRelevance: Number((countryMap[country].sumRelevance / countryMap[country].count).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 10. GET /api/charts/topic-cloud
export const getTopTopics = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const topicMap = {};
    items.forEach((item) => {
      const topic = item.topic || 'General';
      if (!topicMap[topic]) {
        topicMap[topic] = { count: 0, sumIntensity: 0 };
      }
      topicMap[topic].count += 1;
      topicMap[topic].sumIntensity += Number(item.intensity) || 0;
    });

    const data = Object.keys(topicMap)
      .map((topic) => ({
        topic,
        count: topicMap[topic].count,
        avgIntensity: Number((topicMap[topic].sumIntensity / topicMap[topic].count).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 11. GET /api/charts/swot-distribution
export const getSwotDistribution = async (req, res) => {
  try {
    let items = getIsMongoConnected()
      ? await Insight.find(buildMongoQuery(req.query))
      : filterMemoryStore(getMemoryStore(), req.query);

    const swotMap = {};
    items.forEach((item) => {
      const swot = item.swot || 'Unspecified';
      if (!swotMap[swot]) {
        swotMap[swot] = { count: 0, sumIntensity: 0 };
      }
      swotMap[swot].count += 1;
      swotMap[swot].sumIntensity += Number(item.intensity) || 0;
    });

    const data = Object.keys(swotMap).map((swot) => ({
      swot,
      count: swotMap[swot].count,
      avgIntensity: Number((swotMap[swot].sumIntensity / swotMap[swot].count).toFixed(2))
    }));

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
