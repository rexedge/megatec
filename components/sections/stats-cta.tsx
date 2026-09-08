import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { EMAIL, HEAD_OFFICE, PHONE_PRIMARY } from "@/lib/contact";

const STATS = [
  { value: "2012", label: "FOUNDED" },
  { value: "1,500+", label: "STATIONS" },
  { value: "3,500+", label: "CLIENTS" },
  { value: "80+", label: "ENGINEERS" },
];


export function StatsCta({
  title = "Ready to enhance your infrastructure",
  description = "Let's discuss how Megatec's engineering solutions can drive efficiency and safety into your fuel distribution network.",
  showContact = true,
}: {
  title?: string;
  description?: string;
  showContact?: boolean;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="bg-accent grid grid-cols-1 gap-12 rounded-3xl p-10 lg:grid-cols-2 lg:gap-8 lg:p-16">
          <div>
            <h2 className="text-text text-3xl font-semibold tracking-tight lg:text-5xl">
              {title}
            </h2>
            <p className="text-body mt-6 max-w-md text-lg leading-relaxed">{description}</p>

            {showContact && (
              <div className="mt-8 flex flex-col gap-4">
                <ContactLine icon={<PinIcon />}>
                  Visit Our Headquarters: {HEAD_OFFICE}
                </ContactLine>
                <ContactLine icon={<PhoneIcon />}>
                  Call For Immediate Assistance:{" "}
                  <a href={`tel:${PHONE_PRIMARY.tel}`} className="hover:underline">
                    {PHONE_PRIMARY.display}
                  </a>
                </ContactLine>
                <ContactLine icon={<MailIcon />}>
                  Email Our Service Desk:{" "}
                  <a href={`mailto:${EMAIL}`} className="hover:underline">
                    {EMAIL}
                  </a>
                </ContactLine>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <WhatsappButton variant="sky" />
              <Button href="/#contact" variant="secondary">
                Send us a message
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 content-center gap-x-8 gap-y-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <p className="text-text text-5xl font-semibold tracking-tight lg:text-6xl">
                  {stat.value}
                </p>
                <p className="text-text text-sm font-medium tracking-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactLine({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <p className="text-text flex gap-3 leading-relaxed">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span>{children}</span>
    </p>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 7L4.5 6.5v.9L12 12l7.5-4.6v-.9z" />
    </svg>
  );
}
