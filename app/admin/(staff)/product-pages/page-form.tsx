"use client";

import { useActionState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { EditorForm } from "@/components/admin/editor-form";
import { Checkbox, FormSection, Panel, TextField } from "@/components/admin/fields";
import { FormActions } from "@/components/admin/row-actions";
import { RowList } from "@/components/admin/row-list";
import { SearchListingFields } from "@/components/admin/search-listing-fields";
import { savePage } from "./actions";

export type PageValues = {
  name: string;
  h1: string;
  intro: string[];
  formHeading: string;
  title: string;
  meta: string;
  published: boolean;
};

/**
 * The words on a product page (e.g. Gear Pumps). A new page (id null) chooses its category;
 * an existing one stays in its own, since moving it would change its address.
 */
export function PageForm({
  id,
  values,
  path,
  categories,
  categoryId,
}: {
  id: number | null;
  values: PageValues;
  /** The page's address, or its category's for a new page. */
  path: string;
  /** For a new page: the categories to choose from, and the one to start on. */
  categories?: { id: number; name: string }[];
  categoryId?: number | null;
}) {
  const [state, action, pending] = useActionState(savePage.bind(null, id), null);

  return (
    <Panel className="mt-8 max-w-3xl p-5 sm:p-6">
      <EditorForm action={action} className="space-y-10">
        <FormSection title="In the PRODUCTS menu" intro="Also the page's tile on its category page, and its breadcrumb.">
          {categories && (
            <div>
              <label htmlFor="field-category" className="text-ink block text-sm font-medium">
                Category
              </label>
              <p id="field-category-hint" className="text-body mt-0.5 mb-1.5 text-xs">
                The page’s address starts with it, so it can’t be changed afterwards.
              </p>
              <select
                id="field-category"
                name="category"
                required
                defaultValue={categoryId ?? ""}
                aria-describedby="field-category-hint"
                className="form-input"
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <TextField
            label="Name"
            hint={
              id === null
                ? "e.g. “Gear Pumps”. The page's address is made from it when you add the page, and stays the same after."
                : "e.g. “Gear Pumps”. Changing it keeps the page's address."
            }
            name="name"
            required
            maxLength={80}
            defaultValue={values.name}
          />
        </FormSection>

        <FormSection title="On the page" intro="Above the product cards, and over the enquiry form at the foot.">
          <TextField
            label="Headline"
            optional
            hint="The big heading at the top. Leave it empty to use the name."
            name="h1"
            maxLength={200}
            defaultValue={values.h1}
          />
          <RowList
            label="Opening text"
            optional
            hint="Paragraphs under the headline, before the products."
            initial={values.intro}
            blank=""
            addLabel="Add a paragraph"
            noun="paragraph"
            max={6}
          >
            {(paragraph, n) => (
              <textarea
                name="intro"
                defaultValue={paragraph}
                maxLength={1000}
                rows={3}
                aria-label={`Paragraph ${n}`}
                className="form-input resize-y leading-relaxed"
              />
            )}
          </RowList>
          <TextField
            label="Form headline"
            hint="Over the short enquiry form at the foot, e.g. “Moving high volumes? Let's find the right pump.”"
            name="formHeading"
            required
            maxLength={160}
            defaultValue={values.formHeading}
          />
        </FormSection>

        <FormSection title="In Google" intro="How search engines list the page.">
          <SearchListingFields path={path} title={values.title} description={values.meta} />
        </FormSection>

        <div className="space-y-6">
          <Checkbox
            label="Show on the site"
            hint="Untick to take the page, its products and its menu link off the site without deleting them. Its address then shows the page-not-found page."
            name="published"
            defaultChecked={values.published}
          />
          {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
          <FormActions pending={pending} cancelHref="/admin/product-pages" saveLabel={id === null ? "Add the page" : "Save changes"} />
        </div>
      </EditorForm>
    </Panel>
  );
}
