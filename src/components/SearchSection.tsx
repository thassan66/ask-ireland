import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, AlertCircle } from 'lucide-react';
import { searchKnowledgeBase } from '../utils/searchEngine';
import { ResponseCard } from './ResponseCard';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';

export const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');

  const sampleQueries = [
    'How do I stop emergency tax?',
    'how change stamp 1 to stamp 4 21 month work',
    'ppsn without house rent lease',
    'can student work 40 hours stamp 2',
    'citizenship 1825 days rule'
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchKnowledgeBase(query);
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-10 pb-24 md:pb-12">
      
      {/* Hero Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
          Answers from official Irish sources
        </h1>
        <p className="mx-auto mt-2.5 max-w-2xl text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Ask questions about immigration stamps, PPS numbers, emergency tax, and citizenship. 
          Grounded strictly in verified <span className="font-semibold text-emerald-700 dark:text-emerald-400">.gov.ie</span>, Revenue, and Citizens Information records.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="mt-8">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 size-5 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question (e.g. 'how stop emergency tax', '21 months stamp 4')..."
            className="w-full rounded-2xl border border-stone-300 bg-white py-4 pl-12 pr-12 text-base shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-emerald-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400">
            <Sparkles className="size-3 text-emerald-600" />
            Try searching:
          </span>
          {sampleQueries.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(sample)}
              className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/40"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 space-y-6">
        {query.trim() && results.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span>{results.length} Grounded Official Answer{results.length > 1 ? 's' : ''} Found</span>
              <span className="text-emerald-700 dark:text-emerald-400">Grounded in Public Law</span>
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
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-center dark:border-amber-900/50 dark:bg-amber-950/30">
            <AlertCircle className="mx-auto size-8 text-amber-600 dark:text-amber-500" />
            <h3 className="mt-2 text-base font-bold text-amber-900 dark:text-amber-300">
              No direct official record matched this query
            </h3>
            <p className="mt-1 text-sm text-amber-800 dark:text-amber-400">
              Try rephrasing with key terms like "PPSN", "Stamp 1", "Emergency Tax", or "Citizenship". 
              You can also check the official government portals directory in the top menu.
            </p>
          </div>
        )}

        {/* Default View when empty: show all curated topics */}
        {!query.trim() && (
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Frequently Verified Inquiries
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {KNOWLEDGE_BASE.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setQuery(item.queryMatches[0])}
                  className="rounded-xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-600 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {item.officialSource.agency}
                  </span>
                  <h4 className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-xs text-stone-600 dark:text-stone-400">
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
