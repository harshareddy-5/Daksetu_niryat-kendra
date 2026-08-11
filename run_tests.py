"""
DakSetu End-to-End Verification Test Script
Tests all core backend services without needing network or live server.
"""
import os
import sys

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

from app.services.vision_classifier import vision_service
from app.services.hs_code_engine import hs_engine
from app.services.ocr_service import ocr_service
from app.services.tariff_engine import tariff_engine
from app.services.pdf_generator import pdf_service

def test_daksetu_pipeline():
    print("==================================================")
    print(" RUNNING DAKSETU BACKEND TEST SUITE (DGKN-2026-09)")
    print("==================================================")

    # 1. Test Vision Classifier
    print("\n[1/6] Testing Vision Classifier Service...")
    v_res = vision_service.analyze_image(craft_id_hint="gi-001")
    assert v_res["identified_title"] == "Channapatna Wooden Toys"
    assert len(v_res["bounding_boxes"]) >= 2
    print(f" -> PASS: Identified craft: {v_res['identified_title']} (Confidence: {v_res['confidence_score']})")

    # 2. Test HS Code Engine
    print("\n[2/6] Testing HS Code Recommendation Engine...")
    hs_res = hs_engine.find_hs_candidates(
        category=v_res["category"],
        craft_name=v_res["craft_name"],
        materials=v_res["materials_detected"],
        target_code="9503.00.90"
    )
    assert len(hs_res) >= 1
    top_hs = hs_res[0]
    assert top_hs["hs_code"] == "9503.00.90"
    assert top_hs["rodtep_rate"] == 2.5
    print(f" -> PASS: Suggested HS Code: {top_hs['hs_code']} with RoDTEP {top_hs['rodtep_rate']}%")

    # 3. Test OCR Service
    print("\n[3/6] Testing Document OCR Parser...")
    ocr_res = ocr_service.process_document(doc_type="INVOICE")
    assert ocr_res["status"] == "VALID"
    assert "invoice_number" in ocr_res["extracted_fields"]
    inv_num = ocr_res["extracted_fields"]["invoice_number"]["value"]
    print(f" -> PASS: Extracted Invoice No: {inv_num} (Status: {ocr_res['status']})")

    # 4. Test Packaging & Volumetric Weight
    print("\n[4/6] Testing Packaging Dimensions & EMS Constraints...")
    pkg_res = tariff_engine.calculate_dimensions_and_weight(
        length_cm=25.0,
        width_cm=18.0,
        height_cm=12.0,
        actual_weight_kg=0.85
    )
    assert pkg_res["volumetric_weight_kg"] == 1.08
    assert pkg_res["chargeable_weight_kg"] == 1.08
    assert pkg_res["fits_ems_limits"] is True
    print(f" -> PASS: Volumetric Wt: {pkg_res['volumetric_weight_kg']}kg, Chargeable Wt: {pkg_res['chargeable_weight_kg']}kg")

    # 5. Test Shipping & India Post Tariffs
    print("\n[5/6] Testing India Post Tariff Rate Engine...")
    ship_res = tariff_engine.estimate_shipping_quotes(
        destination_code="US",
        chargeable_weight_kg=pkg_res["chargeable_weight_kg"],
        product_value_inr=20760.0
    )
    assert len(ship_res["quotes"]) >= 1
    ems_quote = next(q for q in ship_res["quotes"] if q["service_id"] == "international_ems")
    assert ems_quote["total_cost_inr"] > 0
    print(f" -> PASS: Destination: {ship_res['destination_country']} ({ship_res['flag']})")
    print(f"         EMS Rate: INR {ems_quote['total_cost_inr']} / USD ${ems_quote['total_cost_usd']}")

    # 6. Test PDF Docket & Barcode Generator
    print("\n[6/6] Testing PBE-I Docket & Postal Barcode Generation...")
    docket_res = pdf_service.generate_pbe_docket({
        "seller_name": "Sri Channapatna Crafts Producers Guild",
        "product_title": "Channapatna Wooden Toys",
        "hs_code": "9503.00.90",
        "destination_country": "United States",
        "gross_weight_kg": 1.08,
        "shipping_cost_inr": ems_quote["total_cost_inr"]
    })
    assert docket_res["pbe_number"].startswith("PBE-I/DNK-BLR/")
    assert docket_res["tracking_barcode"].startswith("EM")
    print(f" -> PASS: Generated PBE-I Docket: {docket_res['pbe_number']}")
    print(f"         Tracking Barcode: {docket_res['tracking_barcode']}")

    print("\n==================================================")
    print(" ALL 6 VERIFICATION CHECKS PASSED (100% SUCCESS) ")
    print("==================================================")

if __name__ == "__main__":
    test_daksetu_pipeline()
