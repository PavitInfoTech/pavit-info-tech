"use client";

import { useState, useEffect, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import {
  Leaf,
  Zap,
  Recycle,
  Factory,
  Cpu,
  Database,
  Shield,
  TrendingUp,
} from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    bio: "IoT and AI systems architect with 15+ years in enterprise technology",
    initials: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of ML & Predictive Analytics",
    bio: "Machine learning expert specializing in anomaly detection and forecasting",
    initials: "MR",
  },
  {
    name: "Priya Patel",
    role: "VP Product",
    bio: "Product leader focused on enterprise IoT solutions and customer success",
    initials: "PP",
  },
  {
    name: "James Wilson",
    role: "Chief Security Officer",
    bio: "Cybersecurity specialist ensuring enterprise-grade data protection",
    initials: "JW",
  },
];

const milestones = [
  {
    year: "2019",
    title: "The Spark",
    description:
      "Founded with a vision to bring intelligence to industrial IoT systems.",
  },
  {
    year: "2020",
    title: "The First Algorithm",
    description:
      "Developed our proprietary anomaly detection engine, achieving 94% accuracy.",
  },
  {
    year: "2021",
    title: "Enterprise Launch",
    description:
      "Launched our platform for enterprise clients, onboarding 50 companies in year one.",
  },
  {
    year: "2022",
    title: "Reaching 1M Devices",
    description:
      "Crossed the milestone of monitoring one million connected devices globally.",
  },
  {
    year: "2023",
    title: "AI Core Evolution",
    description:
      "Released predictive maintenance models with 97%+ accuracy and Digital Twin visualization.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Expanded to 30+ countries, processing over 2 billion data points daily.",
  },
];

const liveStats = [
  { label: "Sensors Monitored", value: 12847392, suffix: "", icon: Cpu },
  { label: "Anomalies Prevented", value: 847291, suffix: "", icon: Shield },
  { label: "Terabytes Processed", value: 2.4, suffix: " PB", icon: Database },
  { label: "Energy Saved", value: 34, suffix: "%", icon: Zap },
];

const sustainabilityFeatures = [
  {
    icon: Leaf,
    title: "Carbon Reduction",
    stat: "40% less emissions",
    description:
      "Our predictive models help enterprises optimize energy consumption and reduce their carbon footprint.",
  },
  {
    icon: Recycle,
    title: "Waste Prevention",
    stat: "60% fewer failures",
    description:
      "Early detection prevents catastrophic failures, reducing equipment waste and replacement cycles.",
  },
  {
    icon: Factory,
    title: "Efficient Operations",
    stat: "25% energy savings",
    description:
      "Smart scheduling and load balancing minimize energy usage across industrial operations.",
  },
];

// Animated counter hook
function useCountUp(
  end: number,
  duration: number = 2000,
  start: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(end * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Observe timeline scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setActiveTimeline((prev) => Math.max(prev, index));
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px" }
    );

    const items = document.querySelectorAll("[data-timeline-item]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Observe stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated stat values
  const stat0 = useCountUp(liveStats[0].value, 2500, statsVisible);
  const stat1 = useCountUp(liveStats[1].value, 2500, statsVisible);
  const stat2 = useCountUp(liveStats[2].value, 2500, statsVisible);
  const stat3 = useCountUp(liveStats[3].value, 2500, statsVisible);
  const animatedStats = [stat0, stat1, stat2, stat3];

  const formatNumber = (num: number, index: number) => {
    if (index === 2) return num.toFixed(1); // Terabytes
    if (index === 3) return Math.round(num); // Percentage
    return Math.round(num).toLocaleString();
  };

  return (
    <MainLayout>
      {/* Section 1: Mission Statement */}
      <section className='relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-background'>
        {/* Subtle grid background */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-size-[60px_60px]' />

        {/* Floating particles */}
        <div className='absolute inset-0 overflow-hidden'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute w-1 h-1 rounded-full bg-primary/30 animate-pulse'
              style={{
                left: `${10 + i * 4}%`,
                top: `${15 + (i % 5) * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-8 leading-tight text-white'>
            Bridging the Physical
            <span className='block text-primary'>and Digital Worlds.</span>
          </h1>
          <p className='text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed'>
            We believe technology should serve humanity — not the other way
            around. Our mission is to bring warmth, intelligence, and purpose to
            every connected device.
          </p>
        </div>
      </section>

      {/* Section 2: The Origin Story - Timeline */}
      <section className='py-24 bg-background' ref={timelineRef}>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Our Journey
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              The Origin Story
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              From a spark of an idea to transforming industries worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div className='relative'>
            {/* Vertical line */}
            <div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800'>
              <div
                className='absolute top-0 left-0 w-full bg-primary transition-all duration-700 ease-out'
                style={{
                  height: `${
                    ((activeTimeline + 1) / milestones.length) * 100
                  }%`,
                }}
              />
            </div>

            {/* Milestones */}
            <div className='space-y-12'>
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  data-timeline-item
                  data-index={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 transition-all duration-500 -translate-x-1/2 ${
                      index <= activeTimeline
                        ? "bg-primary border-primary scale-125"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  />

                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <Card
                      className={`p-6 transition-all duration-500 ${
                        index <= activeTimeline
                          ? "bg-slate-900/80 border-primary/30"
                          : "bg-slate-900/30 border-slate-800 opacity-50"
                      }`}
                    >
                      <span
                        className={`text-3xl font-bold font-mono transition-colors duration-500 ${
                          index <= activeTimeline
                            ? "text-primary"
                            : "text-slate-600"
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <h3 className='text-xl font-bold mt-2 mb-2'>
                        {milestone.title}
                      </h3>
                      <p className='text-muted-foreground'>
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: AI for Good - Sustainability */}
      <section className='py-24 bg-slate-950 relative overflow-hidden'>
        {/* Green-tinted background */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.45_0.12_145),transparent_60%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.35_0.08_145),transparent_50%)]' />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-16'>
            <span className='text-emerald-400 font-semibold text-sm uppercase tracking-wider'>
              Our Philosophy
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4 text-white'>
              AI for Good
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto'>
              We believe intelligent IoT isn’t just about efficiency — it’s
              about building a sustainable future for our planet.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {sustainabilityFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className='p-8 bg-slate-900/50 border-emerald-900/30 hover:border-emerald-500/30 transition-all duration-300 group'
                >
                  <div className='w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors'>
                    <IconComponent className='w-7 h-7 text-emerald-400' />
                  </div>
                  <span className='text-2xl font-bold text-emerald-400 font-mono'>
                    {feature.stat}
                  </span>
                  <h3 className='text-xl font-bold mt-2 mb-3 text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-slate-400'>{feature.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Eco visual */}
          <div className='mt-16 p-8 rounded-2xl bg-emerald-950/30 border border-emerald-900/30'>
            <div className='flex flex-col md:flex-row items-center gap-8'>
              <div className='flex-1'>
                <h3 className='text-2xl font-bold text-white mb-4'>
                  Sustainable by Design
                </h3>
                <p className='text-slate-400 mb-6'>
                  Every feature we build considers its environmental impact.
                  From energy-efficient algorithms to extended equipment
                  lifespans, sustainability is woven into our DNA.
                </p>
                <div className='flex flex-wrap gap-4'>
                  <div className='px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium'>
                    Carbon Neutral Operations
                  </div>
                  <div className='px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium'>
                    Green Data Centers
                  </div>
                  <div className='px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium'>
                    Eco-Certified Partners
                  </div>
                </div>
              </div>
              <div className='w-48 h-48 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center'>
                <Leaf className='w-24 h-24 text-emerald-400/50' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Team (The Architects) */}
      <section className='py-24 bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              The Architects
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              Meet Our Team
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              The minds behind the machine — building the future of intelligent
              IoT.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                className='p-6 group cursor-pointer transition-all duration-300 hover:border-primary/30'
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar with wireframe effect */}
                <div className='relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden'>
                  {/* Normal state - gradient avatar */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br from-primary/20 to-slate-800 flex items-center justify-center transition-opacity duration-500 ${
                      hoveredMember === member.name
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <span className='text-3xl font-bold text-primary/80'>
                      {member.initials}
                    </span>
                  </div>

                  {/* Wireframe state */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredMember === member.name
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {/* Wireframe grid */}
                    <div className='absolute inset-0 bg-slate-900 border-2 border-primary/50 rounded-full'>
                      {/* Horizontal lines */}
                      <div className='absolute top-1/4 left-0 right-0 h-px bg-primary/30' />
                      <div className='absolute top-1/2 left-0 right-0 h-px bg-primary/50' />
                      <div className='absolute top-3/4 left-0 right-0 h-px bg-primary/30' />
                      {/* Vertical lines */}
                      <div className='absolute left-1/4 top-0 bottom-0 w-px bg-primary/30' />
                      <div className='absolute left-1/2 top-0 bottom-0 w-px bg-primary/50' />
                      <div className='absolute left-3/4 top-0 bottom-0 w-px bg-primary/30' />
                      {/* Center dot */}
                      <div className='absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-pulse' />
                      {/* Corner dots */}
                      <div className='absolute top-1/4 left-1/4 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50' />
                      <div className='absolute top-1/4 left-3/4 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50' />
                      <div className='absolute top-3/4 left-1/4 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50' />
                      <div className='absolute top-3/4 left-3/4 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50' />
                    </div>
                    {/* Scan line effect */}
                    <div className='absolute inset-0 bg-linear-to-b from-transparent via-primary/10 to-transparent animate-pulse' />
                  </div>
                </div>

                <div className='text-center'>
                  <h3 className='text-lg font-bold mb-1'>{member.name}</h3>
                  <p className='text-primary text-sm font-semibold mb-3'>
                    {member.role}
                  </p>
                  <p className='text-muted-foreground text-sm'>{member.bio}</p>
                </div>

                {/* Digital twin label on hover */}
                <div
                  className={`mt-4 text-center transition-all duration-300 ${
                    hoveredMember === member.name
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className='text-xs text-primary/70 font-mono'>
                    DIGITAL_TWIN_v2.4
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Live Stats */}
      <section
        ref={statsRef}
        className='py-24 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Real-Time Impact
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4 text-white'>
              Live Platform Stats
            </h2>
            <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
              Numbers that tell our story — updated in real-time from our global
              network.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {liveStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className='p-8 bg-slate-900/50 border-slate-800 text-center group hover:border-primary/30 transition-colors'
                >
                  <div className='w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors'>
                    <IconComponent className='w-7 h-7 text-primary' />
                  </div>
                  <p className='text-2xl md:text-3xl font-bold text-primary font-mono mb-2'>
                    {formatNumber(animatedStats[index], index)}
                    {stat.suffix}
                  </p>
                  <p className='text-slate-400'>{stat.label}</p>

                  {/* Live indicator */}
                  <div className='flex items-center justify-center gap-2 mt-4'>
                    <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                    <span className='text-xs text-emerald-400 font-mono'>
                      LIVE
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Trend indicator */}
          <div className='mt-12 flex items-center justify-center gap-3 text-emerald-400'>
            <TrendingUp className='w-5 h-5' />
            <span className='text-sm font-medium'>
              All metrics trending upward over the past 30 days
            </span>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
