import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PRODUCTS, SOCIAL_LINKS } from "@/lib/nav";
import { EMAIL, RC_NUMBER } from "@/lib/contact";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/#contact" },
];

// Privacy Policy, Terms of Service and Cookies Settings stay out of the footer
// until those pages exist (punch list SW-11).

export function SiteFooter() {
  return (
    <footer className="bg-navy py-10 sm:py-16 lg:py-20">
      <Container className="flex flex-col gap-10 sm:gap-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4 xl:grid-cols-5">
          {/* A five-column cell is too narrow for an email address until xl (it
              overflows at 1024px), so below that the wordmark and address take a
              row of their own. */}
          <div className="col-span-2 flex flex-col gap-3 md:col-span-4 xl:col-span-1">
            <p className="text-xl font-bold tracking-tight text-navy-text">MEGA-TEC</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-navy-text/90 hover:text-navy-text hover:underline"
            >
              {EMAIL}
            </a>
          </div>

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
              label="Installation & Commissioning"
            />
            <FooterLink href="/services/maintenance-and-repair" label="Maintenance & Repair" />
            <FooterLink
              href="/services/technical-support"
              label="Technical Support & Troubleshooting"
            />
            <FooterLink href="/services/training" label="Training & Capacity Building" />
          </FooterColumn>

          <FooterColumn title="Follow Us">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2 text-navy-text/90 hover:text-navy-text"
              >
                <Image src={social.icon} alt="" width={24} height={24} className="h-6 w-6" />
                {social.label}
              </a>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/15 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 text-sm text-navy-text/80 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} MEGA-TEC. All rights reserved.</p>
            <p>{RC_NUMBER}</p>
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
