import { PolicyLayout, draftPolicyMetadata } from "@/components/policy-layout";
import { AUTHORIZATION_NOTE, COMPANY_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata = draftPolicyMetadata(
  "Terms",
  "Draft terms for Green Place Solutions Company.",
);

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms">
      <p>
        These draft terms are for {COMPANY_NAME}, a Pennsylvania corporation.
        They are not the final customer agreement.
      </p>
      <p>
        The catalog currently on the site is sample data. A product whose name
        starts with “Sample” is a placeholder. It is not an offer to sell that
        item, and the specifications are not warranties.
      </p>
      <p>
        When real products replace the samples, an order is an authorization,
        not a completed sale, until the company approves it and captures the
        payment. {AUTHORIZATION_NOTE} If the hold expires, the order is not
        paid and has to be placed again.
      </p>
      <p>
        The company does not warehouse the goods. Title, shipping risk, and
        manufacturer warranties need to be spelled out in the final terms with
        counsel. Nothing on this page limits a right that cannot legally be
        limited.
      </p>
      <p>
        Questions:{" "}
        <a className="text-moss underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </PolicyLayout>
  );
}
