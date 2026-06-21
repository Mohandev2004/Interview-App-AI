"use client";

import { motion } from "framer-motion";
import type { AppFeature } from "@/types";
import { cn } from "@/lib/utils";
import FeatureTileVisual from "@/components/landing/feature-tile-visual";

interface FeatureTileProps {
  feature: AppFeature;
  index: number;
  className?: string;
}

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

export default function FeatureTile({
  feature,
  index,
  className,
}: FeatureTileProps) {
  return (
    <motion.article
      variants={item}
      className={cn(
        "group relative flex flex-col bg-background p-4 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-accent/15",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>

      <div className="relative mb-4 overflow-hidden rounded-md border border-border/70 bg-[hsl(0_0%_4%)]">
        <div className="feature-tile-grid absolute inset-0 opacity-30" />
        <div className="relative h-28 overflow-hidden sm:h-24">
          <FeatureTileVisual variant={feature.id} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%)]/90 via-transparent to-transparent" />
      </div>

      <div className="relative flex flex-col gap-1">
        <span className="font-mono text-[10px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-sm font-medium tracking-tight">{feature.title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}
