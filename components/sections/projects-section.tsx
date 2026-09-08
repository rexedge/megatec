import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/**
 * Only real, named engagements belong here. The three entries this replaced
 * ("Port Harcourt Bulk Terminal", "Lagos Metro Fuel Hub", "An electric charging
 * station in Abuja") were illustrated with AI-generated renders and appear in no
 * client list Megatec has supplied. Copy below is verbatim from the Core Site
 * Pages document, Projects §2; imagery is of the equipment actually supplied.
 *
 * TODO(assets): both cards need a real installation photograph, and Megatec must
 * confirm the details are accurate and client-approved. Asset request items 1-2.
 */
const PROJECTS = [
  {
    title: "Nepal Energies, Nationwide",
    description:
      "A multi-contract partnership beginning with a major 200-dispenser supply, and continued through repeat orders over several years.",
    image: "/images/factory/mt-plus-d1tt/mt-plus-d1tt-double-nozzle-2.png",
  },
  {
    title: "Sterling Oil & Gas, Lagos, Akwa Ibom & Port Harcourt",
    description:
      "Supply, installation and calibration of fuel dispensers and flow meters across multiple sites.",
    image: "/images/factory/mt-pro-d2-bb/mt-pro-d2-bb-4.png",
    offset: true,
  },
];

export function ProjectsSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-body text-sm font-medium tracking-tight">Our portfolio</p>
            <h2 className="text-ink mt-2 text-4xl font-semibold tracking-tight lg:text-5xl">
              Real world projects
            </h2>
          </div>
          <p className="text-body max-w-2xl text-lg leading-relaxed">
            We combine reliability, competitive pricing, and an innovation culture to deliver
            solutions that grow with your business. Our proven experience across diverse
            industries and 24/7 support ensure your success at every stage.
          </p>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.title} className={cn(project.offset && "sm:mt-24")}>
              <div className="bg-surface-soft relative aspect-9/8 w-full overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-ink mt-6 text-xl font-medium tracking-tight">{project.title}</p>
              <p className="text-body mt-2 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
