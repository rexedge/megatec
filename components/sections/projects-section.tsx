import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/**
 * Only real, named engagements belong here. The three entries this replaced
 * ("Port Harcourt Bulk Terminal", "Lagos Metro Fuel Hub", "An electric charging
 * station in Abuja") were illustrated with AI-generated renders and appear in no
 * client list Mega-Tec has supplied. The Nepal and Sterling copy is verbatim from
 * the Core Site Pages document, Projects §2, and the Canico wording is from its
 * Global Rules. Canico took Sterling Oil & Gas's place in October 2026 and
 * Sterling came back beside it (punch list HM-11); NIPCO then took Sterling's
 * place, keeping its description (R2-14).
 *
 * TODO(assets): Canico needs a location and a one-line outcome, and Mega-Tec must
 * confirm all three cards are accurate and client-approved. Asset request item 2.
 */
type Project = {
  title: string;
  description: string;
  image?: string;
  /** Sits lower than its neighbours on a wide screen, for the staggered look. */
  offset?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Nepal Energies, Nationwide",
    description:
      "A multi-contract partnership beginning with a major 200-dispenser supply, and continued through repeat orders over several years.",
    image: "/images/projects/nepal-energies.jpg",
  },
  {
    title: "Canico",
    description: "MEGA-TEC fuel dispensers in service on Canico's forecourt.",
    image: "/images/projects/canico.jpg",
    offset: true,
  },
  {
    title: "NIPCO",
    description:
      "Supply, installation and calibration of fuel dispensers and flow meters across multiple sites.",
    image: "/images/projects/nipco.jpg",
  },
];

export function ProjectsSection() {
  return (
    <section className="py-6 sm:py-20 lg:py-28">
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
            industries ensures your success at every stage.
          </p>
        </div>

        <div className="mt-8 sm:mt-16 grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <div key={project.title} className={cn(project.offset && "lg:mt-24")}>
              {project.image ? (
                <>
                  <div className="bg-surface-soft relative aspect-9/8 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-ink mt-6 text-xl font-medium tracking-tight">
                    {project.title}
                  </p>
                  <p className="text-body mt-2 leading-relaxed">{project.description}</p>
                </>
              ) : (
                <div className="bg-accent flex aspect-9/8 w-full flex-col justify-center rounded-2xl p-8">
                  <p className="text-ink text-xl font-medium tracking-tight">{project.title}</p>
                  <p className="text-body mt-2 leading-relaxed">{project.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
