import type { Language } from "@/lib/types";

/**
 * i18n dictionary — seeded from the Stitch export's I18N object and extended
 * with shell + Step-2 keys. Keep `en` and `hi` in sync; the `Dictionary` type
 * is derived from `en`, so a missing Hindi key is a compile error.
 */
export const en = {
  // app chrome
  appName: "BathCraft",
  appSub: "Step 1: Space & Layout",
  langLabel: "EN",
  langSecondary: "हिन्दी",

  // nav
  navBathrooms: "Bathrooms",
  navPlanner: "Planner",
  navGuides: "Guides",
  navDocs: "Docs",

  // Step 1 — Space & Layout
  stepBadge: "Step 1 of 6 • Dimensions",
  nameSpace: "Name your space",
  quickBadge: "Quick Chips",
  dimTitle: "Room Dimensions",
  dimSub: "Inner wall-to-wall clearances",
  lenLabel: "Room Length (L)",
  lenSub: "Longest wall span",
  widLabel: "Room Width (W)",
  widSub: "Cross wall span",
  hgtLabel: "Ceiling Height (H)",
  hgtSub: "Floor to slab",
  areaCalc: "Calculated Area",
  spaceVerdict: "Comfortable 3-fixture layout with wet zone",
  fixturesTitle: "Essential Elements to Position",
  fixturesSub: "Tap wall placement preference for each",
  previewTitle: "Dynamic 2D Footprint Preview",
  footnote: "Auto-adapts to L×W counters",
  ctaText: "Generate 2D Bathroom Plan",
  ctaSub: "Next: Review fixture clearances & plumbing layout",
  ctaGenerating: "Generating 2D Layout & Clearances...",
  toastMsg: "Blueprint generated with clear wet & dry zones!",
  resetDefault: "Reset Default",

  // openings
  doorLabel: "Door",
  windowLabel: "Window",
  doorWindowTitle: "Door & Window",
  doorWindowSub: "Place the openings on the walls",

  // fixtures
  elemWc: "W.C. Commode",
  elemWcSub: "Water Closet / Wall-hung toilet",
  elemVanity: "Wash Basin / Vanity",
  elemVanitySub: "Under-counter storage & mirror",
  elemShower: "Shower / Wet Zone",
  elemShowerSub: "Drainage slope & glass partition",
  elemAlmirah: "Almirah / Vanity",
  elemAlmirahSub: "Skincare, Soaps, Detergents, etc",

  // presets
  master: "Master",
  guest: "Guest",
  kids: "Kids",
  powder: "Powder",

  // placements
  back: "Back Wall",
  front: "Near Entry",
  left: "Left Wall",
  right: "Right Wall",
  nearEntry: "Near Entry",
  underVanity: "Under Vanity",
  dryCorner: "Dry Corner",
  wallRecess: "Wall Recess",

  // Step 2 — Style & Budget
  step2Badge: "Step 2 of 6 • Style & Budget",
  styleTitle: "Architecture Style",
  styleSub: "Set the look and feel of your bathroom",
  budgetTitle: "Cost Tier",
  budgetSub: "Balance quality against your budget",
  budgetAmount: "Your Budget",
  budgetAmountSub: "You can change this anytime",
  styleModern: "Modern",
  styleTraditional: "Traditional",
  styleMinimal: "Minimal",
  styleLuxury: "Luxury",
  tierBudget: "Budget Friendly",
  tierCostEffective: "Cost Effective",
  tierGoodQuality: "Good Quality",
  tierTopOfLine: "Top of the Line",
  continueCta: "Continue to Fixtures",
} as const;

/** Keys come from `en`; values are plain strings so translations conform while
 *  a missing key in any language stays a compile error. */
export type Dictionary = { [K in keyof typeof en]: string };

export const hi: Dictionary = {
  appName: "BathCraft",
  appSub: "चरण 1: जगह और लेआउट",
  langLabel: "हिन्दी",
  langSecondary: "EN",

  navBathrooms: "बाथरूम",
  navPlanner: "प्लानर",
  navGuides: "गाइड",
  navDocs: "दस्तावेज़",

  stepBadge: "चरण 1 / 6 • आकार और नाप",
  nameSpace: "कमरे का नाम दें",
  quickBadge: "त्वरित चयन",
  dimTitle: "कमरे का नाप (Dimensions)",
  dimSub: "भीतरी दीवार से दीवार तक का फासला",
  lenLabel: "कमरे की लंबाई (L)",
  lenSub: "सबसे लंबी दीवार",
  widLabel: "कमरे की चौड़ाई (W)",
  widSub: "छोटी दीवार का फैलाव",
  hgtLabel: "छत की ऊंचाई (H)",
  hgtSub: "फर्श से सीलिंग तक",
  areaCalc: "कुल क्षेत्रफल",
  spaceVerdict: "वेट ज़ोन के साथ आरामदायक 3-फिक्स्चर लेआउट",
  fixturesTitle: "ज़रूरी बाथरूम तत्व और स्थान",
  fixturesSub: "हर आइटम के लिए दीवार की स्थिति चुनें",
  previewTitle: "सटीक 2D ब्लूप्रिंट पूर्वावलोकन",
  footnote: "L×W नाप के साथ स्वतः अपडेट होता है",
  ctaText: "2D नक्शा तैयार करें",
  ctaSub: "अगला: प्लंबिंग व उपकरणों का सटीक क्लीयरेंस देखें",
  ctaGenerating: "नक्शा जनरेट हो रहा है...",
  toastMsg: "2D फ्लोरप्लान व प्लंबिंग लेआउट तैयार है!",
  resetDefault: "रीसेट करें",

  doorLabel: "दरवाज़ा",
  windowLabel: "खिड़की",
  doorWindowTitle: "दरवाज़ा और खिड़की",
  doorWindowSub: "दीवारों पर द्वार लगाएं",

  elemWc: "डब्ल्यू.सी. कमोड (W.C.)",
  elemWcSub: "वॉल-हंग या फ्लोर टॉयलेट",
  elemVanity: "वॉश बेसिन / वैनिटी",
  elemVanitySub: "स्टोरेज व शीशे के साथ बेसिन",
  elemShower: "शॉवर / वेट ज़ोन",
  elemShowerSub: "पानी की निकासी व विभाजन",
  elemAlmirah: "अलमारी / वैनिटी",
  elemAlmirahSub: "स्किनकेयर, साबुन, डिटर्जेंट आदि",

  master: "मास्टर",
  guest: "गेस्ट",
  kids: "किड्स",
  powder: "पाउडर",

  back: "पीछे की दीवार",
  front: "प्रवेश के पास",
  left: "बायीं दीवार",
  right: "दायीं दीवार",
  nearEntry: "प्रवेश के पास",
  underVanity: "वैनिटी के नीचे",
  dryCorner: "सूखा कोना",
  wallRecess: "वॉल रीसेस",

  step2Badge: "चरण 2 / 6 • स्टाइल और बजट",
  styleTitle: "आर्किटेक्चर स्टाइल",
  styleSub: "अपने बाथरूम का रूप तय करें",
  budgetTitle: "कॉस्ट टियर",
  budgetSub: "बजट के अनुसार गुणवत्ता चुनें",
  budgetAmount: "आपका बजट",
  budgetAmountSub: "आप इसे कभी भी बदल सकते हैं",
  styleModern: "मॉडर्न",
  styleTraditional: "ट्रेडिशनल",
  styleMinimal: "मिनिमल",
  styleLuxury: "लक्ज़री",
  tierBudget: "बजट फ्रेंडली",
  tierCostEffective: "कॉस्ट इफेक्टिव",
  tierGoodQuality: "गुड क्वालिटी",
  tierTopOfLine: "टॉप ऑफ द लाइन",
  continueCta: "फिक्स्चर पर जाएं",
};

export const dictionaries: Record<Language, Dictionary> = { en, hi };
