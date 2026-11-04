/**
 * Each product category's outline icon on a 24px grid (products-dropdown.html), by the
 * category's slug. The PRODUCTS menu draws them on its tiles, and StandInArt in the middle of
 * a picture that has no photo yet. Draw with stroke="currentColor" and no fill.
 */
export const CATEGORY_GLYPHS: Record<string, React.ReactNode> = {
  "fuel-solutions": (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M3 21h12" />
      <path d="M7 7h4v3H7z" />
      <path d="M14 10h2a2 2 0 0 1 2 2v4.5a1.5 1.5 0 0 0 3 0V8l-3-3" />
    </>
  ),
  "cng-solutions": (
    <>
      <path d="M10 2.5h4" />
      <path d="M12 2.5V5" />
      <path d="M8 9a4 4 0 0 1 8 0v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
      <path d="M8 12.5h8" />
      <path d="M8 16.5h8" />
    </>
  ),
  "lpg-solutions": (
    <>
      <path d="M9 6V3.5h6V6" />
      <path d="M5.5 10a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2z" />
      <path d="M12 18.5c-1.3 0-2.2-.9-2.2-2 0-1.4 1.3-2 2.2-3.5.9 1.5 2.2 2.1 2.2 3.5 0 1.1-.9 2-2.2 2z" />
    </>
  ),
  "ev-chargers": (
    <>
      <path d="M9 2.5V6" />
      <path d="M15 2.5V6" />
      <path d="M6 6h12v4a6 6 0 0 1-12 0z" />
      <path d="M12 16v5.5" />
      <path d="M12.8 8l-2 3h2.4l-2 3" />
    </>
  ),
  "station-accessories": (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
  ),
};
