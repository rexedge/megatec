import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Catalogue } from "@/components/sections/catalogue";

export const metadata: Metadata = {
  title: "LPG Equipment Range | Megatec",
  description:
    "Browse the full Megatec LPG range — single and double nozzle dispensers, skid-mounted retail units and cylinder filling scales.",
};

export default function LpgCataloguePage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "LPG Solutions" }]}
      />
      <Catalogue category="lpg" />
    </>
  );
}
