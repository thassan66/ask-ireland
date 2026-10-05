import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Plus, 
  Trash2, 
  CalendarX, 
  Plane, 
  Printer, 
  Users, 
  Award,
  BookOpen
} from 'lucide-react';
import { StampPeriod, TravelAbsence, CitizenshipRoute } from '../types';
import { evaluateCitizenship } from '../utils/citizenshipEngine';
import { LegalSafetyNotice } from './LegalSafetyNotice';
import { useIrishJourney } from '../hooks/useIrishJourney';

export const CitizenshipCalculator: React.FC = () => {
  const { journey, updateStamps, updateAbsences, updateTargetRoute } = useIrishJourney();
  const stamps = journey.stamps;
  const absences = journey.absences;

  // Active route selection
  const [selectedRoute, setSelectedRoute] = useState<CitizenshipRoute>(() => {
    if (journey.targetRoute === 'naturalisation_spouse_irish') return 'spouse';
    return 'standard';
  });

  // Pre-flight checklist interactive state
  const [checklist, setChecklist] = useState({
    taxCleared: true,
    cleanCharacter: true,
    docsReady: false,
    marriageThreeYears: true
  });

  // Calculate audit based on active route
  const calcRoute = selectedRoute === 'spouse' ? 'spouse' : 'standard';
  const audit = useMemo(() => {
    return evaluateCitizenship(stamps, absences, calcRoute);
  }, [stamps, absences, calcRoute]);

  const handleRouteChange = (route: CitizenshipRoute) => {
    setSelectedRoute(route);
    if (route === 'spouse') {
      updateTargetRoute('naturalisation_spouse_irish');
    } else if (route === 'standard') {
      updateTargetRoute('naturalisation_standard');
    }
  };

  const handleAddStamp = () => {
    const newStamp: StampPeriod = {
      id: Date.now().toString(),
      stampType: 'Stamp 4',
      startDate: '2027-11-17',
      endDate: '2028-11-16',
      isEligible: true
    };
    updateStamps([...stamps, newStamp]);
  };

  const handleRemoveStamp = (id: string) => {
    updateStamps(stamps.filter(s => s.id !== id));
  };

  const handleUpdateStamp = (id: string, field: 'startDate' | 'endDate' | 'stampType', value: string) => {
    updateStamps(stamps.map(s => {
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
    updateAbsences([...absences, newAbsence]);
  };

  const handleRemoveAbsence = (id: string) => {
    updateAbsences(absences.filter(a => a.id !== id));
  };

  const handleUpdateAbsence = (id: string, field: 'startDate' | 'endDate' | 'reason', value: string) => {
    updateAbsences(absences.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 sm:pb-5 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <Calculator className="size-5 sm:size-6 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
              Irish Citizenship &amp; Residency Hub
            </h2>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-700 shadow-xs hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
            title="Print or Save PDF report for Form 8"
          >
            <Printer className="size-3.5" />
            <span>Print / Save PDF Report</span>
          </button>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Statutory compliance audit under the <em>Irish Nationality and Citizenship Act 1956</em> (as amended by the <em>Courts and Civil Law Act 2023</em>).
        </p>
      </div>

      {/* Route Selector Tabs (Standard vs Spouse vs FBR vs EU) */}
      <div className="mt-6">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
          Select Your Legal Route:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          
          {/* 1. Standard */}
          <button
            onClick={() => handleRouteChange('standard')}
            className={`flex flex-col p-3 rounded-xl border text-left transition ${
              selectedRoute === 'standard'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-xs'
                : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs sm:text-sm">Standard</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                5 Years
              </span>
            </div>
            <span className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              1,825 days out of 8 years (Section 15)
            </span>
          </button>

          {/* 2. Spouse of Irish Citizen */}
          <button
            onClick={() => handleRouteChange('spouse')}
            className={`flex flex-col p-3 rounded-xl border text-left transition ${
              selectedRoute === 'spouse'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-xs'
                : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs sm:text-sm flex items-center gap-1">
                <span>Spouse</span>
                <Heart className="size-3 text-red-500 fill-red-500 shrink-0" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
                3 Years
              </span>
            </div>
            <span className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              1,095 days out of 5 years (Section 15A)
            </span>
          </button>

          {/* 3. Irish Descent / FBR */}
          <button
            onClick={() => handleRouteChange('fbr')}
            className={`flex flex-col p-3 rounded-xl border text-left transition ${
              selectedRoute === 'fbr'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-xs'
                : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs sm:text-sm">Grandparent / FBR</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                0 Days
              </span>
            </div>
            <span className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              Foreign Births Register descent
            </span>
          </button>

          {/* 4. EU / EEA Citizens */}
          <button
            onClick={() => handleRouteChange('eu_guidance')}
            className={`flex flex-col p-3 rounded-xl border text-left transition ${
              selectedRoute === 'eu_guidance'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-xs'
                : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 text-stone-700 dark:text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs sm:text-sm">EU / EEA Nationals</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300">
                No IRP
              </span>
            </div>
            <span className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
              Prove via Revenue P60 / EDS
            </span>
          </button>

        </div>
      </div>

      <div className="mt-5">
        <LegalSafetyNotice compact />
      </div>

      {/* ========================================================================= */}
      {/* VIEW A: FOREIGN BIRTHS REGISTER (FBR) DESCENT NAVIGATOR                  */}
      {/* ========================================================================= */}
      {selectedRoute === 'fbr' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 sm:p-6 dark:border-blue-900/60 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <Award className="size-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-950 dark:text-blue-100">
                  Irish Citizenship by Descent (Foreign Births Register)
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-blue-900/80 dark:text-blue-200">
                  If your parent or grandparent was born on the island of Ireland, <strong>you do not need naturalisation</strong>. 
                  You do not need to live in Ireland for 1,825 days, and you do not need to pay €1,125 in naturalisation fees. 
                  You are legally entitled to register as an Irish citizen via the Department of Foreign Affairs (DFA).
                </p>
              </div>
            </div>

            {/* Comparison Box */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px] tracking-wider block">
                  Foreign Births Register (DFA)
                </span>
                <ul className="mt-2 space-y-1.5 text-stone-600 dark:text-stone-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span><strong>0 days</strong> of Irish residence required</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Cost: €278 adult fee (€153 for child)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Can apply from anywhere in the world</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    <span>Direct pathway to Irish Passport</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
                <span className="font-bold text-stone-500 uppercase text-[10px] tracking-wider block">
                  Naturalisation Form 8 (ISD)
                </span>
                <ul className="mt-2 space-y-1.5 text-stone-600 dark:text-stone-300">
                  <li>• Requires 1,825 days (5 years) living in Ireland</li>
                  <li>• Cost: €175 application + €950 certificate fee</li>
                  <li>• Form 8 scorecard + Garda vetting + P60 audits</li>
                  <li>• Only needed if you have NO Irish-born ancestors</li>
                </ul>
              </div>
            </div>

            {/* Checklist of Documents for FBR */}
            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-3">
                Civil Records Needed for FBR Application (Grandparent Route)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-start gap-2">
                  <span className="size-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Grandparent's original civil birth certificate (issued by HSE GRO Ireland)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="size-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>Grandparent's civil marriage certificate</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="size-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span>Parent's civil birth certificate and marriage certificate</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="size-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                  <span>Applicant's original long-form birth certificate &amp; witness verification</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://www.dfa.ie/citizenship/born-abroad/registering-a-foreign-birth/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition"
              >
                <span>Go to DFA Foreign Births Register Portal</span>
                <ExternalLink className="size-3.5" />
              </a>
              <button
                onClick={() => handleRouteChange('standard')}
                className="text-xs font-semibold text-blue-800 dark:text-blue-300 underline"
              >
                Switch to Standard 5-Year Naturalisation Calculator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW B: EU / EEA RESIDENT GUIDANCE                                        */}
      {/* ========================================================================= */}
      {selectedRoute === 'eu_guidance' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5 sm:p-6 dark:border-purple-900/60 dark:bg-purple-950/20">
            <div className="flex items-start gap-3">
              <Users className="size-6 text-purple-600 dark:text-purple-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-purple-950 dark:text-purple-100">
                  EU / EEA &amp; Swiss Citizens Naturalisation Guide
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-purple-900/80 dark:text-purple-200">
                  Under EU Directive 2004/38/EC, EU, EEA, and Swiss nationals do not receive IRP stamp cards. 
                  You still require 5 years (1,825 days) of reckonable residence (or 3 years if married to an Irish citizen), 
                  but you prove this through official Revenue and DSP tax records.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-purple-200 bg-white p-4.5 dark:border-stone-800 dark:bg-stone-900">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-3">
                How EU Citizens Prove 5 Years of Reckonable Residence
              </h4>
              <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>1. Revenue Employment Detail Summaries (P60s / EDS):</strong>
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5">
                      Submit 1 EDS per calendar year from Revenue myAccount. Each EDS provides 70 points of Type A residence proof.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>2. Notice of Assessment (If Self-Employed):</strong>
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5">
                      Tax compliance confirmation via ROS/Revenue demonstrating ongoing business operation in the State.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>3. DSP Contribution Statement:</strong>
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5">
                      Download from MyGovID showing 52 insurable contribution PRSI weeks per year.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>4. Three Proofs of Address (Type B):</strong>
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5">
                      Utility bills, residential tenancy agreement (RTB), or mortgage statements totaling at least 80 points to reach 150 points per year.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => handleRouteChange('standard')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-800 transition"
              >
                <span>Open Date &amp; Absence Engine</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW C & D: STANDARD & SPOUSAL NATURALISATION CALCULATORS                 */}
      {/* ========================================================================= */}
      {(selectedRoute === 'standard' || selectedRoute === 'spouse') && (
        <>
          {/* Statutory Route Banner */}
          <div className={`mt-5 rounded-xl p-3.5 text-xs border ${
            selectedRoute === 'spouse'
              ? 'bg-amber-50/70 border-amber-200 text-amber-950 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-200'
              : 'bg-stone-50 border-stone-200 text-stone-800 dark:bg-stone-900/60 dark:border-stone-800 dark:text-stone-200'
          }`}>
            <div className="flex items-start gap-2.5">
              <BookOpen className="size-4 shrink-0 text-emerald-700 dark:text-emerald-400 mt-0.5" />
              <div>
                <strong>
                  {selectedRoute === 'spouse'
                    ? 'Section 15A Route: Spouse / Civil Partner of Irish Citizen'
                    : 'Section 15 Route: Standard Adult Naturalisation by Residence'}
                </strong>
                <p className="mt-0.5 opacity-90 leading-relaxed">
                  {selectedRoute === 'spouse'
                    ? 'Requires 1,095 reckonable days (3 years) within the preceding 5 years, including 365 days of continuous residence immediately before your application date. You must be married or in a civil partnership for at least 3 continuous years living together.'
                    : 'Requires 1,825 reckonable days (5 years) within the preceding 8 years, including 365 days of continuous residence immediately before your application date. Absences in the final year must remain under 70 days.'}
                </p>
              </div>
            </div>
          </div>

          {/* Main Stats Card */}
          <div className="mt-5 sm:mt-6 rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Audited Reckonable Residence
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className={`text-3xl sm:text-4xl font-extrabold ${
                    audit.warnings.some(w => w.type === 'error')
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-stone-900 dark:text-stone-50'
                  }`}>
                    {audit.netReckonableDays.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-500">
                    / {audit.targetDays.toLocaleString()} days ({audit.percentComplete}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-1 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100 dark:border-stone-800">
                <div className="font-semibold text-stone-700 dark:text-stone-300">
                  Gross Stamp Days: <strong>{audit.totalGrossStampDays}</strong>
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
            <div className="mt-4 h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
              <div 
                className={`h-full transition-all duration-500 ${
                  audit.isContinuousYearValid ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
                style={{ width: `${audit.percentComplete}%` }}
              />
            </div>

            {/* Continuous Year Status */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs dark:border-stone-800">
              <span className="flex items-center gap-1.5 font-medium text-stone-600 dark:text-stone-400">
                <Clock className="size-3.5" />
                Final Continuous 365-Day Status:
              </span>
              {audit.isContinuousYearValid ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Passed (≤70 Absences)
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                  Broken (Clock Restarts)
                </span>
              )}
            </div>
          </div>

          {/* Statutory Pre-Flight Checklist */}
          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3 dark:border-stone-800">
              <ShieldCheck className="size-4 text-emerald-700 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Form 8 Statutory Pre-Flight Audit
              </h3>
            </div>

            <div className="mt-3.5 space-y-2.5 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={checklist.taxCleared}
                  onChange={(e) => setChecklist(prev => ({ ...prev, taxCleared: e.target.checked }))}
                  className="mt-0.5 size-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600"
                />
                <span className="text-stone-700 dark:text-stone-300">
                  <strong>Tax Clearance (Section 15(1)(b)):</strong> No outstanding tax liabilities with Revenue. You can provide an Employment Detail Summary or Statement of Liability for each required year.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={checklist.cleanCharacter}
                  onChange={(e) => setChecklist(prev => ({ ...prev, cleanCharacter: e.target.checked }))}
                  className="mt-0.5 size-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600"
                />
                <span className="text-stone-700 dark:text-stone-300">
                  <strong>Good Character Standard:</strong> No unspent criminal convictions, persistent driving penalty points, or pending court summonses in Ireland or abroad.
                </span>
              </label>

              {selectedRoute === 'spouse' && (
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={checklist.marriageThreeYears}
                    onChange={(e) => setChecklist(prev => ({ ...prev, marriageThreeYears: e.target.checked }))}
                    className="mt-0.5 size-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <span className="text-stone-700 dark:text-stone-300">
                    <strong>Marital Co-residence (Section 15A):</strong> Married / in civil partnership with an Irish citizen for at least 3 continuous years, currently living together as spouse/partner in Ireland.
                  </span>
                </label>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                <span className="text-stone-500">Form 8 Annual Evidence Checklist:</span>
                <a
                  href="/scorecard"
                  className="font-bold text-emerald-700 hover:underline dark:text-emerald-400 flex items-center gap-1"
                >
                  <span>Verify 150-Point Scorecard</span>
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Critical Statutory Audit Warnings */}
          {audit.warnings.length > 0 && (
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                <AlertOctagon className="size-4 text-red-600 shrink-0" />
                <span>Statutory Compliance Findings ({audit.warnings.length})</span>
              </div>

              {audit.warnings.map((warning, idx) => (
                <div 
                  key={idx}
                  className={`rounded-xl border p-3.5 sm:p-4 text-xs transition ${
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
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-bold text-sm sm:text-xs">{warning.title}</span>
                        {warning.period && (
                          <span className="self-start rounded bg-black/5 px-2 py-0.5 font-mono text-[10px] dark:bg-white/10">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  1. IRP Registration Stamp Periods
                </h3>
                <p className="text-xs text-stone-500">
                  Overlapping periods are unified so individual calendar days are not double-counted.
                </p>
              </div>
              <button
                onClick={handleAddStamp}
                className="self-start sm:self-auto flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                <Plus className="size-3.5" />
                Add Stamp Period
              </button>
            </div>

            <div className="mt-3.5 space-y-3">
              {stamps.map((stamp) => {
                const hasInvertedDates = Boolean(
                  stamp.startDate && 
                  stamp.endDate && 
                  new Date(stamp.endDate).getTime() < new Date(stamp.startDate).getTime()
                );

                const isNonReckonable = stamp.stampType === 'Stamp 2';
                const isNoWorkReckonable = stamp.stampType === 'Stamp 3';

                return (
                  <div 
                    key={stamp.id}
                    className={`rounded-2xl border p-4 shadow-2xs transition ${
                      hasInvertedDates
                        ? 'border-red-300 bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/20'
                        : isNonReckonable
                        ? 'border-amber-200/90 bg-amber-50/20 dark:border-amber-900/40 dark:bg-stone-900'
                        : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900'
                    }`}
                  >
                    {/* Stamp Header Row: Type Dropdown + Reckonability Badge + Delete */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 flex-1">
                        <select
                          value={stamp.stampType}
                          onChange={(e) => handleUpdateStamp(stamp.id, 'stampType', e.target.value)}
                          className="w-full sm:w-auto flex-1 rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-bold text-stone-900 shadow-2xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                        >
                          <option value="Stamp 1">Stamp 1 (Employment Permit)</option>
                          <option value="Stamp 1G">Stamp 1G (Graduate / Spousal)</option>
                          <option value="Stamp 4">Stamp 4 (Permanent / CSEP upgrade)</option>
                          <option value="Stamp 3">Stamp 3 (Dependant / Volunteer)</option>
                          <option value="Stamp 5">Stamp 5 (Without Condition as to Time)</option>
                          <option value="Stamp 2">Stamp 2 (Student - Non-Reckonable)</option>
                        </select>

                        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isNonReckonable
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                            : isNoWorkReckonable
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {isNonReckonable ? 'Non-Reckonable' : 'Reckonable'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemoveStamp(stamp.id)}
                        className="self-end sm:self-auto flex size-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-red-600 dark:hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        title="Remove stamp period"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {hasInvertedDates && (
                      <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-300">
                        <CalendarX className="size-3.5 shrink-0" />
                        <span>Invalid period: End date cannot be earlier than start date.</span>
                      </div>
                    )}

                    {/* Dates: 2-column grid */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-12 text-stone-500 font-semibold">From:</span>
                        <input
                          type="date"
                          value={stamp.startDate}
                          onChange={(e) => handleUpdateStamp(stamp.id, 'startDate', e.target.value)}
                          className="flex-1 rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-12 text-stone-500 font-semibold">To:</span>
                        <input
                          type="date"
                          value={stamp.endDate}
                          onChange={(e) => handleUpdateStamp(stamp.id, 'endDate', e.target.value)}
                          className="flex-1 rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Trips Abroad & Absences */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  2. Trips Abroad &amp; Absences
                </h3>
                <span className="text-xs text-stone-500">
                  Statutory allowance is 70 days in the year preceding application, with up to 100 days for exceptional reasons.
                </span>
              </div>
              <button
                onClick={handleAddAbsence}
                className="self-start sm:self-auto flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              >
                <Plus className="size-3.5" />
                Add Trip Abroad
              </button>
            </div>

            <div className="mt-3.5 space-y-3">
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
                    className={`rounded-2xl border p-4 shadow-2xs transition ${
                      durationDays > 100
                        ? 'border-red-300 bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/20'
                        : durationDays > 70
                        ? 'border-amber-300 bg-amber-50/40 dark:border-amber-900/60 dark:bg-amber-950/20'
                        : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900'
                    }`}
                  >
                    {/* Header row: Reason input + Duration badge + Delete */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex flex-1 items-center gap-2">
                        <Plane className="size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                        <input
                          type="text"
                          placeholder="Reason for trip (e.g. Annual leave, family visit)"
                          value={absence.reason}
                          onChange={(e) => handleUpdateAbsence(absence.id, 'reason', e.target.value)}
                          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-900 shadow-2xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                        />
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        {durationDays > 0 && (
                          <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            durationDays > 100
                              ? 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-300'
                              : durationDays > 70
                              ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300'
                          }`}>
                            {durationDays} days {durationDays > 100 ? '(! Exceeds 100d)' : durationDays > 70 ? '(Exceptional Reason Needed)' : '(Permissible)'}
                          </span>
                        )}

                        <button
                          onClick={() => handleRemoveAbsence(absence.id)}
                          className="flex size-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-red-600 dark:hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          title="Remove trip"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Dates: 2-column grid */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-12 text-stone-500 font-semibold">From:</span>
                        <input
                          type="date"
                          value={absence.startDate}
                          onChange={(e) => handleUpdateAbsence(absence.id, 'startDate', e.target.value)}
                          className="flex-1 rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-12 text-stone-500 font-semibold">To:</span>
                        <input
                          type="date"
                          value={absence.endDate}
                          onChange={(e) => handleUpdateAbsence(absence.id, 'endDate', e.target.value)}
                          className="flex-1 rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-none focus:border-emerald-600 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

    </div>
  );
};
