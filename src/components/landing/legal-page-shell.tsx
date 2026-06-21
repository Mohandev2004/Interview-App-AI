import Link from "next/link";
import AppHeader from "@/components/layout/app-header";
import SiteFooter from "@/components/landing/site-footer";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

interface LegalPageShellProps {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageShell({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader variant="marketing" />

      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <Separator className="my-8" />

        <article className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground [&_h2]:text-base [&_h2]:font-medium [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
          {children}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
