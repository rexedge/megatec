"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";

/**
 * Fades its content in once as it scrolls into view (punch list MO-01). Content
 * already on screen when the page loads is never hidden, so nothing flashes or
 * waits, and without JavaScript or with reduced motion everything is simply there.
 * The landing pages do not use it: they stay calm (MO-11).
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<"visible" | "hidden" | "shown">("visible");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reducedMotion) return;
    // Only things below the fold are armed.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    setState("hidden");
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        state !== "visible" && "transition-[opacity,translate] duration-500 ease-out",
        // The server renders for motion, so reduced motion only shows up after hydration:
        // it overrides whatever the effect armed.
        state === "hidden" && !reducedMotion && "translate-y-4 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
