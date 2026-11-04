import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAuth } from "@/lib/auth/config";
import { db } from "@/lib/db";

/**
 * The admin's sign-in, for pages, server actions and the /api/auth route. Without a
 * database (DATABASE_URL unset) there is no admin: `auth` is null and admin pages say so.
 */
export const auth = db ? createAuth(db) : null;

/** The signed-in member of staff for this request, or null. */
export async function getStaffSession() {
  if (!auth) return null;
  return auth.api.getSession({ headers: await headers() });
}

/**
 * For every admin page and server action: the session, or off to the sign-in page.
 * Each one checks for itself; nothing relies on a parent layout having checked.
 */
export async function requireStaff() {
  const session = await getStaffSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** As requireStaff, for what only an admin may do (managing staff); others go to the admin home. */
export async function requireAdmin() {
  const session = await requireStaff();
  if (session.user.role !== "admin") redirect("/admin");
  return session;
}
