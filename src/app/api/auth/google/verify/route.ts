import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { verifyGoogleIdToken } from "@/lib/auth/google-oauth";
import { loginOrRegisterGoogleUser } from "@/lib/services/auth.service";
import { handleRouteError, setAuthCookie } from "@/lib/api-utils";

/** Verifies a Google ID token from the client Sign-In button (no client secret required). */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { credential?: string };

    if (!body.credential) {
      return NextResponse.json({ message: "Missing Google credential" }, { status: 400 });
    }

    await connectDB();
    const profile = await verifyGoogleIdToken(body.credential);
    const result = await loginOrRegisterGoogleUser(profile);

    const response = NextResponse.json(result);
    setAuthCookie(response, result.token);

    return response;
  } catch (error) {
    return handleRouteError(error);
  }
}
