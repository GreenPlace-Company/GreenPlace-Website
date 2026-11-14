export const COMPANY_NAME = "Green Place Solutions Company";
export const SITE_NAME = "Green Place Solutions";
export const CONTACT_EMAIL = "ceo@greenplacesolutions.com";

/**
 * Stripe card authorizations expire after about 7 days. Orders must be
 * approved (captured) or canceled inside that window.
 */
export const AUTHORIZATION_NOTE =
  "Stripe card authorizations expire after about 7 days, so an order must be approved (captured) or canceled inside that window.";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "http://localhost:3000";
    }
    return url.origin;
  } catch {
    return "http://localhost:3000";
  }
}
