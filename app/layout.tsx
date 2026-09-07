import type { Metadata } from "next";
import { Google_Sans_Flex, Inter_Tight } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EnquiryProvider } from "@/components/ui/enquiry-modal";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-accent",
  subsets: ["latin"],
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
