import React from 'react';
import { Award, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  score: number;
  grade: string;
}

export const ScoreGauge: React.FC<Props> = ({ score, grade }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 90) return '#10B981'; // Emerald
    if (val >= 75) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const strokeColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-panel-glow rounded-3xl border border-slate-800 relative">
      
      {/* Gauge SVG */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#1E293B"
            strokeWidth="12"
            fill="transparent"
          />

          {/* Animated Progress Bar */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>

        {/* Center Score Label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-black tracking-tight text-white">
            {score}
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            Out of 100
          </span>
        </div>
      </div>

      {/* Grade Badge */}
      <div className="mt-4 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-sm flex items-center gap-2">
        <Award className="w-4 h-4" />
        <span>{grade}</span>
      </div>

      {/* Readiness Description */}
      <p className="mt-2 text-xs text-slate-300 text-center max-w-xs font-medium">
        All mandatory India Post DNK Customs, DGFT IEC validation, and safety compliance checks cleared.
      </p>

    </div>
  );
};
