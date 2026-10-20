import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark" | "leaf" | "sky" | "outline-light";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-text hover:bg-accent-soft",
  secondary: "bg-muted text-text hover:bg-border/60",
  dark: "bg-navy text-navy-text hover:bg-[#002846]",
  leaf: "bg-leaf text-white hover:bg-leaf-dark",
  sky: "bg-sky text-white hover:bg-sky-dark",
  "outline-light": "border border-white/70 text-white hover:bg-white/10",
};

const SIZE_CLASSES = {
  md: "gap-3 px-8 py-4 text-base",
  /** Small inside a narrow @container (a product card under 18rem), md from there up. */
  card: "gap-1.5 px-2 py-2.5 text-sm whitespace-nowrap @2xs:gap-3 @2xs:px-8 @2xs:py-4 @2xs:text-base",
};

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  icon,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg text-center font-accent font-medium transition-colors",
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon}
      {children}
    </button>
  );
}
