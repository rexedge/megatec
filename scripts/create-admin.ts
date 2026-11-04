/**
 * Creates the first admin account (after that, admins add staff in the admin itself) and
 * emails its owner a link to choose a password.
 *
 *   pnpm admin:create "Full Name" name@example.com              create, and email the link
 *   pnpm admin:create "Full Name" name@example.com --no-email   create only
 *
 * Running it again for an account that exists just sends a fresh link, so an account made
 * with --no-email before the admin went live gets its link later with the first command.
 *
 * Reads DATABASE_URL, BETTER_AUTH_SECRET and SMTP_* from .env.local or the environment.
 * For the live site, run it with the production DATABASE_URL and
 * BETTER_AUTH_URL=https://www.megatecpumps.com, so the emailed link opens the live admin.
 */
import { createAuth } from "@/lib/auth/config";
import { db } from "@/lib/db";

async function main() {
  const args = process.argv.slice(2);
  const sendLink = !args.includes("--no-email");
  const [name, email] = args.filter((arg) => !arg.startsWith("--"));
  if (!name || !email) throw new Error('Usage: pnpm admin:create "Full Name" name@example.com [--no-email]');
  if (!db) throw new Error("DATABASE_URL is not set (see .env.local)");

  const auth = createAuth(db);
  const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } });
  const user = existing ?? (await auth.api.createUser({ body: { name, email, role: "admin" } })).user;
  console.log(
    existing
      ? `${user.name} <${user.email}> already has an account (role: ${existing.role ?? "user"}).`
      : `Created admin ${user.name} <${user.email}>.`
  );

  if (!sendLink) {
    console.log("No email sent. Run this again without --no-email to send the link to choose a password.");
    return;
  }
  await auth.api.requestPasswordReset({
    body: { email: user.email, redirectTo: "/admin/reset-password" },
  });
  console.log("A link to choose a password has been emailed; it works for 24 hours.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db?.$disconnect());
