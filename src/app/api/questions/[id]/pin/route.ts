import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { togglePinQuestion } from "@/lib/services/question.service";
import { handleRouteError } from "@/lib/api-utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();
    await requireAuth(request);
    const { id } = await context.params;
    const question = await togglePinQuestion(id);
    return NextResponse.json({ success: true, question });
  } catch (error) {
    return handleRouteError(error);
  }
}
