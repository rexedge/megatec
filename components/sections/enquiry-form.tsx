"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  REASSURANCE_LINE,
  TrapField,
  trapValue,
  whatsappHref,
} from "@/components/ui/enquiry-modal";
import { emailEnquiry } from "@/lib/enquiry";

/** The "What do you need?" dropdown, word for word (punch list HM-10). */
const NEEDS = [
  "Fuel dispenser supply",
  "Fuel dispenser installation",
  "LPG equipment",
  "CNG equipment",
  "EV charger",
  "Station accessories",
  "Maintenance and repair",
  "Not sure yet",
];

/**
 * R2-01 asks for 1,000 if WhatsApp carries a full-length message through its link,
 * otherwise 500. Set to 1,000 for testing on the preview: send a 1,000-character
 * message from a phone, and drop this back to 500 if WhatsApp cuts it off.
 */
const MESSAGE_LIMIT = 1000;

/** What /api/enquiry accepts for the need; the short form's free text must fit. */
const NEED_LIMIT = 200;

/**
 * The standard enquiry form (punch list HM-10; the Installation page, SV-05,
 * uses it too): name, phone and what they need, then an optional email and
 * message. The button opens WhatsApp with the Core Site Pages document's opening
 * line, adds the email and message only if the visitor wrote them, and emails a
 * copy to sales@ through /api/enquiry.
 *
 * The "short" variant is the closing form the documents put at the foot of About
 * and Projects (AB-08): name, phone and what they need, the last typed in the
 * visitor's own words instead of picked from the list.
 */
export function EnquiryForm({
  buttonLabel = "Send on WhatsApp",
  variant = "full",
}: {
  buttonLabel?: string;
  variant?: "full" | "short";
}) {
  const [message, setMessage] = useState("");
  const short = variant === "short";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const phone = get("phone");
    const need = get("need");
    const email = get("email");
    const body = get("message");

    const lines = [
      `Hi MEGA-TEC, my name is ${name}. I'm interested in ${need}. Please call me on ${phone}.`,
    ];
    if (email) lines.push("", `My email: ${email}`);
    if (body) lines.push("", body);

    window.open(whatsappHref(lines), "_blank", "noopener,noreferrer");
    emailEnquiry({
      form: "contact",
      name,
      phone,
      email,
      needs: [need],
      message: body,
      trap: trapValue(form),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <TrapField />

      <Field label="Your Name">
        <input
          required
          name="name"
          autoComplete="name"
          className="form-input"
          placeholder="Enter your name"
        />
      </Field>

      <Field label="Phone Number">
        <input
          required
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          className="form-input"
          placeholder="e.g. 0803 123 4567"
        />
      </Field>

      <Field label="What do you need?">
        {short ? (
          <input
            required
            name="need"
            maxLength={NEED_LIMIT}
            className="form-input"
            placeholder="e.g. two LPG dispensers for a new station"
          />
        ) : (
          <select required name="need" className="form-input" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {NEEDS.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        )}
      </Field>

      {!short && (
        <>
          <Field label="Email (optional)">
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="form-input"
              placeholder="you@company.com"
            />
          </Field>

          <Field label="Your message (optional)">
            <textarea
              name="message"
              className="form-input h-35 resize-none"
              maxLength={MESSAGE_LIMIT}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
            />
            <p className="text-body text-sm">{MESSAGE_LIMIT - message.length} characters left</p>
          </Field>
        </>
      )}

      <Button
        type="submit"
        variant="leaf"
        icon={
          <Image
            src="/images/landing/icon-whatsapp-alt.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6"
          />
        }
      >
        {buttonLabel}
      </Button>

      <p className="text-body text-center text-sm">{REASSURANCE_LINE}</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-ink flex flex-col gap-2 text-base font-medium">
      {label}
      {children}
    </label>
  );
}
