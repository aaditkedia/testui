import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-container flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="font-display text-lg font-semibold tracking-tightest">
            {siteConfig.name}
          </Link>
          <p className="mt-2 max-w-xs text-sm text-text-muted">{siteConfig.tagline}</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div className="flex gap-5">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-text-muted transition-colors hover:text-text">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex gap-5">
            {siteConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-container px-5 text-xs text-text-muted/60 sm:px-8">
        &copy; {new Date().getFullYear()} {siteConfig.name}. Template build, swap config to reuse.
      </div>
    </footer>
  );
}
