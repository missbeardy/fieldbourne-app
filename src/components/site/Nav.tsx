import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { nav, site } from "@/content/site";
import { CTAButton } from "./CTAButton";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-hairline bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground">
            <Wrench className="h-4.5 w-4.5" strokeWidth={2.75} />
          </span>
          <span className="truncate text-base font-black tracking-tight sm:text-lg">
            FieldBourne
            <span className="text-brand">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-foreground bg-foreground/[0.07]" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={site.bookingUrl}
            className="ml-2 hidden rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-all hover:bg-brand-glow md:inline-flex"
          >
            Book a free chat
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-hairline bg-foreground/[0.04] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-brand" }}
                inactiveProps={{ className: "text-foreground" }}
                className="rounded-lg px-3 py-3 text-base font-bold"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <CTAButton href={site.bookingUrl}>Book a free chat</CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
