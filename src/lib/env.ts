/**
 * Read one environment variable when the request runs.
 *
 * Next.js replaces a direct `process.env.NEXT_PUBLIC_*` access with the
 * build-time value. A computed lookup stays on the process environment, so
 * Cloud Run can inject the value at start without rebuilding the image.
 * Empty strings count as unset.
 */
export function readEnv(name: string) {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
