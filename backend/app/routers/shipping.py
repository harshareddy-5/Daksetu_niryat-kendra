from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import ShippingEstimateRequest, ShippingEstimateResponse
from app.services.tariff_engine import tariff_engine
from app.models.models import ExportSession, ShippingCalculation

router = APIRouter(prefix="/shipping", tags=["Shipping & Tariff Estimator"])

@router.post("/estimate", response_model=ShippingEstimateResponse)
async def estimate_shipping(request: ShippingEstimateRequest, db: Session = Depends(get_db)):
    """
    Step 6: Calculate India Post International DNK shipping rates, transit times, and fees.
    """
    res = tariff_engine.estimate_shipping_quotes(
        destination_code=request.destination_code,
        chargeable_weight_kg=request.chargeable_weight_kg,
        product_value_inr=request.product_value_inr
    )

    if request.session_id:
        session = db.query(ExportSession).filter(ExportSession.id == request.session_id).first()
        if session and res["quotes"]:
            recommended = next((q for q in res["quotes"] if q["is_recommended"]), res["quotes"][0])
            existing_ship = db.query(ShippingCalculation).filter(ShippingCalculation.session_id == session.id).first()
            if not existing_ship:
                existing_ship = ShippingCalculation(session_id=session.id)
                db.add(existing_ship)

            existing_ship.destination_country = res["destination_country"]
            existing_ship.selected_service = recommended["service_id"]
            existing_ship.base_freight_inr = recommended["base_freight_inr"]
            existing_ship.fuel_surcharge_inr = recommended["fuel_surcharge_inr"]
            existing_ship.postal_gst_inr = recommended["postal_gst_inr"]
            existing_ship.insurance_fee_inr = recommended["insurance_fee_inr"]
            existing_ship.total_cost_inr = recommended["total_cost_inr"]
            existing_ship.total_cost_usd = recommended["total_cost_usd"]
            existing_ship.transit_days_min = recommended["transit_days_min"]
            existing_ship.transit_days_max = recommended["transit_days_max"]
            db.commit()

    return res
