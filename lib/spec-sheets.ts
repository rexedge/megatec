/**
 * Where a product's spec sheet opens: an uploaded one by its own Cloudinary address, or a
 * PDF shipped with the site by its file name under /public/spec-sheets.
 */
export function specSheetHref(sheet: string) {
  return sheet.startsWith("https://") ? sheet : `/spec-sheets/${sheet}`;
}
