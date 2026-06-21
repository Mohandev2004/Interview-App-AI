import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { requireAuth } from "@/lib/auth/require-auth";
import { getUserProfile } from "@/lib/services/auth.service";
import { handleRouteError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(request);
    const profile = await getUserProfile(user._id.toString());
    return NextResponse.json(profile);
  } catch (error) {
    return handleRouteError(error);
  }
}
