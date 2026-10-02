import { StampPeriod, TravelAbsence } from '../types';

export const CURRENT_SCHEMA_VERSION = 1;
export const JOURNEY_STORAGE_KEY = 'ask_ireland_journey_v1';

export const VALID_DOC_IDS = [
  'p60',
  'noa',
  'dsp_statement',
  'school_letter',
  'bank_statements',
  'rtb_tenancy',
  'mortgage_statement',
  'electricity_bill',
  'gas_bill',
  'broadband_bill',
  'motor_tax',
  'tv_licence'
] as const;

export type ValidDocId = typeof VALID_DOC_IDS[number];

export type StampCategory = 
  | 'Stamp 1' 
  | 'Stamp 1G' 
  | 'Stamp 4' 
  | 'Stamp 3' 
  | 'Stamp 2' 
  | 'Other';

export interface CurrentPermission {
  stampType: StampCategory;
  startDate?: string; // YYYY-MM-DD, e.g. permit start date for CSEP month-21 tracking
  expiryDate: string;  // YYYY-MM-DD, for IRP renewal 12-week window calculation
}

export interface IrishJourneyDataV1 {
  version: 1;
  lastUpdated: string;
  targetRoute: 'naturalisation_standard' | 'csep_to_stamp4' | 'naturalisation_spouse_irish';
  currentPermission: CurrentPermission;
  stamps: StampPeriod[];
  absences: TravelAbsence[];
  selectedDocsByYear: Record<number, string[]>;
}

export interface JourneyExportV1 {
  app: 'Ask Ireland';
  schemaVersion: 1;
  exportedAt: string;
  data: IrishJourneyDataV1;
}

export const DEFAULT_JOURNEY: IrishJourneyDataV1 = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  targetRoute: 'naturalisation_standard',
  currentPermission: {
    stampType: 'Stamp 4',
    startDate: '2024-01-15',
    expiryDate: '2027-11-16'
  },
  stamps: [
    {
      id: '1',
      stampType: 'Stamp 1G',
      startDate: '2022-06-03',
      endDate: '2023-07-11',
      isEligible: true
    },
    {
      id: '2',
      stampType: 'Stamp 1G',
      startDate: '2023-07-12',
      endDate: '2023-11-15',
      isEligible: true
    },
    {
      id: '3',
      stampType: 'Stamp 1G',
      startDate: '2023-11-16',
      endDate: '2024-11-16',
      isEligible: true
    },
    {
      id: '4',
      stampType: 'Stamp 1G',
      startDate: '2024-10-15',
      endDate: '2025-11-16',
      isEligible: true
    },
    {
      id: '5',
      stampType: 'Stamp 1G',
      startDate: '2025-12-08',
      endDate: '2026-11-16',
      isEligible: true
    },
    {
      id: '6',
      stampType: 'Stamp 4',
      startDate: '2026-08-15',
      endDate: '2027-11-16',
      isEligible: true
    }
  ],
  absences: [
    {
      id: '1',
      startDate: '2022-08-24',
      endDate: '2023-02-13',
      reason: 'Extended Trip'
    },
    {
      id: '2',
      startDate: '2024-11-21',
      endDate: '2025-09-30',
      reason: 'Holiday / Travel'
    }
  ],
  selectedDocsByYear: {
    1: ['p60', 'bank_statements', 'rtb_tenancy'],
    2: ['p60', 'bank_statements'],
    3: ['p60', 'bank_statements', 'electricity_bill'],
    4: ['p60', 'bank_statements'],
    5: ['p60', 'bank_statements', 'rtb_tenancy']
  }
};

/**
 * Reads journey data from localStorage.
 * Returns default dataset if not found or corrupted.
 */
export function loadJourney(): IrishJourneyDataV1 {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_JOURNEY;
  }

  try {
    const raw = localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) return DEFAULT_JOURNEY;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
      return DEFAULT_JOURNEY;
    }

    return parsed as IrishJourneyDataV1;
  } catch {
    return DEFAULT_JOURNEY;
  }
}

/**
 * Direct synchronous write to localStorage.
 * Debouncing is handled in React hooks.
 */
export function saveJourney(data: IrishJourneyDataV1): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const payload: IrishJourneyDataV1 = {
    ...data,
    version: 1,
    lastUpdated: new Date().toISOString()
  };

  try {
    localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event('ask_ireland_journey_updated'));
  } catch {
    // Storage quota exceeded or disabled
  }
}

/**
 * Creates a versioned export wrapper for JSON backups.
 */
export function createJourneyExport(data: IrishJourneyDataV1): JourneyExportV1 {
  return {
    app: 'Ask Ireland',
    schemaVersion: CURRENT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data
  };
}

/**
 * Validates basic shape and version of uploaded JSON backups.
 */
export function parseAndValidateImport(rawString: string): IrishJourneyDataV1 | null {
  try {
    const parsed = JSON.parse(rawString);
    if (!parsed || typeof parsed !== 'object') return null;

    // Check versioned export envelope
    if (parsed.app === 'Ask Ireland' && parsed.schemaVersion === 1 && parsed.data) {
      const d = parsed.data;
      if (Array.isArray(d.stamps) && Array.isArray(d.absences) && d.selectedDocsByYear) {
        return {
          version: 1,
          lastUpdated: new Date().toISOString(),
          targetRoute: d.targetRoute || 'naturalisation_standard',
          currentPermission: {
            stampType: d.currentPermission?.stampType || 'Stamp 4',
            startDate: d.currentPermission?.startDate || '',
            expiryDate: d.currentPermission?.expiryDate || ''
          },
          stamps: d.stamps,
          absences: d.absences,
          selectedDocsByYear: d.selectedDocsByYear
        };
      }
    }

    // Direct data format fallback
    if (parsed.version === 1 && Array.isArray(parsed.stamps) && Array.isArray(parsed.absences)) {
      return {
        version: 1,
        lastUpdated: new Date().toISOString(),
        targetRoute: parsed.targetRoute || 'naturalisation_standard',
        currentPermission: {
          stampType: parsed.currentPermission?.stampType || 'Stamp 4',
          startDate: parsed.currentPermission?.startDate || '',
          expiryDate: parsed.currentPermission?.expiryDate || ''
        },
        stamps: parsed.stamps,
        absences: parsed.absences,
        selectedDocsByYear: parsed.selectedDocsByYear || {}
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Completely purges journey data from browser storage.
 */
export function wipeJourneyStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(JOURNEY_STORAGE_KEY);
    window.dispatchEvent(new Event('ask_ireland_journey_updated'));
  } catch {
    // Ignore
  }
}
