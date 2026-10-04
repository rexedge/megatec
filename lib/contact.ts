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
 * Confirmed by the flyer Mega-Tec supplied in October 2026 (asset request item
 * 4), which agrees with the core pages document. The landing pages document's
 * "9E LSDPC, Apapa-Oshodi Expressway" is superseded.
 */
export const HEAD_OFFICE =
  "Texlon House, opposite Fatgbems filling station, Jakande bus stop, Mile 2, Lagos, Nigeria.";

/**
 * Query string for the Google Maps embed. Google cannot resolve "Texlon House"
 * (or the old "9E LSDPC" string) and answers with pins scattered across Lagos,
 * so this pins the bus stop the address is given by, which it does resolve.
 *
 * TODO(confirm): Google lists a "Mega Tec Pumps" a few hundred metres up the
 * same expressway, under a differently worded address. If Mega-Tec confirm that
 * listing is the head office, pin the business itself instead.
 */
export const MAP_QUERY = "Jakande+Estate+Bus+Stop,+Mile+2,+Lagos,+Nigeria";

/**
 * Branch offices, from the same flyer (asset request item 12). Two typos on it
 * are corrected against public listings: "Jelmot Plaze" and "Falgbems".
 *
 * TODO(confirm): the core pages document also names Enugu and Ibadan, which the
 * flyer leaves out, and no branch has a phone number yet.
 */
export const BRANCHES = [
  {
    city: "Ilorin",
    address: "Jelmot Plaza Complex, beside Saw-Mill, Offa Garage Road, Kwara State",
  },
  {
    city: "Onitsha",
    address:
      "64 Limca Road, near Peoples Club Junction Old Road, former Kessy Filling Station, Nkpor",
  },
  {
    city: "Abuja",
    address: "Nepal Filling Station, Giri Junction, along Gwagwalada–Zuba Road",
  },
  { city: "Abakaliki", address: "62 Afikpo Road, Abakaliki, Ebonyi State" },
  { city: "Aba", address: "29 Okigwe Road, Aba, Abia State" },
  {
    city: "Port Harcourt",
    address: "Suite 07, Christy Plaza, by Bakery Junction, Ozuoba, Rivers State",
  },
];

/**
 * The public address: the contact line and the footer on every page. From
 * Mega-Tec's "Email Formats and Where They Belong" (asset request item 5), in
 * its Word revision of October 2026 — the PDF beside it was an older draft with
 * a separate contact@.
 *
 * The same document puts sales@ behind every enquiry and spec-download form.
 * The forms hand off to WhatsApp and send no email yet, so that half is unbuilt.
 *
 * TODO(setup): megatecpumps.com has no MX records, so nothing sent to either
 * address below arrives until the Zoho mailboxes exist.
 */
export const EMAIL = "sales@megatecpumps.com";

/**
 * Shown in place of EMAIL on the after-sales pages: Maintenance & Repair,
 * Technical Support, and Station Accessories.
 */
export const SUPPORT_EMAIL = "support@megatecpumps.com";

export const RC_NUMBER = "RC 1071309";
