import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  accent?: "brand" | "warm";
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  accent = "brand",
  as: Heading = "h2",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const textCls = accent === "warm" ? "text-accent-warm" : "text-brand";
  const lineCls = accent === "warm" ? "bg-accent-warm" : "bg-brand";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <div
          className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${textCls}`}
        >
          <span className={`h-px w-8 ${lineCls}`} aria-hidden="true" />
          {eyebrow}
        </div>
      )}
      <Heading className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
