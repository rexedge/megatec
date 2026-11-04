import { defineConfig } from "prisma/config";

// The Prisma CLI runs outside Next.js, so read .env.local the way Next.js would.
try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local: DATABASE_URL must come from the environment.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // `prisma generate` needs no database, so a build without DATABASE_URL (Vercel until
  // go-live) still generates the client; `prisma migrate` needs the real address.
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
