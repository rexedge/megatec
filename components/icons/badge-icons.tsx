type IconProps = { className?: string };

const base = "h-6 w-6";

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </svg>
  );
}

export function AwardIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M6 15h4" />
    </svg>
  );
}

export function DisplayIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? base}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M9.5 8.5l5 5" />
    </svg>
  );
}
