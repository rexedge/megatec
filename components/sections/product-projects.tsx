"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export type ProductProject = {
  title: string;
  description: string;
  image: string;
};

/**
 * "Real world projects" as the product page designs render it: one large
 * featured photo, a segmented progress bar, and the projects listed beneath as
 * selectable thumbnails.
 */
export function ProductProjects({ projects }: { projects: ProductProject[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <p className="text-body text-sm font-medium tracking-tight">Our portfolio</p>
        <h2 className="text-ink mt-2 text-4xl font-semibold tracking-tight lg:text-5xl">
          Real world projects
        </h2>

        <div className="bg-surface-soft relative mt-12 aspect-16/7 w-full overflow-hidden rounded-2xl">
          {projects.map((project, index) => (
            <Image
              key={project.title}
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className={cn(
                "object-cover transition-opacity duration-500",
                index === active ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-2" aria-hidden>
          {projects.map((project, index) => (
            <span
              key={project.title}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors",
                index === active ? "bg-ink" : "bg-border"
              )}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActive(index)}
              aria-current={index === active}
              className="group flex flex-col items-start gap-4 text-left"
            >
              <span
                className={cn(
                  "bg-surface-soft relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition-all",
                  index === active ? "ring-ink" : "ring-transparent group-hover:ring-border"
                )}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="text-ink block text-lg font-medium tracking-tight">
                  {project.title}
                </span>
                <span className="text-body mt-2 block leading-relaxed">
                  {project.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
