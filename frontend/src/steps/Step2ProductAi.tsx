import React from 'react';
import { Search, CheckCircle2, Info, ArrowRight, ArrowLeft, Percent, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { HsCodeCandidate } from '../types';

export const Step2ProductAi: React.FC = () => {
  const { product, selectHsCode, setCurrentStep } = useExport();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Step 2 of 7: Intelligent Classification
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          AI Product Identification & HS Code Engine
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Harmonized System (ITC-HS) codes suggested via multimodal neural classification with export incentive and duty drawback mapping.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Detected Attributes & Materials */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex items-center gap-3">
              <img
                src={product.photoPreview || ''}
                alt={product.productTitle}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md"
              />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-dak-saffron-400">
                  {product.stateOrigin} Geographical Indication
                </span>
                <h3 className="text-base font-bold text-white leading-tight">
                  {product.productTitle}
                </h3>
                <span className="text-xs text-slate-400">{product.category}</span>
              </div>
            </div>

            {/* Materials Detected */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Detected Material Composition:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.materialsDetected.map((mat, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Explainability Reasoning */}
            <div className="p-4 rounded-2xl bg-dak-navy-950/80 border border-dak-saffron-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-dak-saffron-400">
                <Info className="w-4 h-4" />
                <span>AI Classification Reasoning:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.explanation}
              </p>
            </div>

            {/* Export Incentive Highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-800/40">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">RoDTEP Rebate</span>
                <p className="text-base font-black text-emerald-300">
                  {product.selectedHsCode?.rodtep_rate || 2.5}%
                </p>
                <span className="text-[10px] text-slate-400">Direct Exporter Credit</span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-800/40">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Export Customs Duty</span>
                <p className="text-base font-black text-amber-300">0.0% (Free)</p>
                <span className="text-[10px] text-slate-400">India Post DNK Route</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: HS Code Candidates Selector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-dak-saffron-400" />
                <span>Ranked HS Code Suggestions</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">ITC-HS 2022</span>
            </div>

            <div className="space-y-3">
              {product.hsCandidates.map((cand) => {
                const isSelected = product.selectedHsCode?.hs_code === cand.hs_code;
                return (
                  <div
                    key={cand.hs_code}
                    onClick={() => selectHsCode(cand)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-dak-saffron-500/15 border-dak-saffron-500 shadow-lg shadow-dak-saffron-500/20'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-dak-saffron-500 text-white font-mono font-black text-sm">
                            {cand.hs_code}
                          </span>
                          <span className="text-xs font-extrabold text-emerald-400">
                            {Math.round(cand.confidence * 100)}% Match
                          </span>
                        </div>
                        <h4 className="mt-1 text-sm font-bold text-white">{cand.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cand.description}</p>
                      </div>

                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-dak-saffron-500 text-white flex items-center justify-center shadow">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
                        )}
                      </div>
                    </div>

                    {/* Duty & Policy Footer */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Chapter: {cand.chapter} | Heading: {cand.heading}</span>
                      <span className="text-emerald-400 font-bold">RoDTEP: {cand.rodtep_rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
              >
                <span>Continue to Document OCR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
