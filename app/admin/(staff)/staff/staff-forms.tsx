"use client";

import { useActionState, useState, useTransition } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import {
  addStaff,
  removeStaff,
  sendPasswordLink,
  setStaffRole,
  type StaffFormState,
} from "./actions";

export function AddStaffForm() {
  const [state, action, pending] = useActionState(addStaff, null);
  return (
    <form action={action} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-end">
      <label className="block">
        <span className="text-ink mb-1.5 block text-sm font-medium">Name</span>
        <input name="name" required autoComplete="off" className="form-input" />
      </label>
      <label className="block">
        <span className="text-ink mb-1.5 block text-sm font-medium">Email</span>
        <input name="email" type="email" required autoComplete="off" className="form-input" />
      </label>
      <label className="block">
        <span className="text-ink mb-1.5 block text-sm font-medium">Can manage staff</span>
        <select name="role" defaultValue="user" className="form-input">
          <option value="user">No</option>
          <option value="admin">Yes (admin)</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="bg-ink hover:bg-ink/90 min-h-11 rounded-xl px-5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add and send invite"}
      </button>
      {state?.error && <div className="md:col-span-4"><FormMessage tone="error">{state.error}</FormMessage></div>}
      {state?.ok && <div className="md:col-span-4"><FormMessage tone="ok">{state.ok}</FormMessage></div>}
    </form>
  );
}

export function StaffRow({
  id,
  name,
  email,
  role,
  lastSignIn,
  isMe,
}: {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  lastSignIn: string | null;
  isMe: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<StaffFormState>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  function run(task: () => Promise<StaffFormState>) {
    startTransition(async () => setMessage(await task()));
  }

  const button =
    "border-border text-ink hover:border-ink min-h-9 rounded-lg border px-3 text-sm font-medium transition-colors disabled:opacity-50";

  return (
    <li className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-ink font-semibold tracking-tight">
          {name} {isMe && <span className="text-body font-normal">(you)</span>}
          {role === "admin" && (
            <span className="bg-hero-tint text-sea ml-2 rounded-full px-2 py-0.5 text-xs font-medium">Admin</span>
          )}
        </p>
        <p className="text-body truncate text-sm">{email}</p>
        <p className="text-body/70 mt-0.5 text-xs">
          {lastSignIn
            ? `Last signed in ${new Date(lastSignIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
            : "Has not signed in yet"}
        </p>
        {message?.error && <div className="mt-2"><FormMessage tone="error">{message.error}</FormMessage></div>}
        {message?.ok && <div className="mt-2"><FormMessage tone="ok">{message.ok}</FormMessage></div>}
      </div>
      {!isMe && (
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={pending} className={button} onClick={() => run(() => sendPasswordLink(email))}>
            Send password link
          </button>
          <button
            type="button"
            disabled={pending}
            className={button}
            onClick={() => run(() => setStaffRole(id, role === "admin" ? "user" : "admin"))}
          >
            {role === "admin" ? "Remove admin" : "Make admin"}
          </button>
          {confirmRemove ? (
            <button
              type="button"
              disabled={pending}
              className="min-h-9 rounded-lg bg-red-600 px-3 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              onClick={() => run(() => removeStaff(id))}
            >
              Yes, remove {name.split(" ")[0]}
            </button>
          ) : (
            <button type="button" disabled={pending} className={button} onClick={() => setConfirmRemove(true)}>
              Remove
            </button>
          )}
        </div>
      )}
    </li>
  );
}
