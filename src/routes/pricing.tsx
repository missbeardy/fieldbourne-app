import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Sparkles, Wrench } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { paths, pricingIncludes, site } from "@/content/site";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — FieldBourne Digital" },
      {
        name: "description",
        content:
          "Foundational client pricing: premium features at our entry rate. One-time implementation fee plus a flat monthly subscription, quoted on your free chat.",
      },
      { property: "og:title", content: "Pricing — FieldBourne Digital" },
      {
        property: "og:description",
        content:
          "Premium features at our entry rate. No per-user charges. No lock-in.",
      },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <SectionHeader
            eyebrow="Same platform. Different entry point."
            accent="yellow"
            title="Pick the path that fits your business."
            subtitle="Solo operators and franchise head offices need different things. We take you to the right next step from here."
          />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((p, i) => (
              <div
                key={p.tag}
                className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 transition-all hover:border-brand/50 sm:p-10"
              >
                <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-cyan-accent/60" />
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-accent">
                  {p.tag}
                </div>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CTAButton href={p.cta.href} variant={i === 0 ? "ghost" : "primary"}>
                    {p.cta.label}
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <SectionHeader
            eyebrow="Foundational Client"
            title={
              <>
                Premium features at{" "}
                <span className="text-brand">our entry rate.</span>
              </>
            }
            subtitle="As a new business, we are taking on a small number of foundational clients. You get the full professional build while we grow. There is a one-time implementation fee plus a flat monthly subscription. We quote both on your free chat, so you know what you're in for before anything starts."
          />

          <div className="relative mt-14 overflow-hidden rounded-3xl border border-hairline bg-surface p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  <Sparkles className="h-3.5 w-3.5" />
                  Foundational Client
                </div>
                <h3 className="mt-5 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  Implementation + subscription
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Quoted on your free chat. No surprises.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Full platform access for early clients who help shape the product.
                  Premium features without the premium price tag while we build our
                  client base.
                </p>

                <div className="mt-8">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-accent">
                    What we do
                  </div>
                  <ul className="space-y-2.5">
                    {pricingIncludes.services.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-foreground/90">
                        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <CTAButton href={site.bookingUrl}>Book a free chat</CTAButton>
                  <p className="mt-3 text-xs text-muted-foreground">
                    No per-user charges. No lock-in contracts. Exact costs confirmed on
                    the call.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-hairline bg-background/60 p-6 backdrop-blur">
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  What you get
                </div>
                <ul className="space-y-3.5">
                  {pricingIncludes.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-brand/15 text-brand">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
