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
  // The card styles itself by its own width (a container query), not the
  // screen's: two-up on a phone it is 130 to 290px wide (SW-14), full width it
  // is not. Under 18rem it goes compact (smaller padding, type and pills, and
  // a button of just the icon and "WhatsApp", SW-02's "tight cards"); from
  // 18rem it is the full card. The long label overflows below about 285px.
  return (
    <div
      className={cn(
        "@container flex h-full flex-col overflow-hidden rounded-2xl border bg-white",
        bestSeller ? "border-leaf" : "border-border/70"
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 320px) 50vw, 100vw"
          className="object-cover"
        />
        {bestSeller && (
          <span className="absolute top-2 left-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-medium text-ink @2xs:top-4 @2xs:left-4 @2xs:px-3 @2xs:py-1 @2xs:text-xs">
            Best Seller
          </span>
        )}
        {nmdpra && (
          <span className="absolute bottom-2 left-2 rounded-full bg-leaf-dark px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase @2xs:bottom-4 @2xs:left-4 @2xs:px-3 @2xs:py-1 @2xs:text-[11px]">
            NMDPRA
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3 @2xs:gap-4 @2xs:p-6">
        <div>
          <h3 className="text-base leading-snug font-medium tracking-tight text-ink @2xs:text-xl">
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-xs text-body @2xs:text-sm">{subtitle}</p>}
        </div>
        <ul className="flex flex-col gap-1 @2xs:gap-1.5">
          {specs.map((spec) => (
            <li key={spec} className="flex gap-1.5 text-xs text-body @2xs:gap-2 @2xs:text-sm">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-leaf" />
              {spec}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-2 pt-1 @2xs:gap-3 @2xs:pt-2">
          <WhatsappButton
            variant={ctaVariant}
            size="card"
            message={whatsappMessage}
            className="w-full"
          >
            <span className="@2xs:hidden">WhatsApp</span>
            <span className="hidden @2xs:inline">{ctaLabel}</span>
          </WhatsappButton>
          {specSheetHref && (
            <SpecSheetLink
              href={specSheetHref}
              description={`Download the full technical datasheet for the ${title}.`}
              className="text-center text-xs font-medium text-ink underline underline-offset-2 @2xs:text-sm"
            >
              Download spec sheet
            </SpecSheetLink>
          )}
        </div>
      </div>
    </div>
  );
}
