import Image from "next/image";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { SpecSheetLink } from "@/components/ui/spec-sheet-button";

export function ProductCard({
  image,
  title,
  subtitle,
  specs,
  whatsappMessage,
  specSheetHref,
}: {
  tag?: string;
  image: string;
  title: string;
  subtitle?: string;
  specs: string[];
  whatsappMessage: string;
  specSheetHref?: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-ink">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-body">{subtitle}</p>}
        </div>
        <ul className="flex flex-col gap-1.5">
          {specs.map((spec) => (
            <li key={spec} className="flex gap-2 text-sm text-body">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-leaf" />
              {spec}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <WhatsappButton variant="leaf" message={whatsappMessage} className="w-full">
            Enquire about this on WhatsApp
          </WhatsappButton>
          {specSheetHref && (
            <SpecSheetLink
              href={specSheetHref}
              description={`Download the full technical datasheet for the ${title}.`}
            >
              Download spec sheet
            </SpecSheetLink>
          )}
        </div>
      </div>
    </div>
  );
}
