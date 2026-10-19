import Image from "next/image";
import { PauseOnTouch } from "@/components/ui/pause-on-touch";
import { cn } from "@/lib/cn";

/**
 * The client logos, in the order the Core Site Pages document lists them
 * (Homepage §1). Home only: the landing pages carry no client logos (MO-06).
 *
 * TODO(assets): the document lists nine; the Sterling Oil & Gas file, second in
 * its order, is still to be supplied, so eight show. Written permission to
 * display each logo is also unconfirmed. Asset request item 3.
 */
const CLIENT_LOGOS = [
  { name: "Nepal Energies", src: "/images/clients/nepal-energies.png", width: 410, height: 125 },
  { name: "Masters Energy", src: "/images/clients/masters-energy.png", width: 446, height: 445 },
  { name: "MRS", src: "/images/clients/mrs.png", width: 318, height: 339 },
  { name: "NIPCO", src: "/images/clients/nipco.png", width: 341, height: 127 },
  { name: "Lado Oil", src: "/images/clients/lado-oil.png", width: 243, height: 67 },
  { name: "American Embassy (Lagos)", src: "/images/clients/us-embassy.png", width: 448, height: 446 },
  { name: "SEEPCO", src: "/images/clients/seepco.png", width: 143, height: 190 },
  { name: "CRCC and CCECC", src: "/images/clients/crcc-ccecc.png", width: 341, height: 161 },
];

/**
 * One slow, continuous row of logos in full colour (punch list HM-05, MO-06). The
 * row is laid out twice, back to back, and slides left by exactly one copy before
 * starting over, so the join never shows. Each copy is at least as wide as the
 * screen, which keeps the row full on a wide monitor and spaces the logos out.
 * It stands still while the mouse is over it or a finger is on it, and for
 * visitors who ask for less motion it becomes a plain centred, wrapped row.
 */
export function ClientLogos({ className }: { className?: string }) {
  return (
    <div role="group" aria-label="Our clients" className={cn("w-full overflow-hidden", className)}>
      <PauseOnTouch className="flex w-max animate-marquee hover:[animation-play-state:paused] data-paused:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        <LogoSet />
        <LogoSet copy />
      </PauseOnTouch>
    </div>
  );
}

function LogoSet({ copy = false }: { copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      className={cn(
        "flex min-w-screen shrink-0 items-center justify-around gap-x-12 px-6 sm:gap-x-16 sm:px-8",
        "motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8",
        copy && "motion-reduce:hidden"
      )}
    >
      {CLIENT_LOGOS.map((logo) => (
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
