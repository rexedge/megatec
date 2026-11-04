"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/admin/auth-card";
import { authClient } from "@/lib/auth/client";

export function ForgotForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email"));
    setPending(true);
    setError(null);
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/admin/reset-password",
    });
    setPending(false);
    // The answer is the same whether or not the address has an account.
    if (error?.status === 429) setError("Too many requests. Wait a minute, then try again.");
    else if (error) setError("That didn't work. Check the address and try again.");
    else setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-4">
        <FormMessage tone="ok">
          If that address has a staff account, a link is on its way. It works for 24 hours.
        </FormMessage>
        <Link href="/admin/login" className="text-body hover:text-ink text-center text-sm underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <SubmitButton pending={pending}>Email me a link</SubmitButton>
      <Link href="/admin/login" className="text-body hover:text-ink text-center text-sm underline-offset-4 hover:underline">
        Back to sign in
      </Link>
    </form>
  );
}
