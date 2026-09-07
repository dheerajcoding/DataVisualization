import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedData } from './seeder.js';
import apiRoutes from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Mount API routes
app.use('/api', apiRoutes);

// Health check root
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    project: 'Data Visualization Dashboard API',
    endpoints: [
      '/api/stats',
      '/api/data',
      '/api/filters/options',
      '/api/charts/intensity-timeline',
      '/api/charts/sector-distribution',
      '/api/charts/region-analysis',
      '/api/charts/pestle-matrix',
      '/api/charts/relevance-likelihood',
      '/api/charts/country-rankings',
      '/api/charts/top-topics',
      '/api/charts/swot-distribution'
    ]
  });
});

// Start Server & Connect Database
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`🚀 Dashboard API Server running at: http://localhost:${PORT}`);
    console.log(`📊 API Health Endpoint: http://localhost:${PORT}/api/stats`);
  });

  try {
    const dbConnected = await connectDB();
    if (dbConnected) {
      await seedData();
    }
  } catch (err) {
    console.log('MongoDB initialization handled with fallback.');
  }
};

startServer();
