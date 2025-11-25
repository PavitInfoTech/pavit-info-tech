import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    bio: "IoT and AI systems architect with 15+ years in enterprise technology",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of ML & Predictive Analytics",
    bio: "Machine learning expert specializing in anomaly detection and forecasting",
  },
  {
    name: "Priya Patel",
    role: "VP Product",
    bio: "Product leader focused on enterprise IoT solutions and customer success",
  },
  {
    name: "James Wilson",
    role: "Chief Security Officer",
    bio: "Cybersecurity specialist ensuring enterprise-grade data protection",
  },
]

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16">
        {/* Mission & Vision */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-serif mb-6">About PavitInfoTech</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We're on a mission to transform how enterprises manage and optimize their IoT infrastructure through
            intelligent AI analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-accent/5">
            <h2 className="text-2xl font-bold font-serif mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To bring intelligence, automation, and reliability to IoT operations, enabling enterprises to make
              data-driven decisions and maximize device performance.
            </p>
          </Card>
          <Card className="p-8 bg-secondary/5">
            <h2 className="text-2xl font-bold font-serif mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              Smarter, data-driven ecosystems powered by real-time AI insights that automatically detect issues, predict
              failures, and optimize operations.
            </p>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-serif mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Excellence",
                description:
                  "We deliver enterprise-grade solutions with the highest standards of performance and reliability.",
              },
              {
                title: "Innovation",
                description: "We continuously advance AI and IoT technologies to solve complex real-world challenges.",
              },
              {
                title: "Trust & Security",
                description: "We prioritize data security and customer trust as the foundation of our platform.",
              },
            ].map((value) => (
              <Card key={value.title} className="p-6">
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-serif mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6">
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-card rounded-lg border border-border">
          {[
            { number: "500+", label: "Enterprise Clients" },
            { number: "10M+", label: "Devices Monitored" },
            { number: "99.9%", label: "Platform Uptime" },
            { number: "2B+", label: "Data Points Daily" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
