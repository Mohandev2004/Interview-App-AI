"use client";

import { motion } from "framer-motion";
import { App_FEATURES } from "@/lib/constants";
import FeatureTile from "@/components/landing/feature-tile";
import {
  LANDING_CONTENT_CLASS,
  LandingSection,
  LandingSectionHeader,
} from "@/components/landing/landing-section";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const tileSpans = Array.from({ length: 6 }, () => "sm:col-span-1 lg:col-span-1");

export default function FeatureTilesSection() {
  return (
    <LandingSection id="features">
      <LandingSectionHeader
        eyebrow="What's included"
        title="Everything you need to interview with confidence"
        description="Track your progress, review AI feedback, and practice with role-specific sessions."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className={cn(
          LANDING_CONTENT_CLASS,
          "overflow-hidden rounded-lg border border-border/80 bg-border/80"
        )}
      >
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {App_FEATURES.map((feature, index) => (
            <FeatureTile
              key={feature.id}
              feature={feature}
              index={index}
              className={cn(tileSpans[index])}
            />
          ))}
        </div>
      </motion.div>
    </LandingSection>
  );
}
