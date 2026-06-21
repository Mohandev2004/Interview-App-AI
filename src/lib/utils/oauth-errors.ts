/** User-safe messages for Google OAuth callback error codes. */
export function getOAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "access_denied":
      return "Google sign-in was cancelled. Please try again.";
    case "invalid_state":
      return "Invalid sign-in session. Please try again.";
    case "missing_code":
      return "Google did not return an authorization code. Please try again.";
    case "invalid_client":
      return "Google client secret is invalid. In Google Cloud Console, open your OAuth client, copy the Client secret (starts with GOCSPX-), set GOOGLE_CLIENT_SECRET in .env.local, then restart the dev server.";
    case "redirect_uri_mismatch":
      return "Redirect URI mismatch. Add http://localhost:3000/api/auth/google/callback to Authorized redirect URIs in Google Cloud Console.";
    case "oauth_failed":
      return "Google sign-in failed. Please try again.";
    case "user_creation_failed":
      return "Could not create your account. Please try again.";
    default:
      return "Something went wrong during sign-in. Please try again.";
  }
}
