import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Insight from './models/Insight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const seedData = async (force = false) => {
  try {
    const count = await Insight.countDocuments();
    if (count > 0 && !force) {
      console.log(`[Seeder] MongoDB already contains ${count} insights. Skipping seed.`);
      return;
    }

    const jsonPath = path.resolve(__dirname, '../jsondata.json');
    if (!fs.existsSync(jsonPath)) {
      console.error(`[Seeder] jsondata.json not found at ${jsonPath}`);
      return;
    }

    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const items = JSON.parse(rawData);

    if (force) {
      await Insight.deleteMany({});
      console.log('[Seeder] Cleared existing records.');
    }

    const sanitized = items.map((item) => ({
      end_year: item.end_year ? String(item.end_year).trim() : '',
      intensity: typeof item.intensity === 'number' ? item.intensity : parseInt(item.intensity, 10) || 0,
      sector: item.sector ? String(item.sector).trim() : '',
      topic: item.topic ? String(item.topic).trim() : '',
      insight: item.insight ? String(item.insight).trim() : '',
      url: item.url ? String(item.url).trim() : '',
      region: item.region ? String(item.region).trim() : '',
      start_year: item.start_year ? String(item.start_year).trim() : '',
      impact: item.impact ? String(item.impact).trim() : '',
      added: item.added ? String(item.added).trim() : '',
      published: item.published ? String(item.published).trim() : '',
      country: item.country ? String(item.country).trim() : '',
      relevance: typeof item.relevance === 'number' ? item.relevance : parseInt(item.relevance, 10) || 0,
      pestle: item.pestle ? String(item.pestle).trim() : '',
      source: item.source ? String(item.source).trim() : '',
      title: item.title ? String(item.title).trim() : '',
      likelihood: typeof item.likelihood === 'number' ? item.likelihood : parseInt(item.likelihood, 10) || 0,
      swot: item.swot ? String(item.swot).trim() : '',
      city: item.city ? String(item.city).trim() : ''
    }));

    await Insight.insertMany(sanitized);
    console.log(`🎉 [Seeder] Successfully imported ${sanitized.length} records into MongoDB!`);
  } catch (err) {
    console.error('[Seeder] Error seeding database:', err.message);
  }
};

// Standalone execution check
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blackcoffer_insights';
  mongoose
    .connect(uri)
    .then(async () => {
      console.log('Connected to MongoDB for standalone seeding...');
      await seedData(true);
      await mongoose.disconnect();
      console.log('Seeder complete. Disconnected.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeder connection error:', err.message);
      process.exit(1);
    });
}
