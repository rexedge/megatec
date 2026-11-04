"use client";

import { useActionState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { EditorForm } from "@/components/admin/editor-form";
import { Checkbox, Panel, TextArea, TextField } from "@/components/admin/fields";
import { PhotoField } from "@/components/admin/photo-field";
import { FormActions } from "@/components/admin/row-actions";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/content/types";
import { saveProject } from "./actions";

export type ProjectValues = {
  name: string;
  location: string;
  description: string;
  categories: ProjectCategory[];
  image: string | null;
  /** "center", "top" or "bottom": where the photo is cropped from. */
  focus: string;
  onHome: boolean;
  onProjectsPage: boolean;
  published: boolean;
};

/** Adding a project (id null) or changing one. */
export function ProjectForm({ id, values }: { id: number | null; values: ProjectValues }) {
  const [state, action, pending] = useActionState(saveProject.bind(null, id), null);

  return (
    <Panel className="mt-8 max-w-2xl p-5 sm:p-6">
      <EditorForm action={action} className="space-y-6">
        <TextField
          label="Client or project"
          hint="The card's title, e.g. “Nepal Energies”."
          name="name"
          required
          maxLength={120}
          defaultValue={values.name}
        />
        <TextField
          label="Where"
          optional
          hint="The town, state or “Nationwide”. The homepage shows it after the name."
          name="location"
          maxLength={120}
          defaultValue={values.location}
        />
        <TextArea
          label="What we did"
          hint="One or two sentences for the card."
          name="description"
          required
          maxLength={600}
          rows={4}
          defaultValue={values.description}
        />

        <fieldset>
          <legend className="text-ink text-sm font-medium">Kind of work</legend>
          <p className="text-body mt-0.5 mb-2 text-xs">The Projects page&apos;s filters. Tick all that apply.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {PROJECT_CATEGORIES.map((category) => (
              <label key={category} className="text-ink flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  defaultChecked={values.categories.includes(category)}
                  className="accent-sea h-5 w-5"
                />
                {category}
              </label>
            ))}
          </div>
        </fieldset>

        <PhotoField
          label="Photo"
          hint="A landscape photo of the installation. Without one, the card shows a drawn stand-in picture."
          name="image"
          folder="projects"
          defaultValue={values.image}
          previewClassName="h-36 w-56 object-cover"
        />
        <div>
          <label htmlFor="field-focus" className="text-ink block text-sm font-medium">
            Crop the photo from
          </label>
          <p id="field-focus-hint" className="text-body mt-0.5 mb-1.5 text-xs">
            The cards are nearly square, so a wide photo loses its sides or top and bottom. Choose what to keep.
          </p>
          <select id="field-focus" name="focus" defaultValue={values.focus} aria-describedby="field-focus-hint" className="form-input">
            <option value="center">The middle</option>
            <option value="top">The top</option>
            <option value="bottom">The bottom</option>
          </select>
        </div>

        <div className="space-y-4">
          <Checkbox label="Show on the homepage" name="onHome" defaultChecked={values.onHome} />
          <Checkbox label="Show on the Projects & Installations page" name="onProjectsPage" defaultChecked={values.onProjectsPage} />
          <Checkbox
            label="Published"
            hint="Untick to hide the project everywhere without deleting it."
            name="published"
            defaultChecked={values.published}
          />
        </div>

        {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
        <FormActions pending={pending} cancelHref="/admin/projects" saveLabel={id === null ? "Add the project" : "Save changes"} />
      </EditorForm>
    </Panel>
  );
}
