import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const baseHtmlPath = path.join(distDir, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

const ROUTES = {
  calculator: {
    path: '/calculator',
    title: 'Irish Citizenship Calculator — 5-Year Statutory Residency Check | Ask Ireland',
    description: 'Calculate your reckonable days for Irish naturalisation. Checks the 5-year (1,825 days) statutory residency rule, continuous year, and Stamp 1/4 eligibility.',
    heading: 'Irish Citizenship Statutory Residency Calculator',
    summary: 'Audit your reckonable days, check the 1,825 days threshold, verify continuous year compliance, and review the 70-day travel allowance.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'Irish Citizenship Statutory Residency Calculator',
          'url': 'https://ask-ireland.vercel.app/calculator',
          'applicationCategory': 'GovernmentApplication',
          'operatingSystem': 'All',
          'description': 'Calculates reckonable days for Irish naturalisation under Department of Justice guidelines. Audits 5-year (1,825 days) statutory residence and 365-day continuous year.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'EUR'
          }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How many reckonable days are needed for Irish citizenship by naturalisation?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Standard naturalisation requires 1,825 reckonable days (5 years) within the past 8 years, including a full continuous year (365 reckonable days) immediately preceding the application.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Does Stamp 1 or Stamp 4 count as reckonable residence?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. Residence under Stamp 1 (Employment Permit), Stamp 4, and Stamp 3 (spouse of critical skills permit holder) is reckonable. Stamp 2 (student) and Stamp 1G (graduate scheme) are not reckonable.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is the 70-day travel allowance rule for Irish citizenship?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'The Department of Justice allows up to 70 days spent outside Ireland in the continuous year immediately prior to application for business or holidays. Absences exceeding 70 days may break continuous residence unless exceptional circumstances apply.'
              }
            }
          ]
        }
      ]
    }
  },
  'emergency-tax': {
    path: '/emergency-tax',
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
            }
          ]
        }
      ]
    }
  },
  scorecard: {
    path: '/scorecard',
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
              'text': 'For each of the required 5 years of reckonable residence, supply at least one Type A document (Employment Detail Summary/P60 worth 70 points) and supporting Type B documents (utility bills, lease agreements, bank statements) totaling at least 150 points per year.'
            }
          ]
        }
      ]
    }
  },
  letters: {
    path: '/letters',
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
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'When can a Critical Skills permit holder apply for a Stamp 4 support letter?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Holders of a Critical Skills Employment Permit (CSEP) can apply to the Department of Enterprise, Trade and Employment (DETE) for a Stamp 4 Support Letter after 21 months of continuous employment with their permit sponsor.'
              }
            }
          ]
        }
      ]
    }
  },
  updates: {
    path: '/updates',
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
          'dateModified': '2026-10-04'
        }
      ]
    }
  },
  directory: {
    path: '/directory',
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
        }
      ]
    }
  },
  journey: {
    path: '/journey',
    title: 'My Irish Immigration Journey — Visa & Residency Tracker | Ask Ireland',
    description: 'Track your immigration stamps, reckonable residence countdown, tax milestones, and citizenship timeline in Ireland.',
    heading: 'My Irish Immigration Journey & Compliance Tracker',
    summary: 'Track immigration stamps, reckonable days, IRP renewal windows, and citizenship progress.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'My Irish Immigration Journey Tracker',
          'description': 'Track Irish immigration permissions, stamp renewals, reckonable residence countdown, and citizenship timeline.',
          'url': 'https://ask-ireland.vercel.app/journey'
        }
      ]
    }
  }
};

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

  // Open Graph Title, Description, URL
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${cfg.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${cfg.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Twitter Title, Description, URL
  html = html.replace(
    /<meta property="twitter:title" content=".*?" \/>/i,
    `<meta property="twitter:title" content="${cfg.title}" />`
  );
  html = html.replace(
    /<meta property="twitter:description" content=".*?" \/>/i,
    `<meta property="twitter:description" content="${cfg.description}" />`
  );
  html = html.replace(
    /<meta property="twitter:url" content=".*?" \/>/i,
    `<meta property="twitter:url" content="${canonicalUrl}" />`
  );

  // Inject route-specific Schema into <head>
  const schemaScript = `\n    <!-- Route Specific Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(cfg.schema, null, 2)}\n    </script>\n  </head>`;
  html = html.replace('</head>', schemaScript);

  // Inject route-specific noscript fallback so raw crawlers index page content
  const noscriptSnippet = `
      <noscript>
        <header style="padding: 2rem; max-width: 800px; margin: 0 auto;">
          <h1>${cfg.heading}</h1>
          <p>${cfg.summary}</p>
          <p><a href="/">← Return to Ask Ireland Home</a></p>
        </header>
      </noscript>
    </div>`;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>\s*<\/div>/i, noscriptSnippet);

  // Write to dist/<route>/index.html
  const targetDir = path.join(distDir, key);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

  // Also write dist/<route>.html for clean URLs direct resolution
  fs.writeFileSync(path.join(distDir, `${key}.html`), html, 'utf-8');

  console.log(`✓ Pre-rendered: ${cfg.path} -> dist/${key}/index.html & dist/${key}.html`);
}

console.log('All static sub-route pages pre-rendered successfully.');
