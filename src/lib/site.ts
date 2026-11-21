import { readEnv } from "@/lib/env";

export const COMPANY_NAME = "Green Place Solutions Company";
export const SITE_NAME = "Green Place Solutions";
export const CONTACT_EMAIL = "ceo@greenplacesolutions.com";

/**
 * Stripe card authorizations expire after about 7 days. Orders must be
 * approved (captured) or canceled inside that window.
 */
export const AUTHORIZATION_NOTE =
  "Stripe card authorizations expire after about 7 days, so an order must be approved (captured) or canceled inside that window.";

function normalizeSiteUrl(raw: string | undefined) {
  const candidate = raw?.trim() ? raw.trim() : "http://localhost:3000";
  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "http://localhost:3000";
    }
    return url.origin;
  } catch {
    return "http://localhost:3000";
  }
}

/** Build-time origin for prerendered metadata, the sitemap, and JSON-LD. */
export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

/**
 * Request-time origin for Stripe return URLs.
 * `readEnv` stays a computed lookup so a value set at image build does not
 * freeze the URL the checkout route sends to Stripe.
 */
export function getRuntimeSiteUrl() {
  return normalizeSiteUrl(readEnv("NEXT_PUBLIC_SITE_URL"));
}
