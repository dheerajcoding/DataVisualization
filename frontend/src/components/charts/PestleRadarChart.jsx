import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ShieldCheck } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function PestleRadarChart({ data = [], isDark = false }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No PESTLE factors data available
      </div>
    );
  }

  const labels = data.map((d) => d.pestle);
  const intensityScores = data.map((d) => d.avgIntensity);
  const likelihoodScores = data.map((d) => d.avgLikelihood * 4);
  const relevanceScores = data.map((d) => d.avgRelevance * 4);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Avg Intensity',
        data: intensityScores,
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderColor: '#2563EB',
        pointBackgroundColor: '#2563EB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2563EB',
        borderWidth: 2
      },
      {
        label: 'Scaled Likelihood (x4)',
        data: likelihoodScores,
        backgroundColor: 'rgba(5, 150, 105, 0.12)',
        borderColor: '#059669',
        pointBackgroundColor: '#059669',
        pointBorderColor: '#fff',
        borderWidth: 1.5,
        borderDash: [2, 2]
      },
      {
        label: 'Scaled Relevance (x4)',
        data: relevanceScores,
        backgroundColor: 'rgba(217, 119, 6, 0.12)',
        borderColor: '#D97706',
        pointBackgroundColor: '#D97706',
        pointBorderColor: '#fff',
        borderWidth: 1.5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
        },
        pointLabels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 10, weight: '600' }
        },
        ticks: {
          backdropColor: 'transparent',
          color: isDark ? '#64748b' : '#94a3b8',
          font: { size: 9 },
          stepSize: 5
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 10, weight: '500' },
          usePointStyle: true,
          boxWidth: 6
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
    }
  };

  return (
    <div className="card-panel p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              PESTLE Macro Analysis
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Multi-factor assessment across drivers
            </p>
          </div>
        </div>
        <span className="badge badge-primary text-[10px]">Radar Model</span>
      </div>
      <div className="flex-1 min-h-[250px]">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
}
