import React, { useState } from 'react';
import { ShieldCheck, Heart, Lock, FileText, ExternalLink } from 'lucide-react';
import { PrivacyModal, TermsModal } from './LegalModals';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer className="mt-16 border-t border-stone-200 bg-white py-10 pb-24 sm:pb-10 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          {/* Top bar: Disclaimers and Independence */}
          <div className="flex flex-col items-center justify-between gap-4 border-b border-stone-100 pb-8 text-center sm:flex-row sm:text-left dark:border-stone-800">
            <div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Independent Civic Project
                </span>
              </div>
              <p className="mt-1 max-w-xl text-xs text-stone-500 dark:text-stone-400">
                Not affiliated with, endorsed by, or operated by the Government of Ireland, the Department of Justice, or Revenue. 
                Information is curated from public sector records under EU Open Data regulations.
              </p>
            </div>

            {/* Privacy & Legal Policy Links */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="flex items-center gap-1 text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 transition"
              >
                <Lock className="size-3.5" />
                <span>Privacy & Local Storage</span>
              </button>

              <button
                onClick={() => setTermsOpen(true)}
                className="flex items-center gap-1 text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 transition"
              >
                <FileText className="size-3.5" />
                <span>Terms of Use</span>
              </button>

              <a
                href="https://github.com/thassan66/ask-ireland"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
              >
                <span>GitHub</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-6 text-center text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
            <p>
              <strong>Legal Notice:</strong> This website provides general public information and mathematical date calculations only. 
              It does not constitute legal advice under the Legal Services Regulation Act 2015. 
              Official English statutory text on gov.ie and irishstatutebook.ie prevails in all matters.
            </p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Built with <Heart className="size-3 text-red-500 inline" /> for newcomers and residents in Ireland · Open Source
            </p>
          </div>

        </div>
      </footer>

      {/* Policy Modals */}
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};
