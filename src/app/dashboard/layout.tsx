"use client";

import AppHeader from "@/components/layout/app-header";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader variant="app" />
      <main>{children}</main>
    </div>
  );
}
