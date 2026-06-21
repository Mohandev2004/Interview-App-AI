"use client";

import { Brain, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants/landing";
import {
  LANDING_CONTENT_CLASS,
  LandingSection,
  LandingSectionHeader,
} from "@/components/landing/landing-section";
import { cn } from "@/lib/utils";

const icons = [Brain, Zap, Database];

export default function TechStackSection() {
  return (
    <LandingSection id="tech">
      <LandingSectionHeader
        eyebrow="Built on a solid foundation"
        title="Powered by modern, production-grade tooling"
        description="Reliable AI, a fast web stack, and secure data — everything you need for focused interview preparation."
      />

      <div className={cn(LANDING_CONTENT_CLASS, "grid gap-px overflow-hidden rounded-lg border border-border/80 bg-border/80 sm:grid-cols-2 lg:grid-cols-3")}>
        {TECH_STACK.map((tech, index) => {
          const Icon = icons[index] ?? Brain;

          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: index * 0.06,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col bg-background p-4 transition-colors duration-300 hover:bg-accent/15"
            >
              <div className="mb-3 flex size-8 items-center justify-center rounded-md border border-border bg-muted/50 transition-colors group-hover:bg-foreground group-hover:text-background">
                <Icon className="size-3.5" />
              </div>
              <h3 className="text-sm font-medium tracking-tight">{tech.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {tech.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </LandingSection>
  );
}
