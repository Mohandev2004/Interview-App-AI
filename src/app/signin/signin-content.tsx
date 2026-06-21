"use client";

import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/auth-card";
import AuthDivider from "@/components/auth/auth-divider";
import AuthSplitLayout from "@/components/auth/auth-split-layout";
import GoogleAuthButton from "@/components/auth/google-auth-button";
import SignInForm from "@/components/auth/sign-in-form";
import { getOAuthErrorMessage } from "@/lib/utils/oauth-errors";

export default function SignInContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const errorMessage = errorCode ? getOAuthErrorMessage(errorCode) : null;

  return (
    <AuthSplitLayout>
      <AuthCard
        title="Sign in to your account"
        subtitle="Welcome back. Continue with Google or use your email to access your workspace."
      error={errorMessage}
    >
        <GoogleAuthButton />
        <AuthDivider />
        <SignInForm />
      </AuthCard>
    </AuthSplitLayout>
  );
}
