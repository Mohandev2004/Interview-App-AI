import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { generateInterviewQuestions } from "@/lib/services/ai.service";
import { handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);
    const body = await request.json();
    const result = await generateInterviewQuestions(body);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
