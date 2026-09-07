import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Compass } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RegionBarChart({ data = [], isDark = false }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No regional data available
      </div>
    );
  }

  const displayData = data.slice(0, 10);
  const labels = displayData.map((d) => d.region);
  const intensityValues = displayData.map((d) => d.avgIntensity);
  const counts = displayData.map((d) => d.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Avg Intensity',
        data: intensityValues,
        backgroundColor: '#2563EB',
        borderRadius: 4,
        hoverBackgroundColor: '#1D4ED8'
      },
      {
        label: 'Avg Likelihood (x3)',
        data: displayData.map((d) => d.avgLikelihood * 3),
        backgroundColor: '#0EA5E9',
        borderRadius: 4,
        hoverBackgroundColor: '#0284C7'
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 10, weight: '600' },
          usePointStyle: true,
          boxWidth: 7
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 8,
        callbacks: {
          afterBody: (items) => {
            const index = items[0]?.dataIndex;
            return `Sample Count: ${counts[index]} records`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)'
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 10 }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 10, weight: '500' }
        }
      }
    }
  };

  return (
    <div className="card-panel p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              Regional Impact Ranking
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Geographical areas sorted by forecast intensity
            </p>
          </div>
        </div>
        <span className="badge badge-primary text-[10px]">Geographic</span>
      </div>
      <div className="flex-1 min-h-[250px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
