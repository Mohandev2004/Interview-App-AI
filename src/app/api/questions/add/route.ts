import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { addQuestionsToSession } from "@/lib/services/question.service";
import { handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);
    const { sessionId, questions } = await request.json();
    const createdQuestions = await addQuestionsToSession(sessionId, questions);
    return NextResponse.json(createdQuestions, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
