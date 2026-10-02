import React, { useState } from 'react';
import { Bell, ExternalLink, ShieldAlert, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { POLICY_ALERTS } from '../data/policyAlerts';
import { PolicyAlert } from '../types';

export const PolicyUpdates: React.FC = () => {
  const [filter, setFilter] = useState<'all' | PolicyAlert['category']>('all');

  const filteredAlerts = POLICY_ALERTS.filter(alert => {
    if (filter === 'all') return true;
    return alert.category === filter;
  });

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Hero Header */}
      <div className="rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/70 via-white to-stone-50 p-5 sm:p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-400">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs">
              <Bell className="size-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
                Irish Policy Updates & Statutory Changes
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Official policy announcements, employment permit thresholds, and naturalisation circulars.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-100/70 px-3 py-1 text-xs font-bold text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="size-3.5 text-emerald-700 dark:text-emerald-400" />
            Verified Official Gazettes
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-stone-500 mr-1">
          <Filter className="size-3.5 text-emerald-700" />
          <span>Filter:</span>
        </div>
        <button
          onClick={() => setFilter('all')}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-xs ${
            filter === 'all'
              ? 'bg-emerald-800 text-white dark:bg-emerald-600'
              : 'border border-stone-200 bg-white text-stone-700 hover:border-emerald-300 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          All Updates ({POLICY_ALERTS.length})
        </button>
        <button
          onClick={() => setFilter('statutory_change')}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-xs ${
            filter === 'statutory_change'
              ? 'bg-emerald-800 text-white dark:bg-emerald-600'
              : 'border border-stone-200 bg-white text-stone-700 hover:border-emerald-300 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          Statutory Changes
        </button>
        <button
          onClick={() => setFilter('threshold_update')}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-xs ${
            filter === 'threshold_update'
              ? 'bg-emerald-800 text-white dark:bg-emerald-600'
              : 'border border-stone-200 bg-white text-stone-700 hover:border-emerald-300 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          Salary & Credits
        </button>
        <button
          onClick={() => setFilter('operational_notice')}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-xs ${
            filter === 'operational_notice'
              ? 'bg-emerald-800 text-white dark:bg-emerald-600'
              : 'border border-stone-200 bg-white text-stone-700 hover:border-emerald-300 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          Operational Notices
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="mt-6 space-y-4">
        {filteredAlerts.map((alert) => (
          <article
            key={alert.id}
            className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs transition hover:shadow-md hover:border-emerald-600/30 dark:border-stone-800 dark:bg-stone-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3.5 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
                  alert.category === 'statutory_change'
                    ? 'bg-red-50 text-red-800 dark:bg-red-950/70 dark:text-red-300'
                    : alert.category === 'threshold_update'
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                    : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                }`}>
                  {alert.category === 'statutory_change' && <ShieldAlert className="size-3" />}
                  {alert.category === 'threshold_update' && <Sparkles className="size-3" />}
                  {alert.category === 'operational_notice' && <CheckCircle2 className="size-3" />}
                  {alert.category.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {alert.agency}
                </span>
              </div>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{alert.date}</span>
            </div>

            <div className="mt-3.5">
              <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-50 leading-snug">
                {alert.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {alert.summary}
              </p>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-stone-100 pt-3.5 dark:border-stone-800">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-400">Affected:</span>
                {alert.affectedGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-stone-200/70 bg-stone-50 px-2 py-0.5 text-[11px] font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <a
                href={alert.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 transition"
              >
                <span>Read Official Circular</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
