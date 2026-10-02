import React from 'react';
import { ExternalLink, Building, CheckCircle } from 'lucide-react';
import { OFFICIAL_GOV_SERVICES } from '../data/govServices';

export const DirectoryGrid: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
      
      {/* Title */}
      <div className="border-b border-stone-200 pb-4 sm:pb-5 dark:border-stone-800">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Official Government Portals Directory
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Direct access to the authenticated portals of the Government of Ireland, Department of Justice, Revenue, and DSP.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFICIAL_GOV_SERVICES.map((service) => (
          <a
            key={service.id}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-emerald-600 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <Building className="size-3.5" />
                  {service.category}
                </span>
                <span className="flex items-center gap-1 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  <CheckCircle className="size-2.5 text-emerald-600" />
                  Verified
                </span>
              </div>

              <h3 className="mt-2 text-base font-bold text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                {service.label}
              </h3>
              
              <p className="text-[11px] font-medium italic text-stone-400">
                {service.irishLabel}
              </p>

              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                {service.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-400">
              <span className="truncate">{service.agency}</span>
              <ExternalLink className="size-3.5 shrink-0 text-stone-400 group-hover:text-emerald-600" />
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};
