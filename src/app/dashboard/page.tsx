"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Clock,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import fetchClient from "@/lib/fetch-client";
import { API_PATHS } from "@/lib/constants";
import { formatDate } from "@/lib/utils/format-date";
import SummaryCard from "@/components/shared/summary-card";
import CreateSessionForm from "@/components/sections/create-session-form";
import Model from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Session } from "@/types";

function StatCard({
  title,
  value,
  hint,
  icon: Icon,
}: {
  title: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="transition-all hover:border-foreground/20 hover:shadow-md hover:shadow-black/5">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div className="flex flex-col gap-2">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            {value}
          </CardTitle>
        </div>
        <div className="rounded-lg border border-border bg-muted/50 p-2.5">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAllSession = async () => {
    try {
      const response = await fetchClient.get<Session[]>(
        API_PATHS.INTERVIEW.GET_ALL
      );
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async () => {
    if (!sessionToDelete?._id) return;

    setIsDeleting(true);

    try {
      await fetchClient.delete(
        API_PATHS.INTERVIEW.DELETE(sessionToDelete._id)
      );
      toast.success("Session deleted");
      setSessionToDelete(null);
      await fetchAllSession();
    } catch (error) {
      console.error("Error deleting session data:", error);
      toast.error("Failed to delete session");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchAllSession();
  }, []);

  const stats = useMemo(() => {
    const totalQuestions = sessions.reduce(
      (sum, s) => sum + (s.questions?.length || 0),
      0
    );
    const readiness = Math.min(
      100,
      Math.round((sessions.length * 12 + totalQuestions * 2) / 1.2)
    );

    return {
      readiness: sessions.length ? `${readiness}%` : "—",
      sessions: String(sessions.length),
      questions: String(totalQuestions),
      recent: sessions[0]?.role || "No sessions yet",
    };
  }, [sessions]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3">
              Dashboard
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Prepare smarter
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Practice interviews with AI, get instant feedback, and track your
              progress across sessions.
            </p>
          </div>
          <Button onClick={() => setOpenCreateModal(true)} className="shrink-0">
            <Plus />
            New session
          </Button>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Interview Readiness"
            value={stats.readiness}
            hint="Based on sessions completed and questions reviewed"
            icon={Target}
          />
          <StatCard
            title="Recent Sessions"
            value={stats.sessions}
            hint="Total practice sessions in your workspace"
            icon={Clock}
          />
          <StatCard
            title="AI Feedback"
            value={stats.questions}
            hint="Questions generated and reviewed with AI"
            icon={Brain}
          />
          <StatCard
            title="Progress Tracking"
            value={stats.recent}
            hint="Your latest role focus area"
            icon={BarChart3}
          />
        </div>

        <Separator className="mb-6" />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium tracking-tight">Recent sessions</h2>
          {sessions.length > 0 && (
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
              <ArrowUpRight />
            </Button>
          )}
        </div>

        {sessions.length === 0 ? (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background">
                <Sparkles className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No practice sessions yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create your first AI interview session to get started.
                </p>
              </div>
              <Button onClick={() => setOpenCreateModal(true)}>
                <Plus />
                Start practicing
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sessions.map((data) => (
              <SummaryCard
                key={data._id}
                role={data.role || ""}
                topicToFocus={data.topicsToFocus || data.topicToFocus || ""}
                experience={data.experience || "-"}
                questions={data.questions?.length || 0}
                description={data.description || ""}
                lastUpdate={data.updatedAt ? formatDate(data.updatedAt) : ""}
                onSelect={() => router.push(`/interview/${data._id}`)}
                onDelete={() => setSessionToDelete(data)}
              />
            ))}
          </div>
        )}
      </div>

      <Model
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        title="New practice session"
        description="Generate a tailored question set for your target role."
      >
        <CreateSessionForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSession();
          }}
        />
      </Model>

      <AlertDialog
        open={Boolean(sessionToDelete)}
        onOpenChange={(open) => !open && setSessionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <span className="font-medium text-foreground">
                {sessionToDelete?.role}
              </span>{" "}
              and all associated questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                void deleteSession();
              }}
            >
              {isDeleting ? "Deleting..." : "Delete session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
