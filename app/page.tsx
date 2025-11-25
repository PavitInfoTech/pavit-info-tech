import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Real-time Monitoring",
    description:
      "Monitor IoT devices and sensors with live dashboards and instant updates",
    icon: "📊",
  },
  {
    title: "AI Anomaly Detection",
    description:
      "Automatically identify unusual patterns and potential failures",
    icon: "🤖",
  },
  {
    title: "Predictive Maintenance",
    description: "Forecast equipment failures before they happen",
    icon: "🔮",
  },
  {
    title: "Device Health Scoring",
    description: "Comprehensive health metrics for each device",
    icon: "💓",
  },
  {
    title: "Digital Twin Visualization",
    description: "Virtual representations of physical IoT ecosystems",
    icon: "🌐",
  },
  {
    title: "Smart Alerting System",
    description: "Intelligent notifications for faults and anomalies",
    icon: "🚨",
  },
];

const stats = [
  { number: "10K+", label: "Devices Monitored" },
  { number: "99.9%", label: "Uptime" },
  { number: "500ms", label: "Avg Response Time" },
  { number: "24/7", label: "Support" },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-linear-to-br from-slate-900/80 via-[#071028]/70 to-slate-800/90 text-white'>
        {/* Decorative shapes behind the hero */}
        <div className='absolute -left-32 top-1/2 transform -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-linear-to-br from-primary/50 via-secondary/30 to-transparent opacity-30 blur-3xl pointer-events-none' />
        <div className='absolute -right-28 top-1/3 w-[520px] h-[520px] rounded-full bg-linear-to-tr from-secondary/40 via-primary/20 to-transparent opacity-25 blur-3xl pointer-events-none' />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative z-10 text-center'>
          <div className='space-y-6'>
            <div className='inline-block px-4 py-2 bg-accent/10 border border-accent rounded-full text-sm font-semibold text-accent'>
              Intelligent IoT Platform
            </div>

            <h1 className='font-serif font-extrabold tracking-tight leading-[0.86] text-[48px] md:text-[110px] lg:text-[140px] text-white mx-auto max-w-[1100px]'>
              <span className='block md:inline'>AI-Powered</span>
              <span className='block md:inline'>IoT Intelligence</span>
            </h1>

            <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty'>
              Monitor, predict, and optimize your IoT devices with
              enterprise-grade AI analytics. Detect anomalies before they become
              costly problems.
            </p>

            <div className='flex gap-4 justify-center pt-4 flex-wrap'>
              <Button size='lg' asChild>
                <Link href='/auth/signup'>Start Free Trial</Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='/contact'>Schedule Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16'>
            {stats.map((stat) => (
              <div key={stat.label} className='space-y-1'>
                <p className='text-3xl md:text-4xl font-bold text-primary'>
                  {stat.number}
                </p>
                <p className='text-sm text-muted-foreground'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold font-serif mb-4'>
            Powerful Features
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to manage your IoT infrastructure intelligently
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature) => (
            <Card
              key={feature.title}
              className='p-6 hover:shadow-lg transition-shadow'
            >
              <div className='text-4xl mb-3'>{feature.icon}</div>
              <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
              <p className='text-muted-foreground text-sm'>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16'>
        <Card className='p-8 md:p-12 bg-linear-to-r from-primary/10 to-secondary/10 border-primary/20'>
          <div className='text-center space-y-6'>
            <h2 className='text-3xl md:text-4xl font-bold font-serif'>
              Ready to Transform Your IoT Operations?
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Join hundreds of enterprises trusting PavitInfoTech for
              intelligent device management
            </p>
            <Button size='lg' asChild>
              <Link href='/auth/signup'>Get Started Free</Link>
            </Button>
          </div>
        </Card>
      </section>
    </MainLayout>
  );
}
