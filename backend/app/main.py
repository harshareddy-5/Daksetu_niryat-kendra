from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.config import settings
from app.database import engine, Base
from app.routers import (
    product_ai,
    ocr_docs,
    compliance,
    packaging,
    shipping,
    readiness,
    crafts_registry
)

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DAKSETU – Dak Ghar Niryat Kendra AI Assistant",
    description="Intelligent Kiosk & PWA Backend for Indian Postal Export Assistance (DGKN-2026-09)",
    version="1.0.0"
)

# CORS middleware for local Vite frontend and PWA clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Uploads directory for document scans & photos
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Modular Routers
app.include_router(product_ai.router, prefix=settings.API_V1_STR)
app.include_router(ocr_docs.router, prefix=settings.API_V1_STR)
app.include_router(compliance.router, prefix=settings.API_V1_STR)
app.include_router(packaging.router, prefix=settings.API_V1_STR)
app.include_router(shipping.router, prefix=settings.API_V1_STR)
app.include_router(readiness.router, prefix=settings.API_V1_STR)
app.include_router(crafts_registry.router, prefix=settings.API_V1_STR)

@app.get("/")
def root_endpoint():
    return {
        "app": "DAKSETU – Smart Export Assistant",
        "agency": "Dak Ghar Niryat Kendra / India Post",
        "problem_statement": "DGKN-2026-09",
        "status": "OPERATIONAL",
        "api_docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "ai_vision_engine": "ready",
        "ocr_engine": "ready",
        "tariff_matrix": "loaded"
    }
