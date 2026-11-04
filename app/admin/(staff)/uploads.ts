"use server";

import { requireStaff } from "@/lib/auth";
import { cloudinaryAccount, signParams } from "@/lib/cloudinary";

/**
 * Permission to upload one photo: where to send it, and the signed fields to send with it.
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

export async function photoUploadTicket(folder: UploadFolder): Promise<UploadTicket> {
  await requireStaff();
  const account = cloudinaryAccount();
  if (!account) return { error: "Photo uploads aren't set up on this site yet. Tell the developer (CLOUDINARY_URL)." };
  if (!Object.keys(FOLDERS).includes(folder)) return { error: "Uploads can't go there." };

  const params = {
    allowed_formats: IMAGE_FORMATS,
    folder: FOLDERS[folder],
    timestamp: Math.floor(Date.now() / 1000),
  };
  return {
    url: `https://api.cloudinary.com/v1_1/${account.cloudName}/image/upload`,
    fields: {
      allowed_formats: params.allowed_formats,
      folder: params.folder,
      timestamp: String(params.timestamp),
      api_key: account.apiKey,
      signature: signParams(params, account.apiSecret),
    },
  };
}
