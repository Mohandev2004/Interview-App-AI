import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { getMySessions } from "@/lib/services/session.service";
import { handleRouteError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(request);
    const sessions = await getMySessions(user._id.toString());
    return NextResponse.json(sessions);
  } catch (error) {
    return handleRouteError(error);
  }
}
