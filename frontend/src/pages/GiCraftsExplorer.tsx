import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Search, Filter, ArrowRight, Sparkles, MapPin, Tag } from 'lucide-react';
import { SAMPLE_GI_CRAFTS } from '../utils/mockData';
import { useExport } from '../store/exportStore';
import { GiCraftProfile } from '../types';

export const GiCraftsExplorer: React.FC = () => {
  const [searchTerm, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const { selectGiCraft, setCurrentStep } = useExport();
  const navigate = useNavigate();

  const states = ['ALL', ...Array.from(new Set(SAMPLE_GI_CRAFTS.map(c => c.state)))];

  const filtered = SAMPLE_GI_CRAFTS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.default_hs_code.includes(searchTerm);
    const matchState = selectedState === 'ALL' || c.state === selectedState;
    return matchSearch && matchState;
  });

  const handleExportCraft = (craft: GiCraftProfile) => {
    selectGiCraft(craft);
    setCurrentStep(1);
    navigate('/wizard');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Geographical Indication (GI) Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Indian Heritage GI Crafts Catalog
        </h1>
        <p className="text-sm text-slate-400">
          Preconfigured export specifications, ITC-HS classifications, and postal packaging parameters for authentic Indian handicraft clusters.
        </p>
      </div>

      {/* Search & State Filter Controls */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search craft, material, or HS code..."
            value={searchTerm}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-2xl text-white text-xs sm:text-sm focus:outline-none focus:border-dak-saffron-500"
          />
        </div>

        {/* State Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {states.map(st => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedState === st
                  ? 'bg-dak-saffron-500 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Craft Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(craft => (
          <div
            key={craft.id}
            className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-dak-saffron-500/50 transition-all duration-300 group"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={craft.sample_image}
                alt={craft.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dak-navy-950/85 backdrop-blur-md text-amber-400 text-xs font-extrabold border border-slate-700 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{craft.state}</span>
              </span>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-emerald-950/90 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-800/40">
                {craft.gi_tag_no}
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-dak-saffron-400 transition-colors">
                  {craft.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {craft.hindi_name}
                </p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  <strong>Materials:</strong> {craft.material}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">HS Code</span>
                    <p className="font-mono font-bold text-white">{craft.default_hs_code}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Est. Weight</span>
                    <p className="font-mono font-bold text-white">{craft.typical_weight_kg} kg</p>
                  </div>
                </div>

                <button
                  onClick={() => handleExportCraft(craft)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-dak-saffron-500/20 transition-all"
                >
                  <span>Export This GI Craft</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
