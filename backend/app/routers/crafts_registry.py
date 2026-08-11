from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import json
import os

from app.database import get_db
from app.config import settings
from app.models.models import ExportSession
from app.schemas.schemas import ExportSessionCreate, ExportSessionResponse

router = APIRouter(prefix="/crafts", tags=["GI Crafts & Export Sessions"])

@router.get("/gi-catalog")
async def get_gi_catalog():
    """
    Get list of preconfigured Indian GI Crafts for quick kiosk selection.
    """
    crafts_file = os.path.join(settings.DATA_DIR, "gi_crafts.json")
    if os.path.exists(crafts_file):
        with open(crafts_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.post("/sessions", response_model=ExportSessionResponse)
async def create_session(request: ExportSessionCreate, db: Session = Depends(get_db)):
    """
    Start a new export session for an artisan / kiosk user.
    """
    session = ExportSession(
        seller_name=request.seller_name,
        seller_business=request.seller_business,
        seller_phone=request.seller_phone,
        seller_state=request.seller_state,
        destination_country=request.destination_country,
        status="DRAFT"
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.get("/sessions/{session_id}", response_model=ExportSessionResponse)
async def get_session(session_id: str, db: Session = Depends(get_db)):
    """
    Retrieve current export session details.
    """
    session = db.query(ExportSession).filter(ExportSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Export session not found")
    return session
