"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import type { AuthResponse } from "@/types";

interface GoogleAuthButtonProps {
  className?: string;
}

export default function GoogleAuthButton({ className }: GoogleAuthButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUser } = useUser();

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error("Google sign-in failed", {
        description: "No credential returned from Google.",
      });
      return;
    }

    try {
      const res = await fetch("/api/auth/google/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = (await res.json()) as AuthResponse & { message?: string };

      if (!res.ok) {
        throw new Error(data.message || "Google sign-in failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data);
        toast.success("Welcome!", {
          description: "You're signed in with Google.",
        });

        const callbackUrl = searchParams.get("callbackUrl");
        router.push(
          callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/dashboard"
        );
      }
    } catch (error) {
      toast.error("Google sign-in failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <div className={className ?? "flex w-full justify-center"}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() =>
          toast.error("Google sign-in failed", {
            description: "Could not complete Google authentication.",
          })
        }
        useOneTap={false}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="400"
      />
    </div>
  );
}
