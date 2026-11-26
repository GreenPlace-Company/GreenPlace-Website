import { Marked, type Renderer, type Tokens } from "marked";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Blog posts are one Markdown file each in `content/blog`.
 * The filename is the URL slug: `content/blog/my-post.md` → `/blog/my-post`.
 * `.mdx` files are read the same way and rendered as Markdown.
 *
 * Frontmatter:
 * ---
 * seo_title: "Title used for the document title"
 * meta_description: "Meta description."
 * date: YYYY-MM-DD
 * primary_keyword: main keyword
 * secondary_keywords:
 *   - another keyword
 * ---
 *
 * `title`, `description`, and `keywords` are accepted aliases.
 * Review fields such as `status` are ignored and are not rendered.
 * The markdown body is the article, including its headings.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type BlogPost = {
  slug: string;
  /** Document title and Open Graph title, from `seo_title` or `title`. */
  title: string;
  /** Meta description, from `meta_description` or `description`. */
  description: string;
  /** ISO date `YYYY-MM-DD`. */
  date: string;
  /** Primary keyword first, then secondary keywords. */
  keywords: string[];
  /** First heading in the article, or the document title when there is none. */
  heading: string;
  html: string;
};

const markdownParser = new Marked({ gfm: true, breaks: false });
markdownParser.use({
  renderer: {
    html({ text }: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(text);
    },
    link(this: Renderer, token: Tokens.Link) {
      const href = safeUrl(token.href);
      const inner = this.parser.parseInline(token.tokens);
      if (!href) return inner;
      const title = token.title ? ` title="${escapeAttr(token.title)}"` : "";
      const external = href.startsWith("http://") || href.startsWith("https://");
      const rel = external ? ' rel="noopener noreferrer"' : "";
      return `<a href="${escapeAttr(href)}"${title}${rel}>${inner}</a>`;
    },
    image(this: Renderer, token: Tokens.Image) {
      const href = safeUrl(token.href);
      if (!href) return escapeHtml(token.text);
      const title = token.title ? ` title="${escapeAttr(token.title)}"` : "";
      return `<img src="${escapeAttr(href)}" alt="${escapeAttr(token.text)}"${title} />`;
    },
  },
});

export function formatBlogDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

export function getBlogPosts(): BlogPost[] {
  let filenames: string[];
  try {
    filenames = readdirSync(POSTS_DIR);
  } catch {
    throw new Error(
      "Blog posts are read from content/blog. Add a Markdown file there to publish a post.",
    );
  }

  const posts = filenames
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map((filename) => loadPost(filename));

  posts.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.slug.localeCompare(b.slug);
  });
  return posts;
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}

function loadPost(filename: string): BlogPost {
  const extension = filename.endsWith(".mdx") ? ".mdx" : ".md";
  const slug = filename.slice(0, -extension.length);
  if (!SLUG_PATTERN.test(slug)) {
    fail(
      filename,
      "Name the file with a lowercase slug, such as portable-power-station-home-backup.md.",
    );
  }

  const raw = readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { fields, lists, body } = parseFrontmatter(filename, raw);
  if (fields.slug && fields.slug !== slug) {
    fail(filename, `Frontmatter slug "${fields.slug}" does not match the filename.`);
  }

  const title = fields.seo_title || fields.title;
  const description = fields.meta_description || fields.description;
  const date = fields.date;
  if (!title) fail(filename, "Add seo_title (or title) to the frontmatter.");
  if (!description) {
    fail(filename, "Add meta_description (or description) to the frontmatter.");
  }
  if (!date || !isIsoDate(date)) fail(filename, "Add date: YYYY-MM-DD.");

  const keywords = uniqueKeywords(
    fields.primary_keyword || lists.secondary_keywords
      ? [fields.primary_keyword, ...(lists.secondary_keywords ?? [])]
      : (lists.keywords ?? []),
  );

  return {
    slug,
    title,
    description,
    date,
    keywords,
    heading: firstHeading(body) ?? title,
    html: renderMarkdown(body),
  };
}

function parseFrontmatter(filename: string, raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) fail(filename, "Start the file with frontmatter between --- lines.");

  const fields: Record<string, string> = {};
  const lists: Record<string, string[]> = {};
  let listKey: string | null = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = /^\s+-\s+(.*)$/.exec(line);
    if (item) {
      if (!listKey) fail(filename, `List item is not under a field: ${line.trim()}`);
      lists[listKey].push(unquote(item[1].trim()));
      continue;
    }
    const field = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!field) fail(filename, `Cannot read frontmatter line: ${line}`);
    const key = field[1];
    const value = field[2].trim();
    if (!value) {
      listKey = key;
      lists[key] = [];
      continue;
    }
    listKey = null;
    fields[key] = unquote(value);
  }

  const body = match[0].length
    ? raw
        .slice(match[0].length)
        .replace(/<!--[\s\S]*?-->/g, "")
        .trim()
    : "";
  if (!body) fail(filename, "The post has no article body.");
  return { fields, lists, body };
}

function renderMarkdown(markdown: string) {
  return markdownParser.parse(markdown, { async: false });
}

function firstHeading(markdown: string) {
  for (const line of markdown.split(/\r?\n/)) {
    const match = /^#\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      return match[1]
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`]/g, "")
        .trim();
    }
  }
  return undefined;
}

function uniqueKeywords(values: Array<string | undefined>) {
  const seen = new Set<string>();
  const keywords: string[] = [];
  for (const value of values) {
    const keyword = value?.trim();
    if (!keyword || seen.has(keyword)) continue;
    seen.add(keyword);
    keywords.push(keyword);
  }
  return keywords;
}

function isIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= days[month - 1];
}

function unquote(value: string) {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}

function safeUrl(href: string) {
  const value = href.trim();
  if (!value || value.startsWith("//")) return null;
  if (
    value.startsWith("/") ||
    value.startsWith("#") ||
    value.startsWith("./") ||
    value.startsWith("../")
  ) {
    return value.toLowerCase().includes("javascript:") ? null : value;
  }
  const scheme = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(value);
  if (!scheme) return value;
  const protocol = scheme[1].toLowerCase();
  if (protocol === "https" || protocol === "http" || protocol === "mailto") return value;
  return null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value: string) {
  return escapeHtml(value);
}

function fail(filename: string, message: string): never {
  throw new Error(`Blog post ${filename}: ${message}`);
}
