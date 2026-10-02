import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  CalendarX, 
  Plane,
  Clock
} from 'lucide-react';
import { StampPeriod, TravelAbsence } from '../types';
import { evaluateCitizenship } from '../utils/citizenshipEngine';

export const CitizenshipCalculator: React.FC = () => {
  // Pre-loaded with user's scenario to demonstrate intelligent audit
  const [stamps, setStamps] = useState<StampPeriod[]>([
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
      endDate: '2023-02-11', // Inverted end date from user's screen
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
  ]);

  const [absences, setAbsences] = useState<TravelAbsence[]>([
    {
      id: '1',
      startDate: '2022-08-24',
      endDate: '2023-02-13',
      reason: 'Holiday / Extended Trip'
    },
    {
      id: '2',
      startDate: '2024-11-21',
      endDate: '2025-09-30',
      reason: 'Holiday / Extended Absence'
    }
  ]);

  const audit = useMemo(() => {
    return evaluateCitizenship(stamps, absences);
  }, [stamps, absences]);

  const handleAddStamp = () => {
    const newStamp: StampPeriod = {
      id: Date.now().toString(),
      stampType: 'Stamp 4',
      startDate: '2027-11-17',
      endDate: '2028-11-16',
      isEligible: true
    };
    setStamps([...stamps, newStamp]);
  };

  const handleRemoveStamp = (id: string) => {
    setStamps(stamps.filter(s => s.id !== id));
  };

  const handleUpdateStamp = (id: string, field: 'startDate' | 'endDate' | 'stampType', value: string) => {
    setStamps(stamps.map(s => {
      if (s.id !== id) return s;
      if (field === 'stampType') {
        const isEligible = value !== 'Stamp 2';
        return { ...s, stampType: value as StampPeriod['stampType'], isEligible };
      }
      return { ...s, [field]: value };
    }));
  };

  const handleAddAbsence = () => {
    const newAbsence: TravelAbsence = {
      id: Date.now().toString(),
      startDate: '',
      endDate: '',
      reason: 'Holiday'
    };
    setAbsences([...absences, newAbsence]);
  };

  const handleRemoveAbsence = (id: string) => {
    setAbsences(absences.filter(a => a.id !== id));
  };

  const handleUpdateAbsence = (id: string, field: 'startDate' | 'endDate' | 'reason', value: string) => {
    setAbsences(absences.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Calculator className="size-6" />
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Citizenship Reckonable Residence Engine
          </h2>
        </div>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Evaluates your residency under the <em>Irish Nationality and Citizenship Act 1956</em> (as amended by the <em>Courts and Civil Law Act 2023</em>). 
          Audits for <strong>statutory absences (&gt;70 days)</strong>, <strong>unregistered gaps</strong>, and <strong>the continuous 1-year rule</strong>.
        </p>
      </div>

      {/* Main Stats Card */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Audited Reckonable Residence
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${
                audit.warnings.some(w => w.type === 'error')
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-stone-900 dark:text-stone-50'
              }`}>
                {audit.netReckonableDays.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-stone-500">
                / {audit.targetDays.toLocaleString()} days ({audit.percentComplete}%)
              </span>
            </div>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="font-semibold text-stone-700 dark:text-stone-300">
              Gross Stamp Days: <strong>{audit.totalGrossStampDays}</strong> (Unique dates)
            </div>
            <div className="text-red-600 dark:text-red-400">
              Absences Deducted: <strong>{audit.totalAbsenceDays} days</strong>
            </div>
            {audit.totalGapDays > 0 && (
              <div className="text-amber-600 dark:text-amber-400">
                Unregistered Gaps: <strong>{audit.totalGapDays} days</strong>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
          <div 
            className={`h-full transition-all duration-500 ${
              audit.isContinuousYearValid ? 'bg-emerald-600' : 'bg-amber-500'
            }`}
            style={{ width: `${audit.percentComplete}%` }}
          />
        </div>

        {/* Continuous Year Status */}
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs dark:border-stone-800">
          <span className="flex items-center gap-1.5 font-medium text-stone-600 dark:text-stone-400">
            <Clock className="size-3.5" />
            Final Continuous Year Status:
          </span>
          {audit.isContinuousYearValid ? (
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              Passed (365 Unbroken Days)
            </span>
          ) : (
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
              Broken (Requires Reset)
            </span>
          )}
        </div>
      </div>

      {/* Critical Statutory Audit Warnings */}
      {audit.warnings.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
            <AlertOctagon className="size-4 text-red-600" />
            <span>Statutory Compliance Findings ({audit.warnings.length})</span>
          </div>

          {audit.warnings.map((warning, idx) => (
            <div 
              key={idx}
              className={`rounded-xl border p-4 text-xs transition ${
                warning.type === 'error'
                  ? 'border-red-200 bg-red-50/80 text-red-950 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200'
                  : warning.type === 'warning'
                  ? 'border-amber-200 bg-amber-50/80 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200'
                  : 'border-blue-200 bg-blue-50/80 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {warning.type === 'error' ? (
                  <AlertOctagon className="size-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                ) : warning.type === 'warning' ? (
                  <AlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                ) : (
                  <Info className="size-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold">{warning.title}</span>
                    {warning.period && (
                      <span className="rounded bg-black/5 px-2 py-0.5 font-mono text-[10px] dark:bg-white/10">
                        {warning.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 leading-relaxed opacity-90">{warning.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 1. IRP Registration Stamp Periods */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              1. IRP Registration Stamp Periods
            </h3>
            <p className="text-xs text-stone-500">
              Overlapping periods are automatically unified so individual calendar days are not double-counted.
            </p>
          </div>
          <button
            onClick={handleAddStamp}
            className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          >
            <Plus className="size-3.5" />
            Add Stamp Period
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {stamps.map((stamp) => {
            const hasInvertedDates = Boolean(
              stamp.startDate && 
              stamp.endDate && 
              new Date(stamp.endDate).getTime() < new Date(stamp.startDate).getTime()
            );

            return (
              <div 
                key={stamp.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 shadow-sm transition ${
                  hasInvertedDates
                    ? 'border-red-300 bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/20'
                    : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <select
                    value={stamp.stampType}
                    onChange={(e) => handleUpdateStamp(stamp.id, 'stampType', e.target.value)}
                    className="rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                  >
                    <option value="Stamp 1">Stamp 1 (Employment Permit)</option>
                    <option value="Stamp 1G">Stamp 1G (Graduate / Spousal)</option>
                    <option value="Stamp 4">Stamp 4 (Permanent / CSEP upgrade)</option>
                    <option value="Stamp 3">Stamp 3 (Dependant / Volunteer)</option>
                    <option value="Stamp 5">Stamp 5 (Without Condition as to Time)</option>
                    <option value="Stamp 2">Stamp 2 (Student - Ineligible)</option>
                  </select>

                  {hasInvertedDates && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400">
                      <CalendarX className="size-3.5" />
                      End date is earlier than start date
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={stamp.startDate}
                    onChange={(e) => handleUpdateStamp(stamp.id, 'startDate', e.target.value)}
                    className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                  />
                  <span className="text-xs text-stone-400">to</span>
                  <input
                    type="date"
                    value={stamp.endDate}
                    onChange={(e) => handleUpdateStamp(stamp.id, 'endDate', e.target.value)}
                    className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                  />

                  <button
                    onClick={() => handleRemoveStamp(stamp.id)}
                    className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-red-600 dark:hover:bg-stone-800"
                    title="Remove stamp"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Trips Abroad & Absences */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              2. Trips Abroad & Absences
            </h3>
            <span className="text-xs text-stone-500">
              The Department of Justice allows up to 70 days absence in the year preceding application, with up to 100 days for exceptional reasons.
            </span>
          </div>
          <button
            onClick={handleAddAbsence}
            className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          >
            <Plus className="size-3.5" />
            Add Trip Abroad
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {absences.map((absence) => {
            let durationDays = 0;
            if (absence.startDate && absence.endDate) {
              const start = new Date(absence.startDate).getTime();
              const end = new Date(absence.endDate).getTime();
              if (end > start) {
                durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
              }
            }

            return (
              <div 
                key={absence.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 shadow-sm transition ${
                  durationDays > 100
                    ? 'border-red-300 bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/20'
                    : durationDays > 70
                    ? 'border-amber-300 bg-amber-50/40 dark:border-amber-900/60 dark:bg-amber-950/20'
                    : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Plane className="size-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Reason (e.g. Annual leave, family visit)"
                    value={absence.reason}
                    onChange={(e) => handleUpdateAbsence(absence.id, 'reason', e.target.value)}
                    className="rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                  />
                  {durationDays > 0 && (
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                      durationDays > 100
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : durationDays > 70
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                    }`}>
                      {durationDays} days {durationDays > 100 ? '(! Exceeds 100d Limit)' : durationDays > 70 ? '(Requires Exceptional Grounds)' : '(Permissible)'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={absence.startDate}
                    onChange={(e) => handleUpdateAbsence(absence.id, 'startDate', e.target.value)}
                    className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                  />
                  <span className="text-xs text-stone-400">to</span>
                  <input
                    type="date"
                    value={absence.endDate}
                    onChange={(e) => handleUpdateAbsence(absence.id, 'endDate', e.target.value)}
                    className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                  />

                  <button
                    onClick={() => handleRemoveAbsence(absence.id)}
                    className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-red-600 dark:hover:bg-stone-800"
                    title="Remove absence"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
