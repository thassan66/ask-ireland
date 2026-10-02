import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, Copy, Check, Building2, Calendar } from 'lucide-react';
import { KnowledgeItem } from '../types';

interface ResponseCardProps {
  item: KnowledgeItem;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.title}\n\n${item.summary}\n\nOfficial Source: ${item.officialSource.url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
      
      {/* Header & Source Agency */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
            <Building2 className="size-3.5" />
            {item.officialSource.agency}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400">
            <Calendar className="size-3" />
            Verified {item.officialSource.lastVerified}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
          title="Copy answer summary"
        >
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Main Title & Direct Plain-English Answer */}
      <div className="mt-4">
        <h3 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          {item.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-stone-700 dark:text-stone-300">
          {item.summary}
        </p>
      </div>

      {/* Statutory Rules / Key Details */}
      <div className="mt-5 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/40">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Statutory Conditions & Key Facts
        </h4>
        <ul className="mt-2.5 space-y-2 text-sm text-stone-700 dark:text-stone-300">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actionable Next Steps */}
      <div className="mt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Actionable Next Steps
        </h4>
        <div className="mt-2.5 space-y-2">
          {item.nextSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-800 dark:text-stone-200">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grounded Citation Outbound Button */}
      <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
        <span className="text-xs text-stone-500 dark:text-stone-400">
          Primary Source: {item.officialSource.title}
        </span>
        <a
          href={item.officialSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          <span>View on Official State Website</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

    </article>
  );
};
