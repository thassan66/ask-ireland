import { PolicyAlert } from '../types';

export const POLICY_ALERTS: PolicyAlert[] = [
  {
    id: 'alert-naturalisation-70days',
    title: 'Statutory Absence Allowance for Naturalisation Increased to 70 Days',
    agency: 'Department of Justice',
    date: '2024 - Active Regulation',
    category: 'statutory_change',
    affectedGroups: ['Naturalisation Applicants', 'Stamp 1', 'Stamp 4 Holders'],
    summary: 'Under the Courts and Civil Law Act amendments to the Irish Nationality and Citizenship Act 1956, the maximum permissible absence in the final reckonable year has been increased from 42 days (6 weeks) to 70 days, with up to 100 days for certified exceptional reasons.',
    officialUrl: 'https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/'
  },
  {
    id: 'alert-dete-salary-thresholds',
    title: 'Minimum Salary Thresholds for Employment Permits Raised',
    agency: 'Department of Enterprise (DETE)',
    date: '2024 - 2026 Phased Implementation',
    category: 'threshold_update',
    affectedGroups: ['Critical Skills Applicants', 'General Employment Permit Holders'],
    summary: 'DETE enacted phased increases to employment permit salary minimums. Critical Skills permits (with degree) require a baseline of €38,000+ (moving to €39,000+), while General Employment Permits require higher baseline thresholds to reflect median wage growth.',
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
    id: 'alert-nationwide-irp-online',
    title: 'ISD Online Portal Transfer: GNIB Garda Stations Phased Out',
    agency: 'Immigration Service Delivery (ISD)',
    date: 'Nationwide Expansion',
    category: 'operational_notice',
    affectedGroups: ['All IRP Renewal Applicants (Cork, Limerick, Galway, Dublin)'],
    summary: 'Responsibility for nationwide immigration registrations is transitioning from local Garda District Headquarters to ISD online. Applicants in Cork, Limerick, and other counties now renew their cards online without queuing at Garda stations.',
    officialUrl: 'https://inisonline.jahs.ie'
  },
  {
    id: 'alert-rent-tax-credit-increase',
    title: 'Rent Tax Credit Available for Current & Past 4 Years',
    agency: 'Revenue',
    date: 'Annual Finance Act',
    category: 'threshold_update',
    affectedGroups: ['Private Renters', 'All Employed Taxpayers'],
    summary: 'Tenants can claim the Rent Tax Credit directly in Revenue myAccount (up to €1,000 for single taxpayers or €2,000 for married couples). Retroactive claims for past qualifying rental years can be lodged via Statement of Liability.',
    officialUrl: 'https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/rent-credit/index.aspx'
  }
];
