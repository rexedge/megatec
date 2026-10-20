"use client";

import { useEffect } from "react";
import { useInView, useReducedMotion } from "@/lib/use-in-view";

const DURATION_MS = 1600;

function format(value: number, grouped: boolean) {
  return new Intl.NumberFormat("en-US", { useGrouping: grouped }).format(value);
}

/**
 * A number that counts up from 0 the first time it scrolls into view, then stays
 * still (punch list MO-05). The server sends the finished number, so nothing is
 * lost without JavaScript, and visitors who ask for less motion simply keep it.
 * The animated digits are hidden from screen readers, which get the final figure.
 */
export function CountUp({
  end,
  suffix = "",
  grouped = true,
}: {
  end: number;
  suffix?: string;
  /** False for a year, which must not read "2,012". */
  grouped?: boolean;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  const reducedMotion = useReducedMotion();
  const finished = format(end, grouped) + suffix;

  // Wait at zero until the number is in view, or show it finished for visitors who
  // ask for less motion. React hydrates assuming no such preference and learns the
  // real one a moment later, so this must put the finished number back as well as
  // zero it. It writes the DOM directly: React sees an unchanged child, so it never
  // overwrites this.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.textContent = reducedMotion ? finished : format(0, grouped) + suffix;
  }, [ref, reducedMotion, finished, grouped, suffix]);

  useEffect(() => {
    const element = ref.current;
    if (!inView || reducedMotion || !element) return;

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format(Math.round(end * eased), grouped) + suffix;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref, inView, reducedMotion, end, grouped, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {finished}
      </span>
      <span className="sr-only">{finished}</span>
    </>
  );
}
