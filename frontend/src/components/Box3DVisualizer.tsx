import React from 'react';
import { Box, Layers, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PackagingState } from '../types';

interface Props {
  pkg: PackagingState;
}

export const Box3DVisualizer: React.FC<Props> = ({ pkg }) => {
  const isVolumetricChargeable = pkg.volumetricWeightKg > pkg.actualWeightKg;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-dak-saffron-500/20 text-dak-saffron-400 border border-dak-saffron-500/30">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">3D Parcel Simulation & Fit</h3>
            <p className="text-xs text-slate-400">India Post International EMS Specification</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 border ${
          pkg.fitsEmsLimits
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : 'bg-red-500/10 text-red-400 border-red-500/30'
        }`}>
          {pkg.fitsEmsLimits ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {pkg.fitsEmsLimits ? 'Fits EMS Limits' : 'Exceeds Dimension Limits'}
        </span>
      </div>

      {/* 3D Box Graphical Representation */}
      <div className="relative h-60 w-full bg-slate-950/60 rounded-2xl flex items-center justify-center border border-slate-800/80 p-4">
        
        {/* Render Isometric Stylized Carton */}
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Main Simulated Carton */}
          <div className="w-44 h-32 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 rounded-lg border-2 border-amber-600/80 shadow-2xl relative flex items-center justify-center">
            
            {/* Top Tape Strip */}
            <div className="absolute -top-1 w-full h-3 bg-amber-500/60 border-y border-amber-400/80" />
            <div className="absolute w-6 h-full bg-amber-500/60 border-x border-amber-400/80" />

            {/* Postal PBE-I Label Simulation */}
            <div className="w-20 h-14 bg-white/95 rounded p-1 shadow-md flex flex-col justify-between z-10">
              <div className="flex items-center justify-between">
                <span className="text-[7px] font-extrabold text-red-600">INDIA POST</span>
                <span className="text-[6px] font-mono text-slate-800">EMS</span>
              </div>
              <div className="w-full h-4 bg-slate-900 flex items-center justify-center">
                <span className="text-[6px] font-mono text-white tracking-widest">|||||||||||||</span>
              </div>
              <span className="text-[6px] font-extrabold text-slate-900 truncate">PBE-I DOCKET</span>
            </div>

            {/* Fragile Stamp if Applicable */}
            {pkg.isFragile && (
              <div className="absolute top-2 right-2 px-1 py-0.5 rounded bg-red-600 text-white text-[7px] font-black uppercase tracking-tighter">
                FRAGILE
              </div>
            )}
          </div>

          {/* Dimension Measurement Badges */}
          <div className="mt-3 flex items-center gap-3 text-xs font-mono font-bold text-slate-300">
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">L: {pkg.lengthCm} cm</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">W: {pkg.widthCm} cm</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">H: {pkg.heightCm} cm</span>
          </div>

        </div>

      </div>

      {/* Volumetric Weight vs Actual Weight Matrix */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400">Actual Weight</span>
          <p className="text-lg font-black text-white">{pkg.actualWeightKg} kg</p>
          <span className="text-[10px] text-slate-400">Scale reading</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400">Volumetric Weight</span>
          <p className={`text-lg font-black ${isVolumetricChargeable ? 'text-amber-400' : 'text-slate-200'}`}>
            {pkg.volumetricWeightKg} kg
          </p>
          <span className="text-[10px] text-slate-400">(L×W×H) ÷ 5000</span>
        </div>

        <div className="p-3 rounded-2xl bg-dak-saffron-500/15 border border-dak-saffron-500/30 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-extrabold text-dak-saffron-400">Chargeable Weight</span>
          <p className="text-lg font-black text-white">{pkg.chargeableWeightKg} kg</p>
          <span className="text-[10px] text-dak-saffron-300 font-bold">Max of Actual vs Vol</span>
        </div>

      </div>

      {/* Combined Girth Compliance */}
      <div className="mt-3 p-3 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Combined Length + Girth [L + 2(W+H)]:</span>
        <span className="font-mono font-bold text-slate-200">
          {pkg.actualCombinedGirthCm} cm / Max 300 cm
        </span>
      </div>

    </div>
  );
};
