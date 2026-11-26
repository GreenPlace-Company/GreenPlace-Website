import { products } from "@/data/products";
import { getBlogPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = "2026-11-14";
  const staticRoutes = ["", "/shop", "/about", "/contact"];
  const posts = getBlogPosts();

  return [
    ...staticRoutes.map((path, index) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: index === 0 ? 1 : 0.7,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: posts[0]?.date ?? lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
