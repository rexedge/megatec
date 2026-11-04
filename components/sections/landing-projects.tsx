import Image from "next/image";
import { Container } from "@/components/ui/container";
import { StandInArt } from "@/components/ui/stand-in-art";
import { TextLink } from "@/components/ui/text-link";

export type LandingProject = {
  title: string;
  description: string;
  /** Left out where the photo has not been supplied yet: the card shows a stand-in picture. */
  image?: string;
  imagePosition?: string;
};

/**
 * The "Project snapshot" band on a landing page (03 doc): two cards and a link to
 * the Projects page. Plain cards, no carousel: the landing pages stay calm. `category` (a
 * category slug) picks the stand-in picture for a project without a photo.
 */
export function LandingProjects({
  heading,
  projects,
  category,
}: {
  heading: string;
  projects: LandingProject[];
  category: string;
}) {
  return (
    <section className="py-6 sm:py-20 lg:py-16">
      <Container>
        <h2 className="text-ink max-w-3xl text-2xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-8">
          {projects.map((project) => (
            <li key={project.title} className="bg-surface-soft overflow-hidden rounded-2xl">
              <div className="relative aspect-16/10 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: project.imagePosition }}
                    className="object-cover"
                  />
                ) : (
                  <StandInArt seed={project.title} category={category} />
                )}
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-ink text-lg font-medium tracking-tight sm:text-xl">{project.title}</h3>
                <p className="text-body mt-2 leading-normal sm:leading-relaxed">{project.description}</p>
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
