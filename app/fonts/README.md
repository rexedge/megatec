# Vendored fonts

## google-sans-flex-latin.woff2

The **latin** subset of [Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex),
byte-identical to the file Google serves. It was taken from `.next/static/media`
after a build, where `next/font/google` had already downloaded and self-hosted
it, so it is exactly what the site was shipping before.

**Licence:** SIL Open Font License. Google's font metadata API reports
`"license": "ofl"` and `"isOpenSource": true` for this family —
`https://fonts.google.com/metadata/fonts/Google+Sans+Flex`.

> **TODO:** the OFL requires its licence text to be distributed with the font.
> Google Sans Flex is not (yet) published under `ofl/` in the `google/fonts`
> GitHub repository, and the Google Fonts download endpoint serves an app shell
> rather than the zip, so the authentic `OFL.txt` — including its copyright
> line — could not be retrieved automatically. Download the family from
> fonts.google.com and drop the `OFL.txt` from that zip into this directory.

### Why it is loaded from disk

Next.js resolves fallback font metrics from a precalculated table at
`next/dist/server/capsize-font-metrics.json`, which does not list Google Sans
Flex. Without those metrics the Google loader cannot emit a size-adjusted
fallback `@font-face`, so body text painted in unadjusted Arial and reflowed
when the webfont arrived:

```
Failed to find font override values for font `Google Sans Flex`
Skipping generating a fallback font.
```

`next/font/local` measures the file with fontkit instead of consulting that
table, so the `Google Sans Flex Fallback` face is generated and the shift goes
away. Next's own source carries a TODO saying the Google loader should work
this way too.

### Coverage

Only the latin subset is vendored. Every character in this repository's source
falls inside it; text a visitor types into a form that does not (Cyrillic,
Vietnamese, CJK) falls through to Arial per glyph, as it would for any missing
glyph. If the site ever needs those scripts, vendor the matching subset files
and give each its own `unicode-range` via the loader's `declarations`.
