import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID?.trim();
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET?.trim();
const AUTH_SECRET = (
  process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
)?.trim();

function getAppUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  return url.replace(/\/$/, "");
}

function getRedirectUri(): string {
  return `${getAppUrl()}/api/auth/google/callback`;
}

function getOAuthClient(): OAuth2Client {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth credentials are not configured");
  }

  return new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    getRedirectUri()
  );
}

/** Signs a random CSRF state token using AUTH_SECRET to prevent OAuth CSRF attacks. */
export function createOAuthState(): string {
  if (!AUTH_SECRET) {
    throw new Error("AUTH_SECRET environment variable is not defined");
  }

  const nonce = crypto.randomBytes(16).toString("hex");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(nonce)
    .digest("hex");

  return `${nonce}.${signature}`;
}

/** Verifies the HMAC signature on the OAuth state param returned by Google. */
export function verifyOAuthState(state: string): boolean {
  if (!AUTH_SECRET) {
    return false;
  }

  const [nonce, signature] = state.split(".");
  if (!nonce || !signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(nonce)
    .digest("hex");

  if (signature.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

/** Builds the Google OAuth consent URL with CSRF state. */
export function getGoogleAuthUrl(state: string): string {
  const client = getOAuthClient();

  return client.generateAuthUrl({
    access_type: "online",
    prompt: "select_account",
    scope: ["openid", "email", "profile"],
    state,
  });
}

export interface GoogleProfile {
  email: string;
  name: string;
  profileImageUrl?: string | null;
}

/** Maps Google token exchange failures to app error codes. */
export function getGoogleOAuthErrorCode(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "oauth_failed";
  }

  const response = (error as { response?: { data?: { error?: string } } })
    .response?.data?.error;

  if (response === "invalid_client") {
    return "invalid_client";
  }

  if (response === "redirect_uri_mismatch") {
    return "redirect_uri_mismatch";
  }

  return "oauth_failed";
}

/** Exchanges the authorization code for Google profile data. */
export async function getGoogleProfileFromCode(
  code: string
): Promise<GoogleProfile> {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);

  if (!tokens.id_token) {
    throw new Error("Missing id_token from Google");
  }

  return verifyGoogleIdToken(tokens.id_token);
}

/** Verifies a Google ID token (Sign-In button flow — client secret not required). */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID environment variable is not defined");
  }

  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload?.email) {
    throw new Error("Google account did not provide an email address");
  }

  return {
    email: payload.email,
    name: payload.name ?? payload.email.split("@")[0],
    profileImageUrl: payload.picture ?? null,
  };
}

export { getAppUrl, getRedirectUri };
