"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/check-icon";
import { SpecSheetLink } from "@/components/ui/spec-sheet-button";
import { useEnquiry } from "@/components/ui/enquiry-modal";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/cn";
import type { PageProduct } from "@/lib/product-pages";

const NOZZLES = ["All", "Single", "Double"] as const;
const METERS = ["All", "Bennett", "Tokheim"] as const;

/**
 * A sub-category's product grid (05 doc): two cards across even on a phone, each
 * with WhatsApp and "View details", which opens the product's drawer. With
 * `filters` it also offers the nozzle and meter filters the Fuel Dispensers page
 * calls for (punch list ST-08).
 */
export function ProductGrid({
  products,
  filters = false,
}: {
  products: PageProduct[];
  filters?: boolean;
}) {
  const [nozzle, setNozzle] = useState<(typeof NOZZLES)[number]>("All");
  const [meter, setMeter] = useState<(typeof METERS)[number]>("All");
  const [open, setOpen] = useState<PageProduct | null>(null);

  const shown = products.filter((p) => {
    if (nozzle !== "All" && !p.name.includes(nozzle)) return false;
    if (meter !== "All") {
      const metering = p.cells.find(([label]) => label === "Metering")?.[1] ?? "";
      if (!metering.includes(meter)) return false;
    }
    return true;
  });

  return (
    <>
      {filters && (
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Pills label="Nozzle" options={NOZZLES} value={nozzle} onChange={setNozzle} />
          <Pills label="Meter" options={METERS} value={meter} onChange={setMeter} />
        </div>
      )}

      <p className="text-body mt-6 text-sm" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "product" : "products"}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {shown.map((product) => (
          <li key={product.id}>
            <Card product={product} onOpen={() => setOpen(product)} />
          </li>
        ))}
      </ul>

      {open && <Drawer product={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function Pills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="text-body mr-1 text-sm font-medium">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
            value === option
              ? "border-ink bg-ink text-white"
              : "border-border text-ink hover:border-ink"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Photo({
  product,
  sizes,
  fit = "object-cover",
}: {
  product: PageProduct;
  sizes: string;
  fit?: string;
}) {
  return product.image ? (
    <Image src={product.image} alt={product.name} fill sizes={sizes} className={fit} />
  ) : (
    // No photo yet: the muted MEGA-TEC logo stands in, never another product's picture.
    <Image
      src="/images/brand/logo.png"
      alt=""
      fill
      sizes={sizes}
      className="object-contain p-[22%] opacity-25 grayscale"
    />
  );
}

function Card({ product, onOpen }: { product: PageProduct; onOpen: () => void }) {
  return (
    <div
      className={cn(
        "@container flex h-full flex-col overflow-hidden rounded-2xl border bg-white",
        product.best ? "border-leaf" : "border-border/70"
      )}
    >
      <div className="bg-surface-soft relative aspect-4/3 overflow-hidden">
        <Photo product={product} sizes="(min-width: 1024px) 33vw, 50vw" />
        {product.best && (
          <span className="text-ink absolute top-2 left-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-medium @2xs:top-4 @2xs:left-4 @2xs:px-3 @2xs:py-1 @2xs:text-xs">
            Best Seller
          </span>
        )}
        {product.tag && (
          <span className="bg-leaf-dark absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase @2xs:bottom-4 @2xs:left-4 @2xs:px-3 @2xs:py-1 @2xs:text-[11px]">
            {product.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 @2xs:gap-3 @2xs:p-6">
        <h3 className="text-ink text-base leading-snug font-medium tracking-tight @2xs:text-xl">
          {product.name}
        </h3>
        <p className="text-body text-xs leading-relaxed @2xs:text-sm">{product.blurb}</p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <WhatsappButton
            variant="leaf"
            size="card"
            className="w-full"
            message={`Hi MEGA-TEC, I'd like to enquire about the ${product.name}.`}
          >
            WhatsApp
          </WhatsappButton>
          <button
            type="button"
            onClick={onOpen}
            className="border-border text-ink hover:border-ink min-h-11 rounded-xl border px-4 text-sm font-medium transition-colors"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}

function Drawer({ product, onClose }: { product: PageProduct; onClose: () => void }) {
  const titleId = useId();
  const { openQuote } = useEnquiry();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-ink absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow"
        >
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
        </button>

        <div className="bg-surface-soft relative aspect-16/10 shrink-0">
          <Photo product={product} sizes="(min-width: 672px) 672px, 100vw" fit="object-contain" />
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <p className="bg-accent text-ink mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium">
              {product.badge}
            </p>
            <h2 id={titleId} className="text-ink text-2xl font-semibold tracking-tight sm:text-3xl">
              {product.name}
              {product.best && (
                <span className="text-ink ml-3 inline-block rounded-full bg-amber-400 px-3 py-1 align-middle text-xs font-medium">
                  Best Seller
                </span>
              )}
            </h2>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
            {product.cells.map(([label, value]) => (
              <div key={label}>
                <dt className="text-body text-xs font-medium tracking-wide uppercase">{label}</dt>
                <dd className="text-ink mt-1 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="text-body text-base leading-relaxed">{product.description}</p>

          {product.extras.map((extra, index) =>
            extra.t === "li" ? (
              <p key={index} className="text-body -mt-3 flex gap-3 leading-relaxed">
                <CheckIcon />
                {extra.x}
              </p>
            ) : extra.t === "h" ? (
              <p key={index} className="text-ink -mb-3 font-semibold">
                {extra.x}
              </p>
            ) : (
              <p key={index} className="text-body leading-relaxed">
                {extra.x}
              </p>
            )
          )}

          <p className="text-ink font-medium">{product.warranty}</p>

          {product.sheet && (
            <SpecSheetLink
              href={`/spec-sheets/${product.sheet}`}
              description={`Download the full technical datasheet for the ${product.name}.`}
              className="text-ink text-left font-medium underline underline-offset-4"
            >
              Download full specification (PDF)
            </SpecSheetLink>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="leaf"
              className="sm:flex-1"
              onClick={() => {
                onClose();
                openQuote({
                  message: `Hi MEGA-TEC, I'd like to enquire about the ${product.name}.`,
                });
              }}
            >
              Talk to Our Team on WhatsApp
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="border-border text-ink hover:border-ink min-h-11 rounded-xl border px-6 font-medium transition-colors sm:flex-1"
            >
              Back to all products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
