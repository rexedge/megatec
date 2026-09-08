import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

const STEPS = [
  {
    title: "Consultation",
    description: "Technical audit of site requirements and operational volume constraints.",
  },
  {
    title: "Custom Design",
    description: "CAD modeling and hydraulic system architecture tailored to your specifics.",
  },
  {
    title: "Installation",
    description: "Precise mechanical integration by calibration-certified field engineers.",
  },
  {
    title: "Ongoing support",
    description: "24/7 technical monitoring and scheduled preventive maintenance.",
  },
];

export function WorkflowSection() {
  return (
    <section className="bg-surface-soft/60 py-20 lg:py-28">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
          Purchasing your needs are easy and fast
        </h2>
        <p className="mt-4 text-lg font-medium tracking-tight text-ink">
          OUR ENGINEERING WORKFLOW
        </p>

        <div className="mt-16 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <div
                  className={cn(
                    "flex w-full flex-col items-center gap-4",
                    imageFirst ? "lg:flex-col" : "lg:flex-col-reverse"
                  )}
                >
                  <div className="flex h-35 w-35 items-center justify-center rounded-lg bg-accent">
                    <span className="text-4xl font-semibold tracking-tight text-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 self-stretch">
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        index === 0 ? "bg-ink" : "bg-border"
                      )}
                    />
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-xl font-medium tracking-tight text-ink">{step.title}</p>
                    <p className="text-body">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
