import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Zap } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SwotChart({ data = [], isDark = false }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No SWOT analysis data available
      </div>
    );
  }

  const labels = data.map((d) => d.swot || 'General');
  const counts = data.map((d) => d.count);
  const intensities = data.map((d) => d.avgIntensity);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Volume',
        data: counts,
        backgroundColor: '#2563EB',
        borderRadius: 4
      },
      {
        label: 'Avg Intensity',
        data: intensities,
        backgroundColor: '#059669',
        borderRadius: 4
      }
    ]
  };

  const options = {
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
        padding: 8
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 10 }
        }
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)'
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className="card-panel p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              SWOT Factor Distribution
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Categorical breakdown of SWOT parameters
            </p>
          </div>
        </div>
        <span className="badge badge-primary text-[10px]">Strategic</span>
      </div>
      <div className="flex-1 min-h-[220px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
