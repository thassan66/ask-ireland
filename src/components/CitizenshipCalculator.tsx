import React, { useState, useMemo } from 'react';
import { Calculator, Plus, Trash2, CalendarCheck, AlertTriangle } from 'lucide-react';
import { StampPeriod, TravelAbsence } from '../types';

export const CitizenshipCalculator: React.FC = () => {
  const [stamps, setStamps] = useState<StampPeriod[]>([
    {
      id: '1',
      stampType: 'Stamp 1',
      startDate: '2022-10-01',
      endDate: '2024-10-01',
      isEligible: true
    },
    {
      id: '2',
      stampType: 'Stamp 4',
      startDate: '2024-10-02',
      endDate: '2026-10-01',
      isEligible: true
    }
  ]);

  const [absences, setAbsences] = useState<TravelAbsence[]>([
    {
      id: '1',
      startDate: '2023-07-01',
      endDate: '2023-07-21',
      reason: 'Annual leave abroad'
    }
  ]);

  const handleAddStamp = () => {
    const newStamp: StampPeriod = {
      id: Date.now().toString(),
      stampType: 'Stamp 4',
      startDate: '2026-10-02',
      endDate: '2027-10-01',
      isEligible: true
    };
    setStamps([...stamps, newStamp]);
  };

  const handleRemoveStamp = (id: string) => {
    setStamps(stamps.filter(s => s.id !== id));
  };

  const handleUpdateStampType = (id: string, type: StampPeriod['stampType']) => {
    const isEligible = type !== 'Stamp 2';
    setStamps(stamps.map(s => s.id === id ? { ...s, stampType: type, isEligible } : s));
  };

  const handleAddAbsence = () => {
    const newAbsence: TravelAbsence = {
      id: Date.now().toString(),
      startDate: '2024-06-01',
      endDate: '2024-06-14',
      reason: 'Holiday'
    };
    setAbsences([...absences, newAbsence]);
  };

  const handleRemoveAbsence = (id: string) => {
    setAbsences(absences.filter(a => a.id !== id));
  };

  // Calculation Engine
  const { totalAbsenceDays, netReckonableDays, targetDays, percentComplete } = useMemo(() => {
    let grossDays = 0;

    for (const stamp of stamps) {
      if (stamp.isEligible && stamp.startDate && stamp.endDate) {
        const start = new Date(stamp.startDate).getTime();
        const end = new Date(stamp.endDate).getTime();
        if (end > start) {
          const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          grossDays += diffDays;
        }
      }
    }

    let awayDays = 0;
    for (const absence of absences) {
      if (absence.startDate && absence.endDate) {
        const start = new Date(absence.startDate).getTime();
        const end = new Date(absence.endDate).getTime();
        if (end > start) {
          awayDays += Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }
      }
    }

    const net = Math.max(0, grossDays - awayDays);
    const target = 1825; // 5 years = 365 * 5
    const pct = Math.min(100, Math.round((net / target) * 100));

    return {
      totalEligibleDays: grossDays,
      totalAbsenceDays: awayDays,
      netReckonableDays: net,
      targetDays: target,
      percentComplete: pct
    };
  }, [stamps, absences]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      
      {/* Title */}
      <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Calculator className="size-6" />
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Citizenship Reckonable Residence Engine
          </h2>
        </div>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Calculates your eligibility for Naturalisation under the <em>Irish Nationality and Citizenship Act 1956</em> (as amended). 
          Requires 1,825 reckonable days over the last 9 years, including 365 continuous days before applying.
        </p>
      </div>

      {/* Progress Card */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Total Reckonable Residence
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-stone-900 dark:text-stone-50">
                {netReckonableDays.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-stone-500">
                / {targetDays.toLocaleString()} days ({percentComplete}%)
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-medium text-stone-500">
              Remaining: <strong className="text-emerald-700 dark:text-emerald-400">{Math.max(0, targetDays - netReckonableDays)} days</strong>
            </span>
            <div className="text-xs text-stone-400">
              Total Absences Deducted: {totalAbsenceDays} days
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
          <div 
            className="h-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {netReckonableDays >= targetDays && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
            <CalendarCheck className="size-4 shrink-0 text-emerald-600" />
            <span>You have reached the statutory 1,825 days requirement. Verify your continuous 365-day period prior to submitting Form 8.</span>
          </div>
        )}
      </div>

      {/* Stamp Periods Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            1. IRP Registration Stamp Periods
          </h3>
          <button
            onClick={handleAddStamp}
            className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          >
            <Plus className="size-3.5" />
            Add Stamp Period
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {stamps.map((stamp) => (
            <div 
              key={stamp.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-center gap-3">
                <select
                  value={stamp.stampType}
                  onChange={(e) => handleUpdateStampType(stamp.id, e.target.value as any)}
                  className="rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                >
                  <option value="Stamp 1">Stamp 1 (Employment Permit)</option>
                  <option value="Stamp 1G">Stamp 1G (Graduate / Spousal)</option>
                  <option value="Stamp 4">Stamp 4 (Permanent / CSEP upgrade)</option>
                  <option value="Stamp 3">Stamp 3 (Dependant / Volunteer)</option>
                  <option value="Stamp 5">Stamp 5 (Without Condition as to Time)</option>
                  <option value="Stamp 2">Stamp 2 (Student - Ineligible)</option>
                </select>

                {!stamp.isEligible && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-red-600 dark:text-red-400">
                    <AlertTriangle className="size-3.5" />
                    Stamp 2 does not count towards citizenship
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={stamp.startDate}
                  onChange={(e) => setStamps(stamps.map(s => s.id === stamp.id ? { ...s, startDate: e.target.value } : s))}
                  className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                />
                <span className="text-xs text-stone-400">to</span>
                <input
                  type="date"
                  value={stamp.endDate}
                  onChange={(e) => setStamps(stamps.map(s => s.id === stamp.id ? { ...s, endDate: e.target.value } : s))}
                  className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                />

                <button
                  onClick={() => handleRemoveStamp(stamp.id)}
                  className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-red-600 dark:hover:bg-stone-800"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Absences Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              2. Trips Abroad & Absences
            </h3>
            <span className="text-xs text-stone-500">
              The Department of Justice allows up to 6 weeks (42 days) absence per calendar year.
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
          {absences.map((absence) => (
            <div 
              key={absence.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <input
                type="text"
                placeholder="Reason (e.g. Annual leave, family visit)"
                value={absence.reason}
                onChange={(e) => setAbsences(absences.map(a => a.id === absence.id ? { ...a, reason: e.target.value } : a))}
                className="rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
              />

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={absence.startDate}
                  onChange={(e) => setAbsences(absences.map(a => a.id === absence.id ? { ...a, startDate: e.target.value } : a))}
                  className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                />
                <span className="text-xs text-stone-400">to</span>
                <input
                  type="date"
                  value={absence.endDate}
                  onChange={(e) => setAbsences(absences.map(a => a.id === absence.id ? { ...a, endDate: e.target.value } : a))}
                  className="rounded-lg border border-stone-300 bg-stone-50 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                />

                <button
                  onClick={() => handleRemoveAbsence(absence.id)}
                  className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-red-600 dark:hover:bg-stone-800"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
