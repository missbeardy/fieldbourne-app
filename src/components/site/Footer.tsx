import { Link } from "@tanstack/react-router";
import { Wrench, Mail } from "lucide-react";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground">
                <Wrench className="h-4.5 w-4.5" strokeWidth={2.75} />
              </span>
              <span className="text-lg font-black tracking-tight">
                <span className="text-brand">Field</span>
                <span className="text-cyan-accent">Bourne</span>
                <span className="text-brand">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Job management built for Australian trade businesses. One system for leads,
              scheduling and follow-ups.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/60" />
              Live now — FieldBourne Companion
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Explore
            </div>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-foreground/80 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Get in touch
            </div>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-brand"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              🇦🇺 Australian owned & operated
              <br />
              ABN {site.abn}
              <br />
              {site.location}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} FieldBourne Digital. All rights reserved.</span>
          <span className="tracking-widest uppercase">Run your jobs. Not your inbox.</span>
        </div>
      </div>
    </footer>
  );
}
