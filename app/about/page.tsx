import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { AboutCarousel } from "@/components/sections/about-carousel";
import { ByTheNumbers } from "@/components/sections/by-the-numbers";
import { ClosingCta } from "@/components/sections/closing-cta";

/**
 * Copy is verbatim from the Core Site Pages document, Page 2 "About" (punch list
 * AB-01 to AB-08). It replaces the old text section by section: "Our Journey", "What
 * We Do: Expertise in Action" and "Why Choose Megatec Pumps?" are gone, because
 * they claimed R&D, IoT monitoring, marinas and "stringent international standards"
 * that Mega-Tec has not confirmed.
 */
export const metadata: Metadata = {
  title: "About MEGA-TEC | Nigeria's Fuel & Energy Dispensing Company",
  description:
    "MEGA-TEC assembles and installs fuel dispensers, LPG, CNG and EV charging infrastructure across Nigeria. Founded 2012. 1,500+ stations equipped. The story of how we got here.",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <span className="bg-accent-soft text-text inline-flex items-center rounded-full px-3 py-2 text-sm">
            Founded 2012 · 1,500+ stations equipped
          </span>
          <h1 className="text-ink mt-6 max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            We didn&apos;t just import Nigeria&apos;s fuel dispensers. We learned to build them
            here.
          </h1>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            MEGA-TEC is a Nigerian-owned energy dispensing company supplying fuel, LPG, CNG and EV
            charging infrastructure, assembled and tested locally, installed nationwide.
          </p>

          <div className="bg-surface-soft relative mt-8 aspect-4/3 overflow-hidden rounded-3xl sm:mt-12 sm:aspect-3/2 lg:aspect-2/1">
            <Image
              src="/images/operations/assembly-floor.jpg"
              alt="MEGA-TEC technicians assembling fuel dispensers on the assembly floor"
              fill
              loading="eager"
              quality={90}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-[50%_45%]"
            />
          </div>
        </Container>
      </section>

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:sticky lg:top-28 lg:self-start lg:text-5xl">
              From a simple question to Nigeria&apos;s assembly floor
            </h2>

            <div className="text-body flex flex-col gap-6 text-lg leading-relaxed">
              <p>
                Our founder spent two years in the UK working for a company that sold fuel
                dispensers to African markets. Their model was straightforward: buy the equipment
                from China, certify it, rebrand it, and sell it on to Africa at a premium. One
                question stayed with him. Why should Nigerians travel to the UK to buy equipment
                made in China, when they could buy it from China directly? That question became
                MEGA-TEC.
              </p>
              <p>
                In the early years we imported our dispensers whole. Then the 2016 downturn hit,
                the dollar surged, freight and clearing costs climbed, and profit all but
                vanished. We had a choice: cut corners on quality like others did, or look
                inwards. We chose to assemble the dispensers ourselves here in Nigeria, using a
                Completely Knocked Down model (importing them as parts and assembling them here)
                to control cost. It saved the business, and it did something bigger. For the first
                time we could fully test every unit before it left our hands, and complaints
                dropped by more than 80%. It also meant the jobs stayed here, employing Nigerian
                engineers rather than being lost abroad.
              </p>
              <p>
                There was one more decision that set us apart. The first serious dispensers in
                Nigeria were built on components that nearly every dispenser engineer in the
                country trained on from the 1960s onwards, the same components we use today. When
                the downturn forced that original brand out, most brands switched to cheaper,
                inferior parts to protect their margins. We kept the original standard, and
                inherited the engineers who had mastered it. That is why MEGA-TEC pumps are
                different in the way that matters most: no single supplier controls the spare
                parts. Any engineer can service our pumps, and the parts are openly available in
                the market. Even if we stopped producing tomorrow, your pump keeps running, while
                imported brands that discontinue a model leave buyers replacing an entire working
                pump over one unavailable part.
              </p>

              <figure className="mt-2 flex items-center gap-5">
                <Image
                  src="/images/team/ikenna-okpala-headshot.jpg"
                  alt="Portrait of Ikenna Okpala"
                  width={112}
                  height={112}
                  className="h-24 w-24 shrink-0 rounded-full object-cover lg:h-28 lg:w-28"
                />
                <figcaption>
                  <p className="text-ink text-xl font-medium tracking-tight">Ikenna Okpala</p>
                  <p className="text-body mt-1">Founder &amp; CEO, MEGA-TEC</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-surface-soft">
              <Image
                src="/images/projects/nepal-energies.jpg"
                alt="MEGA-TEC fuel dispensers at a Nepal Energies filling station"
                fill
                quality={90}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Nepal Energies, and the order that changed the company
              </h2>
              <div className="text-body mt-6 flex flex-col gap-6 text-lg leading-relaxed">
                <p>
                  After COVID, an order came in from Nepal Energies. They had bought pumps
                  elsewhere, found them wanting, and were looking for better. It was a landmark
                  order: 200 dispensers, 100 single and 100 double.
                </p>
                <p>
                  They did their homework, checked our components, tested our quality, and
                  interviewed our founder in person before committing. Then they placed the order
                  and paid in full. We took it seriously and delivered all 200 units, with no
                  complaints and no disputes. Then they ordered again. And again. It became a
                  lasting partnership, and the repeat orders have never stopped.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ByTheNumbers />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Certified, compliant, and accountable
              </h2>
              <p className="text-body mt-6 text-lg leading-relaxed">
                MEGA-TEC holds the SON (Standards Organisation of Nigeria) certificate and product
                certification, the core certificates required to operate in Nigeria. Our
                installations are NMDPRA-compliant. We are members of the Manufacturers
                Association of Nigeria (MAN) and the Independent Petroleum Marketers Association of
                Nigeria (IPMAN).
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-soft">
              <Image
                src="/images/operations/engineering-team.jpg"
                alt="MEGA-TEC engineers in company overalls"
                fill
                quality={90}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </div>
        </Container>
      </section>

      <AboutCarousel />

      <ClosingCta title="Want to work with a company that stands behind its equipment?" />
    </>
  );
}
