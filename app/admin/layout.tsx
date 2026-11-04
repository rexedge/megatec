import type { Metadata } from "next";

/**
 * The admin, where MEGA-TEC staff edit the site's content (lib/content). It has none of
 * the public site's header, footer or WhatsApp button (components/ui/public-only), and
 * search engines are kept out.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | MEGA-TEC Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-surface-soft min-h-dvh">{children}</div>;
}
