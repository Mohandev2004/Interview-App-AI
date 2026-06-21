"use client";

import { Button } from "@/components/ui/button";

interface DeleteAlertContentProps {
  content: string;
  onDelete: () => void;
}

export default function DeleteAlertContent({
  content,
  onDelete,
}: DeleteAlertContentProps) {
  return (
    <div className="p-6">
      <p className="text-sm text-muted-foreground">{content}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
