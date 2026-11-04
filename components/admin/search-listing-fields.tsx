"use client";

import { useState } from "react";
import { TextArea, TextField } from "@/components/admin/fields";
import { SITE_URL } from "@/lib/site";

/** About how much of each Google shows before cutting it short. */
const TITLE_SHOWN = 60;
const DESCRIPTION_SHOWN = 155;

function cut(text: string, shown: number) {
  return text.length > shown ? `${text.slice(0, shown).trimEnd()}…` : text;
}

/**
 * A page's title and description for search engines, with a preview of how Google lists
 * the page. The title is also the browser tab's.
 */
export function SearchListingFields({
  path,
  title: startTitle,
  description: startDescription,
}: {
  /** The page's address on the site, e.g. /products/fuel-solutions. */
  path: string;
  title: string;
  description: string;
}) {
  const [title, setTitle] = useState(startTitle);
  const [description, setDescription] = useState(startDescription);
  const crumbs = [new URL(SITE_URL).host, ...path.split("/").filter(Boolean)].join(" › ");

  return (
    <div className="space-y-6">
      <TextField
        label="Title in Google"
        hint={`Google's headline for the page, and the browser tab's. It shows about ${TITLE_SHOWN} characters; end it with “| MEGA-TEC” like the other pages. Now ${title.length}.`}
        name="title"
        required
        maxLength={120}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextArea
        label="Description in Google"
        hint={`The lines under the headline. Google shows about ${DESCRIPTION_SHOWN} characters. Now ${description.length}.`}
        name="meta"
        required
        maxLength={320}
        rows={3}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <figure className="border-border/70 rounded-xl border bg-white p-4">
        <figcaption className="text-body mb-2 text-xs font-medium tracking-wide uppercase">How Google may list it</figcaption>
        <p className="truncate text-xs text-[#4d5156]">{crumbs}</p>
        <p className="mt-1 text-lg leading-snug text-[#1a0dab]">{cut(title, TITLE_SHOWN) || "(no title)"}</p>
        <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{cut(description, DESCRIPTION_SHOWN) || "(no description)"}</p>
      </figure>
    </div>
  );
}
