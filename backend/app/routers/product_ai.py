from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import json

from app.database import get_db
from app.schemas.schemas import ProductAiAnalyzeRequest, ProductAiAnalyzeResponse
from app.services.vision_classifier import vision_service
from app.services.hs_code_engine import hs_engine
from app.models.models import ExportSession, ProductAnalysis

router = APIRouter(prefix="/product", tags=["Product AI & Classification"])

@router.post("/analyze", response_model=ProductAiAnalyzeResponse)
async def analyze_product(request: ProductAiAnalyzeRequest, db: Session = Depends(get_db)):
    """
    Step 1 & 2: Process product photo, detect craft type, extract materials, and suggest HS Codes with RoDTEP rates.
    """
    analysis_res = vision_service.analyze_image(
        craft_id_hint=request.craft_id_hint,
        title_hint=request.product_title_hint,
        image_base64=request.image_base64
    )

    # Get HS Code candidates with explainability
    hs_candidates = hs_engine.find_hs_candidates(
        category=analysis_res["category"],
        craft_name=analysis_res["craft_name"],
        materials=analysis_res["materials_detected"],
        target_code=analysis_res.get("default_hs_code")
    )

    primary_hs = hs_candidates[0] if hs_candidates else None

    # Persist if session_id provided
    if request.session_id:
        session = db.query(ExportSession).filter(ExportSession.id == request.session_id).first()
        if session:
            existing_pa = db.query(ProductAnalysis).filter(ProductAnalysis.session_id == session.id).first()
            if not existing_pa:
                existing_pa = ProductAnalysis(session_id=session.id)
                db.add(existing_pa)

            existing_pa.product_title = analysis_res["identified_title"]
            existing_pa.category = analysis_res["category"]
            existing_pa.material_detected = ", ".join(analysis_res["materials_detected"])
            existing_pa.selected_hs_code = primary_hs["hs_code"] if primary_hs else "9503.00.90"
            existing_pa.confidence_score = analysis_res["confidence_score"]
            existing_pa.ai_breakdown_json = analysis_res
            db.commit()

    return {
        "identified_title": analysis_res["identified_title"],
        "craft_name": analysis_res["craft_name"],
        "state_origin": analysis_res["state_origin"],
        "category": analysis_res["category"],
        "materials_detected": analysis_res["materials_detected"],
        "confidence_score": analysis_res["confidence_score"],
        "bounding_boxes": analysis_res["bounding_boxes"],
        "hs_candidates": hs_candidates,
        "primary_hs_code": primary_hs,
        "explanation": analysis_res["explanation"]
    }
