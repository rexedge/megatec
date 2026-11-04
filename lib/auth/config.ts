import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { after } from "next/server";
import type { Database } from "@/lib/db";
import { mailer } from "@/lib/mail";
import { SITE_URL } from "@/lib/site";

/**
 * Staff sign-in for the admin (Better Auth). Each person has their own email and
 * password; there is no public sign-up. An admin adds staff, and each new member of staff
 * gets an email with a link to choose their own password. Role "admin" can also manage
 * staff; role "user" edits content. Users, sessions and sign-in rate limits live in the
 * content database (prisma/schema.prisma).
 *
 * Environment:
 *   BETTER_AUTH_SECRET  signs and encrypts session cookies; required in production
 *                       (`openssl rand -base64 32`)
 *   BETTER_AUTH_URL     only for scripts, which have no request to take the address from:
 *                       the site address used in their emails (default SITE_URL)
 *
 * This module has no `server-only` guard so scripts/create-admin.ts can use it; the app
 * reaches it through lib/auth, which has one.
 */

/** Links in emails expire after a day: long enough for a new member of staff to see theirs. */
const LINK_LIFETIME_SECONDS = 24 * 60 * 60;

export function createAuth(database: Database) {
  return betterAuth({
    database: prismaAdapter(database, { provider: "postgresql" }),
    // Links and origin checks use the address the request came in on, when it is one of
    // the site's own: the live domain, this project's Vercel previews, or a laptop.
    baseURL: {
      allowedHosts: [
        "www.megatecpumps.com",
        "megatecpumps.com",
        "megatec-*-rexedges-projects.vercel.app",
        "localhost:*",
      ],
      fallback: process.env.BETTER_AUTH_URL ?? SITE_URL,
    },
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 10,
      resetPasswordTokenExpiresIn: LINK_LIFETIME_SECONDS,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        // A first link (the account has never been signed in to) is an invitation.
        const invited = (await database.session.count({ where: { userId: user.id } })) === 0;
        const send = () => sendLink(user, url, invited);
        // Sent after the response, so a request for an unknown address takes as long as
        // one for a real account. Scripts have no response to wait for, so they send now.
        try {
          after(send);
        } catch {
          await send();
        }
      },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/request-password-reset": { window: 60, max: 3 },
      },
    },
    // nextCookies must come last: it lets server actions set the session cookie.
    plugins: [admin(), nextCookies()],
  });
}

export type Auth = ReturnType<typeof createAuth>;

async function sendLink(user: { name: string; email: string }, url: string, invited: boolean) {
  const mail = mailer();
  if (!mail) {
    console.error("[auth] SMTP_* is not set: the password link for", user.email, "was not sent");
    return;
  }
  const lines = invited
    ? [
        `Hi ${user.name},`,
        "",
        "You have been given an account for the MEGA-TEC website admin, where you can update",
        "products, spare parts, projects and testimonials. To choose your password and sign",
        "in, open this link within the next 24 hours:",
      ]
    : [
        `Hi ${user.name},`,
        "",
        "Someone asked to reset the password for your MEGA-TEC website admin account. To",
        "choose a new one, open this link within the next 24 hours:",
      ];
  try {
    await mail.transporter.sendMail({
      from: { name: "MEGA-TEC Website", address: mail.from },
      to: user.email,
      subject: invited ? "Your MEGA-TEC website admin account" : "Reset your MEGA-TEC admin password",
      text: [
        ...lines,
        "",
        url,
        "",
        invited
          ? "If you weren't expecting this, you can ignore it."
          : "If that wasn't you, ignore this email: your password stays as it is.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[auth] sending the password link failed", error);
  }
}
