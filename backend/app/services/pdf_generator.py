import uuid
import base64
import json
from datetime import datetime
from typing import Dict, Any

class PdfGeneratorService:
    def generate_pbe_docket(self, session_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate PBE-I number, postal tracking barcode, QR payload, and structured docket summary.
        """
        year = datetime.utcnow().strftime("%Y")
        random_seq = str(uuid.uuid4().int)[:6]
        pbe_number = f"PBE-I/DNK-BLR/{year}/{random_seq}"
        tracking_barcode = f"EM{random_seq}982IN"

        qr_data = {
            "pbe": pbe_number,
            "tracking": tracking_barcode,
            "iec": session_data.get("iec_number", "0718049215"),
            "hs_code": session_data.get("hs_code", "9503.00.90"),
            "destination": session_data.get("destination_country", "US"),
            "gross_weight_kg": session_data.get("gross_weight_kg", 5.40),
            "dnk_center": "DNK Bangalore GPO Hub - 560001",
            "timestamp": datetime.utcnow().isoformat(),
            "status": "CUSTOMS_CLEARED_AUTOMATED"
        }

        qr_json_str = json.dumps(qr_data)
        qr_base64 = base64.b64encode(qr_json_str.encode("utf-8")).decode("utf-8")

        return {
            "pbe_number": pbe_number,
            "tracking_barcode": tracking_barcode,
            "qr_code_base64": qr_base64,
            "postal_circle": "Karnataka Postal Circle",
            "dnk_center_name": "Dak Ghar Niryat Kendra - Bangalore GPO Export Hub",
            "docket_summary": {
                "pbe_number": pbe_number,
                "tracking_number": tracking_barcode,
                "seller_name": session_data.get("seller_name", "Sri Channapatna Crafts Producers Guild"),
                "product_title": session_data.get("product_title", "Handcrafted Channapatna Wooden Toys"),
                "hs_code": session_data.get("hs_code", "9503.00.90"),
                "destination_country": session_data.get("destination_country", "United States"),
                "chargeable_weight_kg": session_data.get("gross_weight_kg", 5.40),
                "total_shipping_inr": session_data.get("shipping_cost_inr", 2840.0),
                "export_incentive_rodtep": "2.5% (approx ₹519 INR claimable)",
                "customs_declaration": "Postal Bill of Export filed electronically under Section 84 of Customs Act, 1962.",
                "verification_status": "APPROVED FOR POSTAL INTAKE"
            },
            "download_url": f"/api/readiness/download-docket/{pbe_number.replace('/', '_')}"
        }

pdf_service = PdfGeneratorService()
