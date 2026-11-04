"use client";

import { useRef, useState } from "react";
import { SearchDialog } from "@/components/ui/search-dialog";
import type { SearchEntry } from "@/lib/search";

/** The 404 page's "Search the site" button: opens the same search as the header's. */
export function SearchTrigger({ index }: { index: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="border-border text-ink hover:border-ink font-accent inline-flex items-center justify-center gap-3 rounded-lg border bg-white px-8 py-4 text-base font-medium transition-colors"
      >
        <svg
          viewBox="0 0 18 18"
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <circle cx="8" cy="8" r="6.25" />
          <path d="M16.5 16.5L13 13" strokeLinecap="round" />
        </svg>
        Search the site
      </button>
      {open && <SearchDialog index={index} onClose={close} />}
    </>
  );
}
