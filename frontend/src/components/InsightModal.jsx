import React from 'react';
import { 
  X, 
  ExternalLink, 
  Calendar, 
  Globe2, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Target, 
  TrendingUp 
} from 'lucide-react';

export default function InsightModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="card-panel max-w-2xl w-full bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl rounded-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-[var(--border-color)] flex items-start justify-between bg-[var(--bg-subtle)]">
          <div className="space-y-1 pr-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {item.sector && <span className="badge badge-primary">{item.sector}</span>}
              {item.topic && <span className="badge badge-info">{item.topic}</span>}
              {item.pestle && <span className="badge badge-success">{item.pestle}</span>}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] leading-snug mt-1.5">
              {item.title || 'Insight Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="btn-icon rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] w-7 h-7"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* Metrics Pill Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex flex-col items-center text-center">
              <Flame className="w-4 h-4 text-[#2563EB] mb-0.5" />
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Intensity</span>
              <span className="text-lg font-extrabold text-[#2563EB]">{item.intensity || 0}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#ECFDF5] border border-[#D1FAE5] flex flex-col items-center text-center">
              <TrendingUp className="w-4 h-4 text-[#059669] mb-0.5" />
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Likelihood</span>
              <span className="text-lg font-extrabold text-[#059669]">{item.likelihood || 0} / 5</span>
            </div>
            <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FEF3C7] flex flex-col items-center text-center">
              <Target className="w-4 h-4 text-[#D97706] mb-0.5" />
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Relevance</span>
              <span className="text-lg font-extrabold text-[#D97706]">{item.relevance || 0} / 5</span>
            </div>
          </div>

          {/* Insight Summary */}
          {item.insight && (
            <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)]">
              <h4 className="text-xs font-bold text-[var(--text-heading)] uppercase tracking-wider mb-1">
                Executive Insight Summary
              </h4>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                {item.insight}
              </p>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[var(--text-muted)]">Country:</span>
                <span className="font-semibold text-[var(--text-heading)]">{item.country || 'Global / Unspecified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span className="text-[var(--text-muted)]">Region / City:</span>
                <span className="font-semibold text-[var(--text-heading)]">
                  {item.region || 'Unknown'} {item.city ? `(${item.city})` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#059669]" />
                <span className="text-[var(--text-muted)]">Timeline Horizon:</span>
                <span className="font-semibold text-[var(--text-heading)]">
                  {item.start_year || 'N/A'} - {item.end_year || 'N/A'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0284C7]" />
                <span className="text-[var(--text-muted)]">Source:</span>
                <span className="font-semibold text-[var(--text-heading)]">{item.source || 'Unknown Source'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
                <span className="text-[var(--text-muted)]">PESTLE Pillar:</span>
                <span className="font-semibold text-[var(--text-heading)]">{item.pestle || 'General'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#E11D48]" />
                <span className="text-[var(--text-muted)]">SWOT Factor:</span>
                <span className="font-semibold text-[var(--text-heading)]">{item.swot || 'Unspecified'}</span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="p-2.5 rounded-md bg-[var(--bg-subtle)] flex flex-wrap items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Added: <strong className="text-[var(--text-primary)]">{item.added || 'N/A'}</strong></span>
            <span>Published: <strong className="text-[var(--text-primary)]">{item.published || 'N/A'}</strong></span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">Record ID: {item._id}</span>
          <div className="flex items-center gap-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-xs"
              >
                <span>Read Full Report</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="btn btn-secondary text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
