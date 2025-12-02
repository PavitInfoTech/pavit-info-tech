import { getAuthTokenStorage } from "./auth-storage";

const API_BASE_URL = "https://api.pavitinfotech.com";

export interface ApiSuccess<T> {
  status: "success";
  message: string;
  data: T;
  code: number;
  timestamp: string;
}

export interface ApiErrorPayload {
  status: "error";
  message: string;
  errors: Record<string, string[]> | null;
  code: number;
  timestamp: string;
}

export class ApiError extends Error {
  payload: ApiErrorPayload;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.payload = payload;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<ApiSuccess<T>> {
  const url = `${API_BASE_URL}${path}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (options.auth) {
    const storage = getAuthTokenStorage();
    const token = storage.getToken();
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const raw = (await res.json()) as unknown;
  const json = raw as ApiSuccess<T> | ApiErrorPayload;

  if (!res.ok || (json as ApiErrorPayload).status === "error") {
    throw new ApiError(json as ApiErrorPayload);
  }

  return json as ApiSuccess<T>;
}

interface AuthUser {
  id: number;
  username: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  avatar?: string | null;
  email_verified_at?: string | null;
  created_at?: string;
}

interface AuthPayload {
  user: AuthUser;
  token: string;
}

export async function apiRegister(
  username: string,
  firstName: string,
  lastName: string | null,
  email: string,
  passwordHash: string,
  passwordHashConfirmation: string
) {
  const res = await request<AuthPayload>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password_hash: passwordHash,
      password_hash_confirmation: passwordHashConfirmation,
    }),
  });

  const storage = getAuthTokenStorage();
  storage.setToken(res.data.token);
  storage.setUser(res.data.user);

  return res.data;
}

export async function apiLogin(email: string, passwordHash: string) {
  const res = await request<AuthPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password_hash: passwordHash }),
  });

  const storage = getAuthTokenStorage();
  storage.setToken(res.data.token);
  storage.setUser(res.data.user);

  return res.data;
}

export async function apiForgotPassword(email: string) {
  const res = await request<{ message: string }>("/auth/password/forgot", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  return res.data;
}

export async function apiLogout() {
  try {
    await request<null>("/auth/logout", { method: "POST", auth: true });
  } catch {
    // ignore errors logging out
  }
  const storage = getAuthTokenStorage();
  storage.clear();
}

export async function apiGetCurrentUser() {
  const res = await request<AuthUser>("/user", {
    method: "GET",
    auth: true,
  });
  const storage = getAuthTokenStorage();
  storage.setUser(res.data);
  return res.data;
}

// OAuth: Get redirect URL for Google
export function getGoogleOAuthUrl(redirect?: string): string {
  const baseUrl = `${API_BASE_URL}/auth/google/redirect`;
  if (redirect) {
    return `${baseUrl}?redirect=${encodeURIComponent(redirect)}`;
  }
  return baseUrl;
}

// OAuth: Get redirect URL for GitHub
export function getGitHubOAuthUrl(redirect?: string): string {
  const baseUrl = `${API_BASE_URL}/auth/github/redirect`;
  if (redirect) {
    return `${baseUrl}?redirect=${encodeURIComponent(redirect)}`;
  }
  return baseUrl;
}

// OAuth: Exchange Google code/credential for token
export async function apiGoogleTokenExchange(params: {
  code?: string;
  credential?: string;
  redirect_uri?: string;
}) {
  const res = await request<AuthPayload>("/auth/google/token", {
    method: "POST",
    body: JSON.stringify(params),
  });

  const storage = getAuthTokenStorage();
  storage.setToken(res.data.token);
  storage.setUser(res.data.user);

  return res.data;
}

// OAuth: Exchange GitHub code/access_token for token
export async function apiGitHubTokenExchange(params: {
  code?: string;
  access_token?: string;
  redirect_uri?: string;
}) {
  const res = await request<AuthPayload>("/auth/github/token", {
    method: "POST",
    body: JSON.stringify(params),
  });

  const storage = getAuthTokenStorage();
  storage.setToken(res.data.token);
  storage.setUser(res.data.user);

  return res.data;
}

export type { AuthUser, AuthPayload };
