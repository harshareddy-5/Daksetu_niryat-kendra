import axios from 'axios';
import {
  ProductAnalysisState,
  HsCodeCandidate,
  ComplianceCheck,
  PackagingState,
  ShippingState,
  DocumentAuditItem,
  ExportDocketSummary
} from '../types';

// Use environment variable if deployed globally, fallback to local proxy /api
const envBase = (import.meta as any).env?.VITE_API_BASE_URL;
const API_BASE = envBase ? `${envBase.replace(/\/$/, '')}/api` : '/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // 1. Analyze Product
  analyzeProduct: async (payload: {
    image_base64?: string;
    product_title_hint?: string;
    craft_id_hint?: string;
  }) => {
    try {
      const res = await client.post('/product/analyze', payload);
      return res.data;
    } catch (err) {
      console.warn('Backend API unavailable, using client-side AI inference fallback');
      return null;
    }
  },

  // 2. Parse Document OCR
  parseDocument: async (docType: string, demoId?: string) => {
    try {
      const res = await client.post('/ocr/parse-doc', {
        document_type: docType,
        demo_doc_id: demoId
      });
      return res.data;
    } catch (err) {
      console.warn('OCR API fallback');
      return null;
    }
  },

  // 3. Validate Compliance
  validateCompliance: async (payload: {
    product_category: string;
    hs_code: string;
    destination_country: string;
    iec_number?: string;
    is_wooden?: boolean;
  }) => {
    try {
      const res = await client.post('/compliance/validate', payload);
      return res.data;
    } catch (err) {
      console.warn('Compliance API fallback');
      return null;
    }
  },

  // 4. Calculate Packaging
  calculatePackaging: async (payload: {
    length_cm: number;
    width_cm: number;
    height_cm: number;
    actual_weight_kg: number;
    is_fragile?: boolean;
  }) => {
    try {
      const res = await client.post('/packaging/calculate', payload);
      return res.data;
    } catch (err) {
      console.warn('Packaging API fallback');
      return null;
    }
  },

  // 5. Estimate Shipping
  estimateShipping: async (payload: {
    destination_code: string;
    chargeable_weight_kg: number;
    product_value_inr?: number;
  }) => {
    try {
      const res = await client.post('/shipping/estimate', payload);
      return res.data;
    } catch (err) {
      console.warn('Shipping API fallback');
      return null;
    }
  },

  // 6. Generate Docket
  generateDocket: async (payload: any) => {
    try {
      const res = await client.post('/readiness/generate-docket', payload);
      return res.data;
    } catch (err) {
      console.warn('Docket API fallback');
      return null;
    }
  }
};
