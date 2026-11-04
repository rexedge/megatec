"use client";

import { useId, useRef, useState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { sheetUploadTicket } from "@/app/admin/(staff)/uploads";
import { sendToCloudinary } from "@/components/admin/cloudinary-upload";
import { specSheetHref } from "@/lib/spec-sheets";

/** Cloudinary's limit for one file on the account's plan. */
const MAX_BYTES = 10 * 1024 * 1024;

const button =
  "border-border text-ink hover:border-ink inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border bg-white px-4 text-sm font-medium transition-colors";

/** The PDF's file name: "MT_PLUS_Single_Nozzle_TB.pdf", or an upload's with Cloudinary's letters added. */
function fileName(sheet: string) {
  try {
    return decodeURIComponent(sheet.split("/").pop() ?? sheet);
  } catch {
    return sheet;
  }
}

/**
 * A product's spec sheet on its form: the PDF there now, with buttons to upload another or
 * remove it. Like a photo (PhotoField), the PDF goes to Cloudinary as soon as it is picked,
 * and the form saves its address (in a hidden input called `name`) with everything else.
 */
export function SheetField({ name, defaultValue }: { name: string; defaultValue: string | null }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [sheet, setSheet] = useState(defaultValue ?? "");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return setError("Choose a PDF file.");
    if (file.size > MAX_BYTES) {
      return setError("That PDF is over 10 MB. Save a smaller copy (most PDF makers offer “Reduce file size”) and try again.");
    }
    setProgress(0);
    try {
      const ticket = await sheetUploadTicket();
      if ("error" in ticket) throw new Error(ticket.error);
      setSheet((await sendToCloudinary(file, ticket, setProgress)).url);
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
          Spec sheet <span className="text-body/70 font-normal">(optional)</span>
        </span>
        <span className="text-body mt-0.5 block text-xs leading-relaxed">
          The PDF behind “Download full specification” in the details panel. Visitors leave their details before it opens.
        </span>
      </p>
      <input type="hidden" name={name} value={sheet} />
      {/* Saving mid-upload would keep the old PDF, so the form says it is still busy. */}
      {uploading && <input type="hidden" name="uploading" value="1" />}

      <div className="bg-surface-soft flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
        {sheet ? (
          <a
            href={specSheetHref(sheet)}
            target="_blank"
            rel="noreferrer"
            className="text-ink min-w-0 text-sm font-medium break-all underline underline-offset-2"
          >
            {fileName(sheet)}
          </a>
        ) : (
          <p className="text-body text-sm">No spec sheet: the details panel has no download link.</p>
        )}
        <div className="flex shrink-0 flex-wrap gap-2">
          <label htmlFor={id} className={`${button} ${uploading ? "pointer-events-none opacity-60" : ""}`}>
            {uploading ? `Uploading… ${progress}%` : sheet ? "Replace PDF" : "Upload a PDF"}
          </label>
          <input
            ref={input}
            id={id}
            type="file"
            accept="application/pdf,.pdf"
            disabled={uploading}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(file);
            }}
          />
          {sheet && !uploading && (
            <button type="button" className={button} onClick={() => setSheet("")}>
              Remove
            </button>
          )}
        </div>
      </div>
      <p className="text-body mt-1.5 text-xs">PDF, up to 10 MB. It is saved with the form.</p>
      {error && (
        <div className="mt-2">
          <FormMessage tone="error">{error}</FormMessage>
        </div>
      )}
    </div>
  );
}
