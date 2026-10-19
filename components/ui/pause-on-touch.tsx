"use client";

import { useState } from "react";

/**
 * A div that carries a CSS animation and holds it still while a finger is on it
 * (punch list MO-06). Mouse hover is plain CSS (`hover:[animation-play-state:paused]`);
 * touch is handled here because iOS gives a plain div no :hover state on tap. Add
 * `data-paused:[animation-play-state:paused]` to `className` to use it.
 */
export function PauseOnTouch({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [touching, setTouching] = useState(false);

  return (
    <div
      className={className}
      data-paused={touching ? "" : undefined}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      onTouchCancel={() => setTouching(false)}
    >
      {children}
    </div>
  );
}
