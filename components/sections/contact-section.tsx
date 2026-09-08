"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { whatsappHref } from "@/components/ui/enquiry-modal";
import { PRODUCTS } from "@/lib/nav";

const MESSAGE_LIMIT = 280;

const HEAD_OFFICE =
  "HEAD OFFICE: 9E LSDPC, Apapa-Oshodi Expressway, (by Jakande bus stop) Mile 2, Lagos, Nigeria.";

const DIAL_CODES = [
  { country: "Nigeria", code: "+234" },
  { country: "Ghana", code: "+233" },
  { country: "Benin", code: "+229" },
  { country: "Cameroon", code: "+237" },
  { country: "Côte d'Ivoire", code: "+225" },
  { country: "Kenya", code: "+254" },
  { country: "South Africa", code: "+27" },
  { country: "United Kingdom", code: "+44" },
  { country: "United States", code: "+1" },
  { country: "United Arab Emirates", code: "+971" },
  { country: "China", code: "+86" },
  { country: "India", code: "+91" },
];

export function ContactSection() {
  const [dialCode, setDialCode] = useState("+234");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      "Hi Megatec, I'd like to discuss a project.",
      "",
      `Name: ${get("fullName")}`,
      `Phone: ${dialCode} ${get("phone")}`,
    ];

    const company = get("company");
    if (company) lines.push(`Company: ${company}`);

    const product = get("product");
    if (product) lines.push(`Product: ${product}`);

    const email = get("email");
    if (email) lines.push(`Email: ${email}`);

    const body = get("message");
    if (body) lines.push("", body);

    window.open(whatsappHref(lines), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <span className="bg-sky flex h-12 w-12 items-center justify-center rounded-full text-white">
          <PencilIcon />
        </span>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
              Get in touch with us
            </h2>
            <p className="text-body mt-6 text-lg leading-relaxed">{HEAD_OFFICE}</p>
          </div>
          <div className="text-ink flex flex-col gap-1 text-lg font-medium lg:items-end">
            <a href="mailto:info@megatecpumps.com" className="hover:underline">
              info@megatecpumps.com
            </a>
            <a href="tel:+2348062968640" className="hover:underline">
              (+234) 8062 9686 40
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative min-h-105 overflow-hidden rounded-2xl lg:min-h-full">
            <iframe
              title="Megatec head office location map"
              src="https://www.google.com/maps?q=9E+LSDPC+Apapa-Oshodi+Expressway+Mile+2+Lagos+Nigeria&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Field label="Full name">
              <input
                required
                name="fullName"
                className="form-input"
                placeholder="Enter your full name"
              />
            </Field>

            <Field label="Company name">
              <input
                name="company"
                className="form-input"
                placeholder="Enter your company name"
              />
            </Field>

            <Field label="Select a product">
              <select name="product" className="form-input" defaultValue="">
                <option value="">Select one</option>
                {PRODUCTS.map((product) => (
                  <option key={product.href} value={product.title}>
                    {product.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </Field>

            <Field label="Phone number">
              <div className="flex gap-3">
                <select
                  aria-label="Country dialling code"
                  value={dialCode}
                  onChange={(event) => setDialCode(event.target.value)}
                  className="form-input w-40 shrink-0"
                >
                  {DIAL_CODES.map((entry) => (
                    <option key={entry.code} value={entry.code}>
                      {entry.country} {entry.code}
                    </option>
                  ))}
                </select>
                <input
                  required
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="000 - 0000 - 0000"
                />
              </div>
            </Field>

            <Field label="Email">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@company.com"
              />
            </Field>

            <Field label="Message body">
              <textarea
                name="message"
                className="form-input h-35 resize-none"
                maxLength={MESSAGE_LIMIT}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your message..."
              />
              <p className="text-body text-sm">
                {MESSAGE_LIMIT - message.length} characters left
              </p>
            </Field>

            <button
              type="submit"
              className="bg-sky hover:bg-sky-dark font-accent inline-flex items-center justify-center gap-3 rounded-lg px-8 py-4 text-base font-medium text-white transition-colors"
            >
              <Image
                src="/images/landing/icon-whatsapp-alt.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              Discuss your project on WhatsApp
            </button>
          </form>
        </div>
      </Container>
    </section>
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

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" />
      <path d="M14.5 5.5l4 4" />
    </svg>
  );
}
