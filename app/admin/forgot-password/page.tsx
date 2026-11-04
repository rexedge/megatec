import type { Metadata } from "next";
import { AuthCard } from "@/components/admin/auth-card";
import { ForgotForm } from "./forgot-form";

export const metadata: Metadata = { title: "Forgotten password" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgotten password"
      intro="Enter the email you sign in with. If it belongs to a staff account, we'll email you a link to choose a new password."
    >
      <ForgotForm />
    </AuthCard>
  );
}
