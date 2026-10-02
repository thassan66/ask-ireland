import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Compass, 
  Calculator, 
  FileText, 
  ExternalLink, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'calculator' | 'directory' | 'emergency-tax' | 'updates';
  setActiveTab: (tab: 'search' | 'calculator' | 'directory' | 'emergency-tax' | 'updates') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: HeaderProps['activeTab']) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-900/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6">
          
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => handleTabClick('search')}
              className="flex items-center gap-2 text-left transition hover:opacity-90"
            >
              <div className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-emerald-700 text-white font-bold shadow-sm text-sm sm:text-base">
                É
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-50">
                  Ask Ireland
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-400">
                  Fáilte Guide
                </span>
              </div>
            </button>

            {/* Independent badge (Hidden on mobile and small tablets) */}
            <div className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100/70 px-2.5 py-0.5 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-400">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Independent · Not a government website</span>
            </div>
          </div>

          {/* Desktop & Laptop Navigation (Hidden on screens below 840px) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => handleTabClick('search')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition ${
                activeTab === 'search'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
              }`}
            >
              <Compass className="size-4 shrink-0" />
              <span>Ask</span>
            </button>

            <button
              onClick={() => handleTabClick('calculator')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition ${
                activeTab === 'calculator'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
              }`}
            >
              <Calculator className="size-4 shrink-0" />
              <span>Residency Calculator</span>
            </button>

            <button
              onClick={() => handleTabClick('emergency-tax')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition ${
                activeTab === 'emergency-tax'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
              }`}
            >
              <FileText className="size-4 shrink-0" />
              <span>Emergency Tax</span>
            </button>

            <button
              onClick={() => handleTabClick('updates')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition ${
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
              onClick={() => handleTabClick('directory')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition ${
                activeTab === 'directory'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
              }`}
            >
              <ExternalLink className="size-4 shrink-0" />
              <span>Portals</span>
            </button>
          </nav>

          {/* Mobile / Tablet Hamburger Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-10 items-center justify-center rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-stone-200 bg-white px-4 py-4 shadow-lg md:hidden dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-3 flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-400">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>Independent civic project · Not a government website</span>
            </div>

            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => handleTabClick('search')}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === 'search'
                    ? 'bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Compass className="size-5 text-emerald-600" />
                <span>Ask Ireland Search</span>
              </button>

              <button
                onClick={() => handleTabClick('calculator')}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === 'calculator'
                    ? 'bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Calculator className="size-5 text-emerald-600" />
                <span>Citizenship Residency Calculator</span>
              </button>

              <button
                onClick={() => handleTabClick('emergency-tax')}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === 'emergency-tax'
                    ? 'bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <FileText className="size-5 text-emerald-600" />
                <span>Emergency Tax Guide</span>
              </button>

              <button
                onClick={() => handleTabClick('updates')}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === 'updates'
                    ? 'bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Bell className="size-5 text-emerald-600" />
                <div className="flex items-center gap-2">
                  <span>Policy Updates</span>
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    New
                  </span>
                </div>
              </button>

              <button
                onClick={() => handleTabClick('directory')}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === 'directory'
                    ? 'bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <ExternalLink className="size-5 text-emerald-600" />
                <span>Official Portals Directory</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Persistent native app-style bar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-stone-200 bg-white/95 px-2 backdrop-blur md:hidden dark:border-stone-800 dark:bg-stone-900/95">
        <button
          onClick={() => handleTabClick('search')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium ${
            activeTab === 'search'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Compass className="size-5" />
          <span>Ask</span>
        </button>

        <button
          onClick={() => handleTabClick('calculator')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium ${
            activeTab === 'calculator'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Calculator className="size-5" />
          <span>Calculator</span>
        </button>

        <button
          onClick={() => handleTabClick('emergency-tax')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium ${
            activeTab === 'emergency-tax'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <FileText className="size-5" />
          <span>Tax</span>
        </button>

        <button
          onClick={() => handleTabClick('updates')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium ${
            activeTab === 'updates'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Bell className="size-5" />
          <span>Updates</span>
        </button>

        <button
          onClick={() => handleTabClick('directory')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium ${
            activeTab === 'directory'
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <ExternalLink className="size-5" />
          <span>Portals</span>
        </button>
      </nav>
    </>
  );
};
