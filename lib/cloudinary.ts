import "server-only";
import { createHash } from "node:crypto";

/**
 * Uploaded photos live on Cloudinary. The browser sends a file straight to Cloudinary with
 * a signature the server makes here, so the API secret never leaves the server and large
 * files do not pass through Vercel's 4.5 MB request limit.
 *
 * CLOUDINARY_URL: cloudinary://API_KEY:API_SECRET@CLOUD_NAME (in .env.local and on Vercel).
 */
export function cloudinaryAccount() {
  // Only the address: a note pasted after it ("cloudinary://… # LIVE") is ignored.
  const raw = process.env.CLOUDINARY_URL?.trim().split(/\s+/)[0];
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const account = {
      cloudName: url.hostname,
      apiKey: decodeURIComponent(url.username),
      apiSecret: decodeURIComponent(url.password),
    };
    return account.cloudName && account.apiKey && account.apiSecret ? account : null;
  } catch {
    return null;
  }
}

/** Cloudinary's request signature: the parameters sorted by name as a=1&b=2, then the secret, SHA-1. */
export function signParams(params: Record<string, string | number>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(payload + apiSecret).digest("hex");
}
