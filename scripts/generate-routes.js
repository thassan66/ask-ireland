import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const baseHtmlPath = path.join(distDir, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

const TODAY = new Date().toISOString().split('T')[0];

const ROUTES = {
  calculator: {
    path: '/calculator',
    name: 'Residency Calculator',
    title: 'Irish Citizenship Calculator — 5-Year Statutory Residency Check | Ask Ireland',
    description: 'Calculate your reckonable days for Irish naturalisation. Audits 1,825 days (5 years), 365-day continuous year, Stamp 1/4 eligibility, and the 70-day travel limit.',
    heading: 'Irish Citizenship Statutory Residency Calculator',
    summary: 'Audit your reckonable days, check the 1,825 days threshold, verify continuous year compliance, and review the 70-day travel allowance under the Irish Nationality and Citizenship Act 1956 (as amended by the Courts and Civil Law Act 2023).',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'Irish Citizenship Statutory Residency Calculator',
          'url': 'https://ask-ireland.vercel.app/calculator',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'All',
          'description': 'Calculates reckonable days for Irish naturalisation under Department of Justice guidelines. Audits 5-year (1,825 days) statutory residence and 365-day continuous year.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'EUR'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Residency Calculator',
              'item': 'https://ask-ireland.vercel.app/calculator'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How many reckonable days are needed for Irish citizenship by naturalisation?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Standard adult naturalisation under Section 15 of the Irish Nationality and Citizenship Act 1956 requires 1,825 reckonable days (5 years) of lawful residence in Ireland within the preceding 8 years. This must include 365 days of continuous residence immediately before your application date.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is the 70-day travel allowance rule for Irish citizenship?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Under the Courts and Civil Law (Miscellaneous Provisions) Act 2023, applicants can spend up to 70 days outside Ireland in the final continuous year without breaking residence continuity. Up to an additional 30 days (total 100 days) may be permitted for exceptional reasons like health or family emergencies.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can the spouse of an Irish citizen apply for citizenship after 3 years?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. Under Section 15A, spouses or civil partners of Irish citizens require only 1,095 reckonable days (3 years) within the preceding 5 years, provided they have been married and living together as husband and wife / civil partners for at least 3 continuous years.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Does Stamp 1, Stamp 1G, or Stamp 4 count toward Irish naturalisation?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Stamp 1 (Employment Permit), Stamp 4 (Permanent / Open work), Stamp 3 (Dependant), and Stamp 5 are fully reckonable. Stamp 1G granted as the spouse of a Critical Skills permit holder is also reckonable. Stamp 2 (student permissions) is excluded under Section 16A.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How much does it cost to apply for Irish citizenship by naturalisation?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'The statutory application fee is €175 payable upon submitting Form 8. If naturalisation is approved by the Minister, a certificate fee of €950 is payable for adults (€200 for minors, €0 for recognized refugees).'
              }
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>Statutory Naturalisation Rules in Ireland</h2>
        <p>Irish naturalisation is governed by the <em>Irish Nationality and Citizenship Act 1956</em> (as amended by the <em>Courts and Civil Law (Miscellaneous Provisions) Act 2023</em>). To qualify for citizenship by naturalisation as an adult, you must satisfy statutory reckonable residence conditions:</p>
        
        <h3>1. Standard Adult Residence Pathway (Section 15)</h3>
        <ul>
          <li><strong>Total Target:</strong> 1,825 reckonable days (5 years) within the preceding 8 years.</li>
          <li><strong>Continuous Final Year:</strong> 365 days of unbroken lawful residence immediately before your application date.</li>
          <li><strong>70-Day Travel Limit:</strong> Absences from Ireland during the final 365 days must not exceed 70 days for holidays or employment travel, with up to 100 days permitted only on certified exceptional grounds.</li>
        </ul>

        <h3>2. Spousal Naturalisation Pathway (Section 15A)</h3>
        <ul>
          <li><strong>Total Target:</strong> 1,095 reckonable days (3 years) within the preceding 5 years.</li>
          <li><strong>Marriage Requirement:</strong> Married or in a civil partnership with an Irish citizen for at least 3 continuous years, living together in the State.</li>
        </ul>

        <h3>3. Reckonable vs Excluded Immigration Stamps</h3>
        <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%; margin: 1rem 0;">
          <thead>
            <tr style="background: #f4f4f4;">
              <th>IRP Stamp</th>
              <th>Status</th>
              <th>Reckonability for Naturalisation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Stamp 4</td><td>Permanent / Long-Term</td><td>Fully reckonable</td></tr>
            <tr><td>Stamp 1</td><td>Employment Permit</td><td>Fully reckonable</td></tr>
            <tr><td>Stamp 1G (Spousal)</td><td>Spouse of CSEP</td><td>Fully reckonable</td></tr>
            <tr><td>Stamp 3</td><td>Dependant / Volunteer</td><td>Fully reckonable</td></tr>
            <tr><td>Stamp 5</td><td>Without Condition</td><td>Fully reckonable</td></tr>
            <tr><td>Stamp 2</td><td>Student</td><td><strong>Excluded</strong> under Section 16A</td></tr>
            <tr><td>Stamp 1G (Graduate)</td><td>Third Level Graduate</td><td>Non-reckonable for citizenship</td></tr>
          </tbody>
        </table>

        <h3>Useful Civic Resources</h3>
        <p>
          <a href="/scorecard">150-Point Scorecard Calculator</a> · 
          <a href="/emergency-tax">Emergency Tax Rebate Guide</a> · 
          <a href="/letters">Immigration Bureaucracy Letters</a> · 
          <a href="/journey">Immigration Journey Tracker</a>
        </p>
      </section>`
  },

  'emergency-tax': {
    path: '/emergency-tax',
    name: 'Emergency Tax Guide',
    title: 'How to Stop Emergency Tax in Ireland — Revenue myAccount Guide | Ask Ireland',
    description: 'Stop 40% emergency tax deductions on your Irish salary. Step-by-step guide to add your job on Revenue myAccount and receive automated payroll tax refunds.',
    heading: 'Emergency Tax Unblocker & Payroll Refund Guide',
    summary: 'Step-by-step instructions to obtain employer TRN, register job on Revenue myAccount, trigger Revenue Payroll Notification (RPN), and receive automatic PAYE/USC refunds.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          'name': 'How to Stop Emergency Tax and Get a Refund in Ireland',
          'description': 'Step-by-step instructions to register your employment on Revenue myAccount, issue a Revenue Payroll Notification (RPN), and receive an automated emergency tax refund.',
          'totalTime': 'PT10M',
          'step': [
            {
              '@type': 'HowToStep',
              'position': 1,
              'name': 'Obtain Employer TRN',
              'text': 'Request your company 8-character Employer Tax Registration Number (TRN) from your employer HR or payroll team.',
              'url': 'https://ask-ireland.vercel.app/emergency-tax#step-1'
            },
            {
              '@type': 'HowToStep',
              'position': 2,
              'name': 'Log into Revenue myAccount',
              'text': 'Sign in to Revenue myAccount using your PPS Number and password or MyGovID verified credentials.',
              'url': 'https://ask-ireland.vercel.app/emergency-tax#step-2'
            },
            {
              '@type': 'HowToStep',
              'position': 3,
              'name': 'Add Job or Pension',
              'text': 'Navigate to PAYE Services and select Add Job or Pension. Enter your start date and your employer Tax Registration Number (TRN).',
              'url': 'https://ask-ireland.vercel.app/emergency-tax#step-3'
            },
            {
              '@type': 'HowToStep',
              'position': 4,
              'name': 'Receive Payroll Refund',
              'text': 'Revenue issues an updated Revenue Payroll Notification (RPN) to your employer. Any overpaid emergency tax (40% PAYE + 8% USC) is automatically refunded in your next paycheck.',
              'url': 'https://ask-ireland.vercel.app/emergency-tax#step-4'
            }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Emergency Tax Guide',
              'item': 'https://ask-ireland.vercel.app/emergency-tax'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Why was I charged emergency tax on my first Irish salary?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Employers must deduct emergency tax (40% higher PAYE rate plus 8% USC without tax credits) until they receive an official Revenue Payroll Notification (RPN) linking your PPSN to their Tax Registration Number.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How long does it take Revenue to refund emergency tax?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Once you register your job on Revenue myAccount, the RPN is generated within 24 to 48 hours. Your employer payroll software downloads the RPN and refunds all overpaid emergency tax in the subsequent pay cycle.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do I need to contact Revenue directly to claim the emergency tax back?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No. Once the job is added online in Revenue myAccount and the RPN is fetched by your employer, the refund is automated on your next payslip. You do not need to call Revenue.'
              }
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>How Emergency Tax Operates in Ireland</h2>
        <p>When starting employment in Ireland, employers are legally required to deduct tax on the emergency basis until Revenue issues an official <strong>Revenue Payroll Notification (RPN)</strong>.</p>
        
        <h3>The Emergency Tax Rate</h3>
        <p>Under emergency tax rules, you receive no tax credits and earnings are taxed at <strong>40% PAYE plus 8% USC</strong>. This can reduce your initial take-home pay by up to 50%.</p>

        <h3>Four Steps to Stop Emergency Tax & Receive an Automatic Refund</h3>
        <ol>
          <li><strong>Step 1:</strong> Ask your company HR or payroll contact for their 8-character Employer Tax Registration Number (TRN).</li>
          <li><strong>Step 2:</strong> Sign in to <a href="https://www.revenue.ie" target="_blank" rel="noreferrer">Revenue myAccount</a> using your PPSN and password.</li>
          <li><strong>Step 3:</strong> Under PAYE Services, select "Add Job or Pension", enter your employment start date, and submit the employer TRN.</li>
          <li><strong>Step 4:</strong> Revenue automatically generates a new RPN. Your employer's payroll software downloads it, adjusting tax credits and refunding all overpaid tax in your next regular payroll.</li>
        </ol>
      </section>`
  },

  scorecard: {
    path: '/scorecard',
    name: '150-Point Scorecard',
    title: 'Irish Citizenship Scorecard Calculator — Identity & Proof Points | Ask Ireland',
    description: 'Calculate your 150 points of identity and Irish residency proof for your naturalisation application using official Department of Justice scorecard rules.',
    heading: 'Irish Citizenship 150-Point Scorecard Calculator',
    summary: 'Score identity and residency proofs (Type A Revenue Employment Detail Summaries and Type B utility bills) for each required year under Form 8 naturalisation criteria.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          'name': 'How to Score 150 Points for Irish Naturalisation Form 8',
          'description': 'Calculate identity and residency points for each reckonable year under the Department of Justice citizenship scorecard system.',
          'step': [
            {
              '@type': 'HowToStep',
              'position': 1,
              'name': 'Provide Primary Identity Proof',
              'text': 'Submit a valid passport (worth 70 points) or national identity card to satisfy baseline identity requirements.'
            },
            {
              '@type': 'HowToStep',
              'position': 2,
              'name': 'Score 150 Points of Annual Residency Proof',
              'text': 'For each required year of reckonable residence, supply at least one Type A document (Employment Detail Summary/P60 worth 70 points) and supporting Type B documents (utility bills, lease agreements, bank statements) totaling at least 150 points per year.'
            }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '150-Point Scorecard',
              'item': 'https://ask-ireland.vercel.app/scorecard'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What documents give 150 points for Irish citizenship?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Applicants must accumulate 150 points for each year of reckonable residence. Primary Type A proofs include Revenue Employment Detail Summaries / P60s (70 pts), Notice of Assessment (70 pts), and DSP statements (70 pts). Supporting Type B proofs include bank statements (50 pts), RTB tenancy agreements (40 pts), and electricity/gas bills (30/20 pts).'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I apply for Irish naturalisation without a P60 or EDS?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, but you must reach 150 points using alternative acceptable documents (such as social welfare statements, school/university letters, or a combination of tenancy agreements, bank statements, and utility bills) and explain why tax records are unavailable.'
              }
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>The 150-Point Naturalisation Scorecard</h2>
        <p>Under Department of Justice rules for Form 8 naturalisation, applicants must submit documentary evidence demonstrating both identity and lawful residence in Ireland.</p>
        
        <h3>Scorecard Structure</h3>
        <ul>
          <li><strong>Identity:</strong> 150 points (Current passport = 70 points, original long-form birth certificate = 50 points, National ID = 50 points).</li>
          <li><strong>Residency:</strong> 150 points <em>for each year</em> of reckonable residence claimed.</li>
        </ul>

        <h3>Common Type A and Type B Document Point Values</h3>
        <ul>
          <li><strong>Revenue Employment Detail Summary (P60):</strong> 70 points (Type A)</li>
          <li><strong>Revenue Notice of Assessment:</strong> 70 points (Type A)</li>
          <li><strong>DSP Social Welfare Statement:</strong> 70 points (Type A)</li>
          <li><strong>Bank Statements with everyday transactions:</strong> 50 points (Type B)</li>
          <li><strong>RTB Registered Tenancy Agreement:</strong> 40 points (Type B)</li>
          <li><strong>Electricity Bill:</strong> 30 points (Type B)</li>
          <li><strong>Gas or Broadband Bill:</strong> 20 points (Type B)</li>
        </ul>
      </section>`
  },

  letters: {
    path: '/letters',
    name: 'Immigration Letter Templates',
    title: 'Irish Immigration Letter Templates — Stamp 4 Support & Appeals | Ask Ireland',
    description: 'Free verified letter templates for Irish immigration: Critical Skills 21-month Stamp 4 DETE support letter, employment verification, and GNIB requests.',
    heading: 'Irish Immigration Bureaucracy Letter Drafter',
    summary: 'Pre-drafted, statutory-compliant letter templates for DETE EPOS support letters, employer verification, and immigration appeals.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'DigitalDocument',
          'name': 'Irish Immigration Support Letter Templates',
          'description': 'Standardized letter templates for Irish immigration: Critical Skills 21-month Stamp 4 support letter for DETE, employment verification, and ISD appeals.',
          'url': 'https://ask-ireland.vercel.app/letters'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Letter Templates',
              'item': 'https://ask-ireland.vercel.app/letters'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'When can a Critical Skills permit holder apply for a Stamp 4 support letter?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Holders of a Critical Skills Employment Permit (CSEP) can apply to the Department of Enterprise, Trade and Employment (DETE) for a Stamp 4 Support Letter after 21 months of continuous employment with their permit sponsor.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How do I prove my address for a PPSN if I live in temporary accommodation without a lease?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'You can provide a signed letter from your accommodation host confirming your residence alongside their recent utility bill, or an official letter from your employer confirming your temporary residential address in Ireland.'
              }
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>Administrative Letter Templates for Irish Institutions</h2>
        <p>Navigating Irish bureaucracy often requires formal letters requesting official documentation. Use these structured templates to request support from employers, landlords, and state agencies:</p>
        
        <h3>Available Templates</h3>
        <ol>
          <li><strong>21-Month Stamp 4 Support Letter (To Employer):</strong> Request the mandatory DETE employer letter at month 21 on a Critical Skills Employment Permit.</li>
          <li><strong>RTB Registration Number Request (To Landlord):</strong> Request the RTB confirmation number needed to claim the €1,000 / €2,000 Rent Tax Credit on Revenue myAccount.</li>
          <li><strong>Host Proof of Address Letter for PPSN (To DSP):</strong> Have your host or employer confirm your residence if you lack a formal lease agreement.</li>
        </ol>
      </section>`
  },

  updates: {
    path: '/updates',
    name: 'Policy Updates',
    title: 'Irish Immigration & Tax Policy Alerts (2026) | Ask Ireland',
    description: 'Latest statutory policy updates on Irish immigration permissions, Critical Skills employment permits, minimum salary thresholds, and Revenue rules.',
    heading: 'Irish Immigration & Tax Policy Alerts (2026)',
    summary: 'Official circulars, salary minimums, Stamp 1G spousal updates, and citizenship processing notifications.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'NewsArticle',
          'headline': 'Irish Immigration & Tax Policy Circulars (2026)',
          'description': 'Statutory policy alerts on Critical Skills employment permit thresholds, Stamp 1G spousal rights, and Irish citizenship processing changes.',
          'url': 'https://ask-ireland.vercel.app/updates',
          'datePublished': '2026-01-01',
          'dateModified': TODAY
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Policy Alerts',
              'item': 'https://ask-ireland.vercel.app/updates'
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>Key 2026 Policy Circulars & Changes</h2>
        <ul>
          <li><strong>Courts & Civil Law Act Amendments:</strong> Confirmation of the 70-day travel limit in the final 365-day continuous residence year for naturalisation.</li>
          <li><strong>Stamp 1G Spousal Working Permissions:</strong> Eligible spouses and partners of Critical Skills permit holders can work without requiring an individual employment permit.</li>
          <li><strong>Employment Permit Salary Thresholds:</strong> Updated minimum remuneration tiers across general and critical skills classifications.</li>
        </ul>
      </section>`
  },

  directory: {
    path: '/directory',
    name: 'Official Directory',
    title: 'Irish Public Services Directory — Revenue, ISD, DSP Contacts | Ask Ireland',
    description: 'Direct verified portal links, office locations, and phone numbers for Irish public agencies including Revenue Commissioners, ISD, and Social Protection.',
    heading: 'Official Irish Public Services & Portals Directory',
    summary: 'Direct links and contact pathways for Revenue Commissioners, Immigration Service Delivery (ISD), Department of Social Protection (DSP), and DETE.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          'name': 'Irish Public Services and Immigration Portals Directory',
          'description': 'Verified official portals and contact details for Revenue Commissioners, Immigration Service Delivery (ISD), Department of Social Protection (DSP), and DETE.',
          'url': 'https://ask-ireland.vercel.app/directory'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Portals Directory',
              'item': 'https://ask-ireland.vercel.app/directory'
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>Official Irish Public Agency Directory</h2>
        <p>Verified entry points to official Irish government portals:</p>
        <ul>
          <li><strong>Revenue Commissioners:</strong> Manage PAYE, emergency tax, and Employment Detail Summaries at <a href="https://www.revenue.ie" target="_blank" rel="noreferrer">revenue.ie</a>.</li>
          <li><strong>Immigration Service Delivery (ISD):</strong> Form 8 naturalisation, IRP card renewals, and visa permissions at <a href="https://www.irishimmigration.ie" target="_blank" rel="noreferrer">irishimmigration.ie</a>.</li>
          <li><strong>Department of Social Protection (DSP):</strong> PPS Numbers, PRSI statements, and welfare benefits at <a href="https://www.mywelfare.ie" target="_blank" rel="noreferrer">mywelfare.ie</a>.</li>
          <li><strong>Department of Enterprise (DETE):</strong> Employment permits, Critical Skills Support Letters, and EPOS at <a href="https://enterprise.gov.ie" target="_blank" rel="noreferrer">enterprise.gov.ie</a>.</li>
        </ul>
      </section>`
  },

  journey: {
    path: '/journey',
    name: 'My Journey',
    title: 'My Irish Immigration Journey — Visa & Residency Tracker | Ask Ireland',
    description: 'Track your immigration stamps, reckonable residence countdown, tax milestones, and citizenship timeline in Ireland.',
    heading: 'My Irish Immigration Journey & Compliance Tracker',
    summary: 'Track immigration stamps, reckonable days, IRP renewal windows, and citizenship progress in private local browser storage.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'My Irish Immigration Journey Tracker',
          'description': 'Track Irish immigration permissions, stamp renewals, reckonable residence countdown, and citizenship timeline.',
          'url': 'https://ask-ireland.vercel.app/journey',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'All'
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://ask-ireland.vercel.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'My Journey',
              'item': 'https://ask-ireland.vercel.app/journey'
            }
          ]
        }
      ]
    },
    richHtml: `
      <section style="padding: 1.5rem; max-width: 860px; margin: 0 auto; line-height: 1.6;">
        <h2>Private Client-Side Journey Tracker</h2>
        <p>A private dashboard storing your immigration timeline locally on your device.</p>
        <ul>
          <li><strong>IRP Renewal Countdown:</strong> Monitors your permission expiry and alerts you when ISD's 12-week renewal window opens.</li>
          <li><strong>Month-21 Critical Skills Tracker:</strong> Notifies you when eligible for the DETE Stamp 4 letter.</li>
          <li><strong>150-Point Document Audit:</strong> Verifies Type A and Type B evidence across all reckonable years.</li>
          <li><strong>Privacy First:</strong> Zero server storage. Data remains in your local browser profile.</li>
        </ul>
      </section>`
  }
};

// 1. Pre-render HTML for all sub-routes
for (const [key, cfg] of Object.entries(ROUTES)) {
  const canonicalUrl = `https://ask-ireland.vercel.app${cfg.path}`;
  let html = baseHtml;

  // Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${cfg.title}</title>`);

  // Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${cfg.description}" />`
  );

  // Canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Open Graph
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${cfg.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${cfg.description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  // Twitter
  html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${cfg.title}" />`);
  html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${cfg.description}" />`);
  html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);

  // Inject route-specific Schema into <head>
  const schemaScript = `\n    <!-- Route Specific Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(cfg.schema, null, 2)}\n    </script>\n  </head>`;
  html = html.replace('</head>', schemaScript);

  // Inject rich semantic content into noscript so raw search engine crawlers index complete topical content
  const noscriptSnippet = `
      <noscript>
        <header style="padding: 2rem 1.5rem; max-width: 860px; margin: 0 auto;">
          <h1>${cfg.heading}</h1>
          <p style="font-size: 1.1rem; color: #444;">${cfg.summary}</p>
          <p><a href="/">← Return to Ask Ireland Home</a></p>
        </header>
        ${cfg.richHtml}
      </noscript>
    </div>`;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>\s*<\/div>/i, noscriptSnippet);

  // Write to dist/<route>/index.html
  const targetDir = path.join(distDir, key);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

  // Also write dist/<route>.html for clean URL direct resolution
  fs.writeFileSync(path.join(distDir, `${key}.html`), html, 'utf-8');

  console.log(`✓ Pre-rendered: ${cfg.path} -> dist/${key}/index.html & dist/${key}.html`);
}

// 2. Dynamically Generate Clean, Fresh sitemap.xml
const sitemapUrls = [
  { loc: 'https://ask-ireland.vercel.app/', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://ask-ireland.vercel.app/calculator', priority: '0.9', changefreq: 'weekly' },
  { loc: 'https://ask-ireland.vercel.app/emergency-tax', priority: '0.9', changefreq: 'weekly' },
  { loc: 'https://ask-ireland.vercel.app/scorecard', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://ask-ireland.vercel.app/letters', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://ask-ireland.vercel.app/updates', priority: '0.8', changefreq: 'daily' },
  { loc: 'https://ask-ireland.vercel.app/directory', priority: '0.7', changefreq: 'weekly' },
  { loc: 'https://ask-ireland.vercel.app/journey', priority: '0.7', changefreq: 'weekly' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
}
console.log(`✓ Updated sitemap.xml with lastmod date ${TODAY}`);

console.log('All static sub-route pages and sitemaps generated successfully.');
