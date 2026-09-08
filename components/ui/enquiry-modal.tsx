"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const WHATSAPP_NUMBER = "2348062968640";

/** Builds the wa.me deep link for a pre-composed message. */
export function whatsappHref(lines: string[]) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const RESPONSE_NOTE =
  "We respond within 24 hours. No commitment required — just straightforward advice from our technical team.";

export const NEED_OPTIONS = [
  "Fuel dispenser supply",
  "Fuel dispenser installation",
  "LPG equipment",
  "CNG equipment",
  "EV Charger",
  "Station accessories",
  "Maintenance & repairs",
] as const;

type Need = (typeof NEED_OPTIONS)[number];

/** Pre-ticks the likeliest need based on the page the modal was opened from. */
const NEED_BY_PATH: Record<string, Need> = {
  "/products/fuel-dispensers": "Fuel dispenser supply",
  "/products/lpg": "LPG equipment",
  "/products/cng": "CNG equipment",
  "/products/ev-chargers": "EV Charger",
  "/services/installation-and-commissioning": "Fuel dispenser installation",
  "/services/maintenance-and-repair": "Maintenance & repairs",
};

type QuoteRequest = {
  /** Context line prepended to the WhatsApp message, e.g. the product enquired about. */
  message?: string;
};

type SpecSheetRequest = {
  /** Path to the PDF datasheet, served from /public/spec-sheets. */
  href: string;
  description?: string;
};

type OpenModal =
  | ({ kind: "quote" } & QuoteRequest)
  | ({ kind: "spec-sheet" } & SpecSheetRequest);

type EnquiryContextValue = {
  openQuote: (request?: QuoteRequest) => void;
  openSpecSheet: (request: SpecSheetRequest) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  }
  return context;
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<OpenModal | null>(null);

  const close = useCallback(() => setModal(null), []);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      openQuote: (request) => setModal({ kind: "quote", ...request }),
      openSpecSheet: (request) => setModal({ kind: "spec-sheet", ...request }),
    }),
    []
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {modal?.kind === "quote" && <QuoteModal message={modal.message} onClose={close} />}
      {modal?.kind === "spec-sheet" && (
        <SpecSheetModal href={modal.href} description={modal.description} onClose={close} />
      )}
    </EnquiryContext.Provider>
  );
}

const INPUT_CLASSES =
  "w-full rounded-xl bg-surface-soft px-4 py-3.5 text-ink placeholder:text-body/60 focus:outline-none focus:ring-2 focus:ring-sky";

const SUBMIT_CLASSES =
  "inline-flex w-full items-center justify-center gap-3 rounded-xl bg-sky px-8 py-4 font-accent text-base font-medium text-white transition-colors hover:bg-sky-dark";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

function ModalShell({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-body transition-colors hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2
          id={titleId}
          className="pr-10 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-body">{description}</p>

        {children}
      </div>
    </div>
  );
}

function QuoteModal({ message, onClose }: { message?: string; onClose: () => void }) {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [needsOpen, setNeedsOpen] = useState(false);
  const [needs, setNeeds] = useState<Need[]>(() => {
    const suggested = pathname ? NEED_BY_PATH[pathname] : undefined;
    return suggested ? [suggested] : [];
  });

  const toggleNeed = (need: Need) =>
    setNeeds((current) =>
      current.includes(need)
        ? current.filter((item) => item !== need)
        : [...current, need]
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      message ?? "Hi Megatec, I'd like to request a quote.",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
    ];

    if (needs.length > 0) {
      lines.push(`What I need: ${needs.join(", ")}`);
    }

    window.open(whatsappHref(lines), "_blank", "noopener,noreferrer");

    onClose();
  };

  return (
    <ModalShell
      title="Get a Quote"
      description="Fill in your details and we'll get back to you on WhatsApp."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <Field label="Name">
          <input
            required
            autoFocus
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className={INPUT_CLASSES}
          />
        </Field>

        <Field label="Phone Number">
          <input
            required
            type="tel"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Your phone number"
            className={INPUT_CLASSES}
          />
        </Field>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-ink">What do you need?</span>

          <button
            type="button"
            onClick={() => setNeedsOpen((open) => !open)}
            aria-expanded={needsOpen}
            className={cn(INPUT_CLASSES, "flex items-center justify-between gap-3 text-left")}
          >
            <span className={cn("truncate", needs.length === 0 && "text-body/60")}>
              {needs.length > 0 ? needs.join(", ") : "Select an option"}
            </span>
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "h-5 w-5 shrink-0 text-body transition-transform",
                needsOpen && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {needsOpen && (
            <div className="flex flex-col rounded-xl border border-border p-2">
              {NEED_OPTIONS.map((need) => (
                <label
                  key={need}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-soft"
                >
                  <input
                    type="checkbox"
                    checked={needs.includes(need)}
                    onChange={() => toggleNeed(need)}
                    className="h-5 w-5 shrink-0 rounded accent-sky"
                  />
                  <span className="text-ink">{need}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className={SUBMIT_CLASSES}>
          <Image
            src="/images/landing/icon-whatsapp-alt.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6"
          />
          Send on WhatsApp
        </button>

        <p className="text-center text-sm text-body">{RESPONSE_NOTE}</p>
      </form>
    </ModalShell>
  );
}

function SpecSheetModal({
  href,
  description,
  onClose,
}: {
  href: string;
  description?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO(backend): these details are collected but not delivered anywhere yet.
    // Wire { name, phone, company, sheet: href } to the CRM / form service, then
    // the "we respond within 24 hours" note below becomes accurate. Until that
    // exists this form only gates the download.
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <ModalShell
      title="Download product specifications"
      description={description ?? "Download the full technical datasheet."}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <Field label="Name">
          <input
            required
            autoFocus
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className={INPUT_CLASSES}
          />
        </Field>

        <Field label="Phone Number">
          <input
            required
            type="tel"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Your phone number"
            className={INPUT_CLASSES}
          />
        </Field>

        <Field label="Company">
          <input
            name="company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Enter company name"
            className={INPUT_CLASSES}
          />
        </Field>

        <button type="submit" className={SUBMIT_CLASSES}>
          Download specifications
        </button>

        <p className="text-center text-sm text-body">{RESPONSE_NOTE}</p>
      </form>
    </ModalShell>
  );
}
