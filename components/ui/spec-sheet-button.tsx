"use client";

import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/ui/enquiry-modal";

type SpecSheetTriggerProps = {
  /** Path to the PDF datasheet, served from /public/spec-sheets. */
  href: string;
  /** Shown as the modal subtitle, e.g. "…datasheet for our fuel dispenser range." */
  description?: string;
  className?: string;
  children: React.ReactNode;
};

/** Full button — used for the "Download product specs" call to action on product pages. */
export function SpecSheetButton({
  href,
  description,
  variant = "secondary",
  className,
  children,
}: SpecSheetTriggerProps & { variant?: "primary" | "secondary" | "dark" | "sky" }) {
  const { openSpecSheet } = useEnquiry();

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => openSpecSheet({ href, description })}
    >
      {children}
    </Button>
  );
}

/** Inline text link — used inside product cards. */
export function SpecSheetLink({
  href,
  description,
  className,
  children,
}: SpecSheetTriggerProps) {
  const { openSpecSheet } = useEnquiry();

  return (
    <button
      type="button"
      onClick={() => openSpecSheet({ href, description })}
      className={
        className ??
        "text-center text-sm font-medium text-ink underline underline-offset-2"
      }
    >
      {children}
    </button>
  );
}
