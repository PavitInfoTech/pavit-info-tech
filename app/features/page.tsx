import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"

const featureDetails = [
  {
    category: "Monitoring",
    features: [
      {
        title: "Real-time Device Monitoring",
        description:
          "Live dashboards displaying device status, metrics, and performance indicators across your entire infrastructure.",
      },
      {
        title: "Sensor Performance Analytics",
        description: "Detailed analytics on individual sensor performance, accuracy, and historical trends.",
      },
      {
        title: "Device Grouping & Segmentation",
        description: "Organize devices by location, type, or custom criteria for easier management and analysis.",
      },
    ],
  },
  {
    category: "Intelligence",
    features: [
      {
        title: "AI-Powered Anomaly Detection",
        description:
          "Machine learning algorithms automatically identify unusual patterns and potential system failures.",
      },
      {
        title: "Predictive Maintenance Forecasting",
        description: "Predict equipment failures before they occur, enabling proactive maintenance scheduling.",
      },
      {
        title: "Device Health Scoring",
        description: "Comprehensive health metrics for each device with visual indicators and trend analysis.",
      },
    ],
  },
  {
    category: "Visualization",
    features: [
      {
        title: "Digital Twin Visualization",
        description:
          "Create virtual representations of your physical IoT ecosystem for immersive monitoring and analysis.",
      },
      {
        title: "Customizable Dashboard Widgets",
        description: "Build personalized dashboards with drag-and-drop widgets tailored to your needs.",
      },
      {
        title: "Alerting System",
        description: "Intelligent notifications for faults, anomalies, and threshold breaches with custom routing.",
      },
    ],
  },
  {
    category: "Security & Integration",
    features: [
      {
        title: "Secure Device-to-Cloud Pipeline",
        description: "End-to-end encryption and authentication for all device communications.",
      },
      {
        title: "Multi-site Integrations",
        description: "Connect and manage devices across multiple locations and networks seamlessly.",
      },
      {
        title: "API Access",
        description: "RESTful APIs for custom integrations with your existing enterprise systems.",
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-serif mb-4">Powerful IoT Platform Features</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade capabilities designed for modern IoT operations
          </p>
        </div>

        <div className="space-y-16">
          {featureDetails.map((section) => (
            <div key={section.category}>
              <h2 className="text-3xl font-bold font-serif mb-8">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.features.map((feature) => (
                  <Card key={feature.title} className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
