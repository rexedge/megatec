import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const PROJECTS = [
  {
    title: "Port Harcourt Bulk Terminal",
    description:
      "Redundancy, resilience, and 24/7 monitoring ensure maximum uptime and uninterrupted service for mission-critical fuel operations.",
    image: "/images/landing/project-port-harcourt.png",
  },
  {
    title: "Lagos Metro Fuel Hub",
    description:
      "Cost-effective, transparent, and flexible pricing makes world-class fuel tech accessible to businesses of all sizes.",
    image: "/images/landing/project-lagos-metro.png",
    offset: true,
  },
  {
    title: "An electric charging station in Abuja",
    description:
      "24/7 technical assistance and proactive system monitoring ensure smooth operations and immediate troubleshooting.",
    image: "/images/landing/project-abuja-ev.png",
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

        <div className="mt-16 grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-3">
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
