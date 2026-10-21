/**
 * The address the site is served from, for the absolute links structured data needs
 * (punch list SW-15). Set NEXT_PUBLIC_SITE_URL on Vercel if the live address differs.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://megatecpumps.com").replace(
  /\/$/,
  ""
);

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : SITE_URL + path);
