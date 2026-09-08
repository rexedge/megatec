import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Catalogue } from "@/components/sections/catalogue";

export const metadata: Metadata = {
  title: "Fuel Dispenser Range | Megatec",
  description:
    "Browse the full Megatec fuel dispenser range — MT PLUS, MT PRO, submersible and gear pump models. Filter by flow rate, nozzle count, application and fuel type.",
};

export default function FuelDispenserCataloguePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products/fuel-dispensers" },
          { label: "Fuel dispensers" },
        ]}
      />
      <Catalogue category="fuel-dispensers" />
    </>
  );
}
