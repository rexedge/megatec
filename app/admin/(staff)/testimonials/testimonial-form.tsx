"use client";

import { useActionState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { Checkbox, Panel, TextArea, TextField } from "@/components/admin/fields";
import { FormActions } from "@/components/admin/row-actions";
import { saveTestimonial } from "./actions";

export type TestimonialValues = { quote: string; company: string; published: boolean };

/** Adding a quote (id null) or changing one. */
export function TestimonialForm({ id, values }: { id: number | null; values: TestimonialValues }) {
  const [state, action, pending] = useActionState(saveTestimonial.bind(null, id), null);

  return (
    <Panel className="mt-8 max-w-2xl p-5 sm:p-6">
      <form action={action} className="space-y-6">
        <TextArea
          label="Quote"
          hint="As the customer said it, without quotation marks; the homepage adds them."
          name="quote"
          required
          maxLength={1200}
          rows={6}
          defaultValue={values.quote}
        />
        <TextField
          label="Who said it"
          optional
          hint="The company, with the person’s role where you know it, e.g. “Station Manager, Sunrise Energy”. Leave it empty to show the quote without a name."
          name="company"
          maxLength={200}
          defaultValue={values.company}
        />
        <Checkbox
          label="Show on the homepage"
          hint="Untick to hide the quote without deleting it."
          name="published"
          defaultChecked={values.published}
        />
        {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
        <FormActions pending={pending} cancelHref="/admin/testimonials" saveLabel={id === null ? "Add the quote" : "Save changes"} />
      </form>
    </Panel>
  );
}
