import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { site, tradeTypes, SITE_URL } from "@/content/site";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    path:
      search.path === "solo" || search.path === "team"
        ? (search.path as "solo" | "team")
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — FieldBourne Digital" },
      {
        name: "description",
        content:
          "Tell us about your business. Darren personally onboards every new client and gets back within one business day.",
      },
      { property: "og:title", content: "Contact FieldBourne Digital" },
      {
        property: "og:description",
        content: "No call centre, no hand-off. Book a free 20-minute chat with Darren.",
      },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const { path } = Route.useSearch();
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <SectionHeader
            as="h1"
            eyebrow="Get in touch"
            title={
              <>
                Tell us about your business.{" "}
                <span className="text-brand">We'll reply within one business day.</span>
              </>
            }
            subtitle="Darren personally onboards every new business. No call centre, no hand-off."
          />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <aside className="space-y-5">
              <InfoCard
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                lines={[site.email]}
                href={`mailto:${site.email}`}
              />
              <InfoCard
                icon={<MapPin className="h-5 w-5" />}
                title="Based in"
                lines={[site.location, "🇦🇺 Australian owned & operated", `ABN ${site.abn}`]}
              />
              <InfoCard
                icon={<Clock className="h-5 w-5" />}
                title="Response time"
                lines={["Within 1 business day", "No credit card. No pressure."]}
              />
              <a
                href={site.bookingUrl}
                className="block rounded-2xl border border-brand/40 bg-brand/10 p-6 transition-all hover:bg-brand/15"
              >
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Prefer to book direct?
                </div>
                <div className="mt-2 text-lg font-black text-foreground">
                  Book a free 20-min chat →
                </div>
              </a>
            </aside>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
                  "FieldBourne enquiry — " + (data.get("name") || "New lead"),
                )}&body=${encodeURIComponent(
                  Array.from(data.entries())
                    .map(([k, v]) => `${k}: ${v}`)
                    .join("\n"),
                )}`;
                setSent(true);
              }}
              className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8"
            >
              {path && (
                <div className="mb-4 rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-foreground">
                  {path === "solo"
                    ? "Self-serve waitlist — leave your details below and you're on it."
                    : "Team or franchise — tell us a bit about the operation and we'll come prepared."}
                </div>
              )}
              <div className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-brand">
                Book a free chat
              </div>
              {path && <input type="hidden" name="enquiry_path" value={path} />}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Business" name="business" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone (optional)" name="phone" type="tel" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-trade"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Trade type (optional)
                </label>
                <select
                  id="contact-trade"
                  name="trade"
                  className="w-full rounded-xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a trade
                  </option>
                  {tradeTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Anything else? (optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="w-full rounded-xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
                  placeholder="Tell us where things are falling through the cracks…"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-brand px-6 py-4 text-base font-bold text-brand-foreground shadow-[0_10px_40px_-10px_var(--brand)] transition-all hover:bg-brand-glow motion-safe:hover:-translate-y-0.5"
              >
                Send message →
              </button>
              {sent && (
                <p className="mt-4 text-center text-sm text-accent-warm">
                  Opening your email app now. If nothing opens, email us directly at{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
      />
    </div>
  );
}

function InfoCard({
  icon,
  title,
  lines,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  href?: string;
}) {
  const inner = (
    <>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-foreground/[0.05] text-accent-warm">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-widest text-brand">{title}</div>
          {lines.map((l) => (
            <div key={l} className="mt-1 truncate text-sm text-foreground/90">
              {l}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  const cls =
    "block rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-accent-warm/40";
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
