"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ListPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import RoleInfoHeader from "@/components/sections/role-info-header";
import fetchClient, { isFetchError } from "@/lib/fetch-client";
import { API_PATHS } from "@/lib/constants";
import QuestionCard from "@/components/shared/question-card";
import AIResponsePreview from "@/components/shared/ai-response-preview";
import Drawer from "@/components/ui/drawer";
import { formatDate } from "@/lib/utils/format-date";
import type { ExplanationResponse, Session } from "@/types";

export default function InterviewPrepPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await fetchClient.get<{ session: Session }>(
        API_PATHS.INTERVIEW.GET_ONE(sessionId)
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateConceptExplanation = async (question: string) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await fetchClient.post<ExplanationResponse>(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setErrorMsg("Failed to generate explanation. Try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      const response = await fetchClient.post<{ question?: unknown }>(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await fetchClient.post<
        | unknown[]
        | { questions?: unknown[] }
        | Record<string, unknown>
      >(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      let generatedQuestions: { question?: string; answer?: string }[] = [];

      if (Array.isArray(aiResponse.data)) {
        generatedQuestions = aiResponse.data as {
          question?: string;
          answer?: string;
        }[];
      } else if (
        aiResponse.data &&
        typeof aiResponse.data === "object" &&
        "questions" in aiResponse.data &&
        Array.isArray(aiResponse.data.questions)
      ) {
        generatedQuestions = aiResponse.data.questions;
      } else if (aiResponse.data && typeof aiResponse.data === "object") {
        generatedQuestions = Object.values(aiResponse.data) as {
          question?: string;
          answer?: string;
        }[];
      }

      const cleanedQuestions = generatedQuestions
        .filter((q) => q.question && q.answer)
        .map((q) => ({
          question: q.question as string,
          answer: q.answer as string,
        }));

      const response = await fetchClient.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId: sessionData?._id,
          questions: cleanedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added more Q&A");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (isFetchError(error)) {
        console.error("Upload Error:", error.response?.data || error.message);

        const data = error.response?.data as { message?: string } | undefined;
        setErrorMsg(
          data?.message || "Something went wrong. Please try again later."
        );
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        description={sessionData?.description || "-"}
        questions={sessionData?.questions?.length || 0}
        lastUpdated={
          sessionData?.updatedAt ? formatDate(sessionData.updatedAt) : ""
        }
      />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Interview Q&A
        </h2>

        <div className="mt-6 pb-10">
          <AnimatePresence>
            {sessionData?.questions?.map((data, index) => (
              <motion.div
                key={data._id || index}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 120,
                  delay: index * 0.05,
                  damping: 18,
                }}
                layout
              >
                <QuestionCard
                  question={data?.question}
                  answer={data?.answer}
                  onLearnMore={() => generateConceptExplanation(data.question)}
                  isPinned={data?.isPinned}
                  onTogglePin={() => toggleQuestionPinStatus(data._id)}
                />

                {!isLoading &&
                  sessionData?.questions?.length === index + 1 && (
                    <div className="mt-2 flex items-center justify-center pb-4">
                      <Button
                        variant="outline"
                        disabled={isLoading || isUpdateLoader}
                        onClick={uploadMoreQuestions}
                      >
                        {isUpdateLoader ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <ListPlus />
                        )}
                        Load more questions
                      </Button>
                    </div>
                  )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading ? explanation?.title : "Generating explanation"}
          description="AI-powered concept breakdown"
        >
          {errorMsg && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}

          {!isLoading && explanation && (
            <AIResponsePreview content={explanation.explanation} />
          )}
        </Drawer>
      </div>
    </>
  );
}
