import Image from "next/image";
import { Container } from "@/components/ui/container";

const PROJECTS = [
  {
    category: "LPG STORAGE & DISTRIBUTION",
    title: "Port Harcourt Bulk Terminal",
    image: "/images/landing/project-port-harcourt.png",
  },
  {
    category: "RETAIL INFRASTRUCTURE",
    title: "Lagos Metro Fuel Hub",
    image: "/images/landing/project-lagos-metro.png",
    offset: true,
  },
  {
    category: "DIGITAL MANAGEMENT SYSTEMS",
    title: "Automated Fleet Network",
    image: "/images/landing/project-automated-fleet.png",
  },
];

export function ProjectsSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
          Real-World Projects
        </h2>
        <p className="mt-4 text-lg font-medium tracking-tight text-ink">OUR TRACK RECORD</p>

        <div className="mt-16 grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-3">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className={project.offset ? "sm:mt-10" : undefined}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-surface-soft">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 text-left">
                <p className="text-sm font-medium tracking-tight text-body">{project.category}</p>
                <p className="mt-1 text-xl font-medium tracking-tight text-ink">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
