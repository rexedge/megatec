/**
 * The address keys of things added in the admin (a product, a product page), made from
 * their names. A key never changes after it is made, so links to it keep working.
 */

/** "MT PLUS – Single Nozzle (TB)" → "mt-plus-single-nozzle-tb"; `fallback` for a name with no letters. */
export function keyFromName(name: string, fallback: string) {
  return (
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60)
      .replace(/-$/, "") || fallback
  );
}

/** The first of key, key-2, key-3… that is not taken. */
export function firstFreeKey(key: string, taken: Set<string>) {
  let free = key;
  for (let n = 2; taken.has(free); n++) free = `${key}-${n}`;
  return free;
}
