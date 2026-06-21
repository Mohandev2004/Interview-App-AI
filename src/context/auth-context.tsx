"use client";

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { API_PATHS, BASE_URL } from "@/lib/constants";
import type { User, UserContextValue } from "@/types";

export const AuthContext = createContext<UserContextValue | undefined>(
  undefined
);

async function fetchCurrentUser(): Promise<User | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${BASE_URL}${API_PATHS.AUTH.GET_PROFILE}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<User>;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile = await fetchCurrentUser();
        if (profile) {
          setUser(profile);
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
