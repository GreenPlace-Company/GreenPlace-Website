import { PolicyLayout, draftPolicyMetadata } from "@/components/policy-layout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = draftPolicyMetadata(
  "Privacy",
  "Draft privacy policy for Green Place Solutions Company.",
);

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy">
      <p>
        This draft describes the first version of the site. It is not a
        finished privacy notice.
      </p>
      <p>
        The cart is stored in your browser (localStorage). It is not sent to
        Green Place Solutions until you start checkout. The contact page is a
        mailto link. It does not submit a form to this site.
      </p>
      <p>
        Checkout, when enabled, is handled by Stripe. Stripe collects the
        details needed to authorize the card, including name, email, shipping
        address, and payment information. Card numbers are entered on Stripe,
        not on this website. Stripe’s own privacy policy governs that step.
      </p>
      <p>
        The company does not sell personal information in this draft, and it
        does not run an advertising pixel in this version. A final notice
        should name the actual processors, retention periods, and the rights
        available to Pennsylvania and other residents.
      </p>
      <p>
        Privacy questions:{" "}
        <a className="text-moss underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </PolicyLayout>
  );
}
