"use client";

import { useActionState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { EditorForm } from "@/components/admin/editor-form";
import { Checkbox, Panel, TextField } from "@/components/admin/fields";
import { PhotoField } from "@/components/admin/photo-field";
import { FormActions } from "@/components/admin/row-actions";
import { savePart } from "./actions";

export type PartValues = {
  groupId: number | null;
  name: string;
  fit: string;
  image: string | null;
  href: string;
  published: boolean;
};

/** Adding a spare part (id null) or changing one. */
export function PartForm({
  id,
  values,
  groups,
}: {
  id: number | null;
  values: PartValues;
  groups: { id: number; label: string }[];
}) {
  const [state, action, pending] = useActionState(savePart.bind(null, id), null);

  return (
    <Panel className="mt-8 max-w-2xl p-5 sm:p-6">
      <EditorForm action={action} className="space-y-6">
        <div>
          <label htmlFor="field-group" className="text-ink block text-sm font-medium">
            Group
          </label>
          <p id="field-group-hint" className="text-body mt-0.5 mb-1.5 text-xs">
            The filter it sits under on the Station Accessories page. A part moved to another group goes to the end of it.
          </p>
          <select
            id="field-group"
            name="group"
            required
            defaultValue={values.groupId ?? ""}
            aria-describedby="field-group-hint"
            className="form-input"
          >
            <option value="" disabled>
              Choose a group
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
          </select>
        </div>
        <TextField label="Part" hint="Its name on the card, e.g. “Bennett Meter”." name="name" required maxLength={120} defaultValue={values.name} />
        <TextField
          label="Fits"
          hint="The line under the name: which dispensers it fits, e.g. “Fuel dispensers” or “LPG dispensers”."
          name="fit"
          required
          maxLength={120}
          defaultValue={values.fit}
        />
        <PhotoField
          label="Photo"
          hint="The part on a plain background; the card shows it square. Without one, the card shows the MEGA-TEC logo."
          name="image"
          folder="parts"
          defaultValue={values.image}
          previewClassName="h-28 w-28 object-contain p-1"
        />
        <TextField
          label="Links to"
          optional
          hint="Only for parts with a page of their own: the card then opens that page, e.g. /products/cng-solutions/cng-conversion-kit."
          name="href"
          maxLength={200}
          defaultValue={values.href}
        />
        <Checkbox label="Show on the site" hint="Untick to hide the part without deleting it." name="published" defaultChecked={values.published} />
        {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
        <FormActions pending={pending} cancelHref="/admin/spare-parts" saveLabel={id === null ? "Add the part" : "Save changes"} />
      </EditorForm>
    </Panel>
  );
}
