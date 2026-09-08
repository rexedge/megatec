import Image from "next/image";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { SpecSheetLink } from "@/components/ui/spec-sheet-button";
import { cn } from "@/lib/cn";

export function ProductCard({
  image,
  title,
  subtitle,
  specs,
  whatsappMessage,
  specSheetHref,
  bestSeller,
  nmdpra,
  ctaLabel = "Enquire on this on WhatsApp",
  ctaVariant = "leaf",
}: {
  tag?: string;
  image: string;
  title: string;
  subtitle?: string;
  specs: string[];
  whatsappMessage: string;
  specSheetHref?: string;
  /** Amber pill in the top-left of the image. */
  bestSeller?: boolean;
  /** Green approval pill in the bottom-left of the image. */
  nmdpra?: boolean;
  ctaLabel?: string;
  ctaVariant?: "leaf" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border bg-white",
        bestSeller ? "border-leaf" : "border-border/70"
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {bestSeller && (
          <span className="absolute top-4 left-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-medium text-ink">
            Best Seller
          </span>
        )}
        {nmdpra && (
          <span className="absolute bottom-4 left-4 rounded-full bg-leaf-dark px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
            NMDPRA Approved
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-ink">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-body">{subtitle}</p>}
        </div>
        <ul className="flex flex-col gap-1.5">
          {specs.map((spec) => (
            <li key={spec} className="flex gap-2 text-sm text-body">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-leaf" />
              {spec}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <WhatsappButton variant={ctaVariant} message={whatsappMessage} className="w-full">
            {ctaLabel}
          </WhatsappButton>
          {specSheetHref && (
            <SpecSheetLink
              href={specSheetHref}
              description={`Download the full technical datasheet for the ${title}.`}
            >
              Download spec sheet
            </SpecSheetLink>
          )}
        </div>
      </div>
    </div>
  );
}
