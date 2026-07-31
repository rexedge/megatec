import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="border-b border-border/70 py-6">
      <Container>
        <nav className="flex items-center gap-2 text-sm text-body">
          {items.map((item, index) => (
            <span key={item.label} className="flex items-center gap-2">
              {index > 0 && <span className="text-border">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-ink">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </Container>
    </div>
  );
}
