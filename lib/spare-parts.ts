// Generated from the Product Catalogue document (05_Product_Catalogue.md), the verified
// spare parts list with fit tags (punch list PA-01). Edit here, not the document.

export type SparePart = {
  n: number;
  name: string;
  /** Which dispensers it fits. */
  fit: string;
  group: string;
  /** null where there is no photo yet: the card shows the muted MEGA-TEC logo. */
  image: string | null;
  /** The CNG items link to their product page instead of being described here (PA-03). */
  href?: string;
};

export const PART_GROUPS = ["METERS & UNITS", "CPUs & BOARDS", "PRESET BOARDS & ENGINES", "VALVES", "MOTORS & PUMPS", "NOZZLES, HOSES & CONNECTORS", "CNG PARTS", "WIRING & SUNDRIES"] as const;

export const SPARE_PARTS: SparePart[] = [
  {
    "n": 1,
    "name": "Bennett Meter",
    "fit": "Fuel dispensers",
    "group": "METERS & UNITS",
    "image": "/images/factory/bennet-meter.png"
  },
  {
    "n": 2,
    "name": "Bennett Unit",
    "fit": "Fuel dispensers",
    "group": "METERS & UNITS",
    "image": "/images/factory/bennet-unit.png"
  },
  {
    "n": 3,
    "name": "Tokheim Meter",
    "fit": "Fuel dispensers",
    "group": "METERS & UNITS",
    "image": "/images/factory/tokheim-meter.png"
  },
  {
    "n": 4,
    "name": "Tokheim Unit",
    "fit": "Fuel dispensers",
    "group": "METERS & UNITS",
    "image": "/images/factory/tokheim-unit-2.png"
  },
  {
    "n": 5,
    "name": "Tatsuno Meter",
    "fit": "Gear pumps",
    "group": "METERS & UNITS",
    "image": null
  },
  {
    "n": 6,
    "name": "LPG Meter",
    "fit": "LPG dispensers",
    "group": "METERS & UNITS",
    "image": "/images/factory/lpg-meter.png"
  },
  {
    "n": 7,
    "name": "LPG Flow Meter (2\")",
    "fit": "Storage tanks",
    "group": "METERS & UNITS",
    "image": "/images/factory/lpg-flow-meter-2.png"
  },
  {
    "n": 8,
    "name": "Flow Meter (2\")",
    "fit": "Universal",
    "group": "METERS & UNITS",
    "image": "/images/factory/2-inches-flow-meter.png"
  },
  {
    "n": 9,
    "name": "Flow Meter (3\")",
    "fit": "Universal",
    "group": "METERS & UNITS",
    "image": "/images/factory/3-inches-flow-meter.png"
  },
  {
    "n": 10,
    "name": "Totalizer",
    "fit": "Fuel & LPG dispensers",
    "group": "METERS & UNITS",
    "image": "/images/factory/totalizer.png"
  },
  {
    "n": 11,
    "name": "MT Plus CPU",
    "fit": "MT Plus / MT Pro",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/mt-plus-cpu.png"
  },
  {
    "n": 12,
    "name": "MT2 CPU",
    "fit": "MT2",
    "group": "CPUs & BOARDS",
    "image": null
  },
  {
    "n": 13,
    "name": "LPG CPU",
    "fit": "LPG dispensers",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/lpg-cpu.png"
  },
  {
    "n": 14,
    "name": "MT Plus Complete Panel",
    "fit": "MT Plus / MT Pro",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/mt-plus-complete-panel.png"
  },
  {
    "n": 15,
    "name": "MT2 Complete Panel",
    "fit": "MT2",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/complete-panel-mt2.png"
  },
  {
    "n": 16,
    "name": "LPG Complete Panel",
    "fit": "LPG dispensers",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/lpg-complete-panel.png"
  },
  {
    "n": 17,
    "name": "Power Board",
    "fit": "Fuel dispensers",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/power-board.png"
  },
  {
    "n": 18,
    "name": "MT Plus Display Board",
    "fit": "MT Plus",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/mt-plus-display.png"
  },
  {
    "n": 19,
    "name": "MT2 Display Board",
    "fit": "MT Plus / MT Pro",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/mt2-fullface-display.png"
  },
  {
    "n": 20,
    "name": "2-Step Display Board",
    "fit": "MT Plus",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/2-step-display-board.png"
  },
  {
    "n": 21,
    "name": "3-Step Display Board (MT2)",
    "fit": "MT2, MT Royal",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/3-step-display-board.png"
  },
  {
    "n": 22,
    "name": "Unit Price Display",
    "fit": "Fuel dispensers",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/unit-price.png"
  },
  {
    "n": 23,
    "name": "Small IC",
    "fit": "Fuel dispensers & LPG",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/small-1c.png"
  },
  {
    "n": 24,
    "name": "5-Digit Big IC",
    "fit": "Fuel dispensers",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/updated-big-ic-5-digits.png"
  },
  {
    "n": 25,
    "name": "Relay",
    "fit": "Fuel dispensers & LPG",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/relay.png"
  },
  {
    "n": 26,
    "name": "Transformer",
    "fit": "Fuel dispensers & LPG",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/transformer.png"
  },
  {
    "n": 27,
    "name": "Transformer (with filter)",
    "fit": "Fuel dispensers & LPG",
    "group": "CPUs & BOARDS",
    "image": "/images/factory/transformer-with-filter.png"
  },
  {
    "n": 28,
    "name": "MT Plus Preset Board",
    "fit": "LPG · MT Plus / MT Pro · MT Royal",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/mt-plus-preset-board.png"
  },
  {
    "n": 29,
    "name": "MT Plus Preset Engine",
    "fit": "MT Plus / MT Pro",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/mt-plus-preset-engine.png"
  },
  {
    "n": 30,
    "name": "LPG Preset Board",
    "fit": "LPG dispensers",
    "group": "PRESET BOARDS & ENGINES",
    "image": null
  },
  {
    "n": 31,
    "name": "LPG Preset Engine",
    "fit": "LPG dispensers",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/lpg-preset-engine-2.png"
  },
  {
    "n": 32,
    "name": "5-Digit Preset Board (MT2)",
    "fit": "MT2",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/5-digits-mt2-preset-board.png"
  },
  {
    "n": 33,
    "name": "5-Digit Preset Engine (MT2)",
    "fit": "MT2",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/mt2-5-digit-preset-engine.png"
  },
  {
    "n": 34,
    "name": "7-Digit Preset Board (MT2)",
    "fit": "MT2",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/7-digits-mt2-preset-board.png"
  },
  {
    "n": 35,
    "name": "7-Digit Preset Engine (MT2)",
    "fit": "MT2",
    "group": "PRESET BOARDS & ENGINES",
    "image": "/images/factory/mt2-7-digit-preset-engine.png"
  },
  {
    "n": 36,
    "name": "Solenoid Valve",
    "fit": "Fuel dispensers",
    "group": "VALVES",
    "image": "/images/factory/fuel-solenoid-valve.png"
  },
  {
    "n": 37,
    "name": "LPG Solenoid Valve",
    "fit": "LPG dispensers",
    "group": "VALVES",
    "image": "/images/factory/lpg-socenoid-valve.png"
  },
  {
    "n": 38,
    "name": "LPG Valve",
    "fit": "LPG dispensers",
    "group": "VALVES",
    "image": "/images/factory/lpg-valve.png"
  },
  {
    "n": 39,
    "name": "Valve Coil",
    "fit": "Fuel dispensers & LPG",
    "group": "VALVES",
    "image": "/images/factory/socenoid-valve-coil.png"
  },
  {
    "n": 40,
    "name": "Non-Return Valve",
    "fit": "Fuel dispensers",
    "group": "VALVES",
    "image": "/images/factory/non-return-valve.png"
  },
  {
    "n": 41,
    "name": "Angle Check Valve (1.5\")",
    "fit": "LPG dispensers",
    "group": "VALVES",
    "image": "/images/factory/angle-check-valve-15-inch.png"
  },
  {
    "n": 42,
    "name": "Male & Female Valve",
    "fit": "Fuel dispensers",
    "group": "VALVES",
    "image": "/images/factory/male-and-female-valve.png"
  },
  {
    "n": 43,
    "name": "Submersible Shut-Off Valve",
    "fit": "Fuel dispensers",
    "group": "VALVES",
    "image": "/images/factory/submersible-shut-off-valve.png"
  },
  {
    "n": 44,
    "name": "Electric Motor",
    "fit": "Fuel dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/electric-motor.png"
  },
  {
    "n": 45,
    "name": "12V Mini Pump",
    "fit": "Transfer pump",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/transfer-mini-pump-12-vlts.png"
  },
  {
    "n": 46,
    "name": "24V Mini Pump",
    "fit": "Transfer pump",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/transfer-mini-pump-24-vkts.png"
  },
  {
    "n": 47,
    "name": "220V Mini Pump",
    "fit": "Transfer pump",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/transfer-mini-pump-220-vlts.png"
  },
  {
    "n": 48,
    "name": "LPG Electric Motor (1\", 220V)",
    "fit": "LPG dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/lpg-electric-motor.png"
  },
  {
    "n": 49,
    "name": "LPG Electric Motor (2\", 220V)",
    "fit": "LPG dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/lpg-eletric-motor.png"
  },
  {
    "n": 50,
    "name": "LPG Electric Motor (380V, 4K)",
    "fit": "LPG dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/lpg-electric-motor-380v.png"
  },
  {
    "n": 51,
    "name": "Gear Pump Inlet Filter",
    "fit": "Gear pumps",
    "group": "MOTORS & PUMPS",
    "image": null
  },
  {
    "n": 52,
    "name": "Gear Pump Outlet Filter",
    "fit": "Gear pumps",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/gear-pump-outlet-filter.png"
  },
  {
    "n": 53,
    "name": "Capacitor (Ash)",
    "fit": "Fuel dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/ash-capacitor.png"
  },
  {
    "n": 54,
    "name": "Capacitor (Black)",
    "fit": "Fuel dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/black-capacitor.png"
  },
  {
    "n": 55,
    "name": "Running Capacitor",
    "fit": "Fuel dispensers",
    "group": "MOTORS & PUMPS",
    "image": "/images/factory/running-capacitor.png"
  },
  {
    "n": 56,
    "name": "Nozzle",
    "fit": "Fuel dispensers & LPG",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/nozzle.png"
  },
  {
    "n": 57,
    "name": "Nozzle (1\")",
    "fit": "Fuel dispensers",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/1-inch-nozzle.png"
  },
  {
    "n": 58,
    "name": "Nozzle Holder (Plastic)",
    "fit": "Fuel dispensers",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/nozzle-holder-plastic.png"
  },
  {
    "n": 59,
    "name": "Hose",
    "fit": "Fuel dispensers",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/hose.png"
  },
  {
    "n": 60,
    "name": "LPG Hose",
    "fit": "LPG dispensers",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/lpg-hose.png"
  },
  {
    "n": 61,
    "name": "Bennett Flexible Connectors",
    "fit": "Bennett units",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/bennet-flexible-connector.png"
  },
  {
    "n": 62,
    "name": "Tokheim Flexible Connector (20cm)",
    "fit": "Tokheim units",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/tokhiem-flexible-connector.png"
  },
  {
    "n": 63,
    "name": "Coupling Set",
    "fit": "Fuel dispensers",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/coupling.png"
  },
  {
    "n": 64,
    "name": "Coupling Set (1\")",
    "fit": "Fuel dispensers, 1\" hose",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/1-coupling.png"
  },
  {
    "n": 65,
    "name": "Elbow",
    "fit": "Fuel dispensers",
    "group": "NOZZLES, HOSES & CONNECTORS",
    "image": "/images/factory/elbow.png"
  },
  {
    "n": 66,
    "name": "CNG Cylinder (65L)",
    "fit": "CNG",
    "group": "CNG PARTS",
    "image": "/images/factory/cng-cylinder-65l.png",
    "href": "/products/cng-solutions/cng-conversion-kit"
  },
  {
    "n": 67,
    "name": "CNG Cylinder (75L)",
    "fit": "CNG",
    "group": "CNG PARTS",
    "image": "/images/factory/cng-cylinder-75l.png",
    "href": "/products/cng-solutions/cng-conversion-kit"
  },
  {
    "n": 68,
    "name": "CNG Kits",
    "fit": "CNG",
    "group": "CNG PARTS",
    "image": "/images/factory/cng-kit.png",
    "href": "/products/cng-solutions/cng-conversion-kit"
  },
  {
    "n": 69,
    "name": "Pulsar (Big)",
    "fit": "Fuel dispensers",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/big-pulsar.png"
  },
  {
    "n": 70,
    "name": "Pulsar (Small)",
    "fit": "Fuel dispensers",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/small-pulsar.png"
  },
  {
    "n": 71,
    "name": "Submersible Air Separator",
    "fit": "Submersible (STP)",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/submersible-air-seperator.png"
  },
  {
    "n": 72,
    "name": "Operation Key",
    "fit": "Fuel dispensers & LPG",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/operation-key.png"
  },
  {
    "n": 73,
    "name": "Wire (CPU to Display Board)",
    "fit": "Fuel dispensers & LPG",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/mt-plus-cpu-display-wire.png"
  },
  {
    "n": 74,
    "name": "Wire (CPU to Preset Board)",
    "fit": "Fuel dispensers & LPG",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/cpu-to-preset-wire.png"
  },
  {
    "n": 75,
    "name": "Wire (Power Board to CPU)",
    "fit": "Fuel dispensers & LPG",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/power-board-to-cpu-wire.png"
  },
  {
    "n": 76,
    "name": "Measuring Can (10L)",
    "fit": "Calibration",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/measuring-can-10l.png"
  },
  {
    "n": 77,
    "name": "Measuring Can (20L)",
    "fit": "Calibration",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/20l-measuring-can.png"
  },
  {
    "n": 78,
    "name": "Water Paste",
    "fit": "Fuel dispensers",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/water-paste.png"
  },
  {
    "n": 79,
    "name": "MT Plus Side Glass",
    "fit": "MT Plus / MT Pro",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/mt-plus-side-glass.png"
  },
  {
    "n": 80,
    "name": "MT Plus Flex Sticker",
    "fit": "MT Plus / MT Pro",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/mt-plus-flex-sticker.png"
  },
  {
    "n": 81,
    "name": "MT Plus Preset Sticker",
    "fit": "MT Plus / MT Pro",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/mt2-plus-preset-sticker.png"
  },
  {
    "n": 82,
    "name": "5-Digit Preset Sticker (Ash)",
    "fit": "MT2",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/mt2-preset-sticker-ash.png"
  },
  {
    "n": 83,
    "name": "5-Digit Preset Sticker (White)",
    "fit": "MT2",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/preset-sticker-white.png"
  },
  {
    "n": 84,
    "name": "7-Digit Preset Sticker (White)",
    "fit": "MT2",
    "group": "WIRING & SUNDRIES",
    "image": "/images/factory/preset-sticker-white.png"
  }
];
