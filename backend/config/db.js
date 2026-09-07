import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import dns from 'dns';

// Configure DNS for MongoDB Atlas SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if permissions or platform restricts
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

let isMongoConnected = false;
let memoryStore = [];

export const getIsMongoConnected = () => isMongoConnected;
export const getMemoryStore = () => memoryStore;

export const loadMemoryStore = () => {
  try {
    const jsonPath = path.resolve(__dirname, '../../jsondata.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      const parsed = JSON.parse(raw);
      memoryStore = parsed.map((item, idx) => ({
        _id: String(idx + 1),
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
      console.log(`[MemoryStore] Loaded ${memoryStore.length} records as data store fallback.`);
    }
  } catch (err) {
    console.error('[MemoryStore] Failed to load JSON data:', err.message);
  }
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blackcoffer_insights';
  // Always initialize memory fallback first so the app is instantly ready
  loadMemoryStore();

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    isMongoConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.log(`ℹ️  MongoDB instance not detected at "${uri}" (using embedded resilient store with 1,000 records).`);
    console.log(`ℹ️  To connect to MongoDB Atlas or local MongoDB, set MONGODB_URI in backend/.env`);
    return false;
  }
};
