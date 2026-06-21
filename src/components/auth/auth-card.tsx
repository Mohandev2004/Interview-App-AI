import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  subtitle: string;
  error?: string | null;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  error,
  children,
}: AuthCardProps) {
  return (
    <Card className="border-border/80 bg-card/95 shadow-xl shadow-black/10 backdrop-blur-sm">
      <CardHeader className="gap-2 pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {children}
      </CardContent>
    </Card>
  );
}
