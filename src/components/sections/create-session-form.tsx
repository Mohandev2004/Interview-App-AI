"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/shadcn-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import fetchClient, { isFetchError } from "@/lib/fetch-client";
import { API_PATHS } from "@/lib/constants";

interface CreateSessionFormProps {
  onSuccess?: () => void;
}

export default function CreateSessionForm({ onSuccess }: CreateSessionFormProps) {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role.trim() || !experience || !topicsToFocus.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await fetchClient.post<{ questions: unknown[] }>(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: role.trim(),
          experience: Number(experience),
          topicsToFocus: topicsToFocus.trim(),
          numberOfQuestions: 10,
        }
      );

      const response = await fetchClient.post<{ session?: { _id: string } }>(
        API_PATHS.INTERVIEW.CREATE,
        {
          ...formData,
          experience: Number(experience),
          questions: aiResponse.data.questions,
        }
      );

      const sessionId = response.data?.session?._id;
      if (sessionId) {
        toast.success("Session created");
        onSuccess?.();
        router.push(`/interview/${sessionId}`);
      } else {
        setError("Session creation failed.");
      }
    } catch (err) {
      const message =
        isFetchError(err) && err.response?.data
          ? (err.response.data as { message?: string }).message ||
            "Something went wrong."
          : "Something went wrong.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 pb-6 pt-2">
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight">
          New practice session
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate a tailored question set for your target role.
        </p>
      </div>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Target role</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            placeholder="Frontend Developer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="experience">Years of experience</Label>
          <Input
            id="experience"
            type="number"
            min={0}
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            placeholder="3"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="topics">Topics to focus</Label>
          <Input
            id="topics"
            value={formData.topicsToFocus}
            onChange={({ target }) =>
              handleChange("topicsToFocus", target.value)
            }
            placeholder="React, System Design, TypeScript"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Notes (optional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={({ target }) =>
              handleChange("description", target.value)
            }
            placeholder="Goals for this session"
            rows={3}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="mt-1 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Creating session...
            </>
          ) : (
            "Create session"
          )}
        </Button>
      </form>
    </div>
  );
}
