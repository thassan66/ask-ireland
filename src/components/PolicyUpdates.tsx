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
    <div className="mx-auto max-w-4xl px-4 py-8">
      
      {/* Title */}
      <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <Bell className="size-6" />
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
              Irish Policy Updates & Statutory Changes
            </h2>
          </div>
          <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 sm:inline-flex">
            <CheckCircle2 className="size-3.5" />
            Verified Against State Gazettes
          </span>
        </div>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Official policy announcements, employment permit threshold adjustments, and naturalisation rule changes from the Department of Justice, DETE, and Revenue.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 text-xs font-medium text-stone-500 mr-2">
          <Filter className="size-3.5" />
          Filter:
        </div>
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            filter === 'all'
              ? 'bg-emerald-700 text-white'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          All Updates ({POLICY_ALERTS.length})
        </button>
        <button
          onClick={() => setFilter('statutory_change')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            filter === 'statutory_change'
              ? 'bg-emerald-700 text-white'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          Statutory Changes
        </button>
        <button
          onClick={() => setFilter('threshold_update')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            filter === 'threshold_update'
              ? 'bg-emerald-700 text-white'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          }`}
        >
          Salary & Credits
        </button>
        <button
          onClick={() => setFilter('operational_notice')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            filter === 'operational_notice'
              ? 'bg-emerald-700 text-white'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
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
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
                  alert.category === 'statutory_change'
                    ? 'bg-red-50 text-red-800 dark:bg-red-950/70 dark:text-red-300'
                    : alert.category === 'threshold_update'
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                    : 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                }`}>
                  {alert.category === 'statutory_change' && <ShieldAlert className="size-3" />}
                  {alert.category === 'threshold_update' && <Sparkles className="size-3" />}
                  {alert.category === 'operational_notice' && <CheckCircle2 className="size-3" />}
                  {alert.category.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                  {alert.agency}
                </span>
              </div>
              <span className="text-xs text-stone-400">{alert.date}</span>
            </div>

            <div className="mt-3">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {alert.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {alert.summary}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3 dark:border-stone-800">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-stone-400">Affected:</span>
                {alert.affectedGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-stone-100 px-2 py-0.5 text-[11px] text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <a
                href={alert.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
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
