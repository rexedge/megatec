"use client";

import { useEffect, useId, useRef, useState } from "react";

const small =
  "border-border text-ink hover:border-ink inline-flex h-9 min-w-9 items-center justify-center rounded-lg border bg-white px-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:hover:border-border";

/**
 * Rows on a form that staff can add to, reorder and remove, e.g. a product's spec grid.
 * `children` draws a row's inputs. Rows are keyed by row, not by position, so what is typed
 * in them moves with them. The form posts the inputs in the order shown, and the server
 * reads each column with FormData.getAll.
 */
export function RowList<T>({
  label,
  hint,
  optional,
  initial,
  blank,
  addLabel,
  noun,
  max,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  optional?: boolean;
  initial: T[];
  /** A new row's starting values. */
  blank: T;
  addLabel: string;
  /** What a row is, for the buttons' accessible names: "Move detail 2 up". */
  noun: string;
  max: number;
  /** The row's inputs; `position` counts from 1, for their accessible names. */
  children: (row: T, position: number) => React.ReactNode;
}) {
  const id = useId();
  const list = useRef<HTMLOListElement>(null);
  const nextKey = useRef(initial.length);
  const focusNew = useRef(false);
  const [rows, setRows] = useState(() => initial.map((value, key) => ({ key, value })));

  // A row just added gets the cursor.
  useEffect(() => {
    if (!focusNew.current) return;
    focusNew.current = false;
    list.current?.lastElementChild?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }, [rows]);

  function move(index: number, by: number) {
    setRows((current) => {
      const copy = [...current];
      const [row] = copy.splice(index, 1);
      copy.splice(index + by, 0, row);
      return copy;
    });
  }

  return (
    <fieldset aria-describedby={hint ? `${id}-hint` : undefined}>
      <legend className="text-ink text-sm font-medium">
        {label}
        {optional && <span className="text-body/70 font-normal"> (optional)</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="text-body mt-0.5 text-xs leading-relaxed">
          {hint}
        </p>
      )}
      {rows.length > 0 && (
        <ol ref={list} className="mt-2 space-y-2">
          {rows.map((row, index) => (
            <li key={row.key} className="bg-surface-soft flex flex-col gap-2 rounded-xl p-2 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">{children(row.value, index + 1)}</div>
              <div className="flex shrink-0 gap-1 self-end sm:self-auto">
                <button
                  type="button"
                  className={small}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move ${noun} ${index + 1} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={small}
                  disabled={index === rows.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move ${noun} ${index + 1} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={small}
                  onClick={() => setRows((current) => current.filter((r) => r.key !== row.key))}
                  aria-label={`Remove ${noun} ${index + 1}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        className={`${small} mt-2 px-4`}
        disabled={rows.length >= max}
        onClick={() => {
          focusNew.current = true;
          setRows((current) => [...current, { key: nextKey.current++, value: blank }]);
        }}
      >
        + {addLabel}
      </button>
    </fieldset>
  );
}
