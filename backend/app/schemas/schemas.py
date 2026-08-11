from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

# Base Schemas
class ProductAiAnalyzeRequest(BaseModel):
    session_id: Optional[str] = None
    image_base64: Optional[str] = None
    image_url: Optional[str] = None
    product_title_hint: Optional[str] = None
    craft_id_hint: Optional[str] = None

class HsCodeCandidate(BaseModel):
    hs_code: str
    chapter: str
    heading: str
    title: str
    description: str
    confidence: float
    gst_rate: float
    basic_customs_duty: float
    rodtep_rate: float
    duty_drawback_rate: float
    export_policy: str
    reasoning: str
    restrictions: List[str] = []

class VisualBoundingBox(BaseModel):
    label: str
    confidence: float
    box: List[float]  # [ymin, xmin, ymax, xmax] normalized 0-1
    color: str

class ProductAiAnalyzeResponse(BaseModel):
    identified_title: str
    craft_name: str
    state_origin: str
    category: str
    materials_detected: List[str]
    confidence_score: float
    bounding_boxes: List[VisualBoundingBox]
    hs_candidates: List[HsCodeCandidate]
    primary_hs_code: HsCodeCandidate
    explanation: str

# Document OCR Schemas
class DocumentOcrRequest(BaseModel):
    session_id: Optional[str] = None
    document_type: str  # INVOICE, IEC, PACKING_LIST, GI_CERT, LUT
    image_base64: Optional[str] = None
    demo_doc_id: Optional[str] = None

class OcrField(BaseModel):
    key: str
    label: str
    value: str
    confidence: float
    is_valid: bool
    validation_message: Optional[str] = None

class DocumentOcrResponse(BaseModel):
    document_type: str
    filename: str
    raw_text: str
    confidence: float
    status: str  # VALID, WARNING, INVALID
    extracted_fields: Dict[str, OcrField]
    summary_message: str

# Compliance Schemas
class ComplianceCheckItem(BaseModel):
    id: str
    category: str
    title: str
    description: str
    status: str  # PASS, WARNING, FAIL
    action_needed: Optional[str] = None
    regulatory_body: str

class ComplianceValidateRequest(BaseModel):
    session_id: Optional[str] = None
    product_category: str
    hs_code: str
    destination_country: str
    iec_number: Optional[str] = None
    invoice_value_inr: Optional[float] = None
    declared_weight_kg: Optional[float] = None
    is_wooden: Optional[bool] = False
    is_textile: Optional[bool] = False
    is_food_or_tea: Optional[bool] = False

class ComplianceValidateResponse(BaseModel):
    overall_status: str  # PASSED, WARNING, BLOCKED
    readiness_percentage: float
    total_checks: int
    passed_checks: int
    warning_checks: int
    failed_checks: int
    destination_info: Dict[str, Any]
    checks: List[ComplianceCheckItem]

# Packaging Schemas
class PackagingCalculateRequest(BaseModel):
    session_id: Optional[str] = None
    length_cm: float = Field(..., gt=0)
    width_cm: float = Field(..., gt=0)
    height_cm: float = Field(..., gt=0)
    actual_weight_kg: float = Field(..., gt=0)
    product_category: Optional[str] = "Handicrafts"
    is_fragile: Optional[bool] = False

class PackagingCalculateResponse(BaseModel):
    actual_weight_kg: float
    volumetric_weight_kg: float
    chargeable_weight_kg: float
    volumetric_divisor_used: int
    fits_ems_limits: bool
    max_length_allowed_cm: float
    max_combined_girth_cm: float
    actual_combined_girth_cm: float
    recommended_box_type: str
    cushioning_advice: str
    label_instructions: List[str]
    prohibited_items_check: str

# Shipping Schemas
class ShippingEstimateRequest(BaseModel):
    session_id: Optional[str] = None
    destination_code: str
    chargeable_weight_kg: float = Field(..., gt=0)
    product_value_inr: float = Field(default=2000.0, gt=0)
    service_type: Optional[str] = "international_ems"

class ServiceQuote(BaseModel):
    service_id: str
    name: str
    base_freight_inr: float
    fuel_surcharge_inr: float
    postal_gst_inr: float
    insurance_fee_inr: float
    total_cost_inr: float
    total_cost_usd: float
    transit_days_min: int
    transit_days_max: int
    max_weight_kg: float
    is_recommended: bool

class ShippingEstimateResponse(BaseModel):
    destination_country: str
    flag: str
    zone: str
    currency_symbol: str
    exchange_rate: float
    chargeable_weight_kg: float
    quotes: List[ServiceQuote]
    customs_de_minimis_info: str

# Readiness & Docket Schemas
class ReadinessScoreResponse(BaseModel):
    session_id: str
    overall_score: int  # 0 to 100
    grade: str  # Excellent, Ready, Action Required
    breakdown: Dict[str, int]
    gap_analysis: List[str]
    positive_highlights: List[str]

class PbeDocketGenerateResponse(BaseModel):
    session_id: str
    pbe_number: str
    tracking_barcode: str
    qr_code_base64: str
    postal_circle: str
    dnk_center_name: str
    docket_summary: Dict[str, Any]
    download_url: Optional[str] = None

# Session Schemas
class ExportSessionCreate(BaseModel):
    seller_name: Optional[str] = "Ramesh Kumar"
    seller_business: Optional[str] = "Channapatna Wooden Arts Cluster"
    seller_phone: Optional[str] = "+91 98450 12345"
    seller_state: Optional[str] = "Karnataka"
    destination_country: Optional[str] = "US"

class ExportSessionResponse(BaseModel):
    id: str
    seller_name: Optional[str]
    seller_business: Optional[str]
    destination_country: str
    status: str
    readiness_score: float
    pbe_number: Optional[str]
    created_at: datetime
    updated_at: datetime
