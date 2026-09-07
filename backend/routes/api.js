import express from 'express';
import {
  getInsights,
  getStats,
  getFilterOptions,
  getIntensityTimeline,
  getSectorDistribution,
  getRegionAnalysis,
  getPestleMatrix,
  getRelevanceLikelihood,
  getCountryRankings,
  getTopTopics,
  getSwotDistribution
} from '../controllers/insightController.js';

const router = express.Router();

// Core Data & Filter APIs
router.get('/data', getInsights);
router.get('/stats', getStats);
router.get('/filters/options', getFilterOptions);

// Aggregated Chart APIs
router.get('/charts/intensity-timeline', getIntensityTimeline);
router.get('/charts/sector-distribution', getSectorDistribution);
router.get('/charts/region-analysis', getRegionAnalysis);
router.get('/charts/pestle-matrix', getPestleMatrix);
router.get('/charts/relevance-likelihood', getRelevanceLikelihood);
router.get('/charts/country-rankings', getCountryRankings);
router.get('/charts/top-topics', getTopTopics);
router.get('/charts/swot-distribution', getSwotDistribution);

export default router;
