"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, SERVICES } from "@/lib/nav";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isOverlay = pathname?.startsWith("/products/") ?? false;
  const isHome = pathname === "/";

  const [openMenu, setOpenMenu] = useState<"products" | "services" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"products" | "services" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = !isOverlay || scrolled;
  const linkClass = solid ? "text-body hover:text-ink" : "text-white/90 hover:text-white";
  const triggerClass = (open: boolean) =>
    cn(
      "flex items-center gap-1 border-b-2 pb-1 text-sm font-medium tracking-tight",
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
      <Container className="flex h-[88px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo-wordart.png"
            alt="Megatec"
            width={600}
            height={192}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-8 md:flex">
          <Link href="/" className={cn("text-sm font-medium tracking-tight", linkClass)}>
            HOME
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === "products" ? null : "products")}
              className={triggerClass(openMenu === "products")}
            >
              SOLUTIONS
              <ChevronDown />
            </button>
            {openMenu === "products" && (
              <div className="absolute left-1/2 top-full mt-4 w-[420px] -translate-x-1/2 rounded-xl border border-border/70 bg-white p-6 shadow-xl">
                <p className="mb-4 text-sm text-body">Solutions</p>
                <ul className="flex flex-col gap-5">
                  {PRODUCTS.map((product) => (
                    <li key={product.href}>
                      <Link
                        href={product.href}
                        onClick={() => setOpenMenu(null)}
                        className="group flex items-start gap-4"
                      >
                        <Image
                          src={product.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="mt-0.5 h-8 w-8 shrink-0 object-contain"
                        />
                        <span className="flex-1">
                          <span className="block font-semibold text-ink">{product.title}</span>
                          <span className="block text-sm text-body">{product.description}</span>
                        </span>
                        <ArrowCircle />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
              className={triggerClass(openMenu === "services")}
            >
              SERVICES
              <ChevronDown />
            </button>
            {openMenu === "services" && (
              <div className="absolute left-1/2 top-full mt-4 w-[380px] -translate-x-1/2 rounded-xl border border-border/70 bg-white p-6 shadow-xl">
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
            )}
          </div>

          <Link href="/about" className={cn("text-sm font-medium tracking-tight", linkClass)}>
            ABOUT US
          </Link>
          <Link href="/#contact" className={cn("text-sm font-medium tracking-tight", linkClass)}>
            CONTACT
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={cn(
              "hidden items-center gap-2 rounded-lg border px-4 py-3 text-sm md:flex",
              solid ? "border-border/70 text-body" : "border-white/40 text-white"
            )}
          >
            <SearchIcon />
            Global search
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "flex items-center justify-center rounded-lg border p-2.5 md:hidden",
              solid ? "border-border/70 text-ink" : "border-white/40 text-white"
            )}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white md:hidden">
          <Container className="flex items-center justify-between py-6">
            <Image src="/logo-wordart.png" alt="Megatec" width={600} height={192} className="h-9 w-auto" />
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
              className="mb-4 flex items-center gap-2 rounded-lg bg-surface-soft px-4 py-3 text-body"
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
              onClick={() => setMobileSection(mobileSection === "products" ? null : "products")}
              className="flex items-center justify-between border-b border-border/60 py-4 text-xl font-medium tracking-tight text-ink"
            >
              SOLUTIONS
              <ChevronDown expanded={mobileSection === "products"} />
            </button>
            {mobileSection === "products" && (
              <ul className="flex flex-col gap-4 py-2 pl-2">
                {PRODUCTS.map((product) => (
                  <li key={product.href}>
                    <Link
                      href={product.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-body"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => setMobileSection(mobileSection === "services" ? null : "services")}
              className="flex items-center justify-between border-b border-border/60 py-4 text-xl font-medium tracking-tight text-ink"
            >
              SERVICES
              <ChevronDown expanded={mobileSection === "services"} />
            </button>
            {mobileSection === "services" && (
              <ul className="flex flex-col gap-4 py-2 pl-2">
                {SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-body"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

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
    </header>
  );
}

function ChevronDown({ expanded }: { expanded?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
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
