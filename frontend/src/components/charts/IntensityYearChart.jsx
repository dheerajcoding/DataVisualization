import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function IntensityYearChart({ data = [], isDark = false }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No timeline data available for current filters
      </div>
    );
  }

  const labels = data.map((d) => d.year);
  const intensityData = data.map((d) => d.avgIntensity);
  const likelihoodData = data.map((d) => d.avgLikelihood);
  const relevanceData = data.map((d) => d.avgRelevance);

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Avg Intensity',
        data: intensityData,
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#2563EB',
        pointHoverRadius: 5,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: 'Avg Likelihood',
        data: likelihoodData,
        borderColor: '#059669',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [3, 3],
        tension: 0.3,
        pointBackgroundColor: '#059669',
        yAxisID: 'y1'
      },
      {
        type: 'line',
        label: 'Avg Relevance',
        data: relevanceData,
        borderColor: '#D97706',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: '#D97706',
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '600' },
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
        padding: 10,
        boxPadding: 4,
        usePointStyle: true
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
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Intensity Scale',
          color: '#2563EB',
          font: { size: 11, weight: 'bold' }
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)'
        },
        ticks: {
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 10 }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Score (1 - 5)',
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 11, weight: 'bold' }
        },
        grid: {
          drawOnChartArea: false
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
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              Temporal Dynamics (Intensity & Scores over Years)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Evolution of forecast indicators over timeline horizons
            </p>
          </div>
        </div>
        <span className="badge badge-primary text-[10px]">Timeline Trends</span>
      </div>
      <div className="flex-1 min-h-[270px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
