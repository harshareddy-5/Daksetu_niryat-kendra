from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import PackagingCalculateRequest, PackagingCalculateResponse
from app.services.tariff_engine import tariff_engine
from app.models.models import ExportSession, PackagingAdvice

router = APIRouter(prefix="/packaging", tags=["Smart Packaging Advisor"])

@router.post("/calculate", response_model=PackagingCalculateResponse)
async def calculate_packaging(request: PackagingCalculateRequest, db: Session = Depends(get_db)):
    """
    Step 5: Calculate volumetric weight, verify EMS postal constraints, and recommend packaging materials.
    """
    res = tariff_engine.calculate_dimensions_and_weight(
        length_cm=request.length_cm,
        width_cm=request.width_cm,
        height_cm=request.height_cm,
        actual_weight_kg=request.actual_weight_kg
    )

    if request.session_id:
        session = db.query(ExportSession).filter(ExportSession.id == request.session_id).first()
        if session:
            existing_pkg = db.query(PackagingAdvice).filter(PackagingAdvice.session_id == session.id).first()
            if not existing_pkg:
                existing_pkg = PackagingAdvice(session_id=session.id)
                db.add(existing_pkg)

            existing_pkg.length_cm = request.length_cm
            existing_pkg.width_cm = request.width_cm
            existing_pkg.height_cm = request.height_cm
            existing_pkg.actual_weight_kg = request.actual_weight_kg
            existing_pkg.volumetric_weight_kg = res["volumetric_weight_kg"]
            existing_pkg.chargeable_weight_kg = res["chargeable_weight_kg"]
            existing_pkg.box_recommendation = res["recommended_box_type"]
            existing_pkg.cushioning_advice = res["cushioning_advice"]
            existing_pkg.fits_ems_limits = res["fits_ems_limits"]
            existing_pkg.fragility_rating = "High" if request.is_fragile else "Medium"
            db.commit()

    return res
