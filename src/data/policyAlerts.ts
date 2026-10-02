import { PolicyAlert } from '../types';

export const POLICY_ALERTS: PolicyAlert[] = [
  {
    id: 'alert-ukrainian-tpts-stamp4',
    title: 'Temporary Protection Transition Scheme (TPTS): Pathway to Stamp 4 Launched',
    agency: 'Department of Justice',
    date: 'September 30, 2026 - Active Policy',
    category: 'statutory_change',
    affectedGroups: ['Beneficiaries of Temporary Protection (Ukraine)', 'Employers', 'Stamp 4 Applicants'],
    summary: 'The Department of Justice officially opened the Temporary Protection Transition Scheme (TPTS). Eligible beneficiaries resident in Ireland for 1+ year, employed or self-employed for 6+ months, and living independently can transition to a renewable 2-year Stamp 4 permission. Crucially, time on this Stamp 4 counts towards reckonable residence for Irish citizenship.',
    officialUrl: 'https://inisonline.jahs.ie/user/login'
  },
  {
    id: 'alert-employment-permits-act-2024',
    title: 'Employment Permits Act 2024: 9-Month Change of Employer Rule Commenced',
    agency: 'Department of Enterprise (DETE)',
    date: 'September 2, 2024 - Active Statute',
    category: 'statutory_change',
    affectedGroups: ['Critical Skills (CSEP) Holders', 'General Employment Permit (GEP) Holders', 'Employers'],
    summary: 'The Employment Permits Act 2024 officially commenced, replacing the 2006 framework. Workers on Critical Skills and General Employment Permits can now switch employers after 9 months (reduced from 12 months) via a streamlined Change of Employer application, without having to apply for a brand-new permit from scratch.',
    officialUrl: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/'
  },
  {
    id: 'alert-naturalisation-70days',
    title: 'Statutory Absence Allowance for Naturalisation Increased to 70 Days',
    agency: 'Department of Justice',
    date: 'Courts & Civil Law Act - Active Primary Law',
    category: 'statutory_change',
    affectedGroups: ['Naturalisation Applicants', 'Stamp 1', 'Stamp 4 Holders'],
    summary: 'Under Section 15 amendments to the Irish Nationality and Citizenship Act 1956, the maximum permissible absence in the 12 months immediately preceding application is 70 days (10 weeks), with up to 100 days permitted for certified exceptional reasons. Absences over 100 days break continuous ordinary residence.',
    officialUrl: 'https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/'
  },
  {
    id: 'alert-dete-salary-roadmap',
    title: 'Phased Salary Threshold Increases for Critical Skills & General Permits',
    agency: 'Department of Enterprise (DETE)',
    date: '2024 - 2026 Phased Implementation',
    category: 'threshold_update',
    affectedGroups: ['New Permit Applicants', 'Employers', 'Tech & Healthcare Workers'],
    summary: 'DETE enacted phased index-linked increases to minimum annual remuneration (MAR) thresholds. Critical Skills permits (with eligible degree) require a baseline of €38,500+ (moving to €39,000+), while General Employment Permits baseline requirements continue upward adjustment toward the national living wage.',
    officialUrl: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/'
  },
  {
    id: 'alert-stamp1g-spousal-work',
    title: 'Immediate Right to Work for Spouses of Critical Skills Permit Holders',
    agency: 'Immigration Service Delivery (ISD)',
    date: 'Active Policy',
    category: 'statutory_change',
    affectedGroups: ['Spouses of CSEP Holders', 'Stamp 1G Dependants'],
    summary: 'Spouses and civil partners of Critical Skills Employment Permit holders receive Stamp 1G on registration, permitting immediate full-time employment without requiring a separate DETE employment permit or Labour Market Needs Test.',
    officialUrl: 'https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/spouse-civil-partner-of-a-critical-skills-employment-permit-holder/'
  },
  {
    id: 'alert-digital-citizenship-portal',
    title: 'Digital Naturalisation Portal: Paper Form 8 Applications Replaced',
    agency: 'Department of Justice',
    date: 'Digital Service Rollout',
    category: 'operational_notice',
    affectedGroups: ['Citizenship Applicants', 'Long-term Residents'],
    summary: 'The Department of Justice has fully transitioned citizenship applications to the online ISD Citizenship Portal. Applicants now submit electronic documentation, complete digital Garda vetting, and track decision milestones without mailing physical passport books.',
    officialUrl: 'https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/'
  },
  {
    id: 'alert-nationwide-irp-online',
    title: 'ISD Online Portal Transfer: GNIB Garda Stations Phased Out',
    agency: 'Immigration Service Delivery (ISD)',
    date: 'Nationwide Expansion Complete',
    category: 'operational_notice',
    affectedGroups: ['All IRP Renewal Applicants (Cork, Limerick, Galway, Dublin)'],
    summary: 'Nationwide responsibility for immigration card renewals has transferred completely from local Garda District Headquarters to ISD online. Applicants across all 26 counties now submit IRP renewals digitally and receive their cards via registered post.',
    officialUrl: 'https://inisonline.jahs.ie'
  }
];
