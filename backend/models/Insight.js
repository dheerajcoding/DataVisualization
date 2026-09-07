import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema(
  {
    end_year: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    intensity: {
      type: Number,
      default: 0,
      index: true
    },
    sector: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    topic: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    insight: {
      type: String,
      default: '',
      trim: true
    },
    url: {
      type: String,
      default: '',
      trim: true
    },
    region: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    start_year: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    impact: {
      type: String,
      default: '',
      trim: true
    },
    added: {
      type: String,
      default: ''
    },
    published: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    relevance: {
      type: Number,
      default: 0,
      index: true
    },
    pestle: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    source: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    title: {
      type: String,
      default: '',
      trim: true
    },
    likelihood: {
      type: Number,
      default: 0,
      index: true
    },
    swot: {
      type: String,
      default: '',
      trim: true,
      index: true
    },
    city: {
      type: String,
      default: '',
      trim: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Add text index for fast keyword search across title, insight, topic, source
insightSchema.index({
  title: 'text',
  insight: 'text',
  topic: 'text',
  source: 'text',
  country: 'text'
});

const Insight = mongoose.models.Insight || mongoose.model('Insight', insightSchema);

export default Insight;
