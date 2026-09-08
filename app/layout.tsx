import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EnquiryProvider } from "@/components/ui/enquiry-modal";
import "./globals.css";

// Loaded from disk rather than next/font/google: Next has no precalculated
// metrics for Google Sans Flex, so the Google loader could not generate the
// size-adjusted fallback face and body text reflowed when the webfont swapped
// in. next/font/local reads the metrics out of the file with fontkit instead.
// The file is the latin subset Google serves — every character on this site
// falls inside it. Provenance and licence: ./fonts/README.md.
const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex-latin.woff2",
  variable: "--font-sans",
  weight: "1 1000",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "100%" }],
});

// Also loaded from disk. Inter Tight does have fallback metrics in Next's table,
// so this is not the Google Sans Flex problem — it is that next/font/google
// fetches from fonts.googleapis.com at build time, and that fetch failed often
// enough to block builds outright ("Failed to fetch `Inter Tight`"). Reading the
// file from disk makes the build independent of the network. OFL, see
// ./fonts/OFL-Inter-Tight.txt.
const interTight = localFont({
  src: "./fonts/inter-tight-latin.woff2",
  variable: "--font-accent",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Megatec | Fuel Infrastructure Engineering",
  description:
    "Megatec engineers fuel dispensers, CNG and LPG systems, and EV charging infrastructure, backed by installation, maintenance, and technical support services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSansFlex.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <EnquiryProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </EnquiryProvider>
      </body>
    </html>
  );
}
