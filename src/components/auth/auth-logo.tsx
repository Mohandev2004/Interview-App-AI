import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function AuthLogo({
  className,
  variant = "dark",
}: AuthLogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 group", className)}
    >
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105",
          isLight
            ? "bg-white/10 ring-1 ring-white/20 backdrop-blur-sm"
            : "bg-primary/10 ring-1 ring-primary/20"
        )}
      >
        <Sparkles
          className={cn("size-4", isLight ? "text-amber-300" : "text-primary")}
        />
      </div>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          isLight ? "text-white" : "text-foreground"
        )}
      >
        Interview AI
      </span>
    </Link>
  );
}
