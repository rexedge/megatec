import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/check-icon";

/**
 * The four ticked credibility lines the build documents put in a 2×2 grid, "not
 * a horizontal row" (Services hub here; Home and the landing pages use it too).
 */
export function TrustBar({ items, compact }: { items: string[]; compact?: boolean }) {
  return (
    <ul className={cn("grid grid-cols-2 sm:gap-4", compact ? "gap-2" : "gap-3")}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "bg-surface-soft flex items-start rounded-2xl sm:gap-3 sm:p-5",
            // The landing pages' phone view is tighter (R2-19).
            compact ? "gap-2 p-2" : "gap-3 p-4"
          )}
        >
          <CheckIcon />
          <span
            className={cn(
              "text-ink text-sm font-medium sm:text-base sm:leading-snug",
              compact ? "leading-tight" : "leading-snug"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The trust bar as a band of its own, straight under a landing page's hero. */
export function TrustSection({ items }: { items: string[] }) {
  return (
    <section className="py-6 sm:py-10">
      <Container>
        <TrustBar items={items} compact />
      </Container>
    </section>
  );
}
