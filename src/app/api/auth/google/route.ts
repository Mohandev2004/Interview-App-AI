import { NextResponse } from "next/server";
import { createOAuthState, getGoogleAuthUrl } from "@/lib/auth/google-oauth";

/** Starts Google OAuth by redirecting to Google's consent screen with a signed CSRF state. */
export async function GET() {
  try {
    const state = createOAuthState();
    const googleAuthUrl = getGoogleAuthUrl(state);

    const response = NextResponse.redirect(googleAuthUrl);
    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth init failed:", error);
    return NextResponse.redirect(
      new URL("/signin?error=oauth_failed", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
    );
  }
}
