import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Award, 
  AlertTriangle 
} from 'lucide-react';
import { StampPeriod } from '../types';

interface PassportStampBadgeProps {
  stampType: StampPeriod['stampType'] | string;
  size?: 'sm' | 'md';
  showDetails?: boolean;
}

interface StampMeta {
  title: string;
  subtitle: string;
  reckonableTag: 'Reckonable' | 'Non-Reckonable' | 'Conditional';
  icon: React.ComponentType<{ className?: string }>;
  containerClass: string;
  badgeClass: string;
}

const STAMP_CONFIG: Record<string, StampMeta> = {
  'Stamp 4': {
    title: 'Stamp 4',
    subtitle: 'Permanent / CSEP Upgrade',
    reckonableTag: 'Reckonable',
    icon: ShieldCheck,
    containerClass: 'border-emerald-600/30 bg-emerald-50/80 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-100',
    badgeClass: 'bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
  },
  'Stamp 1': {
    title: 'Stamp 1',
    subtitle: 'Employment Permit (DETE)',
    reckonableTag: 'Reckonable',
    icon: Briefcase,
    containerClass: 'border-sky-600/30 bg-sky-50/80 text-sky-950 dark:border-sky-700 dark:bg-sky-950/50 dark:text-sky-100',
    badgeClass: 'bg-sky-200/80 text-sky-900 dark:bg-sky-900 dark:text-sky-200'
  },
  'Stamp 1G': {
    title: 'Stamp 1G',
    subtitle: 'Graduate Scheme / Spousal',
    reckonableTag: 'Conditional',
    icon: GraduationCap,
    containerClass: 'border-teal-600/30 bg-teal-50/80 text-teal-950 dark:border-teal-700 dark:bg-teal-950/50 dark:text-teal-100',
    badgeClass: 'bg-teal-200/80 text-teal-900 dark:bg-teal-900 dark:text-teal-200'
  },
  'Stamp 3': {
    title: 'Stamp 3',
    subtitle: 'Dependant / Volunteer',
    reckonableTag: 'Reckonable',
    icon: Users,
    containerClass: 'border-indigo-600/30 bg-indigo-50/80 text-indigo-950 dark:border-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-100',
    badgeClass: 'bg-indigo-200/80 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200'
  },
  'Stamp 5': {
    title: 'Stamp 5',
    subtitle: 'Without Condition as to Time',
    reckonableTag: 'Reckonable',
    icon: Award,
    containerClass: 'border-amber-600/30 bg-amber-50/80 text-amber-950 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-100',
    badgeClass: 'bg-amber-200/80 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
  },
  'Stamp 2': {
    title: 'Stamp 2',
    subtitle: 'Student (Section 16A Excluded)',
    reckonableTag: 'Non-Reckonable',
    icon: AlertTriangle,
    containerClass: 'border-amber-500/40 bg-amber-100/70 text-amber-950 dark:border-amber-700 dark:bg-amber-950/80 dark:text-amber-100',
    badgeClass: 'bg-amber-300/80 text-amber-950 dark:bg-amber-900 dark:text-amber-200'
  }
};

export const PassportStampBadge: React.FC<PassportStampBadgeProps> = ({ 
  stampType, 
  size = 'md', 
  showDetails = false 
}) => {
  const meta = STAMP_CONFIG[stampType] || STAMP_CONFIG['Stamp 4'];
  const IconComponent = meta.icon;

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs font-bold shadow-2xs ${meta.containerClass}`}>
        <IconComponent className="size-3.5 shrink-0" />
        <span>{meta.title}</span>
        <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${meta.badgeClass}`}>
          {meta.reckonableTag}
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-xl border p-2 shadow-2xs transition ${meta.containerClass}`}>
      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/70 dark:bg-black/30 shadow-2xs">
        <IconComponent className="size-4 shrink-0" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xs tracking-tight">{meta.title}</span>
          <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded ${meta.badgeClass}`}>
            {meta.reckonableTag}
          </span>
        </div>
        {showDetails && (
          <p className="text-[10px] font-medium opacity-85 leading-tight mt-0.5">
            {meta.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
