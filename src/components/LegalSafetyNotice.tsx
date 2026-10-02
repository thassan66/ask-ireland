import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface LegalSafetyNoticeProps {
  compact?: boolean;
}

export const LegalSafetyNotice: React.FC<LegalSafetyNoticeProps> = ({ compact = false }) => {
  return (
    <div className={`rounded-xl border border-amber-200 bg-amber-50/80 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200 ${
      compact ? 'p-3 text-xs' : 'p-4 text-sm'
    }`}>
      <div className="flex items-start gap-2.5">
        <ShieldAlert className={`${compact ? 'size-4' : 'size-5'} mt-0.5 shrink-0 text-amber-600 dark:text-amber-400`} />
        <div>
          <p className="font-bold">General information, not legal advice</p>
          <p className="mt-1 leading-relaxed">
            Ask Ireland helps you understand public rules, prepare documents, and check dates against official sources. It does not assess your individual legal position, replace a solicitor, or guarantee an application outcome.
          </p>
        </div>
      </div>
    </div>
  );
};
