import React from 'react';
import {
  Camera,
  Search,
  FileCheck2,
  ShieldAlert,
  Box,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useExport } from '../store/exportStore';
import { ExportStep } from '../types';
import { translations } from '../utils/translations';

const STEP_ICONS = [
  Camera,
  Search,
  FileCheck2,
  ShieldAlert,
  Box,
  Truck,
  CheckCircle2
];

export const StepIndicator: React.FC = () => {
  const { currentStep, setCurrentStep, language } = useExport();
  const t = translations[language];

  const stepLabels = [
    t.step1,
    t.step2,
    t.step3,
    t.step4,
    t.step5,
    t.step6,
    t.step7
  ];

  return (
    <div className="w-full bg-dak-navy-900/60 backdrop-blur-md border-b border-slate-800/80 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {stepLabels.map((label, index) => {
            const stepNum = (index + 1) as ExportStep;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            const Icon = STEP_ICONS[index];

            return (
              <button
                key={stepNum}
                onClick={() => setCurrentStep(stepNum)}
                className={`relative flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-b from-dak-saffron-500/20 to-dak-saffron-500/5 border border-dak-saffron-500/40 shadow-lg shadow-dak-saffron-500/10'
                    : isCompleted
                    ? 'bg-emerald-950/20 border border-emerald-800/30 hover:bg-emerald-950/40'
                    : 'bg-slate-900/40 border border-slate-800/40 hover:bg-slate-850 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Step Indicator Pill & Icon */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-transform duration-300 ${
                    isCurrent
                      ? 'bg-dak-saffron-500 text-white scale-110 shadow-md shadow-dak-saffron-500/40'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                {/* Step Text Label */}
                <span
                  className={`mt-2 text-[10px] sm:text-xs font-bold text-center truncate max-w-full ${
                    isCurrent
                      ? 'text-dak-saffron-400'
                      : isCompleted
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {label}
                </span>

                {/* Bottom Active Glow Bar */}
                {isCurrent && (
                  <div className="absolute -bottom-1 w-8 sm:w-12 h-1 bg-dak-saffron-500 rounded-full shadow-sm shadow-dak-saffron-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
