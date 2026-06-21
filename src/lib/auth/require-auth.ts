import { cookies } from "next/headers";
import User, { IUser } from "@/lib/db/models/user";
import { verifyToken, TOKEN_COOKIE_NAME } from "@/lib/auth/jwt";

export class UnauthorizedError extends Error {
  status = 401;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

function extractBearerToken(authHeader: string | null): string | null {
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}

export async function requireAuth(request: Request): Promise<IUser> {
  const authHeader = request.headers.get("authorization");
  let token = extractBearerToken(authHeader);

  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null;
  }

  if (!token) {
    throw new UnauthorizedError("Not authorized, no token");
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    const message =
      error instanceof Error ? error.message : "Token verification failed";
    throw new UnauthorizedError(`Not authorized, token failed: ${message}`);
  }
}
