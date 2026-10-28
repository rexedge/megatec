import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { CheckIcon } from "@/components/ui/check-icon";
import { cn } from "@/lib/cn";

export type EquipmentItem = {
  title: string;
  image: string;
  specs: string[];
  bestSeller?: boolean;
};

/**
 * "Equipment we supply" as a single-column spec list, one full-width WhatsApp
 * button per item (03 doc, LP2 Section 4: "NOT a side-by-side card grid").
 */
export function EquipmentList({
  heading,
  intro,
  items,
  buttonLabel = "Enquire About This Equipment on WhatsApp",
  messageFor,
}: {
  heading: string;
  intro: string;
  items: EquipmentItem[];
  buttonLabel?: string;
  messageFor: (title: string) => string;
}) {
  return (
    <section className="py-6 sm:py-20 lg:py-16">
      <Container className="max-w-4xl">
        <h2 className="text-ink text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
          {heading}
        </h2>
        <p className="text-body mt-4 text-lg leading-relaxed">{intro}</p>

        <ol className="mt-8 flex flex-col gap-6 sm:mt-12">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white",
                item.bestSeller ? "border-leaf" : "border-border/70"
              )}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[16rem_1fr]">
                <div className="bg-surface-soft relative aspect-4/3 sm:aspect-auto sm:min-h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 640px) 256px, 100vw"
                    className="object-contain p-4"
                  />
                  {item.bestSeller && (
                    <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-medium text-ink">
                      Best Seller
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-4 p-5 sm:p-6">
                  <h3 className="text-ink text-xl font-medium tracking-tight">
                    <span className="text-body mr-2">{index + 1}.</span>
                    {item.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {item.specs.map((spec) => (
                      <li key={spec} className="text-body flex gap-3 text-base">
                        <CheckIcon />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <WhatsappButton
                    variant="leaf"
                    message={messageFor(item.title)}
                    className="mt-auto w-full"
                  >
                    {buttonLabel}
                  </WhatsappButton>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
