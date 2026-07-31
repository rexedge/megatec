import { Container } from "@/components/ui/container";

const WHY_CHOOSE = [
  {
    number: "01",
    title: "Uncompromising Quality",
    description:
      "Every component is selected for its durability and performance. Our manufacturing processes adhere to stringent international standards, guaranteeing a product that you can trust for years to come.",
  },
  {
    number: "02",
    title: "Pioneering Innovation",
    description:
      "We constantly invest in R&D to bring you the latest advancements, from enhanced flow rates to sophisticated environmental monitoring and user security features.",
  },
  {
    number: "03",
    title: "Customer-Centric Partnership",
    description:
      "We listen to you. Our team works closely with clients to understand their unique challenges and recommend the perfect fuel dispensing systems to meet their specific operational goals.",
  },
  {
    number: "04",
    title: "Commitment to Safety",
    description:
      "In our industry, there is no room for error. Safety is engineered into the core of every product we build, protecting your assets, your customers, and the environment.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <p className="text-sm font-medium tracking-tight text-body">
          Precision, Innovation, and Reliability in Every Drop
        </p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
          Why Choose Megatec Pumps?
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          {WHY_CHOOSE.map((item) => (
            <div key={item.number} className="flex gap-6 border-t border-border pt-6">
              <span className="text-3xl font-semibold tracking-tight text-ink">
                {item.number}
              </span>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-body leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
