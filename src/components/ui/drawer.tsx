"use client";

import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | false;
  description?: string;
  children: ReactNode;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
}: DrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md md:max-w-lg">
        {title !== false && (
          <SheetHeader className="border-b border-border px-6 py-5 text-left">
            <SheetTitle>{title || "Details"}</SheetTitle>
            <SheetDescription className={description ? undefined : "sr-only"}>
              {description || "Panel content"}
            </SheetDescription>
          </SheetHeader>
        )}

        <ScrollArea className="h-full flex-1 px-6 py-5">
          <div className="text-sm">{children}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
