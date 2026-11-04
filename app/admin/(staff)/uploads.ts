"use server";

import { requireStaff } from "@/lib/auth";
import { cloudinaryAccount, signParams } from "@/lib/cloudinary";

/**
 * Permission to upload one file: where to send it, and the signed fields to send with it.
 * The signature covers the folder and the accepted formats, and Cloudinary refuses it after
 * an hour, so it cannot be reused to put other files elsewhere in the account.
 */

const FOLDERS = {
  logos: "megatec/client-logos",
  projects: "megatec/projects",
  parts: "megatec/spare-parts",
  products: "megatec/products",
} as const;

export type UploadFolder = keyof typeof FOLDERS;
export type UploadTicket = { url: string; fields: Record<string, string> } | { error: string };

const IMAGE_FORMATS = "jpg,jpeg,png,webp,avif,svg";

/** The signed fields for these parameters; the caller has already checked the user is staff. */
function ticket(params: Record<string, string | number>): UploadTicket {
  const account = cloudinaryAccount();
  if (!account) return { error: "Uploads aren't set up on this site yet. Tell the developer (CLOUDINARY_URL)." };
  const signed = { ...params, timestamp: Math.floor(Date.now() / 1000) };
  return {
    url: `https://api.cloudinary.com/v1_1/${account.cloudName}/image/upload`,
    fields: {
      ...Object.fromEntries(Object.entries(signed).map(([key, value]) => [key, String(value)])),
      api_key: account.apiKey,
      signature: signParams(signed, account.apiSecret),
    },
  };
}

export async function photoUploadTicket(folder: UploadFolder): Promise<UploadTicket> {
  await requireStaff();
  if (!Object.keys(FOLDERS).includes(folder)) return { error: "Uploads can't go there." };
  return ticket({ allowed_formats: IMAGE_FORMATS, folder: FOLDERS[folder] });
}

/**
 * A product's spec sheet: a PDF only. It keeps its own file name with a few letters added
 * (MT_PLUS_Single_Nozzle_TB_x7k2qp.pdf), so the downloaded copy is named after the product.
 */
export async function sheetUploadTicket(): Promise<UploadTicket> {
  await requireStaff();
  return ticket({ allowed_formats: "pdf", folder: "megatec/spec-sheets", unique_filename: "true", use_filename: "true" });
}
