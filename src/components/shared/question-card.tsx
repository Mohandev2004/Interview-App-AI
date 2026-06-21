"use client";

import { Pin, PinOff, Sparkles } from "lucide-react";
import AIResponsePreview from "@/components/shared/ai-response-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuestionCardProps {
  question: string;
  answer: string;
  onLearnMore: () => void;
  isPinned?: boolean;
  onTogglePin: () => void;
}

export default function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}: QuestionCardProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mb-3 rounded-xl border border-border bg-card px-4"
    >
      <AccordionItem value="question" className="border-none">
        <div className="flex items-start gap-3 pt-1">
          <Badge variant="secondary" className="mt-3 shrink-0">
            Q
          </Badge>

          <AccordionTrigger className="flex-1 py-4 hover:no-underline">
            <span className="pr-2 text-left text-sm font-medium leading-relaxed">
              {question}
            </span>
          </AccordionTrigger>

          <div className="flex shrink-0 items-center gap-1 pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={(event) => {
                    event.stopPropagation();
                    onTogglePin();
                  }}
                >
                  {isPinned ? <PinOff /> : <Pin />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPinned ? "Unpin question" : "Pin question"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={(event) => {
                    event.stopPropagation();
                    onLearnMore();
                  }}
                >
                  <Sparkles />
                  Learn more
                </Button>
              </TooltipTrigger>
              <TooltipContent>Get AI explanation</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <AccordionContent className="pb-4">
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <AIResponsePreview content={answer} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
