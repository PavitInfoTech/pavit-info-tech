const API_BASE_URL = "https://api.pavitinfotech.com";

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

export class MailApiError extends Error {
  payload: ApiErrorPayload;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.payload = payload;
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

/**
 * Send a contact form message
 * POST /mail/contact
 */
export async function sendContactMessage(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE_URL}/mail/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const raw = (await res.json()) as unknown;

  if (!res.ok) {
    const errorPayload = raw as ApiErrorPayload;
    throw new MailApiError(errorPayload);
  }

  const json = raw as ApiSuccess<unknown>;
  return { success: true, message: json.message };
}

/**
 * Subscribe to the newsletter
 * POST /mail/newsletter
 */
export async function subscribeNewsletter(
  data: NewsletterData
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE_URL}/mail/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const raw = (await res.json()) as unknown;

  if (!res.ok) {
    const errorPayload = raw as ApiErrorPayload;
    throw new MailApiError(errorPayload);
  }

  const json = raw as ApiSuccess<unknown>;
  return { success: true, message: json.message };
}

/**
 * Get validation error messages from API error
 */
export function getValidationErrors(
  error: MailApiError
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (error.payload.errors) {
    for (const [field, messages] of Object.entries(error.payload.errors)) {
      errors[field] = messages[0]; // Take first error message
    }
  }

  return errors;
}
