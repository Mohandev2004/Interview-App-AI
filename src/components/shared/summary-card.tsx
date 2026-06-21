import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils/format-date";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

interface SummaryCardProps {
  role: string;
  topicToFocus: string;
  experience: number | string;
  questions: number | string;
  description: string;
  lastUpdate: string;
  onSelect: () => void;
  onDelete: () => void;
}

export default function SummaryCard({
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdate,
  onSelect,
  onDelete,
}: SummaryCardProps) {
  return (
    <Card
      className="group cursor-pointer transition-all hover:border-foreground/20 hover:shadow-md"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="size-10 rounded-lg">
            <AvatarFallback className="rounded-lg text-xs font-medium">
              {getInitials(role)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate text-base">{role}</CardTitle>
            <CardDescription className="mt-1 line-clamp-1">
              {topicToFocus}
            </CardDescription>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
              aria-label="Delete session"
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete session</TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2 pb-3">
        <Badge variant="secondary">
          {experience} {experience == 1 ? "year" : "years"}
        </Badge>
        <Badge variant="outline">{questions} Q&A</Badge>
        {lastUpdate && (
          <Badge variant="outline">{formatDate(lastUpdate)}</Badge>
        )}
      </CardContent>

      {description && (
        <CardFooter className="border-t border-border pt-4">
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
