import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, Upload, Eye, ArrowRight, ArrowLeft, ShieldCheck, FileCheck } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { DocumentAuditItem } from '../types';

export const Step3DocumentOcr: React.FC = () => {
  const { documents, setCurrentStep } = useExport();
  const [activeDocType, setActiveDocType] = useState<string>('INVOICE');

  const selectedDoc = documents.find(d => d.type === activeDocType) || documents[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Step 3 of 7: Document OCR & Ingestion
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          Exporter Document Verification & OCR
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Automated extraction and validation of Commercial Invoices, DGFT IEC Codes, and Export Packing Lists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Document Type Tabs & OCR Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-dak-saffron-400" />
              <span>Mandatory Export Documents</span>
            </h3>

            {/* Document Tabs */}
            <div className="space-y-2">
              {documents.map((doc) => {
                const isActive = doc.type === activeDocType;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDocType(doc.type)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-dak-saffron-500/20 border-dak-saffron-500 shadow-md shadow-dak-saffron-500/15'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isActive ? 'bg-dak-saffron-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{doc.name}</h4>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{doc.type}</span>
                      </div>
                    </div>

                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Raw OCR Text Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Raw OCR Text Stream:</span>
              <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 font-mono">
                {selectedDoc.rawText}
              </pre>
            </div>

          </div>
        </div>

        {/* Right Column: Extracted Key-Value Fields */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Extracted Key-Value Fields</h3>
                <p className="text-xs text-slate-400">Validated against DGFT & Customs format standards</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {Math.round(selectedDoc.confidence * 100)}% Accuracy
              </span>
            </div>

            {/* Extracted Fields List */}
            <div className="space-y-3">
              {Object.values(selectedDoc.fields).map((field) => (
                <div
                  key={field.key}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      {field.label}
                    </span>
                    <p className="text-sm font-black text-white font-mono mt-0.5">
                      {field.value}
                    </p>
                    {field.validation_message && (
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{field.validation_message}</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-slate-300">
                    {Math.round(field.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
              >
                <span>Continue to Compliance Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
