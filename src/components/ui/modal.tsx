"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ModelProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  className?: string;
}

export default function Model({
  children,
  isOpen,
  onClose,
  title = "Dialog",
  description = "Dialog content",
  hideHeader,
  className,
}: ModelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn("gap-0 overflow-hidden p-0 sm:max-w-lg", className)}
      >
        {hideHeader ? (
          <>
            <DialogTitle className="sr-only">{title}</DialogTitle>
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>
          </>
        ) : (
          <DialogHeader className="border-b border-border px-6 py-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}

        <ScrollArea className="max-h-[min(85vh,640px)]">
          <div className={cn(!hideHeader && "pt-2")}>{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
