"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-in-view";
import type { Testimonial } from "@/lib/content/types";

/** Customer quotes from the content layer (getTestimonials), passed in by the Home page. */
export function TestimonialsSection({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const reducedMotion = useReducedMotion();

  const scrollToCard = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[target] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  // The quotes move on by themselves every 6 seconds and loop (MO-02). They hold still
  // while the visitor hovers, touches or focuses the carousel, and for anyone who asks
  // for reduced motion.
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      if (paused.current) return;
      const track = trackRef.current;
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
      scrollToCard((nearest + 1) % cards.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reducedMotion, scrollToCard]);

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
    <section
      className="bg-hero-tint py-6 sm:py-20 lg:py-28"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => setTimeout(() => (paused.current = false), 4000)}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
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
              {items.map((item) => (
                <figure
                  key={item.quote}
                  className="bg-accent flex w-[300px] shrink-0 snap-start flex-col gap-6 rounded-2xl p-8 sm:w-[360px]"
                >
                  <blockquote className="text-body leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  {item.company && (
                    <figcaption className="mt-auto">
                      <p className="text-ink font-medium tracking-tight">{item.company}</p>
                    </figcaption>
                  )}
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
              disabled={index === items.length - 1}
              onClick={() => scrollToCard(Math.min(items.length - 1, index + 1))}
              direction="right"
            />
          </div>
          <div className="flex gap-2">
            {items.map((item, dot) => (
              <button
                key={item.quote}
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
