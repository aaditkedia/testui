import { ReactNode } from "react";

type Tone = "normal" | "critical" | "advisory" | "accent";

const toneStyles: Record<Tone, string> = {
  normal: "text-text-muted border-border",
  accent: "text-accent border-accent/30 bg-accent/5",
  critical: "text-critical border-critical/30 bg-critical/5",
  advisory: "text-advisory border-advisory/30 bg-advisory/5",
};

export default function Pill({
  children,
  tone = "normal",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
