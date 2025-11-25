import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "Perfect for small IoT deployments",
    features: [
      "Real-time device monitoring",
      "Basic analytics & reports",
      "Up to 100 devices",
      "Email support",
      "Standard dashboard",
      "Data retention: 30 days",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$999",
    period: "/month",
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
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
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
    cta: "Request Enterprise Access",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-serif mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your IoT infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 relative transition-all ${
                plan.highlighted ? "border-primary shadow-xl scale-105 md:scale-100" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              <Button className="w-full mb-6" variant={plan.highlighted ? "default" : "outline"} asChild>
                <Link href="/auth/signup">{plan.cta}</Link>
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold font-serif mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Real-time Monitoring", starter: true, pro: true, enterprise: true },
                  { feature: "Anomaly Detection", starter: false, pro: true, enterprise: true },
                  { feature: "Predictive Maintenance", starter: false, pro: true, enterprise: true },
                  { feature: "Digital Twins", starter: false, pro: false, enterprise: true },
                  { feature: "Multi-site Integrations", starter: false, pro: false, enterprise: true },
                  { feature: "Custom Integrations", starter: false, pro: false, enterprise: true },
                  { feature: "Priority Support", starter: false, pro: true, enterprise: true },
                  { feature: "24/7 Support", starter: false, pro: false, enterprise: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border">
                    <td className="py-4 px-4">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {row.starter ? <Check className="w-5 h-5 text-primary mx-auto" /> : "-"}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.pro ? <Check className="w-5 h-5 text-primary mx-auto" /> : "-"}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.enterprise ? <Check className="w-5 h-5 text-primary mx-auto" /> : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
