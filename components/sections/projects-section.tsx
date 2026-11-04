import Image from "next/image";
import { Container } from "@/components/ui/container";
import { StandInArt, projectArtCategory } from "@/components/ui/stand-in-art";
import { cn } from "@/lib/cn";
import { getProjects } from "@/lib/content";

/**
 * Home's project cards: the projects marked "show on Home" in the admin (lib/content).
 * Only real, named engagements belong here; the seed content (lib/content/seed) notes
 * what MEGA-TEC still owes for each.
 */
export async function ProjectsSection() {
  const projects = (await getProjects())
    .filter((project) => project.onHome)
    // Home names the place with the client, e.g. "Nepal Energies, Nationwide".
    .map((project) => ({
      ...project,
      title: project.location ? `${project.name}, ${project.location}` : project.name,
    }));

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
          {projects.map((project, index) => (
            // The middle card of each row of three sits lower on a wide screen.
            <div key={project.title} className={cn(index % 3 === 1 && "lg:mt-24")}>
              <div className="bg-surface-soft relative aspect-9/8 w-full overflow-hidden rounded-2xl">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  // No photo yet: the stand-in picture for its kind of work.
                  <StandInArt seed={project.name} category={projectArtCategory(project.categories)} />
                )}
              </div>
              <p className="text-ink mt-6 text-xl font-medium tracking-tight">
                {project.title}
              </p>
              <p className="text-body mt-2 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
