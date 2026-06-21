"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { useTheme } from "@/components/layout/theme-provider";

export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Sonner richColors closeButton position="top-center" theme={theme} />
  );
}
