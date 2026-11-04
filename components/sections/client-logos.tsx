import Image from "next/image";
import { PauseOnTouch } from "@/components/ui/pause-on-touch";
import { cn } from "@/lib/cn";
import { getClientLogos } from "@/lib/content";
import type { ClientLogo } from "@/lib/content/types";

/**
 * One slow, continuous row of logos in full colour (punch list HM-05, MO-06). The
 * row is laid out twice, back to back, and slides left by exactly one copy before
 * starting over, so the join never shows. Each copy is at least as wide as the
 * screen, which keeps the row full on a wide monitor and spaces the logos out.
 * It stands still while the mouse is over it or a finger is on it, and for
 * visitors who ask for less motion it becomes a plain centred, wrapped row.
 */
export async function ClientLogos({ className }: { className?: string }) {
  const logos = await getClientLogos();

  return (
    <div role="group" aria-label="Our clients" className={cn("w-full overflow-hidden", className)}>
      <PauseOnTouch className="flex w-max animate-marquee hover:[animation-play-state:paused] data-paused:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        <LogoSet logos={logos} />
        <LogoSet logos={logos} copy />
      </PauseOnTouch>
    </div>
  );
}

function LogoSet({ logos, copy = false }: { logos: ClientLogo[]; copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      className={cn(
        "flex min-w-screen shrink-0 items-center justify-around gap-x-12 px-6 sm:gap-x-16 sm:px-8",
        "motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8",
        copy && "motion-reduce:hidden"
      )}
    >
      {logos.map((logo) => (
        <li key={logo.src} className="shrink-0">
          <Image
            src={logo.src}
            alt={copy ? "" : logo.name}
            width={logo.width}
            height={logo.height}
            className="h-12 w-auto sm:h-14"
          />
        </li>
      ))}
    </ul>
  );
}
