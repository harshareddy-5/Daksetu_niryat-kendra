import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package,
  Layers,
  ShieldCheck,
  Languages,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  UserCheck,
  Compass,
  BarChart3,
  Monitor
} from 'lucide-react';
import { useExport } from '../store/exportStore';
import { translations } from '../utils/translations';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    isKioskMode,
    setIsKioskMode,
    isVoiceActive,
    setIsVoiceActive,
    speakVoicePrompt,
    resetSession,
    currentStep
  } = useExport();

  const location = useLocation();
  const t = translations[language];

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    speakVoicePrompt(nextLang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है।' : 'Language changed to English.');
  };

  const toggleVoice = () => {
    const nextState = !isVoiceActive;
    setIsVoiceActive(nextState);
    if (nextState) {
      speakVoicePrompt(
        language === 'hi'
          ? 'डाकसेतु में आपका स्वागत है। मैं आपकी निर्यात प्रक्रिया में सहायता करूंगा।'
          : 'Welcome to DakSetu. I will guide you through your international postal export.'
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-dak-navy-950/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & National Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dak-saffron-500 via-dak-saffron-600 to-amber-600 p-0.5 shadow-lg shadow-dak-saffron-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dak-navy-950 rounded-[14px] flex items-center justify-center">
                <Package className="w-6 h-6 text-dak-saffron-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-dak-saffron-500 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
                  DNK Kiosk
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {t.tagline}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-dak-navy-900/80 p-1.5 rounded-2xl border border-slate-800/80">
            <Link
              to="/wizard"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/wizard'
                  ? 'bg-dak-saffron-500 text-white shadow-lg shadow-dak-saffron-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Export Wizard</span>
            </Link>

            <Link
              to="/gi-crafts"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/gi-crafts'
                  ? 'bg-dak-saffron-500 text-white shadow-lg shadow-dak-saffron-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>GI Crafts Registry</span>
            </Link>

            <Link
              to="/operator"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/operator'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Postal Counter Officer</span>
            </Link>

            <Link
              to="/analytics"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/analytics'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>DNK Analytics</span>
            </Link>
          </nav>

          {/* Accessibility & Action Controls */}
          <div className="flex items-center gap-2">

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="Toggle Language (English / Hindi)"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-bold transition-all"
            >
              <Languages className="w-4 h-4 text-dak-saffron-400" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Voice Audio Guide */}
            <button
              onClick={toggleVoice}
              title="Toggle Voice Assistant"
              className={`p-2.5 rounded-xl border transition-all ${
                isVoiceActive
                  ? 'bg-dak-saffron-500/20 border-dak-saffron-500 text-dak-saffron-400 animate-pulse'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/80'
              }`}
            >
              {isVoiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Kiosk Mode Toggle */}
            <button
              onClick={() => setIsKioskMode(!isKioskMode)}
              title="Toggle Kiosk Touch Mode"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                isKioskMode
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400'
              }`}
            >
              <Monitor className="w-4 h-4 text-amber-400" />
              <span>{isKioskMode ? 'Touch Kiosk' : 'Desktop'}</span>
            </button>

            {/* Reset Session */}
            <button
              onClick={resetSession}
              title="Reset Export Workflow"
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-red-500/20 border border-slate-700/60 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
