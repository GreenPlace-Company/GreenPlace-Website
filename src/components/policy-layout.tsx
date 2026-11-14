import { Container } from "@/components/container";
import type { Metadata } from "next";

export function draftPolicyMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/${title.toLowerCase()}` },
  };
}

export function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.16em] text-clay uppercase">
          Draft for review
        </p>
        <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">{title}</h1>
        <p
          role="note"
          className="mt-6 rounded-2xl border border-clay/30 bg-[#f8efe6] px-4 py-3 text-sm leading-6 text-ink"
        >
          <strong>Draft.</strong> This page is a placeholder for review. It is
          not legal advice and it is not the final policy of Green Place
          Solutions Company. Have counsel read it before the store opens.
        </p>
        <div className="mt-8 space-y-4 text-base leading-7 text-ink">{children}</div>
      </article>
    </Container>
  );
}
