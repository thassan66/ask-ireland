import React from 'react';
import { Clock, ShieldCheck } from 'lucide-react';
import { YearAudit } from '../utils/citizenshipEngine';

interface YearlySegmentBatteryProps {
  yearlyBreakdown: YearAudit[];
  isContinuousYearValid: boolean;
  route: 'standard' | 'spouse';
  variant?: 'pine' | 'light';
}

export const YearlySegmentBattery: React.FC<YearlySegmentBatteryProps> = ({
  yearlyBreakdown,
  isContinuousYearValid,
  route,
  variant = 'pine'
}) => {
  const totalYears = route === 'spouse' ? 3 : 5;
  const isPine = variant === 'pine';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className={`flex items-center gap-1.5 text-xs font-bold ${
          isPine ? 'text-emerald-200' : 'text-stone-800 dark:text-stone-200'
        }`}>
          <ShieldCheck className={`size-3.5 ${isPine ? 'text-emerald-300' : 'text-[#0B4D3C] dark:text-emerald-400'}`} />
          <span>Statutory Year-by-Year Residence Battery</span>
        </div>
        <span className={`text-[11px] font-semibold ${
          isPine ? 'text-emerald-100/80' : 'text-stone-500 dark:text-stone-400'
        }`}>
          {totalYears} Statutory 365-Day Blocks
        </span>
      </div>

      <div className={`grid grid-cols-1 ${route === 'spouse' ? 'sm:grid-cols-3' : 'sm:grid-cols-5'} gap-2`}>
        {yearlyBreakdown.map((year) => {
          const isComplete = year.reckonableDays >= 365;
          const isPartial = year.reckonableDays > 0 && year.reckonableDays < 365;
          const isFinalYear = year.yearNumber === totalYears;
          const pct = Math.min(100, Math.round((year.reckonableDays / 365) * 100));

          let borderColor = isPine ? 'border-white/15 bg-white/5' : 'border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-800/40';
          let textColor = isPine ? 'text-emerald-100' : 'text-stone-700 dark:text-stone-300';
          let numberColor = isPine ? 'text-white' : 'text-stone-900 dark:text-stone-100';
          let badgeText = `${year.reckonableDays}/365d`;
          let badgeColor = isPine ? 'bg-white/10 text-white' : 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-300';
          let barColor = isPine ? 'bg-transparent' : 'bg-transparent';

          if (isFinalYear) {
            if (!isContinuousYearValid) {
              borderColor = isPine ? 'border-red-400/50 bg-red-950/40' : 'border-red-300 bg-red-50 text-red-950 dark:border-red-900/60 dark:bg-red-950/30';
              textColor = isPine ? 'text-red-200' : 'text-red-900 dark:text-red-200';
              badgeText = '70d Limit Warning';
              badgeColor = 'bg-red-500/80 text-white';
              barColor = 'bg-red-500';
            } else if (isComplete) {
              borderColor = isPine ? 'border-emerald-300/40 bg-emerald-900/30' : 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20';
              badgeText = '✓ Year Complete';
              badgeColor = isPine ? 'bg-emerald-400/90 text-[#022019]' : 'bg-emerald-100 text-[#0B4D3C] dark:bg-emerald-900 dark:text-emerald-200';
              barColor = isPine ? 'bg-emerald-300' : 'bg-[#0B4D3C] dark:bg-emerald-400';
            } else {
              borderColor = isPine ? 'border-amber-300/40 bg-amber-950/30' : 'border-amber-300 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20';
              badgeColor = isPine ? 'bg-amber-400/90 text-amber-950' : 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200';
              barColor = isPine ? 'bg-[#E5C158]' : 'bg-amber-500';
            }
          } else if (isComplete) {
            borderColor = isPine ? 'border-emerald-300/30 bg-emerald-900/25' : 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20';
            badgeText = '✓ 365d Complete';
            badgeColor = isPine ? 'bg-emerald-400/90 text-[#022019]' : 'bg-emerald-100 text-[#0B4D3C] dark:bg-emerald-900 dark:text-emerald-200';
            barColor = isPine ? 'bg-emerald-300' : 'bg-[#0B4D3C] dark:bg-emerald-400';
          } else if (isPartial) {
            borderColor = isPine ? 'border-amber-300/30 bg-amber-950/20' : 'border-amber-300 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20';
            badgeColor = isPine ? 'bg-amber-300/90 text-amber-950' : 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200';
            barColor = isPine ? 'bg-[#E5C158]' : 'bg-amber-500';
          }

          return (
            <div 
              key={year.yearNumber} 
              className={`rounded-xl border p-2.5 backdrop-blur-xs transition flex flex-col justify-between ${borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 text-[11px] font-bold">
                  <span className={textColor}>
                    {isFinalYear ? `Year ${year.yearNumber} (Final)` : `Year ${year.yearNumber}`}
                  </span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full font-tabular ${badgeColor}`}>
                    {badgeText}
                  </span>
                </div>

                <div className="mt-1.5 flex items-baseline justify-between text-xs">
                  <span className={`font-extrabold font-tabular text-sm ${numberColor}`}>
                    {year.reckonableDays} <span className={`text-[11px] font-normal ${isPine ? 'text-emerald-200/70' : 'text-stone-500'}`}>/ 365d</span>
                  </span>
                  <span className={`text-[10px] font-semibold font-tabular ${isPine ? 'text-emerald-200/80' : 'text-stone-500'}`}>
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Segment Mini-Bar */}
              <div className={`mt-2 h-1.5 w-full overflow-hidden rounded-full ${isPine ? 'bg-black/40' : 'bg-stone-200 dark:bg-stone-700'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {isFinalYear && (
                <div className={`mt-1.5 text-[9px] font-medium leading-tight flex items-center gap-1 ${
                  isPine ? 'text-emerald-200/90' : 'text-stone-500 dark:text-stone-400'
                }`}>
                  <Clock className="size-2.5 shrink-0" />
                  <span>365d continuous requirement</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
