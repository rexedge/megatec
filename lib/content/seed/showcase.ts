// Projects, testimonials and client logos as first published. `pnpm db:seed` loads them
// into the database; until the site has one, the pages read them from here.

import type { ClientLogo, Project, Testimonial } from "@/lib/content/types";

/**
 * Only real, named engagements belong here. The Nepal and Sterling copy is verbatim from
 * the Core Site Pages document (Homepage §4, Projects §2); Canico is a confirmed client
 * named in its Global Rules.
 *
 * TODO(assets): Sterling has no photo yet, so its cards are text only. Canico needs a
 * location and a one-line outcome. MRS, NIPCO and a CNG project wait for details and
 * photos before they are added. MEGA-TEC must confirm every card is client-approved.
 */
export const SEED_PROJECTS: Project[] = [
  {
    name: "Nepal Energies",
    location: "Nationwide",
    categories: ["Fuel Dispensers", "LPG"],
    description:
      "A multi-contract partnership beginning with a major 200-dispenser supply, and continued through repeat orders over several years.",
    image: "/images/projects/nepal-energies.jpg",
    onHome: true,
    onProjectsPage: true,
  },
  {
    name: "Canico",
    location: "",
    categories: ["Fuel Dispensers"],
    description: "MEGA-TEC fuel dispensers in service on Canico's forecourt.",
    image: "/images/projects/canico.jpg",
    onHome: true,
    onProjectsPage: false,
  },
  {
    name: "Sterling Oil & Gas",
    location: "Lagos, Akwa Ibom & Port Harcourt",
    categories: ["Fuel Dispensers"],
    description:
      "Supply, installation and calibration of fuel dispensers and flow meters across multiple sites.",
    onHome: true,
    onProjectsPage: true,
  },
];

/**
 * Customer quotes, verbatim from the Core Site Pages document, Homepage §5.
 *
 * TODO(assets): quotes 1-3 name a company but no person, and 4-5 carry no attribution.
 * Collect name, role and consent for each before launch.
 */
export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Since the installation of the new dispensers, we have experienced smoother operations, reduced downtime, and better customer satisfaction at our station.",
    company: "Nepal Energies (Technical Director)",
  },
  {
    quote:
      "We now have a modern dispensing setup that meets our daily operational demands with excellent accuracy and consistency.",
    company: "Masters Energy",
  },
  {
    quote:
      "The installation and calibration were professionally handled, and the dispensers have been operating efficiently since commissioning.",
    company: "Sterling Oil & Gas",
  },
  {
    quote:
      "Five years of use and we've had almost no need for maintenance. That's why we keep coming back.",
  },
  {
    quote:
      "We left a far more expensive brand because it kept giving us problems. The MEGA-TEC pumps just work.",
  },
];

/**
 * The client logos, in the order the Core Site Pages document lists them (Homepage §1).
 *
 * TODO(assets): the document lists nine; the Sterling Oil & Gas file, second in its
 * order, is still to be supplied, so eight show.
 */
export const SEED_CLIENT_LOGOS: ClientLogo[] = [
  { name: "Nepal Energies", src: "/images/clients/nepal-energies.png", width: 410, height: 125 },
  { name: "Masters Energy", src: "/images/clients/masters-energy.png", width: 446, height: 445 },
  { name: "MRS", src: "/images/clients/mrs.png", width: 318, height: 339 },
  { name: "NIPCO", src: "/images/clients/nipco.png", width: 341, height: 127 },
  { name: "Lado Oil", src: "/images/clients/lado-oil.png", width: 243, height: 67 },
  { name: "American Embassy (Lagos)", src: "/images/clients/us-embassy.png", width: 448, height: 446 },
  { name: "SEEPCO", src: "/images/clients/seepco.png", width: 143, height: 190 },
  { name: "CRCC and CCECC", src: "/images/clients/crcc-ccecc.png", width: 341, height: 161 },
];
