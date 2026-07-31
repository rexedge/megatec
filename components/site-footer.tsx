import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PRODUCTS, SOCIAL_LINKS } from "@/lib/nav";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy py-16 lg:py-20">
      <Container className="flex flex-col gap-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <p className="col-span-2 text-xl font-bold tracking-tight text-navy-text md:col-span-1">
            MEGATEC
          </p>

          <FooterColumn title="Company">
            {COMPANY_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </FooterColumn>

          <FooterColumn title="Products">
            {PRODUCTS.map((product) => (
              <FooterLink key={product.href} href={product.href} label={product.title} />
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            <FooterLink
              href="/services/installation-and-commissioning"
              label="Installation & commissioning"
            />
            <FooterLink href="/services/maintenance-and-repair" label="Maintenance & repair" />
            <FooterLink
              href="/services/technical-support"
              label="Technical support & troubleshooting"
            />
            <FooterLink href="/services/training" label="Training & capacity building" />
          </FooterColumn>

          <FooterColumn title="Follow Us">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="flex items-center gap-3 py-2 text-navy-text/90 hover:text-navy-text"
              >
                <Image src={social.icon} alt="" width={24} height={24} className="h-6 w-6" />
                {social.label}
              </Link>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/15 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 text-sm text-navy-text/80 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Megatec. All rights reserved.</p>
            <div className="flex flex-wrap gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="underline hover:text-navy-text">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold tracking-wide text-navy-text uppercase">{title}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="py-2 text-sm text-navy-text/90 hover:text-navy-text">
      {label}
    </Link>
  );
}
