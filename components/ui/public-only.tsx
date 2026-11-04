"use client";

import { usePathname } from "next/navigation";

/** The public site's header, footer and WhatsApp button: everywhere except the admin. */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith("/admin") ? null : children;
}
