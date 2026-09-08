import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { AboutCarousel } from "@/components/sections/about-carousel";
import { StatsCta } from "@/components/sections/stats-cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export const metadata: Metadata = {
  title: "About Us | Megatec",
  description:
    "Megatec Pumps is a leading manufacturer and supplier of advanced fuel and gas dispensing systems, engineered for efficiency, safety, and reliability.",
};

const GALLERY = [
  "/images/landing/rectangle-fuel-dispensers.png",
  "/images/landing/rectangle-cng.png",
  "/images/landing/rectangle-lpg.png",
  "/images/landing/rectangle-ev-charger.png",
  "/images/landing/rectangle-installation.png",
  "/images/landing/rectangle-maintenance.png",
  "/images/operations/assembly-line.jpg",
  "/images/operations/engineering-team.jpg",
];

const EXPERTISE = [
  {
    title: "Advanced Fuel Dispensing Systems",
    description:
      "We design, engineer, and manufacture a diverse range of fuel dispensers for retail forecourts, commercial fleets, marinas, and private fueling stations. Our systems are renowned for their measurement accuracy, durable construction, and user-friendly interfaces.",
  },
  {
    title: "Integrated Technology",
    description:
      "Our products seamlessly integrate with modern payment systems, station automation software, and IoT-based monitoring tools, giving you complete control and valuable data insights.",
  },
  {
    title: "Comprehensive Gas Dispensing Solutions",
    description:
      "We are at the forefront of providing safe and efficient solutions for a variety of gases, including Compressed Natural Gas (CNG), Liquefied Petroleum Gas (LPG), and other alternative fuels. Our expertise ensures compliance with the strictest safety protocols.",
  },
  {
    title: "Unmatched Support and Service",
    description:
      "A Megatec pump is a long-term investment. We stand behind our products with comprehensive after-sales support, maintenance services, and a ready supply of genuine spare parts to ensure minimal downtime and peak performance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />

      <section className="py-16 lg:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
            About Megatec Pumps: Our Story and Mission
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-body">
            Welcome to Megatec Pumps, a leading manufacturer and supplier of advanced fuel
            dispensing systems and comprehensive gas dispensing solutions. Our journey began
            with a passion for innovation and an unwavering commitment to delivering
            high-quality products that meet the dynamic needs of our customers across the
            globe. We are not just manufacturers; we are architects of efficiency, safety, and
            reliability for the energy distribution industry.
          </p>
          <div className="mt-8">
            <WhatsappButton />
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {GALLERY.map((src) => (
              <div key={src} className="relative aspect-3/4 overflow-hidden rounded-xl bg-surface-soft">
                <Image src={src} alt="" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Our Journey
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-body">
              <p>
                Founded by a team of industry veterans, Megatec Pumps was born from a clear
                vision: to revolutionize the way fuel and gas are dispensed. We saw a need in
                the market for equipment that was not only robust and accurate but also
                intelligent and adaptable to future technologies.
              </p>
              <p>
                Today, our commitment extends beyond mere functionality. We strive to create
                sustainable solutions that minimize environmental impact and maximize
                operational lifespan, ensuring a greener future for generations to come.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-body">
              <p>
                From our very first design to our current state-of-the-art product line, this
                founding principle has been our guiding light. Over the years, we have grown
                from a dedicated workshop into a trusted global name, known for our
                engineering excellence and customer-centric approach.
              </p>
              <p>
                Our mission is to empower businesses with the most reliable, efficient, and
                innovative fuel and gas dispensing technologies. We envision a world where
                energy distribution is seamless, safe, and environmentally responsible.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <AboutCarousel />

      <section className="pb-20 lg:pb-28">
        <Container>
          <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
            What We Do: Expertise in Action
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            {EXPERTISE.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-medium tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-body leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUs />

      <StatsCta />
    </>
  );
}
