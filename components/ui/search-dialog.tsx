"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchSite } from "@/lib/search";

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    inputRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[10vh]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-border/70 flex items-center gap-3 border-b px-5 py-4">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, services and pages"
            className="text-ink placeholder:text-body/60 flex-1 bg-transparent text-base focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-body hover:text-ink transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {query.trim().length === 0 ? (
          <p className="text-body px-5 py-8 text-sm">
            Try &ldquo;submersible&rdquo;, &ldquo;LPG dispenser&rdquo;, &ldquo;nozzle&rdquo; or
            &ldquo;training&rdquo;.
          </p>
        ) : results.length === 0 ? (
          <p className="text-body px-5 py-8 text-sm">
            No matches for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="max-h-[50vh] overflow-y-auto py-2">
            {results.map((result) => (
              <li key={`${result.href}-${result.title}`}>
                <Link
                  href={result.href}
                  onClick={onClose}
                  className="hover:bg-surface-soft flex flex-col gap-0.5 px-5 py-3 transition-colors"
                >
                  <span className="text-ink font-medium">{result.title}</span>
                  <span className="text-body text-sm">{result.context}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="text-body h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M16.5 16.5L13 13" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
