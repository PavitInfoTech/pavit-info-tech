"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Shield,
  Lock,
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  Crown,
  Building2,
  MapPin,
  User,
  Calendar,
  Hash,
  ChevronRight,
  Star,
} from "lucide-react";
import { useAuth } from "@/lib/use-auth";
import {
  getSubscriptionPlan,
  subscribeToPlan,
  validateCardNumber,
  getCardBrand,
  formatCardNumber,
  validateExpiry,
  validateCVV,
  type SubscriptionPlan,
  type PaymentMethod,
  type BillingAddress,
} from "@/lib/payment-client";
import pricingData from "@/lib/pricing-plans.json";
import Link from "next/link";
import { LuNfc } from "react-icons/lu";

// Visual credit card component
function VisualCard({
  cardNumber,
  cardHolder,
  expiryMonth,
  expiryYear,
  cardBrand,
  isFlipped,
  cvv,
}: {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cardBrand: "visa" | "mastercard" | "amex" | "discover" | "unknown";
  isFlipped: boolean;
  cvv: string;
}) {
  const formatDisplayNumber = () => {
    const cleaned = cardNumber.replace(/\D/g, "");
    const padded = cleaned.padEnd(16, "•");
    if (cardBrand === "amex") {
      return `${padded.slice(0, 4)} ${padded.slice(4, 10)} ${padded.slice(
        10,
        15
      )}`;
    }
    return `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(
      8,
      12
    )} ${padded.slice(12, 16)}`;
  };

  const getBrandLogo = () => {
    switch (cardBrand) {
      case "visa":
        return <div className='text-xl font-bold italic text-white'>VISA</div>;
      case "mastercard":
        return (
          <div className='flex'>
            <div className='w-6 h-6 rounded-full bg-red-500 -mr-2' />
            <div className='w-6 h-6 rounded-full bg-yellow-500' />
          </div>
        );
      case "amex":
        return <div className='text-sm font-bold text-white'>AMEX</div>;
      case "discover":
        return (
          <div className='text-sm font-bold text-orange-400'>DISCOVER</div>
        );
      default:
        return <CreditCard className='w-8 h-8 text-white/60' />;
    }
  };

  const getGradient = () => {
    switch (cardBrand) {
      case "visa":
        return "from-blue-600 via-blue-700 to-indigo-800";
      case "mastercard":
        return "from-orange-500 via-red-600 to-rose-700";
      case "amex":
        return "from-cyan-500 via-teal-600 to-emerald-700";
      case "discover":
        return "from-orange-400 via-amber-500 to-yellow-600";
      default:
        return "from-slate-600 via-slate-700 to-slate-800";
    }
  };

  return (
    <div className='relative w-full max-w-[380px] h-[220px] perspective-1000'>
      <motion.div
        className='w-full h-full relative preserve-3d'
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl p-6 backface-hidden",
            "bg-linear-to-br",
            getGradient(),
            "shadow-2xl shadow-black/40"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Chip and contactless */}
          <div className='flex items-start justify-between mb-8'>
            <div className='flex items-center gap-3'>
              {/* Chip */}
              <div className='w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 grid grid-cols-3 gap-px p-1'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='bg-yellow-600/30 rounded-sm' />
                ))}
              </div>
              {/* Contactless */}
              <LuNfc className='w-6 h-6 text-white/70' />
            </div>
            {getBrandLogo()}
          </div>

          {/* Card number */}
          <div className='mb-6'>
            <div className='text-lg md:text-xl font-mono tracking-[0.2em] text-white'>
              {formatDisplayNumber()}
            </div>
          </div>

          {/* Bottom info */}
          <div className='flex justify-between items-end'>
            <div>
              <div className='text-[10px] uppercase text-white/50 mb-1'>
                Card Holder
              </div>
              <div className='text-sm font-medium text-white tracking-wide uppercase'>
                {cardHolder || "YOUR NAME"}
              </div>
            </div>
            <div className='text-right'>
              <div className='text-[10px] uppercase text-white/50 mb-1'>
                Expires
              </div>
              <div className='text-sm font-medium text-white'>
                {expiryMonth || "MM"}/{expiryYear || "YY"}
              </div>
            </div>
          </div>

          {/* Holographic overlay */}
          <div className='absolute inset-0 rounded-2xl bg-linear-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none' />
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl backface-hidden",
            "bg-linear-to-br",
            getGradient(),
            "shadow-2xl shadow-black/40"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Magnetic stripe */}
          <div className='mt-6 h-12 bg-black/80' />

          {/* Signature strip and CVV */}
          <div className='mt-6 px-6'>
            <div className='flex items-center gap-4'>
              <div className='flex-1 h-10 bg-white/90 rounded flex items-center justify-end px-4'>
                <span className='font-mono text-gray-800 italic text-sm'>
                  {cardHolder?.slice(0, 20) || "Signature"}
                </span>
              </div>
              <div className='bg-white px-4 py-2 rounded'>
                <div className='text-[10px] text-gray-500 mb-0.5'>CVV</div>
                <div className='font-mono text-gray-800 text-lg tracking-wider'>
                  {cvv || "•••"}
                </div>
              </div>
            </div>
          </div>

          {/* Info text */}
          <div className='absolute bottom-6 left-6 right-6'>
            <p className='text-[10px] text-white/50 leading-relaxed'>
              This card is property of Pavit InfoTech. If found, please return
              to nearest branch. Unauthorized use is prohibited.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Form input with icon
function FormInput({
  icon: Icon,
  label,
  error,
  success,
  className,
  ...props
}: {
  icon?: React.ElementType;
  label: string;
  error?: string;
  success?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='space-y-1.5'>
      <label className='text-sm font-medium text-white/70'>{label}</label>
      <div className='relative'>
        {Icon && (
          <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40' />
        )}
        <Input
          {...props}
          className={cn(
            "bg-white/5 border-white/10 h-11",
            Icon && "pl-10",
            error && "border-red-500/50 focus:border-red-500",
            success && "border-emerald-500/50",
            className
          )}
        />
        {success && !error && (
          <Check className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500' />
        )}
        {error && (
          <AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500' />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-xs text-red-400'
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Plan summary card
function PlanSummary({
  plan,
  isYearly,
}: {
  plan: SubscriptionPlan;
  isYearly: boolean;
}) {
  const price = parseFloat(plan.price);
  const displayPrice = isYearly ? price * 12 * 0.8 : price;
  const savings = isYearly ? price * 12 * 0.2 : 0;

  return (
    <Card className='bg-white/5 border-white/10 p-6'>
      <div className='flex items-start gap-4 mb-6'>
        <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
          {plan.slug === "starter" && <Sparkles className='w-6 h-6' />}
          {plan.slug === "pro" && <Crown className='w-6 h-6' />}
          {plan.slug === "enterprise" && <Building2 className='w-6 h-6' />}
        </div>
        <div>
          <h3 className='text-lg font-semibold'>{plan.name} Plan</h3>
          <p className='text-sm text-white/60'>{plan.description}</p>
        </div>
      </div>

      <div className='space-y-3 mb-6'>
        {plan.features.slice(0, 5).map((feature, i) => (
          <div key={i} className='flex items-center gap-2 text-sm'>
            <Check className='w-4 h-4 text-emerald-500 flex-shrink-0' />
            <span className='text-white/80'>{feature}</span>
          </div>
        ))}
        {plan.features.length > 5 && (
          <p className='text-xs text-white/50 pl-6'>
            +{plan.features.length - 5} more features
          </p>
        )}
      </div>

      <div className='border-t border-white/10 pt-4 space-y-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-white/60'>Plan price</span>
          <span>
            ${price.toFixed(2)}/{plan.interval === "yearly" ? "year" : "mo"}
          </span>
        </div>
        {isYearly && (
          <div className='flex justify-between text-sm'>
            <span className='text-white/60'>Annual (20% off)</span>
            <span className='text-emerald-400'>-${savings.toFixed(2)}</span>
          </div>
        )}
        <div className='flex justify-between text-lg font-bold pt-2 border-t border-white/10'>
          <span>Total</span>
          <span className='text-emerald-400'>
            ${displayPrice.toFixed(2)}
            <span className='text-sm font-normal text-white/60'>
              /{isYearly ? "year" : "mo"}
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
}

// Main checkout content
function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth({ requireAuth: true });

  const planSlug = searchParams.get("plan") || "starter";
  const billingCycle = searchParams.get("billing") || "monthly";
  const isYearly = billingCycle === "yearly";

  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);
  const [planError, setPlanError] = useState("");

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  // Billing address
  const [showBilling, setShowBilling] = useState(false);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US",
  });

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Payment state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Derived values
  const cardBrand = getCardBrand(cardNumber);
  const formattedCardNumber = formatCardNumber(cardNumber);

  // Load plan details
  useEffect(() => {
    type LocalPlan = {
      name: string;
      slug: string;
      monthlyPrice: number | null;
      yearlyPrice: number | null;
      description: string;
      features: string[];
      cta: string;
      highlighted?: boolean;
    };

    async function loadPlan() {
      try {
        const planData = await getSubscriptionPlan(planSlug);
        setPlan(planData);
      } catch {
        // Fallback to local pricing data if API plan isn't available
        const local = (pricingData as { plans: LocalPlan[] }).plans.find(
          (p) => p.slug === planSlug
        );
        if (local) {
          // Map the local pricing entry into SubscriptionPlan shape expected by UI
          const fallbackPlan = {
            id: 0,
            name: local.name,
            slug: local.slug,
            description: local.description,
            price: String(
              isYearly
                ? local.yearlyPrice ?? local.monthlyPrice ?? 0
                : local.monthlyPrice ?? 0
            ),
            currency: "USD",
            interval: isYearly ? "yearly" : "monthly",
            trial_days: 0,
            features: local.features,
            is_active: true,
          } as SubscriptionPlan;

          setPlan(fallbackPlan);
        } else {
          setPlanError("Plan not found. Please select a valid plan.");
        }
      } finally {
        setIsLoadingPlan(false);
      }
    }
    loadPlan();
  }, [planSlug, isYearly]);

  // Validation
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (touched.cardNumber && cardNumber) {
      if (!validateCardNumber(cardNumber)) {
        newErrors.cardNumber = "Invalid card number";
      }
    }

    if (touched.cardHolder && !cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }

    if (touched.expiry && (expiryMonth || expiryYear)) {
      if (!validateExpiry(expiryMonth, expiryYear)) {
        newErrors.expiry = "Invalid or expired date";
      }
    }

    if (touched.cvv && cvv) {
      if (!validateCVV(cvv, cardBrand)) {
        newErrors.cvv =
          cardBrand === "amex"
            ? "CVV must be 4 digits"
            : "CVV must be 3 digits";
      }
    }

    setErrors(newErrors);
  }, [
    cardNumber,
    cardHolder,
    expiryMonth,
    expiryYear,
    cvv,
    touched,
    cardBrand,
  ]);

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value);
  };

  // Handle expiry input
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 2) {
      setExpiryMonth(value.slice(0, 2));
      setExpiryYear(value.slice(2, 4));
    } else {
      setExpiryMonth(value);
      setExpiryYear("");
    }
  };

  // Handle CVV input
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLen = cardBrand === "amex" ? 4 : 3;
    const value = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    setCvv(value);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      validateCardNumber(cardNumber) &&
      cardHolder.trim() &&
      validateExpiry(expiryMonth, expiryYear) &&
      validateCVV(cvv, cardBrand) &&
      Object.keys(errors).length === 0
    );
  };

  // Handle payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      cardNumber: true,
      cardHolder: true,
      expiry: true,
      cvv: true,
    });

    if (!isFormValid() || !plan) return;

    setIsProcessing(true);
    setPaymentError("");

    try {
      const paymentMethod: PaymentMethod = {
        card_number: cardNumber,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        cvv,
        card_holder: cardHolder,
      };

      await subscribeToPlan(
        planSlug,
        paymentMethod,
        showBilling ? billingAddress : undefined
      );

      setPaymentSuccess(true);

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading while auth is checking
  if (authLoading || isLoadingPlan) {
    return (
      <MainLayout>
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-blue-500' />
            <p className='text-white/60'>Loading checkout...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Show error if plan not found
  if (planError || !plan) {
    return (
      <MainLayout>
        <div className='min-h-screen flex items-center justify-center'>
          <Card className='bg-white/5 border-white/10 p-8 max-w-md text-center'>
            <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
            <h2 className='text-xl font-semibold mb-2'>Plan Not Found</h2>
            <p className='text-white/60 mb-6'>
              {planError || "The selected plan could not be found."}
            </p>
            <Button asChild>
              <Link href='/pricing'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Pricing
              </Link>
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  // Show success state
  if (paymentSuccess) {
    return (
      <MainLayout>
        <div className='min-h-screen flex items-center justify-center'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='text-center'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className='w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6'
            >
              <Check className='w-10 h-10 text-emerald-500' />
            </motion.div>
            <h2 className='text-2xl font-bold mb-2'>Payment Successful!</h2>
            <p className='text-white/60 mb-4'>
              Welcome to the {plan.name} plan. Redirecting to dashboard...
            </p>
            <Loader2 className='w-5 h-5 animate-spin mx-auto text-white/40' />
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className='min-h-screen py-16'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <Link
              href='/pricing'
              className='inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to pricing
            </Link>
            <h1 className='text-3xl font-bold'>Complete Your Purchase</h1>
            <p className='text-white/60 mt-2'>
              Subscribe to the {plan.name} plan and unlock all features
            </p>
          </div>

          <div className='grid lg:grid-cols-5 gap-8'>
            {/* Payment form - 3 columns */}
            <div className='lg:col-span-3 space-y-6'>
              {/* Visual card */}
              <div className='flex justify-center py-6'>
                <VisualCard
                  cardNumber={cardNumber}
                  cardHolder={cardHolder}
                  expiryMonth={expiryMonth}
                  expiryYear={expiryYear}
                  cardBrand={cardBrand}
                  isFlipped={isFlipped}
                  cvv={cvv}
                />
              </div>

              {/* Card form */}
              <Card className='bg-white/5 border-white/10 p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                    <CreditCard className='w-5 h-5 text-blue-400' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Payment Details</h3>
                    <p className='text-xs text-white/50'>
                      All transactions are secure and encrypted
                    </p>
                  </div>
                  <Lock className='w-4 h-4 text-emerald-500 ml-auto' />
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <FormInput
                    icon={CreditCard}
                    label='Card Number'
                    placeholder='1234 5678 9012 3456'
                    value={formattedCardNumber}
                    onChange={handleCardNumberChange}
                    onBlur={() => setTouched({ ...touched, cardNumber: true })}
                    error={errors.cardNumber}
                    success={
                      touched.cardNumber && validateCardNumber(cardNumber)
                    }
                    autoComplete='cc-number'
                  />

                  <FormInput
                    icon={User}
                    label='Card Holder Name'
                    placeholder='JOHN DOE'
                    value={cardHolder}
                    onChange={(e) =>
                      setCardHolder(e.target.value.toUpperCase())
                    }
                    onBlur={() => setTouched({ ...touched, cardHolder: true })}
                    error={errors.cardHolder}
                    success={touched.cardHolder && !!cardHolder.trim()}
                    autoComplete='cc-name'
                  />

                  <div className='grid grid-cols-2 gap-4'>
                    <FormInput
                      icon={Calendar}
                      label='Expiry Date'
                      placeholder='MM/YY'
                      value={
                        expiryMonth
                          ? `${expiryMonth}${
                              expiryYear ? "/" + expiryYear : ""
                            }`
                          : ""
                      }
                      onChange={handleExpiryChange}
                      onBlur={() => setTouched({ ...touched, expiry: true })}
                      error={errors.expiry}
                      success={
                        touched.expiry &&
                        validateExpiry(expiryMonth, expiryYear)
                      }
                      autoComplete='cc-exp'
                    />

                    <FormInput
                      icon={Hash}
                      label={cardBrand === "amex" ? "CVV (4 digits)" : "CVV"}
                      placeholder={cardBrand === "amex" ? "1234" : "123"}
                      value={cvv}
                      onChange={handleCvvChange}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => {
                        setIsFlipped(false);
                        setTouched({ ...touched, cvv: true });
                      }}
                      error={errors.cvv}
                      success={touched.cvv && validateCVV(cvv, cardBrand)}
                      autoComplete='cc-csc'
                      type='password'
                    />
                  </div>

                  {/* Billing address toggle */}
                  <button
                    type='button'
                    onClick={() => setShowBilling(!showBilling)}
                    className='flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors'
                  >
                    <MapPin className='w-4 h-4' />
                    {showBilling
                      ? "Hide billing address"
                      : "Add billing address (optional)"}
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        showBilling && "rotate-90"
                      )}
                    />
                  </button>

                  {/* Billing address form */}
                  <AnimatePresence>
                    {showBilling && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className='space-y-4 overflow-hidden'
                      >
                        <FormInput
                          label='Street Address'
                          placeholder='123 Main Street'
                          value={billingAddress.line1}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              line1: e.target.value,
                            })
                          }
                        />
                        <div className='grid grid-cols-2 gap-4'>
                          <FormInput
                            label='City'
                            placeholder='San Francisco'
                            value={billingAddress.city}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                city: e.target.value,
                              })
                            }
                          />
                          <FormInput
                            label='State'
                            placeholder='CA'
                            value={billingAddress.state}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <FormInput
                            label='Postal Code'
                            placeholder='94102'
                            value={billingAddress.postal_code}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                postal_code: e.target.value,
                              })
                            }
                          />
                          <FormInput
                            label='Country'
                            placeholder='US'
                            value={billingAddress.country}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error message */}
                  <AnimatePresence>
                    {paymentError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className='flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20'
                      >
                        <AlertCircle className='w-4 h-4 text-red-500 flex-shrink-0' />
                        <p className='text-sm text-red-400'>{paymentError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <Button
                    type='submit'
                    disabled={isProcessing || !isFormValid()}
                    className='w-full h-12 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold'
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className='w-4 h-4 mr-2' />
                        Pay $
                        {isYearly
                          ? (parseFloat(plan.price) * 12 * 0.8).toFixed(2)
                          : parseFloat(plan.price).toFixed(2)}
                      </>
                    )}
                  </Button>

                  {/* Security badges */}
                  <div className='flex items-center justify-center gap-4 pt-4 text-xs text-white/40'>
                    <div className='flex items-center gap-1'>
                      <Shield className='w-3 h-3' />
                      SSL Encrypted
                    </div>
                    <div className='flex items-center gap-1'>
                      <Lock className='w-3 h-3' />
                      PCI Compliant
                    </div>
                    <div className='flex items-center gap-1'>
                      <Star className='w-3 h-3' />
                      Sandbox Mode
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            {/* Order summary - 2 columns */}
            <div className='lg:col-span-2 space-y-6'>
              <PlanSummary plan={plan} isYearly={isYearly} />

              {/* User info */}
              {user && (
                <Card className='bg-white/5 border-white/10 p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                      <span className='text-sm font-bold'>
                        {user.first_name?.[0] || user.username?.[0] || "U"}
                      </span>
                    </div>
                    <div>
                      <p className='font-medium'>
                        {user.first_name} {user.last_name}
                      </p>
                      <p className='text-sm text-white/50'>{user.email}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Trust badges */}
              <Card className='bg-white/5 border-white/10 p-4'>
                <h4 className='text-sm font-medium mb-3'>Why choose us?</h4>
                <div className='space-y-2'>
                  {[
                    "30-day money-back guarantee",
                    "Cancel anytime, no questions asked",
                    "24/7 customer support",
                    "99.9% uptime SLA",
                  ].map((item, i) => (
                    <div key={i} className='flex items-center gap-2 text-sm'>
                      <Check className='w-4 h-4 text-emerald-500' />
                      <span className='text-white/70'>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

// Main component with Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <MainLayout>
          <div className='min-h-screen flex items-center justify-center'>
            <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
          </div>
        </MainLayout>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
