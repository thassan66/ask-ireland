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
    title: 'Irish Citizenship Naturalisation: 1,825 Days & 70-Day Absence Rule',
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
      '70 day rule', '100 day rule', 'absence from state'
    ],
    summary: 'To apply for Irish citizenship (Form 8), you need 5 years (1,825 days) of reckonable residence out of the previous 9 years, including 365 days of continuous unbroken residence immediately prior to application.',
    details: [
      'Eligible stamps that count towards citizenship: Stamp 1, Stamp 1G (since 2023 update for qualifying periods), Stamp 3, Stamp 4, and Stamp 5.',
      'Ineligible stamps: Stamp 2 (Study) and Stamp 2A NEVER count towards reckonable residence for citizenship.',
      'For the final year before application, amended law allows absences up to 70 days as residence, with a possible additional 30 days only where the Minister is satisfied there are exceptional circumstances.'
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
    },
    legalBoundary: 'This is a date-counting and document-preparation guide. Naturalisation remains discretionary and the Department of Justice decides each application on its full facts.',
    sourceConfidence: 'official-guidance'
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
      'Review your payroll hours each month to ensure you stay within 20 hours during term time.',
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
  },
  {
    id: 'first-time-irp-registration',
    title: 'First-Time Irish Residence Permit (IRP) Registration Guide',
    category: 'immigration',
    queryMatches: [
      'first time irp',
      'how to get irp card',
      'book burgh quay appointment',
      'gnib first appointment',
      'register immigration 90 days',
      'first time irish residence permit',
      'burgh quay phone number',
      'first irp registration checklist'
    ],
    semanticKeywords: [
      'burgh quay', 'isd', 'freephone 1800 741 741', '300 euro fee', 'card payment only',
      'proof of address', 'entry stamp', 'stamp 1', 'stamp 2', 'stamp 4', 'first registration'
    ],
    summary: 'All non-EEA nationals staying in Ireland for more than 90 days must register in person with Immigration Service Delivery (ISD). The fee is €300 paid by card. You must book through the official ISD phone line and register within 90 days of arriving.',
    details: [
      'If you live in Dublin, Meath, Kildare, or Wicklow, your first appointment is at the Burgh Quay Registration Office in Dublin. Appointments are booked by calling Freephone 1800 741 741 (or +353 1 615 5700 from outside Ireland). Do not pay third-party agents for appointments.',
      'Payment must be made by debit or credit card (Visa or Mastercard) at your appointment. Cash is never accepted at the counter.',
      'Bring your valid passport with your border entry stamp, proof of legal address in Ireland (utility bill, tenancy agreement, or host declaration letter), and your qualifying document (such as an employment permit, university acceptance letter, or marriage certificate).',
      'Your photo and fingerprints will be captured during the appointment. Your physical IRP card is then posted to your verified Irish address within 10 to 15 working days.'
    ],
    nextSteps: [
      'Call the ISD booking line on Freephone 1800 741 741 as soon as you have an Irish address and arrival stamp.',
      'Assemble your original passport, permit or college letter, medical insurance policy, and proof of address.',
      'Attend your appointment on time and pay the €300 registration fee using a debit or credit card.',
      'Check your mailbox 10 to 15 working days after the appointment for your IRP card.'
    ],
    officialSource: {
      title: 'First-Time Registration for Non-EEA Nationals',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.irishimmigration.ie/registering-your-immigration-permission/how-to-register-your-immigration-permission-for-the-first-time/',
      lastVerified: 'October 2026'
    },
    legalBoundary: 'Administrative registration rules set by the Minister for Justice. You must register within 90 days of border entry.',
    sourceConfidence: 'official'
  },
  {
    id: 'student-visa-avats-stamp2-guide',
    title: 'Irish Student Visa (AVATS) and Stamp 2 Requirements',
    category: 'immigration',
    queryMatches: [
      'documents required for irish student visa',
      'student visa ireland checklist',
      'avats student application',
      'stamp 2 requirements',
      'how much funds for student visa ireland',
      'student visa proof of funds',
      'international student ireland documents'
    ],
    semanticKeywords: [
      'avats', 'stamp 2', 'student visa', 'proof of funds', '10000 euro', 'private health insurance',
      'attestation', 'mofa', 'nadra', 'hec', 'ielts', 'pte', 'work 20 hours'
    ],
    summary: 'Studying in Ireland involves two distinct steps: getting an entry visa via AVATS before travel (if your nationality requires a visa), and registering for a Stamp 2 IRP card after arrival. You need proof of €10,000 in readily accessible living funds and private medical insurance.',
    details: [
      'Visa-required passport holders must apply through the AVATS online system before traveling. Non-visa required citizens (such as Americans, Brazilians, or Canadians) do not apply on AVATS and present their college acceptance letter directly to border control at the airport.',
      'Living expense funds: You must show verifiable access to at least €10,000 for living costs if your course runs for an academic year (or €4,500 for courses under 6 months), alongside full payment receipts for your tuition fees.',
      'Document attestation: Personal records (birth certificates, marriage certificates) and academic transcripts must be officially translated and attested or apostilled by the Ministry of Foreign Affairs in your country of origin (such as NADRA and MOFA in Pakistan, or the Ministry of External Affairs in India).',
      'Work rights: On Stamp 2, you can work up to 20 hours per week during academic terms, and up to 40 hours per week during standard holiday periods (June through September, and December 15 through January 15).'
    ],
    nextSteps: [
      'Complete the online AVATS summary sheet and pay the visa application fee if you hold a visa-required passport.',
      'Gather bank statements from the previous 6 months showing access to the required living expenses and tuition fee receipts.',
      'Have all academic credentials and civil certificates attested by your home country foreign affairs ministry or Apostille registry.',
      'After landing in Ireland, book an ISD appointment to register for your physical Stamp 2 IRP card within 90 days.'
    ],
    officialSource: {
      title: 'Student Visa & Study Permission Guidelines',
      agency: 'Immigration Service Delivery (ISD)',
      url: 'https://www.irishimmigration.ie/coming-to-study-in-ireland/frequently-asked-questions-for-students/',
      lastVerified: 'October 2026'
    },
    legalBoundary: 'General student immigration requirements. Meeting document criteria does not guarantee visa issuance; decisions rest with the visa officer.',
    sourceConfidence: 'official'
  },
  {
    id: 'irish-job-search-portals',
    title: 'Job Search Portals and Work Permit Sponsorship in Ireland',
    category: 'employment',
    queryMatches: [
      'job sites in ireland',
      'popular job boards ireland',
      'where to find jobs in ireland',
      'public jobs ireland',
      'hse jobs',
      'find work permit sponsor ireland',
      'tech jobs dublin',
      'recruitment websites ireland'
    ],
    semanticKeywords: [
      'irishjobs', 'jobs.ie', 'indeed ireland', 'publicjobs.ie', 'hse jobs', 'glassdoor',
      'monster ireland', 'csep sponsorship', 'labour market needs test', 'general employment permit'
    ],
    summary: 'Irish hiring is split across general boards and dedicated public service portals. If you require visa sponsorship, check if your target role is on the Critical Skills Occupations List, which exempts your employer from running a 28-day local advertising test.',
    details: [
      'Private sector portals: IrishJobs.ie and LinkedIn are the most common platforms for technology, finance, engineering, and corporate roles. Jobs.ie, Indeed Ireland, and RecruitIreland carry strong listings for healthcare, customer operations, hospitality, and construction.',
      'Public sector portals: Publicjobs.ie is the centralized portal for the Irish Civil Service, local county councils, and non-commercial state agencies. HSEJobs.ie is the recruitment hub for doctors, nurses, allied health specialists, and clinical staff.',
      'Critical Skills sponsorship: Roles listed on the Highly Skilled Eligible Occupations List do not require a Labour Market Needs Test. Employers can offer sponsorship directly if the salary meets the statutory minimum (€38,000 with a relevant degree, or €44,000+).',
      'General Employment Permits: Roles not on the Critical Skills list and not on the Ineligible list require the employer to advertise on JobsIreland.ie and EURES for 28 consecutive days before offering sponsorship.'
    ],
    nextSteps: [
      'Set up job alerts on IrishJobs.ie, LinkedIn, and Jobs.ie targeted to your specific job category.',
      'Check whether your occupation matches an eligible 4-digit SOC code on the DETE Highly Skilled Occupations list.',
      'If you work in healthcare or administration, review Publicjobs.ie and HSEJobs.ie on a weekly schedule.',
      'Structure your CV according to standard Irish conventions: 2 pages, no headshot photograph, no marital status or age, and clear work permit status.'
    ],
    officialSource: {
      title: 'Employment Permit Schemes & Work Permit Guidelines',
      agency: 'Department of Enterprise, Trade and Employment (DETE)',
      url: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/',
      lastVerified: 'October 2026'
    },
    legalBoundary: 'Directory of Irish recruitment portals and statutory permit eligibility rules. Ask Ireland is not a recruitment agency and does not provide employment matching.',
    sourceConfidence: 'official-guidance'
  },
  {
    id: 'clinical-psychologist-permit-ireland',
    title: 'How to Work as a Clinical Psychologist in Ireland (CORU & Critical Skills)',
    category: 'employment',
    queryMatches: [
      'clinical psychologist ireland',
      'work as clinical psychologist ireland',
      'psychologist critical skills permit',
      'coru psychologist registration',
      'psi qualification validation psychologist',
      'clinical psychologist 2212 soc code',
      'psychologist job permit ireland'
    ],
    semanticKeywords: [
      'clinical psychologist', 'soc 2212', 'critical skills employment permit', 'coru',
      'psi', 'psychological society of ireland', 'hse jobs', 'qualification validation'
    ],
    summary: 'Clinical Psychologists fall under SOC code 2212 on the Highly Skilled Eligible Occupations List, qualifying for a Critical Skills Employment Permit. International qualifications must be formally validated, and professionals must register with Ireland\'s health regulator (CORU / PSI) before practicing.',
    details: [
      'Critical Skills classification: Psychologists are designated under Standard Occupational Classification (SOC) code 2212 on the Highly Skilled Eligible Occupations List. Roles qualify for a fast-track 2-year permit leading directly to Stamp 4.',
      'Regulatory qualification recognition: Overseas credentials must undergo validation. Previously managed by the Psychological Society of Ireland (PSI), registration of psychologists is transitioning to CORU under the Health and Social Care Professionals Act 2005.',
      'Employment settings: After obtaining validation, psychologists can apply for positions in the Health Service Executive (HSE), Section 38/39 funded voluntary bodies, universities, or private clinical settings.',
      'Permit application process: Either the employer or the applicant can lodge the Critical Skills permit application on the DETE EPOS portal. You must provide your validated qualification certificate, employment contract for at least 2 years, and salary confirmation.'
    ],
    nextSteps: [
      'Submit your foreign qualification transcripts and clinical placement records to CORU or PSI for statutory validation.',
      'Search for verified clinical vacancies on HSEJobs.ie, Publicjobs.ie, and Irish hospital network careers pages.',
      'Secure a written employment offer and contract meeting the Critical Skills salary threshold.',
      'Submit your application through the DETE EPOS portal attaching your qualification validation letter.',
      'Once the permit is granted, apply for an employment visa (if visa-required) and register for your Stamp 1 IRP card within 90 days of arriving.'
    ],
    officialSource: {
      title: 'Highly Skilled Occupations List & Health Professional Registration',
      agency: 'Department of Enterprise (DETE) & CORU',
      url: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/highly-skilled-eligible-occupations-list/',
      lastVerified: 'October 2026'
    },
    legalBoundary: 'Professional registration standards and work permit rules. You cannot legally practice as a clinical psychologist or use protected statutory titles without regulatory approval.',
    sourceConfidence: 'official'
  }
];
