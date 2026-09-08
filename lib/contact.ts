/**
 * Single source of truth for Mega-Tec's contact details.
 *
 * These were previously duplicated across six components, which is how the site
 * ended up pointing every WhatsApp CTA at a number that had been superseded.
 * Change them here; never inline them in a component.
 *
 * Source: "Core Site Pages" build document, Contact §1.
 */

/** Digits only, no "+" — wa.me rejects anything else. */
export const WHATSAPP_NUMBER = "2349043154982";

export const PHONE_PRIMARY = {
  display: "+234 904 315 4982",
  tel: "+2349043154982",
};

export const PHONE_SECONDARY = {
  display: "+234 913 821 0191",
  tel: "+2349138210191",
};

/**
 * TODO(confirm): the two build documents give different head offices — the
 * landing pages document says "9E LSDPC, Apapa-Oshodi Expressway", the core
 * pages document says "Texlon House, opposite Fatgbems filling station". Both
 * sit by Jakande bus stop in Mile 2, but they are different buildings, and this
 * string also drives the map embed. Asset request item 4.
 */
export const HEAD_OFFICE =
  "9E LSDPC, Apapa-Oshodi Expressway, (by Jakande bus stop) Mile 2, Lagos, Nigeria.";

/** Query string for the Google Maps embed, kept in step with HEAD_OFFICE. */
export const MAP_QUERY =
  "9E+LSDPC+Apapa-Oshodi+Expressway+Mile+2+Lagos+Nigeria";

/**
 * TODO(confirm): the core pages document marks the public email as pending.
 * This is the address the site has always shown — confirm it is monitored, or
 * replace it. Asset request item 5.
 */
export const EMAIL = "info@megatecpumps.com";

export const RC_NUMBER = "RC 1071309";
