"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import SpinnerLoader from "@/components/shared/spinner-loader";

interface SignOutButtonProps {
  className?: string;
}

/** Clears the JWT cookie, localStorage token, and auth context state. */
export default function SignOutButton({ className }: SignOutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { clearUser } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      clearUser();
      router.push("/");
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? (
        <>
          <SpinnerLoader />
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
