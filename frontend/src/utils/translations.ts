export interface TranslationDictionary {
  appName: string;
  tagline: string;
  dnkBadge: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  next: string;
  back: string;
  finish: string;
  kioskMode: string;
  operatorMode: string;
  voiceGuide: string;
  voiceGuideListening: string;
  readyForExport: string;
  scoreLabel: string;
}

export const translations: Record<'en' | 'hi', TranslationDictionary> = {
  en: {
    appName: "DAKSETU",
    tagline: "Dak Ghar Niryat Kendra Smart AI Assistant",
    dnkBadge: "India Post Export Portal",
    step1: "Product Photo",
    step2: "AI HS Code",
    step3: "Document OCR",
    step4: "Compliance",
    step5: "Smart Packaging",
    step6: "Shipping Rates",
    step7: "Export Docket",
    next: "Continue",
    back: "Go Back",
    finish: "Generate PBE-I Docket",
    kioskMode: "Kiosk Touch Mode",
    operatorMode: "Postal Counter Officer",
    voiceGuide: "Listen to Voice Guide",
    voiceGuideListening: "Voice Guidance Active",
    readyForExport: "Export Clearance Ready",
    scoreLabel: "Readiness Score",
  },
  hi: {
    appName: "डाकसेतु",
    tagline: "डाक घर निर्यात केंद्र स्मार्ट एआई सहायक",
    dnkBadge: "भारतीय डाक निर्यात पोर्टल",
    step1: "उत्पाद फोटो",
    step2: "एचएस कोड सुझाव",
    step3: "दस्तावेज़ ओसीआर",
    step4: "अनुपालन जांच",
    step5: "पैकेजिंग सलाह",
    step6: "डाक शुल्क गणना",
    step7: "निर्यात डॉकेट",
    next: "आगे बढ़ें",
    back: "पीछे जाएं",
    finish: "PBE-I डॉकेट बनाएं",
    kioskMode: "कियोस्क टच मोड",
    operatorMode: "डाक काउंटर अधिकारी",
    voiceGuide: "ऑडियो निर्देश सुनें",
    voiceGuideListening: "ऑडियो मार्गदर्शन चालू है",
    readyForExport: "निर्यात हेतु स्वीकृत",
    scoreLabel: "तैयारी स्कोर",
  }
};
