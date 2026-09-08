import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Catalogue } from "@/components/sections/catalogue";

export const metadata: Metadata = {
  title: "CNG Equipment Range | Megatec",
  description:
    "Browse the full Megatec CNG range — refilling dispensers, daughter stations, storage tubes, conversion kits and control panels.",
};

export default function CngCataloguePage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Products", href: "/products/cng" }, { label: "CNG systems" }]}
      />
      <Catalogue category="cng" />
    </>
  );
}
