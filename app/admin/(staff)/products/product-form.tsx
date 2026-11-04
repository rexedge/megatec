"use client";

import { useActionState, useState } from "react";
import { FormMessage } from "@/components/admin/auth-card";
import { EditorForm } from "@/components/admin/editor-form";
import { Checkbox, Panel, TextArea, TextField } from "@/components/admin/fields";
import { PhotoField } from "@/components/admin/photo-field";
import { FormActions } from "@/components/admin/row-actions";
import { RowList } from "@/components/admin/row-list";
import { SheetField } from "@/components/admin/sheet-field";
import type { DrawerExtra } from "@/lib/content/types";
import { saveProduct } from "./actions";

export type ProductValues = {
  subcategoryId: number | null;
  name: string;
  blurb: string;
  best: boolean;
  tag: string;
  badge: string;
  details: [string, string][];
  description: string;
  extras: DrawerExtra[];
  warranty: string;
  image: string | null;
  sheet: string | null;
  published: boolean;
};

/** The pages a product can go on, under their category. `filters`: the Fuel Dispensers page's nozzle and meter filters. */
export type PageChoice = { category: string; pages: { id: number; name: string; filters: boolean }[] };

const EXTRA_KINDS: { value: DrawerExtra["t"]; label: string }[] = [
  { value: "p", label: "Paragraph" },
  { value: "h", label: "Heading" },
  { value: "li", label: "Bullet point" },
];

const inputClass = "form-input";

/** Adding a product (id null) or changing one. */
export function ProductForm({ id, values, pages }: { id: number | null; values: ProductValues; pages: PageChoice[] }) {
  const [state, action, pending] = useActionState(saveProduct.bind(null, id), null);
  const [pageId, setPageId] = useState(values.subcategoryId);
  const filtered = pages.some((group) => group.pages.some((page) => page.id === pageId && page.filters));

  return (
    <Panel className="mt-8 max-w-3xl p-5 sm:p-6">
      <EditorForm action={action} className="space-y-10">
        <div>
          <label htmlFor="field-subcategory" className="text-ink block text-sm font-medium">
            Page
          </label>
          <p id="field-subcategory-hint" className="text-body mt-0.5 mb-1.5 text-xs">
            The product page it is listed on. A product moved to another page goes to the end of it.
          </p>
          <select
            id="field-subcategory"
            name="subcategory"
            required
            value={pageId ?? ""}
            onChange={(event) => setPageId(Number(event.target.value))}
            aria-describedby="field-subcategory-hint"
            className={inputClass}
          >
            <option value="" disabled>
              Choose a page
            </option>
            {pages.map((group) => (
              <optgroup key={group.category} label={group.category}>
                {group.pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <Section title="The card" intro="What the product page lists: photo, name and a short line.">
          <TextField
            label="Name"
            hint={
              filtered
                ? "As customers know it, e.g. “MT PLUS – Single Nozzle (TB)”. This page's Nozzle filter looks for “Single” or “Double” in the name."
                : "As customers know it, e.g. “MT PLUS – Single Nozzle (TB)”."
            }
            name="name"
            required
            maxLength={120}
            defaultValue={values.name}
          />
          <TextField
            label="Short line"
            hint="Under the name on the card: what it is for, in a sentence."
            name="blurb"
            required
            maxLength={200}
            defaultValue={values.blurb}
          />
          <PhotoField
            label="Photo"
            hint="The product on a plain background. The card fills a 4:3 frame with it, so the edges may be trimmed; the details panel shows it whole. Without one, the card shows a drawn stand-in picture."
            name="image"
            folder="products"
            defaultValue={values.image}
            previewClassName="h-36 w-48 object-cover"
          />
          <TextField
            label="Photo label"
            optional
            hint="The green pill on the photo, e.g. “NMDPRA” for regulated dispensing equipment. Leave it empty for none."
            name="tag"
            maxLength={40}
            defaultValue={values.tag}
          />
          <Checkbox
            label="Best seller"
            hint="Puts a Best Seller badge on the card and its details, and a green edge on the card."
            name="best"
            defaultChecked={values.best}
          />
        </Section>

        <Section title="The details panel" intro="What opens from “View details” on the card.">
          <TextField
            label="Top line"
            hint="The pill above the name, e.g. “NMDPRA compliant · MEGA-TEC supply & install”."
            name="badge"
            required
            maxLength={120}
            defaultValue={values.badge}
          />
          <RowList
            label="Details"
            hint={
              <>
                The grid of short facts, three across: a label and its value, e.g. Flow rate · 5–50 L/min. The site search
                also finds products by these values.
                {filtered && " This page's Meter filter looks for “Bennett” or “Tokheim” in the row labelled Metering."}
              </>
            }
            initial={values.details}
            blank={["", ""] as [string, string]}
            addLabel="Add a detail"
            noun="detail"
            max={12}
          >
            {([label, value], n) => (
              <div className="grid gap-2 sm:grid-cols-[11rem_1fr]">
                <input
                  name="detailLabel"
                  defaultValue={label}
                  maxLength={40}
                  placeholder="Label"
                  aria-label={`Detail ${n}: label`}
                  className={inputClass}
                />
                <input
                  name="detailValue"
                  defaultValue={value}
                  maxLength={160}
                  placeholder="Value"
                  aria-label={`Detail ${n}: value`}
                  className={inputClass}
                />
              </div>
            )}
          </RowList>
          <TextArea
            label="Description"
            hint="The paragraph under the details."
            name="description"
            required
            maxLength={2000}
            rows={6}
            defaultValue={values.description}
          />
          <RowList
            label="Extra text"
            optional
            hint="More after the description, block by block: paragraphs, headings and bullet points, e.g. the conversion kit's “How it works”."
            initial={values.extras}
            blank={{ t: "p", x: "" } as DrawerExtra}
            addLabel="Add a block"
            noun="block"
            max={20}
          >
            {(extra, n) => (
              <div className="grid gap-2 sm:grid-cols-[9rem_1fr]">
                <select name="extraKind" defaultValue={extra.t} aria-label={`Block ${n}: kind`} className={inputClass}>
                  {EXTRA_KINDS.map((kind) => (
                    <option key={kind.value} value={kind.value}>
                      {kind.label}
                    </option>
                  ))}
                </select>
                <textarea
                  name="extraText"
                  defaultValue={extra.x}
                  maxLength={800}
                  rows={2}
                  aria-label={`Block ${n}: text`}
                  className={`${inputClass} resize-y leading-relaxed`}
                />
              </div>
            )}
          </RowList>
          <TextField
            label="Warranty"
            hint="The line after the text, e.g. “1-year warranty.”"
            name="warranty"
            required
            maxLength={120}
            defaultValue={values.warranty}
          />
          <SheetField name="sheet" defaultValue={values.sheet} />
        </Section>

        <div className="space-y-6">
          <Checkbox label="Show on the site" hint="Untick to hide the product without deleting it." name="published" defaultChecked={values.published} />
          {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}
          <FormActions pending={pending} cancelHref="/admin/products" saveLabel={id === null ? "Add the product" : "Save changes"} />
        </div>
      </EditorForm>
    </Panel>
  );
}

function Section({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <section className="border-border/70 space-y-6 border-t pt-8">
      <div>
        <h2 className="text-ink text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-body mt-0.5 text-sm">{intro}</p>
      </div>
      {children}
    </section>
  );
}
