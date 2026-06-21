import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { generateConceptExplanation } from "@/lib/services/ai.service";
import { handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAuth(request);
    const { question } = await request.json();
    const data = await generateConceptExplanation(question);
    return NextResponse.json(data);
  } catch (error) {
    return handleRouteError(error);
  }
}
