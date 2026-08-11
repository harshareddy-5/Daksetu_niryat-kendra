import React from 'react';
import { X, Printer, Download, CheckCircle2, Shield, QrCode } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { BarcodeStamp } from './BarcodeStamp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PostalDocketModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { product, packaging, shipping, docket, documents } = useExport();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-dak-saffron-400" />
            <h2 className="text-base font-bold text-white">Official Postal Bill of Export (PBE-I) Clearance Docket</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-dak-saffron-500 hover:bg-dak-saffron-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Docket</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-200 text-sm max-h-[75vh] overflow-y-auto">
          
          {/* Government / India Post Official Header */}
          <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-slate-300 shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-red-600 pb-4 mb-4 gap-4">
              <div>
                <span className="text-xs font-bold text-red-600 tracking-wider uppercase">GOVERNMENT OF INDIA • DEPARTMENT OF POSTS</span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">DAK GHAR NIRYAT KENDRA (DNK)</h1>
                <p className="text-xs font-semibold text-slate-600">Postal Bill of Export for Commercial Exports (Form PBE-I)</p>
              </div>

              {/* Barcode Widget */}
              <div className="sm:w-64">
                <BarcodeStamp barcodeText={docket.trackingBarcode} pbeNumber={docket.pbeNumber} />
              </div>
            </div>

            {/* Consignment & Exporter Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-800 uppercase tracking-wide">1. Exporter / Artisan Details</span>
                <p className="font-semibold text-slate-900">Sri Channapatna Crafts Producers Guild</p>
                <p className="text-slate-600">Craft Complex, B.M. Road, Ramanagara, Karnataka - 562160</p>
                <p className="font-mono text-slate-700"><strong>IEC:</strong> 0718049215 | <strong>GSTIN:</strong> 29AABCS1429B1ZX</p>
                <p className="text-slate-700"><strong>Origin DNK Hub:</strong> {docket.dnkCenterName}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-800 uppercase tracking-wide">2. Consignee / Buyer Details</span>
                <p className="font-semibold text-slate-900">Global Folk Treasures LLC</p>
                <p className="text-slate-600">842 Atlantic Avenue, Suite 4B, Brooklyn, NY 11201</p>
                <p className="font-semibold text-slate-900">Country of Destination: {shipping.destinationName} ({shipping.flag})</p>
                <p className="text-slate-700"><strong>Postal Service:</strong> India Post International EMS Speed Post</p>
              </div>

            </div>

            {/* Itemized Export Schedule */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-300 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">ITC-HS Code</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">FOB Value (INR)</th>
                    <th className="p-2.5">RoDTEP Rebate</th>
                    <th className="p-2.5">Gross Wt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">{product.productTitle}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-800">{product.selectedHsCode?.hs_code || '9503.00.90'}</td>
                    <td className="p-2.5">1 Master Box (12 pcs)</td>
                    <td className="p-2.5 font-bold text-slate-900">₹{shipping.productValueInr.toLocaleString('en-IN')}</td>
                    <td className="p-2.5 text-emerald-700 font-bold">2.5% (₹{Math.round(shipping.productValueInr * 0.025)})</td>
                    <td className="p-2.5 font-mono">{packaging.actualWeightKg} kg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Customs & Postal Verification Stamp Box */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-xs">
              <div>
                <span className="font-bold text-slate-800">Exporter Declaration:</span>
                <p className="text-[11px] text-slate-600 mt-1">
                  I hereby declare that the particulars given above are true and correct, and the goods exported do not contain any dangerous or restricted articles.
                </p>
                <div className="mt-4 pt-2 border-t border-dotted border-slate-400 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Digitally Signed: RAMESH KUMAR</span>
                  <span>{docket.generatedAt}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-950 flex flex-col justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DAK GHAR NIRYAT KENDRA COUNTER CLEARANCE</span>
                </div>
                <p className="text-[11px] text-emerald-900 mt-1">
                  Automated EDI clearance completed under Customs Notification 48/2018-Customs (N.T.). Ready for immediate outward international air mail dispatch.
                </p>
                <div className="mt-2 text-[10px] font-mono text-emerald-800 font-bold flex justify-between">
                  <span>POSTAL SEAL: DNK-BLR-04</span>
                  <span>STATUS: PASSED</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
