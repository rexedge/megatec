"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/ui/enquiry-modal";

export function WhatsappButton({
  message,
  variant = "primary",
  className,
  children = "Chat on whatsapp",
}: {
  message?: string;
  variant?: "primary" | "dark" | "leaf" | "sky";
  className?: string;
  children?: React.ReactNode;
}) {
  const { openQuote } = useEnquiry();

  // Every variant but `primary` sits on a dark or saturated ground, so it takes
  // the light icon; the dark one would disappear into it.
  const iconSrc =
    variant === "primary"
      ? "/images/landing/icon-whatsapp.svg"
      : "/images/landing/icon-whatsapp-alt.svg";

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => openQuote({ message })}
      icon={<Image src={iconSrc} alt="" width={24} height={24} className="h-6 w-6" />}
    >
      {children}
    </Button>
  );
}
