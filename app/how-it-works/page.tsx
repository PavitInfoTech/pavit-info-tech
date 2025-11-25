import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"

const steps = [
  {
    number: "1",
    title: "Connect Devices & Sensors",
    description:
      "Securely connect your IoT devices and sensors to the PavitInfoTech platform using our lightweight SDKs or APIs.",
  },
  {
    number: "2",
    title: "Real-time Data Collection",
    description:
      "Devices send real-time data streams to our cloud infrastructure with millisecond latency and enterprise-grade security.",
  },
  {
    number: "3",
    title: "AI Processing & Analysis",
    description:
      "Our AI engine processes metrics in real-time, detecting patterns, anomalies, and predictive signals automatically.",
  },
  {
    number: "4",
    title: "Insights & Visualization",
    description: "View comprehensive dashboards showing device health, performance metrics, and AI-generated insights.",
  },
  {
    number: "5",
    title: "Intelligent Alerts",
    description:
      "Receive automated alerts for anomalies, predicted failures, and critical events across your infrastructure.",
  },
  {
    number: "6",
    title: "Optimize Performance",
    description: "Use AI insights to optimize device performance, schedule maintenance, and maximize uptime.",
  },
]

export default function HowItWorksPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-serif mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From device connection to intelligent insights in 6 simple steps
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                {index < steps.length - 1 && <div className="w-0.5 h-20 bg-border mt-2" />}
              </div>
              <Card className="p-6 flex-1 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Visual Flow */}
        <div className="mt-16 p-8 bg-card rounded-lg border border-border">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-serif mb-6">The Data Flow</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <p className="font-semibold">Devices & Sensors</p>
              </div>
              <div className="hidden md:block text-2xl text-muted-foreground">→</div>
              <div className="text-center">
                <div className="text-3xl mb-2">☁️</div>
                <p className="font-semibold">Cloud Platform</p>
              </div>
              <div className="hidden md:block text-2xl text-muted-foreground">→</div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <p className="font-semibold">AI Engine</p>
              </div>
              <div className="hidden md:block text-2xl text-muted-foreground">→</div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold">Dashboard</p>
              </div>
              <div className="hidden md:block text-2xl text-muted-foreground">→</div>
              <div className="text-center">
                <div className="text-3xl mb-2">✨</div>
                <p className="font-semibold">Optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
