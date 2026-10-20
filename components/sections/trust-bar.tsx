import { CheckIcon } from "@/components/ui/check-icon";

/**
 * The four ticked credibility lines the build documents put in a 2×2 grid, "not
 * a horizontal row" (Services hub here; Home and the landing pages use it too).
 */
export function TrustBar({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {items.map((item) => (
        <li
          key={item}
          className="bg-surface-soft flex items-start gap-3 rounded-2xl p-4 sm:p-5"
        >
          <CheckIcon />
          <span className="text-ink text-sm leading-snug font-medium sm:text-base">{item}</span>
        </li>
      ))}
    </ul>
  );
}
