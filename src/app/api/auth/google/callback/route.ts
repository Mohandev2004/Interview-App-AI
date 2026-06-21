import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import {
  getGoogleProfileFromCode,
  getGoogleOAuthErrorCode,
  verifyOAuthState,
} from "@/lib/auth/google-oauth";
import { loginOrRegisterGoogleUser } from "@/lib/services/auth.service";
import { setAuthCookie } from "@/lib/api-utils";

function getAppOrigin(request: NextRequest): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;
}

function redirectToLogin(request: NextRequest, errorCode: string) {
  const url = new URL("/signin", getAppOrigin(request));
  url.searchParams.set("error", errorCode);
  return NextResponse.redirect(url);
}

/** Handles Google's OAuth callback: verify state, resolve user by email, issue JWT cookie. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (error) {
    return redirectToLogin(request, error === "access_denied" ? "access_denied" : "oauth_failed");
  }

  if (!code) {
    return redirectToLogin(request, "missing_code");
  }

  const storedState = request.cookies.get("oauth_state")?.value;
  if (!storedState || !state || storedState !== state || !verifyOAuthState(state)) {
    return redirectToLogin(request, "invalid_state");
  }

  try {
    await connectDB();
    const profile = await getGoogleProfileFromCode(code);
    const result = await loginOrRegisterGoogleUser(profile);

    const dashboardUrl = new URL("/dashboard", getAppOrigin(request));
    const response = NextResponse.redirect(dashboardUrl);
    setAuthCookie(response, result.token);
    response.cookies.set("oauth_state", "", { maxAge: 0, path: "/" });

    return response;
  } catch (callbackError) {
    console.error("Google OAuth callback failed:", callbackError);
    return redirectToLogin(request, getGoogleOAuthErrorCode(callbackError));
  }
}
