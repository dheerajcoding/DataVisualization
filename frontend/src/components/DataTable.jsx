import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  ExternalLink, 
  Eye, 
  Table as TableIcon,
  Flame,
  Globe2
} from 'lucide-react';

export default function DataTable({
  data = [],
  pagination = {},
  onPageChange,
  onLimitChange,
  sortBy,
  sortOrder,
  onSortChange,
  onSelectInsight
}) {
  const { page = 1, totalPages = 1, total = 0, limit = 10 } = pagination;

  const renderSortIndicator = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 text-[var(--text-disabled)] inline ml-1 opacity-50" />;
    }
    return (
      <span className="text-[#2563EB] font-bold text-xs inline ml-1">
        {sortOrder === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="card-panel flex flex-col">
      {/* Table Header */}
      <div className="card-header flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <TableIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              Filtered Insights Data Explorer
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Showing {data.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
              {Math.min(page * limit, total)} of {total.toLocaleString()} records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Rows:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="form-select py-1 px-2 text-xs rounded-md w-auto"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <span className="badge badge-primary text-[11px]">
            Page {page} of {totalPages || 1}
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-bold uppercase tracking-wider border-b border-[var(--border-color)]">
              <th
                onClick={() => onSortChange('title')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)]"
              >
                Insight & Forecast {renderSortIndicator('title')}
              </th>
              <th
                onClick={() => onSortChange('intensity')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)] text-center"
              >
                Intensity {renderSortIndicator('intensity')}
              </th>
              <th
                onClick={() => onSortChange('likelihood')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)] text-center"
              >
                Likelihood {renderSortIndicator('likelihood')}
              </th>
              <th
                onClick={() => onSortChange('relevance')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)] text-center"
              >
                Relevance {renderSortIndicator('relevance')}
              </th>
              <th
                onClick={() => onSortChange('sector')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)]"
              >
                Sector / Topic {renderSortIndicator('sector')}
              </th>
              <th
                onClick={() => onSortChange('country')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)]"
              >
                Country / Region {renderSortIndicator('country')}
              </th>
              <th
                onClick={() => onSortChange('end_year')}
                className="p-3 cursor-pointer hover:text-[var(--text-heading)] text-center"
              >
                End Year {renderSortIndicator('end_year')}
              </th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-xs text-[var(--text-muted)] italic">
                  No records match current filter criteria.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id || item.id}
                  className="hover:bg-[var(--bg-subtle)] transition-colors group cursor-pointer"
                  onClick={() => onSelectInsight(item)}
                >
                  <td className="p-3 max-w-sm">
                    <p className="font-semibold text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {item.title || item.insight || 'Untitled Insight'}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[var(--text-muted)]">
                      {item.source && <span className="font-medium text-[var(--text-primary)]">{item.source}</span>}
                      {item.pestle && <span>• {item.pestle}</span>}
                    </div>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`badge ${
                        item.intensity > 30
                          ? 'badge-danger'
                          : item.intensity > 12
                          ? 'badge-warning'
                          : 'badge-primary'
                      }`}
                    >
                      <Flame className="w-3 h-3 inline mr-0.5" />
                      {item.intensity || 0}
                    </span>
                  </td>

                  <td className="p-3 text-center font-medium text-[var(--text-heading)]">
                    {item.likelihood || 0} / 5
                  </td>

                  <td className="p-3 text-center font-medium text-[var(--text-heading)]">
                    {item.relevance || 0} / 5
                  </td>

                  <td className="p-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-[var(--text-heading)]">
                        {item.sector || 'General'}
                      </span>
                      {item.topic && (
                        <span className="badge badge-info text-[10px] w-fit">
                          {item.topic}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-[var(--text-heading)] flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-[#2563EB]" />
                        {item.country || 'Global'}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {item.region || 'Worldwide'}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 text-center font-mono font-medium text-[var(--text-heading)]">
                    {item.end_year || '-'}
                  </td>

                  <td className="p-3 text-right">
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onSelectInsight(item)}
                        className="btn-icon w-7 h-7 rounded-md"
                        title="View Full Record"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-icon w-7 h-7 rounded-md text-[#2563EB]"
                          title="Open Original Source"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs">
        <span className="text-[var(--text-muted)]">
          Page {page} of {totalPages || 1} ({total} items total)
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="btn btn-secondary text-xs px-2.5 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="btn btn-secondary text-xs px-2.5 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
