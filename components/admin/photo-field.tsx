"use client";

import { useId, useRef, useState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { photoUploadTicket, type UploadFolder } from "@/app/admin/(staff)/uploads";

export type UploadedPhoto = { url: string; width: number; height: number };

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/svg+xml";

const button =
  "border-border text-ink hover:border-ink inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border bg-white px-4 text-sm font-medium transition-colors";

/** Sends the file to Cloudinary with the server's signed fields, reporting progress. */
function send(file: File, url: string, fields: Record<string, string>, onProgress: (percent: number) => void) {
  return new Promise<UploadedPhoto>((resolve, reject) => {
    const body = new FormData();
    for (const [key, value] of Object.entries(fields)) body.append(key, value);
    body.append("file", file);
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.onerror = () => reject(new Error("The upload didn't go through. Check the connection and try again."));
    request.onload = () => {
      let reply: { secure_url?: string; width?: number; height?: number; error?: { message?: string } } = {};
      try {
        reply = JSON.parse(request.responseText);
      } catch {}
      if (request.status >= 200 && request.status < 300 && reply.secure_url) {
        resolve({ url: reply.secure_url, width: reply.width ?? 0, height: reply.height ?? 0 });
      } else {
        reject(new Error(reply.error?.message ? `Cloudinary refused the file: ${reply.error.message}` : "The upload failed. Try again."));
      }
    };
    request.send(body);
  });
}

/**
 * A photo on a form: what is there now, and buttons to upload a new one or remove it. The
 * photo goes to Cloudinary as soon as it is picked; the form saves its address (in a hidden
 * input called `name`) along with everything else. `onChange` hears about each new photo,
 * e.g. so a logo's form can keep its width and height.
 */
export function PhotoField({
  label,
  hint,
  name,
  folder,
  defaultValue,
  optional = true,
  previewClassName = "h-40 w-auto max-w-full object-cover",
  onChange,
}: {
  label: string;
  hint?: string;
  name: string;
  folder: UploadFolder;
  defaultValue: string | null;
  optional?: boolean;
  previewClassName?: string;
  onChange?: (photo: UploadedPhoto | null) => void;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue ?? "");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    if (!ACCEPT.split(",").includes(file.type)) return setError("Choose a JPG, PNG, WebP or SVG image.");
    if (file.size > MAX_BYTES) return setError("That file is over 10 MB. Save a smaller copy and try again.");
    setProgress(0);
    try {
      const ticket = await photoUploadTicket(folder);
      if ("error" in ticket) throw new Error(ticket.error);
      const photo = await send(file, ticket.url, ticket.fields, setProgress);
      setUrl(photo.url);
      onChange?.(photo);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "The upload failed. Try again.");
    } finally {
      setProgress(null);
      if (input.current) input.current.value = "";
    }
  }

  const uploading = progress !== null;

  return (
    <div>
      <p className="mb-1.5">
        <span className="text-ink block text-sm font-medium">
          {label}
          {optional && <span className="text-body/70 font-normal"> (optional)</span>}
        </span>
        {hint && <span className="text-body mt-0.5 block text-xs leading-relaxed">{hint}</span>}
      </p>
      <input type="hidden" name={name} value={url} />
      {/* Saving mid-upload would keep the old photo, so the form says it is still busy. */}
      {uploading && <input type="hidden" name="uploading" value="1" />}

      <div className="bg-surface-soft flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center">
        {url ? (
          // A plain img: the admin shows the file as uploaded, whatever its host.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className={`bg-white rounded-lg ${previewClassName}`} />
        ) : (
          <div className="text-body/70 border-border flex h-28 w-40 items-center justify-center rounded-lg border border-dashed bg-white text-xs">
            No photo
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-2">
            <label htmlFor={id} className={`${button} ${uploading ? "pointer-events-none opacity-60" : ""}`}>
              {uploading ? `Uploading… ${progress}%` : url ? "Replace photo" : "Upload a photo"}
            </label>
            <input
              ref={input}
              id={id}
              type="file"
              accept={ACCEPT}
              disabled={uploading}
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) upload(file);
              }}
            />
            {url && optional && !uploading && (
              <button
                type="button"
                className={button}
                onClick={() => {
                  setUrl("");
                  onChange?.(null);
                }}
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-body text-xs">JPG, PNG, WebP or SVG, up to 10 MB. It is saved with the form.</p>
        </div>
      </div>
      {error && (
        <div className="mt-2">
          <FormMessage tone="error">{error}</FormMessage>
        </div>
      )}
    </div>
  );
}
