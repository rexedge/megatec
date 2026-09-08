"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/**
 * TODO(content): these are the delivery records already published elsewhere on
 * the site, written in Megatec's own voice. The Figma calls for attributed
 * customer quotes with a headshot and client logo — swap these entries out once
 * the quotes have been collected and approved by the clients named.
 */
const TESTIMONIALS = [
  {
    project: "Nepal Energies",
    sector: "Nationwide",
    text: "300+ dispensers and 30 LPG units supplied across repeat contracts, delivering smoother operations and reduced downtime across their stations.",
  },
  {
    project: "Sterling Oil & Gas",
    sector: "Lagos, Akwa Ibom & Port Harcourt",
    text: "Dispenser supply with professionally handled installation and calibration, operating efficiently since commissioning.",
  },
  {
    project: "Lagos Metro Fuel Hub",
    sector: "Retail infrastructure",
    text: "Cost-effective, transparent, and flexible pricing makes world-class fuel tech accessible to businesses of all sizes.",
  },
  {
    project: "Port Harcourt Bulk Terminal",
    sector: "LPG storage & distribution",
    text: "Redundancy, resilience, and 24/7 monitoring ensure maximum uptime and uninterrupted service for mission-critical fuel operations.",
  },
  {
    project: "Abuja Electric Charging Hub",
    sector: "EV charging",
    text: "24/7 technical assistance and proactive system monitoring ensure smooth operations and immediate troubleshooting.",
  },
];

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToCard = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[target] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft + track.offsetLeft;
      let nearest = 0;
      let smallest = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft - left);
        if (distance < smallest) {
          smallest = distance;
          nearest = i;
        }
      });
      setIndex(nearest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-hero-tint py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
              Customer testimonials
            </h2>
            <p className="text-body mt-4 max-w-lg text-lg leading-relaxed">
              We are proud to share the positive experiences our clients have had with our
              products and services.
            </p>
          </div>

          {/* The track is allowed to bleed past the container on large screens so a
              partial next card peeks in, the way the design shows it. */}
          <div className="lg:-mr-10 lg:overflow-hidden">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIALS.map((item) => (
                <figure
                  key={item.project}
                  className="bg-accent flex w-[300px] shrink-0 snap-start flex-col gap-6 rounded-2xl p-8 sm:w-[360px]"
                >
                  <blockquote className="text-body leading-relaxed">{item.text}</blockquote>
                  <figcaption className="mt-auto">
                    <p className="text-ink font-medium tracking-tight">{item.project}</p>
                    <p className="text-body text-sm">{item.sector}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-6 lg:mt-4 lg:justify-start lg:gap-8">
          <div className="flex gap-3">
            <ArrowButton
              label="Previous testimonial"
              disabled={index === 0}
              onClick={() => scrollToCard(Math.max(0, index - 1))}
              direction="left"
            />
            <ArrowButton
              label="Next testimonial"
              disabled={index === TESTIMONIALS.length - 1}
              onClick={() => scrollToCard(Math.min(TESTIMONIALS.length - 1, index + 1))}
              direction="right"
            />
          </div>
          <div className="flex gap-2">
            {TESTIMONIALS.map((item, dot) => (
              <button
                key={item.project}
                type="button"
                onClick={() => scrollToCard(dot)}
                aria-label={`Show testimonial ${dot + 1}`}
                aria-current={dot === index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  dot === index ? "bg-ink" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  disabled,
  direction,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="border-ink text-ink hover:bg-ink flex h-12 w-12 items-center justify-center rounded-full border transition-colors hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("h-5 w-5", direction === "left" && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
