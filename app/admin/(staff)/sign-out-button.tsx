"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await authClient.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
      className="border-border text-ink hover:border-ink min-h-9 rounded-lg border px-3 font-medium transition-colors disabled:opacity-60"
    >
      Sign out
    </button>
  );
}
