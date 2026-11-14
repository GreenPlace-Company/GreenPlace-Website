/**
 * SAMPLE CATALOG
 *
 * Every product in this file is a placeholder for layout and checkout.
 * Names start with "Sample". Illustrations are original drawings in
 * public/products — not photographs, logos, or real brands.
 *
 * To take the store live, delete these entries and add real products
 * that match the Product type. Prices are integer US cents.
 */

export const categories = [
  {
    slug: "power-stations",
    name: "Power Stations",
    summary:
      "Portable battery power for outages, job sites, and time away from the grid.",
  },
  {
    slug: "solar-backup-kits",
    name: "Solar Backup Kits",
    summary:
      "Home backup kits that pair a sample array with storage. The manufacturer ships the kit.",
  },
  {
    slug: "ev-chargers",
    name: "EV Chargers",
    summary:
      "Home charging equipment for the driveway. Confirm panel capacity before you order.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  /** Price in integer US cents. */
  price: number;
  /** Optional comparison price in integer US cents. */
  compareAtPrice?: number;
  /** Public paths, for example /products/sample-power-station-2000.svg */
  images: readonly [string, ...string[]];
  shortDescription: string;
  description: string;
  specs: readonly ProductSpec[];
  /** Drop-ship note shown beside the price. */
  supplierNote: string;
  /** Sample manufacturer freight is waived when this is true. */
  freeShipping: boolean;
  /** Shown in the home featured row. */
  featured?: boolean;
  /** Placeholder row. Set false when a real product replaces a sample. */
  sample: boolean;
};

const directShip =
  "Ships direct from the manufacturer. Green Place Solutions does not hold this item in inventory.";

export const products: readonly Product[] = [
  {
    id: "sample-ps-2000",
    slug: "sample-power-station-2000",
    name: "Sample Power Station 2000",
    brand: "Sample Line",
    category: "power-stations",
    price: 189900,
    compareAtPrice: 219900,
    images: [
      "/products/sample-power-station-2000.svg",
      "/products/sample-power-station-2000-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a 2,048Wh-class portable station with household outlets.",
    description:
      "This sample stands in for a large portable power station: enough capacity, in the fiction of this catalog, to run a refrigerator, lights, and a few small devices during an outage. It is not a real product and cannot be shipped. Use it to review the product page, cart, and checkout before real stations are added.",
    specs: [
      { label: "Capacity", value: "2,048 Wh (sample figure)" },
      { label: "AC output", value: "2,000 W (sample figure)" },
      { label: "Chemistry", value: "Lithium iron phosphate (sample)" },
      { label: "Outlets", value: "6 AC, 2 USB-C, 2 USB-A (sample)" },
      { label: "Weight", value: "48 lb (sample figure)" },
      { label: "Recharge", value: "Wall outlet or sample solar input" },
    ],
    supplierNote: `${directShip} Free shipping is offered on this sample item.`,
    freeShipping: true,
    featured: true,
    sample: true,
  },
  {
    id: "sample-ps-1000",
    slug: "sample-power-station-1000",
    name: "Sample Power Station 1000",
    brand: "Sample Line",
    category: "power-stations",
    price: 109900,
    compareAtPrice: 129900,
    images: [
      "/products/sample-power-station-1000.svg",
      "/products/sample-power-station-1000-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a mid-size station that one person can carry.",
    description:
      "A mid-size sample station for weekend trips and shorter outages. The figures below are invented so the spec table has a realistic shape. Replace this entry before anyone can buy it.",
    specs: [
      { label: "Capacity", value: "1,024 Wh (sample figure)" },
      { label: "AC output", value: "1,200 W (sample figure)" },
      { label: "Chemistry", value: "Lithium iron phosphate (sample)" },
      { label: "Outlets", value: "4 AC, 2 USB-C (sample)" },
      { label: "Weight", value: "29 lb (sample figure)" },
      { label: "Recharge", value: "Wall outlet (sample)" },
    ],
    supplierNote: `${directShip} Manufacturer freight may apply. This sample item does not include free shipping.`,
    freeShipping: false,
    sample: true,
  },
  {
    id: "sample-ps-500",
    slug: "sample-power-station-500",
    name: "Sample Power Station 500",
    brand: "Sample Line",
    category: "power-stations",
    price: 64900,
    images: [
      "/products/sample-power-station-500.svg",
      "/products/sample-power-station-500-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a compact station that lives in a closet until the lights go out.",
    description:
      "The smallest sample station in the catalog. It exists so the shop grid has a lower price point in the power line. Specs are placeholders, and the drawing is an original illustration.",
    specs: [
      { label: "Capacity", value: "512 Wh (sample figure)" },
      { label: "AC output", value: "600 W (sample figure)" },
      { label: "Chemistry", value: "Lithium iron phosphate (sample)" },
      { label: "Outlets", value: "2 AC, 2 USB-C (sample)" },
      { label: "Weight", value: "14 lb (sample figure)" },
      { label: "Recharge", value: "Wall outlet (sample)" },
    ],
    supplierNote: `${directShip} Manufacturer freight may apply. This sample item does not include free shipping.`,
    freeShipping: false,
    sample: true,
  },
  {
    id: "sample-solar-5kw",
    slug: "sample-solar-home-backup-kit-5kw",
    name: "Sample Solar Home Backup Kit 5kW",
    brand: "Sample Line",
    category: "solar-backup-kits",
    price: 749900,
    compareAtPrice: 829900,
    images: [
      "/products/sample-solar-home-backup-kit-5kw.svg",
      "/products/sample-solar-home-backup-kit-5kw-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a 5kW-class array paired with home battery storage.",
    description:
      "This sample kit represents a modest home backup: panels, a battery cabinet, and the hardware a manufacturer would ship together. Green Place Solutions would never warehouse it. The numbers are sample figures for the layout, not an engineering proposal.",
    specs: [
      { label: "Array", value: "5 kW class (sample figure)" },
      { label: "Storage", value: "10 kWh class (sample figure)" },
      { label: "Modules", value: "12 sample panels" },
      { label: "Backup", value: "Essential-load panel (sample)" },
      { label: "Install", value: "Arranged by the manufacturer (sample)" },
      { label: "Monitoring", value: "Sample app, not a real service" },
    ],
    supplierNote: `${directShip} Free shipping is offered on this sample item.`,
    freeShipping: true,
    featured: true,
    sample: true,
  },
  {
    id: "sample-solar-10kw",
    slug: "sample-solar-home-backup-kit-10kw",
    name: "Sample Solar Home Backup Kit 10kW",
    brand: "Sample Line",
    category: "solar-backup-kits",
    price: 1299900,
    images: [
      "/products/sample-solar-home-backup-kit-10kw.svg",
      "/products/sample-solar-home-backup-kit-10kw-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a larger whole-home backup kit with a bigger array.",
    description:
      "A larger sample kit for households that want more of the roof covered and a longer backup window. It is still a placeholder: no roof study, no permit, and no real equipment behind the drawing.",
    specs: [
      { label: "Array", value: "10 kW class (sample figure)" },
      { label: "Storage", value: "20 kWh class (sample figure)" },
      { label: "Modules", value: "24 sample panels" },
      { label: "Backup", value: "Whole-home panel (sample)" },
      { label: "Install", value: "Arranged by the manufacturer (sample)" },
      { label: "Monitoring", value: "Sample app, not a real service" },
    ],
    supplierNote: `${directShip} Free shipping is offered on this sample item.`,
    freeShipping: true,
    sample: true,
  },
  {
    id: "sample-solar-800",
    slug: "sample-solar-panel-pair-800w",
    name: "Sample Solar Panel Pair 800W",
    brand: "Sample Line",
    category: "solar-backup-kits",
    price: 149900,
    images: [
      "/products/sample-solar-panel-pair-800w.svg",
      "/products/sample-solar-panel-pair-800w-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for an expansion pair that adds input to a portable station.",
    description:
      "Two sample panels, drawn as a matched pair, for shoppers who already have a station and want more solar input. They are not real modules and have no electrical rating you should build from.",
    specs: [
      { label: "Combined rating", value: "800 W class (sample figure)" },
      { label: "Modules", value: "2 sample panels" },
      { label: "Use", value: "Expansion input for a sample station" },
      { label: "Cabling", value: "Sample leads included in the fiction" },
      { label: "Mount", value: "Ground stand (sample)" },
      { label: "Weight", value: "42 lb for the pair (sample figure)" },
    ],
    supplierNote: `${directShip} Manufacturer freight may apply. This sample item does not include free shipping.`,
    freeShipping: false,
    sample: true,
  },
  {
    id: "sample-ev-40a",
    slug: "sample-ev-home-charger-40a",
    name: "Sample EV Home Charger 40A",
    brand: "Sample Line",
    category: "ev-chargers",
    price: 89900,
    images: [
      "/products/sample-ev-home-charger-40a.svg",
      "/products/sample-ev-home-charger-40a-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a 40-amp home charger on a dedicated circuit.",
    description:
      "A sample wall charger for an overnight home session. The connector in the drawing is generic on purpose — it is not a branded plug. A licensed electrician would still need to confirm the panel before any real unit is ordered.",
    specs: [
      { label: "Current", value: "40 A (sample figure)" },
      { label: "Install", value: "Hardwired (sample)" },
      { label: "Cable", value: "24 ft (sample figure)" },
      { label: "Connector", value: "Generic sample connector" },
      { label: "Enclosure", value: "Indoor or outdoor sample housing" },
      { label: "Circuit", value: "Dedicated breaker required (sample note)" },
    ],
    supplierNote: `${directShip} Manufacturer freight may apply. This sample item does not include free shipping.`,
    freeShipping: false,
    sample: true,
  },
  {
    id: "sample-ev-48a",
    slug: "sample-ev-home-charger-48a",
    name: "Sample EV Home Charger 48A",
    brand: "Sample Line",
    category: "ev-chargers",
    price: 129900,
    compareAtPrice: 149900,
    images: [
      "/products/sample-ev-home-charger-48a.svg",
      "/products/sample-ev-home-charger-48a-detail.svg",
    ],
    shortDescription:
      "Sample stand-in for a higher-output 48-amp home charger.",
    description:
      "The higher-output sample charger. It exists so the EV line has a featured piece with a comparison price. Nothing in the spec table is a promise about a real vehicle or a real electrical service.",
    specs: [
      { label: "Current", value: "48 A (sample figure)" },
      { label: "Install", value: "Hardwired (sample)" },
      { label: "Cable", value: "24 ft (sample figure)" },
      { label: "Connector", value: "Generic sample connector" },
      { label: "Enclosure", value: "Indoor or outdoor sample housing" },
      { label: "Circuit", value: "60 A breaker class (sample note)" },
    ],
    supplierNote: `${directShip} Free shipping is offered on this sample item.`,
    freeShipping: true,
    featured: true,
    sample: true,
  },
];

export function isCategorySlug(value: string): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

export function getCategory(slug: CategorySlug) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    throw new Error(`Unknown category: ${slug}`);
  }
  return category;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function catalogIsSampleOnly() {
  return products.length > 0 && products.every((product) => product.sample);
}
