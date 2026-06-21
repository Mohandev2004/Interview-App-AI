"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants/landing";
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
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function HowItWorksSection() {
  return (
    <LandingSection id="how-it-works">
      <LandingSectionHeader
        eyebrow="How it works"
        title="Get interview-ready in three steps"
        description="From session setup to AI-powered review — a focused flow designed for real interview prep."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className={cn(
          LANDING_CONTENT_CLASS,
          "grid gap-px overflow-hidden rounded-lg border border-border/80 bg-border/80 md:grid-cols-3"
        )}
      >
        {HOW_IT_WORKS_STEPS.map((step) => (
          <motion.div
            key={step.step}
            variants={item}
            className="flex flex-col gap-2 bg-background p-4 transition-colors duration-300 hover:bg-accent/15"
          >
            <span className="font-mono text-[10px] text-muted-foreground">
              {step.step}
            </span>
            <h3 className="text-sm font-medium tracking-tight">{step.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </LandingSection>
  );
}
