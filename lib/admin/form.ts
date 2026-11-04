import "server-only";
import { cloudinaryAccount } from "@/lib/cloudinary";

/** Reading an editor's submitted form on the server. */

export function text(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

export function checked(form: FormData, name: string) {
  return form.get(name) === "on";
}

/** A field posted once per row of a RowList: one entry per row, in the order shown. */
export function texts(form: FormData, name: string) {
  return form.getAll(name).map((value) => String(value).trim());
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

/**
 * A spec sheet from the product form: null for none, or the address if it is one of the
 * site's own PDFs (a file name under /public/spec-sheets) or a PDF in this site's Cloudinary
 * account. Anything else is refused (undefined).
 */
export function sheetAddress(value: string): string | null | undefined {
  if (!value) return null;
  if (/^[\w\-.]+\.pdf$/.test(value) && !value.includes("..")) return value;
  const account = cloudinaryAccount();
  const uploaded = account && `https://res.cloudinary.com/${account.cloudName}/image/upload/`;
  if (uploaded && value.startsWith(uploaded) && /^[^\s?#]+\.pdf$/.test(value)) return value;
  return undefined;
}
