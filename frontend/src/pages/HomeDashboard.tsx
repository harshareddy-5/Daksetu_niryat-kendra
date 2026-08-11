import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Package,
  ShieldCheck,
  Zap,
  Globe,
  TrendingUp,
  FileCheck2,
  Scan,
  Compass,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useExport } from '../store/exportStore';
import { SAMPLE_GI_CRAFTS } from '../utils/mockData';
import { GiCraftProfile } from '../types';

export const HomeDashboard: React.FC = () => {
  const { selectGiCraft, setCurrentStep } = useExport();

  const handleStartWithCraft = (craft: GiCraftProfile) => {
    selectGiCraft(craft);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glow border border-dak-saffron-500/30 p-8 sm:p-12">
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dak-saffron-500/15 border border-dak-saffron-500/30 text-dak-saffron-400 text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            <span>SIH 2026 • Problem Statement DGKN-2026-09</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            AI-Powered Export Kiosk for <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-dak-saffron-500 bg-clip-text text-transparent">
              Dak Ghar Niryat Kendras
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            Empowering rural artisans, MSMEs, and self-help groups to export Indian handicrafts globally through India Post. Automated HS Code suggestion, document OCR, packaging optimization, and postal clearance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/wizard"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-dak-saffron-500 via-orange-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white font-black text-base flex items-center gap-3 shadow-xl shadow-dak-saffron-500/30 transition-all hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              <span>Launch Export Assistant</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/operator"
              className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-base flex items-center gap-2 border border-slate-700 transition-all"
            >
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Postal Counter Officer View</span>
            </Link>
          </div>

        </div>

        {/* Decorative Grid Glow Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-dak-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Live DNK Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Consignments</span>
            <div className="p-2 rounded-xl bg-dak-saffron-500/20 text-dak-saffron-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-black text-white">48,290+</p>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% this month
          </span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Active DNK Centers</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-black text-white">1,024</p>
          <span className="text-xs text-slate-400 font-semibold mt-1">
            Across 28 Indian States
          </span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">RoDTEP Rebates</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-black text-white">₹12.4 Cr</p>
          <span className="text-xs text-amber-400 font-semibold mt-1">
            Direct artisan bank credit
          </span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Avg Intake Time</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-black text-white">3.2 Mins</p>
          <span className="text-xs text-indigo-400 font-semibold mt-1">
            Down from 45 minutes
          </span>
        </div>
      </div>

      {/* 7-Step Export Workflow Pipeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DakSetu 7-Stage Intelligence Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Guided end-to-end automated processing from rural workshop to international airmail dispatch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Vision Photo Capture', desc: 'Computer vision identifies craft category, materials, and origin state.', icon: Scan },
            { step: '02', title: 'AI HS Code Suggestion', desc: 'ITC-HS codes ranked with 2.5% RoDTEP export rebate mapping.', icon: Sparkles },
            { step: '03', title: 'Document OCR Extraction', desc: 'Commercial Invoice, IEC, and Packing List field extraction.', icon: FileCheck2 },
            { step: '04', title: '10-Point Compliance', desc: 'Checks US Section 321, UK VAT, phytosanitary & safety standards.', icon: ShieldCheck },
            { step: '05', title: 'Smart Packaging Advisor', desc: '3D parcel simulation, volumetric weight & EMS dimension verification.', icon: Package },
            { step: '06', title: 'India Post Tariff Rates', desc: 'EMS Speed Post vs Air Parcel pricing with live currency conversion.', icon: Globe },
            { step: '07', title: 'PBE-I Digital Docket', desc: 'Official postal barcode sticker and electronic customs clearance.', icon: CheckCircle2 },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-dak-saffron-500/20 text-dak-saffron-400 flex items-center justify-center font-mono font-bold text-xs">
                  {item.step}
                </div>
                <item.icon className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Indian GI Crafts Preloader */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Featured Indian GI Handicrafts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Click any handicraft to launch an instant export evaluation demo.
            </p>
          </div>
          <Link
            to="/gi-crafts"
            className="text-xs font-bold text-dak-saffron-400 hover:text-dak-saffron-300 flex items-center gap-1"
          >
            <span>View All Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_GI_CRAFTS.map((craft) => (
            <div
              key={craft.id}
              className="glass-panel rounded-3xl border border-slate-800 overflow-hidden group hover:border-dak-saffron-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={craft.sample_image}
                  alt={craft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dak-navy-950/80 backdrop-blur-md text-amber-400 text-xs font-extrabold border border-slate-700">
                  {craft.state}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-mono font-bold border border-emerald-800/40">
                  {craft.gi_tag_no}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-dak-saffron-400 transition-colors">
                    {craft.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {craft.material}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">HS Code</span>
                    <p className="text-xs font-mono font-bold text-white">{craft.default_hs_code}</p>
                  </div>

                  <Link
                    to="/wizard"
                    onClick={() => handleStartWithCraft(craft)}
                    className="px-4 py-2 rounded-xl bg-dak-saffron-500 hover:bg-dak-saffron-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-dak-saffron-500/20 transition-all"
                  >
                    <span>Export This Craft</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
