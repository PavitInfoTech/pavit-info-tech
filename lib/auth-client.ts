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
  options: RequestInit & { auth?: boolean } = {},
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
      (headers as any)["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const json = (await res.json()) as ApiSuccess<T> | ApiErrorPayload;

  if (!res.ok || (json as ApiErrorPayload).status === "error") {
    throw new ApiError(json as ApiErrorPayload);
  }

  return json as ApiSuccess<T>;
}

interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

interface AuthPayload {
  user: AuthUser;
  token: string;
}

export async function apiRegister(name: string, email: string, password: string, passwordConfirmation: string) {
  const res = await request<AuthPayload>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
  });

  const storage = getAuthTokenStorage();
  storage.setToken(res.data.token);
  storage.setUser(res.data.user);

  return res.data;
}

export async function apiLogin(email: string, password: string) {
  const res = await request<AuthPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
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

export type { AuthUser, AuthPayload };
