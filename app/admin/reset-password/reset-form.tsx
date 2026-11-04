"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/admin/auth-card";
import { authClient } from "@/lib/auth/client";

export function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    if (password !== String(form.get("confirm"))) {
      setError("The two passwords are different.");
      return;
    }
    setPending(true);
    setError(null);
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    if (error) {
      setPending(false);
      setError(
        error.code === "PASSWORD_TOO_SHORT"
          ? "Use at least 10 characters."
          : "This link has expired or has already been used. Ask for a new one."
      );
      return;
    }
    router.replace("/admin/login?reset=1");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="New password" name="password" type="password" autoComplete="new-password" minLength={10} required />
      <Field label="The same again" name="confirm" type="password" autoComplete="new-password" minLength={10} required />
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <SubmitButton pending={pending}>Save password</SubmitButton>
    </form>
  );
}
