import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";

/**
 * Copy is verbatim from the Core Site Pages document, Homepage §3 "Why
 * MEGA-TEC" (punch list HM-08). The document marks its tiles with emoji; they
 * are drawn as line icons here to match the rest of the site.
 */
const REASONS = [
  {
    title: "Assembled & tested in Nigeria",
    description: "Complaints dropped over 80% once we moved to local assembly.",
    icon: <FactoryIcon />,
  },
  {
    title: "Spare parts never controlled by one supplier",
    description: "Openly available in the market. Your pump is never stranded.",
    icon: <NutIcon />,
  },
  {
    title: "1,500+ stations across 31 states and the FCT",
    description: "80+ engineers and 6 branches, nationwide.",
    icon: <BuildingIcon />,
  },
  {
    title: "Warranty on every product",
    description:
      "1-year warranty on all fuel, LPG and CNG dispensers. EV chargers and other equipment also come with a warranty.",
    icon: <ShieldIcon />,
  },
];

export function WhyMegaTec() {
  return (
    <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="text-ink max-w-lg text-4xl font-semibold tracking-tight lg:text-5xl">
            Built in Nigeria. Serviceable anywhere in Nigeria.
          </h2>
          <p className="text-body max-w-xl text-lg leading-relaxed">
            Most imported pumps become scrap the day one part fails and the brand has stopped
            making spares. MEGA-TEC is built the opposite way. We assemble and fully test every
            unit here before delivery, using parts that Nigerian engineers know well, so the spare
            parts are always available in the open market and any engineer can fix them.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <li
              key={reason.title}
              className="flex gap-4 rounded-2xl bg-white p-6 lg:flex-col lg:gap-6"
            >
              <span className="bg-accent text-ink flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                {reason.icon}
              </span>
              <div>
                <h3 className="text-ink text-xl font-medium tracking-tight">{reason.title}</h3>
                <p className="text-body mt-2 leading-relaxed">{reason.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 sm:mt-12">
          <TextLink href="/about">Read Our Story</TextLink>
        </div>
      </Container>
    </section>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function FactoryIcon() {
  return (
    <Icon>
      <path d="M3 21V9l6 4V9l6 4V4h4v17H3z" />
      <path d="M7 17h.01M11 17h.01M15 17h.01" />
    </Icon>
  );
}

function NutIcon() {
  return (
    <Icon>
      <path d="M12 2.8l7.8 4.5v9.4L12 21.2l-7.8-4.5V7.3z" />
      <circle cx="12" cy="12" r="3.2" />
    </Icon>
  );
}

function BuildingIcon() {
  return (
    <Icon>
      <path d="M5 21V3h9v18M14 9h5v12M3 21h18" />
      <path d="M8 7h3M8 11h3M8 15h3" />
    </Icon>
  );
}

function ShieldIcon() {
  return (
    <Icon>
      <path d="M12 3l7.5 3v5.5c0 4.4-3.1 8.1-7.5 9.5-4.4-1.4-7.5-5.1-7.5-9.5V6L12 3z" />
      <path d="M8.8 12l2.4 2.4 4-4.4" />
    </Icon>
  );
}
