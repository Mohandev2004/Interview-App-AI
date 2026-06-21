import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { loginUser } from "@/lib/services/auth.service";
import { authJsonResponse, handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    const result = await loginUser(email, password);
    return authJsonResponse(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
