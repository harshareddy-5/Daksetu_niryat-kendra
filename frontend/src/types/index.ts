export type ExportStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface VisualBoundingBox {
  label: string;
  confidence: number;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] 0-1
  color: string;
}

export interface HsCodeCandidate {
  hs_code: string;
  chapter: string;
  heading: string;
  title: string;
  description: string;
  confidence: number;
  gst_rate: number;
  basic_customs_duty: number;
  rodtep_rate: number;
  duty_drawback_rate: number;
  export_policy: string;
  reasoning: string;
  restrictions: string[];
}

export interface ProductAnalysisState {
  photoPreview: string | null;
  productTitle: string;
  craftName: string;
  stateOrigin: string;
  category: string;
  materialsDetected: string[];
  confidenceScore: number;
  boundingBoxes: VisualBoundingBox[];
  hsCandidates: HsCodeCandidate[];
  selectedHsCode: HsCodeCandidate | null;
  explanation: string;
}

export interface OcrField {
  key: string;
  label: string;
  value: string;
  confidence: number;
  is_valid: boolean;
  validation_message?: string;
}

export interface DocumentAuditItem {
  id: string;
  type: 'INVOICE' | 'IEC' | 'PACKING_LIST' | 'GI_CERT' | 'LUT';
  name: string;
  rawText: string;
  confidence: number;
  status: 'VALID' | 'WARNING' | 'INVALID';
  fields: Record<string, OcrField>;
  uploaded: boolean;
}

export interface ComplianceCheck {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  action_needed?: string;
  regulatory_body: string;
}

export interface PackagingState {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  fitsEmsLimits: boolean;
  maxCombinedGirthCm: number;
  actualCombinedGirthCm: number;
  recommendedBoxType: string;
  cushioningAdvice: string;
  isFragile: boolean;
}

export interface ServiceQuote {
  service_id: string;
  name: string;
  base_freight_inr: number;
  fuel_surcharge_inr: number;
  postal_gst_inr: number;
  insurance_fee_inr: number;
  total_cost_inr: number;
  total_cost_usd: number;
  transit_days_min: number;
  transit_days_max: number;
  max_weight_kg: number;
  is_recommended: boolean;
}

export interface ShippingState {
  destinationCode: string;
  destinationName: string;
  flag: string;
  zone: string;
  currencySymbol: string;
  exchangeRate: number;
  productValueInr: number;
  selectedService: string;
  quotes: ServiceQuote[];
  customsInfo: string;
}

export interface ExportDocketSummary {
  pbeNumber: string;
  trackingBarcode: string;
  qrPayloadBase64: string;
  dnkCenterName: string;
  postalCircle: string;
  generatedAt: string;
  overallScore: number;
  grade: string;
}

export interface GiCraftProfile {
  id: string;
  name: string;
  hindi_name: string;
  state: string;
  gi_tag_no: string;
  category: string;
  default_hs_code: string;
  artisan_community: string;
  material: string;
  typical_weight_kg: number;
  typical_dimensions_cm: { length: number; width: number; height: number };
  fragility: string;
  moisture_sensitive: boolean;
  recommended_box_type: string;
  sample_image: string;
  suggested_price_inr: number;
}
