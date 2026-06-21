import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { registerUser } from "@/lib/services/auth.service";
import { authJsonResponse, handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password, profileImageUrl } = body;

    const result = await registerUser({ name, email, password, profileImageUrl });
    return authJsonResponse(result, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
