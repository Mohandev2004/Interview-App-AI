import { Separator } from "@/components/ui/separator";

export default function AuthDivider() {
  return (
    <div className="relative py-1">
      <Separator className="bg-border/70" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        or continue with email
      </span>
    </div>
  );
}
