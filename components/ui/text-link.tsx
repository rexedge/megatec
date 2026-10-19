import Link from "next/link";
import { cn } from "@/lib/cn";

/** The underlined link with a trailing arrow that the build documents call a TEXT LINK ("Read Our Story →"). */
export function TextLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 text-base font-medium text-ink underline underline-offset-4 transition-colors hover:text-sky",
        className
      )}
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
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
