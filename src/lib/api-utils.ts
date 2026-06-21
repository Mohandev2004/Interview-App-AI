import { NextResponse } from "next/server";
import { TOKEN_COOKIE_NAME, TOKEN_MAX_AGE } from "@/lib/auth/jwt";
import { UnauthorizedError } from "@/lib/auth/require-auth";
import { ServiceError } from "@/lib/services/auth.service";

/** Sets the existing JWT httpOnly cookie on any NextResponse (JSON or redirect). */
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_MAX_AGE,
    path: "/",
  });
}

export function authJsonResponse<T extends { token?: string }>(
  data: T,
  status = 200
) {
  const token = data.token as string | undefined;
  const response = NextResponse.json(data, { status });

  if (token) {
    setAuthCookie(response, token);
  }

  return response;
}

export function handleRouteError(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }

  if (error instanceof ServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  const message = error instanceof Error ? error.message : "Server Error";
  return NextResponse.json({ message: "Server Error", error: message }, { status: 500 });
}
