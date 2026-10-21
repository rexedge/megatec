import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import {
  BRANCHES,
  EMAIL,
  HEAD_OFFICE,
  MAP_EMBED_SRC,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  WHATSAPP_NUMBER,
} from "@/lib/contact";
import { SOCIAL_LINKS } from "@/lib/nav";

/**
 * Copy is verbatim from the Core Site Pages document, Page 4 "Contact" (punch list
 * NP-02): the menu's CONTACT and the footer's "Contact Us" now come here instead of
 * jumping to the Home form.
 */
export const metadata: Metadata = {
  title: "Contact MEGA-TEC | Fuel, LPG, CNG & EV Equipment Nigeria",
  description:
    "Talk to MEGA-TEC's technical team about fuel dispensers, LPG, CNG and EV charging. Head office in Lagos, branches nationwide. Call or message on WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <h1 className="text-ink max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Talk to our technical team
          </h1>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            Whether you&apos;re setting up a new station, upgrading equipment, or just weighing
            your options, we&apos;re here to give you straightforward advice. No commitment
            required.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:pt-0 sm:pb-16">
        <Container>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <Tile icon={<PhoneIcon />} title="Call us">
              <a href={`tel:${PHONE_PRIMARY.tel}`} className="block hover:underline">
                {PHONE_PRIMARY.display}
              </a>
              <a href={`tel:${PHONE_SECONDARY.tel}`} className="block hover:underline">
                {PHONE_SECONDARY.display}
              </a>
            </Tile>
            <Tile icon={<ChatIcon />} title="WhatsApp">
              <p>{PHONE_PRIMARY.display}</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi MEGA-TEC, I'd like to talk to your team.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-leaf hover:bg-leaf-dark font-accent mt-4 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-base font-medium text-white transition-colors"
              >
                <Image
                  src="/images/landing/icon-whatsapp-alt.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                Message us on WhatsApp
              </a>
            </Tile>
            <Tile icon={<MailIcon />} title="Email">
              <a href={`mailto:${EMAIL}`} className="break-all hover:underline">
                {EMAIL}
              </a>
            </Tile>
            <Tile icon={<PinIcon />} title="Head office">
              <address className="not-italic">{HEAD_OFFICE}</address>
            </Tile>
          </ul>
        </Container>
      </section>

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Send us a message
            </h2>
            <EnquiryForm />
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-16 lg:py-20">
        <Container>
          <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Find us nationwide
          </h2>
          <p className="text-ink mt-6 text-lg font-medium">Head office: Lagos</p>

          <h3 className="text-ink mt-8 text-xl font-medium tracking-tight">Branches (6)</h3>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((branch) => (
              <li key={branch.city} className="rounded-2xl bg-white p-6">
                <p className="text-ink font-medium">{branch.city}</p>
                <address className="text-body mt-2 leading-relaxed not-italic">
                  {branch.address}
                </address>
              </li>
            ))}
          </ul>
          <p className="text-body mt-8 text-lg">
            Backed by 80+ engineers across 31 states and the FCT.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-16/9">
            <iframe
              title="MEGA-TEC head office location map"
              src={MAP_EMBED_SRC}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <ul className="mt-8 flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-ink hover:border-ink inline-flex items-center gap-3 rounded-full border px-5 py-3 font-medium transition-colors"
                >
                  <Image src={social.icon} alt="" width={24} height={24} className="h-6 w-6 invert" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function Tile({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="bg-surface-soft flex flex-col gap-4 rounded-2xl p-6">
      <span className="bg-accent text-ink flex h-12 w-12 items-center justify-center rounded-full">
        {icon}
      </span>
      <h2 className="text-ink text-xl font-medium tracking-tight">{title}</h2>
      <div className="text-body leading-relaxed">{children}</div>
    </li>
  );
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <Svg>
      <path d="M6.6 3.5h3l1.4 4-2 1.4a12 12 0 0 0 5.1 5.1l1.4-2 4 1.4v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.6 5.5a2 2 0 0 1 2-2z" />
    </Svg>
  );
}
function ChatIcon() {
  return (
    <Svg>
      <path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4z" />
    </Svg>
  );
}
function MailIcon() {
  return (
    <Svg>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </Svg>
  );
}
function PinIcon() {
  return (
    <Svg>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 0 0-13 0c0 5 6.5 11 6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </Svg>
  );
}
