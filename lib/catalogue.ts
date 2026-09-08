/**
 * The full product catalogue behind the filterable "See full product range" pages.
 *
 * Every `image` here is a real photograph taken in the Megatec factory — the
 * folders under /public/images/factory are named after the model they contain.
 * Several of those folders also hold close-ups of the equipment nameplate; those
 * are never used as a product image.
 */

export type CategorySlug =
  | "fuel-dispensers"
  | "cng"
  | "lpg"
  | "ev-chargers"
  | "station-accessories";

export type CatalogueProduct = {
  id: string;
  name: string;
  category: CategorySlug;
  image: string;
  /** Facet values — these drive the four filter dropdowns. */
  flowRate: string;
  nozzles: string;
  application: string;
  fuelType: string;
  /** Bullet lines shown on the card. */
  specs: string[];
  /** Filename under /public/spec-sheets, when a datasheet exists. */
  specSheet?: string;
  bestSeller?: boolean;
  /** Regulated dispensing equipment carries the NMDPRA approval badge. */
  nmdpra?: boolean;
};

export type CatalogueCategory = {
  slug: CategorySlug;
  /** Page title, e.g. "Fuel dispensers". */
  title: string;
  description: string;
  /** Label used in the breadcrumb and the "See full … range" link. */
  rangeLabel: string;
  /** The landing page this catalogue belongs to. */
  landingHref: string;
};

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    slug: "fuel-dispensers",
    title: "Fuel dispensers",
    description:
      "Installation and commissioning of fuel dispensers and gas dispensing systems.",
    rangeLabel: "product",
    landingHref: "/products/fuel-dispensers",
  },
  {
    slug: "cng",
    title: "CNG systems",
    description:
      "Reliable CNG solutions engineered for optimal performance and safety.",
    rangeLabel: "CNG equipment",
    landingHref: "/products/cng",
  },
  {
    slug: "lpg",
    title: "LPG solutions",
    description:
      "Innovative LPG solutions for seamless integration and maximum uptime.",
    rangeLabel: "LPG equipment",
    landingHref: "/products/lpg",
  },
  {
    slug: "ev-chargers",
    title: "Electric car chargers",
    description:
      "Durable EV charging infrastructure engineered for safe, high-uptime performance.",
    rangeLabel: "EV charging",
    landingHref: "/products/ev-chargers",
  },
  {
    slug: "station-accessories",
    title: "Station accessories",
    description:
      "Comprehensive station accessories to enhance functionality and safety.",
    rangeLabel: "accessories",
    landingHref: "/products/station-accessories",
  },
];

export const CATALOGUE_FACETS = [
  { key: "flowRate", label: "Flow Rate" },
  { key: "nozzles", label: "Nozzle count" },
  { key: "application", label: "Application" },
  { key: "fuelType", label: "Fuel Type" },
] as const;

export type FacetKey = (typeof CATALOGUE_FACETS)[number]["key"];

const PETROL_FLOW = "5–50 L/min";
const DEPOT_FLOW = "5–100 L/min";
const NOT_METERED = "Not metered";
const WHITE_PRODUCTS = "PMS, AGO or DPK";

const FUEL_DISPENSERS: CatalogueProduct[] = [
  {
    id: "mt-plus-single-tb",
    name: "MT PLUS – Single Nozzle (TB)",
    category: "fuel-dispensers",
    image: "/images/factory/mt-plus-single-tb/mt-plus-tb-3.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PLUS_Single_Nozzle_TB.pdf",
    bestSeller: true,
    nmdpra: true,
  },
  {
    id: "mt-plus-single-tt",
    name: "MT PLUS – Single Nozzle (TT)",
    category: "fuel-dispensers",
    image: "/images/factory/mt-plus-single-tt/mt-plus-single-tt-1.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Tokheim meter & unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PLUS_Single_Nozzle_TT.pdf",
    nmdpra: true,
  },
  {
    id: "mt-plus-single-bb",
    name: "MT PLUS – Single Nozzle (BB)",
    category: "fuel-dispensers",
    image: "/images/factory/bb-single-mt-pro/bb-single-mt-pro-7.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter & unit",
      "7-yr memory · 10-min backup",
    ],
    specSheet: "MT_PLUS_Single_Nozzle_BB.pdf",
    nmdpra: true,
  },
  {
    id: "mt-plus-double-tb-d1",
    name: "MT PLUS – Double Nozzle (TB-D1)",
    category: "fuel-dispensers",
    image: "/images/factory/mt-plus-d1-tb/mt-plus-d1-tb-6.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Serves two vehicles · single pump set",
    ],
    specSheet: "MT_PLUS_Double_Nozzle_TB_D1.pdf",
    nmdpra: true,
  },
  {
    id: "mt-plus-double-tb-d2",
    name: "MT PLUS – Double Nozzle (TB-D2)",
    category: "fuel-dispensers",
    image: "/images/factory/mt-plus-d2tb/mt-plus-d2tb-4.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Twin pump sets · independent metering",
      "Two products dispensed side by side",
    ],
    specSheet: "MT_PLUS_Double_Nozzle_TB_D2.pdf",
    nmdpra: true,
  },
  {
    id: "mt-plus-double-tt-d1",
    name: "MT PLUS – Double Nozzle (TT-D1)",
    category: "fuel-dispensers",
    image: "/images/factory/mt-plus-d1tt/mt-plus-d1tt-double-nozzle-2.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Tokheim meter & unit",
      "Serves two vehicles · single pump set",
    ],
    specSheet: "MT_PLUS_Double_Nozzle_TT_D1.pdf",
    nmdpra: true,
  },
  {
    id: "mt-plus-submersible-single",
    name: "MT PLUS SUBMERSIBLE – Single Nozzle",
    category: "fuel-dispensers",
    image: "/images/factory/mt-plus-sub-single/mt-plus-sub-single-2.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "For submersible (STP) systems · ±0.3% accuracy",
      "Bennett meter · solenoid valve · CPU control",
      "Single nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PLUS_Submersible_Single_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "mt-plus-submersible-double",
    name: "MT PLUS SUBMERSIBLE – Dual Nozzle",
    category: "fuel-dispensers",
    image: "/images/factory/submersible-mt-plus-d1/submersible-mt-plus-d1-2.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "For submersible (STP) systems · ±0.3% accuracy",
      "Bennett meter · solenoid valve · CPU control",
      "Dual nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PLUS_Submersible_Double_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "mt-pro-single-tt",
    name: "MT PRO – Single Nozzle (TT)",
    category: "fuel-dispensers",
    image: "/images/factory/mtr-pro-single/mtr-pro-single-5.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Tokheim meter & unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PRO_Single_Nozzle_TT.pdf",
    nmdpra: true,
  },
  {
    id: "mt-pro-double-tb-d1",
    name: "MT PRO – Double Nozzle (TB-D1)",
    category: "fuel-dispensers",
    image: "/images/factory/mtr-pro-d1tb/mt-pro-d1-tb6.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Serves two vehicles · PMS, AGO or DPK",
    ],
    specSheet: "MT_PRO_Double_Nozzle_TB_D1.pdf",
    nmdpra: true,
  },
  {
    id: "mt-pro-double-bb-d2",
    name: "MT PRO – Double Nozzle (BB-D2)",
    category: "fuel-dispensers",
    image: "/images/factory/mt-pro-d2-bb/mt-pro-d2-bb-4.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Twin Bennett meters & units",
      "Full-colour LED preset display",
    ],
    specSheet: "MT_PRO_Double_Nozzle_BB_D2.pdf",
    nmdpra: true,
  },
  {
    id: "mt-pro-submersible-single",
    name: "MT PRO SUBMERSIBLE – Single Nozzle",
    category: "fuel-dispensers",
    image:
      "/images/factory/mt-pro-submersible-single/mt-pro-submersible-single-2.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "For submersible (STP) systems · ±0.3% accuracy",
      "Solenoid valve · CPU control",
      "Single nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PRO_Submersible_Single_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "mt-pro-submersible-double",
    name: "MT PRO SUBMERSIBLE – Dual Nozzle",
    category: "fuel-dispensers",
    image:
      "/images/factory/mt-pro-submersible-d1/mt-pro-submersible-d1-double-nozzle-3.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "For submersible (STP) systems · ±0.3% accuracy",
      "Solenoid valve · CPU control",
      "Dual nozzle · PMS, AGO or DPK",
    ],
    specSheet: "MT_PRO_Submersible_Double_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "gear-pump-single",
    name: "GEAR PUMP – Single Nozzle",
    category: "fuel-dispensers",
    image: "/images/factory/oil-dispenser/oil-dispenser-5.png",
    flowRate: DEPOT_FLOW,
    nozzles: "1",
    application: "Depot & bulk",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "High flow rate: 5–100 L/min · ±0.3% accuracy",
      "Self-priming gear pump · oil separator",
      "Single nozzle · built for depots",
    ],
    specSheet: "Gear_Pump_Single_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "oil-dispenser-pump",
    name: "Oil Dispenser Pump",
    category: "fuel-dispensers",
    image: "/images/factory/oil-dispenser/oil-dispenser-7.png",
    flowRate: DEPOT_FLOW,
    nozzles: "1",
    application: "Depot & bulk",
    fuelType: "Lubricants",
    specs: [
      "Built for lubricants and heavy oils",
      "Self-priming gear pump · inline filter",
      "Digital preset with litre and price display",
    ],
    specSheet: "Oil_Dispenser_Pump.pdf",
  },
  {
    id: "mini-dispenser",
    name: "Mini Dispenser",
    category: "fuel-dispensers",
    image: "/images/factory/mini-dispenser/mini-dispenser-3.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Fleet & private site",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Compact cabinet for private and fleet sites",
      "Digital preset · litre, price and total display",
      "Single nozzle · PMS, AGO or DPK",
    ],
  },
];

const CNG: CatalogueProduct[] = [
  {
    id: "cng-dispenser-single",
    name: "CNG Refilling Dispenser – Single Nozzle",
    category: "cng",
    image: "/images/factory/cng-single/cng-single-2.png",
    flowRate: "2–30 kg/min",
    nozzles: "1",
    application: "Retail station",
    fuelType: "CNG",
    specs: [
      "Single nozzle · ±0.5% accuracy",
      "Flow range 2 to 30 kg/min",
      "Working pressure up to 25MPa",
    ],
    specSheet: "CNG_Dispenser_Single_Nozzle.pdf",
    bestSeller: true,
    nmdpra: true,
  },
  {
    id: "cng-dispenser-double",
    name: "CNG Refilling Dispenser – Double Nozzle",
    category: "cng",
    image: "/images/factory/cng-double/cng-double-3.png",
    flowRate: "2–30 kg/min",
    nozzles: "2",
    application: "Retail station",
    fuelType: "CNG",
    specs: [
      "Two nozzles · ±0.5% accuracy",
      "Flow range 2 to 30 kg/min",
      "Working pressure up to 25MPa",
    ],
    specSheet: "CNG_Dispenser_Double_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "cng-dispenser-double-double",
    name: "CNG Refilling Dispenser – Double/Double",
    category: "cng",
    image: "/images/factory/cng-2-double/cng-2-double-2.png",
    flowRate: "2–30 kg/min",
    nozzles: "4",
    application: "Retail station",
    fuelType: "CNG",
    specs: [
      "Four nozzles across two dispensing bays",
      "Independent metering per bay · ±0.5% accuracy",
      "Working pressure up to 25MPa",
    ],
    specSheet: "CNG_Dispenser_Double_Double.pdf",
    nmdpra: true,
  },
  {
    id: "cng-offloading-dispenser",
    name: "CNG Offloading Dispenser",
    category: "cng",
    image: "/images/factory/cng-single/cng-single-3.png",
    flowRate: "2–30 kg/min",
    nozzles: "1",
    application: "Depot & bulk",
    fuelType: "CNG",
    specs: [
      "Offloads trailered gas into station storage",
      "High-pressure priority panel",
      "Working pressure up to 25MPa",
    ],
    specSheet: "CNG_Offloading_Dispenser.pdf",
    nmdpra: true,
  },
  {
    id: "cng-daughter-station",
    name: "CNG Daughter Station (Skid Station)",
    category: "cng",
    image: "/images/factory/cng-double/cng-double-1.png",
    flowRate: "2–30 kg/min",
    nozzles: "2",
    application: "New station build",
    fuelType: "CNG",
    specs: [
      "Complete station that works without a gas pipeline",
      "Compressor, storage cylinders, dispensers, alarm and PLC control",
      "Receives, stores and dispenses gas brought in by truck",
    ],
    specSheet: "CNG_Daughter_Station.pdf",
    nmdpra: true,
  },
  {
    id: "cng-storage-tubes",
    name: "CNG Storage Tube (40ft)",
    category: "cng",
    image: "/images/factory/cng-cylinder-75l.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Depot & bulk",
    fuelType: "CNG",
    specs: [
      "12-tube container, up to 7,800 Nm³ capacity under 25MPa",
      "Working pressure 20 to 25MPa, tested to 33.4MPa",
      "Built for a 20-year working life",
    ],
    specSheet: "CNG_Storage_Tubes_40ft.pdf",
    nmdpra: true,
  },
  {
    id: "cng-conversion-kit",
    name: "CNG Vehicle Conversion Kit",
    category: "cng",
    image: "/images/factory/cng-kit.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Fleet & private site",
    fuelType: "CNG",
    specs: [
      "Converts petrol vehicles to run on CNG",
      "For fleets and individual vehicles",
      "Cuts running cost compared to petrol",
    ],
  },
  {
    id: "cng-cylinder-65l",
    name: "CNG Vehicle Cylinder (65L)",
    category: "cng",
    image: "/images/factory/cng-cylinder-65l.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Fleet & private site",
    fuelType: "CNG",
    specs: [
      "65-litre water capacity",
      "Working pressure 20MPa",
      "Supplied with mounting brackets and valve",
    ],
  },
  {
    id: "cng-control-panel",
    name: "CNG Control & Monitoring Panel",
    category: "cng",
    image: "/images/factory/cng-double/cng-double-4.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "New station build",
    fuelType: "CNG",
    specs: [
      "Industrial HMI display",
      "Remote connectivity option",
      "Multi-point alarm capability",
    ],
  },
];

const LPG: CatalogueProduct[] = [
  {
    id: "lpg-dispenser-single",
    name: "LPG Dispenser – Single Nozzle",
    category: "lpg",
    image: "/images/factory/lpg-single/lpg-single-5.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Gas plant",
    fuelType: "LPG",
    specs: [
      "Single nozzle · ±0.3% meter accuracy",
      "Air separator · standard meter",
      "7-yr memory · 10-min backup",
    ],
    specSheet: "LPG_Dispenser_Single_Nozzle.pdf",
    bestSeller: true,
    nmdpra: true,
  },
  {
    id: "lpg-dispenser-double",
    name: "LPG Dispenser – Double Nozzle",
    category: "lpg",
    image: "/images/factory/lpg-double/lpg-double-4.png",
    flowRate: PETROL_FLOW,
    nozzles: "2",
    application: "Gas plant",
    fuelType: "LPG",
    specs: [
      "Two nozzles · ±0.3% meter accuracy",
      "Dual meters · dual air separators",
      "7-yr memory · 10-min backup",
    ],
    specSheet: "LPG_Dispenser_Double_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "lpg-dispenser-retail",
    name: "LPG Retail Dispenser (Skid Mount)",
    category: "lpg",
    image: "/images/factory/lpg-single/lpg-single-1.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: "LPG",
    specs: [
      "Skid-mounted for retail forecourts",
      "Emergency shutoff and pressure relief as standard",
      "Calibrated and NMDPRA documented on commissioning",
    ],
    specSheet: "LPG_Dispenser_Single_Nozzle.pdf",
    nmdpra: true,
  },
  {
    id: "lpg-filling-scale",
    name: "LPG Cylinder Filling Scale",
    category: "lpg",
    image: "/images/factory/lpg-filling/lpg-filling-1.png",
    flowRate: NOT_METERED,
    nozzles: "1",
    application: "Gas plant",
    fuelType: "LPG",
    specs: [
      "Weight-based cylinder filling with auto cut-off",
      "Digital tare and target weight entry",
      "Built for cylinder refilling plants",
    ],
    specSheet: "LPG_Filling_Scale.pdf",
    nmdpra: true,
  },
];

const EV_CHARGERS: CatalogueProduct[] = [
  {
    id: "ev-commercial-60kw",
    name: "MT EV — Commercial DC Fast Charger",
    category: "ev-chargers",
    image: "/images/factory/commercial-ev/commercial-ev-1.png",
    flowRate: "60KW output",
    nozzles: "2",
    application: "Fleet & private site",
    fuelType: "Electric",
    specs: [
      "60KW · dual gun · 200–1000VDC output",
      "Floor-standing (about 70 × 60 × 170cm)",
      "7-inch display · IP55 weatherproof",
    ],
    specSheet: "EV_Commercial_DC_Fast_Charger_60KW.pdf",
    bestSeller: true,
  },
  {
    id: "ev-residential-40kw",
    name: "MT EV — Home & Estate DC Charger",
    category: "ev-chargers",
    image: "/images/factory/residential-ev/residential-ev-1.png",
    flowRate: "40KW output",
    nozzles: "1",
    application: "Residential",
    fuelType: "Electric",
    specs: [
      "40KW · single gun · 200–1000VDC output",
      "Wall-mounted · three-phase 380V input",
      "7-inch touchscreen · IP55 weatherproof",
    ],
    specSheet: "EV_Home_Estate_DC_Charger_40KW.pdf",
  },
];

const STATION_ACCESSORIES: CatalogueProduct[] = [
  {
    id: "auto-shutoff-nozzle",
    name: "Automatic Shut-off Nozzle (1\")",
    category: "station-accessories",
    image: "/images/factory/nozzle.png",
    flowRate: PETROL_FLOW,
    nozzles: "1",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Automatic cut-off on tank full",
      "1-inch inlet · swivel-ready spout",
      "Fits all MT PLUS and MT PRO dispensers",
    ],
  },
  {
    id: "nozzle-holder",
    name: "Nozzle Holder",
    category: "station-accessories",
    image: "/images/factory/nozzle-holder-plastic.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: "All",
    specs: [
      "Moulded holster with switch cut-out",
      "Direct replacement for worn holders",
      "Fits MT PLUS and MT PRO cabinets",
    ],
  },
  {
    id: "dispensing-hose",
    name: "Fuel Dispensing Hose",
    category: "station-accessories",
    image: "/images/factory/hose.png",
    flowRate: PETROL_FLOW,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Fuel-resistant reinforced hose",
      "Swaged fittings both ends",
      "Standard forecourt lengths",
    ],
  },
  {
    id: "hose-reel",
    name: "Retractable Hose Reel",
    category: "station-accessories",
    image: "/images/factory/hose-reel.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Depot & bulk",
    fuelType: "All",
    specs: [
      "Spring-retracting drum",
      "Keeps hoses off the forecourt floor",
      "Wall or ceiling mounted",
    ],
  },
  {
    id: "bennett-meter",
    name: "Bennett Metering Unit",
    category: "station-accessories",
    image: "/images/factory/bennet-meter.png",
    flowRate: PETROL_FLOW,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Positive-displacement measuring chamber",
      "±0.3% accuracy after calibration",
      "Genuine replacement part",
    ],
  },
  {
    id: "flow-meter-2in",
    name: "Flow Meter (2 inch)",
    category: "station-accessories",
    image: "/images/factory/2-inches-flow-meter.png",
    flowRate: DEPOT_FLOW,
    nozzles: "—",
    application: "Depot & bulk",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Mechanical register with litre totaliser",
      "2-inch inlet and outlet",
      "For bulk transfer and depot loading",
    ],
  },
  {
    id: "flow-meter-3in",
    name: "Flow Meter (3 inch)",
    category: "station-accessories",
    image: "/images/factory/3-inches-flow-meter.png",
    flowRate: DEPOT_FLOW,
    nozzles: "—",
    application: "Depot & bulk",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "High-throughput mechanical register",
      "3-inch inlet and outlet",
      "For tanker loading gantries",
    ],
  },
  {
    id: "dispenser-filter",
    name: "Inline Dispenser Filter",
    category: "station-accessories",
    image: "/images/factory/filter.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Protects the meter from tank debris",
      "Serviceable filter element",
      "Recommended change at every service",
    ],
  },
  {
    id: "bennett-filter",
    name: "Bennett Filter Element",
    category: "station-accessories",
    image: "/images/factory/bennet-filter.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Genuine Bennett replacement element",
      "Fine mesh with sealed end caps",
      "Fits Bennett metering assemblies",
    ],
  },
  {
    id: "fuel-solenoid-valve",
    name: "Fuel Solenoid Valve",
    category: "station-accessories",
    image: "/images/factory/fuel-solenoid-valve.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Two-stage flow control",
      "Brass body with pre-wired coil",
      "For CPU-controlled dispensers",
    ],
  },
  {
    id: "submersible-shutoff-valve",
    name: "Submersible Shut-off Valve",
    category: "station-accessories",
    image: "/images/factory/submersible-shut-off-valve.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Emergency shut-off for STP systems",
      "Cast body with fusible link",
      "Required on submersible installations",
    ],
  },
  {
    id: "dispenser-motor",
    name: "Dispenser Electric Motor",
    category: "station-accessories",
    image: "/images/factory/electric-motor.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: "All",
    specs: [
      "0.75kW · 220V · 50Hz",
      "Direct replacement for MT PLUS and MT PRO",
      "Flange-mounted to the pump set",
    ],
  },
  {
    id: "transfer-mini-pump-220v",
    name: "Transfer Mini Pump (220V)",
    category: "station-accessories",
    image: "/images/factory/transfer-mini-pump-220-vlts.png",
    flowRate: DEPOT_FLOW,
    nozzles: "1",
    application: "Fleet & private site",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Portable transfer set with meter, hose and nozzle",
      "220V mains supply",
      "For drums, bowsers and small tanks",
    ],
  },
  {
    id: "mt-plus-display",
    name: "MT PLUS Display & Preset Board",
    category: "station-accessories",
    image: "/images/factory/mt-plus-display.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: "All",
    specs: [
      "Litre, price and unit-price display",
      "Matched preset board included",
      "Genuine MT PLUS spare",
    ],
  },
  {
    id: "complete-panel-mt2",
    name: "Complete Control Panel (MT2)",
    category: "station-accessories",
    image: "/images/factory/complete-panel-mt2.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: "All",
    specs: [
      "Full panel assembly — CPU, display, keypad and looms",
      "Drop-in replacement for MT2 dispensers",
      "Tested before dispatch",
    ],
  },
  {
    id: "power-board",
    name: "Dispenser Power Board",
    category: "station-accessories",
    image: "/images/factory/power-board.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: "All",
    specs: [
      "Supply board for CPU and preset electronics",
      "Genuine replacement part",
      "Bench-tested before dispatch",
    ],
  },
  {
    id: "totalizer",
    name: "Electronic Totalizer",
    category: "station-accessories",
    image: "/images/factory/totalizer.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: "All",
    specs: [
      "Cumulative litre counter",
      "Pre-wired harness",
      "Fits MT PLUS and MT PRO dispensers",
    ],
  },
  {
    id: "measuring-can-20l",
    name: "Standard Measuring Can (20L)",
    category: "station-accessories",
    image: "/images/factory/20l-measuring-can.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Retail station",
    fuelType: WHITE_PRODUCTS,
    specs: [
      "Stainless steel calibration measure",
      "Certified for meter verification",
      "Required for NMDPRA calibration checks",
    ],
  },
  {
    id: "lpg-hose",
    name: "LPG Dispensing Hose",
    category: "station-accessories",
    image: "/images/factory/lpg-hose.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Gas plant",
    fuelType: "LPG",
    specs: [
      "LPG-rated reinforced hose",
      "Brass end fittings",
      "For dispensers and filling scales",
    ],
  },
  {
    id: "lpg-valve",
    name: "LPG Safety Valve",
    category: "station-accessories",
    image: "/images/factory/lpg-valve.png",
    flowRate: NOT_METERED,
    nozzles: "—",
    application: "Gas plant",
    fuelType: "LPG",
    specs: [
      "Pressure relief and isolation",
      "Cast body rated for LPG service",
      "Fitted as standard on Megatec LPG installations",
    ],
  },
];

export const CATALOGUE: CatalogueProduct[] = [
  ...FUEL_DISPENSERS,
  ...CNG,
  ...LPG,
  ...EV_CHARGERS,
  ...STATION_ACCESSORIES,
];

export function getCategory(slug: CategorySlug): CatalogueCategory {
  const category = CATALOGUE_CATEGORIES.find((item) => item.slug === slug);
  if (!category) throw new Error(`Unknown catalogue category: ${slug}`);
  return category;
}

export function productsIn(slug: CategorySlug): CatalogueProduct[] {
  return CATALOGUE.filter((product) => product.category === slug);
}

/** Path to a category's filterable catalogue page. */
export function catalogueHref(slug: CategorySlug): string {
  return `${getCategory(slug).landingHref}/all`;
}
