import React from 'react';
import { Box, Layers, ShieldAlert, ArrowRight, ArrowLeft, Sliders, CheckCircle2, Sparkles } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { Box3DVisualizer } from '../components/Box3DVisualizer';

export const Step5Packaging: React.FC = () => {
  const { packaging, setPackaging, setCurrentStep } = useExport();

  const updateDimension = (key: 'lengthCm' | 'widthCm' | 'heightCm' | 'actualWeightKg', value: number) => {
    const l = key === 'lengthCm' ? value : packaging.lengthCm;
    const w = key === 'widthCm' ? value : packaging.widthCm;
    const h = key === 'heightCm' ? value : packaging.heightCm;
    const wt = key === 'actualWeightKg' ? value : packaging.actualWeightKg;

    const vol = Math.round(((l * w * h) / 5000) * 100) / 100;
    const chg = Math.max(wt, vol);
    const girth = l + 2 * (w + h);

    setPackaging(prev => ({
      ...prev,
      [key]: value,
      volumetricWeightKg: vol,
      chargeableWeightKg: chg,
      actualCombinedGirthCm: girth,
      fitsEmsLimits: l <= 150 && girth <= 300 && wt <= 30
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Step 5 of 7: Packaging & Volumetric Safety
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          AI Smart Packaging & Postal Limits Advisor
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Volumetric weight calculation, cushioning recommendations, and India Post EMS dimension compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Dimension Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-dak-saffron-400" />
                <span>Parcel Dimensions & Weight</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Live Recalculation</span>
            </div>

            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Length (L)</span>
                <span className="text-dak-saffron-400 font-mono">{packaging.lengthCm} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={packaging.lengthCm}
                onChange={(e) => updateDimension('lengthCm', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-dak-saffron-500"
              />
            </div>

            {/* Width Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Width (W)</span>
                <span className="text-dak-saffron-400 font-mono">{packaging.widthCm} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={packaging.widthCm}
                onChange={(e) => updateDimension('widthCm', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-dak-saffron-500"
              />
            </div>

            {/* Height Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Height (H)</span>
                <span className="text-dak-saffron-400 font-mono">{packaging.heightCm} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={packaging.heightCm}
                onChange={(e) => updateDimension('heightCm', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-dak-saffron-500"
              />
            </div>

            {/* Actual Weight Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Physical Scale Weight</span>
                <span className="text-emerald-400 font-mono">{packaging.actualWeightKg} kg</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="25"
                step="0.05"
                value={packaging.actualWeightKg}
                onChange={(e) => updateDimension('actualWeightKg', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Recommended Packaging Advice */}
            <div className="p-4 rounded-2xl bg-dak-navy-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-dak-saffron-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Recommended Packing:</span>
              </span>
              <p className="text-xs font-bold text-white">{packaging.recommendedBoxType}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{packaging.cushioningAdvice}</p>
            </div>

          </div>
        </div>

        {/* Right Column: 3D Box Simulation Visualizer */}
        <div className="lg:col-span-6 space-y-4">
          <Box3DVisualizer pkg={packaging} />

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
            >
              <span>Continue to Shipping Rates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
