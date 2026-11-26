import { Container } from "@/components/container";
import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <Container className="py-20">
      <h1 className="font-display text-4xl text-pine sm:text-5xl">
        That post is not on the blog.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The link may be old, or the guide has not been published.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-pine px-6 text-sm font-medium text-linen"
      >
        Back to the blog
      </Link>
    </Container>
  );
}
