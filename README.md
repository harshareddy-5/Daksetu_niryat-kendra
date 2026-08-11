# DAKSETU – SMART EXPORT ASSISTANT
### Dak Ghar Niryat Kendra AI Assistant
**Problem Statement ID:** DGKN-2026-09  
**Theme:** E-Governance / Logistics / Supply Chain  
**Category:** Smart India Hackathon Prototype

---

## 🌟 Overview

**DakSetu** is an AI-powered Kiosk and Progressive Web Application (PWA) designed for **Dak Ghar Niryat Kendras (DNK)** to empower rural artisans, MSMEs, self-help groups, and micro-sellers across India to export their authentic handicraft products worldwide through India Post international postal networks.

---

## 🚀 Key Features & 7-Stage Intelligence Workflow

```
PRODUCT PHOTO 
  → AI PRODUCT IDENTIFICATION & ATTRIBUTES
  → ITC-HS CODE RECOMMENDATION (with RoDTEP & Duty Drawback)
  → DOCUMENT OCR & VALIDATION (Invoice, IEC, Packing List, GI Tag)
  → 10-POINT COMPLIANCE RULES ENGINE (US Section 321, UK VAT, CEPA)
  → AI SMART PACKAGING & VOLUMETRIC WEIGHT ADVISOR
  → INDIA POST SHIPPING & TARIFF ESTIMATOR (EMS / Air Parcel)
  → EXPORT READINESS SCORE (0-100) & PBE-I DOCKET GENERATION
```

1. **Vision AI Photo Ingestion:** Computer vision model detects craft category, material composition (e.g., Ivory wood, Katan silk, Multani Mitti), and state of origin.
2. **Intelligent HS Code Engine:** Semantic matching over ITC-HS 2022 codes with explainability reasoning, customs duties, and RoDTEP incentive rebates.
3. **Document OCR & Extraction:** Scans Commercial Invoices, DGFT Importer-Exporter Codes (IEC), Packing Lists, and GI Certificates with bounding-box review.
4. **10-Point Compliance Engine:** Automatic cross-validation of invoice values, PAN/IEC linkage, destination country de minimis thresholds, ISPM-15 phytosanitary rules, and IATA non-dangerous goods standards.
5. **Smart Packaging Advisor:** 3D parcel simulation, volumetric weight calculation `(L×W×H)/5000`, cushioning advice, and India Post EMS dimension constraint validation.
6. **India Post Shipping Estimator:** Real-time tariff calculation comparing International EMS Speed Post, Air Parcel, and Tracked Packet with fuel surcharges, GST, transit times, and currency conversion.
7. **Postal Bill of Export (PBE-I) Docket:** 0-100 Export Readiness Score, printable official PBE-I customs declaration docket, and high-density scannable barcode label.
8. **Postal Counter Officer Portal:** Specialized counter mode for postal officers to lookup dockets, verify physical scale readings, stamp clearances, and generate outward dispatch manifests.
9. **Rural Accessibility:** Bilingual toggle (English & Hindi), Voice Audio Guidance Narrator (Text-to-Speech), and high-contrast touch-screen kiosk mode.

---

## 🛠️ Technology Stack

- **Frontend:**
  - React 18 & TypeScript
  - Vite
  - Tailwind CSS with GovTech / India Post design tokens
  - Lucide React Icons
  - React Router DOM
  - HTML5 Web Speech API (Voice Narrator) & Canvas Bounding Boxes
- **Backend:**
  - Python 3.12+
  - FastAPI
  - Pydantic v2
  - SQLAlchemy ORM (SQLite / PostgreSQL auto-switch)
  - Uvicorn
- **AI & Domain Engines:**
  - Computer Vision Classifier
  - ITC-HS Code Semantic Discovery Engine
  - Document OCR Parser & Regex Validator
  - India Post International DNK Tariff & Volumetric Calculator
  - Electronic Postal Bill of Export (PBE-I) Generator

---

## ⚡ Quick Start & Running Locally

### Option 1: One-Click Launch (Windows)
Double-click `start_all.bat` in the root folder. It will launch both the FastAPI backend and the Vite frontend simultaneously.

### Option 2: Manual Start

#### 1. Backend:
```bash
cd backend
pip install -r requirements.txt
python run.py
```
- **Backend API:** http://localhost:8000
- **Interactive OpenAPI Swagger Docs:** http://localhost:8000/docs

#### 2. Frontend:
```bash
cd frontend
npm install
npm run dev
```
- **Frontend Kiosk App:** http://localhost:5173

---

## 🧪 Verification & Test Suite

To verify all backend AI engines and tariff calculation logic:
```bash
python run_tests.py
```

---

## 📂 Project Structure

```
Smart india hacakathon/
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   └── data/
│   │       ├── hs_codes_db.json
│   │       ├── gi_crafts.json
│   │       └── postal_rates.json
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── steps/
│   │   ├── store/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── start_backend.bat
├── start_frontend.bat
├── start_all.bat
├── run_tests.py
└── README.md
```

---

*Developed for Smart India Hackathon (SIH) – Dak Ghar Niryat Kendra AI Assistant (DGKN-2026-09).*
