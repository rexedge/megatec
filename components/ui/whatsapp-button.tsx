"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/ui/enquiry-modal";

export function WhatsappButton({
  message,
  variant = "primary",
  size = "md",
  className,
  children = "Chat on whatsapp",
}: {
  message?: string;
  variant?: "primary" | "dark" | "leaf" | "sky";
  size?: "md" | "card";
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
      size={size}
      className={className}
      onClick={() => openQuote({ message })}
      icon={
        <Image
          src={iconSrc}
          alt=""
          width={24}
          height={24}
          className={size === "card" ? "h-5 w-5 @2xs:h-6 @2xs:w-6" : "h-6 w-6"}
        />
      }
    >
      {children}
    </Button>
  );
}
