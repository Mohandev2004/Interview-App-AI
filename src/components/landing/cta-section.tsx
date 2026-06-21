import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  LANDING_CONTENT_CLASS,
  LandingSection,
  LandingSectionHeader,
} from "@/components/landing/landing-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  startHref: string;
}

export default function CtaSection({ startHref }: CtaSectionProps) {
  return (
    <LandingSection id="get-started">
      <LandingSectionHeader
        eyebrow="Get started"
        title="Ready to start your next practice session?"
        description="Create a session, generate tailored questions, and get AI-powered explanations as you learn."
      />

      <div
        className={cn(
          LANDING_CONTENT_CLASS,
          "flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        )}
      >
        <Button size="lg" asChild>
          <Link href={startHref}>
            Get started free
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </LandingSection>
  );
}
