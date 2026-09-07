import React from 'react';
import { Tag } from 'lucide-react';

export default function TopTopicsChart({ data = [], onSelectTopic }) {
  if (!data || data.length === 0) {
    return (
      <div className="card-panel h-80 flex items-center justify-center text-xs text-[var(--text-muted)] italic">
        No topics data available
      </div>
    );
  }

  const top10 = data.slice(0, 10);

  return (
    <div className="card-panel p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              Trending Analytical Topics
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Click any topic to apply filter
            </p>
          </div>
        </div>
        <span className="badge badge-info text-[10px]">Top Topics</span>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {top10.map((item) => {
          const maxCount = top10[0]?.count || 1;
          const pct = Math.min(100, Math.round((item.count / maxCount) * 100));

          return (
            <div
              key={item.topic}
              onClick={() => onSelectTopic && onSelectTopic(item.topic)}
              className="p-2 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-active)] cursor-pointer transition-all border border-[var(--border-subtle)] hover:border-[#2563EB] group"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors capitalize">
                  {item.topic}
                </span>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-[var(--text-muted)]">{item.count} items</span>
                  <span className="badge badge-primary text-[10px] px-1.5 py-0.2">
                    Score: {item.avgIntensity}
                  </span>
                </div>
              </div>
              <div className="w-full bg-[var(--border-color)] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
