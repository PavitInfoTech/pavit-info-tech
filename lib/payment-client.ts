"use client";

import { getAuthTokenStorage } from "./auth-storage";

const API_BASE = "https://api.pavitinfotech.com";

// Types
export interface SubscriptionPlan {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  currency: string;
  interval: "monthly" | "yearly";
  trial_days: number;
  features: string[];
  is_active: boolean;
}

export interface PaymentMethod {
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  card_holder: string;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Payment {
  id: number;
  transaction_id: string;
  plan_name?: string;
  amount: string;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  type: "subscription" | "one-time" | "revert";
  card_last_four?: string;
  card_brand?: string;
  description?: string;
  paid_at: string;
}

export interface PaymentResponse {
  payment: Payment;
  message?: string;
}

export interface LastPlanResponse {
  plan: SubscriptionPlan | null;
  payment: Payment | null;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  code: number;
  timestamp: string;
  errors?: Record<string, string[]>;
}

// Helper function to make authenticated requests
async function authRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const storage = getAuthTokenStorage();
  const token = storage.getToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const json = await res.json();

  if (!res.ok || json.status === "error") {
    const error = new Error(json.message || "Request failed") as Error & {
      errors?: Record<string, string[]>;
    };
    error.errors = json.errors;
    throw error;
  }

  return json;
}

// Helper function for public requests
async function publicRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  const json = await res.json();

  if (!res.ok || json.status === "error") {
    const error = new Error(json.message || "Request failed") as Error & {
      errors?: Record<string, string[]>;
    };
    error.errors = json.errors;
    throw error;
  }

  return json;
}

// Get all subscription plans
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const response = await publicRequest<SubscriptionPlan[]>(
    "/subscription-plans"
  );
  return response.data;
}

// Get a single plan by slug
export async function getSubscriptionPlan(
  slug: string
): Promise<SubscriptionPlan> {
  const response = await publicRequest<SubscriptionPlan>(
    `/subscription-plans/${slug}`
  );
  return response.data;
}

// Subscribe to a plan (make payment)
export async function subscribeToPlan(
  planSlug: string,
  paymentMethod: PaymentMethod,
  billingAddress?: BillingAddress
): Promise<PaymentResponse> {
  const response = await authRequest<PaymentResponse>("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      plan_slug: planSlug,
      payment_method: paymentMethod,
      billing_address: billingAddress,
    }),
  });
  return response.data;
}

// Process one-time payment
export async function processPayment(
  amount: number,
  paymentMethod: PaymentMethod,
  description?: string,
  currency = "USD",
  metadata?: Record<string, unknown>
): Promise<Payment> {
  const response = await authRequest<Payment>("/payments/process", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency,
      description,
      payment_method: paymentMethod,
      metadata,
    }),
  });
  return response.data;
}

// Get payment history
export async function getPaymentHistory(): Promise<{
  data: Payment[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}> {
  const response = await authRequest<{
    data: Payment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }>("/payments");
  return response.data;
}

// Get payment by transaction ID
export async function getPayment(transactionId: string): Promise<{
  payment: Payment;
  verified: boolean;
  gateway_status: {
    valid: boolean;
    status: string;
    sandbox: boolean;
  };
}> {
  const response = await authRequest<{
    payment: Payment;
    verified: boolean;
    gateway_status: {
      valid: boolean;
      status: string;
      sandbox: boolean;
    };
  }>(`/payments/${transactionId}`);
  return response.data;
}

// Get user's last purchased plan
export async function getLastPlan(): Promise<LastPlanResponse> {
  const response = await authRequest<LastPlanResponse>("/payments/last-plan");
  return response.data;
}

// Request refund
export async function requestRefund(
  transactionId: string,
  reason?: string
): Promise<Payment> {
  const response = await authRequest<Payment>(
    `/payments/refund/${transactionId}`,
    {
      method: "POST",
      body: JSON.stringify({ reason }),
    }
  );
  return response.data;
}

// Revert/change plan (without payment)
export async function revertPlan(
  toPlan?: string,
  reason?: string
): Promise<{
  payment: Payment;
  user: { id: number; current_plan: string | null };
}> {
  const response = await authRequest<{
    payment: Payment;
    user: { id: number; current_plan: string | null };
  }>("/payments/revert-plan", {
    method: "POST",
    body: JSON.stringify({
      to_plan: toPlan,
      reason,
    }),
  });
  return response.data;
}

// Card validation utilities
export function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, "");
  // Check if it's 13-19 digits
  if (!/^\d{13,19}$/.test(cleaned)) return false;
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

export function getCardBrand(
  cardNumber: string
): "visa" | "mastercard" | "amex" | "discover" | "unknown" {
  const cleaned = cardNumber.replace(/[\s-]/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";
  return "unknown";
}

export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, "");
  const brand = getCardBrand(cleaned);
  if (brand === "amex") {
    // Amex: XXXX XXXXXX XXXXX
    return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3").trim();
  }
  // Others: XXXX XXXX XXXX XXXX
  return cleaned.replace(/(\d{4})/g, "$1 ").trim();
}

export function validateExpiry(month: string, year: string): boolean {
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (m < 1 || m > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (y < currentYear) return false;
  if (y === currentYear && m < currentMonth) return false;

  return true;
}

export function validateCVV(cvv: string, cardBrand: string): boolean {
  const cleaned = cvv.replace(/\D/g, "");
  if (cardBrand === "amex") {
    return cleaned.length === 4;
  }
  return cleaned.length === 3;
}

// Test card numbers for sandbox
export const TEST_CARDS = {
  success: {
    visa: "4242424242424242",
    mastercard: "5555555555554444",
    amex: "378282246310005",
  },
  failure: {
    decline: "4000000000000002",
    expired: "4000000000000069",
    cvv: "4000000000000127",
    processing: "4000000000000119",
  },
};
