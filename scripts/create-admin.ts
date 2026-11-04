/**
 * Creates the first admin account (after that, admins add staff in the admin itself) and
 * emails its owner a link to choose a password.
 *
 *   pnpm admin:create "Full Name" name@example.com
 *
 * Reads DATABASE_URL, BETTER_AUTH_SECRET and SMTP_* from .env.local or the environment.
 * For the live site, run it with the production DATABASE_URL and
 * BETTER_AUTH_URL=https://www.megatecpumps.com, so the emailed link opens the live admin.
 */
import { createAuth } from "@/lib/auth/config";
import { db } from "@/lib/db";

async function main() {
  const [name, email] = process.argv.slice(2);
  if (!name || !email) throw new Error('Usage: pnpm admin:create "Full Name" name@example.com');
  if (!db) throw new Error("DATABASE_URL is not set (see .env.local)");

  const auth = createAuth(db);
  const { user } = await auth.api.createUser({ body: { name, email, role: "admin" } });
  await auth.api.requestPasswordReset({
    body: { email: user.email, redirectTo: "/admin/reset-password" },
  });
  console.log(
    `Created admin ${user.name} <${user.email}>. A link to choose a password has been emailed; it works for 24 hours.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db?.$disconnect());
