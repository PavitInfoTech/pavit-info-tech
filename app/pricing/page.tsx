"use client";

import { useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Loader2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 99,
    yearlyPrice: 82,
    description: "Perfect for small IoT deployments",
    features: [
      "Real-time device monitoring",
      "Basic analytics & reports",
      "Up to 100 devices",
      "Email support",
      "Standard dashboard",
      "Data retention: 30 days",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 169,
    yearlyPrice: 136,
    description: "For growing IoT operations",
    features: [
      "All Starter features",
      "AI anomaly detection",
      "Predictive maintenance",
      "Up to 1,000 devices",
      "Priority email & chat support",
      "Advanced customization",
      "Data retention: 90 days",
      "Automated alerts & notifications",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "For large-scale IoT ecosystems",
    features: [
      "All Pro features",
      "Digital twin visualization",
      "Multi-site integrations",
      "Unlimited devices",
      "Dedicated account manager",
      "24/7 phone & email support",
      "Custom integrations",
      "Data retention: Unlimited",
      "Advanced security & compliance",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, you'll receive credit toward your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), bank transfers for annual plans, and can arrange invoicing for Enterprise customers.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, there are no setup fees for Starter or Pro plans. Enterprise plans may include optional professional services for custom integrations, which are quoted separately.",
  },
  {
    question: "What happens if I exceed my device limit?",
    answer:
      "You'll receive a notification when you reach 80% of your device limit. If you exceed the limit, we'll work with you to upgrade to an appropriate plan without service interruption.",
  },
  {
    question:
      "Do you offer discounts for nonprofits or educational institutions?",
    answer:
      "Yes! We offer special pricing for qualified nonprofits, educational institutions, and research organizations. Contact our sales team to learn more.",
  },
  {
    question: "What's included in the Enterprise SLA?",
    answer:
      "Enterprise plans include a 99.99% uptime SLA, dedicated support channels, custom data retention policies, and priority incident response with defined resolution times.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePlanClick = (planName: string) => {
    setLoadingPlan(planName);
    // Simulate loading delay before navigation
    setTimeout(() => {
      setLoadingPlan(null);
    }, 1500);
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    return `$${price}`;
  };

  const getYearlySavings = (monthly: number | null, yearly: number | null) => {
    if (monthly === null || yearly === null) return 0;
    return Math.round(((monthly - yearly) / monthly) * 100);
  };

  return (
    <MainLayout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold font-serif mb-4'>
            Predictive Power at Every Price Point
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto mb-8'>
            Choose the perfect plan for your IoT infrastructure
          </p>

          {/* Billing Toggle */}
          <div className='flex items-center justify-center gap-4'>
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isYearly ? "bg-primary" : "bg-slate-700"
              }`}
              aria-label='Toggle billing period'
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isYearly ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Yearly
            </span>
            {isYearly && (
              <span className='ml-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-full animate-pulse'>
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = getYearlySavings(
              plan.monthlyPrice,
              plan.yearlyPrice
            );
            const isLoading = loadingPlan === plan.name;

            return (
              <Card
                key={plan.name}
                className={`p-8 relative transition-all duration-300 hover:shadow-xl ${
                  plan.highlighted
                    ? "border-primary shadow-xl md:scale-105"
                    : "hover:border-primary/50"
                }`}
              >
                {plan.highlighted && (
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold'>
                    Most Popular
                  </div>
                )}

                {isYearly && savings > 0 && (
                  <div className='absolute top-4 right-4 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded'>
                    Save {savings}%
                  </div>
                )}

                <div className='mb-6'>
                  <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                  <p className='text-muted-foreground text-sm mb-4'>
                    {plan.description}
                  </p>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-bold'>
                      {formatPrice(price)}
                    </span>
                    {price !== null && (
                      <span className='text-muted-foreground'>
                        /{isYearly ? "mo, billed yearly" : "month"}
                      </span>
                    )}
                    {price === null && (
                      <span className='text-muted-foreground'>pricing</span>
                    )}
                  </div>
                  {isYearly && plan.yearlyPrice !== null && (
                    <p className='text-xs text-muted-foreground mt-1'>
                      ${plan.yearlyPrice * 12}/year
                    </p>
                  )}
                </div>

                <Button
                  className={`w-full mb-6 relative overflow-hidden transition-all duration-300 ${
                    isLoading ? "pointer-events-none" : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => handlePlanClick(plan.name)}
                  disabled={isLoading}
                  asChild={!isLoading}
                >
                  {isLoading ? (
                    <span className='flex items-center justify-center gap-2'>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      <span>Processing...</span>
                    </span>
                  ) : (
                    <Link
                      href={
                        plan.name === "Enterprise" ? "/contact" : "/auth/signup"
                      }
                    >
                      {plan.cta}
                    </Link>
                  )}
                </Button>

                <div className='space-y-3'>
                  {plan.features.map((feature) => (
                    <div key={feature} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                      <span className='text-sm text-foreground'>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold font-serif mb-8 text-center'>
            Feature Comparison
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='text-left py-4 px-4 font-semibold'>Feature</th>
                  <th className='text-center py-4 px-4 font-semibold'>
                    Starter
                  </th>
                  <th className='text-center py-4 px-4 font-semibold'>Pro</th>
                  <th className='text-center py-4 px-4 font-semibold'>
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Real-time Monitoring",
                    starter: true,
                    pro: true,
                    enterprise: true,
                  },
                  {
                    feature: "Anomaly Detection",
                    starter: false,
                    pro: true,
                    enterprise: true,
                  },
                  {
                    feature: "Predictive Maintenance",
                    starter: false,
                    pro: true,
                    enterprise: true,
                  },
                  {
                    feature: "Digital Twins",
                    starter: false,
                    pro: false,
                    enterprise: true,
                  },
                  {
                    feature: "Multi-site Integrations",
                    starter: false,
                    pro: false,
                    enterprise: true,
                  },
                  {
                    feature: "Custom Integrations",
                    starter: false,
                    pro: false,
                    enterprise: true,
                  },
                  {
                    feature: "Priority Support",
                    starter: false,
                    pro: true,
                    enterprise: true,
                  },
                  {
                    feature: "24/7 Support",
                    starter: false,
                    pro: false,
                    enterprise: true,
                  },
                ].map((row) => (
                  <tr key={row.feature} className='border-b border-border'>
                    <td className='py-4 px-4'>{row.feature}</td>
                    <td className='text-center py-4 px-4'>
                      {row.starter ? (
                        <Check className='w-5 h-5 text-primary mx-auto' />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className='text-center py-4 px-4'>
                      {row.pro ? (
                        <Check className='w-5 h-5 text-primary mx-auto' />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className='text-center py-4 px-4'>
                      {row.enterprise ? (
                        <Check className='w-5 h-5 text-primary mx-auto' />
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-24'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold font-serif mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Have questions about our pricing? Find answers to the most common
              questions below.
            </p>
          </div>

          <div className='max-w-3xl mx-auto space-y-4'>
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`overflow-hidden py-0 gap-0 transition-all duration-300 ${
                  openFaq === index ? "border-primary/50" : ""
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className='w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors'
                >
                  <span className='font-medium pr-4'>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className='overflow-hidden'>
                    <p className='px-6 pb-4 text-muted-foreground text-sm leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='mt-24 text-center'>
          <Card className='p-12 bg-linear-to-br from-primary/10 via-background to-background border-primary/20'>
            <h2 className='text-3xl font-bold font-serif mb-4'>
              Still have questions?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Our team is here to help you find the perfect plan for your IoT
              infrastructure needs.
            </p>
            <div className='flex flex-wrap gap-4 justify-center'>
              <Button size='lg' asChild>
                <Link href='/contact'>Talk to Sales</Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='/features'>View All Features</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
