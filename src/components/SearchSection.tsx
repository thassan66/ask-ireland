import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, AlertCircle } from 'lucide-react';
import { searchKnowledgeBase } from '../utils/searchEngine';
import { ResponseCard } from './ResponseCard';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';
import { LegalSafetyNotice } from './LegalSafetyNotice';

export const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');

  const sampleQueries = [
    { label: 'Stop Emergency Tax', text: 'How do I stop emergency tax?' },
    { label: 'CSEP to Stamp 4 (21 Mo)', text: 'how change stamp 1 to stamp 4 21 month work' },
    { label: 'PPSN without Lease', text: 'ppsn without house rent lease' },
    { label: 'Stamp 2 Work Hours', text: 'can student work 40 hours stamp 2' },
    { label: '1,825 Days Citizenship', text: 'citizenship 1825 days rule' }
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchKnowledgeBase(query);
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-10 pb-24 md:pb-12">
      
      {/* Hero Header with Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-xs font-bold text-emerald-900 shadow-xs dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-300 mb-3">
          <Sparkles className="size-3.5 text-emerald-600 shrink-0" />
          <span>Verified Irish Public Sources · 100% Client-Side Privacy</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 dark:text-stone-50">
          Clear answers from official Irish sources
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-600 dark:text-stone-400">
          Find verified guidance on immigration stamps, PPS numbers, emergency tax rebates, and naturalisation. 
          All answers cite official legislation and portals, provided as practical information.
        </p>
      </div>

      <div className="mt-5">
        <LegalSafetyNotice compact />
      </div>

      {/* Search Input Bar */}
      <div className="mt-7">
        <div className="relative flex items-center shadow-sm rounded-2xl">
          <Search className="pointer-events-none absolute left-4 size-5 text-emerald-700 dark:text-emerald-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question (e.g. 'how stop emergency tax', '21 months stamp 4')..."
            className="w-full rounded-2xl border-2 border-stone-200 bg-white py-4 pl-12 pr-12 text-base font-medium text-stone-900 shadow-xs transition hover:border-stone-300 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/15 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-600 dark:focus:border-emerald-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              title="Clear search query"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Suggested:
          </span>
          {sampleQueries.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(sample.text)}
              className="rounded-full border border-stone-200/90 bg-white px-3 py-1 text-xs font-semibold text-stone-700 shadow-2xs transition hover:border-emerald-500 hover:bg-emerald-50/70 hover:text-emerald-800 dark:border-stone-800 dark:bg-stone-800/80 dark:text-stone-200 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 space-y-6">
        {query.trim() && results.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span className="text-emerald-800 dark:text-emerald-300">{results.length} Grounded Official Answer{results.length > 1 ? 's' : ''} Found</span>
              <span className="text-stone-500">Cross-reference with official source</span>
            </div>
            <div className="space-y-6">
              {results.map(({ item }) => (
                <ResponseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Handling */}
        {query.trim() && results.length === 0 && (
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-6 text-center shadow-xs dark:border-amber-900/60 dark:bg-amber-950/40">
            <AlertCircle className="mx-auto size-9 text-amber-600 dark:text-amber-400" />
            <h3 className="mt-2 text-base font-bold text-amber-950 dark:text-amber-200">
              No direct official record matched this query
            </h3>
            <p className="mt-1 text-sm text-amber-900/90 dark:text-amber-300/90 max-w-md mx-auto">
              Try rephrasing with key terms like "PPSN", "Stamp 1", "Emergency Tax", or "Citizenship". 
              You can also check the official government portals directory in the top menu.
            </p>
          </div>
        )}

        {/* Default View when empty: show curated topics */}
        {!query.trim() && (
          <div className="mt-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2.5 dark:border-stone-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Frequently Verified Civic Topics
              </h3>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Select topic to view guidance
              </span>
            </div>
            
            <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
              {KNOWLEDGE_BASE.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setQuery(item.queryMatches[0])}
                  className="group rounded-2xl border border-stone-200/90 bg-white p-4 text-left shadow-xs transition hover:border-emerald-600 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                      {item.officialSource.agency}
                    </span>
                    <span className="text-xs font-bold text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition dark:group-hover:text-emerald-400">
                      Read →
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-bold text-stone-900 group-hover:text-emerald-800 dark:text-stone-100 dark:group-hover:text-emerald-300 transition">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {item.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
