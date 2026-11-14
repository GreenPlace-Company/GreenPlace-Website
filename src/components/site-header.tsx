import { CartLink } from "@/components/cart-link";
import { Container } from "@/components/container";
import { NavFallback, NavMenu } from "@/components/nav-menu";
import Link from "next/link";
import { Suspense } from "react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-linen/90 backdrop-blur-md">
      <Container className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 py-3 md:grid-cols-[auto_1fr_auto]">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 text-pine">
          <LeafMark />
          <span className="leading-none">
            <span className="block font-display text-lg">Green Place</span>
            <span className="mt-1 block text-[0.62rem] font-medium tracking-[0.18em] text-muted uppercase">
              Solutions
            </span>
          </span>
        </Link>
        <div className="justify-self-end md:col-start-3">
          <CartLink />
        </div>
        <Suspense fallback={<NavFallback />}>
          <NavMenu />
        </Suspense>
      </Container>
    </header>
  );
}

function LeafMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="12" fill="#143028" />
      <path
        d="M10 22c6-1 10-6 16-12-1 8-5 13-12 16-2 .6-4 .2-4-4Z"
        fill="#e7f2df"
      />
      <path
        d="M14 23c3-3 6-7 9-11"
        fill="none"
        stroke="#143028"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
