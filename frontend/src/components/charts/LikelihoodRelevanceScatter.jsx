import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Target } from 'lucide-react';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function LikelihoodRelevanceScatter({ data = [], isDark = false }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No correlation points available for current filters
      </div>
    );
  }

  const chartData = {
    datasets: [
      {
        label: 'Market Insights',
        data: data.map((d) => ({
          x: d.x,
          y: d.y,
          r: d.r,
          intensity: d.intensity,
          title: d.title,
          topic: d.topic,
          country: d.country,
          sector: d.sector
        })),
        backgroundColor: (context) => {
          const item = context.raw;
          if (!item) return 'rgba(37, 99, 235, 0.6)';
          if (item.intensity > 30) return 'rgba(225, 29, 72, 0.7)';
          if (item.intensity > 15) return 'rgba(217, 119, 6, 0.7)';
          if (item.intensity > 8) return 'rgba(37, 99, 235, 0.7)';
          return 'rgba(5, 150, 105, 0.7)';
        },
        borderColor: isDark ? '#1e293b' : '#ffffff',
        borderWidth: 1.5,
        hoverBorderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          title: (items) => {
            const raw = items[0]?.raw;
            return raw?.title ? (raw.title.length > 55 ? raw.title.slice(0, 55) + '...' : raw.title) : 'Insight';
          },
          label: (item) => {
            const raw = item.raw;
            return [
              `Likelihood (X): ${raw.x} / 5`,
              `Relevance (Y): ${raw.y} / 5`,
              `Intensity: ${raw.intensity}`,
              `Domain: ${raw.topic} | ${raw.sector}`,
              `Country: ${raw.country}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Likelihood Score (1 to 5)',
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 11, weight: 'bold' }
        },
        min: 0,
        max: 5.5,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)'
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 10 },
          stepSize: 1
        }
      },
      y: {
        title: {
          display: true,
          text: 'Relevance Score (1 to 5)',
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 11, weight: 'bold' }
        },
        min: 0,
        max: 5.5,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)'
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 10 },
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="card-panel p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              Likelihood vs. Relevance Matrix
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Bubble size represents intensity impact
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
          <span className="text-[var(--text-muted)]">High Impact</span>
          <span className="w-2 h-2 rounded-full bg-[#2563EB] ml-2"></span>
          <span className="text-[var(--text-muted)]">Medium</span>
        </div>
      </div>
      <div className="flex-1 min-h-[270px]">
        <Bubble data={chartData} options={options} />
      </div>
    </div>
  );
}
