"use client";

import AppHeader from "@/components/layout/app-header";
import CtaSection from "@/components/landing/cta-section";
import FeatureTilesSection from "@/components/landing/feature-tiles-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import LandingHeroSection from "@/components/landing/landing-hero-section";
import SiteFooter from "@/components/landing/site-footer";
import TechStackSection from "@/components/landing/tech-stack-section";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";

export default function HomePage() {
  const { user } = useUser();
  const startHref = user ? "/dashboard" : "/signup";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,hsl(0_0%_100%/0.06),transparent_70%)]" />

      <AppHeader variant="marketing" />

      <main className="relative mx-auto max-w-6xl px-4 md:px-6">
        <LandingHeroSection startHref={startHref} />

        <Separator />

        <FeatureTilesSection />

        <Separator />

        <HowItWorksSection />

        <Separator />

        <TechStackSection />

        <Separator />

        <Separator />

        <CtaSection startHref={startHref} />
      </main>

      <SiteFooter />
    </div>
  );
}
