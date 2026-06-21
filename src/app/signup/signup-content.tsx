"use client";

import AuthCard from "@/components/auth/auth-card";
import AuthDivider from "@/components/auth/auth-divider";
import AuthSplitLayout from "@/components/auth/auth-split-layout";
import GoogleAuthButton from "@/components/auth/google-auth-button";
import SignUpForm from "@/components/auth/sign-up-form";

export default function SignUpContent() {
  return (
    <AuthSplitLayout>
      <AuthCard
        title="Create your account"
      subtitle="Start preparing smarter with AI-powered interview sessions built for ambitious candidates."
    >
        <GoogleAuthButton />
        <AuthDivider />
        <SignUpForm />
      </AuthCard>
    </AuthSplitLayout>
  );
}
