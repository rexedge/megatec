import Link from "next/link";

/** The "See full product range ›" link that sits under every product grid. */
export function RangeLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={href}
        className="inline-flex items-center gap-3 text-base font-medium text-ink underline underline-offset-4 transition-colors hover:text-sky"
      >
        {children}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}
