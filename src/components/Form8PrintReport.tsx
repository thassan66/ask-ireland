import React from 'react';
import { CitizenshipAuditResult } from '../utils/citizenshipEngine';
import { StampPeriod, TravelAbsence } from '../types';

interface Form8PrintReportProps {
  audit: CitizenshipAuditResult;
  stamps: StampPeriod[];
  absences: TravelAbsence[];
  route: 'standard' | 'spouse';
}

export const Form8PrintReport: React.FC<Form8PrintReportProps> = ({
  audit,
  stamps,
  absences,
  route
}) => {
  const isReady = audit.netReckonableDays >= audit.targetDays && audit.isContinuousYearValid;
  const todayStr = new Date().toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="hidden print:block print-only w-full bg-white text-black p-6 font-serif">
      {/* Official Header */}
      <div className="border-b-2 border-black pb-4 text-center">
        <div className="text-sm font-bold tracking-widest uppercase">
          An Roinn Dlí agus Cirt · Department of Justice
        </div>
        <div className="text-xs uppercase tracking-wider text-stone-700 mt-0.5">
          Immigration Service Delivery (ISD) — Citizenship Division
        </div>
        <h1 className="text-xl font-bold tracking-tight mt-2 uppercase">
          Statutory Residence Audit Schedule for Form 8 Naturalisation
        </h1>
        <p className="text-xs italic text-stone-600 mt-1">
          Irish Nationality and Citizenship Act 1956, {route === 'spouse' ? 'Section 15A' : 'Section 15'} (as amended by the Courts and Civil Law Act 2023)
        </p>
      </div>

      {/* Meta Box */}
      <div className="mt-4 border border-black p-3 text-xs grid grid-cols-2 gap-2 bg-stone-50">
        <div>
          <p><strong>Application Route:</strong> {route === 'spouse' ? 'Section 15A (Spouse of Irish Citizen — 3 Years / 1,095 Days)' : 'Section 15 (Standard Adult Naturalisation — 5 Years / 1,825 Days)'}</p>
          <p><strong>Audit Generation Date:</strong> {todayStr}</p>
        </div>
        <div className="text-right">
          <p><strong>Audit Verdict:</strong> {isReady ? '✓ STATUTORY THRESHOLD SATISFIED' : 'PENDING RESIDENCE THRESHOLD'}</p>
          <p><strong>Continuous Final Year:</strong> {audit.isContinuousYearValid ? '✓ 365 Days Continuous Confirmed' : '⚠️ Continuous Requirement Warning'}</p>
        </div>
      </div>

      {/* Executive Summary Table */}
      <div className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">
          1. Statutory Residence Totals
        </h2>
        <table className="w-full text-xs border border-collapse border-black">
          <thead>
            <tr className="bg-stone-100 border-b border-black text-left">
              <th className="p-1.5 border-r border-black">Statutory Target</th>
              <th className="p-1.5 border-r border-black">Gross IRP Days</th>
              <th className="p-1.5 border-r border-black">Absences Deducted</th>
              <th className="p-1.5 border-r border-black">Unregistered Gaps</th>
              <th className="p-1.5">Net Reckonable Days</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black font-mono">
              <td className="p-1.5 border-r border-black">{audit.targetDays} days</td>
              <td className="p-1.5 border-r border-black">{audit.totalGrossStampDays} days</td>
              <td className="p-1.5 border-r border-black">{audit.totalAbsenceDays} days</td>
              <td className="p-1.5 border-r border-black">{audit.totalGapDays} days</td>
              <td className="p-1.5 font-bold font-mono">{audit.netReckonableDays} days ({audit.percentComplete}%)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Schedule 1: Stamp Periods */}
      <div className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">
          2. Schedule of Registered IRP Stamp Periods
        </h2>
        {stamps.length === 0 ? (
          <p className="text-xs italic text-stone-500">No stamp periods entered.</p>
        ) : (
          <table className="w-full text-xs border border-collapse border-black font-mono">
            <thead>
              <tr className="bg-stone-100 border-b border-black text-left">
                <th className="p-1.5 border-r border-black">#</th>
                <th className="p-1.5 border-r border-black">Stamp Type</th>
                <th className="p-1.5 border-r border-black">Commenced</th>
                <th className="p-1.5 border-r border-black">Expired</th>
                <th className="p-1.5 border-r border-black">Reckonable Status</th>
              </tr>
            </thead>
            <tbody>
              {stamps.map((stamp, idx) => {
                const isReckonable = stamp.stampType !== 'Stamp 2';
                return (
                  <tr key={stamp.id} className="border-b border-stone-300">
                    <td className="p-1.5 border-r border-black">{idx + 1}</td>
                    <td className="p-1.5 border-r border-black font-bold">{stamp.stampType}</td>
                    <td className="p-1.5 border-r border-black">{stamp.startDate || '—'}</td>
                    <td className="p-1.5 border-r border-black">{stamp.endDate || '—'}</td>
                    <td className="p-1.5">{isReckonable ? 'Reckonable (Section 15)' : 'Excluded (Section 16A)'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Schedule 2: Travel Absences */}
      <div className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-1 mb-2">
          3. Schedule of Absences from the State
        </h2>
        {absences.length === 0 ? (
          <p className="text-xs italic text-stone-500">No travel absences recorded (Zero departures from State).</p>
        ) : (
          <table className="w-full text-xs border border-collapse border-black font-mono">
            <thead>
              <tr className="bg-stone-100 border-b border-black text-left">
                <th className="p-1.5 border-r border-black">#</th>
                <th className="p-1.5 border-r border-black">Departure Date</th>
                <th className="p-1.5 border-r border-black">Return Date</th>
                <th className="p-1.5 border-r border-black">Reason / Destination</th>
                <th className="p-1.5">Statutory Deduction</th>
              </tr>
            </thead>
            <tbody>
              {absences.map((absence, idx) => (
                <tr key={absence.id} className="border-b border-stone-300">
                  <td className="p-1.5 border-r border-black">{idx + 1}</td>
                  <td className="p-1.5 border-r border-black">{absence.startDate || '—'}</td>
                  <td className="p-1.5 border-r border-black">{absence.endDate || '—'}</td>
                  <td className="p-1.5 border-r border-black">{absence.reason || 'Personal'}</td>
                  <td className="p-1.5">Deducted from gross reckonable days</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Schedule 3: Pre-Flight Attestation */}
      <div className="mt-5 border border-black p-3 text-xs bg-stone-50">
        <h3 className="font-bold uppercase tracking-wider mb-1">
          4. Statutory Prerequisites Checklist (Form 8 Section 4 &amp; 5)
        </h3>
        <ul className="space-y-1 list-disc pl-4">
          <li><strong>Tax Clearance:</strong> Tax affairs are in order with the Revenue Commissioners under Section 15(1)(b).</li>
          <li><strong>Continuous Residence:</strong> Final 365-day continuous residence in the State immediately prior to application complies with amended 70-day standard travel limits.</li>
          <li><strong>Good Character:</strong> No criminal convictions, pending charges, or disqualifications under the Good Character Assessment framework.</li>
          <li><strong>Identity &amp; Residence Proof:</strong> Scorecard evidence reaches 150 points for each year including mandatory Type A documentation.</li>
        </ul>
      </div>

      {/* Formal Attestation Sign-Off Block */}
      <div className="mt-6 border-t-2 border-black pt-4 grid grid-cols-2 gap-8 text-xs">
        <div>
          <h4 className="font-bold uppercase tracking-wider mb-2">Applicant Declaration</h4>
          <p className="text-[11px] leading-relaxed italic mb-8">
            I hereby declare that the stamp records and travel absences detailed in this schedule are a true and accurate account of my residence in the State.
          </p>
          <div className="border-b border-black w-full mb-1"></div>
          <p className="text-[10px]">Signature of Applicant</p>
          <p className="text-[10px] mt-2">Date: ________________________</p>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider mb-2">Witness Attestation (Solicitor / Peace Commissioner)</h4>
          <p className="text-[11px] leading-relaxed italic mb-8">
            Signed and declared before me by the above-named applicant, who is identified to me, on the date stated.
          </p>
          <div className="border-b border-black w-full mb-1"></div>
          <p className="text-[10px]">Signature of Witness (Solicitor / Commissioner for Oaths)</p>
          <div className="mt-2 border border-dashed border-stone-400 p-2 text-center text-[10px] text-stone-500 h-16 flex items-center justify-center">
            [ Official Stamp of Office ]
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-stone-300 pt-2 text-[10px] text-stone-500 flex justify-between">
        <span>Ask Ireland Independent Civic Guide · https://ask-ireland.vercel.app</span>
        <span>Form 8 Naturalisation Statutory Preparation Schedule</span>
      </div>
    </div>
  );
};
