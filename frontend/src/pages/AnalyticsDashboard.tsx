import React from 'react';
import { BarChart3, TrendingUp, Globe, Package, DollarSign, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
              National DNK Intelligence Hub
            </span>
            <h1 className="text-2xl font-black text-white">Export Analytics & Impact Metrics</h1>
            <p className="text-xs text-slate-400">Real-time data from 1,024 Dak Ghar Niryat Kendras nationwide</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-mono font-bold text-slate-300 border border-slate-700">
            FY 2026-27 Active Quarter
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Export Shipments</span>
          <p className="text-3xl font-black text-white mt-1">48,291</p>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+32.4% YoY Growth</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">FOB Value Cleared</span>
          <p className="text-3xl font-black text-white mt-1">₹142.8 Cr</p>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.2% MSME Share</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">RoDTEP Rebate Paid</span>
          <p className="text-3xl font-black text-emerald-400 mt-1">₹3.57 Cr</p>
          <span className="text-xs text-slate-400 mt-2 block">Directly to artisan bank accounts</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">Customs Rejection Rate</span>
          <p className="text-3xl font-black text-white mt-1">0.14%</p>
          <span className="text-xs text-emerald-400 font-semibold mt-2 block">
            99.86% First-time right clearance
          </span>
        </div>
      </div>

      {/* Country Distribution & Craft Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Destination Markets */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-dak-saffron-400" />
              <span>Top International Export Destinations</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">% Volume</span>
          </div>

          <div className="space-y-3">
            {[
              { country: "United States (US)", flag: "🇺🇸", share: 44, value: "₹62.8 Cr" },
              { country: "United Kingdom (GB)", flag: "🇬🇧", share: 21, value: "₹29.9 Cr" },
              { country: "United Arab Emirates (AE)", flag: "🇦🇪", share: 14, value: "₹19.9 Cr" },
              { country: "Germany (DE)", flag: "🇩🇪", share: 11, value: "₹15.7 Cr" },
              { country: "Australia (AU)", flag: "🇦🇺", share: 7, value: "₹9.9 Cr" },
              { country: "Japan (JP)", flag: "🇯🇵", share: 3, value: "₹4.6 Cr" }
            ].map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-2">
                    <span>{d.flag}</span>
                    <span>{d.country}</span>
                  </span>
                  <span className="font-mono text-dak-saffron-400">{d.share}% ({d.value})</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-dak-saffron-500 to-amber-400 rounded-full"
                    style={{ width: `${d.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Exported Handicraft Categories */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-400" />
              <span>Top Handicraft Export Sectors</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Consignments</span>
          </div>

          <div className="space-y-3">
            {[
              { category: "Handicrafts & Wooden Toys (Channapatna/Kondapalli)", share: 35, count: "16,900 pkgs" },
              { category: "Handloom Sarees & Silk Brocades (Banaras/Kanchipuram)", share: 28, count: "13,520 pkgs" },
              { category: "Metal Artware & Brassware (Moradabad/Bidar)", share: 18, count: "8,690 pkgs" },
              { category: "Ceramics & Glazed Pottery (Jaipur/Khurja)", share: 12, count: "5,790 pkgs" },
              { category: "Textiles, Shawls & Stoles (Kashmir Pashmina)", share: 7, count: "3,391 pkgs" }
            ].map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span>{c.category}</span>
                  <span className="font-mono text-emerald-400">{c.share}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${c.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
