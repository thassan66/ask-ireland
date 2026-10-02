import React, { useState } from 'react';
import { FileText, Copy, Check, ExternalLink } from 'lucide-react';

export const EmergencyTaxGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const emailTemplate = `Subject: Urgent: Request for Employer Tax Registration Number (TRN) for Revenue myAccount

Hi Payroll / HR Team,

I recently started my employment with the company and am setting up my tax profile on Revenue myAccount to ensure my Tax Credit Certificate (RPN) is issued and avoid Emergency Tax deductions.

Could you please provide the company's 8-character Employer Tax Registration Number (TRN)?

Once received, I will link my employment immediately on Revenue myAccount.

Thank you,
[Your Name]
PPSN: [Your PPSN]`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Title */}
      <div className="border-b border-stone-200 pb-5 dark:border-stone-800">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <FileText className="size-6" />
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Emergency Tax Unblocker & Refund Guide
          </h2>
        </div>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Why your first Irish paycheck suffered heavy deductions, and the exact steps to trigger an automatic payroll refund.
        </p>
      </div>

      {/* The Mechanics */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-950/60 dark:bg-red-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
            What Is Happening
          </span>
          <h3 className="mt-1 text-base font-bold text-red-950 dark:text-red-200">
            Taxed on the "Emergency Basis"
          </h3>
          <p className="mt-2 text-sm text-red-900/80 dark:text-red-300">
            When you start a new job in Ireland, Revenue does not automatically know who your employer is. 
            Until you tell Revenue, your employer is legally mandated to deduct <strong>40% PAYE + 8% USC</strong> with zero tax credits.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-950/60 dark:bg-emerald-950/20">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            The Good News
          </span>
          <h3 className="mt-1 text-base font-bold text-emerald-950 dark:text-emerald-200">
            The Money is Not Lost
          </h3>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            Ireland operates on a <em>cumulative tax basis</em>. As soon as your employer receives your Revenue Payroll Notification (RPN), 
            the payroll software recalculates your tax from day 1 and <strong>automatically refunds the overpaid tax in your next paycheck</strong>.
          </p>
        </div>
      </div>

      {/* 4-Step Resolution Roadmap */}
      <div className="mt-8">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
          How to Stop It in 4 Steps
        </h3>

        <div className="mt-4 space-y-4">
          <div className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Get your Employer's TRN (Tax Registration Number)
              </h4>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                Ask your HR or payroll department for their 8-character number (e.g. 1234567T). 
                You can use the copy-paste email template below.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Log into Revenue myAccount
              </h4>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                Visit revenue.ie and log into myAccount using your PPSN and password.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Add New Job under PAYE Services
              </h4>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                Under the "PAYE Services" card, click "Add Job or Pension". Enter your start date and the employer TRN.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Revenue automatically sends the RPN to your employer
              </h4>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                You do not need to deliver anything to HR manually. Revenue pushes your Tax Credit Certificate electronically to your employer's payroll system within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copy-Paste Template */}
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Copy-Paste Template for Your Employer
          </span>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Email'}</span>
          </button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-stone-50 p-4 text-xs font-mono text-stone-800 dark:bg-stone-950 dark:text-stone-200">
          {emailTemplate}
        </pre>
      </div>

      {/* Direct Outbound */}
      <div className="mt-6 flex justify-end">
        <a
          href="https://www.revenue.ie/en/online-services/services/myaccount/index.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 sm:py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800"
        >
          <span>Open Revenue myAccount</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

    </div>
  );
};
