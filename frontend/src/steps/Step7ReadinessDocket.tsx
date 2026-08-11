import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, FileText, Printer, QrCode, ArrowLeft, RotateCcw, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { ScoreGauge } from '../components/ScoreGauge';
import { BarcodeStamp } from '../components/BarcodeStamp';
import { PostalDocketModal } from '../components/PostalDocketModal';
import { api } from '../services/api';

export const Step7ReadinessDocket: React.FC = () => {
  const { product, packaging, shipping, docket, setDocket, resetSession, setCurrentStep } = useExport();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Generate live docket on backend if available
    const syncDocket = async () => {
      try {
        const res = await api.generateDocket({
          seller_name: "Sri Channapatna Crafts Producers Guild",
          product_title: product.productTitle,
          hs_code: product.selectedHsCode?.hs_code || "9503.00.90",
          destination_country: shipping.destinationName,
          gross_weight_kg: packaging.chargeableWeightKg,
          shipping_cost_inr: shipping.quotes[0]?.total_cost_inr || 3524.95
        });

        if (res && res.pbe_number) {
          setDocket(prev => ({
            ...prev,
            pbeNumber: res.pbe_number,
            trackingBarcode: res.tracking_barcode,
            qrPayloadBase64: res.qr_code_base64,
            dnkCenterName: res.dnk_center_name
          }));
        }
      } catch (err) {
        console.warn("Using offline docket sync fallback");
      }
    };

    syncDocket();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Step 7 of 7: Export Clearance & Dispatch
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          Export Readiness Score & Postal Docket
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          All 7 export preparation stages evaluated. Generate official Postal Bill of Export (PBE-I) docket for DNK counter intake.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Radial Score Gauge & Highlights */}
        <div className="lg:col-span-5 space-y-4">
          <ScoreGauge score={docket.overallScore} grade={docket.grade} />

          {/* Itemized Score Breakdown */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Scoring Category Breakdown
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Product AI & HS Code</span>
                  <span className="text-emerald-400 font-mono">25 / 25</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Document OCR Extraction</span>
                  <span className="text-emerald-400 font-mono">25 / 25</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Regulatory Compliance</span>
                  <span className="text-emerald-400 font-mono">25 / 25</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Packaging & Postal Safety</span>
                  <span className="text-emerald-400 font-mono">21 / 25</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[84%] h-full bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: PBE-I Docket Summary & Barcode */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase font-mono text-dak-saffron-400">
                  FORM PBE-I ELECTRONIC DECLARATION
                </span>
                <h3 className="text-lg font-black text-white">{docket.pbeNumber}</h3>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DNK Fast-Track</span>
              </span>
            </div>

            {/* Barcode Stamp */}
            <BarcodeStamp barcodeText={docket.trackingBarcode} pbeNumber={docket.pbeNumber} />

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 font-semibold">Artisan Item</span>
                <p className="font-bold text-white mt-0.5 truncate">{product.productTitle}</p>
                <span className="text-slate-400 font-mono text-[10px]">HS {product.selectedHsCode?.hs_code}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 font-semibold">Destination Country</span>
                <p className="font-bold text-white mt-0.5">{shipping.destinationName} ({shipping.flag})</p>
                <span className="text-slate-400 font-mono text-[10px]">Zone: {shipping.zone}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 font-semibold">Chargeable Weight</span>
                <p className="font-bold text-white mt-0.5 font-mono">{packaging.chargeableWeightKg} kg</p>
                <span className="text-emerald-400 font-semibold text-[10px]">Fits EMS Limits</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 font-semibold">RoDTEP Incentive</span>
                <p className="font-bold text-emerald-400 mt-0.5">2.5% Claimable</p>
                <span className="text-slate-400 text-[10px]">Direct Bank Credit</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Postal Bill of Export</span>
              </button>

              <button
                onClick={() => window.print()}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Barcode Label</span>
              </button>
            </div>

            {/* Start New Session */}
            <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
              <button
                onClick={() => setCurrentStep(6)}
                className="hover:text-white flex items-center gap-1 font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>

              <button
                onClick={resetSession}
                className="text-dak-saffron-400 hover:text-dak-saffron-300 flex items-center gap-1 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Process Another Product</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Printable Modal */}
      <PostalDocketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};
