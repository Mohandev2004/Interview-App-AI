import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RoleInfoHeaderProps {
  role: string;
  topicsToFocus: string;
  experience: number | string;
  questions: number;
  description: string;
  lastUpdated: string;
}

export default function RoleInfoHeader({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}: RoleInfoHeaderProps) {
  return (
    <div className="border-b border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <p className="text-sm font-medium text-muted-foreground">
          Interview session
        </p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {role}
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">{topicsToFocus}</p>

        {description && (
          <>
            <Separator className="my-5" />
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">
            {experience} {experience == 1 ? "year" : "years"} experience
          </Badge>
          <Badge variant="outline">{questions} questions</Badge>
          {lastUpdated && (
            <Badge variant="outline">Updated {lastUpdated}</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
