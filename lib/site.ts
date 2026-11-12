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

/**
 * The Brand Story on YouTube, https://www.youtube.com/shorts/aumUxpvZHRo. That is a Shorts
 * address, which only plays on YouTube's own site; the embed address needs the bare id (R2-13).
 */
export const BRAND_STORY_VIDEO_ID = "aumUxpvZHRo";

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : SITE_URL + path);
