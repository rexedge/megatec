import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark" | "leaf" | "sky" | "outline-light";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-text hover:bg-accent-soft",
  secondary: "bg-muted text-text hover:bg-border/60",
  dark: "bg-navy text-navy-text hover:bg-[#002846]",
  leaf: "bg-leaf text-white hover:bg-leaf-dark",
  sky: "bg-sky text-text hover:bg-sky-dark",
  "outline-light": "border border-white/70 text-white hover:bg-white/10",
};

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  className,
  icon,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-3 rounded-lg px-8 py-4 font-accent text-base font-medium whitespace-nowrap transition-colors",
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
