import React, { useMemo, useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Download, 
  Upload, 
  Trash2, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { useIrishJourney } from '../hooks/useIrishJourney';
import { evaluateCitizenship } from '../utils/citizenshipEngine';
import { LegalSafetyNotice } from './LegalSafetyNotice';
import { StampCategory } from '../utils/journeyStore';
import { NavigationTab } from './Header';

interface MyJourneyDashboardProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const MyJourneyDashboard: React.FC<MyJourneyDashboardProps> = ({ setActiveTab }) => {
  const { 
    journey, 
    updateCurrentPermission, 
    updateTargetRoute,
    downloadBackupJSON, 
    importBackupFile, 
    wipeAllData 
  } = useIrishJourney();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showWipeModal, setShowWipeModal] = useState<boolean>(false);
  const [editingPermission, setEditingPermission] = useState<boolean>(false);

  const { currentPermission, targetRoute, stamps, absences, selectedDocsByYear } = journey;

  // Evaluate citizenship calculations
  const audit = useMemo(() => {
    return evaluateCitizenship(stamps, absences);
  }, [stamps, absences]);

  // Evaluate IRP expiry & 12-week renewal window
  const renewalAnalysis = useMemo(() => {
    if (!currentPermission.expiryDate) {
      return { daysUntilExpiry: null, isRenewalOpen: false, daysUntilWindow: null };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(currentPermission.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 12 weeks = 84 days
    const isRenewalOpen = daysUntilExpiry <= 84 && daysUntilExpiry >= 0;
    const daysUntilWindow = daysUntilExpiry > 84 ? daysUntilExpiry - 84 : 0;

    return {
      daysUntilExpiry,
      isRenewalOpen,
      daysUntilWindow
    };
  }, [currentPermission.expiryDate]);

  // CSEP Month-21 calculation
  const csepAnalysis = useMemo(() => {
    if (!currentPermission.startDate) return { monthsEmployed: 0, isEligibleStamp4: false };

    const start = new Date(currentPermission.startDate);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

    return {
      monthsEmployed: Math.max(0, months),
      isEligibleStamp4: months >= 21
    };
  }, [currentPermission.startDate]);

  // Scorecard status across Years 1 to 5
  const scorecardSummary = useMemo(() => {
    const years = [1, 2, 3, 4, 5];
    const results = years.map(yr => {
      const docIds = selectedDocsByYear[yr] || [];
      const hasTypeA = docIds.some(id => ['p60', 'noa', 'dsp_statement', 'school_letter'].includes(id));
      // rough points check
      let pts = 0;
      docIds.forEach(id => {
        if (['p60', 'noa', 'dsp_statement'].includes(id)) pts += 70;
        else if (['school_letter', 'bank_statements'].includes(id)) pts += 50;
        else if (['rtb_tenancy', 'mortgage_statement'].includes(id)) pts += 40;
        else if (['electricity_bill'].includes(id)) pts += 30;
        else if (['gas_bill', 'broadband_bill', 'motor_tax'].includes(id)) pts += 20;
        else if (['tv_licence'].includes(id)) pts += 10;
      });

      return {
        year: yr,
        points: pts,
        hasTypeA,
        isComplete: pts >= 150 && hasTypeA
      };
    });

    const completeCount = results.filter(r => r.isComplete).length;
    const missingTypeAYears = results.filter(r => !r.hasTypeA).map(r => r.year);

    return { results, completeCount, missingTypeAYears };
  }, [selectedDocsByYear]);

  // File import handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await importBackupFile(file);
    setImportStatus(res.message);
    setTimeout(() => setImportStatus(null), 4000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 sm:pb-5 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
              My Irish Immigration Journey
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Your private timeline tracking IRP card expiries, 12-week renewal windows, naturalisation reckonable days, and 150-point documents.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadBackupJSON}
              className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              title="Download JSON backup"
            >
              <Download className="size-3.5" />
              <span>Backup JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              title="Restore from JSON backup"
            >
              <Upload className="size-3.5" />
              <span>Restore</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".json" 
              className="hidden" 
            />
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-5">
        <LegalSafetyNotice 
          compact 
          title="Private client-side storage" 
          description="All permission dates, travel intervals, and document choices exist strictly in your browser memory. Nothing is sent to external servers or the Department of Justice." 
        />
      </div>

      {importStatus && (
        <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          {importStatus}
        </div>
      )}

      {/* Primary Dashboard Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: Current Permission & 12-Week Renewal Window */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Current Immigration Permission
              </h2>
            </div>
            <button
              onClick={() => setEditingPermission(!editingPermission)}
              className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              {editingPermission ? 'Done' : 'Edit Dates'}
            </button>
          </div>

          {editingPermission ? (
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-400">Target Pathway:</label>
                <select
                  value={targetRoute}
                  onChange={(e) => updateTargetRoute(e.target.value as 'naturalisation_standard' | 'csep_to_stamp4' | 'naturalisation_spouse_irish')}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800 font-medium"
                >
                  <option value="naturalisation_standard">Standard Naturalisation (5 Years / 1,825 Days)</option>
                  <option value="csep_to_stamp4">Critical Skills (CSEP) to Stamp 4 (21 Months DETE)</option>
                  <option value="naturalisation_spouse_irish">Spouse of Irish Citizen (3 Years / 1,095 Days)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-400">Current Stamp:</label>
                <select
                  value={currentPermission.stampType}
                  onChange={(e) => updateCurrentPermission({ stampType: e.target.value as StampCategory })}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800"
                >
                  <option value="Stamp 1">Stamp 1 (Employment Permit)</option>
                  <option value="Stamp 1G">Stamp 1G (Graduate / Spousal)</option>
                  <option value="Stamp 4">Stamp 4 (Permanent / Open Work)</option>
                  <option value="Stamp 3">Stamp 3 (Volunteer / Dependant)</option>
                  <option value="Stamp 2">Stamp 2 (Student — Non-reckonable)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-400">Permit / Start Date (for Month-21 Stamp 4 tracking):</label>
                <input
                  type="date"
                  value={currentPermission.startDate || ''}
                  onChange={(e) => updateCurrentPermission({ startDate: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-400">Current IRP Expiry Date:</label>
                <input
                  type="date"
                  value={currentPermission.expiryDate}
                  onChange={(e) => updateCurrentPermission({ expiryDate: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800"
                />
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-stone-900 dark:text-stone-50">
                    {currentPermission.stampType}
                  </span>
                  <p className="text-xs text-stone-500">
                    Expires: {currentPermission.expiryDate ? new Date(currentPermission.expiryDate).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not set'}
                  </p>
                </div>

                {renewalAnalysis.daysUntilExpiry !== null && (
                  <div className="text-right">
                    <span className={`text-2xl font-black ${
                      renewalAnalysis.daysUntilExpiry < 0
                        ? 'text-red-600'
                        : renewalAnalysis.daysUntilExpiry <= 84
                        ? 'text-amber-600'
                        : 'text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {renewalAnalysis.daysUntilExpiry < 0 ? 'Expired' : `${renewalAnalysis.daysUntilExpiry}d`}
                    </span>
                    <p className="text-[11px] text-stone-500">
                      {renewalAnalysis.daysUntilExpiry >= 0 ? 'Remaining' : 'Passed'}
                    </p>
                  </div>
                )}
              </div>

              {/* 12-Week Notice Trigger */}
              {renewalAnalysis.isRenewalOpen ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                  <div className="flex items-start gap-2">
                    <Clock className="size-4 mt-0.5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-bold">ISD 12-Week Renewal Window Is Open</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed">
                        Under ISD rules, renewals can be lodged up to 12 weeks before expiry. Applications submitted earlier may be refused.
                      </p>
                      <a
                        href="https://inisonline.jahs.ie"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-bold text-amber-800 underline dark:text-amber-300"
                      >
                        <span>Open ISD Renewal Portal</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : renewalAnalysis.daysUntilWindow !== null && renewalAnalysis.daysUntilWindow > 0 ? (
                <div className="rounded-xl bg-stone-100 p-2.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">12-Week Renewal Window Opens In: </span>
                  <strong>{renewalAnalysis.daysUntilWindow} days</strong> (ISD rejects premature applications).
                </div>
              ) : null}

              {/* CSEP Month 21 Alert */}
              {csepAnalysis.monthsEmployed > 0 && (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs dark:border-stone-800 dark:bg-stone-800/40">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      CSEP Employment Tenure:
                    </span>
                    <strong className="text-emerald-700 dark:text-emerald-400">
                      {csepAnalysis.monthsEmployed} Months
                    </strong>
                  </div>
                  {csepAnalysis.isEligibleStamp4 ? (
                    <div className="mt-2 flex items-center justify-between gap-2 text-emerald-800 dark:text-emerald-300">
                      <span>Eligible to request DETE Stamp 4 letter (21+ months complete).</span>
                      <button
                        onClick={() => setActiveTab('letters')}
                        className="font-bold underline"
                      >
                        Draft Letter
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 text-[11px] text-stone-500">
                      {21 - csepAnalysis.monthsEmployed} more months until eligible to apply for DETE Stamp 4 support letter.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card 2: Naturalisation Reckonable Days Progress */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Citizenship Reckonable Residence
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('calculator')}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              <span>Audit Stamps</span>
              <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-50">
                  {audit.netReckonableDays.toLocaleString()}
                </span>
                <span className="ml-1 text-xs font-semibold text-stone-500">
                  / 1,825 statutory days ({audit.percentComplete}%)
                </span>
              </div>

              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                audit.percentComplete >= 100
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}>
                {audit.percentComplete >= 100 ? 'Target Reached' : `${1825 - audit.netReckonableDays}d to go`}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
              <div 
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${Math.min(100, audit.percentComplete)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400 pt-1">
              <div>
                Gross Stamps: <strong>{audit.totalGrossStampDays} days</strong>
              </div>
              <div className="text-right">
                Absences Deducted: <strong className="text-red-600 dark:text-red-400">{audit.totalAbsenceDays} days</strong>
              </div>
            </div>

            {/* Final Year Rule Context */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-800/40 dark:text-stone-300">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Statutory Final Year Test: </span>
              {audit.isContinuousYearValid ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ 365 Days Unbroken Residence Confirmed.</span>
              ) : (
                <span className="text-amber-700 dark:text-amber-400">Final 365 continuous days require absences to stay within the 70-day standard limit.</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Card 3: 150-Point Evidence Matrix (Years 1 to 5) */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Award className="size-4 text-emerald-700 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              150-Point Evidence Status (Years 1 to 5)
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('scorecard')}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            <span>Open Checklist</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
          {scorecardSummary.results.map((r) => (
            <div 
              key={r.year}
              className={`rounded-xl border p-3 text-center transition ${
                r.isComplete
                  ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                  : 'border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-800/40'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Year {r.year}
              </span>
              <div className="mt-1 text-xl font-extrabold text-stone-900 dark:text-stone-50">
                {r.points} <span className="text-xs font-normal text-stone-500">/ 150</span>
              </div>
              <div className="mt-2">
                {r.isComplete ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    <CheckCircle2 className="size-3" /> Ready
                  </span>
                ) : !r.hasTypeA ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-800 dark:bg-red-950 dark:text-red-300">
                    Missing Type A
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Need {150 - r.points} pts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {scorecardSummary.missingTypeAYears.length > 0 && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50/80 p-3 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <AlertTriangle className="size-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <span className="font-bold">Missing Primary Evidence (Type A): </span>
              Years {scorecardSummary.missingTypeAYears.join(', ')} currently lack a Revenue Employment Detail Summary (P60), Notice of Assessment, or DSP statement. Download these from Revenue myAccount before submitting Form 8.
            </div>
          </div>
        )}
      </div>

      {/* Recommended Next Actions */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3 dark:border-stone-800">
          <Sparkles className="size-4 text-emerald-700 dark:text-emerald-400" />
          <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Recommended Next Steps
          </h2>
        </div>

        <div className="mt-4 space-y-2.5 text-xs">
          {renewalAnalysis.isRenewalOpen && (
            <div className="flex items-center justify-between rounded-xl bg-amber-50/70 p-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-200">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-amber-600 shrink-0" />
                <span>IRP renewal window is open. Lodge your application on ISD online.</span>
              </div>
              <a
                href="https://inisonline.jahs.ie"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-700 underline dark:text-emerald-400"
              >
                Go to ISD
              </a>
            </div>
          )}

          {csepAnalysis.isEligibleStamp4 && (
            <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 p-3 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-emerald-600 shrink-0" />
                <span>You have 21+ months on CSEP. Request your employer support letter for DETE EPOS.</span>
              </div>
              <button
                onClick={() => setActiveTab('letters')}
                className="font-bold text-emerald-700 underline dark:text-emerald-400"
              >
                Draft Letter
              </button>
            </div>
          )}

          <div className="flex items-center justify-between rounded-xl bg-stone-50 p-3 text-stone-700 dark:bg-stone-800/50 dark:text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>Verify that all travel records under 70 days are logged to avoid naturalisation delays.</span>
            </div>
            <button
              onClick={() => setActiveTab('calculator')}
              className="font-bold text-emerald-700 underline dark:text-emerald-400"
            >
              Update Trips
            </button>
          </div>
        </div>
      </div>

      {/* Storage & Privacy Controls */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-stone-200 pt-6 text-xs text-stone-500 dark:border-stone-800">
        <div>
          <span>Local Profile Version: 1 · Last Updated: {new Date(journey.lastUpdated).toLocaleDateString()}</span>
        </div>

        <button
          onClick={() => setShowWipeModal(true)}
          className="flex items-center gap-1.5 text-stone-400 hover:text-red-600 transition"
        >
          <Trash2 className="size-3.5" />
          <span>Wipe Local Data from This Device</span>
        </button>
      </div>

      {/* Wipe Confirmation Modal */}
      {showWipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-stone-900 dark:text-stone-100">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
              Clear All Stored Data?
            </h3>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
              This will erase your stamps, absences, and checklist selections from this browser. This cannot be undone unless you exported a JSON backup.
            </p>
            <div className="mt-5 flex justify-end gap-2 text-xs font-bold">
              <button
                onClick={() => setShowWipeModal(false)}
                className="rounded-xl px-3 py-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  wipeAllData();
                  setShowWipeModal(false);
                }}
                className="rounded-xl bg-red-600 px-3 py-2 text-white hover:bg-red-700"
              >
                Yes, Clear Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
