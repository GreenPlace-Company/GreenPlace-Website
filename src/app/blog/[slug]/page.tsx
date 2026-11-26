import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { formatBlogDate, getBlogPost, getBlogPosts } from "@/lib/blog";
import { COMPANY_NAME, getSiteUrl, SITE_NAME } from "@/lib/site";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/blog/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  const previous = await parent;
  const canonical = `/blog/${post.slug}`;
  const publishedTime = `${post.date}T00:00:00.000Z`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical },
    authors: [{ name: COMPANY_NAME, url: getSiteUrl() }],
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      url: canonical,
      publishedTime,
      authors: [COMPANY_NAME],
      images: previous.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: previous.twitter?.images,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;

  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.heading,
            description: post.description,
            keywords: post.keywords.join(", "),
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "en-US",
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: {
              "@type": "Organization",
              name: COMPANY_NAME,
              url: siteUrl,
            },
            publisher: {
              "@type": "Organization",
              name: COMPANY_NAME,
              url: siteUrl,
            },
          }}
        />
        <p className="text-xs font-medium tracking-[0.16em] text-moss uppercase">
          <Link href="/blog" className="underline">
            Blog
          </Link>
        </p>
        <p className="mt-3 text-sm text-muted">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        </p>
        <div className="blog-prose mt-6" dangerouslySetInnerHTML={{ __html: post.html }} />
        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/blog" className="text-moss underline">
            All posts
          </Link>
          <Link href="/shop" className="text-moss underline">
            Browse the shop
          </Link>
        </p>
      </article>
    </Container>
  );
}
