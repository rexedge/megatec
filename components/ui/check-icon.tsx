/** The green tick the build documents mark their lists with (✔). */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <span
      className={
        className ??
        "bg-leaf/15 text-leaf-dark mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}
