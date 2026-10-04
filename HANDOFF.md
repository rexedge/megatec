# Handoff

Working state of the Mega-Tec site build. Update this as things move.

_Last updated: 2026-10-04_

---

## Status at a glance

| | |
|---|---|
| Branch | `feat/asset-intake-oct-2026` — the October asset intake, open as PR #1 |
| `main` | `1d1f25c` — Phase 0. `chore/image-refresh-and-cleanup` is fully merged into it |
| Live site | Whatever `main` deploys. **The asset intake is not live until PR #1 merges.** |
| Deploy config | None in the repo. No `vercel.json`, no workflows. Deployment target unconfirmed. |
| Open PRs | #1 — Bring in Mega-Tec's October asset delivery |

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

## Asset intake — October 2026

Mega-Tec's answer to the asset request arrived as `public/Outstanding assets/`, one folder per
request item. Everything used was copied to a permanent home under `public/images/` or
`public/spec-sheets/` with a descriptive name. **All seven folders are processed and the intake
folder has been deleted (2026-10-04)** — it was never committed. The untouched originals went
with it (the 7051px Total photographs, the untrimmed logos and founder photo, the address flyer
and both revisions of the email document), so ask Mega-Tec again if any of those is needed.

| Folder | Request item | Status |
|---|---|---|
| `1_installed_equipment` | 1 (installations), 13 (daughter station) | **Done** |
| `2_Projects_card_photos` | 2 | **Done** |
| `3_Client_logos` | 3 | **Done** |
| `4 & 12_Lagos_&_other_branch_address` | 4, 12 | **Done** |
| `5_Email Address Format` | 5 | **Done** — mailboxes and form email still to set up |
| `7&8_Founder_portrait_and_certification` | 7, 8 | **Done** — portrait only; no certificates were in the folder |
| `Comparison_docs` | 6 (closest match) | **Done** |

### Folder 1 — what went where

- **19 forecourt photographs → `public/images/installations/`.** The first real installation
  photography the project has had, all fuel. Named by station where the canopy is legible —
  Nepal Energies (Umuola ×3, launch day ×2, Nkpor), NIPCO, Total New Yidi Road ×2, Canico,
  Agamebu — and by appearance where it is not. `LP1_.jpg` and `LP1_(7).jpg` were the same shot;
  one copy kept. The two Total shots were 7051px / 14 MB each and were downsized to 3000px
- **Fuel hero** — `/products/fuel-dispensers` now opens on `nepal-umuola-forecourt-1.jpg`
- **CNG hero** — `/products/cng` now opens on `products/cng-tube-trailer.jpg`, a Mega-Tec
  branded tube trailer cut out on white
- **CNG daughter station** — four photographs in `factory/cng-daughter-station/`; the catalogue
  card uses #2 (doors open on the dispenser bay and cylinder bank) in place of the CNG
  dispenser photo it was borrowing
- **EV hero — copied to `products/ev-charger-render.jpg` but not used.** It is a render with a
  headline baked in ("FAST CHARGE. FUTURE READY. The New Standard in Ultra-Fast EV Charging.")
  that would sit on top of the page's own `<h1>`, and "ultra-fast" overstates 40–60 kW chargers.
  Needs a version without the text
- **Still missing from item 1/13:** an LPG hero, any LPG/CNG/EV installation photograph, the LPG
  skid plant and LPG storage tanks
- `products/fuel-dispenser-hero.png` and `products/cng-hero.png` are now unreferenced; left in
  place

### Folder 2 — what went where

Four card-format crops of folder 1 shots, now in `public/images/projects/`: `nepal-energies.jpg`
(the Nkpor station), `canico.jpg`, `nipco.jpg`, `total.jpg` (New Yidi Road, downsized from 7051px).
Two file names carried instructions: **Canico replaces Sterling Oil & Gas** and **Total replaces
MRS** as project cards.

- **Nepal Energies** — the homepage card and the fuel page carousel now show the real photo. The
  LPG page's Nepal card keeps its LPG product shot: the photo shows a fuel forecourt, and that
  card's claim is about LPG units
- **Canico replaces Sterling** on the homepage and the fuel page. No project details came with the
  photo, so the card carries a caption that only describes it — _"Megatec fuel dispensers in
  service on Canico's forecourt."_ — agreed as a stopgap. **Needs Canico's location and a one-line
  outcome from Mega-Tec**
- **Total and NIPCO** have no card on the site yet; their photos wait for the Projects page, and
  both still need location, equipment and outcome
- `ProductProjects` gained an optional `imagePosition` per project, because the wide 16:7 crop
  cut the Nepal logo off the top of its canopy
- The homepage testimonials still quote Sterling Oil & Gas, and that is left in place: the
  instruction only covered the project card, and folder 3 included Sterling's logo (SEEPCO), so
  it is still a client they want shown

### Folder 3 — what went where

Eight logos, numbered 1–8, now in `public/images/clients/` and named by company: Lado Oil,
Masters Energy, SEEPCO (the Sterling group), NIPCO, Nepal Energies, CRCC/CCECC, MRS and the
United States Embassy seal. Each was exported in a large transparent square, so they were trimmed
to the artwork — untrimmed, the wordmarks render a few pixels tall.

- **The homepage hero strip now shows these eight**, in the order Mega-Tec numbered them, in
  place of the seven from the Figma export. This settles the two-client-lists conflict: all six
  clients named in the copy document are here, plus Lado Oil and CRCC/CCECC
- **The six Figma logos were deleted** (Dangote, Enyo, Eterna, FMN, Mikano, Northwest) — none is
  on a client list Mega-Tec has supplied. `mrs.png` was replaced by the supplied colour version
- **The US Embassy seal is shown by decision (2026-10-04)**, pending the same permission check
  as the other logos. Removing it is one line in `components/sections/hero.tsx`
- **Still open:** written permission to display each logo (asset request item 3)

### Folder 4 & 12 — what went where

One image: a cropped Mega-Tec flyer listing the head office and six branches. Nothing was copied
to `public/` — the text was transcribed into `lib/contact.ts`, which is the only place addresses
live.

- **Head office is Texlon House** — _opposite Fatgbems filling station, Jakande bus stop, Mile 2,
  Lagos_. The flyer agrees with the core pages document, so the landing pages document's
  "9E LSDPC" is superseded. Shown in the contact section on every page
- **The map now pins a real place.** Google cannot resolve "Texlon House" or the old "9E LSDPC"
  string — both return pins scattered across Lagos, which is what the site had been showing.
  `MAP_QUERY` now targets _Jakande Estate Bus Stop, Mile 2_, which resolves to one street-level
  pin with the Fatgbems station beside it
- **Six branches** — Ilorin, Onitsha, Abuja, Abakaliki, Aba, Port Harcourt — are in
  `BRANCHES`, and listed in the homepage contact section only (`<ContactSection showBranches />`),
  since that is where the Contact link lands. They move to `/contact/` when it is built
- **Two flyer typos were corrected** against public listings: "Falgbems" → Fatgbems, "Jelmot
  Plaze" → Jelmot Plaza. Punctuation was tidied; the Abuja line's "along Gwagwalada, Zuba road"
  is rendered "along Gwagwalada–Zuba Road". The flyer's "Ebonyi" heading is shown as Abakaliki
- **To put to Mega-Tec:**
  - Enugu and Ibadan are branches in the core pages document but not on the flyer — still open?
  - No branch has a phone number (asset request item 12 asked for one each)
  - Google lists a "Mega Tec Pumps" at _Plot 4 Apapa/Oshodi Expressway, beside Globespin, Coker_,
    a few hundred metres from the bus stop. If that is the head office, its listing address
    should be corrected to match, and the map can then pin the business itself

### Folder 5 — what went where

One document, _Email Formats and Where They Belong_, in two revisions that disagree. The PDF
(made 23 September) has a public `contact@`. The Word file (a Google Docs export of 4 October)
drops `contact@`, makes `sales@` the public address, and adds a CEO mailbox. **The Word revision
was chosen as current (2026-10-04).** Nothing was copied to `public/`; the addresses live in
`lib/contact.ts`. The domain is assumed to be `megatecpumps.com` — the document gives only the
part before the `@`.

| Mailbox | Where it goes | State |
|---|---|---|
| `sales@` | Public: contact line and footer on every page | **Live in the code** |
| `sales@` | Behind every enquiry and spec-download form | **Not built** — forms hand off to WhatsApp and send no email |
| `support@` | Public: Maintenance & Repair, Technical Support, Station Accessories | **Live in the code** |
| `ikennaokpala@` | CEO | No place on the site |
| `accounts@`, `inventory@` | Finance, Inventory | No place on the site |

- `EMAIL` is now `sales@megatecpumps.com` (was `info@`), and `SUPPORT_EMAIL` is new.
  `ContactSection` and `StatsCta` take an `email` prop, which the three after-sales pages set to
  the support address; `ProductHero` takes one too, and Station Accessories uses it to offer
  the address beside its WhatsApp button
- **The footer now carries the public address**, under the wordmark. It had no contact details
  before. Below `lg` the wordmark and address take a row of their own, because a five-column
  cell is too narrow for an email address
- **None of these addresses receives mail yet.** `megatecpumps.com` has no MX records — DNS is on
  Vercel with website records only — so the `info@` the site showed until now was dead too

**Email setup still to do** (the site engineer is doing both, and asked to be reminded):

1. **Zoho Mail** — create `sales@`, `support@`, `accounts@`, `inventory@`, `ikennaokpala@`, and
   add Zoho's MX, SPF and DKIM records in Vercel DNS. Keep `info@` as an alias of `sales@`, since
   it is the address that has been published until now
2. **Resend** — an account and a verified sending domain, then build form delivery to `sales@`.
   Until then the "behind the forms" half of the document cannot be met

### Folder 7 & 8 — what went where

One file, `Founder.jpg`. Despite the folder name, **no certification documents were supplied** —
asset request item 8 (SON, MAN, IPMAN, and what NMDPRA-compliant covers) is still open.

- **The portrait is in `public/images/team/`**: `ikenna-okpala.jpg` (the full frame, trimmed of
  a white strip on the left edge and a strip of stray lettering on the right) and
  `ikenna-okpala-headshot.jpg` (a square head-and-shoulders crop for circular frames)
- **`/about/` now ends its "Our Journey" section with the founder credit** — the circular
  portrait, _Ikenna Okpala, Founder & CEO_. The name comes from Mega-Tec's own labelling (the
  file name, the core pages document, and the CEO mailbox in the email document), which closes
  asset request item 7
- The story text above the credit is still the generic boilerplate, including "founded by a team
  of industry veterans". The real founder story is the Phase 2 `/about/` rewrite

### Comparison docs — what went where

Four "Range Comparison" guides, one per product family (fuel 3 pages, CNG 2, LPG 1, EV 1), each
listing every model with a photo and its key specifications. Text-based PDFs in the same design
as the 40 datasheets. Copied unchanged to `public/spec-sheets/` as `Fuel_Range_Comparison.pdf`,
`CNG_Range_Comparison.pdf`, `LPG_Range_Comparison.pdf` and `EV_Range_Comparison.pdf`.

- **Each product page's "Download product specifications" button now hands over its guide.**
  Until now each handed over one model's datasheet while describing it as the datasheet for the
  whole range. The sentence beside the button is now the guide's own subtitle. This placement
  is an assumption — the folder was unnumbered — on the grounds that asset request item 6 asked
  for exactly four range-level downloads, one per landing page. Station Accessories has no
  guide and keeps its datasheet
- **Three catalogue entries were corrected**, each where the guide and the product's own
  datasheet agreed against `lib/catalogue.ts`:
  - _CNG Refilling Dispenser – Double/Double_ claimed four nozzles across two bays. It is a
    second cabinet design of the double-nozzle unit: two nozzles. Renamed
    _Double Nozzle (2)_ to match the guide; the id is unchanged
  - _CNG Offloading Dispenser_ was filed under 2–30 kg/min. It is 1–70 kg/min, ±1%
  - _Oil Dispenser Pump_ was filed under 5–100 L/min with a gear pump. It is 5–50 L/min,
    ±0.3%, with a vane pump
- **To put to Mega-Tec:**
  - **Gear pump flow rate.** The guide says 80–100 L/min; the gear pump datasheet and the site
    say 5–100 L/min. Left as it is until they say which is right
  - **Five rows in the guides have a blank photo slot** — both gear pumps, the CNG offloading
    dispenser, and both LPG dispensers. LPG dispenser photographs are on file
    (`factory/lpg-single/`, `factory/lpg-double/`); the other three have none, and the site
    borrows other products' photos for them
  - The EV guide calls the home charger wall-mounted but pictures it on a post
  - The guide lists a _Gear Pump – Double Nozzle_ (D1/D2), which has datasheets but no catalogue
    entry
- **Not changed:** the _CNG Storage Tube (40ft)_ card still shows a vehicle cylinder, which is
  the wrong product. The guide pictures the tube trailer, but the only copy on file
  (`products/cng-tube-trailer.jpg`) has garbled lettering that is legible at card size
- The fuel and CNG guides are 3.8 MB and 3.0 MB — heavy for a phone download, and worth asking
  for lighter exports

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
4. ~~**Which head office address is correct?**~~ Texlon House — confirmed by Mega-Tec's flyer,
   October 2026.
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

- **Installation photographs** — partly received (October 2026): 19 fuel forecourts, nothing yet
  for LPG, CNG or EV. Still blocks the LP3 and LP4 hero briefs and the non-fuel Projects cards
- **Project card details** — 4 of 8 photographed (Nepal, Canico, NIPCO, Total), but only Nepal
  has written details. Canico, NIPCO and Total each need location, equipment and outcome
- **Client logo permissions** — all eight logos are received and live; written permission to
  display each one is still unconfirmed
- ~~**Public email**~~ — answered: `sales@` public, `support@` on after-sales pages. The
  mailboxes themselves still have to be created (see Folder 5)
- **GTM container ID + Google Ads conversion ID/label**
- SON/MAN/IPMAN certificates, the gear pump flow rate (see Comparison docs), testimonial
  attribution for two
  unattributed quotes, confirmed state list for the coverage map, branch phone numbers, and
  whether the Enugu and Ibadan branches still exist

---

## Known conflicts in the source documents

- ~~**Head office address.**~~ Resolved October 2026: Texlon House, per Mega-Tec's flyer and the
  core pages doc. The landing pages doc's _9E LSDPC, Apapa-Oshodi Expressway_ is superseded.
- ~~**Two client lists.**~~ Resolved October 2026: the logos Mega-Tec supplied match the copy
  documents' list (Nepal Energies, Sterling, Masters Energy, MRS, NIPCO, American Embassy), plus
  Lado Oil and CRCC/CCECC. The Figma list was a placeholder and its logos are deleted.
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
  installation photography now lives in `public/images/installations/`.
- **Many `installations/` photographs were AI-upscaled from small originals**, and the upscaler
  rewrote the lettering — "PUNP" for "PUMP" in `forecourt-night-yellow-canopy.jpg`, garbled
  canopy names in `forecourt-green-gold-canopy.jpg` and `forecourt-busy-panorama.jpg`. Use those
  at card size only. Safe at full width: the Nepal Umuola and launch-day shots, and the two Total
  shots (Nikon D7100 originals).
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
| Installation photographs | 19 | `public/images/installations/` — fuel forecourts only, see traps above |
| Product datasheets (PDF) | 40 | `public/spec-sheets/` |
| Range comparison guides (PDF) | 4 | `public/spec-sheets/*_Range_Comparison.pdf` — one per product page |
| Client logos | 8 | `public/images/clients/` — supplied by Mega-Tec, trimmed to the artwork |
| Figma exports | 0 | `public/figma/` removed 2026-10-04 — 38 local-only reference screenshots, never committed. Re-export from Figma if needed |
| Catalogue products | 52 | `lib/catalogue.ts` |
