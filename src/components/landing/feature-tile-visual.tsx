"use client";

import { cn } from "@/lib/utils";

interface FeatureTileVisualProps {
  variant: string;
}

export default function FeatureTileVisual({ variant }: FeatureTileVisualProps) {
  switch (variant) {
    case "01":
      return <QuestionsVisual />;
    case "02":
      return <FeedbackVisual />;
    case "03":
      return <ProgressVisual />;
    case "04":
      return <MockInterviewVisual />;
    case "05":
      return <ExplanationVisual />;
    case "06":
      return <PinNotesVisual />;
    default:
      return <QuestionsVisual />;
  }
}

function QuestionsVisual() {
  const tags = ["React", "System Design", "TypeScript", "Frontend"];

  return (
    <div className="flex size-full items-center justify-center p-4">
      <div className="relative size-full max-w-[180px]">
        {tags.map((tag, index) => (
          <span
            key={tag}
            className={cn(
              "feature-float absolute rounded-full border border-border/80 bg-background/90 px-2 py-0.5 text-[9px] font-medium text-foreground/90 backdrop-blur-sm",
              index === 0 && "left-[8%] top-[18%] feature-float-delay-1",
              index === 1 && "right-[6%] top-[28%] feature-float-delay-2",
              index === 2 && "bottom-[22%] left-[14%] feature-float-delay-3",
              index === 3 && "bottom-[18%] right-[10%] feature-float-delay-4"
            )}
          >
            {tag}
          </span>
        ))}
        <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-foreground text-[9px] font-semibold text-background">
          Role
        </div>
      </div>
    </div>
  );
}

function FeedbackVisual() {
  return (
    <div className="flex size-full flex-col justify-end gap-2 p-3">
      <div className="ml-auto max-w-[78%] rounded-lg rounded-br-sm border border-border/70 bg-muted/50 px-2 py-1.5 text-[9px] text-muted-foreground">
        Explain closures in JavaScript
      </div>
      <div className="max-w-[85%] rounded-lg rounded-bl-sm border border-foreground/15 bg-foreground px-2 py-1.5 text-[9px] text-background">
        <span className="feature-typing">Strong answer — add a real-world example</span>
        <span className="feature-cursor ml-0.5 inline-block h-2.5 w-px bg-background/80" />
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={cn(
              "size-1.5 rounded-full bg-muted-foreground/40 feature-pulse-dot",
              dot === 1 && "feature-pulse-dot-delay-1",
              dot === 2 && "feature-pulse-dot-delay-2"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressVisual() {
  const bars = [38, 52, 44, 68, 58, 76];

  return (
    <div className="flex size-full items-end justify-center gap-1.5 p-4 pb-5">
      {bars.map((height, index) => (
        <div
          key={index}
          className="relative w-3 overflow-hidden rounded-full bg-muted/40"
          style={{ height: "52px" }}
        >
          <div
            className={cn(
              "feature-bar absolute inset-x-0 bottom-0 rounded-full bg-foreground/80",
              index % 2 === 0 ? "feature-bar-delay-1" : "feature-bar-delay-2"
            )}
            style={{ height: `${height}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function MockInterviewVisual() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative flex size-20 items-center justify-center">
        {[0, 1, 2].map((ring) => (
          <span
            key={ring}
            className={cn(
              "absolute rounded-full border border-foreground/20 feature-ring",
              ring === 0 && "size-11 feature-ring-delay-1",
              ring === 1 && "size-14 feature-ring-delay-2",
              ring === 2 && "size-20 feature-ring-delay-3"
            )}
          />
        ))}
        <span className="relative z-10 rounded-full border border-foreground/30 bg-foreground px-2 py-1 text-[9px] font-medium text-background">
          Live
        </span>
      </div>
    </div>
  );
}

function ExplanationVisual() {
  const lines = [
    "async function fetchData() {",
    "  const res = await fetch(url)",
    "  return res.json()",
    "}",
  ];

  return (
    <div className="relative size-full overflow-hidden p-3">
      <div className="feature-scroll-lines absolute inset-x-3 top-3 flex flex-col gap-1.5 font-mono text-[9px] leading-4 text-muted-foreground">
        {[...lines, ...lines].map((line, index) => (
          <div key={`${line}-${index}`} className="truncate">
            {line}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[hsl(0_0%_4%)] to-transparent" />
    </div>
  );
}

function PinNotesVisual() {
  return (
    <div className="flex size-full items-center justify-center gap-2 p-3">
      <div className="feature-float feature-float-delay-1 rounded-md border border-border/80 bg-background/90 px-2 py-1.5 text-[9px] text-muted-foreground">
        Pin question
      </div>
      <div className="feature-float feature-float-delay-3 rounded-md border border-foreground/20 bg-foreground/10 px-2 py-1.5 text-[9px] text-foreground">
        Add note…
      </div>
    </div>
  );
}
