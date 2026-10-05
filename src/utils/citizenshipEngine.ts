import { StampPeriod, TravelAbsence } from '../types';

export interface AuditWarning {
  type: 'error' | 'warning' | 'info';
  category: 'gap' | 'absence' | 'invalid_date' | 'stamp2' | 'continuous_year';
  title: string;
  description: string;
  period?: string;
}

export interface YearAudit {
  yearNumber: number;
  startDate: string;
  endDate: string;
  stampDays: number;
  absenceDays: number;
  reckonableDays: number;
  status: 'valid' | 'warning' | 'broken';
  notes: string[];
}

export interface CitizenshipAuditResult {
  route: 'standard' | 'spouse';
  totalGrossStampDays: number;
  totalAbsenceDays: number;
  totalGapDays: number;
  netReckonableDays: number;
  targetDays: number;
  percentComplete: number;
  isContinuousYearValid: boolean;
  warnings: AuditWarning[];
  yearlyBreakdown: YearAudit[];
}

// Helper to parse YYYY-MM-DD safely
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function evaluateCitizenship(
  stamps: StampPeriod[],
  absences: TravelAbsence[],
  route: 'standard' | 'spouse' = 'standard'
): CitizenshipAuditResult {
  const targetDays = route === 'spouse' ? 1095 : 1825;
  const warnings: AuditWarning[] = [];

  // 1. Validate individual stamps and identify inverted dates
  const validStamps: { stamp: StampPeriod; start: Date; end: Date }[] = [];

  for (const s of stamps) {
    const sDate = parseDate(s.startDate);
    const eDate = parseDate(s.endDate);

    if (!sDate || !eDate) {
      warnings.push({
        type: 'error',
        category: 'invalid_date',
        title: `Invalid Date on ${s.stampType}`,
        description: 'Please ensure both start and end dates are properly selected.'
      });
      continue;
    }

    if (eDate.getTime() < sDate.getTime()) {
      warnings.push({
        type: 'error',
        category: 'invalid_date',
        title: `Inverted Date on ${s.stampType}`,
        description: `End date (${s.endDate}) is earlier than start date (${s.startDate}). This period is excluded from calculations.`,
        period: `${s.startDate} to ${s.endDate}`
      });
      continue;
    }

    if (s.stampType === 'Stamp 2') {
      warnings.push({
        type: 'warning',
        category: 'stamp2',
        title: 'Stamp 2 (Student) Excluded',
        description: 'Under the Irish Nationality and Citizenship Act 1956, student permission (Stamp 2/2A) never counts towards naturalisation.',
        period: `${s.startDate} to ${s.endDate}`
      });
      continue;
    }

    validStamps.push({ stamp: s, start: sDate, end: eDate });
  }

  // 2. Validate absences
  const validAbsences: { absence: TravelAbsence; start: Date; end: Date; days: number }[] = [];

  for (const a of absences) {
    const sDate = parseDate(a.startDate);
    const eDate = parseDate(a.endDate);

    if (!sDate || !eDate) continue;

    if (eDate.getTime() < sDate.getTime()) {
      warnings.push({
        type: 'error',
        category: 'invalid_date',
        title: `Inverted Trip Abroad Date`,
        description: `End date (${a.endDate}) is earlier than departure date (${a.startDate}).`,
        period: `${a.startDate} to ${a.endDate}`
      });
      continue;
    }

    const days = Math.ceil((eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24));
    validAbsences.push({ absence: a, start: sDate, end: eDate, days });

    // Flag long absences individually based on the 2023 statutory amendment
    if (days > 100) {
      warnings.push({
        type: 'error',
        category: 'absence',
        title: `Major Absence Out of State (${days} days)`,
        description: `You were outside Ireland for ${days} days from ${a.startDate} to ${a.endDate}. Under the amended Irish Nationality and Citizenship Act 1956 (Courts and Civil Law Act 2023), the standard statutory allowance is 70 days, with up to 100 days permitted only for exceptional certified reasons. Absences exceeding 100 days break continuous ordinary residence.`,
        period: `${a.startDate} to ${a.endDate}`
      });
    } else if (days > 70) {
      warnings.push({
        type: 'warning',
        category: 'absence',
        title: `Absence Requires Exceptional Grounds (${days} days)`,
        description: `This absence (${days} days) exceeds the standard statutory 70-day allowance. Under Section 15(1)(c), an additional 30 days (up to 100 days total) may be allowed by the Minister for certified exceptional reasons (e.g., medical treatment, family bereavement, or employment requirements).`,
        period: `${a.startDate} to ${a.endDate}`
      });
    }
  }

  // 3. Sort stamps chronologically to analyze GAPS
  validStamps.sort((a, b) => a.start.getTime() - b.start.getTime());

  let totalGapDays = 0;
  for (let i = 0; i < validStamps.length - 1; i++) {
    const currentEnd = validStamps[i].end;
    const nextStart = validStamps[i + 1].start;

    // Check if there is a gap between currentEnd and nextStart
    const gapMs = nextStart.getTime() - currentEnd.getTime();
    const gapDays = Math.floor(gapMs / (1000 * 60 * 60 * 24)) - 1;

    if (gapDays > 0) {
      totalGapDays += gapDays;
      if (gapDays > 60) {
        warnings.push({
          type: 'error',
          category: 'gap',
          title: `Critical Unregistered Gap (${gapDays} days)`,
          description: `A gap of ${gapDays} days exists between ${formatDate(currentEnd)} and ${formatDate(nextStart)} with no valid IRP registration. In Ireland, unreckonable gaps over 60 days can void continuous residency unless accompanied by proof of an in-time renewal submission.`,
          period: `${formatDate(currentEnd)} to ${formatDate(nextStart)}`
        });
      } else {
        warnings.push({
          type: 'info',
          category: 'gap',
          title: `IRP Renewal Gap (${gapDays} days)`,
          description: `Gap of ${gapDays} days detected between stamp renewals. Permissible if your renewal application was lodged with ISD before the previous stamp expired.`,
          period: `${formatDate(currentEnd)} to ${formatDate(nextStart)}`
        });
      }
    }
  }

  // 4. Exact Day-by-Day Calendar Set Union (Prevents Double-Counting of Overlaps)
  // We identify every unique calendar day where the user held a valid stamp
  const validStampDates = new Set<string>();

  for (const { start, end } of validStamps) {
    const curr = new Date(start);
    while (curr.getTime() <= end.getTime()) {
      validStampDates.add(formatDate(curr));
      curr.setDate(curr.getDate() + 1);
    }
  }

  // Identify unique calendar days where user was absent
  const absenceDates = new Set<string>();
  for (const { start, end } of validAbsences) {
    const curr = new Date(start);
    while (curr.getTime() <= end.getTime()) {
      absenceDates.add(formatDate(curr));
      curr.setDate(curr.getDate() + 1);
    }
  }

  // Calculate actual present reckonable days
  let netReckonableDays = 0;
  for (const day of validStampDates) {
    if (!absenceDates.has(day)) {
      netReckonableDays++;
    }
  }

  const totalGrossStampDays = validStampDates.size;
  const totalAbsenceDays = absenceDates.size;

  // 5. Audit the final continuous year (365 days immediately prior to latest date)
  let isContinuousYearValid = true;
  if (validStampDates.size > 0) {
    // Find the latest date among all stamps
    const allDates = Array.from(validStampDates).sort();
    const latestDateStr = allDates[allDates.length - 1];
    const latestDate = parseDate(latestDateStr)!;

    const oneYearPrior = new Date(latestDate);
    oneYearPrior.setDate(oneYearPrior.getDate() - 365);

    let finalYearAbsenceDays = 0;
    let finalYearUncoveredDays = 0;

    const checkDate = new Date(oneYearPrior);
    while (checkDate.getTime() <= latestDate.getTime()) {
      const dStr = formatDate(checkDate);
      if (!validStampDates.has(dStr)) {
        finalYearUncoveredDays++;
      } else if (absenceDates.has(dStr)) {
        finalYearAbsenceDays++;
      }
      checkDate.setDate(checkDate.getDate() + 1);
    }

    if (finalYearAbsenceDays > 100 || finalYearUncoveredDays > 30) {
      isContinuousYearValid = false;
      warnings.push({
        type: 'error',
        category: 'continuous_year',
        title: 'Final Continuous 1-Year Requirement Broken',
        description: `Section 15(1)(c) mandates continuous residence in the year immediately prior to application. You had ${finalYearAbsenceDays} absence days (statutory limit is 70 days, or 100 in exceptional cases) and ${finalYearUncoveredDays} unregistered days in this final year window (${formatDate(oneYearPrior)} to ${latestDateStr}). Your continuous clock must restart.`
      });
    } else if (finalYearAbsenceDays > 70) {
      warnings.push({
        type: 'warning',
        category: 'continuous_year',
        title: 'Final Year Absences Exceed 70 Days',
        description: `You have ${finalYearAbsenceDays} absence days in the final 365 days. The standard statutory limit is 70 days. You will need formal certification of exceptional circumstances (e.g. medical, bereavement, or work) for the Minister to consider the additional 30-day discretionary allowance under amended Section 15.`
      });
    }
  }

  const percentComplete = Math.min(100, Math.round((netReckonableDays / targetDays) * 100));

  const totalYears = route === 'spouse' ? 3 : 5;
  const yearlyBreakdown: YearAudit[] = [];

  for (let yr = 1; yr <= totalYears; yr++) {
    const priorThreshold = (yr - 1) * 365;
    const daysInYear = Math.min(365, Math.max(0, netReckonableDays - priorThreshold));
    const isFinalYear = yr === totalYears;

    let status: 'valid' | 'warning' | 'broken' = 'warning';
    const notes: string[] = [];

    if (isFinalYear) {
      if (!isContinuousYearValid) {
        status = 'broken';
        notes.push('Continuous residence broken (absences exceed limit or gap)');
      } else if (daysInYear >= 365) {
        status = 'valid';
        notes.push('Statutory continuous 365 days satisfied');
      } else {
        status = 'warning';
        notes.push(`${365 - daysInYear} days remaining in final year`);
      }
    } else {
      if (daysInYear >= 365) {
        status = 'valid';
        notes.push('365 reckonable days completed');
      } else if (daysInYear > 0) {
        status = 'warning';
        notes.push(`${365 - daysInYear} days remaining`);
      } else {
        status = 'warning';
        notes.push('Pending residence accumulation');
      }
    }

    yearlyBreakdown.push({
      yearNumber: yr,
      startDate: '',
      endDate: '',
      stampDays: daysInYear,
      absenceDays: 0,
      reckonableDays: daysInYear,
      status,
      notes
    });
  }

  return {
    route,
    totalGrossStampDays,
    totalAbsenceDays,
    totalGapDays,
    netReckonableDays,
    targetDays,
    percentComplete,
    isContinuousYearValid,
    warnings,
    yearlyBreakdown
  };
}
