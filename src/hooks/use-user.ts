"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import type { UserContextValue } from "@/types";

export function useUser(): UserContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within AuthProvider");
  }
  return context;
}
