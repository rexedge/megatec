import Image from "next/image";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "2348062968640";

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
  const href = message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  const iconSrc =
    variant === "dark"
      ? "/images/landing/icon-whatsapp-alt.svg"
      : variant === "leaf"
        ? "/images/landing/icon-whatsapp-alt.svg"
        : "/images/landing/icon-whatsapp.svg";

  return (
    <Button
      href={href}
      variant={variant}
      className={className}
      icon={<Image src={iconSrc} alt="" width={24} height={24} className="h-6 w-6" />}
    >
      {children}
    </Button>
  );
}
