import { createFileRoute } from "@tanstack/react-router";
import {
  MessageSquare,
  Mail,
  Calendar,
  CreditCard,
  Share2,
  Search,
  Receipt,
  BarChart3,
} from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { integrations, site, steps } from "@/content/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — FieldBourne Digital" },
      {
        name: "description",
        content:
          "Proven modules configured for your trade. See the four-step process — from a 20-minute chat to a system that runs itself.",
      },
      { property: "og:title", content: "How FieldBourne Digital works" },
      {
        property: "og:description",
        content:
          "Learn how we wire your existing tools together and configure modules for your trade.",
      },
    ],
  }),
  component: HowItWorks,
});

const iconMap = {
  MessageSquare,
  Mail,
  Calendar,
  CreditCard,
  Share2,
  Search,
  Receipt,
  BarChart3,
};

function HowItWorks() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <SectionHeader
            eyebrow="How FieldBourne Digital works"
            title={
              <>
                Proven modules.{" "}
                <span className="text-brand">Configured for your trade.</span>
              </>
            }
            subtitle="No generic templates. We start with a conversation, wire up the tools you already use, then configure the modules that fit how you actually work."
          />
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative overflow-hidden rounded-2xl border border-hairline bg-surface p-7 transition-all hover:border-brand/50"
              >
                <div className="text-6xl font-black leading-none text-brand/80">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-black tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <SectionHeader
            eyebrow="Works with what you use"
            title="Connect what you already use. Stop retyping."
            subtitle="FieldBourne Digital connects to the tools your business already runs on. A completed job can flow through to invoicing and payments without someone copying details across three apps."
          />

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {integrations.map((i) => {
              const Icon = iconMap[i.icon as keyof typeof iconMap];
              return (
                <div
                  key={i.name}
                  className="group relative flex items-center gap-3 rounded-xl border border-hairline bg-surface p-4 transition-all hover:border-cyan-accent/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-cyan-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-foreground">
                      {i.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {i.sub}
                    </div>
                  </div>
                  {i.soon && (
                    <span className="absolute right-2 top-2 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                      Soon
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
            We're not asking you to rip out your accounting software. We wire your job
            data to where it needs to go.
          </p>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand">
            📺 Live client: FieldBourne Companion
          </div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            A TV installation and aerial franchise:{" "}
            <span className="text-brand">
              from Trello, voicemail, spreadsheets and SMS, to one system.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
            Every lead captured automatically via SMS, email, and missed call. Jobs
            assigned with one click. The owner sees live status across the whole team
            from any device. This is what FieldBourne Digital looks like in a real
            business.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton href={site.caseStudyUrl} fullWidthMobile={false}>
              Read the case study
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
