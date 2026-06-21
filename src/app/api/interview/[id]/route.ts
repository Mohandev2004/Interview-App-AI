import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { getSessionById, deleteSession } from "@/lib/services/session.service";
import { handleRouteError } from "@/lib/api-utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();
    await requireAuth(request);
    const { id } = await context.params;
    const session = await getSessionById(id);
    return NextResponse.json({ success: true, session });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();
    const user = await requireAuth(request);
    const { id } = await context.params;
    await deleteSession(id, user._id.toString());
    return NextResponse.json({ message: "session deleted successfully" });
  } catch (error) {
    return handleRouteError(error);
  }
}
