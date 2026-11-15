import { CartLink } from "@/components/cart-link";
import { Container } from "@/components/container";
import { NavFallback, NavMenu } from "@/components/nav-menu";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-linen/90 backdrop-blur-md">
      <Container className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 py-3 md:grid-cols-[auto_1fr_auto]">
        <Link href="/" className="flex min-h-11 items-center">
          <Image
            src="/brand/gps-logo-horizontal.png"
            alt="Green Place Solutions"
            width={600}
            height={247}
            quality={100}
            loading="eager"
            sizes="(min-width: 768px) 194px, 155px"
            className="h-16 w-auto md:h-20"
            style={{ width: "auto" }}
          />
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
