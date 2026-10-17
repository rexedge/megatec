/**
 * Form submissions emailed to sales@ (punch list SW-05). Shared by the three
 * forms that collect them and by app/api/enquiry/route.ts, which sends them.
 */

export type EnquiryForm = "contact" | "quote" | "spec-sheet";

export type Enquiry = {
  form: EnquiryForm;
  name: string;
  phone: string;
  company?: string;
  email?: string;
  product?: string;
  needs?: string[];
  message?: string;
  /** The spec sheet downloaded, as a site path. */
  sheet?: string;
  /** Honeypot: a hidden field people never see. Bots that fill it are ignored. */
  trap?: string;
};

/** What the browser posts: the enquiry plus the page it was sent from. */
export type EnquiryPayload = Enquiry & { page: string };

/**
 * Emails a copy of a submission to sales@ without making the visitor wait. The
 * WhatsApp chat or download has already opened by the time this runs, and
 * `keepalive` lets the request finish even when a phone switches straight to
 * the WhatsApp app. Failures are logged on the server, never shown to the
 * visitor, whose chat or download has gone through either way.
 */
export function emailEnquiry(enquiry: Enquiry) {
  const payload: EnquiryPayload = { ...enquiry, page: window.location.pathname };
  fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
