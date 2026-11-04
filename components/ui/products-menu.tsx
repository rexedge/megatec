"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useEnquiry } from "@/components/ui/enquiry-modal";
import { cn } from "@/lib/cn";
import type { NavProduct } from "@/lib/nav";
import { PART_GROUP_LABELS, partGroupKey } from "@/lib/spare-parts";

/**
 * The PRODUCTS menu, after products-dropdown.html: on desktop the mega menu (option B),
 * a rail of categories beside the selected category's pages; on mobile the compact list
 * (option A), each category with its pages under it and the two single-page categories
 * as cards. Both take their categories, counts and pages from PRODUCTS (lib/nav).
 */

const STATION_ACCESSORIES = "/products/station-accessories";

/** The spare parts list has no sub-pages, so its panel offers the list opened on each group. */
const PART_GROUP_LINKS = PART_GROUP_LABELS.map((label) => ({
  title: label,
  href: `${STATION_ACCESSORIES}?group=${partGroupKey(label)}#parts`,
}));

function linksFor(product: NavProduct) {
  return product.href === STATION_ACCESSORIES ? PART_GROUP_LINKS : product.subs;
}

function countLabel(count: number) {
  return `${count} ${count === 1 ? "product" : "products"}`;
}

/** Each tab is h-14 with a gap-1 below it, so the highlight moves 60px a step. */
const TAB_STEP = 60;

/** How long the pointer rests on a category before its panel opens (see hover below). */
const HOVER_DELAY = 90;

type MegaMenuProps = {
  id: string;
  products: NavProduct[];
  open: boolean;
  /** Closes the menu: called whenever a link in it is followed. */
  onNavigate: () => void;
};

/**
 * Desktop: the panel hangs from the bottom of the header, centred. It stays mounted and
 * fades and slides on both opening and closing; `inert` keeps it out of the tab order
 * and away from screen readers while it is closed.
 */
export function ProductsMegaMenu({ id, products, open, onNavigate }: MegaMenuProps) {
  const pathname = usePathname();
  const current = Math.max(
    0,
    products.findIndex((product) => pathname.startsWith(product.href))
  );

  const [active, setActive] = useState(current);
  /** 1 when the visitor moved down the list, -1 up: the panel slides in from that side. */
  const [direction, setDirection] = useState(1);

  // Each opening starts on the category the visitor is browsing, else the first.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open && active !== current) {
      setActive(current);
      setDirection(1);
    }
  }

  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  function select(index: number) {
    window.clearTimeout(hoverTimer.current);
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  // The pointer crosses other categories on its way from the rail to a link in the
  // panel. A short rest before switching lets it pass over them without the panel
  // flicking through each one.
  function hover(index: number) {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => select(index), HOVER_DELAY);
  }

  function onTabKeyDown(event: React.KeyboardEvent, index: number) {
    const last = products.length - 1;
    const next =
      event.key === "ArrowDown"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowUp"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  }

  const product = products[active];
  const links = linksFor(product);

  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        "absolute inset-x-0 top-full px-4 pt-2 sm:px-6",
        "transition-[opacity,translate,visibility] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0"
      )}
    >
      <div className="border-border/70 mx-auto flex h-[30rem] max-h-[calc(100dvh-9.5rem)] w-full max-w-[952px] overflow-hidden rounded-2xl border bg-white shadow-[0_16px_40px_rgba(0,36,40,0.12)]">
        <div className="border-border/50 w-[260px] shrink-0 overflow-y-auto overscroll-contain border-r p-3 lg:w-[300px]">
          <p className="text-body px-3 pt-1 pb-2 text-xs font-semibold tracking-[0.08em] uppercase">
            Products
          </p>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Product categories"
            className="relative flex flex-col gap-1"
          >
            {/* The highlight glides to the selected category rather than jumping. */}
            <span
              aria-hidden="true"
              className="bg-hero-tint absolute inset-x-0 top-0 h-14 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
              style={{ transform: `translateY(${active * TAB_STEP}px)` }}
            />
            {products.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.href}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onMouseEnter={() => hover(index)}
                  onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "relative flex h-14 w-full items-center gap-3 rounded-xl px-3 text-left transition-colors duration-200",
                    !selected && "hover:bg-surface-soft"
                  )}
                >
                  <CategoryIcon product={item} selected={selected} small />
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[15px] font-semibold tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-body block text-xs">{countLabel(item.count)}</span>
                  </span>
                  <Chevron
                    className={cn(
                      "text-sea h-4 w-4 shrink-0 transition-[opacity,translate] duration-200 motion-reduce:transition-none",
                      selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Keyed by category, so each switch replays the slide-in. */}
          <div
            key={active}
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-tab-${active}`}
            className="animate-menu-panel flex-1 overflow-y-auto overscroll-contain px-8 py-7 motion-reduce:animate-none"
            style={{ "--menu-dir": direction } as React.CSSProperties}
          >
            <div className="mb-5 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-ink text-[22px] font-semibold tracking-tight">
                  {product.title}
                </h3>
                <p className="text-body mt-1 text-sm">{product.description}</p>
              </div>
              <ArrowLink href={product.href} onClick={onNavigate}>
                View all {product.count}
              </ArrowLink>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {links.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-menu-item motion-reduce:animate-none"
                  style={{ animationDelay: `${60 + index * 35}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="group/card border-border/70 text-ink hover:border-sea/40 hover:bg-hero-tint/40 hover:text-sea flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 text-[15px] font-medium transition-colors duration-150"
                  >
                    {link.title}
                    <Chevron className="text-sea h-4 w-4 shrink-0 opacity-50 transition-[opacity,translate] duration-150 group-hover/card:translate-x-0.5 group-hover/card:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-soft border-border/50 flex flex-wrap items-center justify-between gap-3 border-t px-8 py-4">
            <div>
              <p className="text-ink text-sm font-semibold">Not sure what your station needs?</p>
              <p className="text-body text-[13px]">
                Talk to our team for a recommended equipment list.
              </p>
            </div>
            <QuoteButton onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile: categories with several pages list them under their name; the single-page
 * ones (EV Chargers, Station Accessories) sit side by side as cards. `play` replays the
 * staggered entrance each time the PRODUCTS section opens.
 */
export function ProductsMenuMobile({
  products,
  play,
  onNavigate,
}: {
  products: NavProduct[];
  play: boolean;
  onNavigate: () => void;
}) {
  const total = products.reduce((sum, product) => sum + product.count, 0);
  const rows = products.filter((product) => product.subs.length > 1);
  const cards = products.filter((product) => product.subs.length <= 1);
  const enter = (step: number) =>
    play
      ? {
          className: "animate-menu-item motion-reduce:animate-none",
          style: { animationDelay: `${step * 45}ms` },
        }
      : {};

  return (
    <div className="pt-1 pb-5">
      <p className="text-body px-2 pb-1 text-xs">
        {products.length} categories · {total} products
      </p>

      {rows.map((product, index) => {
        const { className, style } = enter(index);
        return (
          <div
            key={product.href}
            className={cn(index > 0 && "border-border/50 border-t", className)}
            style={style}
          >
            <Link
              href={product.href}
              onClick={onNavigate}
              className="active:bg-hero-tint/60 flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition-colors"
            >
              <CategoryIcon product={product} />
              <span className="flex min-w-0 flex-1 items-baseline gap-2">
                <span className="text-ink text-base font-semibold tracking-tight">
                  {product.title}
                </span>
                <span className="bg-surface-soft text-body rounded-full px-2 py-0.5 text-xs font-medium">
                  {product.count}
                </span>
              </span>
              <Chevron className="text-sea h-4 w-4 shrink-0" />
            </Link>
            <ul className="grid grid-cols-1 pb-2 pl-[3.75rem] min-[480px]:grid-cols-2">
              {product.subs.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    onClick={onNavigate}
                    className="text-body active:text-sea flex min-h-11 items-center text-[15px]"
                  >
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <div
        className={cn("mt-2 grid grid-cols-2 gap-2", enter(rows.length).className)}
        style={enter(rows.length).style}
      >
        {cards.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            onClick={onNavigate}
            className="border-border/70 active:bg-hero-tint/60 flex flex-col gap-2.5 rounded-xl border p-3.5 transition-colors"
          >
            <CategoryIcon product={product} />
            <span>
              <span className="text-ink block text-[15px] leading-snug font-semibold tracking-tight">
                {product.title}
              </span>
              <span className="text-body text-[13px]">{countLabel(product.count)}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className={enter(rows.length + 1).className} style={enter(rows.length + 1).style}>
        <QuoteButton onNavigate={onNavigate} className="mt-4 w-full" />
      </div>
    </div>
  );
}

function QuoteButton({ onNavigate, className }: { onNavigate: () => void; className?: string }) {
  const { openQuote } = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => {
        onNavigate();
        openQuote();
      }}
      className={cn(
        "bg-ink hover:bg-ink/90 inline-flex min-h-11 items-center justify-center rounded-[10px] px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors",
        className
      )}
    >
      Request a quote
    </button>
  );
}

function ArrowLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group/all text-sea inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold whitespace-nowrap"
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-150 group-hover/all:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** One outline set on a 24px grid (products-dropdown.html), by category page. */
const ICONS: Record<string, React.ReactNode> = {
  "/products/fuel-solutions": (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M3 21h12" />
      <path d="M7 7h4v3H7z" />
      <path d="M14 10h2a2 2 0 0 1 2 2v4.5a1.5 1.5 0 0 0 3 0V8l-3-3" />
    </>
  ),
  "/products/cng-solutions": (
    <>
      <path d="M10 2.5h4" />
      <path d="M12 2.5V5" />
      <path d="M8 9a4 4 0 0 1 8 0v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
      <path d="M8 12.5h8" />
      <path d="M8 16.5h8" />
    </>
  ),
  "/products/lpg-solutions": (
    <>
      <path d="M9 6V3.5h6V6" />
      <path d="M5.5 10a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2z" />
      <path d="M12 18.5c-1.3 0-2.2-.9-2.2-2 0-1.4 1.3-2 2.2-3.5.9 1.5 2.2 2.1 2.2 3.5 0 1.1-.9 2-2.2 2z" />
    </>
  ),
  "/products/ev-chargers": (
    <>
      <path d="M9 2.5V6" />
      <path d="M15 2.5V6" />
      <path d="M6 6h12v4a6 6 0 0 1-12 0z" />
      <path d="M12 16v5.5" />
      <path d="M12.8 8l-2 3h2.4l-2 3" />
    </>
  ),
  [STATION_ACCESSORIES]: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
  ),
};

/** The category's icon on a tinted tile; the selected category's tile turns deep blue. */
function CategoryIcon({
  product,
  selected = false,
  small = false,
}: {
  product: NavProduct;
  selected?: boolean;
  small?: boolean;
}) {
  const paths = ICONS[product.href];
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200",
        small ? "h-9 w-9" : "h-10 w-10",
        selected ? "bg-sea text-white" : "bg-hero-tint text-sea"
      )}
    >
      {paths ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={small ? "h-5 w-5" : "h-[22px] w-[22px]"}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {paths}
        </svg>
      ) : (
        // A category added later without an icon of its own here keeps its menu image.
        <Image src={product.icon} alt="" width={22} height={22} className="h-5 w-5 object-contain" />
      )}
    </span>
  );
}
