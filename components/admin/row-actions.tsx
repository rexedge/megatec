"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { FormMessage } from "@/components/admin/auth-card";

/** What a list action reports back: nothing when it worked, or what went wrong. */
export type ActionResult = { error?: string } | void;

const button =
  "border-border text-ink hover:border-ink inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors disabled:opacity-40 disabled:hover:border-border";

/**
 * The buttons on a row of an admin list: edit, move up or down, hide or show on the site,
 * and remove (which asks first). The move, show and remove actions are server actions
 * already bound to the row.
 */
export function RowActions({
  editHref,
  name,
  first,
  last,
  published,
  move,
  setPublished,
  remove,
}: {
  editHref: string;
  /** How the row is called in the confirm button, e.g. "this quote". */
  name: string;
  first: boolean;
  last: boolean;
  published: boolean;
  move: (by: number) => Promise<ActionResult>;
  setPublished: (published: boolean) => Promise<ActionResult>;
  remove: () => Promise<ActionResult>;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  function run(task: () => Promise<ActionResult>) {
    setError(null);
    startTransition(async () => {
      const result = await task();
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex flex-wrap gap-2">
        <Link href={editHref} className={button}>
          Edit
        </Link>
        <button type="button" disabled={pending || first} className={button} onClick={() => run(() => move(-1))} aria-label="Move up">
          ↑
        </button>
        <button type="button" disabled={pending || last} className={button} onClick={() => run(() => move(1))} aria-label="Move down">
          ↓
        </button>
        <button type="button" disabled={pending} className={button} onClick={() => run(() => setPublished(!published))}>
          {published ? "Hide" : "Show"}
        </button>
        {confirming ? (
          <>
            <button
              type="button"
              disabled={pending}
              className="inline-flex min-h-9 items-center rounded-lg bg-red-600 px-3 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              onClick={() => run(remove)}
            >
              Yes, delete {name}
            </button>
            <button type="button" disabled={pending} className={button} onClick={() => setConfirming(false)}>
              Keep
            </button>
          </>
        ) : (
          <button type="button" disabled={pending} className={button} onClick={() => setConfirming(true)}>
            Delete
          </button>
        )}
      </div>
      {error && <FormMessage tone="error">{error}</FormMessage>}
    </div>
  );
}

/** Save and Cancel at the foot of an editing form. */
export function FormActions({ pending, cancelHref, saveLabel = "Save" }: { pending: boolean; cancelHref: string; saveLabel?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        className="bg-ink hover:bg-ink/90 inline-flex min-h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : saveLabel}
      </button>
      <Link href={cancelHref} className="text-body hover:text-ink text-sm font-medium">
        Cancel
      </Link>
    </div>
  );
}
