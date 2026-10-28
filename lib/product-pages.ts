// Generated from the Product Catalogue document (05_Product_Catalogue.md): category and
// sub-category pages, cards and drawers, word for word. Edit here, not the document.

export type DrawerExtra = { t: "p" | "h" | "li"; x: string };

export type PageProduct = {
  id: string;
  name: string;
  /** The italic line under the name on the card. */
  blurb: string;
  best: boolean;
  /** The pill on the card image: "NMDPRA" for regulated dispensing equipment. */
  tag: string | null;
  /** The badge line at the top of the drawer. */
  badge: string;
  /** The drawer's spec grid: label, value. */
  cells: [string, string][];
  description: string;
  /** Extra drawer copy after the description (conversion kit: how it works, what is in it). */
  extras: DrawerExtra[];
  warranty: string;
  /** null where there is no photo yet: the card shows the muted MEGA-TEC logo. */
  image: string | null;
  /** Filename under /public/spec-sheets. */
  sheet: string | null;
};

export type SubCategory = {
  slug: string;
  name: string;
  title: string;
  meta: string;
  h1: string | null;
  intro: string[];
  /** The headline over the short form at the foot of the page. */
  form: string;
  products: PageProduct[];
};

export type Category = {
  slug: string;
  name: string;
  title: string;
  meta: string;
  headline: string;
  intro: string;
  cta: string;
  bullets: string[];
  subs: SubCategory[];
};

export const PRODUCT_CATEGORIES: Category[] = [
  {
    "slug": "fuel-solutions",
    "name": "Fuel Solutions",
    "title": "Fuel Solutions Nigeria | Dispensers, Pumps & Station Equipment | MEGA-TEC",
    "meta": "MEGA-TEC supplies, installs and calibrates fuel dispensers, gear pumps and submersible pumps for Nigerian stations and depots. Assembled in Nigeria. Spare parts always available.",
    "headline": "Fuel dispensers and station equipment for Nigerian filling stations and depots",
    "intro": "From single-nozzle dispensers to high-flow depot pumps, MEGA-TEC supplies, installs and calibrates the equipment that keeps Nigerian stations running. Assembled and tested here, serviceable anywhere in the country.",
    "cta": "Talk to Our Team on WhatsApp",
    "bullets": [
      "NMDPRA-Certified Calibration & Metering",
      "1,500+ Stations Equipped Nationwide",
      "Assembled & Tested in Nigeria",
      "Spare Parts Always Available"
    ],
    "subs": [
      {
        "slug": "fuel-dispensers",
        "name": "Fuel Dispensers",
        "title": "Fuel Dispensers Nigeria | Single & Double Nozzle | MEGA-TEC",
        "meta": "Browse MEGA-TEC fuel dispensers for Nigerian stations and depots. Bennett and Tokheim metering, single and double nozzle, calibrated and assembled in Nigeria.",
        "h1": "Fuel dispensers for Nigerian filling stations and depots",
        "intro": [],
        "form": "Not sure which dispenser fits your station? Let's talk it through.",
        "products": [
          {
            "id": "mt-plus-single-tb",
            "name": "MT PLUS – Single Nozzle (TB)",
            "blurb": "Our most trusted single-nozzle dispenser: Bennett-Tokheim metering, calibrated before delivery.",
            "best": true,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, Tokheim unit (1× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "This is the dispenser more Nigerian stations choose than any other in our range. It pairs a Bennett meter with a Tokheim unit, the combination our customers have trusted for years, and it's calibrated to ±0.3% before it ever reaches your forecourt, so every litre you dispense is a litre you're paid for. Assembled and tested here in Nigeria on openly available components, it can be serviced by any engineer nationwide, and spare parts are never a problem.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-single-tb/mt-plus-tb-3.png",
            "sheet": "MT_PLUS_Single_Nozzle_TB.pdf"
          },
          {
            "id": "mt-plus-double-tb-d1",
            "name": "MT PLUS – Double Nozzle (TB-D1)",
            "blurb": "Serves two vehicles at once: Bennett-Tokheim metering, calibrated before delivery.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, Tokheim unit (2× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "A double-nozzle dispenser built for busy forecourts. It serves two vehicles at once with two Bennett meters and a shared Tokheim unit, cutting queue time on busy forecourts without compromising accuracy. Calibrated to ±0.3%, assembled and tested in Nigeria, and backed by spare parts that are always available.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-d1-tb/mt-plus-d1-tb-6.png",
            "sheet": "MT_PLUS_Double_Nozzle_TB_D1.pdf"
          },
          {
            "id": "mt-plus-double-tb-d2",
            "name": "MT PLUS – Double Nozzle (TB-D2)",
            "blurb": "Serves two vehicles at once: Bennett-Tokheim metering, calibrated before delivery.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, Tokheim unit (2× meter, 2× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "This is our full twin-line unit: two Bennett meters, two Tokheim units and two motors, giving each side its own independent metering for the busiest, highest-volume stations. Calibrated to ±0.3%, assembled and tested in Nigeria, and serviceable anywhere with parts always on hand.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-d2tb/mt-plus-d2tb-4.png",
            "sheet": "MT_PLUS_Double_Nozzle_TB_D2.pdf"
          },
          {
            "id": "mt-pro-single-tb",
            "name": "MT PRO – Single Nozzle (TB)",
            "blurb": "Bennett meter, Tokheim unit, single-nozzle dependability, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, Tokheim unit (1× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Single (TB) delivers dependable single-nozzle performance in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-single/mtr-pro-single-5.png",
            "sheet": "MT_PRO_Single_Nozzle_TB.pdf"
          },
          {
            "id": "mt-pro-double-tb-d1",
            "name": "MT PRO – Double Nozzle (TB-D1)",
            "blurb": "Bennett meter, Tokheim unit, serves two vehicles at once, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, Tokheim unit (2× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Double (TB-D1) serves two vehicles at once, keeping busy forecourts moving in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-d1tb/mt-pro-d1-tb6.png",
            "sheet": "MT_PRO_Double_Nozzle_TB_D1.pdf"
          },
          {
            "id": "mt-pro-double-tb-d2",
            "name": "MT PRO – Double Nozzle (TB-D2)",
            "blurb": "Bennett meter, Tokheim unit, serves two vehicles at once, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, Tokheim unit (2× meter, 2× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Double (TB-D2) serves two vehicles at once, keeping busy forecourts moving in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-d1tb/mt-pro-d1-tb6.png",
            "sheet": "MT_PRO_Double_Nozzle_TB_D2.pdf"
          },
          {
            "id": "mt-plus-single-tt",
            "name": "MT PLUS – Single Nozzle (TT)",
            "blurb": "Tokheim meter & unit, single-nozzle dependability.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Tokheim meter & unit (1× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PLUS Single (TT) delivers dependable single-nozzle performance. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-single-tt/mt-plus-single-tt-1.png",
            "sheet": "MT_PLUS_Single_Nozzle_TT.pdf"
          },
          {
            "id": "mt-plus-double-tt-d1",
            "name": "MT PLUS – Double Nozzle (TT-D1)",
            "blurb": "Tokheim meter & unit, serves two vehicles at once.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Tokheim meter & unit (2× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PLUS Double (TT-D1) serves two vehicles at once, keeping busy forecourts moving. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-d1tt/mt-plus-d1tt-double-nozzle-2.png",
            "sheet": "MT_PLUS_Double_Nozzle_TT_D1.pdf"
          },
          {
            "id": "mt-plus-double-tt-d2",
            "name": "MT PLUS – Double Nozzle (TT-D2)",
            "blurb": "Tokheim meter & unit, serves two vehicles at once.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Tokheim meter & unit (2× meter, 2× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PLUS Double (TT-D2) serves two vehicles at once, keeping busy forecourts moving. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-d1tt/mt-plus-d1tt-double-nozzle-2.png",
            "sheet": "MT_PLUS_Double_Nozzle_TT_D2.pdf"
          },
          {
            "id": "mt-pro-single-tt",
            "name": "MT PRO – Single Nozzle (TT)",
            "blurb": "Tokheim meter & unit, single-nozzle dependability, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Tokheim meter & unit (1× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Single (TT) delivers dependable single-nozzle performance in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-single/mtr-pro-single-5.png",
            "sheet": "MT_PRO_Single_Nozzle_TT.pdf"
          },
          {
            "id": "mt-pro-double-tt-d1",
            "name": "MT PRO – Double Nozzle (TT-D1)",
            "blurb": "Tokheim meter & unit, serves two vehicles at once, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Tokheim meter & unit (2× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Double (TT-D1) serves two vehicles at once, keeping busy forecourts moving in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-d1tb/mt-pro-d1-tb6.png",
            "sheet": "MT_PRO_Double_Nozzle_TT_D1.pdf"
          },
          {
            "id": "mt-pro-double-tt-d2",
            "name": "MT PRO – Double Nozzle (TT-D2)",
            "blurb": "Tokheim meter & unit, serves two vehicles at once, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Tokheim meter & unit (2× meter, 2× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Double (TT-D2) serves two vehicles at once, keeping busy forecourts moving in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-d1tb/mt-pro-d1-tb6.png",
            "sheet": "MT_PRO_Double_Nozzle_TT_D2.pdf"
          },
          {
            "id": "mt-plus-single-bb",
            "name": "MT PLUS – Single Nozzle (BB)",
            "blurb": "Bennett meter & unit, single-nozzle dependability.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter & unit (1× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PLUS Single (BB) delivers dependable single-nozzle performance. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/bb-single-mt-pro/bb-single-mt-pro-7.png",
            "sheet": "MT_PLUS_Single_Nozzle_BB.pdf"
          },
          {
            "id": "mt-plus-double-bb-d1",
            "name": "MT PLUS – Double Nozzle (BB-D1)",
            "blurb": "Bennett meter & unit, serves two vehicles at once.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter & unit (2× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PLUS Double (BB-D1) serves two vehicles at once, keeping busy forecourts moving. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-d1-tb/mt-plus-d1-tb-6.png",
            "sheet": "MT_PLUS_Double_Nozzle_BB_D1.pdf"
          },
          {
            "id": "mt-plus-double-bb-d2",
            "name": "MT PLUS – Double Nozzle (BB-D2)",
            "blurb": "Bennett meter & unit, serves two vehicles at once.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter & unit (2× meter, 2× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PLUS Double (BB-D2) serves two vehicles at once, keeping busy forecourts moving. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-d1-tb/mt-plus-d1-tb-6.png",
            "sheet": "MT_PLUS_Double_Nozzle_BB_D2.pdf"
          },
          {
            "id": "mt-pro-single-bb",
            "name": "MT PRO – Single Nozzle (BB)",
            "blurb": "Bennett meter & unit, single-nozzle dependability, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter & unit (1× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Single (BB) delivers dependable single-nozzle performance in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mtr-pro-single/mtr-pro-single-5.png",
            "sheet": "MT_PRO_Single_Nozzle_BB.pdf"
          },
          {
            "id": "mt-pro-double-bb-d1",
            "name": "MT PRO – Double Nozzle (BB-D1)",
            "blurb": "Bennett meter & unit, serves two vehicles at once, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter & unit (2× meter, 1× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Double (BB-D1) serves two vehicles at once, keeping busy forecourts moving in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-pro-d2-bb/mt-pro-d2-bb-4.png",
            "sheet": "MT_PRO_Double_Nozzle_BB_D1.pdf"
          },
          {
            "id": "mt-pro-double-bb-d2",
            "name": "MT PRO – Double Nozzle (BB-D2)",
            "blurb": "Bennett meter & unit, serves two vehicles at once, in the MT Pro body.",
            "best": false,
            "tag": "NMDPRA",
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter & unit (2× meter, 2× unit)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT PRO Double (BB-D2) serves two vehicles at once, keeping busy forecourts moving in the MT Pro body. Calibrated to ±0.3% before delivery, assembled and tested in Nigeria on openly available parts, and serviceable by any engineer nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-pro-d2-bb/mt-pro-d2-bb-4.png",
            "sheet": "MT_PRO_Double_Nozzle_BB_D2.pdf"
          }
        ]
      },
      {
        "slug": "gear-pumps",
        "name": "Gear Pumps",
        "title": "Gear Pumps Nigeria | High-Flow Fuel Dispensers for Depots | MEGA-TEC",
        "meta": "MEGA-TEC gear pumps deliver high-flow dispensing (60–100 L/min) for Nigerian depots and high-volume sites. Self-priming, calibrated, assembled in Nigeria.",
        "h1": "High-flow gear pumps for Nigerian depots and bulk dispensing",
        "intro": [],
        "form": "Moving high volumes? Let's find the right pump.",
        "products": [
          {
            "id": "gear-pump-single",
            "name": "Gear Pump – Single Nozzle",
            "blurb": "Move fuel fast: up to 100 L/min of high-flow dispensing, built for depots that can't afford to queue.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Gear pump meter (1×), unit (1×)"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Flow rate",
                "60–100 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "When volume is the whole game, this is the pump you want. It delivers up to 100 litres a minute, about double the top flow of a standard dispenser, so depots and high-turnover sites move fuel faster and keep queues short. Self-priming with a built-in oil separator and air eliminator, calibrated to ±0.3%, assembled and tested in Nigeria, and serviceable anywhere with parts always available.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/oil-dispenser/oil-dispenser-5.png",
            "sheet": "Gear_Pump_Single_Nozzle.pdf"
          },
          {
            "id": "gear-pump-double-d1",
            "name": "Gear Pump – Double Nozzle (D1)",
            "blurb": "Twice the lines, the same high speed, high-flow dispensing across two nozzles for serious volume.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Gear pump meter (2×), unit (1×)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "60–100 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "Take the high-flow speed of our gear pump and put it on two lines. Two meters run from a single unit, delivering up to 100 L/min per line so you serve more customers, faster, without sacrificing accuracy. Self-priming, calibrated to ±0.3%, assembled and tested in Nigeria, and backed by parts that are always available.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": null,
            "sheet": "Gear_Pump_Double_Nozzle_D1.pdf"
          },
          {
            "id": "gear-pump-double-d2",
            "name": "Gear Pump – Double Nozzle (D2)",
            "blurb": "Full twin-line power: two meters, two units, maximum throughput for the busiest depots.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Gear pump meter (2×), unit (2×)"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Flow rate",
                "60–100 L/min"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "Built for the busiest depots that never slow down. This full twin-line powerhouse runs two meters and two units, giving each side its own independent high-speed dispensing at up to 100 L/min. Self-priming, calibrated to ±0.3%, assembled and tested in Nigeria, and serviceable anywhere with parts always on hand.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": null,
            "sheet": "Gear_Pump_Double_Nozzle_D2.pdf"
          }
        ]
      },
      {
        "slug": "submersible-pumps",
        "name": "Submersible Pumps",
        "title": "Submersible Pumps Nigeria | STP Dispensers | MEGA-TEC",
        "meta": "MEGA-TEC submersible (STP) fuel dispensers for pressurised systems. CPU-controlled, solenoid-valve metering, calibrated and assembled in Nigeria.",
        "h1": "Submersible (STP) pump dispensers for Nigerian stations",
        "intro": [],
        "form": "Running a submersible system? Let's talk setup.",
        "products": [
          {
            "id": "mt-plus-submersible-single",
            "name": "MT PLUS Submersible – Single Nozzle",
            "blurb": "Single-nozzle STP dispenser with Bennett meter and CPU control.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, solenoid valve (1×)"
              ],
              [
                "Control",
                "CPU-controlled"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Memory & backup",
                "7-yr storage · 10-min backup"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT Plus Submersible Single is built for stations running submersible turbine pump (STP) systems, and built to last. It combines a Bennett meter, solenoid-valve control and a CPU-controlled board for reliable pressurised dispensing, calibrated to ±0.3%, with 7-year memory storage and 10-minute battery backup so you never lose data. Assembled and tested in Nigeria, serviceable anywhere with parts always available.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-plus-sub-single/mt-plus-sub-single-2.png",
            "sheet": "MT_PLUS_Submersible_Single_Nozzle.pdf"
          },
          {
            "id": "mt-plus-submersible-double",
            "name": "MT PLUS Submersible – Double Nozzle",
            "blurb": "Double-nozzle STP dispenser, serves two vehicles on pressurised systems.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, solenoid valve (2×)"
              ],
              [
                "Control",
                "Double CPU"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Memory & backup",
                "7-yr storage · 10-min backup"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "Twice the service on your pressurised system. It serves two vehicles at once with two Bennett meters, two solenoid valves and double CPU control, engineered for reliability under constant use. Calibrated to ±0.3%, 7-year memory with battery backup, assembled and tested in Nigeria.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/submersible-mt-plus-d1/submersible-mt-plus-d1-2.png",
            "sheet": "MT_PLUS_Submersible_Double_Nozzle.pdf"
          },
          {
            "id": "mt-pro-submersible-single",
            "name": "MT PRO Submersible – Single Nozzle",
            "blurb": "Single-nozzle STP dispenser in the MT Pro body.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, solenoid valve (1×)"
              ],
              [
                "Control",
                "CPU-controlled"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Memory & backup",
                "7-yr storage · 10-min backup"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "STP-ready dispensing in the refined MT Pro body. It brings together a Bennett meter, solenoid valve and CPU control for dependable pressurised delivery, calibrated to ±0.3% with 7-year memory and backup. Assembled and tested in Nigeria.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-pro-submersible-single/mt-pro-submersible-single-2.png",
            "sheet": "MT_PRO_Submersible_Single_Nozzle.pdf"
          },
          {
            "id": "mt-pro-submersible-double",
            "name": "MT PRO Submersible – Double Nozzle",
            "blurb": "Double-nozzle STP dispenser in the MT Pro body.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Bennett meter, solenoid valve (2×)"
              ],
              [
                "Control",
                "Double CPU"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Fuel type",
                "PMS, AGO or DPK"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Memory & backup",
                "7-yr storage · 10-min backup"
              ],
              [
                "Compliance",
                "NMDPRA-compliant installation"
              ],
              [
                "Coverage",
                "Nationwide"
              ]
            ],
            "description": "Full two-vehicle service on pressurised systems, in the MT Pro body. It runs two Bennett meters, two solenoid valves and double CPU control for reliable high-use dispensing, calibrated to ±0.3% with 7-year memory and backup. Built and tested in Nigeria.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/mt-pro-submersible-d1/mt-pro-submersible-d1-double-nozzle-3.png",
            "sheet": "MT_PRO_Submersible_Double_Nozzle.pdf"
          }
        ]
      },
      {
        "slug": "oil-dispenser-pump",
        "name": "Oil Dispenser Pump",
        "title": "Oil Dispenser Pump Nigeria | Lubricant Dispensing | MEGA-TEC",
        "meta": "MEGA-TEC oil dispenser pump for accurate lubricant and oil dispensing at Nigerian stations and workshops. Supplied, installed and supported nationwide.",
        "h1": "Oil dispenser pump for Nigerian stations and workshops",
        "intro": [],
        "form": "Need oil dispensing equipment? Let's talk.",
        "products": [
          {
            "id": "oil-dispenser-pump",
            "name": "Oil Dispenser Pump",
            "blurb": "Self-priming vane pump, ±0.30% accuracy, for lubricating and engine oil.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Metering",
                "Positive displacement flow meter"
              ],
              [
                "Pump type",
                "Self-priming vane pump"
              ],
              [
                "Fluid",
                "Lubricating & engine oil"
              ],
              [
                "Delivery rate",
                "5–50 L/min"
              ],
              [
                "Accuracy",
                "±0.30%"
              ]
            ],
            "description": "When accuracy matters for your lubricants too, the MEGA-TEC Oil Dispenser Pump delivers. Built around a self-priming vane pump and a positive displacement flow meter, it measures oil to ±0.30% accuracy, calibrated electronically before delivery. A dependable addition to filling stations, workshops and service centres, supplied, installed and fully supported by MEGA-TEC across Nigeria.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/oil-dispenser/oil-dispenser-7.png",
            "sheet": "Oil_Dispenser_Pump.pdf"
          }
        ]
      },
      {
        "slug": "mt-mini-dispenser",
        "name": "MT Mini Dispenser",
        "title": "MT Mini Dispenser Nigeria | Compact Fuel Dispenser | MEGA-TEC",
        "meta": "MEGA-TEC MT Mini Dispenser, a compact single-nozzle fuel dispenser for small stations and backup use. SON & OIML certified, ±0.30% accuracy.",
        "h1": "A compact fuel dispenser for smaller sites and tighter budgets",
        "intro": [
          "Not every station needs a full-size island unit. The MT Mini Dispenser delivers the same accurate, certified metering in a smaller, single-door cabinet, built for small independent stations, backup dispensing, or sites where space and budget are tight."
        ],
        "form": "Interested in a compact dispenser? Let's talk.",
        "products": [
          {
            "id": "mini-dispenser",
            "name": "MT Mini Dispenser",
            "blurb": "Compact single-nozzle dispenser, same accuracy as our full-size units, in a smaller footprint.",
            "best": false,
            "tag": "SON certified · OIML certified",
            "badge": "SON certified · OIML certified · MEGA-TEC supply & install",
            "cells": [
              [
                "Flow rate",
                "5–50 L/min"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Accuracy",
                "±0.30%"
              ],
              [
                "Power supply",
                "220V, 50Hz, 0.75kW"
              ],
              [
                "Protection rating",
                "Ex II 2G EEx IIA T3"
              ],
              [
                "Supply coverage",
                "Nationwide"
              ]
            ],
            "description": "The MT Mini Dispenser brings the same dependable metering as our full-size units into a compact, single-door cabinet. Built for small independent stations, backup dispensing, or anywhere space and budget are tight, it delivers 5 to 50 L/min at ±0.30% accuracy, SON and OIML certified, and rated for use in explosive atmospheres (-20°C to +40°C ambient). Assembled and tested to the same standard as every MEGA-TEC dispenser, backed by nationwide support.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/mini-dispenser/mini-dispenser-3.png",
            "sheet": "MT_Mini_Dispenser.pdf"
          }
        ]
      }
    ]
  },
  {
    "slug": "cng-solutions",
    "name": "CNG Solutions",
    "title": "CNG Solutions Nigeria | Dispensers, Daughter Stations & Storage | MEGA-TEC",
    "meta": "MEGA-TEC supplies and installs CNG dispensers, daughter stations, storage tubes and conversion kits across Nigeria. Built for the CNG transition, installed by certified technicians.",
    "headline": "CNG equipment for Nigeria's growing gas economy",
    "intro": "As Nigeria shifts to cheaper, cleaner gas, MEGA-TEC supplies the full CNG range, dispensers, daughter stations, storage and conversion kits, engineered for safe, profitable operation and installed by certified technicians.",
    "cta": "Talk to Our Team on WhatsApp",
    "bullets": [
      "Full CNG Systems Integrator",
      "NMDPRA-Certified Calibration & Metering",
      "Assembled & Tested in Nigeria",
      "Nationwide Support"
    ],
    "subs": [
      {
        "slug": "cng-dispensers",
        "name": "CNG Dispensers",
        "title": "CNG Dispensers Nigeria | Refilling & Offloading | MEGA-TEC",
        "meta": "MEGA-TEC CNG dispensers for Nigerian stations, single and double-nozzle refilling units plus offloading dispensers. Calibrated, high-pressure, certified installation.",
        "h1": "CNG dispensers for Nigerian refuelling stations",
        "intro": [],
        "form": "Setting up CNG refuelling? Let's talk.",
        "products": [
          {
            "id": "cng-dispenser-single",
            "name": "CNG Dispenser – Single Nozzle",
            "blurb": "Reliable single-nozzle CNG refuelling, accurate to ±0.5% at up to 25MPa.",
            "best": true,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Flow range",
                "2–30 kg/min"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Gas",
                "CNG"
              ],
              [
                "Accuracy",
                "±0.5%"
              ],
              [
                "Working pressure",
                "Up to 25MPa"
              ]
            ],
            "description": "Built for accurate, dependable CNG refuelling, the Single Nozzle dispenser delivers gas to vehicles at up to 25MPa with tight ±0.5% accuracy, so every kilogram is measured fairly and sold precisely. A clean, reliable choice for stations entering Nigeria's growing CNG market, installed and commissioned by MEGA-TEC's certified technicians.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/cng-single/cng-single-2.png",
            "sheet": "CNG_Dispenser_Single_Nozzle.pdf"
          },
          {
            "id": "cng-dispenser-double",
            "name": "CNG Dispenser – Double Nozzle",
            "blurb": "Serve two vehicles at once, faster turnaround for busy CNG stations.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Flow range",
                "2–30 kg/min"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Gas",
                "CNG"
              ],
              [
                "Accuracy",
                "±0.5%"
              ],
              [
                "Working pressure",
                "Up to 25MPa"
              ]
            ],
            "description": "Keep your CNG forecourt moving by serving two vehicles at once. The Double Nozzle dispenser brings the same trusted ±0.5% accuracy and 25MPa performance across two lines, cutting queue time as demand grows. Installed and commissioned by MEGA-TEC, built for the busiest CNG stations.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/cng-double/cng-double-3.png",
            "sheet": "CNG_Dispenser_Double_Nozzle.pdf"
          },
          {
            "id": "cng-dispenser-double-2",
            "name": "CNG Dispenser – Double Nozzle (2)",
            "blurb": "The same trusted double-nozzle performance in an alternative body design.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Flow range",
                "2–30 kg/min"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Gas",
                "CNG"
              ],
              [
                "Accuracy",
                "±0.5%"
              ],
              [
                "Working pressure",
                "Up to 25MPa"
              ]
            ],
            "description": "The same reliable double-nozzle CNG performance, offered in an alternative body design to suit your forecourt layout. Two vehicles served at once, ±0.5% accuracy at up to 25MPa, installed and supported by MEGA-TEC nationwide.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": "/images/factory/cng-2-double/cng-2-double-2.png",
            "sheet": "CNG_Dispenser_Double_Nozzle_2.pdf"
          },
          {
            "id": "cng-offloading-dispenser",
            "name": "CNG Offloading Dispenser",
            "blurb": "High-flow offloading, transfers gas from delivery trailers into station storage.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Flow range",
                "1–70 kg/min"
              ],
              [
                "Structure",
                "Single gun"
              ],
              [
                "Gas",
                "CNG"
              ],
              [
                "Accuracy",
                "±1%"
              ],
              [
                "Power",
                "220V, 50Hz"
              ]
            ],
            "description": "The Offloading Dispenser does a different job from a refuelling unit: it transfers high-pressure CNG from delivery trailers into your station's on-site storage. Its higher flow range, up to 70 kg/min, is built for fast bulk transfer, making it an essential part of any daughter-station setup that receives gas by road. Supplied and installed by MEGA-TEC.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": null,
            "sheet": "CNG_Offloading_Dispenser.pdf"
          }
        ]
      },
      {
        "slug": "cng-daughter-station",
        "name": "CNG Daughter Station",
        "title": "CNG Daughter Station Nigeria | Pipeline-Free CNG Station | MEGA-TEC",
        "meta": "MEGA-TEC CNG daughter stations bring refuelling to sites with no gas pipeline. Complete skid station with compressor, storage, dispensers and safety systems. Installed nationwide.",
        "h1": null,
        "intro": [],
        "form": "Planning a daughter station? Let's talk it through.",
        "products": [
          {
            "id": "cng-daughter-station-skid-station",
            "name": "CNG Daughter Station (Skid Station)",
            "blurb": "A complete CNG station that runs without a pipeline, receives, stores and dispenses trucked-in gas.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Type",
                "Skid-mounted station"
              ],
              [
                "Gas supply",
                "No pipeline needed"
              ],
              [
                "Compressor",
                "1200 Nm³/h"
              ],
              [
                "Storage",
                "Cylinder group + tubes"
              ],
              [
                "Includes",
                "Dispensers, alarm, PLC"
              ]
            ],
            "description": "The daughter station is how you bring CNG to places the pipeline doesn't reach. This complete skid-mounted station receives high-pressure gas delivered by trailer, stores it on-site, and dispenses it to vehicles, no pipeline connection required. It comes as a full system: a 1200 Nm³/h compressor, cylinder-group and tube storage, refuelling dispensers, a leakage-alarm system and a PLC control system that runs the station automatically, all engineered to work together safely. For investors opening CNG sites ahead of the pipeline network, this is the fastest way to open your station.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/cng-daughter-station/cng-daughter-station-2.jpg",
            "sheet": "CNG_Daughter_Station.pdf"
          }
        ]
      },
      {
        "slug": "cng-storage-tubes",
        "name": "CNG Storage Tubes",
        "title": "CNG Storage Tubes Nigeria | 40ft High-Pressure Storage | MEGA-TEC",
        "meta": "MEGA-TEC 40ft CNG storage tubes, up to 7,800 Nm³ capacity, 25MPa working pressure, 20-year working life. High-pressure gas storage for Nigerian CNG stations.",
        "h1": null,
        "intro": [],
        "form": "Need storage for a CNG project? Let's talk it through.",
        "products": [
          {
            "id": "cng-storage-tubes-40ft",
            "name": "CNG Storage Tubes (40ft)",
            "blurb": "40ft container storage, up to 7,800 Nm³, built for a 20-year working life.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Capacity",
                "Up to 7,800 Nm³"
              ],
              [
                "Tubes",
                "12-tube container"
              ],
              [
                "Working pressure",
                "20–25MPa"
              ],
              [
                "Test pressure",
                "33.4MPa"
              ],
              [
                "Working life",
                "20 years"
              ]
            ],
            "description": "Reliable high-pressure storage is the backbone of any pipeline-free CNG station, and these 40ft tubes are built to last. Each 12-tube container holds up to 7,800 Nm³ of CNG at 20–25MPa, tested to 33.4MPa for safety, and engineered for a 20-year working life. Whether paired with a daughter station or expanding your existing storage, they keep your gas secure and your station running.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/cng-cylinder-75l.png",
            "sheet": "CNG_Storage_Tubes_40ft.pdf"
          }
        ]
      },
      {
        "slug": "cng-conversion-kit",
        "name": "CNG Conversion Kit & Vehicle Cylinders",
        "title": "CNG Conversion Kit & Vehicle Cylinders Nigeria | Petrol-to-CNG | MEGA-TEC",
        "meta": "MEGA-TEC CNG conversion kits and 65L and 75L vehicle cylinders let petrol vehicles run on cheaper, cleaner CNG. For fleets and individual vehicles across Nigeria.",
        "h1": null,
        "intro": [],
        "form": "Interested in CNG conversion? Let's talk.",
        "products": [
          {
            "id": "cng-conversion-kit",
            "name": "CNG Conversion Kit",
            "blurb": "Convert petrol vehicles to run on cheaper, cleaner CNG, with the reducer, injectors, wiring and fittings in one kit.",
            "best": false,
            "tag": null,
            "badge": "SON certified · MEGA-TEC supply & install",
            "cells": [
              [
                "Purpose",
                "Petrol-to-CNG conversion"
              ],
              [
                "Suits",
                "Fleets & individual petrol vehicles"
              ],
              [
                "Includes",
                "Reducer, injectors, wiring harness, sensors, filler valve, gauge, tubing, fittings"
              ],
              [
                "Pairs with",
                "65L and 75L vehicle cylinders"
              ],
              [
                "Installation",
                "By MEGA-TEC certified technicians"
              ]
            ],
            "description": "Run your petrol vehicle on CNG and spend less on fuel. The vehicle keeps its petrol system, so it can use either fuel. Fitted by MEGA-TEC's technicians.",
            "extras": [
              {
                "t": "h",
                "x": "How it works:"
              },
              {
                "t": "li",
                "x": "Gas leaves the cylinder at high pressure."
              },
              {
                "t": "li",
                "x": "The pressure reducer brings it down to a steady, safe level for the engine."
              },
              {
                "t": "li",
                "x": "The injectors feed it into the engine. The sensors tell the system how much gas to deliver."
              },
              {
                "t": "p",
                "x": "What is in the kit: pressure reducer with solenoid valve, injector rail, wiring harness with sensor leads, filler valve (where you refuel), pressure gauge, tubing and fittings."
              }
            ],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/cng-kit.png",
            "sheet": null
          },
          {
            "id": "cng-vehicle-cylinder-65l",
            "name": "CNG Vehicle Cylinder (65L)",
            "blurb": "On-board CNG cylinder, 65L water capacity, for gas storage in converted vehicles.",
            "best": false,
            "tag": null,
            "badge": "SON certified · MEGA-TEC supply & install",
            "cells": [
              [
                "Capacity",
                "65L (water capacity)"
              ],
              [
                "Fits",
                "Cars and converted vehicles"
              ],
              [
                "Gas",
                "CNG"
              ],
              [
                "Working pressure",
                "200 bar (20MPa)"
              ],
              [
                "Gas when full",
                "about 16 m³ (roughly)"
              ],
              [
                "Pairs with",
                "MEGA-TEC CNG Conversion Kit"
              ]
            ],
            "description": "Safe, dependable gas storage starts with the cylinder. The MEGA-TEC CNG Vehicle Cylinder (65L) stores compressed natural gas on board your converted vehicle at a working pressure of 200 bar (20MPa), the standard for vehicle CNG cylinders. Full, a 65-litre cylinder holds roughly 16 cubic metres of gas. It connects to the filler valve, pressure reducer and gauge in the MEGA-TEC CNG Conversion Kit, and is supplied and fitted by MEGA-TEC's certified technicians.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/cng-cylinder-65l.png",
            "sheet": null
          },
          {
            "id": "cng-vehicle-cylinder-75l",
            "name": "CNG Vehicle Cylinder (75L)",
            "blurb": "Larger 75L on-board CNG cylinder for cars, carrying more gas for a longer range between fills.",
            "best": false,
            "tag": null,
            "badge": "SON certified · MEGA-TEC supply & install",
            "cells": [
              [
                "Capacity",
                "75L (water capacity)"
              ],
              [
                "Fits",
                "Cars and converted vehicles"
              ],
              [
                "Gas",
                "CNG"
              ],
              [
                "Working pressure",
                "200 bar (20MPa)"
              ],
              [
                "Gas when full",
                "about 19 m³ (roughly)"
              ],
              [
                "Pairs with",
                "MEGA-TEC CNG Conversion Kit"
              ]
            ],
            "description": "Carry more gas for a longer range between fills. The MEGA-TEC CNG Vehicle Cylinder (75L) is the larger on-board option for cars, storing compressed natural gas at a working pressure of 200 bar (20MPa), the standard for vehicle CNG cylinders. Full, a 75-litre cylinder holds roughly 19 cubic metres of gas. It connects to the filler valve, pressure reducer and gauge in the MEGA-TEC CNG Conversion Kit, and is supplied and fitted by MEGA-TEC's certified technicians.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/cng-cylinder-75l.png",
            "sheet": null
          }
        ]
      }
    ]
  },
  {
    "slug": "lpg-solutions",
    "name": "LPG Solutions",
    "title": "LPG Solutions Nigeria | Dispensers & Gas Plant Equipment | MEGA-TEC",
    "meta": "MEGA-TEC supplies and installs LPG dispensers and gas plant equipment across Nigeria. Calibrated, NMDPRA-compliant, and built for safe retail gas dispensing.",
    "headline": "LPG dispensing equipment for Nigerian gas plants and retail outlets",
    "intro": "Safe, accurate LPG dispensing for retail gas outlets and plants across Nigeria. MEGA-TEC supplies and installs calibrated LPG dispensers, with skid plants, tanks and safety systems sourced to your project on request.",
    "cta": "Talk to Our Team on WhatsApp",
    "bullets": [
      "500+ LPG Units Installed Nationwide",
      "NMDPRA-Certified Calibration & Metering",
      "Assembled & Tested in Nigeria",
      "After-Sales That Answers"
    ],
    "subs": [
      {
        "slug": "lpg-dispensers",
        "name": "LPG Dispensers",
        "title": "LPG Dispensers Nigeria | Single & Double Nozzle | MEGA-TEC",
        "meta": "MEGA-TEC LPG dispensers for Nigerian retail gas outlets, single and double-nozzle, calibrated to ±0.3%, with air separators and long-life memory. Installed nationwide.",
        "h1": null,
        "intro": [],
        "form": "Setting up LPG retail? Let's talk.",
        "products": [
          {
            "id": "lpg-dispenser-single",
            "name": "LPG Dispenser – Single Nozzle",
            "blurb": "Accurate single-nozzle LPG dispensing, calibrated to ±0.3% for fair, precise sales.",
            "best": true,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Gas",
                "LPG"
              ],
              [
                "Nozzle config",
                "Single nozzle"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Metering",
                "Standard meter, air separator"
              ],
              [
                "Memory",
                "7-yr, 10-min backup"
              ]
            ],
            "description": "Built for accurate, safe retail LPG dispensing, the Single Nozzle dispenser measures every kilogram precisely at ±0.3%, protecting both your margin and your customers' trust. It runs a standard meter with an air separator for clean, reliable dispensing, and keeps 7 years of memory with 10-minute battery backup so your data is never lost. Very low noise in operation, calibrated before delivery, and installed by MEGA-TEC's certified technicians.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": null,
            "sheet": "LPG_Dispenser_Single_Nozzle.pdf"
          },
          {
            "id": "lpg-dispenser-double",
            "name": "LPG Dispenser – Double Nozzle",
            "blurb": "Serve two customers at once, the same ±0.3% accuracy across two nozzles.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Gas",
                "LPG"
              ],
              [
                "Nozzle config",
                "Double nozzle"
              ],
              [
                "Accuracy",
                "±0.3%"
              ],
              [
                "Metering",
                "Double meters, double air separators"
              ],
              [
                "Memory",
                "7-yr, 10-min backup"
              ]
            ],
            "description": "Keep your gas outlet moving by serving two customers at once. The Double Nozzle dispenser brings the same trusted ±0.3% accuracy across two nozzles, each with its own meter and air separator, so busy outlets stay fast without losing precision. 7-year memory with battery backup, very low noise, calibrated before delivery and installed by MEGA-TEC.",
            "extras": [],
            "warranty": "1-year warranty.",
            "image": null,
            "sheet": "LPG_Dispenser_Double_Nozzle.pdf"
          }
        ]
      },
      {
        "slug": "lpg-filling-scale",
        "name": "LPG Filling Scale",
        "title": "LPG Filling Scale Nigeria | Cylinder Filling & Weighing | MEGA-TEC",
        "meta": "MEGA-TEC LPG filling scales for accurate cylinder filling and weighing at Nigerian gas plants and outlets. Supplied and installed nationwide.",
        "h1": null,
        "intro": [],
        "form": "Need a filling scale for your plant? Let's talk.",
        "products": [
          {
            "id": "lpg-filling-scale",
            "name": "LPG Filling Scale",
            "blurb": "Automatic weight-based filling, ±0.1% weighing accuracy, PLC controlled.",
            "best": false,
            "tag": null,
            "badge": "NMDPRA compliant · MEGA-TEC supply & install",
            "cells": [
              [
                "Filling method",
                "Automatic, weight-based"
              ],
              [
                "Control",
                "Microprocessor / PLC"
              ],
              [
                "Capacity",
                "5kg–50kg cylinders"
              ],
              [
                "Weighing accuracy",
                "±0.1% of full scale"
              ],
              [
                "Filling accuracy",
                "±0.2% to ±0.5%"
              ]
            ],
            "description": "Accurate cylinder filling is the heart of any LPG retail operation, and the MEGA-TEC LPG Filling Scale is built to get it right every time. It fills and weighs cylinders automatically, from 5kg up to 50kg depending on model, with weighing accuracy to ±0.1% of full scale, helping gas plants and outlets dispense fairly, protect margins and keep customers confident in every refill. Supplied and installed by MEGA-TEC across Nigeria.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/lpg-filling/lpg-filling-1.png",
            "sheet": "LPG_Filling_Scale.pdf"
          }
        ]
      }
    ]
  },
  {
    "slug": "ev-chargers",
    "name": "EV Chargers",
    "title": "EV Chargers Nigeria | Commercial & Home DC Fast Chargers | MEGA-TEC",
    "meta": "MEGA-TEC supplies and installs DC fast EV chargers across Nigeria: a 60KW commercial dual-gun charger and a 40KW home and estate charger. Professionally installed, with a warranty.",
    "headline": "EV charging equipment for Nigerian businesses, estates and homes",
    "intro": "Fast DC charging for hotels, estates, filling stations, fleet depots and sites with three-phase power. MEGA-TEC supplies, installs and supports the complete charger, so you can start serving EV drivers quickly.",
    "cta": "Talk to Our Team on WhatsApp",
    "bullets": [
      "DC Fast Charging, 60KW and 40KW",
      "IP55 Weatherproof Units",
      "Professional Installation & Support",
      "Comes With a Warranty"
    ],
    "subs": [
      {
        "slug": "dc-fast-chargers",
        "name": "DC Fast Chargers",
        "title": "DC Fast EV Chargers Nigeria | 60KW Commercial & 40KW Home | MEGA-TEC",
        "meta": "MEGA-TEC DC fast EV chargers for Nigeria: a 60KW dual-gun commercial charger with card and QR payment, and a 40KW wall-mounted charger for homes and estates. Professionally installed.",
        "h1": null,
        "intro": [],
        "form": "Thinking about EV charging? Let's talk it through.",
        "products": [
          {
            "id": "mega-tec-ev-commercial-dc-fast-charger",
            "name": "MEGA-TEC EV – Commercial DC Fast Charger",
            "blurb": "60KW dual-gun fast charger that charges two vehicles at once, with card and QR payment built in.",
            "best": true,
            "tag": null,
            "badge": "IP55 weatherproof · MEGA-TEC supply & install",
            "cells": [
              [
                "Power",
                "60KW DC, dual gun"
              ],
              [
                "Output",
                "200–1000V, 0–250A per gun"
              ],
              [
                "Display",
                "7-inch LCD touchscreen"
              ],
              [
                "Protection",
                "IP55 weatherproof"
              ],
              [
                "Size",
                "About 70 × 60 × 170cm, floor-standing"
              ]
            ],
            "description": "Built for high-traffic commercial sites, this 60KW dual-gun cabinet charges two vehicles at once and is ready to earn revenue from day one with built-in card and QR payment. A 7-inch LCD touchscreen, network monitoring and IP55 weatherproofing make it dependable outdoors, and it delivers fast charging that a typical EV completes in around 40 minutes to an hour. Supplied, installed and commissioned by MEGA-TEC with full technical support.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/commercial-ev/commercial-ev-1.png",
            "sheet": "EV_Commercial_DC_Fast_Charger_60KW.pdf"
          },
          {
            "id": "mega-tec-ev-home-estate-dc-charger",
            "name": "MEGA-TEC EV – Home & Estate DC Charger",
            "blurb": "Compact 40KW wall-mounted fast charger for homes, estates and small sites with three-phase power.",
            "best": false,
            "tag": null,
            "badge": "IP55 weatherproof · MEGA-TEC supply & install",
            "cells": [
              [
                "Power",
                "40KW DC, single gun"
              ],
              [
                "Output",
                "200–1000VDC, 0–125A"
              ],
              [
                "Input",
                "Three-phase 380V"
              ],
              [
                "Mounting",
                "Wall-mounted, compact footprint"
              ],
              [
                "Size",
                "About 55 × 55 × 28cm"
              ]
            ],
            "description": "Real fast charging at home, not a slow trickle unit. This compact 40KW wall-mounted charger delivers DC fast charging that a typical EV completes in around 1 to 1.5 hours, with a 7-inch touchscreen and network connectivity built in. Its small footprint keeps installations clean and unobtrusive, and IP55 weatherproofing suits Nigerian conditions. Requires a three-phase 380V supply. Fitted and commissioned by MEGA-TEC's certified technicians.",
            "extras": [],
            "warranty": "Comes with a warranty.",
            "image": "/images/factory/residential-ev/residential-ev-1.png",
            "sheet": "EV_Home_Estate_DC_Charger_40KW.pdf"
          }
        ]
      }
    ]
  }
];
