import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { LegalSafetyNotice } from './LegalSafetyNotice';
import { useIrishJourney } from '../hooks/useIrishJourney';

interface ScorecardDoc {
  id: string;
  name: string;
  points: number;
  type: 'A' | 'B';
  description: string;
}

const SCORECARD_DOCS: ScorecardDoc[] = [
  // Type A - Primary Proofs (High Weight)
  {
    id: 'p60',
    name: 'Revenue Employment Detail Summary (P60)',
    points: 70,
    type: 'A',
    description: 'Downloaded from Revenue myAccount showing full year PAYE employment.'
  },
  {
    id: 'noa',
    name: 'Revenue Notice of Assessment / Tax Return',
    points: 70,
    type: 'A',
    description: 'For self-employed applicants or balanced end-of-year tax returns.'
  },
  {
    id: 'dsp_statement',
    name: 'DSP Social Welfare Annual Statement',
    points: 70,
    type: 'A',
    description: 'Official Department of Social Protection annual statement of payments.'
  },
  {
    id: 'school_letter',
    name: 'School / College Attendance Certificate',
    points: 50,
    type: 'A',
    description: 'Signed letter from Irish school or third-level institution confirming attendance.'
  },

  // Type B - Supporting Proofs
  {
    id: 'bank_statements',
    name: 'Bank Statements with Everyday Card Transactions (6+ Months)',
    points: 50,
    type: 'B',
    description: 'Statements showing regular in-person retail spending (groceries, transport) in Ireland.'
  },
  {
    id: 'rtb_tenancy',
    name: 'RTB Registered Tenancy Agreement / Letter',
    points: 40,
    type: 'B',
    description: 'Official Residential Tenancies Board confirmation of tenancy registration.'
  },
  {
    id: 'mortgage_statement',
    name: 'Mortgage Statement or Title Deeds',
    points: 40,
    type: 'B',
    description: 'Proof of residential property ownership in the State.'
  },
  {
    id: 'electricity_bill',
    name: 'Electricity Utility Bill (Electric Ireland, Bord Gáis, etc.)',
    points: 20,
    type: 'B',
    description: 'Dated utility bill matching the applicant name and address.'
  },
  {
    id: 'gas_bill',
    name: 'Gas or Home Heating Oil Bill',
    points: 20,
    type: 'B',
    description: 'Residential heating utility invoice.'
  },
  {
    id: 'broadband_bill',
    name: 'Fixed Landline Broadband / Home Internet Bill',
    points: 20,
    type: 'B',
    description: 'Bill from Virgin Media, Eir, Vodafone, or Sky for home broadband.'
  },
  {
    id: 'motor_tax',
    name: 'Car Insurance Certificate or Motor Tax Disc',
    points: 20,
    type: 'B',
    description: 'Vehicle policy document or tax renewal notice registered at your address.'
  },
  {
    id: 'tv_licence',
    name: 'TV Licence Renewal',
    points: 10,
    type: 'B',
    description: 'An Post television licence payment confirmation.'
  }
];

export const ScorecardCalculator: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const { journey, updateDocsForYear } = useIrishJourney();
  const selectedDocs = journey.selectedDocsByYear || {};

  const currentYearDocIds = selectedDocs[selectedYear] || [];

  const handleToggleDoc = (docId: string) => {
    const isSelected = currentYearDocIds.includes(docId);
    const updated = isSelected 
      ? currentYearDocIds.filter(id => id !== docId)
      : [...currentYearDocIds, docId];

    updateDocsForYear(selectedYear, updated);
  };

  const handleResetYear = () => {
    updateDocsForYear(selectedYear, []);
  };

  // Score Calculation
  const { totalPoints, typeAPoints, typeBPoints, hasTypeA, isPassed } = React.useMemo(() => {
    let ptsA = 0;
    let ptsB = 0;

    for (const doc of SCORECARD_DOCS) {
      if (currentYearDocIds.includes(doc.id)) {
        if (doc.type === 'A') ptsA += doc.points;
        else ptsB += doc.points;
      }
    }

    const total = ptsA + ptsB;
    const hasA = ptsA > 0;
    const pass = total >= 150 && hasA;

    return {
      totalPoints: total,
      typeAPoints: ptsA,
      typeBPoints: ptsB,
      hasTypeA: hasA,
      isPassed: pass
    };
  }, [currentYearDocIds]);

  const progressPct = Math.min(100, Math.round((totalPoints / 150) * 100));

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 sm:pb-5 dark:border-stone-800">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Award className="size-5 sm:size-6 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Citizenship 150-Point Residence Scorecard
          </h2>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Under Department of Justice naturalisation rules, you must reach <strong>150 points for each separate reckonable year</strong>. 
          You must provide at least one high-weight Type A document (70 pts).
        </p>
      </div>

      <div className="mt-5">
        <LegalSafetyNotice 
          compact 
          title="Evidence preparation aid, not eligibility determination"
          description="Reaching 150 points confirms your selected documents reach the Department of Justice annual weighting benchmark. It does not decide statutory eligibility or guarantee naturalisation, which remains subject to ministerial discretion and full vetting."
        />
      </div>

      {/* Year Selector Tabs */}
      <div className="mt-6 flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((yr) => {
            const yrDocs = selectedDocs[yr] || [];
            const pts = yrDocs.reduce((acc, id) => {
              const d = SCORECARD_DOCS.find(x => x.id === id);
              return acc + (d ? d.points : 0);
            }, 0);
            const hasA = yrDocs.some(id => SCORECARD_DOCS.find(x => x.id === id)?.type === 'A');
            const passed = pts >= 150 && hasA;

            return (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  selectedYear === yr
                    ? 'bg-emerald-800 text-white shadow-xs dark:bg-emerald-600'
                    : 'bg-white border border-stone-200/90 text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                <span>Year {yr}</span>
                {passed && (
                  <CheckCircle2 className={`size-3.5 ${selectedYear === yr ? 'text-emerald-200' : 'text-emerald-600'}`} />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleResetYear}
          className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition"
          title="Reset selections for this year"
        >
          <RefreshCw className="size-3" />
          <span className="hidden sm:inline">Reset Year</span>
        </button>
      </div>

      {/* Progress & Verdict Card */}
      <div className="mt-6 rounded-2xl border-2 border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Year {selectedYear} Evidence Weight
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-4xl font-black ${isPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {totalPoints}
              </span>
              <span className="text-sm font-semibold text-stone-500">
                / 150 points ({progressPct}%)
              </span>
            </div>
          </div>

          <div className="text-xs space-y-1 sm:text-right">
            <div className="text-stone-700 dark:text-stone-300">
              Type A (Primary): <strong className={hasTypeA ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-red-600 font-bold'}>{typeAPoints} pts {hasTypeA ? '✓ Satisfied' : '(Missing)'}</strong>
            </div>
            <div className="text-stone-700 dark:text-stone-300">
              Type B (Supporting): <strong>{typeBPoints} pts</strong>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
          <div 
            className={`h-full transition-all duration-500 ${isPassed ? 'bg-emerald-600' : 'bg-amber-500'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Audit Verdict Banner */}
        <div className="mt-4">
          {isPassed ? (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-bold text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
              <span>Year {selectedYear} benchmark reached: 150+ points accumulated including mandatory Type A evidence.</span>
            </div>
          ) : !hasTypeA ? (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/80 p-3 text-xs font-bold text-red-950 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              <AlertTriangle className="size-4 shrink-0 text-red-600" />
              <span>Mandatory Requirement: You must select at least one Type A document (e.g. Revenue P60). Utility bills alone are not accepted.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs font-bold text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
              <AlertTriangle className="size-4 shrink-0 text-amber-600" />
              <span>Need {150 - totalPoints} more points to reach the 150-point annual benchmark for Year {selectedYear}.</span>
            </div>
          )}
        </div>
      </div>

      {/* Document Selection Checklist */}
      <div className="mt-8 space-y-6">
        
        {/* Type A */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Type A Documents (Primary Proofs — High Weight)
            </h3>
            <span className="text-xs text-stone-500 font-medium">At least one required</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {SCORECARD_DOCS.filter(d => d.type === 'A').map((doc) => {
              const checked = currentYearDocIds.includes(doc.id);
              return (
                <label
                  key={doc.id}
                  onClick={() => handleToggleDoc(doc.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                    checked
                      ? 'border-emerald-500 bg-emerald-50/50 dark:border-emerald-600 dark:bg-emerald-950/30'
                      : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    className="mt-1 size-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {doc.name}
                      </span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        +{doc.points} pts
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400">
                      {doc.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Type B */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Type B Documents (Supporting Residency Proofs)
            </h3>
            <span className="text-xs text-stone-500 font-medium">Accumulate to reach 150 points</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {SCORECARD_DOCS.filter(d => d.type === 'B').map((doc) => {
              const checked = currentYearDocIds.includes(doc.id);
              return (
                <label
                  key={doc.id}
                  onClick={() => handleToggleDoc(doc.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                    checked
                      ? 'border-emerald-500 bg-emerald-50/50 dark:border-emerald-600 dark:bg-emerald-950/30'
                      : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    className="mt-1 size-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {doc.name}
                      </span>
                      <span className="rounded bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                        +{doc.points} pts
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400">
                      {doc.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

      </div>

      {/* Outbound Official Guidelines Link */}
      <div className="mt-8 flex justify-end">
        <a
          href="https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
        >
          <span>View Official Department of Justice Scorecard Guidance</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

    </div>
  );
};
