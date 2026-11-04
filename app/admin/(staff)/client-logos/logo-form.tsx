"use client";

import { useActionState, useState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { EditorForm } from "@/components/admin/editor-form";
import { Checkbox, Panel, TextField } from "@/components/admin/fields";
import { PhotoField } from "@/components/admin/photo-field";
import { FormActions } from "@/components/admin/row-actions";
import { saveLogo } from "./actions";

export type LogoValues = { name: string; image: string | null; width: number; height: number; published: boolean };

/** Adding a client logo (id null) or changing one. Its size comes from the uploaded file. */
export function LogoForm({ id, values }: { id: number | null; values: LogoValues }) {
  const [state, action, pending] = useActionState(saveLogo.bind(null, id), null);
  const [size, setSize] = useState({ width: values.width, height: values.height });

  return (
    <Panel className="mt-8 max-w-2xl p-5 sm:p-6">
      <EditorForm action={action} className="space-y-6">
        <TextField
          label="Client"
          hint="The company's name. Screen readers read it out in place of the logo."
          name="name"
          required
          maxLength={120}
          defaultValue={values.name}
        />
        <PhotoField
          label="Logo"
          optional={false}
          hint="In full colour, ideally a PNG or SVG with a transparent background. It shows about 56 pixels tall."
          name="image"
          folder="logos"
          defaultValue={values.image}
          previewClassName="h-16 w-auto max-w-[220px] object-contain p-2"
          onChange={(photo) => photo && setSize({ width: photo.width, height: photo.height })}
        />
        <input type="hidden" name="width" value={size.width || ""} />
        <input type="hidden" name="height" value={size.height || ""} />
        <Checkbox
          label="Show on the homepage"
          hint="Untick to take the logo out of the row without deleting it."
          name="published"
          defaultChecked={values.published}
        />
        {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
        <FormActions pending={pending} cancelHref="/admin/client-logos" saveLabel={id === null ? "Add the logo" : "Save changes"} />
      </EditorForm>
    </Panel>
  );
}
