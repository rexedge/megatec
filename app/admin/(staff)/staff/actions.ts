"use server";

import { isAPIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth, requireAdmin } from "@/lib/auth";

/**
 * Managing staff accounts. Every action checks that an admin is signed in, and passes the
 * request on to Better Auth, which checks the role again before it changes anything.
 */

export type StaffFormState = { ok?: string; error?: string } | null;

const RESET_PAGE = "/admin/reset-password";

function explain(error: unknown) {
  if (isAPIError(error)) {
    const code = (error.body as { code?: string } | undefined)?.code;
    if (code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") return "Someone already has an account with that email.";
    if (code === "INVALID_EMAIL") return "That email address isn't valid.";
    if (code === "YOU_CANNOT_REMOVE_YOURSELF") return "You can't remove your own account.";
  }
  console.error("[admin/staff]", error);
  return "That didn't work. Try again, and if it keeps failing, tell the developer.";
}

/** Adds a member of staff and emails them a link to choose their password. */
export async function addStaff(_: StaffFormState, form: FormData): Promise<StaffFormState> {
  await requireAdmin();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const role = form.get("role") === "admin" ? "admin" : "user";
  if (!name || !email) return { error: "Give a name and an email address." };

  try {
    const requestHeaders = await headers();
    await auth!.api.createUser({ body: { name, email, role }, headers: requestHeaders });
    await auth!.api.requestPasswordReset({
      body: { email, redirectTo: RESET_PAGE },
      headers: requestHeaders,
    });
  } catch (error) {
    return { error: explain(error) };
  }
  revalidatePath("/admin/staff");
  return { ok: `${name} has been added. A link to choose a password is on its way to ${email}.` };
}

/** Emails a member of staff a fresh link to choose a password (for a lost invite or password). */
export async function sendPasswordLink(email: string): Promise<StaffFormState> {
  await requireAdmin();
  try {
    await auth!.api.requestPasswordReset({
      body: { email, redirectTo: RESET_PAGE },
      headers: await headers(),
    });
  } catch (error) {
    return { error: explain(error) };
  }
  return { ok: `A new link is on its way to ${email}.` };
}

/** Makes someone an admin, or takes it away. Nobody can change their own role. */
export async function setStaffRole(userId: string, role: "admin" | "user"): Promise<StaffFormState> {
  const { user } = await requireAdmin();
  if (userId === user.id) return { error: "You can't change your own role." };
  try {
    await auth!.api.setRole({ body: { userId, role }, headers: await headers() });
  } catch (error) {
    return { error: explain(error) };
  }
  revalidatePath("/admin/staff");
  return { ok: role === "admin" ? "They can now manage staff." : "They can no longer manage staff." };
}

/** Removes a member of staff's account and signs them out everywhere. */
export async function removeStaff(userId: string): Promise<StaffFormState> {
  const { user } = await requireAdmin();
  if (userId === user.id) return { error: "You can't remove your own account." };
  try {
    await auth!.api.removeUser({ body: { userId }, headers: await headers() });
  } catch (error) {
    return { error: explain(error) };
  }
  revalidatePath("/admin/staff");
  return { ok: "Removed." };
}
