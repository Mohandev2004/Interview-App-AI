"use client";

import type { ReactNode } from "react";
import AuthBrandingPanel from "@/components/auth/auth-branding-panel";
import ThemeToggle from "@/components/layout/theme-toggle";

interface AuthSplitLayoutProps {
  children: ReactNode;
}

export default function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <AuthBrandingPanel />

        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
          <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
            <ThemeToggle />
          </div>
          <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
            <div className="w-full max-w-[420px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
