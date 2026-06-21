"use client";

import AuthProvider from "@/context/auth-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import ThemedToaster from "@/components/layout/themed-toaster";
import type { ReactNode } from "react";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function AppProviders({ children }: { children: ReactNode }) {
  const content = (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <ThemedToaster />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );

  if (!googleClientId) {
    return content;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>{content}</GoogleOAuthProvider>
  );
}
