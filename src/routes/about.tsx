import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { site } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FieldBourne Digital" },
      {
        name: "description",
        content:
          "Built by hand in Beaudesert, QLD. Meet Darren — founder of FieldBourne Digital — and hear from Nick, our first franchise client.",
      },
      { property: "og:title", content: "About FieldBourne Digital" },
      {
        property: "og:description",
        content:
          "Individual problems solved. Zero templates used. Aussie owned and operated.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <SectionHeader
            eyebrow="Built by hand"
            title={
              <>
                Individual problems solved.{" "}
                <span className="text-brand">Zero templates used.</span>
              </>
            }
          />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="mx-auto grid h-32 w-32 shrink-0 place-items-center rounded-3xl bg-linear-to-br from-brand to-brand-glow text-6xl font-black text-brand-foreground md:mx-0">
              D
            </div>
            <div>
              <Quote className="h-8 w-8 text-brand" />
              <blockquote className="mt-4 text-xl leading-relaxed text-foreground sm:text-2xl">
                "I'm Darren. I built FieldBourne Digital because I kept seeing tradies
                duct-taping spreadsheets, text messages and calendars together, losing
                hours to unnecessary admin. FieldBourne Companion was our first build,
                using the same modular approach, configured for their trade.{" "}
                <span className="text-brand">
                  I'd rather show you it working than talk at you about features.
                </span>
                "
              </blockquote>
              <div className="mt-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Darren · Founder, FieldBourne Digital · Beaudesert, QLD
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand">
            From a real client
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Not Darren. <span className="text-brand">Nick, franchise owner.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Our first franchise client on FieldBourne Companion. Full client video
            coming soon.
          </p>

          <div className="relative mt-10 overflow-hidden rounded-3xl border border-hairline bg-surface p-8 sm:p-12">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-accent/10 blur-3xl" />
            <Quote className="h-10 w-10 text-cyan-accent" />
            <blockquote className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              "We saved about <span className="text-brand">12 hours a week</span> on
              admin. Leads land in one place and I book from my phone."
            </blockquote>
            <div className="mt-6 text-sm font-semibold text-muted-foreground">
              TV aerial franchise · FieldBourne Companion · first live client
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
            Want to see it working?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Twenty-minute chat. No sales pitch. We show you what your workflow could
            look like.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton href={site.bookingUrl} fullWidthMobile={false} className="min-w-[240px]">
              Book a free chat
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
