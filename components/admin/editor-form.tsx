"use client";

import { startTransition } from "react";

/**
 * An editor's form. It hands the fields to the save action itself rather than through the
 * form's `action` prop, because React clears a form after its action runs: when the server
 * refused a save ("Tick at least one kind of work"), everything typed would be wiped along
 * with the mistake. Here the fields keep what was typed until the save goes through.
 */
export function EditorForm({
  action,
  className,
  children,
}: {
  action: (form: FormData) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        startTransition(() => action(form));
      }}
    >
      {children}
    </form>
  );
}
