import "server-only";
import { cloudinaryAccount } from "@/lib/cloudinary";

/** Reading an editor's submitted form on the server. */

export function text(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

export function checked(form: FormData, name: string) {
  return form.get(name) === "on";
}

/** True while a photo on the form is still on its way to Cloudinary (PhotoField). */
export function stillUploading(form: FormData) {
  return form.get("uploading") === "1";
}

/**
 * A photo address from a PhotoField: null for none, or the address if it is one of the
 * site's own files (/images/...) or a photo in this site's Cloudinary account. Anything
 * else is refused (undefined), so a form can't point the site at someone else's images.
 */
export function photoAddress(value: string): string | null | undefined {
  if (!value) return null;
  if (/^\/images\/[\w\-./]+$/.test(value) && !value.includes("..")) return value;
  const account = cloudinaryAccount();
  if (account && value.startsWith(`https://res.cloudinary.com/${account.cloudName}/image/upload/`)) return value;
  return undefined;
}
