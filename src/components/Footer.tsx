import React from 'react';
import { Coffee, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white py-10 dark:border-stone-800 dark:bg-stone-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Top bar: Disclaimers and Independence */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-stone-100 pb-8 text-center sm:flex-row sm:text-left dark:border-stone-800">
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Independent Civic Project
              </span>
            </div>
            <p className="mt-1 max-w-xl text-xs text-stone-500 dark:text-stone-400">
              Not affiliated with, endorsed by, or operated by the Government of Ireland, the Department of Justice, or Revenue. 
              Information is curated from public sector records under EU Open Data regulations.
            </p>
          </div>

          {/* Buy me a coffee */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-stone-950 shadow-sm transition hover:bg-amber-400"
          >
            <Coffee className="size-4" />
            <span>Buy me a coffee</span>
          </a>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6 text-center text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
          <p>
            <strong>Legal Notice:</strong> This website provides general public information and mathematical date calculations only. 
            It does not constitute legal advice under the Legal Services Regulation Act 2015. 
            Official English statutory text on gov.ie and irishstatutebook.ie prevails in all matters.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="size-3 text-red-500 inline" /> for newcomers and residents in Ireland · Open Source
          </p>
        </div>

      </div>
    </footer>
  );
};
