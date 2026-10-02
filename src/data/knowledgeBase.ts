import { KnowledgeItem } from '../types';

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'emergency-tax-stop',
    title: 'How to Stop Emergency Tax and Get a Refund',
    category: 'tax',
    queryMatches: [
      'emergency tax',
      'stop emergency tax',
      'why my salary cut 40 percent',
      'tax deduction high',
      'revenue register job',
      'first salary tax deduction',
      'how to get tax back ireland',
      'emergency tax refund'
    ],
    semanticKeywords: [
      'paye', 'usc', 'tax credits', 'revenue myaccount', 'trn', 'employer number', 
      'tax credit certificate', 'emergency basis', 'payroll tax'
    ],
    summary: 'Emergency tax happens when Revenue has not issued a Tax Credit Certificate to your employer. You are taxed at 40% PAYE plus 8% USC. Once you register your job online, any overpaid tax is automatically refunded in your next paycheck.',
    details: [
      'Employers are legally required to deduct emergency tax until Revenue provides your individual tax credits.',
      'Under emergency tax, you receive basic personal tax credits for the first 4 weeks, but from week 5, all earnings are taxed at the higher 40% rate with no tax credits.',
      'Emergency tax is not lost money; Revenue calculates cumulative pay and refunds the full difference in payroll as soon as the employer receives the Revenue Payroll Notification (RPN).'
    ],
    nextSteps: [
      'Ask your employer\'s HR or payroll team for their 8-character Employer Tax Registration Number (TRN).',
      'Log into Revenue myAccount (create an account using your PPSN if you have not already).',
      'Click "PAYE Services" and select "Add Job or Pension".',
      'Enter your start date and your employer\'s TRN. Revenue will issue your RPN to your employer within 48 hours.'
    ],
    officialSource: {
      title: 'Emergency Tax Rules & Calculation',
      agency: 'Revenue Commissioners',
      url: 'https://www.revenue.ie/en/jobs-and-pensions/emergency-tax/index.aspx',
      lastVerified: 'September 2026'
    }
  },
  {
    id: 'stamp1-to-stamp4-csep',
    title: 'Upgrading Stamp 1 to Stamp 4 (Critical Skills 21-Month Rule)',
    category: 'immigration',
    queryMatches: [
      'stamp 1 to stamp 4',
      'critical skills stamp 4',
      '21 months critical skills',
      'how take stamp 4 if critical skill 21 month work',
      'csep upgrade',
      'support letter dete',
      'change stamp 1 to 4'
    ],
    semanticKeywords: [
      'critical skills employment permit', 'stamp 4 support letter', 'epos', 'dete', 
      'isd', 'immigration stamp 4', 'p60', 'employment detail summary', 'gnib'
    ],
    summary: 'Holders of a Critical Skills Employment Permit (CSEP) do not have to wait 24 months. You are eligible to apply for a DETE Support Letter at 21 months of continuous employment, allowing you to register for Stamp 4 at the 2-year mark.',
    details: [
      'Stamp 4 gives you the right to work in Ireland without requiring an employment permit, and you can also establish your own business.',
      'You must apply for the Support Letter online through DETE\'s EPOS portal.',
      'You will need your recent payslips, Employment Detail Summary (formerly P60) from Revenue myAccount, and a signed letter from your employer confirming ongoing employment.'
    ],
    nextSteps: [
      'Log into the EPOS portal at epos.enterprise.gov.ie at month 21 of your CSEP start date.',
      'Submit the "Request for Support Letter for Stamp 4" with your latest 3 payslips and employer confirmation letter.',
      'Once DETE emails your Support Letter, book an IRP renewal appointment (or use ISD Online if living in Dublin, Kildare, Meath, or Wicklow).',
      'Present your Passport, current IRP card, CSEP permit, and DETE Support Letter.'
    ],
    officialSource: {
      title: 'Support Letters for Stamp 4 Applications',
      agency: 'Department of Enterprise, Trade and Employment (DETE)',
      url: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/support-letters-for-stamp-4-applications/',
      lastVerified: 'August 2026'
    }
  },
  {
    id: 'ppsn-application-no-lease',
    title: 'How to Get a PPS Number Without a Long-Term Lease',
    category: 'services',
    queryMatches: [
      'ppsn without lease',
      'proof of address ppsn',
      'how get pps without house rent lease',
      'ppsn documents needed',
      'apply pps number newcomer',
      'proof of address hotel airbnb'
    ],
    semanticKeywords: [
      'personal public service number', 'dsp', 'mywelfare', 'proof of address', 
      'employer letter', 'proof of identity', 'temporary accommodation'
    ],
    summary: 'You do not need a permanent registered lease to obtain a PPSN. The Department of Social Protection accepts temporary accommodation proof if accompanied by a signed letter from your employer or accommodation host.',
    details: [
      'You must prove both your identity and a valid reason for needing a PPSN (e.g. taking up employment, getting a driving licence, accessing health services).',
      'Acceptable proofs of address include: a signed letter from your employer stating you are residing in temporary company-provided housing/hotel, an Airbnb host confirmation with receipt, or a utility bill in someone else\'s name accompanied by a signed household residency letter.',
      'You cannot apply for a PPSN in advance from outside Ireland; you must already be resident in the State.'
    ],
    nextSteps: [
      'Obtain a signed letter from your employer on official letterhead stating your start date, your temporary address, and that the PPSN is required for employment.',
      'Create a basic account on MyWelfare.ie.',
      'Submit an online PPSN application, uploading your passport photo page, your employer\'s letter, and proof of arrival.',
      'DSP will either approve digitally or assign a brief in-person document verification slot.'
    ],
    officialSource: {
      title: 'How to Apply for a PPS Number',
      agency: 'Department of Social Protection (DSP)',
      url: 'https://www.gov.ie/en/service/12e6de-get-a-personal-public-service-pps-number/',
      lastVerified: 'October 2026'
    }
  },
  {
    id: 'citizenship-naturalisation-days',
    title: 'Irish Citizenship Naturalisation: 1,825 Days & 6-Week Absence Rule',
    category: 'immigration',
    queryMatches: [
      'citizenship days calculation',
      'irish naturalisation reckonable residence',
      'how many days for irish passport',
      'travel abroad citizenship rule',
      'stamp 2 count for citizenship',
      'form 8 residence conditions',
      'citizenship 5 years rules'
    ],
    semanticKeywords: [
      'naturalisation', 'reckonable residence', 'irish nationality and citizenship act 1956', 
      'form 8', '1825 days', 'continuous year', 'stamp 1', 'stamp 4', 'stamp 2 excluded', 
      '6 week rule', 'absence from state'
    ],
    summary: 'To apply for Irish citizenship (Form 8), you need 5 years (1,825 days) of reckonable residence out of the previous 9 years, including 365 days of continuous unbroken residence immediately prior to application.',
    details: [
      'Eligible stamps that count towards citizenship: Stamp 1, Stamp 1G (since 2023 update for qualifying periods), Stamp 3, Stamp 4, and Stamp 5.',
      'Ineligible stamps: Stamp 2 (Study) and Stamp 2A NEVER count towards reckonable residence for citizenship.',
      'The 6-Week Rule: Under revised Department of Justice guidelines, you can spend up to 6 weeks (42 days) outside Ireland per calendar year without breaking residency. Absences up to 10 weeks can be accepted for exceptional reasons (health, family bereavement, or work travel).'
    ],
    nextSteps: [
      'Collect all past and present IRP cards and passport entry/exit stamps.',
      'Verify that you have at least 365 continuous days in Ireland immediately before your application date.',
      'Obtain 3 proofs of residence for each reckonable year (P60/Employment Detail Summary, bank statements showing daily Irish spending, residential tenancy agreement).',
      'Apply online via the Department of Justice Citizenship Portal.'
    ],
    officialSource: {
      title: 'Citizenship by Naturalisation Guidance',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/',
      lastVerified: 'October 2026'
    }
  },
  {
    id: 'stamp2-working-hours',
    title: 'Stamp 2 Student Work Hours: 20 vs 40 Hours Calendar Limits',
    category: 'employment',
    queryMatches: [
      'stamp 2 work hours',
      'can student work 40 hours',
      'student visa work limits',
      'stamp 2 summer work',
      'working full time on student visa ireland'
    ],
    semanticKeywords: [
      'stamp 2', 'student permission', 'gnib student', 'part time work', 
      'casual employment', 'june july august september', 'holiday period'
    ],
    summary: 'Stamp 2 students are legally restricted to working a maximum of 20 hours per week during term time, and up to 40 hours per week ONLY during specific designated holiday periods.',
    details: [
      'The 40-hour full-time window is strictly limited by statutory regulation to: June, July, August, September, and from December 15 to January 15 inclusive.',
      'At all other times of the year (e.g. February to May, October to early December), you cannot work more than 20 hours per week under any circumstances.',
      'Violating working hour limits is an immigration offence that leads to non-renewal of your IRP or deportation.'
    ],
    nextSteps: [
      'Ensure your employer has your college timetable on file.',
      'Review your payroll hours each month to guarantee you do not exceed 20 hours during term time.',
      'Stamp 2 holders are not permitted to engage in self-employment or operate a business in Ireland.'
    ],
    officialSource: {
      title: 'Student Visa Employment Conditions',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-visa-options/',
      lastVerified: 'August 2026'
    }
  },
  {
    id: 'rent-tax-credit',
    title: 'Claiming the Rent Tax Credit (€1,000 / €2,000)',
    category: 'tax',
    queryMatches: [
      'rent tax credit',
      'how claim rent credit revenue',
      '1000 euro rent credit',
      'tenant tax rebate ireland',
      'rtb rent credit'
    ],
    semanticKeywords: [
      'revenue myaccount', 'rent tax credit', 'rtb number', 'private tenancy', 
      'paye tax credit', 'end of year return', 'statement of liability'
    ],
    summary: 'Tenants paying rent for private residential accommodation in Ireland can claim the Rent Tax Credit directly through Revenue myAccount. The credit is up to €1,000 for single tenants or €2,000 for jointly assessed married couples/civil partners.',
    details: [
      'The tenancy must be registered with the Residential Tenancies Board (RTB), unless it is a qualifying room-rental arrangement.',
      'You cannot claim the credit if you receive housing support such as Housing Assistance Payment (HAP) or Rent Supplement.',
      'You can claim for the current year via PAYE Services, or claim back past years (up to 4 years retroactively) by submitting an Income Tax Return.'
    ],
    nextSteps: [
      'Find your RTB registration number (ask your landlord or search the public register on rtb.ie).',
      'Log into Revenue myAccount and open "PAYE Services".',
      'Select "Manage Your Tax 2026" and click "Claim Tax Credits".',
      'Under "You and your family", add "Rent Tax Credit" and enter your total rent paid and RTB number.'
    ],
    officialSource: {
      title: 'Rent Tax Credit Guide',
      agency: 'Revenue Commissioners',
      url: 'https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/rent-credit/index.aspx',
      lastVerified: 'September 2026'
    }
  },
  {
    id: 'citizenship-150-points-scorecard',
    title: 'Naturalisation 150-Point Residence Scorecard (Proofs of Address)',
    category: 'immigration',
    queryMatches: [
      '150 points rule citizenship',
      'proof of residence score card',
      'how to prove address form 8',
      'documents for irish citizenship naturalisation',
      'p60 bank statement points'
    ],
    semanticKeywords: [
      'scorecard', '150 points', 'identity score', 'proof of residency', 
      'type a documents', 'type b documents', 'employment detail summary', 'revenue'
    ],
    summary: 'The Department of Justice requires applicants for Irish naturalisation to score at least 150 points per reckonable year to prove residence. You must provide a combination of Type A (high weight) and Type B documents for every single year claimed.',
    details: [
      'Type A documents carry the highest weight: Revenue Employment Detail Summary / P60 (70 points), Current Year Notice of Assessment (70 points), or Social Welfare statement (70 points).',
      'Type B documents include: Bank statements showing daily retail spending in Ireland for at least 6 months (50 points), Residential Tenancy Board (RTB) registered tenancy agreement (40 points), Electricity / Gas / Broadband bill (20-30 points), Car insurance or Motor tax disc (20 points).',
      'You cannot simply provide 5 utility bills for one year. You must reach 150 points for every separate 12-month period.'
    ],
    nextSteps: [
      'Download your Employment Detail Summaries from Revenue myAccount for each reckonable year (70 points each).',
      'Request full 12-month historical bank statements showing consistent in-store grocery/retail card transactions in Ireland (50 points).',
      'Gather electricity/gas bills or your RTB registration letter to make up the final 30 points.',
      'Check the total points per year before submitting Form 8.'
    ],
    officialSource: {
      title: 'Citizenship Guidance Document & Scorecard',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.irishimmigration.ie/how-to-become-a-citizen/become-an-irish-citizen-by-naturalisation/',
      lastVerified: 'October 2026'
    }
  },
  {
    id: 'driving-licence-reduced-edt',
    title: 'Exchanging Foreign Driving Licences & Reduced EDT (6 Lessons)',
    category: 'services',
    queryMatches: [
      'exchange driving licence non eu',
      'pakistan driving licence ireland',
      'reduced edt 6 lessons',
      'ndls foreign licence swap',
      'car test for immigrants'
    ],
    semanticKeywords: [
      'ndls', 'rsa', 'reduced edt', 'essential driver training', 'theory test', 
      'foreign licence exchange', 'learner permit', 'driving test'
    ],
    summary: 'Ireland only directly swaps driving licences from EU/EEA countries and a small list of recognized states (e.g., UK, Australia, South Africa, Japan). Licences from countries like Pakistan, India, or the US cannot be directly exchanged. You must pass the theory test, complete Reduced EDT (6 lessons instead of 12), and pass the practical driving test.',
    details: [
      'Holders of an authentic, full foreign licence can apply to the RSA for the "Reduced EDT" scheme, which cuts mandatory lessons from 12 down to 6.',
      'Reduced EDT also waives the mandatory 6-month waiting period between receiving your Irish Learner Permit and booking your practical driving test.',
      'You will need a letter of entitlement or driving record from your home licensing authority, certified and dated within the last 6 months.'
    ],
    nextSteps: [
      'Pass the Irish Driver Theory Test (Category B) at theorytest.ie.',
      'Apply to the RSA for Reduced EDT exemption before booking driving lessons.',
      'Book your eyesight report and visit an NDLS center to collect your Irish Learner Permit.',
      'Complete the 6 Reduced EDT lessons with an approved RSA instructor and apply for the driving test.'
    ],
    officialSource: {
      title: 'Exchanging Your Foreign Driving Licence',
      agency: 'National Driver Licence Service (NDLS)',
      url: 'https://www.ndls.ie/licensed-driver/exchange-my-foreign-driving-licence.html',
      lastVerified: 'September 2026'
    }
  },
  {
    id: 'spouse-stamp1g-work-rights',
    title: 'Spousal Stamp 1G: Right to Work Without an Employment Permit',
    category: 'employment',
    queryMatches: [
      'spouse work rights ireland',
      'stamp 1g spouse can work',
      'critical skills dependent work permit',
      'bring wife to ireland stamp 1g',
      'join family work rights'
    ],
    semanticKeywords: [
      'stamp 1g', 'spouse of csep', 'critical skills spouse', 'join family', 
      'spousal employment permission', 'dete work permit exemption'
    ],
    summary: 'Spouses and de facto partners of Critical Skills Employment Permit (CSEP) holders and researchers on Hosting Agreements are granted Stamp 1G. They have the immediate right to work full-time in Ireland without needing an employment permit.',
    details: [
      'Stamp 1G spouses can take up employment without an employer needing to sponsor a DETE work permit or satisfy a Labour Market Needs Test.',
      'Self-employment or setting up a registered business is not permitted on Stamp 1G (you must be an employee under PAYE).',
      'Stamp 1G must be renewed annually with ISD until the primary sponsor transitions to Stamp 4 or naturalises.'
    ],
    nextSteps: [
      'Ensure the primary sponsor holds a valid CSEP and Stamp 1/Stamp 4 IRP card.',
      'Register the spouse at Burgh Quay or the local Garda station with their marriage certificate (apostilled/translated) and sponsor\'s contract.',
      'Once the Stamp 1G card is received, provide a copy to prospective employers along with your PPSN.'
    ],
    officialSource: {
      title: 'Family Reunification & Stamp 1G Policy',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/spouse-civil-partner-of-a-critical-skills-employment-permit-holder/',
      lastVerified: 'September 2026'
    }
  },
  {
    id: 'ukrainian-tpts-stamp4-transition',
    title: 'Ukrainian Temporary Protection Transition Scheme (Stamp 4 Pathway)',
    category: 'immigration',
    queryMatches: [
      'ukrainian stamp 4',
      'temporary protection transition scheme',
      'tpts ireland',
      'yellow letter change stamp 4',
      'ukraine citizenship reckonable days',
      'ukraine resident permit stamp 4'
    ],
    semanticKeywords: [
      'temporary protection', 'tpts', 'stamp 4', 'inisonline', 'reckonable residence', 
      'ukrainian work permit exemption', 'ukraine transition scheme'
    ],
    summary: 'Under the Temporary Protection Transition Scheme (TPTS) opened September 30, 2026, eligible beneficiaries of Temporary Protection in Ireland can transition to a renewable 2-year Stamp 4 permission. Crucially, time accumulated under this Stamp 4 is reckonable toward Irish citizenship.',
    details: [
      'To qualify, applicants must have resided in Ireland under Temporary Protection for at least 1 year, have at least 6 months of employment or self-employment history, and live in independent accommodation (not state-supported accommodation).',
      'Stamp 4 grants complete freedom to work in any job without an employment permit, establish a company, or pursue education.',
      'Unlike temporary protection (the yellow letter), days spent on this Stamp 4 directly count toward the 1,825 reckonable days required for Irish naturalisation.'
    ],
    nextSteps: [
      'Log into the ISD Online Portal at inisonline.jahs.ie.',
      'Submit the TPTS application along with proof of at least 6 months of employment (Revenue Employment Detail Summary, recent payslips) and proof of independent tenancy (RTB letter or private lease agreement).',
      'Once approved digitally, your 2-year Stamp 4 IRP card is posted directly to your address.'
    ],
    officialSource: {
      title: 'Temporary Protection Transition Scheme (TPTS) Guidance',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.gov.ie/en/department-of-justice-home-affairs-and-migration/campaigns/ukraine-updates-en/',
      lastVerified: 'September 30, 2026'
    }
  },
  {
    id: 'employment-permits-act-2024-change-employer',
    title: 'Employment Permits Act 2024: Changing Employer After 9 Months',
    category: 'employment',
    queryMatches: [
      'change employer 9 months',
      'employment permits act 2024',
      'switch job on csep',
      'switch job general work permit',
      'change employer without new permit',
      'leave employer work permit ireland'
    ],
    semanticKeywords: [
      'employment permits act 2024', 'change of employer', 'csep', 'gep', 
      'dete', '9 months rule', 'job mobility', 'epos'
    ],
    summary: 'The Employment Permits Act 2024 commenced on September 2, 2024, enabling holders of Critical Skills (CSEP) and General Employment Permits (GEP) to change employers after 9 months of employment, reduced from the previous 12-month rule.',
    details: [
      'You no longer need to apply for an entirely new permit from scratch; the change is processed as a streamlined Change of Employer application on your existing permit.',
      'General Employment Permit (GEP) holders must move to a role with the same 4-digit Standard Occupational Classification (SOC) code.',
      'Critical Skills permit holders can move across eligible professional categories without forfeiting their progress toward their 21-month Stamp 4 support letter.'
    ],
    nextSteps: [
      'Verify that at least 9 months have passed since your employment permit start date.',
      'Secure a formal job offer and contract from your new registered employer.',
      'Submit a Change of Employer application through DETE\'s EPOS online portal.'
    ],
    officialSource: {
      title: 'Employment Permits Act 2024 Overview & Guidelines',
      agency: 'Department of Enterprise, Trade and Employment (DETE)',
      url: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/',
      lastVerified: 'September 2024'
    }
  }
];
