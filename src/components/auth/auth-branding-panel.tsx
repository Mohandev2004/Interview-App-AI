"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const benefits = [
  "Role-specific AI question generation",
  "Instant explanations and feedback",
  "Session progress tracking",
];

export default function AuthBrandingPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden border-r border-border bg-muted/20 p-10 lg:flex xl:p-14">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_100%/0.08),transparent_70%)]" />

      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
          <span className="text-xs font-semibold">IA</span>
        </div>
        <span className="text-sm font-medium">Interview AI</span>
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <div>
          <Badge variant="secondary" className="mb-4">
            Interview preparation
          </Badge>
          <h1 className="max-w-md text-4xl font-semibold tracking-tight xl:text-5xl">
            Practice interviews with AI. Get instant feedback.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            A focused workspace for candidates who want structured prep, clear
            progress, and high-quality practice sessions.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {benefits.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-muted-foreground"
            >
              <span className="flex size-5 items-center justify-center rounded-full border border-border bg-background">
                <Check className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Card className="border-border/80 bg-background/60 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm leading-relaxed">
              &ldquo;The cleanest interview prep workflow I&apos;ve used.
              Focused, fast, and genuinely useful before onsite rounds.&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Software Engineer</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="relative z-10 my-8 opacity-50" />

      <p className="relative z-10 text-xs text-muted-foreground">
        Trusted by candidates preparing for technical interviews worldwide.
      </p>
    </div>
  );
}
