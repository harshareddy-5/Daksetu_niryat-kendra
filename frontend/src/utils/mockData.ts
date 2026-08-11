import { GiCraftProfile, HsCodeCandidate, DocumentAuditItem, ServiceQuote } from '../types';

export const SAMPLE_GI_CRAFTS: GiCraftProfile[] = [
  {
    id: "gi-001",
    name: "Channapatna Wooden Toys",
    hindi_name: "चन्नापटन लकड़ी के खिलौने",
    state: "Karnataka",
    gi_tag_no: "GI-0012",
    category: "Handicrafts & Toys",
    default_hs_code: "9503.00.90",
    artisan_community: "Channapatna Craftsmen Guild, Ramanagara",
    material: "Ivory Wood (Aale Mara), Natural Lacquer, Turmeric & Indigo Dyes",
    typical_weight_kg: 0.45,
    typical_dimensions_cm: { length: 18, width: 12, height: 10 },
    fragility: "Low",
    moisture_sensitive: true,
    recommended_box_type: "3-ply Corrugated Craft Box with Shredded Kraft Paper Cushioning",
    sample_image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    suggested_price_inr: 1850
  },
  {
    id: "gi-002",
    name: "Varanasi Silk Brocade Saree",
    hindi_name: "वाराणसी सिल्क ब्रोकेड साड़ी",
    state: "Uttar Pradesh",
    gi_tag_no: "GI-0069",
    category: "Handloom & Sarees",
    default_hs_code: "5007.20.10",
    artisan_community: "Banaras Handloom Weavers Cooperative",
    material: "100% Pure Mulberry Silk, Silver Zari Weft",
    typical_weight_kg: 0.85,
    typical_dimensions_cm: { length: 35, width: 25, height: 5 },
    fragility: "Medium",
    moisture_sensitive: true,
    recommended_box_type: "Waterproof Polybag inside Rigid Gift Carton with Silica Gel Pouches",
    sample_image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    suggested_price_inr: 14500
  },
  {
    id: "gi-003",
    name: "Jaipur Blue Pottery Glazed Vase",
    hindi_name: "जयपुर ब्लू पॉटरी नक्काशीदार फूलदान",
    state: "Rajasthan",
    gi_tag_no: "GI-0028",
    category: "Ceramics & Pottery",
    default_hs_code: "6913.90.00",
    artisan_community: "Kot Jewar Artisan Cluster, Jaipur",
    material: "Ground Quartz, Glass Powder, Multani Mitti, Cobalt Oxide Glaze",
    typical_weight_kg: 1.25,
    typical_dimensions_cm: { length: 22, width: 22, height: 30 },
    fragility: "High",
    moisture_sensitive: false,
    recommended_box_type: "Double-walled 5-ply Heavy Corrugated Box with 25mm EPE Foam Shell",
    sample_image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    suggested_price_inr: 3200
  },
  {
    id: "gi-004",
    name: "Kashmir Pashmina Handwoven Shawl",
    hindi_name: "कश्मीर पश्मीना हाथ से बुनी शॉल",
    state: "Jammu & Kashmir",
    gi_tag_no: "GI-0046",
    category: "Textiles & Apparel",
    default_hs_code: "6214.10.00",
    artisan_community: "Craft Development Institute Artisan Network, Srinagar",
    material: "100% Changthangi Goat Cashmere (Pashm) underdown fleece",
    typical_weight_kg: 0.32,
    typical_dimensions_cm: { length: 30, width: 20, height: 4 },
    fragility: "Low",
    moisture_sensitive: true,
    recommended_box_type: "Moisture-sealed Zipper Sleeve with Acid-free Tissue Lining and Carton",
    sample_image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
    suggested_price_inr: 22000
  },
  {
    id: "gi-005",
    name: "Moradabad Brass Carved Mayur Lamp",
    hindi_name: "मुरादाबाद पीतल मयूर दीप",
    state: "Uttar Pradesh",
    gi_tag_no: "GI-0238",
    category: "Metal Artware",
    default_hs_code: "7419.80.30",
    artisan_community: "Peetal Nagari Metal Smiths Cooperative",
    material: "Sand-cast Solid Brass (Cu-Zn Alloy), Hand-chiseled detailing",
    typical_weight_kg: 2.10,
    typical_dimensions_cm: { length: 15, width: 15, height: 28 },
    fragility: "Medium",
    moisture_sensitive: false,
    recommended_box_type: "Heavy Duty Box with Form-fitting Molded Styrofoam and Anti-tarnish Paper",
    sample_image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    suggested_price_inr: 4800
  },
  {
    id: "gi-006",
    name: "Madhubani Handmade Canvas Scroll Painting",
    hindi_name: "मधुबनी हस्तनिर्मित लोक चित्रकला",
    state: "Bihar",
    gi_tag_no: "GI-0145",
    category: "Art & Antiques",
    default_hs_code: "9701.21.00",
    artisan_community: "Mithila Mahila Kalakar Sangh, Madhubani",
    material: "Handmade Cotton Rag Sheet, Natural Twig Bamboo Nibs, Plant Extract Inks",
    typical_weight_kg: 0.30,
    typical_dimensions_cm: { length: 45, width: 8, height: 8 },
    fragility: "Medium",
    moisture_sensitive: true,
    recommended_box_type: "Rigid Postal Spiral Mailing Tube (3mm wall thickness) with End Caps",
    sample_image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    suggested_price_inr: 5500
  }
];

export const INITIAL_HS_CANDIDATES: HsCodeCandidate[] = [
  {
    hs_code: "9503.00.90",
    chapter: "95",
    heading: "9503",
    title: "Channapatna Wooden Toys & Dolls (Handmade)",
    description: "Tricycles, scooters, pedal cars and similar wheeled toys; dolls' carriages; dolls; other toys; reduced-size models - Other handcrafted wooden toys",
    confidence: 0.98,
    gst_rate: 12.0,
    basic_customs_duty: 0.0,
    rodtep_rate: 2.5,
    duty_drawback_rate: 1.8,
    export_policy: "Free",
    reasoning: "Visual features match Wrightia Tinctoria Ivory Wood lathe craft with natural lacquer dye. Classified under Chapter 95 toys with full export RoDTEP incentive of 2.5%.",
    restrictions: ["BIS Certification exemption for handmade wooden toys", "Phytosanitary ISPM-15 declaration"]
  },
  {
    hs_code: "4420.11.00",
    chapter: "44",
    heading: "4420",
    title: "Statuettes and other ornaments of wood",
    description: "Wood marquetry and inlaid wood; caskets and cases for jewellery or cutlery, and similar articles, of wood",
    confidence: 0.74,
    gst_rate: 12.0,
    basic_customs_duty: 0.0,
    rodtep_rate: 1.8,
    duty_drawback_rate: 1.2,
    export_policy: "Free",
    reasoning: "Alternative decorative woodwork classification. Higher customs scrutiny compared to Chapter 95.",
    restrictions: ["Phytosanitary certificate required"]
  }
];

export const INITIAL_DOCUMENTS: DocumentAuditItem[] = [
  {
    id: "doc-inv",
    type: "INVOICE",
    name: "Commercial_Invoice_EXP0842.pdf",
    rawText: "COMMERCIAL EXPORT INVOICE\nExporter: Sri Channapatna Crafts Producers Guild\nIEC: 0718049215 | GSTIN: 29AABCS1429B1ZX\nInvoice No: EXP-2026/DNK/0842 | Date: 09-AUG-2026\nConsignee: Global Folk Treasures LLC, Brooklyn, NY 11201, USA\nItem: Handcrafted Channapatna Wooden Toys (HS: 9503.00.90)\nQuantity: 12 Sets | FOB Value: USD 240.00 | Net Weight: 4.80 kg | Gross: 5.40 kg\nDNK Center: Bangalore GPO Export Hub",
    confidence: 0.97,
    status: "VALID",
    uploaded: true,
    fields: {
      "invoice_number": { key: "invoice_number", label: "Invoice Number", value: "EXP-2026/DNK/0842", confidence: 0.98, is_valid: true, validation_message: "Format verified" },
      "exporter_iec": { key: "exporter_iec", label: "Exporter IEC", value: "0718049215", confidence: 0.99, is_valid: true, validation_message: "Active DGFT IEC" },
      "consignee": { key: "consignee", label: "Consignee Buyer", value: "Global Folk Treasures LLC, NY, USA", confidence: 0.95, is_valid: true },
      "fob_value": { key: "fob_value", label: "FOB Export Value", value: "$240.00 (₹20,760 INR)", confidence: 0.96, is_valid: true, validation_message: "Under US $800 de minimis" },
      "hs_code": { key: "hs_code", label: "Declared HS Code", value: "9503.00.90", confidence: 0.97, is_valid: true }
    }
  },
  {
    id: "doc-iec",
    type: "IEC",
    name: "DGFT_IEC_Registration.pdf",
    rawText: "GOVERNMENT OF INDIA - MINISTRY OF COMMERCE & INDUSTRY\nDIRECTORATE GENERAL OF FOREIGN TRADE\nIMPORTER-EXPORTER CODE (IEC) CERTIFICATE\nIEC: 0718049215 | Firm: Sri Channapatna Crafts Guild | Status: ACTIVE",
    confidence: 0.99,
    status: "VALID",
    uploaded: true,
    fields: {
      "iec_number": { key: "iec_number", label: "IEC Code", value: "0718049215", confidence: 0.99, is_valid: true, validation_message: "Active on DGFT Registry" },
      "pan_number": { key: "pan_number", label: "PAN Linked", value: "AABCS1429B", confidence: 0.98, is_valid: true },
      "status": { key: "status", label: "Status", value: "OPERATIONAL", confidence: 0.99, is_valid: true }
    }
  },
  {
    id: "doc-pl",
    type: "PACKING_LIST",
    name: "Export_Packing_List.pdf",
    rawText: "EXPORT PACKING LIST\nRef: PL-2026/DNK/0842 | Date: 09-AUG-2026\nShipper: Sri Channapatna Crafts Guild\nPackage 1/1: Heavy 5-ply Corrugated Box (45 x 30 x 25 cm)\nNet: 4.80 kg | Gross: 5.40 kg",
    confidence: 0.96,
    status: "VALID",
    uploaded: true,
    fields: {
      "packing_list_no": { key: "packing_list_no", label: "Packing List Ref", value: "PL-2026/DNK/0842", confidence: 0.97, is_valid: true },
      "gross_weight": { key: "gross_weight", label: "Gross Weight", value: "5.40 kg", confidence: 0.96, is_valid: true, validation_message: "Matches postal scale" }
    }
  }
];

export const DESTINATION_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "$", rate: 86.5, zone: "Americas" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "£", rate: 108.2, zone: "Europe" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", rate: 23.5, zone: "Middle East" },
  { code: "DE", name: "Germany (EU)", flag: "🇩🇪", currency: "€", rate: 92.4, zone: "Europe" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "A$", rate: 55.8, zone: "Asia Pacific" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "¥", rate: 0.58, zone: "Asia Pacific" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "C$", rate: 62.0, zone: "Americas" }
];
