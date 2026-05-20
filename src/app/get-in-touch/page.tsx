import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Get In Touch" };

export default function GetInTouch() {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-container px-5 pb-24 pt-36 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h1 className="h-section mt-4">Tell us about your grid.</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Operators, utilities, and researchers: reach out and we will set up a working session to map your data
              and constraints to our models.
            </p>
            <p className="mt-8 text-sm text-text-muted">
              Prefer email?{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </div>

          <form className="space-y-5 rounded-2xl border border-border bg-bg-elevated/40 p-7">
            <Field label="Name" name="name" placeholder="Jane Operator" />
            <Field label="Work email" name="email" type="email" placeholder="jane@utility.com" />
            <Field label="Organization" name="org" placeholder="Regional Grid Co." />
            <div>
              <label htmlFor="msg" className="mb-2 block text-sm text-text-muted">
                What are you trying to solve?
              </label>
              <textarea
                id="msg"
                name="msg"
                rows={4}
                placeholder="We need better day-ahead load forecasts for..."
                className="w-full resize-none rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-accent/50"
              />
            </div>
            <Button href="/" className="w-full">
              Send message
            </Button>
            <p className="text-center text-xs text-text-muted/60">
              Demo form, wire to your provider (Resend, Formspree, etc.) in production.
            </p>
          </form>
        </div>

        <div className="mt-16">
          <Link href="/" className="text-sm text-text-muted transition-colors hover:text-text">
            &larr; Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-accent/50"
      />
    </div>
  );
}
