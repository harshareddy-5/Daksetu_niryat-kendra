from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os
import uuid

from app.database import get_db
from app.config import settings
from app.schemas.schemas import DocumentOcrRequest, DocumentOcrResponse
from app.services.ocr_service import ocr_service
from app.models.models import ExportSession, DocumentAudit

router = APIRouter(prefix="/ocr", tags=["Document OCR & Extraction"])

@router.post("/parse-doc", response_model=DocumentOcrResponse)
async def parse_document(request: DocumentOcrRequest, db: Session = Depends(get_db)):
    """
    Step 3: OCR parser for Commercial Invoices, IEC, Packing List, and GI Tags.
    """
    result = ocr_service.process_document(
        doc_type=request.document_type,
        demo_id=request.demo_doc_id
    )

    if request.session_id:
        session = db.query(ExportSession).filter(ExportSession.id == request.session_id).first()
        if session:
            doc_audit = DocumentAudit(
                session_id=session.id,
                document_type=result["document_type"],
                filename=result["filename"],
                ocr_text=result["raw_text"],
                extracted_fields=result["extracted_fields"],
                verification_status=result["status"],
                confidence=result["confidence"]
            )
            db.add(doc_audit)
            db.commit()

    return result

@router.post("/upload")
async def upload_document_file(
    file: UploadFile = File(...),
    document_type: str = Form("INVOICE"),
    session_id: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Direct file upload endpoint for scanning physical documents.
    """
    file_ext = os.path.splitext(file.filename)[1]
    safe_filename = f"{uuid.uuid4().hex[:8]}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, safe_filename)

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    result = ocr_service.process_document(doc_type=document_type)
    result["filename"] = file.filename

    return result
