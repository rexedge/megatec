import { createTransport, type Transporter } from "nodemailer";
import { EMAIL } from "@/lib/contact";
import type { EnquiryForm } from "@/lib/enquiry";

/**
 * Emails website form submissions to sales@ (punch list SW-05) by signing in
 * to the website@ mailbox on Mega-Tec's QServers mail server.
 *
 * Environment — .env.local on a laptop, Vercel project settings when deployed:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   the website@ mailbox, port 465
 *   ENQUIRY_TO   optional: send somewhere other than sales@, so test
 *                submissions (e.g. on preview deploys) stay out of Mega-Tec's inbox
 */

const FORM_NAMES: Record<EnquiryForm, string> = {
  contact: "Contact form",
  quote: '"Talk to our team" popup',
  "spec-sheet": "Spec sheet download",
};

type Clean = {
  form: EnquiryForm;
  name: string;
  phone: string;
  company: string;
  email: string;
  product: string;
  needs: string[];
  message: string;
  sheet: string;
  page: string;
  trap: string;
};

/** Checks every field's type and length; anything unexpected rejects the whole request. */
function clean(raw: unknown): Clean | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  // One line of text, whitespace collapsed. "" if absent, null if not a string or too long.
  const line = (key: string, max: number) => {
    const value = r[key];
    if (value === undefined || value === null) return "";
    if (typeof value !== "string") return null;
    const text = value.replace(/\s+/g, " ").trim();
    return text.length <= max ? text : null;
  };

  const form = r.form;
  if (form !== "contact" && form !== "quote" && form !== "spec-sheet") return null;

  const lines = {
    name: line("name", 100),
    phone: line("phone", 40),
    company: line("company", 150),
    email: line("email", 200),
    product: line("product", 100),
    sheet: line("sheet", 300),
    page: line("page", 300),
    trap: line("trap", 200),
  };
  if (Object.values(lines).some((value) => value === null)) return null;
  const fields = lines as Record<keyof typeof lines, string>;
  if (!fields.name || !fields.phone) return null;

  let message = "";
  if (r.message !== undefined && r.message !== null) {
    if (typeof r.message !== "string") return null;
    message = r.message.replace(/\r\n?/g, "\n").trim();
    if (message.length > 2000) return null;
  }

  let needs: string[] = [];
  if (r.needs !== undefined && r.needs !== null) {
    if (!Array.isArray(r.needs) || r.needs.length > 10) return null;
    if (r.needs.some((n) => typeof n !== "string" || n.length > 60)) return null;
    needs = (r.needs as string[]).map((n) => n.trim()).filter(Boolean);
  }

  return { form, ...fields, needs, message };
}

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function lagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function compose(e: Clean, site: string) {
  const isDownload = e.form === "spec-sheet";
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Phone", e.phone],
    ["Company", e.company],
    ["Email", e.email],
    ["Product", e.product],
    ["What they need", e.needs.join(", ")],
    ["Spec sheet", e.sheet && new URL(e.sheet, site).toString()],
  ];

  const lines = [
    isDownload
      ? "Someone downloaded a spec sheet from the MEGA-TEC website."
      : "New enquiry from the MEGA-TEC website.",
    "",
    ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
  ];
  if (e.message) lines.push("", "Message:", e.message);
  lines.push(
    "",
    `Form: ${FORM_NAMES[e.form]}`,
    `Page: ${new URL(e.page || "/", site).toString()}`,
    `Sent: ${lagosTime()} (Lagos time)`,
    "",
    isDownload
      ? "They were given the PDF straight away."
      : "They were also taken to WhatsApp with these details, so they may already be chatting with the team."
  );

  return {
    subject: `${isDownload ? "Spec sheet download" : "Website enquiry"}: ${e.name}`,
    text: lines.join("\n"),
  };
}

let transporter: Transporter | undefined;

function mailer() {
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

export async function POST(request: Request) {
  // Only this site's own pages may post here.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ ok: false }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const enquiry = clean(body);
  if (!enquiry) return Response.json({ ok: false }, { status: 400 });

  // A bot filled the hidden field: answer as if it worked, send nothing.
  if (enquiry.trap) return Response.json({ ok: true });

  const mail = mailer();
  if (!mail) {
    console.error("[enquiry] SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS must all be set");
    return Response.json({ ok: false }, { status: 500 });
  }

  const { subject, text } = compose(enquiry, new URL(request.url).origin);
  try {
    await mail.transporter.sendMail({
      from: { name: "MEGA-TEC Website", address: mail.from },
      to: process.env.ENQUIRY_TO || EMAIL,
      replyTo: EMAIL_SHAPE.test(enquiry.email) ? enquiry.email : undefined,
      subject,
      text,
    });
  } catch (error) {
    console.error("[enquiry] sending failed", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
