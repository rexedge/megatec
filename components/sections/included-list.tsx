import { CheckIcon } from "@/components/ui/check-icon";

/** The "What's included" block on the Maintenance and Technical Support pages. */
export function IncludedList({ items }: { items: string[] }) {
  return (
    <div className="bg-surface-soft rounded-2xl p-6 sm:p-10">
      <h2 className="text-ink text-2xl font-semibold tracking-tight lg:text-3xl">
        What&apos;s included
      </h2>
      <ul className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="text-body flex gap-3 text-lg leading-relaxed">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
