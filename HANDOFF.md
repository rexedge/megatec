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

1. ~~The WhatsApp number is wrong on every page.~~ Fixed in Phase 0.
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

### Phase 0 — live bugs and decided removals — **DONE**

- [x] WhatsApp number to `2349043154982`. Contact details now live in `lib/contact.ts` —
      a single source of truth, since duplication across six files is what let the number
      go stale in the first place. Never inline them in a component again
- [x] Phone display to `+234 904 315 4982`; the second published number
      `+234 913 821 0191` added to the contact block
- [x] Quote wording stripped: modal title is now "Talk to our team", catalogue CTA is
      "Enquire on WhatsApp", the stats CTA is "Send us a message". Two WhatsApp pre-fill
      messages also said "request a quote" and were reworded
- [x] Three AI-rendered project images deleted, and the fabricated projects they
      illustrated removed with them. The homepage portfolio now carries the two real
      engagements — Nepal Energies and Sterling Oil & Gas — using Paul's copy verbatim
- [x] Contradicted claims fixed. "ISO CERTIFIED" dropped from the stat block, and a second
      ISO claim found in `workflow-section.tsx` ("ISO-certified field engineers") reworded.
      Stats are now Founded 2012 / 1,500+ stations / 3,500+ clients / 80+ engineers,
      all from the Core Site Pages document, About §3
- [x] Four real workshop photographs promoted out of the misnamed `staff/` folder into
      `public/images/operations/` with meaningful names
- [x] Homepage testimonials replaced. The carousel was still quoting the same three
      fabricated projects in text form, which the image cleanup missed because those cards
      carry no image. Now runs Paul's five quotes verbatim (Core Site Pages, Homepage §5);
      three are attributed, two render without attribution pending item 9
- [x] Inter Tight self-hosted alongside Google Sans Flex. `next/font/google` fetches from
      `fonts.googleapis.com` at build time, and that fetch failed six times during this
      phase, each failure taking the whole build down. Both faces now load from
      `app/fonts/`, so builds no longer depend on the network

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
- **Three project images were AI renders** — `project-abuja-ev.png`, `project-lagos-metro.png`,
  `project-port-harcourt.png`. Deleted in Phase 0, along with the invented projects they
  illustrated. If anything resembling them reappears, it is not a real installation. Real
  installation photography is asset request item 1 and has not arrived yet.
- **`rectangle-*.png` are the design's own product photography.** An earlier pass overwrote three
  of them assuming they were stock; they were restored from `b0702c6`. Don't re-overwrite them.
  The hero has its own `hero-dispenser.png` so it no longer shares a file with the product tile.
- **Both webfonts are self-hosted** from `app/fonts/` via `next/font/local` — Google Sans Flex
  because Next has no fallback metrics for it, Inter Tight because the build-time fetch from
  `fonts.googleapis.com` kept failing. Do not move either back to `next/font/google`.
  `app/fonts/README.md` explains both, and carries an outstanding OFL licence-text TODO for
  Google Sans Flex (Inter Tight's OFL text is in the folder).
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
