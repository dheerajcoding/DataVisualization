import React from 'react';
import { 
  FileText, 
  Flame, 
  TrendingUp, 
  Target, 
  Globe2, 
  Layers, 
  ArrowUpRight
} from 'lucide-react';

export default function KpiCards({ stats = {}, totalUniverse = 1000 }) {
  const {
    totalInsights = 0,
    avgIntensity = 0,
    avgLikelihood = 0,
    avgRelevance = 0,
    maxIntensity = 0,
    countriesCount = 0,
    sectorsCount = 0,
    topicsCount = 0
  } = stats;

  const cards = [
    {
      title: 'Total Insights',
      value: totalInsights.toLocaleString(),
      subtitle: `${((totalInsights / (totalUniverse || 1)) * 100).toFixed(0)}% dataset matched`,
      icon: FileText,
      iconColor: 'text-[#2563EB]',
      bgColor: 'bg-[#EFF6FF]',
      badge: 'Database',
      badgeColor: 'badge-primary'
    },
    {
      title: 'Avg. Intensity',
      value: avgIntensity,
      subtitle: `Peak score: ${maxIntensity}`,
      icon: Flame,
      iconColor: 'text-[#E11D48]',
      bgColor: 'bg-[#FFF1F2]',
      badge: 'Severity',
      badgeColor: 'badge-danger'
    },
    {
      title: 'Avg. Likelihood',
      value: `${avgLikelihood} / 5`,
      subtitle: 'Confidence score',
      icon: TrendingUp,
      iconColor: 'text-[#059669]',
      bgColor: 'bg-[#ECFDF5]',
      badge: 'Probability',
      badgeColor: 'badge-success'
    },
    {
      title: 'Avg. Relevance',
      value: `${avgRelevance} / 5`,
      subtitle: 'Strategic alignment',
      icon: Target,
      iconColor: 'text-[#D97706]',
      bgColor: 'bg-[#FFFBEB]',
      badge: 'Relevance',
      badgeColor: 'badge-warning'
    },
    {
      title: 'Active Countries',
      value: countriesCount,
      subtitle: 'Global territory span',
      icon: Globe2,
      iconColor: 'text-[#0284C7]',
      bgColor: 'bg-[#F0F9FF]',
      badge: 'Global',
      badgeColor: 'badge-info'
    },
    {
      title: 'Sectors & Topics',
      value: `${sectorsCount} / ${topicsCount}`,
      subtitle: 'Industries & themes',
      icon: Layers,
      iconColor: 'text-[#4F46E5]',
      bgColor: 'bg-[#EEF2FF]',
      badge: 'Sectors',
      badgeColor: 'badge-primary'
    }
  ];

  return (
    <div className="kpi-grid mb-5">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="card-panel p-4 flex flex-col justify-between group hover:-translate-y-0.5 transition-all duration-150 border border-[var(--border-color)] bg-[var(--bg-surface)]"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className={`badge ${card.badgeColor} text-[10px]`}>
                {card.badge}
              </span>
              <div
                className={`w-8 h-8 rounded-lg ${card.bgColor} ${card.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                {card.title}
              </p>
              <h3 className="text-2xl font-extrabold text-[var(--text-heading)] tracking-tight font-heading">
                {card.value}
              </h3>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>{card.subtitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-disabled)] group-hover:text-[var(--color-primary)] transition-colors" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
