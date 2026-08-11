import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Check, Image as ImageIcon, ArrowRight, Wand2 } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { SAMPLE_GI_CRAFTS } from '../utils/mockData';
import { BoundingBoxCanvas } from '../components/BoundingBoxCanvas';
import { GiCraftProfile } from '../types';
import { api } from '../services/api';

export const Step1ProductCapture: React.FC = () => {
  const { product, setProduct, selectGiCraft, setCurrentStep, isKioskMode } = useExport();
  const [activeTab, setActiveTab] = useState<'sample' | 'upload'>('sample');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectCraft = async (craft: GiCraftProfile) => {
    selectGiCraft(craft);
    try {
      setIsAnalyzing(true);
      const res = await api.analyzeProduct({ craft_id_hint: craft.id });
      if (res && res.hs_candidates) {
        setProduct(prev => ({
          ...prev,
          hsCandidates: res.hs_candidates,
          selectedHsCode: res.primary_hs_code || res.hs_candidates[0],
          boundingBoxes: res.bounding_boxes || prev.boundingBoxes,
          explanation: res.explanation || prev.explanation
        }));
      }
    } catch (e) {
      console.warn("Backend analysis fallback active");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        selectGiCraft({
          ...SAMPLE_GI_CRAFTS[0],
          name: file.name.replace(/\.[^/.]+$/, ""),
          sample_image: base64
        });

        try {
          setIsAnalyzing(true);
          const res = await api.analyzeProduct({
            image_base64: base64,
            product_title_hint: file.name
          });
          if (res && res.hs_candidates) {
            setProduct(prev => ({
              ...prev,
              productTitle: res.identified_title || prev.productTitle,
              craftName: res.craft_name || prev.craftName,
              category: res.category || prev.category,
              materialsDetected: res.materials_detected || prev.materialsDetected,
              confidenceScore: res.confidence_score || prev.confidenceScore,
              hsCandidates: res.hs_candidates,
              selectedHsCode: res.primary_hs_code || res.hs_candidates[0],
              boundingBoxes: res.bounding_boxes || prev.boundingBoxes,
              explanation: res.explanation || prev.explanation
            }));
          }
        } catch (err) {
          console.warn("Using offline fallback");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Step 1 of 7: Vision AI Ingestion
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          Capture or Select Artisan Product
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Upload a high-resolution photo or choose a GI-tagged craft. Our computer vision AI will identify craft attributes, materials, and origin.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Capture & AI Bounding Boxes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-dak-saffron-400" />
                <h3 className="text-base font-bold text-white">Live AI Vision Scan</h3>
              </div>

              <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('sample')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'sample' ? 'bg-dak-saffron-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  GI Crafts Catalog
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'upload' ? 'bg-dak-saffron-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload / Camera
                </button>
              </div>
            </div>

            {/* Bounding Box Image Preview */}
            <BoundingBoxCanvas
              imageUrl={product.photoPreview || SAMPLE_GI_CRAFTS[0].sample_image}
              boxes={product.boundingBoxes}
              title={product.productTitle}
            />

            {/* Detection Summary Pill */}
            <div className="p-4 rounded-2xl bg-dak-navy-950/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Detected Artisan Craft</span>
                <p className="text-base font-bold text-white flex items-center gap-2">
                  <span>{product.craftName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30">
                    {Math.round(product.confidenceScore * 100)}% Confidence
                  </span>
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                disabled={isAnalyzing}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
              >
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze HS Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Preloaded GI Craft Selection or Upload Area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-dak-saffron-400" />
                <span>Popular Indian GI Crafts</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">1-Tap Demo</span>
            </div>

            {activeTab === 'sample' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_GI_CRAFTS.map((craft) => {
                  const isSelected = product.craftName === craft.name;
                  return (
                    <button
                      key={craft.id}
                      onClick={() => handleSelectCraft(craft)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                        isSelected
                          ? 'bg-dak-saffron-500/15 border-dak-saffron-500 shadow-md shadow-dak-saffron-500/20'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2">
                        <img
                          src={craft.sample_image}
                          alt={craft.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-dak-saffron-500 text-white flex items-center justify-center shadow">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-amber-300">
                          {craft.state}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{craft.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{craft.default_hs_code}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <label className="border-2 border-dashed border-slate-700 hover:border-dak-saffron-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 group-hover:bg-dak-saffron-500/20 flex items-center justify-center mb-3 transition-colors">
                    <Upload className="w-7 h-7 text-slate-400 group-hover:text-dak-saffron-400" />
                  </div>
                  <span className="text-sm font-bold text-white">Click to Upload Photo</span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG or WebP up to 15MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <p className="font-semibold text-white mb-1">📸 Kiosk Camera Tips for Rural Sellers:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Place item on a clean, solid background.</li>
                    <li>Ensure adequate front lighting without heavy shadows.</li>
                    <li>Capture hand-engraving seals and GI logo tags clearly.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
