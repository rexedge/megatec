"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { PART_GROUPS, SPARE_PARTS, type SparePart } from "@/lib/spare-parts";

/** The filter pills' wording from the 05 doc, in the order of the eight groups. */
const PILLS = [
  "Meters & Units",
  "CPUs & Boards",
  "Preset Boards",
  "Valves",
  "Motors & Pumps",
  "Nozzles & Hoses",
  "CNG Parts",
  "Wiring & Sundries",
];

/** Parts shown at first, and added by each tap of "Show more" (R2-07). */
const PAGE_SIZE = 20;

/**
 * The spare parts list (05 doc, punch list PA-01): scrollable category pills, a
 * search box, and a photo, name and fit tag for each of the 84 parts. No drawers
 * and no per-item buttons: one page-level WhatsApp button handles every enquiry.
 */
export function SparePartsList() {
  const [group, setGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // A new pill or search starts again from the first page of its own list.
  function chooseGroup(next: string | null) {
    setGroup(next);
    setVisible(PAGE_SIZE);
  }
  function search(next: string) {
    setQuery(next);
    setVisible(PAGE_SIZE);
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = SPARE_PARTS.filter(
    (part) =>
      (group === null || part.group === group) &&
      terms.every((term) => `${part.name} ${part.fit}`.toLowerCase().includes(term))
  );

  const page = shown.slice(0, visible);

  return (
    <>
      <div
        role="group"
        aria-label="Filter parts by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <Pill active={group === null} onClick={() => chooseGroup(null)}>
          All ({SPARE_PARTS.length})
        </Pill>
        {PART_GROUPS.map((name, index) => (
          <Pill key={name} active={group === name} onClick={() => chooseGroup(name)}>
            {PILLS[index]}
          </Pill>
        ))}
      </div>

      <label className="mt-6 block">
        <span className="sr-only">Search parts by name</span>
        <input
          type="search"
          value={query}
          onChange={(event) => search(event.target.value)}
          placeholder="Search parts by name…"
          className="form-input"
        />
      </label>

      {shown.length === 0 ? (
        <p className="text-body mt-6" aria-live="polite">
          We could not find that part here. Message us on WhatsApp and we&apos;ll find it for you.
        </p>
      ) : (
        <>
          <p className="text-body mt-6 text-sm" aria-live="polite">
            Showing {page.length} of {shown.length}
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {page.map((part) => (
              <li key={part.n}>
                <Reveal className="h-full">
                  <PartCard part={part} />
                </Reveal>
              </li>
            ))}
          </ul>
          {page.length < shown.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                className="border-ink text-ink hover:bg-ink min-h-11 rounded-full border px-8 text-sm font-medium transition-colors hover:text-white"
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors",
        active ? "border-ink bg-ink text-white" : "border-border text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}

function PartCard({ part }: { part: SparePart }) {
  const body = (
    <>
      <div className="bg-surface-soft relative aspect-square overflow-hidden">
        {part.image ? (
          <Image
            src={part.image}
            alt={part.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain p-3"
          />
        ) : (
          <Image
            src="/images/brand/logo.png"
            alt=""
            fill
            sizes="25vw"
            className="object-contain p-[22%] opacity-25 grayscale"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-3 sm:p-4">
        <h3 className="text-ink text-sm leading-snug font-medium sm:text-base">{part.name}</h3>
        <p className="text-body text-xs sm:text-sm">{part.fit}</p>
        {part.href && <p className="text-ink mt-1 text-xs font-medium underline">See full details</p>}
      </div>
    </>
  );
  const frame =
    "border-border/70 block h-full overflow-hidden rounded-2xl border bg-white transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg";

  return part.href ? (
    <Link href={part.href} className={cn(frame, "hover:border-ink transition-colors")}>
      {body}
    </Link>
  ) : (
    <div className={frame}>{body}</div>
  );
}
