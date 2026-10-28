import Image from "next/image";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";

export type LandingProject = {
  title: string;
  description: string;
  /** Left out where the photo has not been supplied yet: the card shows text only. */
  image?: string;
  imagePosition?: string;
};

/**
 * The "Project snapshot" band on a landing page (03 doc): two cards and a link to
 * the Projects page. Plain cards, no carousel: the landing pages stay calm.
 */
export function LandingProjects({
  heading,
  projects,
}: {
  heading: string;
  projects: LandingProject[];
}) {
  return (
    <section className="py-6 sm:py-20 lg:py-16">
      <Container>
        <h2 className="text-ink max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8">
          {projects.map((project) => (
            <li key={project.title} className="bg-surface-soft overflow-hidden rounded-2xl">
              {project.image && (
                <div className="relative aspect-16/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: project.imagePosition }}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-ink text-xl font-medium tracking-tight">{project.title}</h3>
                <p className="text-body mt-2 leading-relaxed">{project.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 sm:mt-12">
          <TextLink href="/projects">See All MEGA-TEC Installations</TextLink>
        </div>
      </Container>
    </section>
  );
}
