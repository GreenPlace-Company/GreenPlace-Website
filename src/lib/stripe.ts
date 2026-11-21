import { readEnv } from "@/lib/env";
import Stripe from "stripe";

/** Both keys must be set before the store offers checkout. */
export function isCheckoutConfigured() {
  return Boolean(
    readEnv("STRIPE_SECRET_KEY") &&
      readEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
  );
}

export function getStripe() {
  const key = readEnv("STRIPE_SECRET_KEY");
  if (!key) return null;
  return new Stripe(key, { typescript: true });
}
