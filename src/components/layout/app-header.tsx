"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import ProfileInfoCard from "@/components/shared/profile-info-card";
import ThemeToggle from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";

interface AppHeaderProps {
  variant?: "marketing" | "app";
}

export default function AppHeader({ variant = "app" }: AppHeaderProps) {
  const { user } = useUser();
  const isMarketing = variant === "marketing";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div
        className={cn(
          "mx-auto flex h-14 items-center justify-between px-4 md:px-6",
          isMarketing ? "max-w-6xl" : "max-w-6xl"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
            <span className="text-xs font-semibold">IA</span>
          </div>
          <span className="text-sm font-medium tracking-tight">Interview AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <ProfileInfoCard />
          ) : isMarketing ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
              <Button size="sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          ) : (
            <ProfileInfoCard />
          )}
        </div>
      </div>
    </header>
  );
}
