import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/admin/auth-card";
import { auth, getStaffSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  if (await getStaffSession()) redirect("/admin");
  const { reset } = await searchParams;

  return (
    <AuthCard title="Sign in" intro="The MEGA-TEC website admin, for MEGA-TEC staff.">
      {auth ? (
        <LoginForm passwordChanged={reset === "1"} />
      ) : (
        <p className="text-body text-sm">The admin is not available here: it needs a database.</p>
      )}
    </AuthCard>
  );
}
