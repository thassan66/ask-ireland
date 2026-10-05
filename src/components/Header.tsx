import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Compass, 
  Calculator, 
  FileText, 
  ExternalLink, 
  Bell, 
  Menu, 
  X,
  Award,
  Mail,
  Milestone,
  ChevronDown
} from 'lucide-react';

export type NavigationTab = 
  | 'search' 
  | 'journey' 
  | 'calculator' 
  | 'scorecard' 
  | 'letters' 
  | 'emergency-tax' 
  | 'updates' 
  | 'directory';

export const TAB_PATHS: Record<NavigationTab, string> = {
  search: '/',
  journey: '/journey',
  calculator: '/calculator',
  scorecard: '/scorecard',
  letters: '/letters',
  'emergency-tax': '/emergency-tax',
  updates: '/updates',
  directory: '/directory'
};

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [moreMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur shadow-xs dark:border-stone-800 dark:bg-stone-900/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a 
              href={TAB_PATHS['search']}
              onClick={(e) => { e.preventDefault(); handleTabClick('search'); }}
              className="flex items-center gap-2.5 text-left transition hover:opacity-90 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] rounded-xl"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E634E] via-[#0B4D3C] to-[#043327] text-white font-serif font-black shadow-sm ring-1 ring-[#043327]/30 text-base shrink-0">
                É
              </div>
              <div className="shrink-0 leading-tight">
                <span className="text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-50 block whitespace-nowrap">
                  Ask Ireland
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#0B4D3C] dark:text-emerald-400 whitespace-nowrap mt-0.5">
                  Civic Guide
                </span>
              </div>
            </a>

            {/* Independent badge (Shown on large screens) */}
            <div className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-[#0B4D3C]/20 bg-[#0B4D3C]/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#0B4D3C] dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
              <ShieldCheck className="size-3 text-[#0B4D3C] dark:text-emerald-400 shrink-0" />
              <span>Independent · Not a government website</span>
            </div>
          </div>

          {/* Desktop Navigation (6 primary tabs + More dropdown) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            
            {/* Ask */}
            <a
              href={TAB_PATHS['search']}
              onClick={(e) => { e.preventDefault(); handleTabClick('search'); }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                activeTab === 'search'
                  ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Compass className="size-4 shrink-0" />
              <span>Ask</span>
            </a>

            {/* My Journey */}
            <a
              href={TAB_PATHS['journey']}
              onClick={(e) => { e.preventDefault(); handleTabClick('journey'); }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                activeTab === 'journey'
                  ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Milestone className="size-4 shrink-0" />
              <span>My Journey</span>
            </a>

            {/* Residency Calculator */}
            <a
              href={TAB_PATHS['calculator']}
              onClick={(e) => { e.preventDefault(); handleTabClick('calculator'); }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                activeTab === 'calculator'
                  ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Calculator className="size-4 shrink-0" />
              <span>Residency</span>
            </a>

            {/* 150-Pt Scorecard */}
            <a
              href={TAB_PATHS['scorecard']}
              onClick={(e) => { e.preventDefault(); handleTabClick('scorecard'); }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                activeTab === 'scorecard'
                  ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Award className="size-4 shrink-0" />
              <span>Scorecard</span>
            </a>

            {/* Letter Drafter */}
            <a
              href={TAB_PATHS['letters']}
              onClick={(e) => { e.preventDefault(); handleTabClick('letters'); }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                activeTab === 'letters'
                  ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Mail className="size-4 shrink-0" />
              <span>Letters</span>
            </a>

            {/* Policy Updates */}
            <a
              href={TAB_PATHS['updates']}
              onClick={(e) => { e.preventDefault(); handleTabClick('updates'); }}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                activeTab === 'updates'
                  ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span className="relative flex size-2 shrink-0">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  activeTab === 'updates' ? 'bg-emerald-300' : 'bg-emerald-400'
                }`}></span>
                <span className={`relative inline-flex size-2 rounded-full ${
                  activeTab === 'updates' ? 'bg-emerald-200' : 'bg-emerald-500'
                }`}></span>
              </span>
              <span>Updates</span>
            </a>

            {/* "More" Dropdown (Emergency Tax & Official Portals) */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs xl:text-[13px] font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4D3C] ${
                  activeTab === 'emergency-tax' || activeTab === 'directory'
                    ? 'bg-[#0B4D3C] text-white shadow-xs dark:bg-emerald-700'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#F5F2EA] dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`size-3.5 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl dark:border-stone-800 dark:bg-stone-900 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <a
                    href={TAB_PATHS['emergency-tax']}
                    onClick={(e) => { e.preventDefault(); handleTabClick('emergency-tax'); }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-left transition ${
                      activeTab === 'emergency-tax'
                        ? 'bg-emerald-50 text-[#0B4D3C] dark:bg-emerald-950 dark:text-emerald-300'
                        : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                    }`}
                  >
                    <FileText className="size-4 text-[#0B4D3C] dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold">Emergency Tax Guide</div>
                      <div className="text-[10px] text-stone-500 font-normal">Rebate steps & employer TRN email</div>
                    </div>
                  </a>

                  <a
                    href={TAB_PATHS['directory']}
                    onClick={(e) => { e.preventDefault(); handleTabClick('directory'); }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-left transition mt-1 ${
                      activeTab === 'directory'
                        ? 'bg-emerald-50 text-[#0B4D3C] dark:bg-emerald-950 dark:text-emerald-300'
                        : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                    }`}
                  >
                    <ExternalLink className="size-4 text-[#0B4D3C] dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold">Official Portals Directory</div>
                      <div className="text-[10px] text-stone-500 font-normal">Verified .gov.ie & Revenue links</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

          </nav>

          {/* Mobile / Tablet Hamburger Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-10 items-center justify-center rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-stone-200 bg-white px-4 py-4 shadow-xl lg:hidden dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-3 flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-xs text-emerald-900 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-300">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>Independent civic project · Not a government website</span>
            </div>

            <nav className="flex flex-col space-y-1">
              <a
                href={TAB_PATHS['search']}
                onClick={(e) => { e.preventDefault(); handleTabClick('search'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'search'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Compass className="size-5 shrink-0" />
                <span>Ask Ireland Search</span>
              </a>

              <a
                href={TAB_PATHS['journey']}
                onClick={(e) => { e.preventDefault(); handleTabClick('journey'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'journey'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Milestone className="size-5 shrink-0" />
                <div className="flex items-center gap-2">
                  <span>My Irish Journey</span>
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-[#0B4D3C] dark:bg-emerald-900 dark:text-emerald-200">
                    New
                  </span>
                </div>
              </a>

              <a
                href={TAB_PATHS['calculator']}
                onClick={(e) => { e.preventDefault(); handleTabClick('calculator'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'calculator'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Calculator className="size-5 shrink-0" />
                <span>Residency Engine</span>
              </a>

              <a
                href={TAB_PATHS['scorecard']}
                onClick={(e) => { e.preventDefault(); handleTabClick('scorecard'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'scorecard'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Award className="size-5 shrink-0" />
                <span>150-Point Scorecard</span>
              </a>

              <a
                href={TAB_PATHS['letters']}
                onClick={(e) => { e.preventDefault(); handleTabClick('letters'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'letters'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Mail className="size-5 shrink-0" />
                <span>Bureaucracy Letter Drafter</span>
              </a>

              <a
                href={TAB_PATHS['emergency-tax']}
                onClick={(e) => { e.preventDefault(); handleTabClick('emergency-tax'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'emergency-tax'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <FileText className="size-5 shrink-0" />
                <span>Emergency Tax Guide</span>
              </a>

              <a
                href={TAB_PATHS['updates']}
                onClick={(e) => { e.preventDefault(); handleTabClick('updates'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'updates'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Bell className="size-5 shrink-0" />
                <div className="flex items-center gap-2">
                  <span>Policy Updates (2026 Circulars)</span>
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-[#0B4D3C] dark:bg-emerald-900 dark:text-emerald-200">
                    Live
                  </span>
                </div>
              </a>

              <a
                href={TAB_PATHS['directory']}
                onClick={(e) => { e.preventDefault(); handleTabClick('directory'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  activeTab === 'directory'
                    ? 'bg-[#0B4D3C] text-white dark:bg-emerald-700'
                    : 'text-stone-700 hover:bg-[#F5F2EA] dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <ExternalLink className="size-5 shrink-0" />
                <span>Official Portals Directory</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Persistent native app-style bar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-stone-200/90 bg-white/95 px-1 backdrop-blur md:hidden dark:border-stone-800 dark:bg-stone-900/95 shadow-lg">
        <a
          href={TAB_PATHS['search']}
          onClick={(e) => { e.preventDefault(); handleTabClick('search'); }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold ${
            activeTab === 'search'
              ? 'text-[#0B4D3C] dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Compass className="size-4.5" />
          <span>Ask</span>
        </a>

        <a
          href={TAB_PATHS['journey']}
          onClick={(e) => { e.preventDefault(); handleTabClick('journey'); }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold ${
            activeTab === 'journey'
              ? 'text-[#0B4D3C] dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Milestone className="size-4.5" />
          <span>Journey</span>
        </a>

        <a
          href={TAB_PATHS['calculator']}
          onClick={(e) => { e.preventDefault(); handleTabClick('calculator'); }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold ${
            activeTab === 'calculator'
              ? 'text-[#0B4D3C] dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Calculator className="size-4.5" />
          <span>Calc</span>
        </a>

        <a
          href={TAB_PATHS['scorecard']}
          onClick={(e) => { e.preventDefault(); handleTabClick('scorecard'); }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold ${
            activeTab === 'scorecard'
              ? 'text-[#0B4D3C] dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Award className="size-4.5" />
          <span>150-Pt</span>
        </a>

        <a
          href={TAB_PATHS['letters']}
          onClick={(e) => { e.preventDefault(); handleTabClick('letters'); }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold ${
            activeTab === 'letters'
              ? 'text-[#0B4D3C] dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Mail className="size-4.5" />
          <span>Letters</span>
        </a>

        <a
          href={TAB_PATHS['updates']}
          onClick={(e) => { e.preventDefault(); handleTabClick('updates'); }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold ${
            activeTab === 'updates'
              ? 'text-[#0B4D3C] dark:text-emerald-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Bell className="size-4.5" />
          <span>Updates</span>
        </a>
      </nav>
    </>
  );
};
