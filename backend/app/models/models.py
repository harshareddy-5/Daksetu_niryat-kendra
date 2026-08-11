import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class ExportSession(Base):
    __tablename__ = "export_sessions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    seller_name = Column(String(100), nullable=True)
    seller_business = Column(String(150), nullable=True)
    seller_phone = Column(String(20), nullable=True)
    seller_state = Column(String(50), nullable=True)
    iec_number = Column(String(20), nullable=True)
    gstin = Column(String(20), nullable=True)
    destination_country = Column(String(50), default="US")
    status = Column(String(30), default="DRAFT")  # DRAFT, ANALYZED, READY_FOR_DISPATCH, DISPATCHED
    readiness_score = Column(Float, default=0.0)
    pbe_number = Column(String(40), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    product_analysis = relationship("ProductAnalysis", back_populates="session", uselist=False, cascade="all, delete-orphan")
    documents = relationship("DocumentAudit", back_populates="session", cascade="all, delete-orphan")
    compliance = relationship("ComplianceResult", back_populates="session", uselist=False, cascade="all, delete-orphan")
    packaging = relationship("PackagingAdvice", back_populates="session", uselist=False, cascade="all, delete-orphan")
    shipping = relationship("ShippingCalculation", back_populates="session", uselist=False, cascade="all, delete-orphan")
    docket = relationship("PbeDocket", back_populates="session", uselist=False, cascade="all, delete-orphan")

class ProductAnalysis(Base):
    __tablename__ = "product_analyses"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("export_sessions.id"))
    product_title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    material_detected = Column(String(200), nullable=True)
    selected_hs_code = Column(String(20), nullable=False)
    confidence_score = Column(Float, default=0.95)
    image_url = Column(Text, nullable=True)
    ai_breakdown_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ExportSession", back_populates="product_analysis")

class DocumentAudit(Base):
    __tablename__ = "document_audits"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("export_sessions.id"))
    document_type = Column(String(50), nullable=False)  # INVOICE, IEC, PACKING_LIST, GI_CERT, LUT
    filename = Column(String(255), nullable=False)
    ocr_text = Column(Text, nullable=True)
    extracted_fields = Column(JSON, nullable=True)
    verification_status = Column(String(20), default="VALID")  # VALID, WARNING, INVALID
    confidence = Column(Float, default=0.92)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ExportSession", back_populates="documents")

class ComplianceResult(Base):
    __tablename__ = "compliance_results"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("export_sessions.id"))
    overall_status = Column(String(20), default="PASSED")
    total_checks = Column(Integer, default=10)
    passed_checks = Column(Integer, default=9)
    warning_checks = Column(Integer, default=1)
    failed_checks = Column(Integer, default=0)
    audit_trail_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ExportSession", back_populates="compliance")

class PackagingAdvice(Base):
    __tablename__ = "packaging_advices"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("export_sessions.id"))
    length_cm = Column(Float, nullable=False)
    width_cm = Column(Float, nullable=False)
    height_cm = Column(Float, nullable=False)
    actual_weight_kg = Column(Float, nullable=False)
    volumetric_weight_kg = Column(Float, nullable=False)
    chargeable_weight_kg = Column(Float, nullable=False)
    box_recommendation = Column(String(150), nullable=True)
    cushioning_advice = Column(Text, nullable=True)
    fits_ems_limits = Column(Boolean, default=True)
    fragility_rating = Column(String(20), default="Medium")
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ExportSession", back_populates="packaging")

class ShippingCalculation(Base):
    __tablename__ = "shipping_calculations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("export_sessions.id"))
    destination_country = Column(String(50), nullable=False)
    selected_service = Column(String(50), default="international_ems")
    base_freight_inr = Column(Float, default=0.0)
    fuel_surcharge_inr = Column(Float, default=0.0)
    postal_gst_inr = Column(Float, default=0.0)
    insurance_fee_inr = Column(Float, default=0.0)
    total_cost_inr = Column(Float, default=0.0)
    total_cost_usd = Column(Float, default=0.0)
    transit_days_min = Column(Integer, default=4)
    transit_days_max = Column(Integer, default=8)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ExportSession", back_populates="shipping")

class PbeDocket(Base):
    __tablename__ = "pbe_dockets"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("export_sessions.id"))
    pbe_number = Column(String(50), unique=True, nullable=False)
    tracking_barcode = Column(String(50), nullable=False)
    qr_payload = Column(Text, nullable=False)
    pdf_filename = Column(String(255), nullable=True)
    postal_counter_dnk_code = Column(String(50), default="DNK-BLR-04")
    officer_stamped = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ExportSession", back_populates="docket")
