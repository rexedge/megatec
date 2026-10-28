import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

/**
 * The content database: Docker Postgres on a laptop (`pnpm db:up`), Neon in production.
 * It is optional until the site goes live: without DATABASE_URL, `db` is null and the
 * content layer serves the built-in seed content instead.
 *
 * One client (and so one connection pool) per server process. In development Next.js
 * reloads modules on every edit, so the client is kept on globalThis rather than
 * opening a new pool each time.
 */
const globalForDb = globalThis as unknown as { megatecDb?: PrismaClient };

function connect(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  globalForDb.megatecDb ??= new PrismaClient({
    adapter: new PrismaPg({ connectionString, max: 5 }),
  });
  return globalForDb.megatecDb;
}

export const db = connect();

export type Database = PrismaClient;
