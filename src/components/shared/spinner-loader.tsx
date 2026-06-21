import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerLoaderProps {
  className?: string;
}

export default function SpinnerLoader({ className }: SpinnerLoaderProps) {
  return <Loader2 className={cn("size-4 animate-spin", className)} />;
}
