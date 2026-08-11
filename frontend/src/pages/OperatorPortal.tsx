import React, { useState } from 'react';
import { UserCheck, Scan, CheckCircle2, AlertCircle, Stamp, Search, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { BarcodeStamp } from '../components/BarcodeStamp';

export const OperatorPortal: React.FC = () => {
  const { docket, product, packaging, shipping } = useExport();
  const [scannedCode, setScannedCode] = useState<string>(docket.trackingBarcode);
  const [isStamped, setIsStamped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleStampClearance = () => {
    setIsStamped(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
              India Post Counter Desk
            </span>
            <h1 className="text-2xl font-black text-white">Postal Counter Officer Portal</h1>
            <p className="text-xs text-slate-400">DNK Bengaluru GPO Hub • Officer ID: DNK-OFF-4291</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            System Online: EDI Gate Active
          </span>
        </div>
      </div>

      {/* Barcode Scanner & Search Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Scan className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Scan Barcode or Enter PBE-I Docket Number (e.g. EM84291982IN)..."
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-dak-saffron-500"
            />
          </div>

          <button
            onClick={() => setIsStamped(false)}
            className="px-6 py-3 rounded-2xl bg-dak-saffron-500 hover:bg-dak-saffron-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Lookup Docket</span>
          </button>
        </div>
      </div>

      {/* Consignment Verification Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Clearance Dossier */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase font-mono text-dak-saffron-400">
                  EXPORT VERIFICATION DOSSIER
                </span>
                <h3 className="text-lg font-black text-white">{docket.pbeNumber}</h3>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${
                isStamped
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {isStamped ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {isStamped ? 'OUTWARD DISPATCH APPROVED' : 'PENDING COUNTER STAMP'}
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">1. Physical Weight Verification (Scale: {packaging.actualWeightKg} kg)</span>
                <span className="text-emerald-400 font-bold">MATCHED (±0.0 kg)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">2. DGFT Importer-Exporter Code (0718049215)</span>
                <span className="text-emerald-400 font-bold">DGFT ACTIVE</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">3. RoDTEP Incentive Allocation</span>
                <span className="text-emerald-400 font-bold">2.5% RECORDED</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">4. Dangerous Goods / Prohibited Check</span>
                <span className="text-emerald-400 font-bold">NON-DGR CLEARED</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={handleStampClearance}
                disabled={isStamped}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isStamped
                    ? 'bg-emerald-600/50 text-emerald-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-500/25'
                }`}
              >
                <Stamp className="w-5 h-5" />
                <span>{isStamped ? 'Postal Stamp Applied' : 'Stamp Official Counter Clearance'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dispatch Manifest</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right: Barcode & Counter Seal View */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Postal Counter Sticker</h3>
            <BarcodeStamp barcodeText={scannedCode} pbeNumber={docket.pbeNumber} />

            {isStamped && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Official India Post Seal Affixed</span>
                </div>
                <p>Consignment logged into Outward Airmail Manifest (BLR-JFK-EMS-084). Ready for airport customs transit.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
