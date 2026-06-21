import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "@/lib/db/models/user";
import cloudinary from "@/lib/cloudinary";
import { generateToken } from "@/lib/auth/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

interface AuthResult {
  _id: string;
  name: string;
  email: string;
  profileImageUrl?: string | null;
  token: string;
}

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const { name, email, password, profileImageUrl } = input;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ServiceError("User already exists", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileImageUrl: profileImageUrl || null,
  });

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    token: generateToken(user._id.toString()),
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ServiceError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ServiceError("Invalid email or password", 401);
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    token: generateToken(user._id.toString()),
  };
}

interface GoogleAuthInput {
  email: string;
  name: string;
  profileImageUrl?: string | null;
}

/** Finds an existing user by email or creates one using the current schema only. */
export async function loginOrRegisterGoogleUser(
  input: GoogleAuthInput
): Promise<AuthResult> {
  let user = await User.findOne({ email: input.email });

  if (user) {
    if (input.profileImageUrl && !user.profileImageUrl) {
      user.profileImageUrl = input.profileImageUrl;
      await user.save();
    }
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(crypto.randomUUID(), salt);

    user = await User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      profileImageUrl: input.profileImageUrl || null,
    });
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    token: generateToken(user._id.toString()),
  };
}

export async function getUserProfile(userId: string) {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ServiceError("User not found", 404);
  }
  return user;
}

export async function uploadProfileImage(file: File): Promise<string> {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new ServiceError("Only .jpg, .jpeg, and .png formats are allowed", 400);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "user_profiles" }, (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve(uploadResult);
      })
      .end(buffer);
  });

  return result.secure_url;
}

export class ServiceError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ServiceError";
    this.status = status;
  }
}
