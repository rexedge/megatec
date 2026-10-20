import { EnquiryForm } from "@/components/sections/enquiry-form";
import { Container } from "@/components/ui/container";
import {
  BRANCHES,
  EMAIL,
  HEAD_OFFICE as OFFICE_ADDRESS,
  MAP_EMBED_SRC,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
} from "@/lib/contact";

const HEAD_OFFICE = `HEAD OFFICE: ${OFFICE_ADDRESS}`;

export function ContactSection({
  showBranches = false,
  email = EMAIL,
  buttonLabel,
}: {
  /** List the branch offices too — only where this section stands in for a contact page. */
  showBranches?: boolean;
  /** The address to publish here; the after-sales pages pass the support one. */
  email?: string;
  /** The form button's wording, where a page's document sets its own. */
  buttonLabel?: string;
}) {
  return (
    <section id="contact" className="scroll-mt-24 py-6 sm:py-20 lg:py-28">
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
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
            <a href={`tel:${PHONE_PRIMARY.tel}`} className="hover:underline">
              {PHONE_PRIMARY.display}
            </a>
            <a href={`tel:${PHONE_SECONDARY.tel}`} className="hover:underline">
              {PHONE_SECONDARY.display}
            </a>
          </div>
        </div>

        {showBranches && (
          <div className="border-border/70 mt-8 border-t pt-6 sm:mt-12 sm:pt-10">
            <h3 className="text-ink text-xl font-medium tracking-tight">Branches</h3>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {BRANCHES.map((branch) => (
                <li key={branch.city}>
                  <p className="text-ink font-medium">{branch.city}</p>
                  <address className="text-body mt-1 leading-relaxed not-italic">
                    {branch.address}
                  </address>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 sm:mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative min-h-105 overflow-hidden rounded-2xl lg:min-h-full">
            <iframe
              title="MEGA-TEC head office location map"
              src={MAP_EMBED_SRC}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <EnquiryForm buttonLabel={buttonLabel} />
        </div>
      </Container>
    </section>
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
