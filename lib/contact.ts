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
 * Google Maps embed for every contact section, pinned to the head office
 * (punch list SW-12). Google knows the building as "Texlon", plus code
 * F879+J8V, Coker: on the Apapa–Oworonshoki Expressway directly across from
 * Fatgbems Gas and Petrol Station at the Jakande bus stop, which is exactly
 * the address above. Naming the plus code keeps the pin exact even if the
 * listing is renamed, and zoom 17 keeps Fatgbems and the bus stop in view.
 *
 * Google also has a "Mega Tec Pumps" listing about 600 m north-east, at "Plot 4
 * Apapa/Oshodi Expressway, beside Globespin, Coker". It is not this address;
 * Mega-Tec may want to correct or claim it.
 */
export const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Texlon,+F879%2BJ8V,+Coker,+Lagos,+Nigeria&z=17&output=embed";

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
 * The same document puts sales@ behind every enquiry and spec-download form:
 * all three forms email a copy of each submission there through /api/enquiry,
 * which signs in to the website@ mailbox. The domain's mail is hosted at
 * QServers (MX mail.megatecpumps.com), as of October 2026.
 */
export const EMAIL = "sales@megatecpumps.com";

/**
 * Shown in place of EMAIL on the two after-sales pages only: Maintenance &
 * Repair and Technical Support (punch list SW-05). Station Accessories shows
 * sales@ (PA-01).
 */
export const SUPPORT_EMAIL = "support@megatecpumps.com";

export const RC_NUMBER = "RC 1071309";
