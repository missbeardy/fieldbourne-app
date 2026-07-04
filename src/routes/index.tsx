import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Inbox,
  LayoutGrid,
  RefreshCw,
  Bell,
  Users,
  Zap,
  Phone,
  MapPin,
  Radio,
} from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  heroStats,
  outcomes,
  paths,
  problemStats,
  site,
} from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FieldBourne Digital — Run your jobs. Not your inbox." },
      {
        name: "description",
        content:
          "One system for leads, scheduling and follow-ups, built around how tradies already work. Bespoke to your trade. Aussie owned.",
      },
      {
        property: "og:title",
        content: "FieldBourne Digital — Run your jobs. Not your inbox.",
      },
      {
        property: "og:description",
        content:
          "Stop juggling five apps. Capture every lead, assign every job, and finish admin before 9pm.",
      },
    ],
  }),
  component: Home,
});

const outcomeIcons = [Inbox, LayoutGrid, RefreshCw, Bell];

function Home() {
  return (
    <>
      <Hero />
      <ProblemBand />
      <PathsSection />
      <OutcomesSection />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-foreground/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              Job management for trade businesses
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tighter text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Run your jobs.
              <br />
              <span className="text-brand">Not your inbox.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              One system for leads, scheduling and follow-ups, built around how you
              already work. No ripping out the apps you use. No retyping the same job
              details three times.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton href={site.bookingUrl}>Book a free chat</CTAButton>
              <Link
                to="/how-it-works"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-foreground/[0.04] px-6 py-4 text-base font-bold text-foreground transition-all hover:border-cyan-accent/60 hover:text-cyan-accent sm:w-auto"
              >
                See the live board
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Bespoke to you", "Your tools connected", "Aussie owned"].map((f) => (
                <div key={f} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-accent" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <CompanionCard />
        </div>
      </div>
    </section>
  );
}

function CompanionCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-brand/30 via-transparent to-cyan-accent/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface/70 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-hairline bg-foreground/[0.03] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/60" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Live now
            </span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            FieldBourne Companion
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            A TV aerial franchise running today
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-hairline bg-foreground/[0.04] p-3 text-center"
              >
                <div className="text-2xl font-black text-cyan-accent sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2.5">
            <FeedRow
              icon={<Phone className="h-4 w-4" />}
              tag="New lead"
              tagColor="text-cyan-accent"
              title="Antenna install, Parramatta"
              sub="Just now"
            />
            <FeedRow
              icon={<Radio className="h-4 w-4" />}
              tag="Missed call"
              tagColor="text-brand"
              title="Penrith · auto-reply sent"
              sub="4 min ago"
            />
            <FeedRow
              icon={<Users className="h-4 w-4" />}
              tag="Assigned"
              tagColor="text-emerald-400"
              title="Job #1041 · In progress"
              sub="Tech: Jake"
            />
            <FeedRow
              icon={<MapPin className="h-4 w-4" />}
              tag="Booked"
              tagColor="text-foreground"
              title="Tomorrow 9am, Mount Druitt"
              sub="Confirmed by SMS"
            />
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-xs">
            <span className="text-muted-foreground">
              Real workflow from our first live client.
            </span>
            <a
              href={site.caseStudyUrl}
              className="inline-flex items-center gap-1 font-bold text-brand hover:text-brand-glow"
            >
              Case study <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedRow({
  icon,
  tag,
  tagColor,
  title,
  sub,
}: {
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-hairline bg-foreground/[0.03] px-3 py-2.5">
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-foreground/[0.05] ${tagColor}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className={`text-[10px] font-bold uppercase tracking-widest ${tagColor}`}>
          {tag}
        </div>
        <div className="truncate text-sm font-semibold text-foreground">{title}</div>
      </div>
      <span className="text-[11px] text-muted-foreground">{sub}</span>
    </div>
  );
}

function ProblemBand() {
  return (
    <section className="border-y border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeader
          eyebrow="Sound familiar?"
          accent="yellow"
          title={
            <>
              Your tools don't talk to each other.{" "}
              <span className="text-brand">You pay for it every day.</span>
            </>
          }
          subtitle="Generic software wasn't built for trade businesses. It was built for offices. So you patch it together with spreadsheets, text messages and hope — and leads still fall through the cracks."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problemStats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-7 transition-all hover:border-brand/40"
            >
              <div className="text-5xl font-black text-cyan-accent sm:text-6xl">{s.value}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-widest text-foreground">
                {s.label}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathsSection() {
  return (
    <section id="paths" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeader
          eyebrow="Which sounds like you?"
          title="Same platform. Different entry point."
          subtitle="Solo operators and franchise head offices need different things. Pick the path that fits and we'll take you to the right next step."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {paths.map((p, i) => (
            <div
              key={p.tag}
              className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 transition-all hover:border-brand/50 sm:p-10"
            >
              <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-brand" />
              <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-brand/60" />
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
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
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-brand/15 text-brand">
                      <Zap className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CTAButton
                  href={p.cta.href}
                  variant={i === 0 ? "ghost" : "primary"}
                >
                  {p.cta.label}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionHeader
          eyebrow="What you get"
          title="Four outcomes. One system."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {outcomes.map((o, i) => {
            const Icon = outcomeIcons[i];
            return (
              <div
                key={o.n}
                className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-7 transition-all hover:border-cyan-accent/50"
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-hairline bg-foreground/[0.04] text-cyan-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-brand">
                      {o.n}
                    </div>
                    <h3 className="mt-1 text-xl font-black tracking-tight text-foreground sm:text-2xl">
                      {o.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {o.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-brand/[0.04] to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brand">
          <span className="h-px w-8 bg-brand" /> Let's talk
        </div>
        <h2 className="text-4xl font-black leading-tight tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          Twenty minutes is all it takes to see if we're a fit.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We'll show you how we saved a franchise client 12 hours a week on admin alone,
          and how FieldBourne Digital can build a system for your business.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href={site.bookingUrl} fullWidthMobile={false} className="min-w-[240px]">
            Book a free chat
          </CTAButton>
          <Link
            to="/contact"
            className="text-sm font-semibold text-muted-foreground hover:text-cyan-accent"
          >
            Or send us a message →
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          No credit card. We respond within one business day.
        </p>
      </div>
    </section>
  );
}
