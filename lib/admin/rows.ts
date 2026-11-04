import "server-only";
import type { Prisma } from "@/lib/generated/prisma/client";
import { db } from "@/lib/db";
import { ADMIN_ORDER, reorder, rowId } from "@/lib/admin/order";

/**
 * The list actions every editor shares, for any table with `sortOrder` and `published`:
 * moving a row, hiding or showing it, deleting it, and where a new row goes. `within`
 * narrows a list to the rows it is ordered among, e.g. one sub-category's products.
 * Callers check the signed-in user first.
 */

export type ListTable = "testimonial" | "clientLogo" | "project" | "sparePart" | "product" | "subcategory";
type Where = Record<string, unknown>;

// The few methods used here, which every one of these Prisma tables has.
interface OrderedTable {
  findMany(args: object): Promise<{ id: number }[]>;
  findFirst(args: object): Promise<{ sortOrder: number } | null>;
  findUnique(args: object): Promise<Record<string, unknown> | null>;
  update(args: object): Prisma.PrismaPromise<unknown>;
  updateMany(args: object): Promise<{ count: number }>;
  deleteMany(args: object): Promise<{ count: number }>;
}

function table(name: ListTable) {
  return db![name] as unknown as OrderedTable;
}

/** Moves a row one place up (by -1) or down (by 1) among the rows `within` its list. */
export async function moveRow(name: ListTable, id: unknown, by: number, within: (row: Record<string, unknown>) => Where = () => ({})) {
  const rowKey = rowId(id);
  if (!rowKey) return false;
  const rows = table(name);
  const row = await rows.findUnique({ where: { id: rowKey } });
  if (!row) return false;
  const siblings = await rows.findMany({ where: within(row), orderBy: ADMIN_ORDER, select: { id: true } });
  const ids = reorder(siblings.map((sibling) => sibling.id), rowKey, by);
  if (!ids) return false;
  await db!.$transaction(ids.map((each, sortOrder) => rows.update({ where: { id: each }, data: { sortOrder } })));
  return true;
}

/** The sortOrder for a new row at the end of its list. */
export async function nextSortOrder(name: ListTable, where: Where = {}) {
  const last = await table(name).findFirst({ where, orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
  return (last?.sortOrder ?? -1) + 1;
}

export async function setRowPublished(name: ListTable, id: unknown, published: unknown) {
  const rowKey = rowId(id);
  if (!rowKey) return false;
  return (await table(name).updateMany({ where: { id: rowKey }, data: { published: published === true } })).count > 0;
}

export async function deleteRow(name: ListTable, id: unknown) {
  const rowKey = rowId(id);
  if (!rowKey) return false;
  return (await table(name).deleteMany({ where: { id: rowKey } })).count > 0;
}
