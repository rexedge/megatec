import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Punch list MO-07: station, project and hero photos are served at quality 90,
  // not the default 75, which made them look soft. Next 16 only honours the
  // qualities listed here, so a `quality={90}` on an Image needs 90 in this list.
  images: {
    qualities: [75, 90],
  },

  // Punch list ST-06: the four landing pages moved to /solutions/ (Google Ads
  // only, ST-02) and the "/all" catalogues became the category pages (ST-03).
  // Permanent (308) so search engines and old links follow the move.
  // /products/ev-chargers keeps its address: it is now the EV category page.
  // /products/station-accessories/all moves with PA-01.
  redirects() {
    return [
      { source: "/products/fuel-dispensers", destination: "/solutions/fuel-dispensers-nigeria", permanent: true },
      { source: "/products/cng", destination: "/solutions/cng-equipment-nigeria", permanent: true },
      { source: "/products/lpg", destination: "/solutions/lpg-equipment-nigeria", permanent: true },
      { source: "/products/fuel-dispensers/all", destination: "/products/fuel-solutions", permanent: true },
      { source: "/products/cng/all", destination: "/products/cng-solutions", permanent: true },
      { source: "/products/lpg/all", destination: "/products/lpg-solutions", permanent: true },
      { source: "/products/ev-chargers/all", destination: "/products/ev-chargers", permanent: true },
    ];
  },
};

export default nextConfig;
