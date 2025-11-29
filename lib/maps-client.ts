const API_BASE_URL = "https://api.pavitinfotech.com";

// Cache key prefix for map data
const MAP_CACHE_KEY = "pavit-map-cache";
// Cache duration: 7 days in milliseconds
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

interface ApiSuccess<T> {
  status: "success";
  message: string;
  data: T;
  code: number;
  timestamp: string;
}

interface ApiErrorPayload {
  status: "error";
  message: string;
  errors: Record<string, string[]> | null;
  code: number;
  timestamp: string;
}

export class MapsApiError extends Error {
  payload: ApiErrorPayload;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.payload = payload;
  }
}

export interface MapsEmbedResponse {
  google_maps_link: string;
  osm_search_link: string;
  iframe: string;
  leaflet_html: string;
  address: string;
  zoom: number;
}

interface CachedMapData {
  data: MapsEmbedResponse;
  timestamp: number;
  params: {
    address: string;
    zoom?: number;
    width?: number;
    height?: number;
  };
}

/**
 * Check if user has accepted cookie consent (for storage)
 */
function isCookieConsentAccepted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

/**
 * Generate a cache key based on map parameters
 */
function getCacheKey(params: {
  address: string;
  zoom?: number;
  width?: number;
  height?: number;
}): string {
  return `${MAP_CACHE_KEY}-${btoa(JSON.stringify(params))}`;
}

/**
 * Set cookie with expiration
 */
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Expires=${expires}; Path=/; SameSite=Lax`;
}

/**
 * Get cookie value
 */
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

/**
 * Get cached map data (respects user's storage preference)
 */
function getCachedMapData(params: {
  address: string;
  zoom?: number;
  width?: number;
  height?: number;
}): MapsEmbedResponse | null {
  if (typeof window === "undefined") return null;

  const cacheKey = getCacheKey(params);
  const useCookies = isCookieConsentAccepted();

  try {
    let raw: string | null = null;

    if (useCookies) {
      raw = getCookie(cacheKey);
    } else {
      raw = localStorage.getItem(cacheKey);
    }

    if (!raw) return null;

    const cached = JSON.parse(raw) as CachedMapData;

    // Check if cache is still valid (not expired)
    if (Date.now() - cached.timestamp < CACHE_DURATION_MS) {
      return cached.data;
    }

    // Cache expired, remove it
    if (useCookies) {
      document.cookie = `${cacheKey}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
    } else {
      localStorage.removeItem(cacheKey);
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Cache map data (respects user's storage preference)
 */
function setCachedMapData(
  params: {
    address: string;
    zoom?: number;
    width?: number;
    height?: number;
  },
  data: MapsEmbedResponse
): void {
  if (typeof window === "undefined") return;

  const cacheKey = getCacheKey(params);
  const useCookies = isCookieConsentAccepted();

  const cached: CachedMapData = {
    data,
    timestamp: Date.now(),
    params,
  };

  try {
    const value = JSON.stringify(cached);

    if (useCookies) {
      setCookie(cacheKey, value, 7);
    } else {
      localStorage.setItem(cacheKey, value);
    }
  } catch {
    // Storage might be full or unavailable, ignore
  }
}

/**
 * Fetch map data from the backend API
 * Public endpoint - no authentication required
 * Caches results based on user's storage preference
 * Returns OpenStreetMap + Leaflet.js embedded map
 */
export async function getMapEmbed(params: {
  address: string;
  zoom?: number;
  width?: number;
  height?: number;
}): Promise<MapsEmbedResponse> {
  // Check cache first
  const cached = getCachedMapData(params);
  if (cached) {
    return cached;
  }

  // Fetch from API
  const res = await fetch(`${API_BASE_URL}/maps/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(params),
  });

  const raw = (await res.json()) as unknown;

  if (!res.ok) {
    throw new MapsApiError(raw as ApiErrorPayload);
  }

  const json = raw as ApiSuccess<MapsEmbedResponse>;

  // Cache the result
  setCachedMapData(params, json.data);

  return json.data;
}
