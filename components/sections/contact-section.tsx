"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { PRODUCTS } from "@/lib/nav";

const MESSAGE_LIMIT = 280;

export function ContactSection() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Get in touch with us
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            HEAD OFFICE: 9E LSDPC, Apapa-Oshodi Expressway, (by Jakande bus stop) Mile 2, Lagos,
            Nigeria.
          </p>
          <div className="mt-6 flex flex-col gap-1 text-lg font-medium text-ink">
            <a href="mailto:info@megatecpumps.com" className="hover:underline">
              info@megatecpumps.com
            </a>
            <a href="tel:+2348062968640" className="hover:underline">
              (+234) 8062 9686 40
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl lg:min-h-full">
            <iframe
              title="Megatec head office location map"
              src="https://www.google.com/maps?q=9E+LSDPC+Apapa-Oshodi+Expressway+Mile+2+Lagos+Nigeria&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              // TODO(backend): this form is not wired to anything — the entered
              // details are discarded, yet the confirmation below tells the user
              // the team will reach out. Point it at the CRM / form service (or
              // route it through WhatsApp like the Get a Quote modal) before launch.
              setSubmitted(true);
            }}
            className="flex flex-col gap-6 rounded-2xl border border-ink/80 p-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name">
                <input required className="form-input" name="firstName" />
              </Field>
              <Field label="Last Name">
                <input required className="form-input" name="lastName" />
              </Field>
            </div>

            <Field label="Company name">
              <input
                className="form-input"
                name="company"
                placeholder="Enter your company name"
              />
            </Field>

            <Field label="Select a product">
              <select className="form-input" name="product" defaultValue="">
                <option value="" disabled>
                  Select one...
                </option>
                {PRODUCTS.map((product) => (
                  <option key={product.href} value={product.title}>
                    {product.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </Field>

            <Field label="Phone number">
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="+234 808 8789 7665"
              />
            </Field>

            <Field label="Your email address">
              <input
                required
                className="form-input"
                type="email"
                name="email"
                placeholder="company@email.com"
              />
            </Field>

            <Field label="About">
              <textarea
                className="form-input h-[140px] resize-none"
                name="message"
                maxLength={MESSAGE_LIMIT}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your message..."
              />
              <p className="text-sm text-body">
                {MESSAGE_LIMIT - message.length} characters left
              </p>
            </Field>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-accent px-8 py-4 font-accent text-base font-medium text-text transition-colors hover:bg-accent-soft"
            >
              <Image
                src="/images/landing/icon-whatsapp.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              Send us a message
            </button>

            {submitted && (
              <p className="text-sm text-body">
                Thanks — your message has been noted. Our team will reach out shortly.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-ink">
      {label}
      {children}
    </label>
  );
}
