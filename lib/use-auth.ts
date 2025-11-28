"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthTokenStorage } from "./auth-storage";
import { apiGetCurrentUser, AuthUser } from "./auth-client";

interface UseAuthOptions {
  requireAuth?: boolean;
}

interface UseAuthResult {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
}

export function useAuth(options: UseAuthOptions = {}): UseAuthResult {
  const { requireAuth = false } = options;
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const storage = getAuthTokenStorage();
      const storedToken = storage.getToken();
      setToken(storedToken);

      if (!storedToken) {
        setUser(null);
        setIsLoading(false);
        if (requireAuth) {
          router.replace(`/auth/signin?next=${encodeURIComponent(pathname)}`);
        }
        return;
      }

      try {
        const u = await apiGetCurrentUser();
        setUser(u);
      } catch {
        storage.clear();
        setUser(null);
        setToken(null);
        if (requireAuth) {
          router.replace(`/auth/signin?next=${encodeURIComponent(pathname)}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [pathname, requireAuth, router]);

  const refresh = async () => {
    const storage = getAuthTokenStorage();
    const storedToken = storage.getToken();
    setToken(storedToken);
    if (!storedToken) {
      setUser(null);
      return;
    }
    try {
      const u = await apiGetCurrentUser();
      setUser(u);
    } catch {
      storage.clear();
      setUser(null);
      setToken(null);
    }
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    refresh,
  };
}
