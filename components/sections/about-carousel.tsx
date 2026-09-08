"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const SLIDES = [
  {
    image: "/images/factory/mt-plus-single-tb/mt-plus-tb-3.png",
    caption: "MT PLUS single-nozzle dispensers, assembled and tested on our Lagos line.",
  },
  {
    image: "/images/factory/mt-plus-d1tt/mt-plus-d1tt-double-nozzle-2.png",
    caption: "Double-nozzle units built to serve two vehicles from a single pump set.",
  },
  {
    image: "/images/factory/lpg-single/lpg-single-1.png",
    caption: "LPG dispensers built and pressure-tested to NMDPRA safety standards.",
  },
  {
    image: "/images/factory/cng-2-double/cng-2-double-1.png",
    caption: "CNG refilling dispensers rated for working pressures up to 25MPa.",
  },
  {
    image: "/images/factory/commercial-ev/commercial-ev-1.png",
    caption: "60KW commercial DC fast chargers for hotels, estates and forecourts.",
  },
  {
    image: "/images/factory/mt-plus-complete-panel.png",
    caption: "Genuine spares — boards, displays, meters and valves, held in stock.",
  },
];

export function AboutCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToSlide = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[target] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const slides = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft + track.offsetLeft;
      let nearest = 0;
      let smallest = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - left);
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
    <section className="pb-20 lg:pb-28">
      <Container>
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide, i) => (
            <figure
              key={slide.image}
              className={cn(
                "w-[280px] shrink-0 snap-start sm:w-[380px]",
                // Staggered heights, the way the design steps the strip up and down.
                i % 2 === 1 && "sm:mt-16"
              )}
            >
              <div className="bg-surface-soft relative aspect-4/3 overflow-hidden rounded-xl">
                <Image
                  src={slide.image}
                  alt={slide.caption}
                  fill
                  sizes="(min-width: 640px) 380px, 280px"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-body mt-4 leading-relaxed">
                {slide.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {SLIDES.map((slide, dot) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => scrollToSlide(dot)}
              aria-label={`Show photo ${dot + 1}`}
              aria-current={dot === index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                dot === index ? "bg-ink" : "bg-border"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
