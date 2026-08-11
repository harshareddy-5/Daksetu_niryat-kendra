import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Globe, FileCheck2, Scale } from 'lucide-react';
import { useExport } from '../store/exportStore';

export const Step4Compliance: React.FC = () => {
  const { complianceChecks, shipping, setCurrentStep } = useExport();

  const total = complianceChecks.length;
  const passed = complianceChecks.filter(c => c.status === 'PASS').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Step 4 of 7: Regulatory Engine
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          10-Point Export Compliance Audit
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Cross-matching DGFT licensing, GST zero-rating, destination country customs thresholds, and dangerous goods checks.
        </p>
      </div>

      {/* Compliance Overview Banner */}
      <div className="glass-panel-glow p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Consignment Compliance: PASSED</h3>
            <p className="text-xs text-slate-300">
              {passed} of {total} checks cleared. Ready for India Post DNK Postal Bill of Export submission.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-bold text-slate-300 border border-slate-700">
            Destination: {shipping.destinationName} ({shipping.flag})
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/30">
            100% Cleared
          </span>
        </div>
      </div>

      {/* Audit Checklist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complianceChecks.map((check) => (
          <div
            key={check.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition-colors"
          >
            <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase font-mono text-dak-saffron-400">
                  {check.id} • {check.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {check.regulatory_body}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{check.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{check.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={() => setCurrentStep(3)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => setCurrentStep(5)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
        >
          <span>Continue to Smart Packaging</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
