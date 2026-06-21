import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const LANDING_SECTION_CLASS = "py-16 md:py-20";
export const LANDING_CONTENT_CLASS = "mx-auto max-w-4xl";

interface LandingSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function LandingSection({
  id,
  children,
  className,
}: LandingSectionProps) {
  return (
    <section id={id} className={cn(LANDING_SECTION_CLASS, className)}>
      {children}
    </section>
  );
}

interface LandingSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export function LandingSectionHeader({
  eyebrow,
  title,
  description,
  className,
}: LandingSectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-2xl text-center",
        className
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
}
