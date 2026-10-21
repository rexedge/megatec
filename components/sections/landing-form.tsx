"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  REASSURANCE_LINE,
  TrapField,
  trapValue,
  whatsappHref,
} from "@/components/ui/enquiry-modal";
import { Container } from "@/components/ui/container";
import { emailEnquiry } from "@/lib/enquiry";

export type LandingField = {
  /** "name", "phone" and "company" go to their own columns in the email; "need" to the needs line. */
  key: string;
  label: string;
  kind?: "text" | "select" | "number";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

/**
 * The green conversion band at the foot of each landing page (03 doc, Section 8,
 * 6 or 7). Every page asks for different details, so the fields and the WhatsApp
 * opening line come from the page.
 *
 * `template` is the doc's pre-fill message with `{key}` placeholders. A part in
 * square brackets is dropped when a field inside it was left empty, so optional
 * fields never leave a gap: "...my name is {name}[ from {company}]. ..."
 */
export function LandingForm({
  heading,
  fields,
  template,
  buttonLabel,
  needKey,
}: {
  heading: string;
  fields: LandingField[];
  template: string;
  buttonLabel: string;
  /** The field the email lists under "What they need". */
  needKey?: string;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Record<string, string> = {};
    for (const field of fields) values[field.key] = String(data.get(field.key) ?? "").trim();

    const message = template
      .replace(/\[([^\]]*)\]/g, (_, part: string) => {
        const keys = [...part.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
        return keys.every((key) => values[key]) ? part : "";
      })
      .replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

    window.open(whatsappHref([message]), "_blank", "noopener,noreferrer");

    const extra = fields
      .filter((f) => !["name", "phone", "company"].includes(f.key) && f.key !== needKey)
      .filter((f) => values[f.key])
      .map((f) => `${f.label}: ${values[f.key]}`)
      .join("\n");
    emailEnquiry({
      form: "contact",
      name: values.name,
      phone: values.phone,
      company: values.company || undefined,
      needs: needKey && values[needKey] ? [values[needKey]] : undefined,
      message: extra || undefined,
      trap: trapValue(form),
    });
  }

  return (
    <section id="contact" className="bg-leaf-dark scroll-mt-36 py-10 sm:py-20 lg:py-28">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 sm:mt-12">
          <TrapField />
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-2 text-base font-medium text-white">
              {field.label}
              {field.kind === "select" ? (
                <select
                  required={field.required}
                  name={field.key}
                  className="form-input"
                  defaultValue=""
                >
                  <option value="" disabled={field.required}>
                    Select one
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  required={field.required}
                  name={field.key}
                  type={field.key === "phone" ? "tel" : field.kind === "number" ? "number" : "text"}
                  inputMode={field.key === "phone" ? "tel" : field.kind === "number" ? "numeric" : undefined}
                  autoComplete={
                    field.key === "name" ? "name" : field.key === "phone" ? "tel" : "off"
                  }
                  min={field.kind === "number" ? 1 : undefined}
                  maxLength={field.key === "need" ? 200 : 100}
                  className="form-input"
                  placeholder={field.placeholder}
                />
              )}
            </label>
          ))}

          <Button
            type="submit"
            variant="dark"
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

          <p className="text-center text-sm text-white/90">{REASSURANCE_LINE}</p>
        </form>
      </Container>
    </section>
  );
}
