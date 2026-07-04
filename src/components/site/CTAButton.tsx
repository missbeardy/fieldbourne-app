import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  fullWidthMobile?: boolean;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  fullWidthMobile = true,
}: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold tracking-tight transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-brand text-brand-foreground shadow-[0_10px_40px_-10px_var(--brand)] hover:bg-brand-glow hover:-translate-y-0.5"
      : "border border-foreground/15 bg-foreground/[0.04] text-foreground hover:border-cyan-accent/60 hover:text-cyan-accent hover:bg-foreground/[0.07]";
  const width = fullWidthMobile ? "w-full sm:w-auto" : "";
  return (
    <a href={href} className={`${base} ${styles} ${width} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
