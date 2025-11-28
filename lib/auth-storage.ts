"use client";

export interface StoredUser {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

const TOKEN_KEY = "pavit-auth-token";
const USER_KEY = "pavit-auth-user";

function isCookieConsentAccepted() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.trim().split("=");
    if (key === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
}

export function getAuthTokenStorage() {
  const useCookies = isCookieConsentAccepted();

  return {
    getToken(): string | null {
      if (typeof window === "undefined") return null;
      if (useCookies) {
        return getCookie(TOKEN_KEY);
      }
      try {
        return localStorage.getItem(TOKEN_KEY);
      } catch {
        return null;
      }
    },
    setToken(token: string) {
      if (typeof window === "undefined") return;
      if (useCookies) {
        setCookie(TOKEN_KEY, token);
      } else {
        try {
          localStorage.setItem(TOKEN_KEY, token);
        } catch {
          // ignore
        }
      }
    },
    getUser(): StoredUser | null {
      if (typeof window === "undefined") return null;
      try {
        const raw = useCookies ? getCookie(USER_KEY) : localStorage.getItem(USER_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as StoredUser;
      } catch {
        return null;
      }
    },
    setUser(user: StoredUser) {
      if (typeof window === "undefined") return;
      const value = JSON.stringify(user);
      if (useCookies) {
        setCookie(USER_KEY, value);
      } else {
        try {
          localStorage.setItem(USER_KEY, value);
        } catch {
          // ignore
        }
      }
    },
    clear() {
      if (typeof window === "undefined") return;
      if (useCookies) {
        deleteCookie(TOKEN_KEY);
        deleteCookie(USER_KEY);
      } else {
        try {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        } catch {
          // ignore
        }
      }
    },
  };
}
