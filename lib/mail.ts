import { createTransport, type Transporter } from "nodemailer";

/**
 * The site's outgoing mail: it signs in to the website@ mailbox on MEGA-TEC's QServers
 * mail server. Used for form enquiries (to sales@) and the admin's password-reset emails.
 *
 * Environment — .env.local on a laptop, Vercel project settings when deployed:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   the website@ mailbox, port 465
 *
 * Returns null when any of them is missing. No `server-only` guard, so scripts can send
 * mail too (scripts/create-admin.ts); the secrets never reach the browser either way,
 * since none of them is a NEXT_PUBLIC_ variable.
 */
let transporter: Transporter | undefined;

export function mailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT);
  transporter ??= createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // A stalled mail server must not hold the function open for minutes.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return { transporter, from: SMTP_USER };
}
