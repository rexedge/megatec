import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ProjectsGrid, type ProjectEntry } from "@/components/sections/projects-grid";

/**
 * Copy is from the Core Site Pages document, Page 3 "Projects / Installations"
 * (punch list NP-01). The document builds eight card slots but keeps the ones
 * without details and photos unpublished: the CNG project waits for MEGA-TEC (the
 * CNG tab keeps its empty message), and the testimonials stay out until real,
 * cleared quotes arrive. NIPCO and Total were added in October 2026 (R2-14); Total
 * took MRS's place.
 */
export const metadata: Metadata = {
  title: "Our Installations | Fuel, LPG, CNG & EV Projects Across Nigeria | MEGA-TEC",
  description:
    "See MEGA-TEC's completed fuel dispenser, LPG, CNG and EV installations across Nigeria. Real projects, real stations, nationwide.",
};

const PROJECTS: ProjectEntry[] = [
  {
    name: "Nepal Energies",
    location: "Nationwide",
    categories: ["Fuel Dispensers", "LPG"],
    description:
      "A multi-contract partnership beginning with a major 200-dispenser supply, and continued through repeat orders over several years.",
    image: "/images/projects/nepal-energies.jpg",
  },
  {
    name: "Sterling Oil & Gas",
    location: "Lagos, Akwa Ibom & Port Harcourt",
    categories: ["Fuel Dispensers"],
    description:
      "Supply, installation and calibration of fuel dispensers and flow meters across multiple sites.",
  },
  {
    name: "NIPCO",
    categories: ["Fuel Dispensers"],
    description:
      "Supply, installation and calibration of fuel dispensers and flow meters across multiple sites.",
    image: "/images/projects/nipco.jpg",
  },
  {
    name: "Total",
    categories: ["Fuel Dispensers"],
    description: "MEGA-TEC fuel dispensers in service at a Total station on New Yidi Road.",
    image: "/images/projects/total.jpg",
    // The photo is a wide panorama: keep the cropped card on the centre pump.
    imagePosition: "52% 50%",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects & Installations" }]} />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <h1 className="text-ink max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Where we&apos;ve done the work
          </h1>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            From single-station forecourts to nationwide multi-contract supply, here&apos;s a look
            at the installations MEGA-TEC has delivered across Nigeria.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:pt-0 sm:pb-16 lg:pb-20">
        <Container>
          <ProjectsGrid projects={PROJECTS} />
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-16 lg:py-20">
        <Container>
          <h2 className="text-ink max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Installed and supported across Nigeria
          </h2>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            MEGA-TEC has completed installations across 31 states and the FCT, supported by 80+
            engineers and 6 branches.
          </p>
        </Container>
      </section>

      <ClosingCta title="Want to be our next successful installation?" />
    </>
  );
}
