"use client";

import { useInView } from "@/lib/use-in-view";

type Step = { title: string; description: string };

/** Gap between one step starting to draw and the next, in milliseconds. */
const STEP_MS = 700;

/**
 * The numbered process steps as a timeline that builds the first time it scrolls
 * into view (punch list MO-03): each number pops in, its text rises, and the line
 * runs on to the next step. Down the page on a phone, across on a wide screen.
 * Visitors who ask for reduced motion see it finished.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const [ref, built] = useInView<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      data-built={built ? "" : undefined}
      className="group grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6"
    >
      {steps.map((step, index) => {
        const delay = index * STEP_MS;
        return (
          <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-6">
            <span
              style={{ transitionDelay: `${delay}ms` }}
              className="bg-accent text-text flex h-12 w-12 shrink-0 scale-50 items-center justify-center rounded-full text-lg font-semibold opacity-0 transition duration-500 group-data-built:scale-100 group-data-built:opacity-100 motion-reduce:transition-none"
            >
              {index + 1}
            </span>

            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="bg-border absolute top-12 -bottom-8 left-[23px] w-0.5 overflow-hidden lg:top-[23px] lg:bottom-auto lg:left-14 lg:h-0.5 lg:w-[calc(100%-2.5rem)]"
              >
                <span
                  style={{ transitionDelay: `${delay + 350}ms` }}
                  className="bg-sky absolute inset-0 origin-top scale-y-0 transition-transform duration-700 ease-out group-data-built:scale-y-100 motion-reduce:transition-none lg:origin-left lg:scale-y-100 lg:scale-x-0 lg:group-data-built:scale-x-100"
                />
              </span>
            )}

            <div
              style={{ transitionDelay: `${delay + 150}ms` }}
              className="translate-y-3 opacity-0 transition duration-500 group-data-built:translate-y-0 group-data-built:opacity-100 motion-reduce:transition-none"
            >
              <h3 className="text-ink text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="text-body mt-2 leading-relaxed">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
