import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Building2, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { KnowledgeItem } from '../types';

interface ResponseCardProps {
  item: KnowledgeItem;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);
  const confidenceLabel = item.sourceConfidence === 'mixed'
    ? 'Mixed official/public guidance'
    : item.sourceConfidence === 'official-guidance'
    ? 'Official guidance'
    : 'Official source';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.title}\n\n${item.summary}\n\nGeneral information only. Verify your own circumstances against the official source.\n\nOfficial Source: ${item.officialSource.url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
      
      {/* Header & Source Agency */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3.5 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300">
            <Building2 className="size-3.5" />
            {item.officialSource.agency}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400">
            <Calendar className="size-3" />
            Verified {item.officialSource.lastVerified}
          </span>
          <span className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-800 dark:border-stone-700 dark:bg-stone-800 dark:text-slate-300">
            <ShieldCheck className="size-3 text-emerald-600" />
            {confidenceLabel}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-bold text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
          title="Copy answer summary"
        >
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-stone-400" />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Main Title & Direct Plain-English Answer */}
      <div className="mt-4">
        <h3 className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
          {item.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-stone-700 dark:text-stone-300">
          {item.summary}
        </p>
        <p className="mt-3 rounded-xl border border-stone-200/70 bg-stone-50/70 px-3.5 py-2 text-xs leading-relaxed text-stone-600 dark:border-stone-800 dark:bg-stone-800/40 dark:text-stone-300">
          {item.legalBoundary ?? 'Use this as a preparation aid only. Official guidance, current law, and professional advice for your own circumstances should take priority.'}
        </p>
      </div>

      {/* Statutory Rules / Key Details */}
      <div className="mt-5 rounded-xl border border-stone-100 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-800/30">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Statutory Conditions & Key Facts
        </h4>
        <ul className="mt-2.5 space-y-2 text-sm text-stone-700 dark:text-stone-300">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="leading-snug">{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actionable Next Steps */}
      {item.nextSteps && item.nextSteps.length > 0 && (
        <div className="mt-4 border-l-2 border-emerald-600 pl-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Recommended Action Steps
          </h4>
          <ol className="mt-2 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
            {item.nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Grounded Citation Outbound Button */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-t border-stone-100 pt-4 dark:border-stone-800">
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
          Primary source: {item.officialSource.title}
        </span>
        <a
          href={item.officialSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition"
        >
          <span>Verify on {item.officialSource.agency}</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

    </article>
  );
};
