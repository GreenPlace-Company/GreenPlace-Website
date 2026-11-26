import { Container } from "@/components/container";
import { formatBlogDate, getBlogPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

const description =
  "Plain-English guides from Green Place Solutions on portable power stations and backup power for the home.";

export async function generateMetadata(
  _props: PageProps<"/blog">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previous = await parent;
  return {
    title: "Blog",
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: "Blog",
      description,
      url: "/blog",
      images: previous.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog",
      description,
      images: previous.twitter?.images,
    },
  };
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.16em] text-moss uppercase">
          Guides
        </p>
        <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">Blog</h1>
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>
        {posts.length === 0 ? (
          <p className="mt-10 text-base leading-7 text-ink">No posts yet.</p>
        ) : (
          <ul className="mt-10 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-3xl border border-sand bg-paper p-6 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <time
                      dateTime={post.date}
                      className="text-xs font-medium tracking-[0.14em] text-moss uppercase"
                    >
                      {formatBlogDate(post.date)}
                    </time>
                    <h2 className="mt-2 font-display text-2xl leading-tight text-pine group-hover:underline sm:text-3xl">
                      {post.heading}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{post.description}</p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
