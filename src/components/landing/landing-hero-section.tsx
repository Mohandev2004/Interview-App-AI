"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { LandingSection } from "@/components/landing/landing-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LandingHeroSectionProps {
  startHref: string;
}

export default function LandingHeroSection({ startHref }: LandingHeroSectionProps) {
  const router = useRouter();

  return (
    <LandingSection className="flex flex-col items-center text-center">
      <Badge variant="secondary" className="mb-4">
        <Sparkles />
        AI Interview Preparation
      </Badge>

      <h1 className="text-balance max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
        Prepare smarter. Practice interviews with AI.
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
        Get instant feedback, structured question sets, and progress tracking in
        a workspace built for ambitious candidates.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button size="lg" onClick={() => router.push(startHref)}>
          Get Started
          <ArrowRight />
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
      </div>
    </LandingSection>
  );
}
