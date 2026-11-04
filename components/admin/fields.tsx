import Link from "next/link";

/**
 * The admin's form fields and page furniture. Each field has a label above it and may have
 * a hint under the label saying where the text shows on the site. The label alone names the
 * field; screen readers read the hint after it as its description. A field's id comes from
 * its name unless given.
 */
function Label({ id, label, hint, optional }: { id: string; label: string; hint?: string; optional?: boolean }) {
  return (
    <span className="mb-1.5 block">
      <label htmlFor={id} className="text-ink block text-sm font-medium">
        {label}
        {optional && <span className="text-body/70 font-normal"> (optional)</span>}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="text-body mt-0.5 block text-xs leading-relaxed">
          {hint}
        </span>
      )}
    </span>
  );
}

type FieldProps = { label: string; hint?: string; optional?: boolean };

function ids(props: { id?: string; name?: string }, hint?: string) {
  const id = props.id ?? `field-${props.name}`;
  return { id, "aria-describedby": hint ? `${id}-hint` : undefined };
}

export function TextField({ label, hint, optional, ...input }: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const a11y = ids(input, hint);
  return (
    <div>
      <Label id={a11y.id} label={label} hint={hint} optional={optional} />
      <input {...input} {...a11y} className="form-input" />
    </div>
  );
}

export function TextArea({ label, hint, optional, ...textarea }: FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const a11y = ids(textarea, hint);
  return (
    <div>
      <Label id={a11y.id} label={label} hint={hint} optional={optional} />
      <textarea rows={5} {...textarea} {...a11y} className="form-input min-h-28 resize-y leading-relaxed" />
    </div>
  );
}

export function Checkbox({
  label,
  hint,
  ...input
}: { label: string; hint?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  const a11y = ids(input, hint);
  return (
    <div className="flex items-start gap-3">
      <input type="checkbox" {...input} {...a11y} className="accent-sea mt-0.5 h-5 w-5 shrink-0" />
      <span>
        <label htmlFor={a11y.id} className="text-ink block text-sm font-medium">
          {label}
        </label>
        {hint && (
          <span id={`${a11y.id}-hint`} className="text-body mt-0.5 block text-xs leading-relaxed">
            {hint}
          </span>
        )}
      </span>
    </div>
  );
}

/** A page's title, what it is for, and its main button. */
export function PageHeader({
  title,
  intro,
  back,
  action,
}: {
  title: string;
  intro?: React.ReactNode;
  back?: { href: string; label: string };
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back && (
          <Link href={back.href} className="text-body hover:text-ink mb-3 inline-block text-sm font-medium">
            ← {back.label}
          </Link>
        )}
        <h1 className="text-ink text-3xl font-semibold tracking-tight">{title}</h1>
        {intro && <p className="text-body mt-2 max-w-2xl">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="bg-ink hover:bg-ink/90 inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

/** A titled part of a long form, e.g. "The card" on the product form. */
export function FormSection({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <section className="border-border/70 space-y-6 border-t pt-8 first:border-t-0 first:pt-0">
      <div>
        <h2 className="text-ink text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-body mt-0.5 text-sm">{intro}</p>
      </div>
      {children}
    </section>
  );
}

/** The white card a form or list sits on. */
export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-border/70 rounded-2xl border bg-white ${className}`}>{children}</div>;
}

/** A small grey "Hidden" pill for rows the site does not show. */
export function HiddenPill() {
  return (
    <span className="bg-muted text-body ml-2 rounded-full px-2 py-0.5 align-middle text-xs font-medium">
      Hidden
    </span>
  );
}
