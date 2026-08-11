import React from 'react';

interface Props {
  barcodeText: string;
  pbeNumber: string;
}

export const BarcodeStamp: React.FC<Props> = ({ barcodeText, pbeNumber }) => {
  return (
    <div className="p-4 bg-white text-slate-900 rounded-2xl border-2 border-slate-300 shadow-xl flex flex-col items-center justify-center font-mono">
      <div className="w-full flex items-center justify-between border-b border-slate-200 pb-1 mb-2">
        <span className="text-[10px] font-black text-red-600 tracking-wider">INDIA POST / DAK GHAR NIRYAT KENDRA</span>
        <span className="text-[9px] font-bold text-slate-600">INTERNATIONAL EMS</span>
      </div>

      {/* Barcode Visual Simulation */}
      <div className="w-full h-14 bg-slate-900 flex items-center justify-center rounded px-4">
        <span className="text-white text-xl tracking-[0.25em] font-black select-none">
          ||| | || |||| | ||| || ||||
        </span>
      </div>

      {/* Barcode Text */}
      <span className="mt-1.5 text-sm font-black tracking-widest text-slate-900">
        {barcodeText}
      </span>

      {/* Reference PBE */}
      <div className="mt-2 w-full pt-1 border-t border-dashed border-slate-300 flex items-center justify-between text-[9px] text-slate-500 font-sans">
        <span>Doc Ref: {pbeNumber}</span>
        <span className="text-emerald-700 font-bold">DIGITALLY CLEARED</span>
      </div>
    </div>
  );
};
