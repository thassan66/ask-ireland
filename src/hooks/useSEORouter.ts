import { useState, useEffect, useCallback } from 'react';
import { NavigationTab } from '../components/Header';

export interface RouteMetadata {
  path: string;
  tab: NavigationTab;
  title: string;
  description: string;
}

export const ROUTES: Record<NavigationTab, RouteMetadata> = {
  search: {
    path: '/',
    tab: 'search',
    title: 'Ask Ireland — Answers from Official Government Sources',
    description: 'Search Irish public services: immigration stamps, PPS numbers, emergency tax refunds, and citizenship calculations grounded in official .gov.ie records.'
  },
  calculator: {
    path: '/calculator',
    tab: 'calculator',
    title: 'Irish Citizenship Calculator — 5-Year Statutory Residency Check | Ask Ireland',
    description: 'Calculate your reckonable days for Irish naturalisation. Checks the 5-year (1,825 days) statutory residency rule, continuous year, and Stamp 1/4 eligibility.'
  },
  'emergency-tax': {
    path: '/emergency-tax',
    tab: 'emergency-tax',
    title: 'How to Stop Emergency Tax in Ireland — Revenue myAccount Guide | Ask Ireland',
    description: 'Stop 40% emergency tax deductions on your Irish salary. Step-by-step guide to add your job on Revenue myAccount and receive automated payroll tax refunds.'
  },
  letters: {
    path: '/letters',
    tab: 'letters',
    title: 'Irish Immigration Letter Templates — Stamp 4 Support & Appeals | Ask Ireland',
    description: 'Free verified letter templates for Irish immigration: Critical Skills 21-month Stamp 4 DETE support letter, employment verification, and GNIB requests.'
  },
  scorecard: {
    path: '/scorecard',
    tab: 'scorecard',
    title: 'Irish Citizenship Scorecard Calculator — Identity & Proof Points | Ask Ireland',
    description: 'Calculate your 150 points of identity and Irish residency proof for your naturalisation application using official Department of Justice scorecard rules.'
  },
  directory: {
    path: '/directory',
    tab: 'directory',
    title: 'Irish Public Services Directory — Revenue, ISD, DSP Contacts | Ask Ireland',
    description: 'Direct verified portal links, office locations, and phone numbers for Irish public agencies including Revenue Commissioners, ISD, and Social Protection.'
  },
  journey: {
    path: '/journey',
    tab: 'journey',
    title: 'My Irish Immigration Journey — Visa & Residency Tracker | Ask Ireland',
    description: 'Track your immigration stamps, reckonable residence countdown, tax milestones, and citizenship timeline in Ireland.'
  },
  updates: {
    path: '/updates',
    tab: 'updates',
    title: 'Irish Immigration & Tax Policy Alerts (2026) | Ask Ireland',
    description: 'Latest statutory policy updates on Irish immigration permissions, Critical Skills employment permits, minimum salary thresholds, and Revenue rules.'
  }
};

export function getTabFromPath(pathname: string): NavigationTab {
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const key of Object.keys(ROUTES) as NavigationTab[]) {
    if (ROUTES[key].path === clean) {
      return key;
    }
  }
  return 'search';
}

function updateMetadata(route: RouteMetadata) {
  if (typeof document === 'undefined') return;
  document.title = route.title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', route.description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', route.title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', route.description);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `https://ask-ireland.vercel.app${route.path === '/' ? '' : route.path}`);
  }

  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', route.title);
  }

  const twitterDesc = document.querySelector('meta[property="twitter:description"]');
  if (twitterDesc) {
    twitterDesc.setAttribute('content', route.description);
  }

  const twitterUrl = document.querySelector('meta[property="twitter:url"]');
  if (twitterUrl) {
    twitterUrl.setAttribute('content', `https://ask-ireland.vercel.app${route.path === '/' ? '' : route.path}`);
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://ask-ireland.vercel.app${route.path === '/' ? '' : route.path}`);
  }
}

export function useSEORouter() {
  const [activeTab, setActiveTabState] = useState<NavigationTab>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'search';
  });

  const navigateTo = useCallback((tab: NavigationTab) => {
    const route = ROUTES[tab];
    if (route && typeof window !== 'undefined') {
      if (window.location.pathname !== route.path) {
        window.history.pushState({ tab }, '', route.path);
      }
      updateMetadata(route);
    }
    setActiveTabState(tab);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      setActiveTabState(tab);
      const route = ROUTES[tab];
      if (route) {
        updateMetadata(route);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial sync
    const initialTab = getTabFromPath(window.location.pathname);
    if (ROUTES[initialTab]) {
      updateMetadata(ROUTES[initialTab]);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { activeTab, setActiveTab: navigateTo };
}
