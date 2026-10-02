export interface GovService {
  id: string;
  label: string;
  irishLabel: string;
  category: string;
  agency: string;
  href: string;
  description: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: 'immigration' | 'tax' | 'employment' | 'housing' | 'services';
  queryMatches: string[];
  semanticKeywords: string[];
  summary: string;
  details: string[];
  nextSteps: string[];
  officialSource: {
    title: string;
    agency: string;
    url: string;
    lastVerified: string;
  };
  legalBoundary?: string;
  sourceConfidence?: 'official' | 'official-guidance' | 'mixed';
}

export interface StampPeriod {
  id: string;
  stampType: 'Stamp 1' | 'Stamp 1G' | 'Stamp 2' | 'Stamp 3' | 'Stamp 4' | 'Stamp 5';
  startDate: string;
  endDate: string;
  isEligible: boolean;
}

export interface TravelAbsence {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface PolicyAlert {
  id: string;
  title: string;
  agency: 'Immigration Service Delivery (ISD)' | 'Department of Enterprise (DETE)' | 'Revenue' | 'Department of Justice';
  date: string;
  category: 'statutory_change' | 'operational_notice' | 'threshold_update';
  affectedGroups: string[];
  summary: string;
  officialUrl: string;
}
