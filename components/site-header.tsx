"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HERO_PAGES, PRODUCTS, SERVICES } from "@/lib/nav";
import { Container } from "@/components/ui/container";
import { SearchDialog } from "@/components/ui/search-dialog";
import { ProductsMegaMenu, ProductsMenuMobile } from "@/components/ui/products-menu";
import { cn } from "@/lib/cn";
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from "@/lib/contact";

/** Where the full navbar takes over from the menu button (Tailwind's lg). */
const WIDE = "(min-width: 1024px)";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS & INSTALLATIONS", href: "/projects" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // Landing pages open on a full-bleed hero, so the header sits over it.
  // Category pages start on white and must not.
  const isOverlay = HERO_PAGES.includes(pathname);
  const isHome = pathname === "/";

  const [openMenu, setOpenMenu] = useState<"products" | "services" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"products" | "services" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const productsTrigger = useRef<HTMLButtonElement>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);

  // Escape closes an open dropdown and puts focus back on its button.
  useEffect(() => {
    if (openMenu === null) return;
    const trigger = openMenu === "products" ? productsTrigger : servicesTrigger;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      trigger.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu]);

  // Turning a tablet can cross 1024px with a menu open. That menu would vanish but keep
  // the page locked, so whichever is open closes when the layout switches.
  useEffect(() => {
    const wide = window.matchMedia(WIDE);
    function onChange() {
      setMobileOpen(false);
      setOpenMenu(null);
    }
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isOverlay) return;
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // The page behind stays put while the full-screen mobile menu or a desktop dropdown
  // is open (R2-10). Taking the scrollbar away would shift the layout sideways, so its
  // width is added back as padding.
  const lockScroll = mobileOpen || openMenu !== null;
  useEffect(() => {
    if (!lockScroll) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [lockScroll]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function openSearch() {
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(true);
  }

  const solid = !isOverlay || scrolled;
  const linkClass = solid ? "text-body hover:text-ink" : "text-white/90 hover:text-white";
  // Every top-level item gets the dropdowns' underline box (a 2px border plus
  // padding), transparent unless a menu is open. Without it the dropdown
  // buttons stand taller than the plain links and their labels ride higher.
  const navItem = "border-b-2 pb-1 text-sm font-medium tracking-tight whitespace-nowrap";
  const linkItemClass = cn(navItem, "border-transparent", linkClass);
  const triggerClass = (open: boolean) =>
    cn(
      "flex items-center gap-1",
      navItem,
      open
        ? solid
          ? "border-ink text-ink"
          : "border-white text-white"
        : cn("border-transparent", linkClass)
    );

  return (
    <header
      className={cn(
        "z-50 border-b transition-colors duration-300",
        isOverlay ? "fixed top-0 right-0 left-0" : "sticky top-0",
        solid
          ? cn("border-border/70", isHome ? "bg-hero-tint" : "bg-white")
          : "border-transparent bg-transparent"
      )}
    >
      {/* The slim contact bar (SW-01): it travels with the header, so it is always on screen. */}
      <div className="bg-navy text-navy-text">
        <Container className="flex h-10 items-center justify-between gap-3 text-sm">
          <span className="font-bold tracking-tight">MEGA-TEC</span>
          <a
            href={`tel:${PHONE_PRIMARY.tel}`}
            className="font-medium hover:underline"
            aria-label={`Call ${PHONE_PRIMARY.display}`}
          >
            {PHONE_PRIMARY.display}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-leaf hover:bg-leaf-dark rounded-md px-3 py-1 text-xs font-medium text-white transition-colors"
          >
            WhatsApp
          </a>
        </Container>
      </div>
      <Container className="flex h-[88px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo-wordart.png"
            alt="MEGA-TEC"
            width={600}
            height={192}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* The full row shows from 1024px; below that, phones and tablets get the menu
            button and the full-screen menu instead (see WIDE). Its labels never wrap, so
            until 1280px the gaps are tighter, and until 1100px search is just its icon. */}
        <nav ref={navRef} className="hidden items-center gap-6 lg:flex xl:gap-8">
          <Link href="/" className={linkItemClass}>
            HOME
          </Link>

          {/* Not `relative`: the products menu hangs from the whole header, not this button. */}
          <div>
            <button
              ref={productsTrigger}
              type="button"
              aria-expanded={openMenu === "products"}
              aria-controls="products-menu"
              onClick={() => setOpenMenu(openMenu === "products" ? null : "products")}
              className={triggerClass(openMenu === "products")}
            >
              PRODUCTS
              <ChevronDown expanded={openMenu === "products"} />
            </button>
            <ProductsMegaMenu
              id="products-menu"
              products={PRODUCTS}
              open={openMenu === "products"}
              onNavigate={() => setOpenMenu(null)}
            />
          </div>

          <div className="relative">
            <button
              ref={servicesTrigger}
              type="button"
              aria-expanded={openMenu === "services"}
              aria-controls="services-menu"
              onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
              className={triggerClass(openMenu === "services")}
            >
              SERVICES
              <ChevronDown expanded={openMenu === "services"} />
            </button>
            {/* Mounted throughout so it can fade out as well as in; inert while closed. */}
            <div
              id="services-menu"
              inert={openMenu !== "services"}
              className={cn(
                "absolute left-1/2 top-full mt-4 max-h-[calc(100dvh-8.5rem)] w-[380px] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-xl border border-border/70 bg-white p-6 shadow-xl",
                "transition-[opacity,translate,visibility] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
                openMenu === "services"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1.5 opacity-0"
              )}
            >
              <p className="mb-4 text-sm text-body">Services</p>
              <ul className="flex flex-col gap-4">
                {SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="font-medium text-ink">{service.title}</span>
                      <ArrowCircle />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/projects" className={linkItemClass}>
            PROJECTS &amp; INSTALLATIONS
          </Link>
          <Link href="/about" className={linkItemClass}>
            ABOUT US
          </Link>
          <Link href="/contact" className={linkItemClass}>
            CONTACT
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Global search"
            className={cn(
              "hidden items-center gap-2 rounded-lg border px-4 py-3 text-sm whitespace-nowrap transition-colors lg:flex",
              solid
                ? "border-border/70 text-body hover:border-ink hover:text-ink"
                : "border-white/40 text-white hover:border-white"
            )}
          >
            <SearchIcon />
            <span className="hidden min-[1100px]:inline">Global search</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "flex items-center justify-center rounded-lg border p-2.5 lg:hidden",
              solid ? "border-border/70 text-ink" : "border-white/40 text-white"
            )}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="animate-menu-sheet fixed inset-0 z-50 overflow-y-auto bg-white motion-reduce:animate-none lg:hidden">
          <Container className="flex items-center justify-between py-6">
            <Image src="/logo-wordart.png" alt="MEGA-TEC" width={600} height={192} className="h-9 w-auto" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-lg bg-accent p-3"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </Container>
          <Container className="flex flex-col gap-2 pb-10">
            <button
              type="button"
              onClick={openSearch}
              className="bg-surface-soft text-body mb-4 flex items-center gap-2 rounded-lg px-4 py-3"
            >
              <SearchIcon />
              Global search
            </button>

            {NAV_LINKS.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border/60 py-4 text-xl font-medium tracking-tight text-ink"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              aria-expanded={mobileSection === "products"}
              aria-controls="mobile-products"
              onClick={() => setMobileSection(mobileSection === "products" ? null : "products")}
              className="flex items-center justify-between border-b border-border/60 py-4 text-xl font-medium tracking-tight text-ink"
            >
              PRODUCTS
              <ChevronDown expanded={mobileSection === "products"} />
            </button>
            <Collapse id="mobile-products" open={mobileSection === "products"}>
              <ProductsMenuMobile
                products={PRODUCTS}
                play={mobileSection === "products"}
                onNavigate={() => setMobileOpen(false)}
              />
            </Collapse>

            <button
              type="button"
              aria-expanded={mobileSection === "services"}
              aria-controls="mobile-services"
              onClick={() => setMobileSection(mobileSection === "services" ? null : "services")}
              className="flex items-center justify-between border-b border-border/60 py-4 text-xl font-medium tracking-tight text-ink"
            >
              SERVICES
              <ChevronDown expanded={mobileSection === "services"} />
            </button>
            <Collapse id="mobile-services" open={mobileSection === "services"}>
              <ul className="flex flex-col py-2 pl-2">
                {SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-11 items-center text-body"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Collapse>

            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border/60 py-4 text-xl font-medium tracking-tight text-ink"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

/**
 * Opens and closes by animating its height (grid rows 0fr to 1fr), so a section of the
 * mobile menu unfolds rather than appearing. It stays mounted to close smoothly too.
 */
function Collapse({ id, open, children }: { id: string; open: boolean; children: React.ReactNode }) {
  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function ChevronDown({ expanded }: { expanded?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none",
        expanded && "rotate-180"
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowCircle() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#091A23">
        <path d="M16 25H28.17L22.58 30.59L24 32L32 24L24 16L22.59 17.41L28.17 23H16V25Z" transform="translate(-8 -8)" />
      </svg>
    </span>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M16.5 16.5L13 13" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#091A23" strokeWidth={2} strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
