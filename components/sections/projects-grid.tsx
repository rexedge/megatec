"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type ProjectCategory = "Fuel Dispensers" | "LPG" | "CNG" | "EV Chargers";

export type ProjectEntry = {
  name: string;
  location: string;
  categories: ProjectCategory[];
  description: string;
  /** Left out where the photo has not been supplied: the card shows text only. */
  image?: string;
  imagePosition?: string;
};

const FILTERS = ["All", "Fuel Dispensers", "LPG", "CNG", "EV Chargers"] as const;

/**
 * The Projects page's filter bar and card grid (04 doc, Page 3): pills scroll
 * sideways on a phone, filtering is client-side, "All" is the default, and two
 * cards sit side by side even on a phone.
 */
export function ProjectsGrid({ projects }: { projects: ProjectEntry[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.categories.includes(filter));

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTERS.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors",
              filter === name
                ? "border-ink bg-ink text-white"
                : "border-border text-ink hover:border-ink"
            )}
          >
            {name}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-body mt-10">More {filter} projects are coming soon.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {shown.map((project) => (
            <li
              key={project.name}
              className="bg-surface-soft flex flex-col overflow-hidden rounded-2xl"
            >
              {project.image && (
                <div className="relative aspect-4/3">
                  <Image
                    src={project.image}
                    alt={`${project.name} installation`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    style={{ objectPosition: project.imagePosition }}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-6">
                <h3 className="text-ink text-base font-medium tracking-tight sm:text-xl">
                  {project.name}
                </h3>
                <p className="text-body text-xs sm:text-sm">
                  {project.location} · {project.categories.join(" & ")}
                </p>
                <p className="text-body text-sm leading-relaxed sm:text-base">
                  {project.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
