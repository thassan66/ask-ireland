import React from 'react';
import { ShieldCheck, Compass, Calculator, FileText, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'calculator' | 'directory' | 'emergency-tax' | 'updates';
  setActiveTab: (tab: 'search' | 'calculator' | 'directory' | 'emergency-tax' | 'updates') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-2.5 text-left transition hover:opacity-90"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 text-white font-bold shadow-sm">
              É
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-50">
                Ask Ireland
              </span>
              <span className="block text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-400">
                Fáilte Guide
              </span>
            </div>
          </button>

          {/* Independent badge */}
          <div className="hidden items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100/70 px-2.5 py-0.5 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-400 md:inline-flex">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>Independent · Not a government website</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
              activeTab === 'search'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            <Compass className="size-4" />
            <span>Ask</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
              activeTab === 'calculator'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            <Calculator className="size-4" />
            <span>Residency Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency-tax')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
              activeTab === 'emergency-tax'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            <FileText className="size-4" />
            <span>Emergency Tax</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
              activeTab === 'updates'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Policy Updates</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
              activeTab === 'directory'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            <ExternalLink className="size-4" />
            <span>Portals</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
