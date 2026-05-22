/**
 * Prefix a /public asset path with the configured base path.
 *
 * Routes and next/image get the basePath applied automatically, but plain
 * <img src="/..."> tags do not, so they would 404 on GitHub Pages (served from
 * /testui). Wrap those paths with asset() so they resolve in both dev and prod.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
