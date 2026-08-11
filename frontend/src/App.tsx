import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ExportProvider } from './store/exportStore';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './pages/HomeDashboard';
import { ExportWizard } from './pages/ExportWizard';
import { OperatorPortal } from './pages/OperatorPortal';
import { GiCraftsExplorer } from './pages/GiCraftsExplorer';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';

export const App: React.FC = () => {
  return (
    <ExportProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#070C18] text-slate-100 flex flex-col font-sans selection:bg-dak-saffron-500 selection:text-white">
          
          {/* Top Sticky Header & Navigation */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/wizard" element={<ExportWizard />} />
              <Route path="/gi-crafts" element={<GiCraftsExplorer />} />
              <Route path="/operator" element={<OperatorPortal />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-dak-navy-950 border-t border-slate-800/80 py-8 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 space-y-2">
              <p className="font-semibold text-slate-300">
                DAKSETU – Dak Ghar Niryat Kendra Smart AI Assistant • Problem Statement DGKN-2026-09
              </p>
              <p className="text-slate-400">
                Smart India Hackathon Prototype • Department of Posts / India Post • Ministry of Communications
              </p>
            </div>
          </footer>

        </div>
      </BrowserRouter>
    </ExportProvider>
  );
};

export default App;
