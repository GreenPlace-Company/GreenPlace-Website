import { Container } from "@/components/container";
import { COMPANY_NAME, CONTACT_EMAIL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email Green Place Solutions Company at ceo@greenplacesolutions.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.16em] text-moss uppercase">
          {COMPANY_NAME}
        </p>
        <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">Contact</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">
          Email is the way to reach the company — orders, product questions, and
          the draft policies. This page does not include a form, and it does not
          store a message.
        </p>
        <p className="mt-8">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-h-12 items-center font-display text-3xl text-pine underline decoration-sand decoration-2 underline-offset-8 sm:text-5xl"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-8 text-sm leading-6 text-muted">
          Pennsylvania. The store drop-ships and holds no inventory.
        </p>
      </article>
    </Container>
  );
}
