import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, FormMessage } from "@/components/admin/auth-card";
import { ResetForm } from "./reset-form";

export const metadata: Metadata = { title: "Choose a password" };

/**
 * Where the links in invitation and password-reset emails land: Better Auth checks the
 * link and sends the visitor here with ?token=, or with ?error= when it has expired or
 * been used.
 */
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  return (
    <AuthCard title="Choose a password" intro="At least 10 characters. A short sentence is easy to remember and hard to guess.">
      {token && !error ? (
        <ResetForm token={token} />
      ) : (
        <div className="flex flex-col gap-4">
          <FormMessage tone="error">
            This link has expired or has already been used. Ask for a new one.
          </FormMessage>
          <Link href="/admin/forgot-password" className="text-body hover:text-ink text-center text-sm underline-offset-4 hover:underline">
            Email me a new link
          </Link>
        </div>
      )}
    </AuthCard>
  );
}
