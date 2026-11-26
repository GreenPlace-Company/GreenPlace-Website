"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/shop") {
    return pathname === "/shop" || pathname.startsWith("/product/");
  }
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }
  return pathname === href;
}

export function NavMenu() {
  const pathname = usePathname();
  return <NavList pathname={pathname} />;
}

export function NavFallback() {
  return <NavList />;
}

function NavList({ pathname }: { pathname?: string }) {
  return (
    <nav aria-label="Primary" className="col-span-2 md:col-span-1 md:col-start-2">
      <ul className="flex flex-wrap gap-1 md:justify-center">
        {links.map((link) => {
          const active = pathname ? isActive(pathname, link.href) : false;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium ${
                  active ? "bg-leaf text-pine" : "text-ink hover:bg-paper"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
