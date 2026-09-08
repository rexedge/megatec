import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Catalogue } from "@/components/sections/catalogue";

export const metadata: Metadata = {
  title: "Station Accessories Range | Megatec",
  description:
    "Browse the full Megatec station accessories range — nozzles, hoses, meters, filters, valves, motors, boards and calibration measures.",
};

export default function StationAccessoriesCataloguePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products/station-accessories" },
          { label: "Station accessories" },
        ]}
      />
      <Catalogue category="station-accessories" />
    </>
  );
}
