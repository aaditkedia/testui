"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import Button from "./Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled ? "border-b border-border bg-bg/70 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tightest">
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href={siteConfig.cta.href}>{siteConfig.cta.label}</Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-6 bg-text transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`block h-px w-6 bg-text transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-6 bg-text transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pt-24 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {siteConfig.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="font-display text-3xl font-semibold tracking-tightest"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-10">
              <Button href={siteConfig.cta.href} className="w-full">
                {siteConfig.cta.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
