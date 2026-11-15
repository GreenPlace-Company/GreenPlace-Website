import { Container } from "@/components/container";
import { COMPANY_NAME, CONTACT_EMAIL } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const policyLinks = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="on-dark mt-auto bg-pine text-linen">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Image
            src="/brand/gps-logo-horizontal-reversed.png"
            alt="Green Place Solutions"
            width={600}
            height={247}
            quality={100}
            sizes="194px"
            className="h-20 w-auto"
            style={{ width: "auto" }}
          />
          <p className="mt-3 max-w-sm text-sm leading-6 text-linen/80">
            {COMPANY_NAME}, Pennsylvania. A store for a greener world. Orders
            ship direct from the manufacturer.
          </p>
        </div>
        <nav aria-label="Store">
          <p className="text-xs font-medium tracking-[0.16em] text-linen/60 uppercase">
            Store
          </p>
          <ul className="mt-3 space-y-1">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Policies">
          <p className="text-xs font-medium tracking-[0.16em] text-linen/60 uppercase">
            Policies
          </p>
          <ul className="mt-3 space-y-1">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-linen/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {COMPANY_NAME}, Pennsylvania. © <CopyrightYear /> {COMPANY_NAME}.
          </p>
          <a
            className="inline-flex min-h-11 items-center underline decoration-white/30 underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </Container>
      </div>
    </footer>
  );
}

function CopyrightYear() {
  return <>2026</>;
}
