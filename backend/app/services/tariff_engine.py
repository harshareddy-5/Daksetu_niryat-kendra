import json
import os
import math
from typing import Dict, Any, List
from app.config import settings

class TariffEngineService:
    def __init__(self):
        self.rates_file = os.path.join(settings.DATA_DIR, "postal_rates.json")
        self.rates_data = {}
        self._load_rates()

    def _load_rates(self):
        if os.path.exists(self.rates_file):
            try:
                with open(self.rates_file, "r", encoding="utf-8") as f:
                    self.rates_data = json.load(f)
            except Exception as e:
                print(f"Error loading postal_rates.json: {e}")

    def calculate_dimensions_and_weight(self, length_cm: float, width_cm: float, height_cm: float, actual_weight_kg: float) -> Dict[str, Any]:
        """
        Calculate volumetric weight and check India Post EMS dimensional constraints.
        """
        rules = self.rates_data.get("postal_rules", {
            "max_length_cm": 150,
            "max_length_plus_girth_cm": 300,
            "volumetric_divisor": 5000
        })

        divisor = rules.get("volumetric_divisor", 5000)
        volumetric_weight = round((length_cm * width_cm * height_cm) / divisor, 2)
        chargeable_weight = max(actual_weight_kg, volumetric_weight)

        combined_girth = length_cm + 2 * (width_cm + height_cm)
        fits_length = length_cm <= rules.get("max_length_cm", 150)
        fits_girth = combined_girth <= rules.get("max_length_plus_girth_cm", 300)
        fits_weight = actual_weight_kg <= rules.get("max_weight_ems_kg", 30)

        fits_ems = fits_length and fits_girth and fits_weight

        # Box recommendation logic
        vol_liters = (length_cm * width_cm * height_cm) / 1000
        if vol_liters < 5:
            box_type = "Small Rigid Postal Mailer Box (3-ply Corrugated)"
            cushioning = "15mm Air-pocket bubble wrap + Honeycomb paper wrapping."
        elif vol_liters < 20:
            box_type = "Standard Export Master Carton (5-ply Heavy-Duty Corrugated)"
            cushioning = "25mm EPE Foam corners + Shredded kraft paper void-fill + Moisture silica pouches."
        else:
            box_type = "Reinforced Large Export Crate Box (7-ply Double-Walled)"
            cushioning = "Molded thermo-foam inserts + Heavy strapping tape on all seams."

        return {
            "actual_weight_kg": round(actual_weight_kg, 2),
            "volumetric_weight_kg": volumetric_weight,
            "chargeable_weight_kg": round(chargeable_weight, 2),
            "volumetric_divisor_used": divisor,
            "fits_ems_limits": fits_ems,
            "max_length_allowed_cm": rules.get("max_length_cm", 150),
            "max_combined_girth_cm": rules.get("max_length_plus_girth_cm", 300),
            "actual_combined_girth_cm": round(combined_girth, 1),
            "recommended_box_type": box_type,
            "cushioning_advice": cushioning,
            "label_instructions": [
                "Affix Postal Bill of Export (PBE-I) in clear waterproof transparent pouch on top face",
                "Ensure Barcode is flat and scannable (do not fold over box edge)",
                "Attach 3 copies of signed Commercial Invoice & Packing List inside side pouch",
                "Affix 'FRAGILE - HANDLE WITH CARE' stickers on all 4 vertical faces"
            ],
            "prohibited_items_check": "Verified: No dangerous goods, lithium ion battery, compressed aerosols, or flammable liquids detected."
        }

    def estimate_shipping_quotes(self, destination_code: str, chargeable_weight_kg: float, product_value_inr: float = 2000.0) -> Dict[str, Any]:
        """
        Estimate shipping cost across India Post International services.
        """
        destinations = self.rates_data.get("destinations", [])
        dest_info = None
        for d in destinations:
            if d.get("code") == destination_code:
                dest_info = d
                break

        if not dest_info:
            dest_info = destinations[0] if destinations else {
                "code": "US",
                "country": "United States",
                "flag": "🇺🇸",
                "zone": "Zone 5 - Americas",
                "currency_symbol": "$",
                "exchange_rate_inr": 86.5,
                "services": {}
            }

        weight_g = chargeable_weight_kg * 1000
        quotes = []
        exchange_rate = dest_info.get("exchange_rate_inr", 86.5)

        rules = self.rates_data.get("postal_rules", {})
        fuel_pct = rules.get("fuel_surcharge_percent", 8.5) / 100.0
        gst_pct = rules.get("postal_gst_percent", 18.0) / 100.0
        ins_rate = rules.get("insurance_rate_per_1000_inr", 15.0)

        # 1. International EMS
        ems_cfg = dest_info.get("services", {}).get("international_ems", {})
        if ems_cfg:
            base_rate = ems_cfg.get("base_rate_inr", 1150)
            base_wt = ems_cfg.get("base_weight_g", 250)
            per_add = ems_cfg.get("per_additional_250g_inr", 340)

            extra_units = max(0, math.ceil((weight_g - base_wt) / 250.0))
            freight = base_rate + (extra_units * per_add)
            fuel = round(freight * fuel_pct, 2)
            gst = round((freight + fuel) * gst_pct, 2)
            insurance = round((product_value_inr / 1000.0) * ins_rate, 2)
            total_inr = round(freight + fuel + gst + insurance, 2)
            total_usd = round(total_inr / exchange_rate, 2)

            quotes.append({
                "service_id": "international_ems",
                "name": ems_cfg.get("name", "India Post International EMS (Speed Post)"),
                "base_freight_inr": freight,
                "fuel_surcharge_inr": fuel,
                "postal_gst_inr": gst,
                "insurance_fee_inr": insurance,
                "total_cost_inr": total_inr,
                "total_cost_usd": total_usd,
                "transit_days_min": ems_cfg.get("transit_days_min", 4),
                "transit_days_max": ems_cfg.get("transit_days_max", 8),
                "max_weight_kg": ems_cfg.get("max_weight_kg", 30),
                "is_recommended": True
            })

        # 2. Air Parcel
        ap_cfg = dest_info.get("services", {}).get("air_parcel", {})
        if ap_cfg and chargeable_weight_kg <= ap_cfg.get("max_weight_kg", 20):
            base_rate = ap_cfg.get("base_rate_inr", 1850)
            base_wt = ap_cfg.get("base_weight_g", 1000)
            per_add = ap_cfg.get("per_additional_1000g_inr", 480)

            extra_units = max(0, math.ceil((weight_g - base_wt) / 1000.0))
            freight = base_rate + (extra_units * per_add)
            fuel = round(freight * fuel_pct, 2)
            gst = round((freight + fuel) * gst_pct, 2)
            insurance = round((product_value_inr / 1000.0) * ins_rate, 2)
            total_inr = round(freight + fuel + gst + insurance, 2)
            total_usd = round(total_inr / exchange_rate, 2)

            quotes.append({
                "service_id": "air_parcel",
                "name": ap_cfg.get("name", "India Post International Air Parcel"),
                "base_freight_inr": freight,
                "fuel_surcharge_inr": fuel,
                "postal_gst_inr": gst,
                "insurance_fee_inr": insurance,
                "total_cost_inr": total_inr,
                "total_cost_usd": total_usd,
                "transit_days_min": ap_cfg.get("transit_days_min", 8),
                "transit_days_max": ap_cfg.get("transit_days_max", 14),
                "max_weight_kg": ap_cfg.get("max_weight_kg", 20),
                "is_recommended": False
            })

        # 3. Tracked Packet (ITPS) for < 2kg
        tp_cfg = dest_info.get("services", {}).get("tracked_packet", {})
        if tp_cfg and chargeable_weight_kg <= 2.0:
            base_rate = tp_cfg.get("base_rate_inr", 420)
            base_wt = tp_cfg.get("base_weight_g", 100)
            per_add = tp_cfg.get("per_additional_100g_inr", 95)

            extra_units = max(0, math.ceil((weight_g - base_wt) / 100.0))
            freight = base_rate + (extra_units * per_add)
            fuel = round(freight * fuel_pct, 2)
            gst = round((freight + fuel) * gst_pct, 2)
            insurance = 0.0
            total_inr = round(freight + fuel + gst, 2)
            total_usd = round(total_inr / exchange_rate, 2)

            quotes.append({
                "service_id": "tracked_packet",
                "name": tp_cfg.get("name", "International Tracked Packet Service (ITPS)"),
                "base_freight_inr": freight,
                "fuel_surcharge_inr": fuel,
                "postal_gst_inr": gst,
                "insurance_fee_inr": insurance,
                "total_cost_inr": total_inr,
                "total_cost_usd": total_usd,
                "transit_days_min": tp_cfg.get("transit_days_min", 7),
                "transit_days_max": tp_cfg.get("transit_days_max", 12),
                "max_weight_kg": tp_cfg.get("max_weight_kg", 2),
                "is_recommended": False
            })

        return {
            "destination_country": dest_info.get("country"),
            "flag": dest_info.get("flag", "🌐"),
            "zone": dest_info.get("zone", "International"),
            "currency_symbol": dest_info.get("currency_symbol", "$"),
            "exchange_rate": exchange_rate,
            "chargeable_weight_kg": chargeable_weight_kg,
            "quotes": quotes,
            "customs_de_minimis_info": dest_info.get("customs_info", "Standard international postal customs rules apply.")
        }

tariff_engine = TariffEngineService()
