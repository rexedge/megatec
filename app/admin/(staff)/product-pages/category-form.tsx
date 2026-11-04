"use client";

import { useActionState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { EditorForm } from "@/components/admin/editor-form";
import { FormSection, Panel, TextArea, TextField } from "@/components/admin/fields";
import { FormActions } from "@/components/admin/row-actions";
import { RowList } from "@/components/admin/row-list";
import { SearchListingFields } from "@/components/admin/search-listing-fields";
import { saveCategory } from "./actions";

export type CategoryValues = {
  slug: string;
  name: string;
  menuDescription: string;
  headline: string;
  intro: string;
  cta: string;
  bullets: string[];
  title: string;
  meta: string;
};

/** The words on a category page (e.g. Fuel Solutions), and its line in the PRODUCTS menu. */
export function CategoryForm({ id, values }: { id: number; values: CategoryValues }) {
  const [state, action, pending] = useActionState(saveCategory.bind(null, id), null);

  return (
    <Panel className="mt-8 max-w-3xl p-5 sm:p-6">
      <EditorForm action={action} className="space-y-10">
        <FormSection title="In the PRODUCTS menu" intro="Also used in the breadcrumbs and the site search.">
          <TextField label="Name" hint="e.g. “Fuel Solutions”." name="name" required maxLength={60} defaultValue={values.name} />
          <TextField
            label="Menu line"
            hint="The line under the name in the PRODUCTS menu."
            name="menuDescription"
            required
            maxLength={160}
            defaultValue={values.menuDescription}
          />
        </FormSection>

        <FormSection title="On the page" intro="The top of the category page, above the tiles for its product pages.">
          <TextField label="Headline" name="headline" required maxLength={200} defaultValue={values.headline} />
          <TextArea label="Opening paragraph" name="intro" required maxLength={1000} rows={4} defaultValue={values.intro} />
          <TextField
            label="Button"
            hint="The words on the green WhatsApp button, e.g. “Talk to Our Team on WhatsApp”."
            name="cta"
            required
            maxLength={60}
            defaultValue={values.cta}
          />
          <RowList
            label="Ticked lines"
            hint="The ticked lines under the button, two across. Four fill the grid."
            initial={values.bullets}
            blank=""
            addLabel="Add a line"
            noun="line"
            max={6}
          >
            {(line, n) => (
              <input name="bullet" defaultValue={line} maxLength={120} aria-label={`Ticked line ${n}`} className="form-input" />
            )}
          </RowList>
        </FormSection>

        <FormSection title="In Google" intro="How search engines list the page.">
          <SearchListingFields path={`/products/${values.slug}`} title={values.title} description={values.meta} />
        </FormSection>

        <div className="space-y-6">
          {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
          <FormActions pending={pending} cancelHref="/admin/product-pages" saveLabel="Save changes" />
        </div>
      </EditorForm>
    </Panel>
  );
}
