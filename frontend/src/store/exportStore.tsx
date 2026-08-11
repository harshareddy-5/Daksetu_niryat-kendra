import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ExportStep,
  ProductAnalysisState,
  DocumentAuditItem,
  ComplianceCheck,
  PackagingState,
  ShippingState,
  ExportDocketSummary,
  GiCraftProfile,
  HsCodeCandidate
} from '../types';
import { SAMPLE_GI_CRAFTS, INITIAL_HS_CANDIDATES, INITIAL_DOCUMENTS, DESTINATION_COUNTRIES } from '../utils/mockData';

interface ExportContextType {
  currentStep: ExportStep;
  setCurrentStep: (step: ExportStep) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  isKioskMode: boolean;
  setIsKioskMode: (kiosk: boolean) => void;
  isVoiceActive: boolean;
  setIsVoiceActive: (active: boolean) => void;
  speakVoicePrompt: (text: string) => void;

  // Step 1 & 2
  product: ProductAnalysisState;
  setProduct: React.Dispatch<React.SetStateAction<ProductAnalysisState>>;
  selectGiCraft: (craft: GiCraftProfile) => void;
  selectHsCode: (hs: HsCodeCandidate) => void;

  // Step 3
  documents: DocumentAuditItem[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentAuditItem[]>>;
  addDocument: (doc: DocumentAuditItem) => void;

  // Step 4
  complianceChecks: ComplianceCheck[];
  setComplianceChecks: React.Dispatch<React.SetStateAction<ComplianceCheck[]>>;

  // Step 5
  packaging: PackagingState;
  setPackaging: React.Dispatch<React.SetStateAction<PackagingState>>;

  // Step 6
  shipping: ShippingState;
  setShipping: React.Dispatch<React.SetStateAction<ShippingState>>;

  // Step 7
  docket: ExportDocketSummary;
  setDocket: React.Dispatch<React.SetStateAction<ExportDocketSummary>>;

  resetSession: () => void;
}

const ExportContext = createContext<ExportContextType | undefined>(undefined);

export const ExportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<ExportStep>(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isKioskMode, setIsKioskMode] = useState<boolean>(true);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  // Initial Product State
  const defaultCraft = SAMPLE_GI_CRAFTS[0];
  const [product, setProduct] = useState<ProductAnalysisState>({
    photoPreview: defaultCraft.sample_image,
    productTitle: defaultCraft.name,
    craftName: defaultCraft.name,
    stateOrigin: defaultCraft.state,
    category: defaultCraft.category,
    materialsDetected: ["Ivory Wood (Aale Mara)", "Natural Lacquer", "Vegetable Dyes"],
    confidenceScore: 0.98,
    boundingBoxes: [
      { label: "Artisan Wood Craft: Channapatna Toy", confidence: 0.98, box: [0.12, 0.18, 0.88, 0.82], color: "#EA580C" },
      { label: "Natural Lacquer Surface Finish", confidence: 0.92, box: [0.35, 0.25, 0.70, 0.65], color: "#059669" }
    ],
    hsCandidates: INITIAL_HS_CANDIDATES,
    selectedHsCode: INITIAL_HS_CANDIDATES[0],
    explanation: "AI Vision identified authentic hand-turned lacquer wooden toy from Ramanagara, Karnataka. Categorized under Chapter 95 toys with eligible 2.5% RoDTEP export incentive."
  });

  // Step 3 Documents
  const [documents, setDocuments] = useState<DocumentAuditItem[]>(INITIAL_DOCUMENTS);

  // Step 4 Compliance
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([
    { id: "CHK-01", category: "Exporter Credentials", title: "DGFT Importer-Exporter Code (IEC)", description: "IEC 0718049215 active with linked PAN on DGFT registry.", status: "PASS", regulatory_body: "DGFT" },
    { id: "CHK-02", category: "Tax Compliance", title: "GST & Letter of Undertaking (LUT)", description: "Zero-rated export supply under active LUT certificate.", status: "PASS", regulatory_body: "CBIC / GST Council" },
    { id: "CHK-03", category: "Classification", title: "ITC-HS Code Alignment", description: "Declared HS Code 9503.00.90 matches handcrafted toy category.", status: "PASS", regulatory_body: "Customs Tariff Act" },
    { id: "CHK-04", category: "Postal Bill of Export", title: "DNK Commercial Export Eligibility", description: "Within Section 84 Customs Act commercial postal ceiling.", status: "PASS", regulatory_body: "Department of Posts" },
    { id: "CHK-05", category: "Destination Customs", title: "US CBP Section 321 De Minimis Clearance", description: "Consignment value under $800 duty-free threshold.", status: "PASS", regulatory_body: "US Customs & Border Protection" },
    { id: "CHK-06", category: "Consumer Safety", title: "US CPSC Toy Safety Exemption", description: "Handcrafted folk collector item declaration attached.", status: "PASS", regulatory_body: "CPSC" },
    { id: "CHK-07", category: "Phytosanitary", title: "ISPM-15 & Non-CITES Verification", description: "Made of Wrightia Tinctoria - exempt from CITES restrictions.", status: "PASS", regulatory_body: "Plant Quarantine Division" },
    { id: "CHK-08", category: "Safety", title: "IATA / Postal Non-DGR Dangerous Goods Check", description: "Zero hazardous flammables, batteries, or compressed gas.", status: "PASS", regulatory_body: "Universal Postal Union" },
    { id: "CHK-09", category: "Incentives", title: "RoDTEP Export Incentive", description: "2.5% export rebate automatically claimable on PBE-I filing.", status: "PASS", regulatory_body: "DGFT" },
    { id: "CHK-10", category: "Invoice Consistency", title: "FOB Value & Weight Cross-Check", description: "Invoice ($240.00) matches packing list physical gross weight.", status: "PASS", regulatory_body: "DNK Inspection Desk" }
  ]);

  // Step 5 Packaging
  const [packaging, setPackaging] = useState<PackagingState>({
    lengthCm: 25,
    widthCm: 18,
    heightCm: 12,
    actualWeightKg: 0.85,
    volumetricWeightKg: 1.08,
    chargeableWeightKg: 1.08,
    fitsEmsLimits: true,
    maxCombinedGirthCm: 300,
    actualCombinedGirthCm: 85,
    recommendedBoxType: "3-ply Corrugated Craft Box with Shredded Kraft Paper Cushioning",
    cushioningAdvice: "Wrap each wooden piece in 15mm honeycomb tissue wrap. Fill carton void with shredded kraft paper. Place moisture-absorbent silica gel pouch.",
    isFragile: false
  });

  // Step 6 Shipping
  const [shipping, setShipping] = useState<ShippingState>({
    destinationCode: "US",
    destinationName: "United States",
    flag: "🇺🇸",
    zone: "Zone 5 - Americas",
    currencySymbol: "$",
    exchangeRate: 86.5,
    productValueInr: 20760,
    selectedService: "international_ems",
    quotes: [
      {
        service_id: "international_ems",
        name: "India Post International EMS (Speed Post)",
        base_freight_inr: 2510,
        fuel_surcharge_inr: 213.35,
        postal_gst_inr: 490.20,
        insurance_fee_inr: 311.40,
        total_cost_inr: 3524.95,
        total_cost_usd: 40.75,
        transit_days_min: 4,
        transit_days_max: 8,
        max_weight_kg: 30,
        is_recommended: true
      },
      {
        service_id: "air_parcel",
        name: "India Post International Air Parcel",
        base_freight_inr: 2330,
        fuel_surcharge_inr: 198.05,
        postal_gst_inr: 455.05,
        insurance_fee_inr: 311.40,
        total_cost_inr: 3294.50,
        total_cost_usd: 38.08,
        transit_days_min: 8,
        transit_days_max: 14,
        max_weight_kg: 20,
        is_recommended: false
      },
      {
        service_id: "tracked_packet",
        name: "International Tracked Packet Service (ITPS)",
        base_freight_inr: 1370,
        fuel_surcharge_inr: 116.45,
        postal_gst_inr: 267.56,
        insurance_fee_inr: 0,
        total_cost_inr: 1754.01,
        total_cost_usd: 20.27,
        transit_days_min: 7,
        transit_days_max: 12,
        max_weight_kg: 2,
        is_recommended: false
      }
    ],
    customsInfo: "US Section 321 de minimis allows duty-free entry for orders under $800. Fast customs clearance at JFK / ORD / LAX."
  });

  // Step 7 Docket Summary
  const [docket, setDocket] = useState<ExportDocketSummary>({
    pbeNumber: "PBE-I/DNK-BLR/2026/084291",
    trackingBarcode: "EM84291982IN",
    qrPayloadBase64: "UEJFLUk6IFBCRS1JL0ROSy1CTFIvMjAyNi8wODQyOTEgLSBJRUM6IDA3MTgwNDkyMTUgLSBEZXN0OiBVUyAtIEl0ZW06IENoYW5uYXBhdG5hIFdvb2RlbiBUb3lz",
    dnkCenterName: "Dak Ghar Niryat Kendra - Bengaluru GPO Hub (560001)",
    postalCircle: "Karnataka Postal Circle",
    generatedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    overallScore: 96,
    grade: "Export Ready (Fast-Track)"
  });

  // Text-To-Speech audio helper
  const speakVoicePrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const selectGiCraft = (craft: GiCraftProfile) => {
    setProduct({
      photoPreview: craft.sample_image,
      productTitle: craft.name,
      craftName: craft.name,
      stateOrigin: craft.state,
      category: craft.category,
      materialsDetected: craft.material.split(',').map(m => m.trim()),
      confidenceScore: 0.98,
      boundingBoxes: [
        { label: `GI Craft: ${craft.name}`, confidence: 0.98, box: [0.10, 0.15, 0.90, 0.85], color: "#EA580C" },
        { label: "Material Texture Analysis", confidence: 0.93, box: [0.30, 0.25, 0.70, 0.70], color: "#059669" }
      ],
      hsCandidates: [
        {
          hs_code: craft.default_hs_code,
          chapter: craft.default_hs_code.slice(0, 2),
          heading: craft.default_hs_code.slice(0, 4),
          title: craft.name,
          description: `Handcrafted traditional item made of ${craft.material}`,
          confidence: 0.98,
          gst_rate: 12.0,
          basic_customs_duty: 0.0,
          rodtep_rate: 2.5,
          duty_drawback_rate: 1.8,
          export_policy: "Free",
          reasoning: `Categorized under Chapter ${craft.default_hs_code.slice(0,2)} as authentic GI product from ${craft.state}. Eligible for 2.5% RoDTEP export rebate.`,
          restrictions: ["GI Tag Verification", "Postal Bill of Export PBE-I"]
        }
      ],
      selectedHsCode: {
        hs_code: craft.default_hs_code,
        chapter: craft.default_hs_code.slice(0, 2),
        heading: craft.default_hs_code.slice(0, 4),
        title: craft.name,
        description: `Handcrafted traditional item made of ${craft.material}`,
        confidence: 0.98,
        gst_rate: 12.0,
        basic_customs_duty: 0.0,
        rodtep_rate: 2.5,
        duty_drawback_rate: 1.8,
        export_policy: "Free",
        reasoning: `Categorized under Chapter ${craft.default_hs_code.slice(0,2)} as authentic GI product from ${craft.state}. Eligible for 2.5% RoDTEP export rebate.`,
        restrictions: ["GI Tag Verification", "Postal Bill of Export PBE-I"]
      },
      explanation: `Authentic Geographical Indication craft (${craft.gi_tag_no}) from ${craft.state}. Standard export packaging and duty drawback rules mapped.`
    });

    const l = craft.typical_dimensions_cm.length;
    const w = craft.typical_dimensions_cm.width;
    const h = craft.typical_dimensions_cm.height;
    const vol = Math.round(((l * w * h) / 5000) * 100) / 100;
    const chg = Math.max(craft.typical_weight_kg, vol);

    setPackaging({
      lengthCm: l,
      widthCm: w,
      heightCm: h,
      actualWeightKg: craft.typical_weight_kg,
      volumetricWeightKg: vol,
      chargeableWeightKg: chg,
      fitsEmsLimits: true,
      maxCombinedGirthCm: 300,
      actualCombinedGirthCm: l + 2 * (w + h),
      recommendedBoxType: craft.recommended_box_type,
      cushioningAdvice: `Use appropriate protective wraps for ${craft.fragility.toLowerCase()} fragility craft. Include silica gel for moisture control.`,
      isFragile: craft.fragility === 'High'
    });

    setShipping(prev => ({
      ...prev,
      productValueInr: craft.suggested_price_inr
    }));
  };

  const selectHsCode = (hs: HsCodeCandidate) => {
    setProduct(prev => ({
      ...prev,
      selectedHsCode: hs
    }));
  };

  const addDocument = (doc: DocumentAuditItem) => {
    setDocuments(prev => {
      const idx = prev.findIndex(d => d.type === doc.type);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = doc;
        return copy;
      }
      return [...prev, doc];
    });
  };

  const resetSession = () => {
    setCurrentStep(1);
    selectGiCraft(SAMPLE_GI_CRAFTS[0]);
  };

  return (
    <ExportContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        language,
        setLanguage,
        isKioskMode,
        setIsKioskMode,
        isVoiceActive,
        setIsVoiceActive,
        speakVoicePrompt,
        product,
        setProduct,
        selectGiCraft,
        selectHsCode,
        documents,
        setDocuments,
        addDocument,
        complianceChecks,
        setComplianceChecks,
        packaging,
        setPackaging,
        shipping,
        setShipping,
        docket,
        setDocket,
        resetSession
      }}
    >
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = () => {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error("useExport must be used within an ExportProvider");
  }
  return context;
};
