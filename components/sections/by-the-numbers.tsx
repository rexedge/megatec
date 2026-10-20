import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";

/**
 * Copy is verbatim from the Core Site Pages document, About section 3 "By the
 * numbers" (punch list AB-06). The numbers count up once when the grid scrolls
 * into view (MO-05). The document marks each tile with an emoji; they are drawn as
 * line icons here to match the rest of the site.
 */
const STATS = [
  {
    icon: <CalendarIcon />,
    end: 2012,
    grouped: false,
    suffix: "",
    label: "Founded",
    detail: "Fuel dispensers 2012, LPG 2014, EV and CNG 2023.",
  },
  {
    icon: <PumpIcon />,
    end: 1500,
    grouped: true,
    suffix: "+",
    label: "stations equipped",
    detail: "Plus 500+ LPG installations nationwide.",
  },
  {
    icon: <UsersIcon />,
    end: 3500,
    grouped: true,
    suffix: "+",
    label: "active clients",
    detail: "Across 31 states and the FCT, with installations reaching into Cotonou, Benin Republic.",
  },
  {
    icon: <HardHatIcon />,
    end: 80,
    grouped: true,
    suffix: "+",
    label: "engineers, 6 branches",
    detail: "Head office in Lagos, branches nationwide.",
  },
];

export function ByTheNumbers() {
  return (
    <section className="py-6 sm:py-16 lg:py-20">
      <Container>
        <h2 className="text-ink max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Where <span className="whitespace-nowrap">MEGA-TEC</span> stands today
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.label} className="bg-surface-soft flex flex-col gap-5 rounded-2xl p-6">
              <span className="bg-accent text-ink flex h-12 w-12 items-center justify-center rounded-full">
                {stat.icon}
              </span>
              <div>
                <p className="text-ink text-5xl font-semibold tracking-tight">
                  <CountUp end={stat.end} suffix={stat.suffix} grouped={stat.grouped} />
                </p>
                <p className="text-ink mt-1 text-lg font-medium">{stat.label}</p>
              </div>
              <p className="text-body leading-relaxed">{stat.detail}</p>
            </li>
          ))}
        </ul>
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

function CalendarIcon() {
  return (
    <Icon>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Icon>
  );
}

function PumpIcon() {
  return (
    <Icon>
      <path d="M5 20.5V5.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
      <path d="M3.5 20.5h13M7.5 8h5" />
      <path d="M15 9h1.5a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8.5L19 6" />
    </Icon>
  );
}

function UsersIcon() {
  return (
    <Icon>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.4-3.3 2.9-5.2 6-5.2s5.6 1.9 6 5.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16.5 14.3c2.6.1 4.3 1.6 4.5 4.2" />
    </Icon>
  );
}

function HardHatIcon() {
  return (
    <Icon>
      <path d="M4.5 16.5v-1a7.5 7.5 0 0 1 15 0v1" />
      <path d="M3 16.5h18V19H3z" />
      <path d="M12 8v4.5" />
    </Icon>
  );
}
