import Image from "next/image";
import Link from "next/link";

/** The centred card the sign-in, forgotten-password and new-password pages sit in. */
export function AuthCard({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center" aria-label="MEGA-TEC website">
          <Image src="/logo-wordart.png" alt="MEGA-TEC" width={600} height={192} className="h-10 w-auto" />
        </Link>
        <div className="border-border/70 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-ink text-2xl font-semibold tracking-tight">{title}</h1>
          {intro && <p className="text-body mt-2 text-sm leading-relaxed">{intro}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}

/** A labelled input for the admin's forms. */
export function Field({
  label,
  ...input
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-ink mb-1.5 block text-sm font-medium">{label}</span>
      <input {...input} className="form-input" />
    </label>
  );
}

/** The main button of an admin form. */
export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink hover:bg-ink/90 flex min-h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold text-white transition-colors disabled:opacity-60"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}

/** An error or confirmation line under a form. */
export function FormMessage({ tone, children }: { tone: "error" | "ok"; children: React.ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={
        tone === "error"
          ? "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          : "rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800"
      }
    >
      {children}
    </p>
  );
}
