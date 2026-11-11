/**
 * The address the site is served from, for the absolute links structured data needs
 * (punch list SW-15). Set NEXT_PUBLIC_SITE_URL on Vercel if the live address differs; it must be the www address (R2-05).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.megatecpumps.com").replace(
  /\/$/,
  ""
);

/** The site's Google Tag Manager container, from Mega-Tec (R2-23). */
export const GTM_ID = "GTM-NFNFJVXX";

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : SITE_URL + path);
