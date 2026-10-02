import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  IrishJourneyDataV1, 
  CurrentPermission,
  DEFAULT_JOURNEY, 
  loadJourney, 
  saveJourney, 
  createJourneyExport, 
  parseAndValidateImport, 
  wipeJourneyStorage 
} from '../utils/journeyStore';
import { StampPeriod, TravelAbsence } from '../types';

export function useIrishJourney() {
  const [journey, setJourney] = useState<IrishJourneyDataV1>(() => loadJourney());
  const debounceTimerRef = useRef<number | null>(null);

  // Sync state if storage was modified in another tab or component
  useEffect(() => {
    const handleStorageChange = () => {
      setJourney(loadJourney());
    };

    window.addEventListener('ask_ireland_journey_updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('ask_ireland_journey_updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Debounced auto-save on state change
  const persistChanges = useCallback((updated: IrishJourneyDataV1) => {
    setJourney(updated);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      saveJourney(updated);
    }, 250);
  }, []);

  const updateStamps = useCallback((stamps: StampPeriod[]) => {
    setJourney(prev => {
      const next = { ...prev, stamps };
      persistChanges(next);
      return next;
    });
  }, [persistChanges]);

  const updateAbsences = useCallback((absences: TravelAbsence[]) => {
    setJourney(prev => {
      const next = { ...prev, absences };
      persistChanges(next);
      return next;
    });
  }, [persistChanges]);

  const updateDocsForYear = useCallback((year: number, docIds: string[]) => {
    setJourney(prev => {
      const next = {
        ...prev,
        selectedDocsByYear: {
          ...prev.selectedDocsByYear,
          [year]: docIds
        }
      };
      persistChanges(next);
      return next;
    });
  }, [persistChanges]);

  const updateCurrentPermission = useCallback((perm: Partial<CurrentPermission>) => {
    setJourney(prev => {
      const next = {
        ...prev,
        currentPermission: {
          ...prev.currentPermission,
          ...perm
        }
      };
      persistChanges(next);
      return next;
    });
  }, [persistChanges]);

  const updateTargetRoute = useCallback((targetRoute: IrishJourneyDataV1['targetRoute']) => {
    setJourney(prev => {
      const next = { ...prev, targetRoute };
      persistChanges(next);
      return next;
    });
  }, [persistChanges]);

  const resetToDefault = useCallback(() => {
    setJourney(DEFAULT_JOURNEY);
    saveJourney(DEFAULT_JOURNEY);
  }, []);

  const wipeAllData = useCallback(() => {
    wipeJourneyStorage();
    setJourney({
      version: 1,
      lastUpdated: new Date().toISOString(),
      targetRoute: 'naturalisation_standard',
      currentPermission: {
        stampType: 'Stamp 1',
        startDate: '',
        expiryDate: ''
      },
      stamps: [],
      absences: [],
      selectedDocsByYear: {}
    });
  }, []);

  const downloadBackupJSON = useCallback(() => {
    const exportData = createJourneyExport(journey);
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ask-ireland-journey-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [journey]);

  const importBackupFile = useCallback(async (file: File): Promise<{ success: boolean; message: string }> => {
    try {
      const text = await file.text();
      const validated = parseAndValidateImport(text);
      if (!validated) {
        return {
          success: false,
          message: 'Invalid backup file format. Please upload a valid Ask Ireland JSON file.'
        };
      }

      setJourney(validated);
      saveJourney(validated);
      return {
        success: true,
        message: 'Journey restored successfully.'
      };
    } catch {
      return {
        success: false,
        message: 'Could not read or parse the selected file.'
      };
    }
  }, []);

  return {
    journey,
    updateStamps,
    updateAbsences,
    updateDocsForYear,
    updateCurrentPermission,
    updateTargetRoute,
    resetToDefault,
    wipeAllData,
    downloadBackupJSON,
    importBackupFile
  };
}
