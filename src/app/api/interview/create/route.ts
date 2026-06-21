import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { createSession } from "@/lib/services/session.service";
import { handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(request);
    const body = await request.json();
    const session = await createSession(user, body);
    return NextResponse.json({ success: true, session }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
