# Handoff

Working state of the Mega-Tec site build. Update this as things move.

_Last updated: 2026-09-08_

---

## Status at a glance

| | |
|---|---|
| Branch | `chore/image-refresh-and-cleanup` — pushed, clean, in sync with origin |
| `main` | `b0702c6` (31 Jul) — **15 commits behind the branch** |
| Live site | Whatever `main` deploys. **None of this session's work is live.** |
| Deploy config | None in the repo. No `vercel.json`, no workflows. Deployment target unconfirmed. |
| Open PRs | None |

The branch is 395 files / +3,581 / −664, of which 38 are code files.

### Before any merge to `main`

1. **The WhatsApp number is wrong on every page.** Code uses `2348062968640`; the Contact
   build document specifies `2349043154982`. Six files. This is a live bug, not a rebuild task.
2. Decide whether to merge at all — the branch contains the `/products/` tree that the new
   copy documents replace (see Decision 2 below).

---

## The two build documents

Written by **Paul**, addressed to Fortune (website engineer). They restructure the site rather
than revise its copy.

- **Landing Page Copy** — LP1–LP4, four Google Ads pages at `/solutions/*`
- **Core Site Pages** — Homepage, About, Projects, Contact

Two supporting documents were produced from them:

- **Asset request** (forwardable to Mega-Tec) — https://claude.ai/code/artifact/6f2958b6-6066-4263-951c-9713b75545fb
- **Impact map** (what the copy does to the existing build) — https://claude.ai/code/artifact/047fba2f-586c-4859-bf7e-920a27be123d

---

## Five open decisions

These determine whether finished work is kept, moved or deleted. Cheaper to answer now.

1. **Do the five `/services/` pages survive?** 875 lines, built, matching their Figma designs.
   Neither document mentions services, and the new nav rule names only a Solutions dropdown and
   a Projects link. Probably an omission rather than a cut — confirm before deleting.
2. **Where do the "See Full Range" links point?** LP1 and LP2 both end their product grids with
   one. They point at the 52-product filterable catalogue, which lives in the `/products/` tree
   that is slated for removal. Suggested: keep the catalogues, move to `/solutions/<page>/range/`.
3. **What happens to Station Accessories?** Has a built page and 21 products, is not one of the
   four landing pages, but is still an option in the Contact form's needs dropdown.
4. **Which head office address is correct?** The two documents disagree (see Known conflicts).
5. **Is the quote-wording ban site-wide?** Answered "four LPs only" before the second document
   arrived; that document's global rules say "anywhere" with no page qualifier and cover the
   remaining four pages. **Proceeding as site-wide** unless corrected.

---

## Work that can proceed now

Nothing below waits on Mega-Tec. Sequenced so foundations land before the pages that use them.

### Phase 0 — live bugs and decided removals

- [ ] WhatsApp number to `2349043154982` (`enquiry-modal.tsx`, `contact-section.tsx`, `stats-cta.tsx`)
- [ ] Phone display to `+234 904 315 4982` / `+234 913 821 0191`
- [ ] Strip quote wording: `enquiry-modal.tsx:227` "Get a Quote", `catalogue.tsx:137`
      "Request a quote", `stats-cta.tsx:59` "Get an instant quote"
- [ ] Delete the three AI-rendered project images (see Known traps)
- [ ] Fix contradicted claims — drop "ISO CERTIFIED" (unsubstantiated, absent from both
      documents), "15+ years" to founded 2012, "500+ projects" to 1,500+ stations

### Phase 1 — shared foundations

- [ ] `lib/gtm.ts` — dataLayer push on every WhatsApp click; GTM snippet behind
      `NEXT_PUBLIC_GTM_ID`. Event shape: `{ event: "whatsapp_click", lp, cta, product }`
- [ ] `StickyContactBar` — name / phone / WhatsApp, fixed on all pages. Must be reconciled with
      the existing header, which already changes on scroll
- [ ] `PhoneInput` — Nigeria flag, +234 format
- [ ] `ConversionForm` — green background, five field variants (LP1/Home/About/Projects, LP2,
      LP3, LP4, Contact), each with its own WhatsApp pre-fill template
- [ ] `TrustBar2x2` — both documents say explicitly **not** a horizontal row
- [ ] Product card badges — Best Seller, NMDPRA, featured border `1.5px #1D9E75`
- [ ] `ProductDrawer` — behind every "View details"
- [ ] Schema.org helpers — `Product` on cards, `BreadcrumbList` on trails
- [ ] Spec-download modal rebuilt **without `position: fixed`** (current `ModalShell` uses
      `fixed inset-0`). A native `<dialog>` satisfies this
- [ ] Mobile-first pass: 44px tap targets, 2-col grid at 320px and above, 1-col below

### Phase 2 — pages

- [ ] `/about/` rewrite — **fully unblocked, highest content value.** The real founder story
      replaces generic boilerplate. Needs no new assets beyond the workshop photos already on file
- [ ] Four `/solutions/*` landing pages — all copy supplied verbatim; only hero images missing
- [ ] `/contact/` — becomes a real route (currently the `/#contact` anchor)
- [ ] `/projects/` — filter bar, card grid, hidden testimonials block. Cards stay unpublished
      until their details and photos arrive, per the document's own instruction
- [ ] Homepage restructure — six sections. `WorkflowSection`, `WhyChooseUs`, `StatsCta` and
      `ServicesSection` have no slot in the new structure
- [ ] Nav restructure — Solutions dropdown to the four LPs, add Projects & Installations

### Phase 3 — on asset arrival

Drop-in only: hero images, five client logos, founder portrait, certificates, four spec PDFs,
project photos, then publish the project cards and build the coverage map.

---

## Blocked on Mega-Tec

Full detail in the asset request artifact. Summary of what actually stops work:

- **Installation photographs** — the big one. Nothing in the library shows equipment installed
  at a live site. Blocks four hero briefs and the entire Projects page
- **Project card details** — 2 of 8 written, 0 of 8 photographed
- **Five client logos** — only MRS on file, and permission to display each is unconfirmed
- **Head office address and public email** — both unconfirmed
- **GTM container ID + Google Ads conversion ID/label**
- Founder portrait, SON/MAN/IPMAN certificates, four spec PDFs, testimonial attribution for two
  unattributed quotes, confirmed state list for the coverage map, branch addresses

---

## Known conflicts in the source documents

- **Head office address.** Landing pages doc: _9E LSDPC, Apapa-Oshodi Expressway_. Core pages
  doc: _Texlon House, opposite Fatgbems filling station_. Both by Jakande bus stop, Mile 2 —
  different buildings. The map embed is a global rule on every page.
- **Two client lists.** Copy documents: Nepal Energies, Sterling, Masters Energy, MRS, NIPCO,
  American Embassy. Figma: Northwest, Mikano, MRS, eterna, FMN, ENYO, Dangote. Only MRS appears
  on both.
- **Document dates.** Landing pages doc is headed June 2026 and footed May 2026.

---

## Known traps in this repo

Things that have already cost time. Read before touching assets.

- **`public/images/factory/staff/` is misnamed.** It holds 121 real photographs of the assembly
  floor and workshop — engineers assembling and testing dispensers, finished units wrapped for
  delivery, warehouse stock, team group shots — not staff portraits. Filenames are PhotoRec
  recovery output (`recup-dir1f*.jpg`) and say nothing about content. This is the best imagery in
  the project. **Consent for public use is unconfirmed (asset request item 10).**
- **Many `public/images/factory/` files are equipment nameplates**, not product photographs —
  metal serial-number plates that look plausible by aspect ratio. Always view an image before
  wiring it into a page. Contact sheets are the fast way to check a folder.
- **Three project images are AI renders**, not real installations: `project-abuja-ev.png`,
  `project-lagos-metro.png`, `project-port-harcourt.png`. Unbranded equipment, scenery that
  doesn't match the named locations. They must not carry into `/projects/`, where they would sit
  under real client names.
- **`rectangle-*.png` are the design's own product photography.** An earlier pass overwrote three
  of them assuming they were stock; they were restored from `b0702c6`. Don't re-overwrite them.
  The hero has its own `hero-dispenser.png` so it no longer shares a file with the product tile.
- **Google Sans Flex is self-hosted** from `app/fonts/` via `next/font/local`, because Next has no
  fallback metrics for it. See `app/fonts/README.md` — there is an outstanding OFL licence-text
  TODO there.
- **`next/font/google` can fail the build on a network blip** (`Failed to fetch Inter Tight`).
  It is transient; retry. Moving Inter Tight local too would remove the failure mode.
- **`AGENTS.md` rule:** this Next.js version has breaking changes. Read the relevant guide in
  `node_modules/next/dist/docs/` before writing code.

---

## Asset inventory

| Asset | Count | Notes |
|---|---|---|
| Product photographs | 319 | `public/images/factory/` — covers nearly the full range |
| Assembly/workshop photographs | 121 | `factory/staff/` — see traps above |
| Product datasheets (PDF) | 40 | `public/spec-sheets/` |
| Client logos | 7 | `public/images/clients/` — from Figma; only MRS matches the copy doc |
| Figma exports | 38 | `public/figma/` — design reference, not used at runtime |
| Catalogue products | 52 | `lib/catalogue.ts` |
