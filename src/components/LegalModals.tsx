import React from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 dark:text-stone-100">
        
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <Lock className="size-5 shrink-0" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
              Privacy & Local Storage Notice
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              1. Local-Only Processing (No Remote Database)
            </h3>
            <p className="mt-1">
              Ask Ireland operates as a client-side web application. When you enter dates, immigration stamps, absences, or document checklists, that information is processed solely within your browser’s local memory (<code className="rounded bg-stone-100 px-1 py-0.5 dark:bg-stone-800">localStorage</code>). 
              No personal data is transmitted to, stored on, or accessible by our servers.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              2. What Is Stored Locally
            </h3>
            <p className="mt-1">
              Under key <code className="rounded bg-stone-100 px-1 py-0.5 dark:bg-stone-800">ask_ireland_journey_v1</code>, your browser saves:
            </p>
            <ul className="mt-1 list-disc pl-5 space-y-1">
              <li>Selected stamp category and expiry dates.</li>
              <li>Stamps and absence dates you add to the calculator.</li>
              <li>Document checkboxes you select in the 150-point scorecard.</li>
            </ul>
            <p className="mt-1">
              This data exists strictly to prevent you from having to re-enter your dates every time you refresh the page.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              3. No Tracking, No Cookies, No Third-Party Analytics
            </h3>
            <p className="mt-1">
              We do not use tracking cookies, Google Analytics, Meta Pixels, session recording software, or advertising identifiers. We do not maintain user accounts or collect email addresses.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              4. You Control Your Data
            </h3>
            <p className="mt-1">
              You can export a complete copy of your local data at any time via <strong>Backup JSON</strong>. You can completely erase your data by clicking <strong>Wipe Local Data</strong> in the Journey tab or by clearing your browser site data.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="font-bold text-stone-800 dark:text-stone-200">Shared Computer Warning: </span>
            If you are using a shared or public computer, always click <strong>Wipe Local Data</strong> before leaving to prevent other users of that browser profile from seeing your logged travel dates.
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-stone-100 pt-4 dark:border-stone-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900 dark:text-stone-100">
        
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <AlertTriangle className="size-5 shrink-0 text-amber-600" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
              Terms of Use & Legal Boundaries
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              1. Not Legal Advice (Legal Services Regulation Act 2015)
            </h3>
            <p className="mt-1">
              Ask Ireland is an independent civic knowledge and date-counting preparation utility. It does not provide legal advice, legal representation, or formal immigration casework. Using this website does not create a solicitor-client relationship.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              2. Absolute Ministerial Discretion
            </h3>
            <p className="mt-1">
              Under Section 15 of the <em>Irish Nationality and Citizenship Act 1956</em> (as amended), naturalisation is granted at the <strong>absolute discretion of the Minister for Justice</strong>. 
              Reaching 1,825 reckonable days or 150 scorecard points does not guarantee naturalisation. The Minister evaluates good character, public order, and individual circumstances on a case-by-case basis.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              3. Independent Project — No Official Affiliation
            </h3>
            <p className="mt-1">
              Ask Ireland is not affiliated with, endorsed by, or operated by the Government of Ireland, Immigration Service Delivery (ISD), the Department of Justice, the Department of Enterprise (DETE), or Revenue. 
              Official statutes published on <a href="https://www.irishstatutebook.ie" target="_blank" rel="noreferrer" className="underline font-medium text-emerald-700 dark:text-emerald-400">irishstatutebook.ie</a> and guidelines on <a href="https://www.gov.ie" target="_blank" rel="noreferrer" className="underline font-medium text-emerald-700 dark:text-emerald-400">gov.ie</a> take legal precedence over all calculations and summaries provided here.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              4. Drafting Templates
            </h3>
            <p className="mt-1">
              Correspondence generated by the Bureaucracy Letter Drafter are standard administrative templates. They are not legal pleadings or formal legal notices. You must review and adapt all generated text before sending.
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
            <span className="font-bold">Need Legal Advice? </span>
            If you face an adverse decision, a deportation order, complex gaps, or a criminal record inquiry, consult a practicing solicitor registered with the Law Society of Ireland.
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-stone-100 pt-4 dark:border-stone-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
          >
            I Accept
          </button>
        </div>

      </div>
    </div>
  );
};
