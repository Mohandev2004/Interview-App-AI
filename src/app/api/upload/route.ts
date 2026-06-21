import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { uploadProfileImage } from "@/lib/services/auth.service";
import { handleRouteError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const imageUrl = await uploadProfileImage(file);
    return NextResponse.json({ imageUrl });
  } catch (error) {
    return handleRouteError(error);
  }
}
