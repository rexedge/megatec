import { EnquiryForm } from "@/components/sections/enquiry-form";
import { Container } from "@/components/ui/container";

/**
 * The closing block the Core Site Pages document ends About and Projects with: a
 * headline beside the short form (name, phone, what they need) and a green
 * "Talk to Our Team on WhatsApp" button, with the SW-03 line under it.
 */
export function ClosingCta({
  title,
  buttonLabel = "Talk to Our Team on WhatsApp",
}: {
  title: string;
  buttonLabel?: string;
}) {
  return (
    <section id="contact" className="scroll-mt-24 py-6 sm:py-20 lg:py-28">
      <Container>
        <div className="bg-accent grid grid-cols-1 gap-8 rounded-3xl p-6 sm:gap-12 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
          <h2 className="text-text text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <EnquiryForm variant="short" buttonLabel={buttonLabel} />
        </div>
      </Container>
    </section>
  );
}
