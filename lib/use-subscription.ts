"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";
import {
  getLastPlan,
  type SubscriptionPlan,
  type Payment,
} from "./payment-client";

export interface SubscriptionState {
  plan: SubscriptionPlan | null;
  payment: Payment | null;
  isLoading: boolean;
  error: string | null;
  hasPlan: boolean;
  refresh: () => Promise<void>;
}

interface UseSubscriptionOptions {
  /**
   * If true, redirects to pricing page when user has no active plan
   */
  requirePlan?: boolean;
  /**
   * Custom redirect path when requirePlan is true and no plan exists
   * Default: /pricing
   */
  redirectTo?: string;
}

export function useSubscription(
  options: UseSubscriptionOptions = {}
): SubscriptionState {
  const { requirePlan = false, redirectTo = "/pricing" } = options;
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getLastPlan();
      setPlan(data.plan);
      setPayment(data.payment);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load subscription"
      );
      setPlan(null);
      setPayment(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Initial fetch
  useEffect(() => {
    if (!authLoading) {
      fetchSubscription();
    }
  }, [authLoading, fetchSubscription]);

  // Redirect logic when requirePlan is true
  useEffect(() => {
    if (requirePlan && !authLoading && !isLoading && isAuthenticated && !plan) {
      router.replace(redirectTo);
    }
  }, [
    requirePlan,
    authLoading,
    isLoading,
    isAuthenticated,
    plan,
    router,
    redirectTo,
  ]);

  const hasPlan = !!plan && plan.slug !== "free";

  return {
    plan,
    payment,
    isLoading: authLoading || isLoading,
    error,
    hasPlan,
    refresh: fetchSubscription,
  };
}

/**
 * Check if user has a specific plan or higher tier
 */
export function usePlanAccess(requiredPlan: "starter" | "pro" | "enterprise") {
  const { plan, isLoading, hasPlan } = useSubscription();

  const planTiers: Record<string, number> = {
    free: 0,
    starter: 1,
    pro: 2,
    enterprise: 3,
  };

  const currentTier = plan ? planTiers[plan.slug] || 0 : 0;
  const requiredTier = planTiers[requiredPlan] || 0;

  return {
    hasAccess: currentTier >= requiredTier,
    currentPlan: plan?.slug || "free",
    isLoading,
    hasPlan,
  };
}
