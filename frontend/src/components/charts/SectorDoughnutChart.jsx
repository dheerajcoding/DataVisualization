import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Layers } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const SECTOR_PALETTE = [
  '#2563EB', // Sapphire Blue
  '#0EA5E9', // Sky Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#64748B'  // Slate
];

export default function SectorDoughnutChart({ data = [], isDark = false }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No sector distribution data available
      </div>
    );
  }

  const top7 = data.slice(0, 7);
  const remainingCount = data.slice(7).reduce((acc, curr) => acc + curr.count, 0);

  const displayData = [...top7];
  if (remainingCount > 0) {
    displayData.push({
      sector: 'Other Verticals',
      count: remainingCount,
      avgIntensity: 0
    });
  }

  const labels = displayData.map((d) => d.sector);
  const counts = displayData.map((d) => d.count);
  const totalCount = counts.reduce((a, b) => a + b, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: SECTOR_PALETTE.slice(0, displayData.length),
        borderColor: isDark ? '#1e293b' : '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 10, weight: '500' },
          usePointStyle: true,
          boxWidth: 7,
          padding: 8
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
          label: (context) => {
            const count = context.raw;
            const percentage = ((count / totalCount) * 100).toFixed(1);
            return ` ${context.label}: ${count} insights (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="card-panel p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              Sector Share & Distribution
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Proportional breakdown of industry verticals
            </p>
          </div>
        </div>
        <span className="badge badge-primary text-[10px]">
          {data.length} Sectors
        </span>
      </div>
      <div className="flex-1 min-h-[250px] relative flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
        <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-xl font-extrabold text-[var(--text-heading)]">
            {totalCount}
          </span>
          <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)]">
            Insights
          </span>
        </div>
      </div>
    </div>
  );
}
