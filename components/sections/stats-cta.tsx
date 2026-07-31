import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

const STATS = [
  { value: "15+", label: "YEARS" },
  { value: "Africa", label: "REACH" },
  { value: "500+", label: "PROJECTS" },
  { value: "ISO", label: "CERTIFIED" },
];

export function StatsCta({
  title = "Ready to enhance your infrastructure",
  description = "Let's discuss how Megatec's engineering solutions can drive efficiency and safety into your fuel distribution network.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 rounded-3xl bg-accent p-10 lg:grid-cols-2 lg:gap-8 lg:p-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-text lg:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-body">{description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <WhatsappButton variant="dark" />
              <Button href="/#contact" variant="secondary">
                Get an instant quote
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <p className="text-sm font-medium tracking-tight text-text">{stat.label}</p>
                <p className="text-5xl font-semibold tracking-tight text-text lg:text-6xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
