/**
 * Moving a row up or down a list the admin keeps in order (`sortOrder`): the ids in their
 * new order, or null when the row is already at that end (or is not in the list).
 */
export function reorder(ids: number[], id: number, by: number): number[] | null {
  const from = ids.indexOf(id);
  const to = from + (by < 0 ? -1 : 1);
  if (from < 0 || to < 0 || to >= ids.length) return null;
  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

/** A row id from a form or an address: a positive whole number, or null. */
export function rowId(value: unknown): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/** The order the admin lists rows in, the same as the site's. */
export const ADMIN_ORDER = [{ sortOrder: "asc" as const }, { id: "asc" as const }];
