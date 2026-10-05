import React, { useState } from 'react';
import { Mail, Copy, Check, Info } from 'lucide-react';

interface LetterTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  getSubject: (fields: Record<string, string>) => string;
  getBody: (fields: Record<string, string>) => string;
  requiredFields: { key: string; label: string; placeholder: string }[];
}

const TEMPLATES: LetterTemplate[] = [
  {
    id: 'csep-stamp4-hr',
    title: 'Request for 21-Month Stamp 4 Support Letter (To Employer)',
    category: 'Immigration & Career',
    description: 'Send this to your company HR or People team at month 21 on a Critical Skills permit to obtain the mandatory DETE employer letter.',
    requiredFields: [
      { key: 'employeeName', label: 'Your Full Name', placeholder: 'e.g. John Doe' },
      { key: 'permitNumber', label: 'Employment Permit Number', placeholder: 'e.g. EP-2023-XXXXX' },
      { key: 'startDate', label: 'CSEP Employment Start Date', placeholder: 'e.g. 15th January 2024' },
      { key: 'jobTitle', label: 'Your Job Title', placeholder: 'e.g. Senior Software Engineer' }
    ],
    getSubject: () => 'Request for Employer Support Letter for Stamp 4 Application (DETE EPOS)',
    getBody: (fields) => `Dear HR / People Operations Team,

I am writing regarding my ongoing employment under Critical Skills Employment Permit ${fields.permitNumber || '[Permit Number]'}, which commenced on ${fields.startDate || '[Start Date]'}.

As I have now completed 21 months of continuous employment in my role as ${fields.jobTitle || '[Job Title]'}, I am eligible under Department of Enterprise, Trade and Employment (DETE) regulations to apply for a Stamp 4 Support Letter.

To lodge my application on the DETE EPOS portal, I require a signed letter from the company on official letterhead confirming:
1. My full name, job title, and current gross annual salary.
2. My employment start date and current contract status (permanent / ongoing).
3. That the company intends to continue my employment in Ireland.

Could you please provide this signed letter at your earliest convenience? Once received, I will submit the request through EPOS.

Thank you for your assistance.

Kind regards,
${fields.employeeName || '[Your Full Name]'}
Employee ID: [If applicable]`
  },
  {
    id: 'rtb-landlord-request',
    title: 'Request for RTB Tenancy Registration Number (To Landlord)',
    category: 'Housing & Tax Rebate',
    description: 'Send this to your landlord or property agent to retrieve your RTB number to claim the €1,000 / €2,000 Rent Tax Credit on Revenue.',
    requiredFields: [
      { key: 'tenantName', label: 'Your Name', placeholder: 'e.g. Jane Smith' },
      { key: 'propertyAddress', label: 'Rental Property Address', placeholder: 'e.g. Apt 12, Grand Canal Dock, Dublin 2' },
      { key: 'leaseStart', label: 'Tenancy Start Date', placeholder: 'e.g. 1st September 2023' }
    ],
    getSubject: () => 'Request for RTB Registration Number for Revenue Rent Tax Credit',
    getBody: (fields) => `Dear Landlord / Property Manager,

I am currently preparing my annual tax return on Revenue myAccount to claim the statutory Rent Tax Credit for my tenancy at ${fields.propertyAddress || '[Property Address]'}.

Revenue requires tenants to provide the Residential Tenancies Board (RTB) Registration Number (usually formatted as 'RT-XXXX-XXXX' or 'RRN-XXXX-XXXX') associated with the registered tenancy.

Could you please provide the RTB registration confirmation number for this tenancy?

Thank you for your time and assistance.

Kind regards,
${fields.tenantName || '[Your Name]'}
Tenancy commenced: ${fields.leaseStart || '[Start Date]'}`
  },
  {
    id: 'host-ppsn-address-proof',
    title: 'Host Proof of Address Letter for PPSN (To DSP)',
    category: 'Newcomer Setup',
    description: 'Have your accommodation host, flatmate, or employer sign this letter if you live in temporary housing without a lease.',
    requiredFields: [
      { key: 'hostName', label: 'Host / Landlord Full Name', placeholder: 'e.g. Michael O\'Connor' },
      { key: 'applicantName', label: 'Newcomer Name (You)', placeholder: 'e.g. Taimoor Hassan' },
      { key: 'propertyAddress', label: 'Host Property Address', placeholder: 'e.g. 45 Rathmines Road, Dublin 6' },
      { key: 'arrivalDate', label: 'Date of Arrival', placeholder: 'e.g. 10th October 2026' }
    ],
    getSubject: () => 'Confirmation of Residential Address for PPSN Application',
    getBody: (fields) => `To: Department of Social Protection (DSP)
PPS Number Allocation Centre

Subject: Confirmation of Residential Accommodation for ${fields.applicantName || '[Applicant Name]'}

To Whom It May Concern,

I, ${fields.hostName || '[Host Full Name]'}, am the owner / primary registered tenant of the property located at:
${fields.propertyAddress || '[Full Address in Ireland]'}

I hereby confirm that ${fields.applicantName || '[Applicant Name]'} (Passport Number: [Passport Number]) has been residing with me at this address since ${fields.arrivalDate || '[Arrival Date]'}.

I am providing this letter alongside a recent utility bill in my name to serve as valid proof of address for their Personal Public Service (PPS) Number application.

Should you require any further verification, please do not hesitate to contact me.

Yours faithfully,

_____________________________
${fields.hostName || '[Host Full Name]'}
Contact Phone: [Host Phone Number]
Email: [Host Email]
Date: [Today's Date]`
  }
];

export const LetterTemplates: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(TEMPLATES[0].id);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const activeTemplate = TEMPLATES.find(t => t.id === selectedId) || TEMPLATES[0];

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const subject = activeTemplate.getSubject(fieldValues);
  const body = activeTemplate.getBody(fieldValues);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 sm:pb-5 dark:border-stone-800">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <Mail className="size-5 sm:size-6 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Bureaucracy Letter Generator
          </h2>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Pre-formatted formal correspondence for Irish institutions, employers, and landlords. 
          Fill in your details and copy a customized email ready to send.
        </p>
      </div>

      {/* Drafting Aid Notice */}
      <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50/80 p-3.5 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300">
        <div className="flex items-start gap-2.5">
          <Info className="size-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-stone-800 dark:text-stone-200">Administrative drafting aid</p>
            <p className="mt-0.5 leading-relaxed">
              These templates are drafting aids for common administrative requests. Review and edit before sending. They are not legal pleadings, legal notices, or solicitor-drafted correspondence.
            </p>
          </div>
        </div>
      </div>

      {/* Template Selectors */}
      <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => {
              setSelectedId(tmpl.id);
              setFieldValues({});
            }}
            className={`rounded-xl border p-3.5 text-left transition ${
              selectedId === tmpl.id
                ? 'border-[#0B4D3C] bg-white ring-2 ring-[#0B4D3C]/20 shadow-xs dark:border-emerald-500 dark:bg-stone-900'
                : 'border-[#E6E1D4] bg-[#FAF8F5] hover:bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B4D3C] dark:text-emerald-400">
              {tmpl.category}
            </span>
            <h3 className="mt-1 text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-2">
              {tmpl.title}
            </h3>
          </button>
        ))}
      </div>

      {/* Editor & Preview Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        
        {/* Input Customizer (5 cols) */}
        <div className="rounded-2xl border border-[#E6E1D4] bg-white p-5 shadow-2xs lg:col-span-5 dark:border-stone-800 dark:bg-stone-900">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Customize Letter Details
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            Fill these fields to dynamically populate the letter on the right.
          </p>

          <div className="mt-4 space-y-3">
            {activeTemplate.requiredFields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={fieldValues[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E6E1D4] bg-[#FAF8F5] px-2.5 py-1.5 text-xs text-stone-900 outline-none focus:border-[#0B4D3C] focus:bg-white focus:ring-1 focus:ring-[#0B4D3C]/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Generated Email Preview (7 cols) */}
        <div className="rounded-2xl border border-[#E6E1D4] bg-white p-5 shadow-2xs lg:col-span-7 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4D3C] dark:text-emerald-400">
              Formatted Ready-to-Send Email
            </span>
            <button
              onClick={handleCopyFull}
              className="flex items-center gap-1.5 rounded-lg bg-[#0B4D3C] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#0E634E] transition"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Full Email'}</span>
            </button>
          </div>

          <div className="mt-3">
            <div className="rounded-lg bg-stone-100 p-2.5 text-xs font-semibold text-stone-800 dark:bg-stone-800 dark:text-stone-200">
              <span className="text-stone-400 font-normal">Subject: </span>
              {subject}
            </div>

            <pre className="mt-3 max-h-[380px] overflow-y-auto whitespace-pre-wrap rounded-xl bg-stone-50 p-4 text-xs font-mono text-stone-800 dark:bg-stone-950 dark:text-stone-300 border border-stone-100 dark:border-stone-800">
              {body}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
};
