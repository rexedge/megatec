import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Catalogue } from "@/components/sections/catalogue";

export const metadata: Metadata = {
  title: "EV Charger Range | Megatec",
  description:
    "Browse the full Megatec EV charging range — 60KW commercial dual-gun fast chargers and 40KW wall-mounted home and estate units.",
};

export default function EvChargerCataloguePage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "EV Chargers" }]}
      />
      <Catalogue category="ev-chargers" />
    </>
  );
}
