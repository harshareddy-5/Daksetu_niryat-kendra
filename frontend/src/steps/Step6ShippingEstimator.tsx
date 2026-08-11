import React from 'react';
import { Truck, Globe, DollarSign, Clock, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { DESTINATION_COUNTRIES } from '../utils/mockData';

export const Step6ShippingEstimator: React.FC = () => {
  const { shipping, setShipping, packaging, setCurrentStep } = useExport();

  const handleDestinationChange = (destCode: string) => {
    const found = DESTINATION_COUNTRIES.find(c => c.code === destCode) || DESTINATION_COUNTRIES[0];
    
    // Dynamic calculation
    const wt = packaging.chargeableWeightKg;
    const baseEms = Math.round(1150 + Math.ceil(Math.max(0, (wt * 1000 - 250) / 250)) * 340);
    const fuelEms = Math.round(baseEms * 0.085);
    const gstEms = Math.round((baseEms + fuelEms) * 0.18);
    const insEms = Math.round((shipping.productValueInr / 1000) * 15);
    const totalInrEms = baseEms + fuelEms + gstEms + insEms;
    const totalUsdEms = Math.round((totalInrEms / found.rate) * 100) / 100;

    const baseAp = Math.round(1850 + Math.ceil(Math.max(0, (wt * 1000 - 1000) / 1000)) * 480);
    const fuelAp = Math.round(baseAp * 0.085);
    const gstAp = Math.round((baseAp + fuelAp) * 0.18);
    const totalInrAp = baseAp + fuelAp + gstAp + insEms;
    const totalUsdAp = Math.round((totalInrAp / found.rate) * 100) / 100;

    setShipping(prev => ({
      ...prev,
      destinationCode: found.code,
      destinationName: found.name,
      flag: found.flag,
      zone: found.zone,
      currencySymbol: found.currency,
      exchangeRate: found.rate,
      quotes: [
        {
          service_id: "international_ems",
          name: "India Post International EMS (Speed Post)",
          base_freight_inr: baseEms,
          fuel_surcharge_inr: fuelEms,
          postal_gst_inr: gstEms,
          insurance_fee_inr: insEms,
          total_cost_inr: totalInrEms,
          total_cost_usd: totalUsdEms,
          transit_days_min: 4,
          transit_days_max: 8,
          max_weight_kg: 30,
          is_recommended: true
        },
        {
          service_id: "air_parcel",
          name: "India Post International Air Parcel",
          base_freight_inr: baseAp,
          fuel_surcharge_inr: fuelAp,
          postal_gst_inr: gstAp,
          insurance_fee_inr: insEms,
          total_cost_inr: totalInrAp,
          total_cost_usd: totalUsdAp,
          transit_days_min: 8,
          transit_days_max: 14,
          max_weight_kg: 20,
          is_recommended: false
        }
      ]
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-dak-saffron-500/10 text-dak-saffron-400 border border-dak-saffron-500/20">
          Step 6 of 7: Logistics & Postal Tariffs
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          India Post Shipping Cost & Transit Estimator
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Official Dak Ghar Niryat Kendra international parcel tariffs, fuel surcharges, and customs clearance timelines.
        </p>
      </div>

      {/* Destination Country Selection Grid */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-dak-saffron-400" />
            <span>Select Destination Country</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Chargeable Wt: {packaging.chargeableWeightKg} kg</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {DESTINATION_COUNTRIES.map((country) => {
            const isSelected = shipping.destinationCode === country.code;
            return (
              <button
                key={country.code}
                onClick={() => handleDestinationChange(country.code)}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-dak-saffron-500/20 border-dak-saffron-500 shadow-lg shadow-dak-saffron-500/20 scale-105'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <span className="text-2xl mb-1">{country.flag}</span>
                <span className="text-xs font-bold text-white truncate max-w-full">{country.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">1 {country.currency} = ₹{country.rate}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Quotes Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shipping.quotes.map((quote) => (
          <div
            key={quote.service_id}
            className={`glass-panel p-6 rounded-3xl border relative transition-all duration-300 ${
              quote.is_recommended
                ? 'border-dak-saffron-500/60 bg-dak-navy-900/90 shadow-2xl shadow-dak-saffron-500/10'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          >
            {quote.is_recommended && (
              <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-dak-saffron-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow">
                Recommended by DNK
              </span>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-dak-saffron-500/20 text-dak-saffron-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{quote.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimated Transit: {quote.transit_days_min} – {quote.transit_days_max} Days</span>
                </div>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Shipping Cost</span>
                <p className="text-2xl font-black text-white">
                  ₹{quote.total_cost_inr.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Converted Amount</span>
                <p className="text-xl font-extrabold text-dak-saffron-400 font-mono">
                  {shipping.currencySymbol}{quote.total_cost_usd}
                </p>
              </div>
            </div>

            {/* Fee Itemization Breakdown */}
            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Base Air Freight:</span>
                <span className="font-mono font-semibold">₹{quote.base_freight_inr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fuel Surcharge (8.5%):</span>
                <span className="font-mono font-semibold">₹{quote.fuel_surcharge_inr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Postal GST (18%):</span>
                <span className="font-mono font-semibold">₹{quote.postal_gst_inr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Full Transit Cargo Insurance:</span>
                <span className="font-mono font-semibold text-emerald-400">₹{quote.insurance_fee_inr}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={() => setCurrentStep(5)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => setCurrentStep(7)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-dak-saffron-500 to-amber-500 hover:from-dak-saffron-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-dak-saffron-500/25 transition-all"
        >
          <span>View Export Readiness Score</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
