import React from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  BarChart2, 
  ArrowUpRight, 
  Zap,
  Globe2,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function VuexyHeroCard({ stats = {}, onOpenFilters, onApplyPreset }) {
  const { totalInsights = 1000, avgIntensity = 9.85, maxIntensity = 96, countriesCount = 56, sectorsCount = 18 } = stats;

  return (
    <div className="card-panel p-6 relative overflow-hidden bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--color-primary-tint)] border border-[var(--border-color)] mb-6 shadow-md">
      
      {/* Background Decorative Rings */}
      <div className="absolute right-[-60px] top-[-60px] w-96 h-96 rounded-full border border-[#7367F018] pointer-events-none"></div>
      <div className="absolute right-[-20px] top-[-20px] w-64 h-64 rounded-full border border-[#7367F025] pointer-events-none"></div>
      <div className="absolute right-24 top-10 w-32 h-32 rounded-full bg-gradient-to-tr from-[#7367F015] to-[#ce9ffc25] blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Greeting & Action */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7367F015] border border-[#7367F030] text-[#7367F0] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Vuexy Analytics Intelligence 👋</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">
              Interactive Market & Global Forecasts
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1.5 max-w-xl leading-relaxed">
              Explore dynamic multi-dimensional macroeconomic insights across <strong className="text-[var(--text-heading)]">{countriesCount} countries</strong>, <strong className="text-[var(--text-heading)]">{sectorsCount} industry sectors</strong>, and historical to long-term projections.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
              <span className="text-[var(--text-muted)]">Active Records:</span>
              <strong className="text-[var(--text-heading)]">{totalInsights.toLocaleString()}</strong>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs">
              <Flame className="w-4 h-4 text-[#EA5455]" />
              <span className="text-[var(--text-muted)]">Peak Intensity:</span>
              <strong className="text-[var(--text-heading)]">{maxIntensity}</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenFilters}
              className="btn btn-primary"
            >
              <Zap className="w-4 h-4" />
              <span>Explore All Filters</span>
            </button>
            <button
              onClick={() => onApplyPreset && onApplyPreset('energy')}
              className="btn btn-secondary text-xs"
            >
              <span>⚡ View Energy Insights</span>
            </button>
          </div>
        </div>

        {/* Right Column: Floating Vuexy KPI Widgets (Matching the screenshot aesthetic) */}
        <div className="lg:col-span-5 flex flex-row sm:flex-row items-center justify-center lg:justify-end gap-4">
          
          {/* Floating Widget 1: Profit / Severity Sparkline Card */}
          <div className="floating-mini-card p-4 w-44 sm:w-48 animate-float">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[var(--text-heading)]">Impact Trend</span>
              <span className="badge badge-success text-[10px] px-1.5 py-0.2">+8.24%</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mb-2">Intensity Score</p>
            
            {/* Mini SVG Sparkline */}
            <div className="h-10 w-full my-1">
              <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00CFE8" />
                    <stop offset="100%" stopColor="#7367F0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5 28 L 22 14 L 38 24 L 55 10 L 72 20 L 92 6"
                  fill="none"
                  stroke="url(#sparklineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="92" cy="6" r="4" fill="#00CFE8" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[var(--border-subtle)]">
              <span className="text-lg font-bold text-[var(--text-heading)]">{avgIntensity}</span>
              <span className="text-[10px] text-[#28C76F] font-semibold flex items-center">
                <ArrowUpRight className="w-3 h-3 inline" /> High
              </span>
            </div>
          </div>

          {/* Floating Widget 2: Volume / Forecast Bar Card */}
          <div className="floating-mini-card p-4 w-44 sm:w-48" style={{ animation: 'floatSoft 4.5s ease-in-out infinite 0.5s' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[var(--text-heading)]">Confidence</span>
              <span className="badge badge-primary text-[10px] px-1.5 py-0.2">+12.6%</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mb-2">Likelihood Metric</p>

            {/* Mini Bar Graphic */}
            <div className="h-10 flex items-end justify-between gap-1.5 px-1 my-1">
              <div className="w-2.5 h-6 bg-[#7367F080] rounded-t-sm"></div>
              <div className="w-2.5 h-8 bg-[#7367F0] rounded-t-sm"></div>
              <div className="w-2.5 h-4 bg-[#7367F050] rounded-t-sm"></div>
              <div className="w-2.5 h-9 bg-[#7367F0] rounded-t-sm"></div>
              <div className="w-2.5 h-7 bg-[#7367F090] rounded-t-sm"></div>
              <div className="w-2.5 h-10 bg-[#7367F0] rounded-t-sm"></div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[var(--border-subtle)]">
              <span className="text-lg font-bold text-[var(--text-heading)]">3.04 / 5</span>
              <span className="text-[10px] text-[#7367F0] font-semibold">Reliable</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
