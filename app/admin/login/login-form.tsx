"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, FormMessage, SubmitButton } from "@/components/admin/auth-card";
import { authClient } from "@/lib/auth/client";

export function LoginForm({ passwordChanged }: { passwordChanged: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (error) {
      setPending(false);
      setError(
        error.status === 429
          ? "Too many attempts. Wait a minute, then try again."
          : error.code === "BANNED_USER"
            ? "This account has been switched off. Ask an admin."
            : "That email and password don't match a staff account."
      );
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {passwordChanged && <FormMessage tone="ok">Your password is set. Sign in with it now.</FormMessage>}
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <SubmitButton pending={pending}>Sign in</SubmitButton>
      <Link href="/admin/forgot-password" className="text-body hover:text-ink text-center text-sm underline-offset-4 hover:underline">
        Forgotten your password?
      </Link>
    </form>
  );
}
