"use client";

import Link from "next/link";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Factory,
  Lightbulb,
  Truck,
  HeartPulse,
  Activity,
  Gauge,
  Box,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const stats = [
  { number: "10K+", label: "Devices Monitored" },
  { number: "99.9%", label: "Uptime" },
  { number: "0.5s", label: "Avg Response Time" },
  { number: "24/7", label: "Support" },
];

const bentoFeatures = [
  {
    id: "ingest",
    title: "Ingest",
    subtitle: "Universal Compatibility",
    description:
      "Connect any device with MQTT, HTTP, CoAP protocols. Zero friction data ingestion.",
    icon: "/Images/Home-icon-link.webp",
    size: "large",
  },
  {
    id: "analyze",
    title: "Analyze",
    subtitle: "Real-time Anomaly Detection",
    description:
      "AI-powered pattern recognition that catches issues before they escalate.",
    icon: "/Images/Home-icon-target.webp",
    size: "medium",
  },
  {
    id: "act",
    title: "Act",
    subtitle: "Automated Workflows",
    description:
      "Trigger alerts, notifications, and automated responses instantly.",
    icon: "/Images/Home-icon-people.webp",
    size: "medium",
  },
  {
    id: "secure",
    title: "Secure",
    subtitle: "End-to-End Encryption",
    description: "AES-256 encryption protecting every byte of your IoT data.",
    icon: "/Images/Home-icon-shield.webp",
    size: "large",
  },
];

const industryTabs = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    title: "Predictive Maintenance & Vibration Analysis",
    description:
      "Reduce unplanned downtime by 73% with real-time vibration monitoring and predictive failure detection across your entire production line.",
    stats: ["73% less downtime", "2.3M saved annually", "15min MTTR"],
    bgClass: "from-orange-500/20 via-amber-500/10",
  },
  {
    id: "energy",
    label: "Smart Energy",
    icon: Lightbulb,
    title: "Intelligent Grid Balancing",
    description:
      "Optimize energy distribution with real-time demand forecasting and automated load balancing across distributed energy resources.",
    stats: ["31% efficiency gain", "Real-time balancing", "Carbon neutral"],
    bgClass: "from-green-500/20 via-emerald-500/10",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    title: "Fleet & Cold Chain Monitoring",
    description:
      "Track assets in real-time with temperature compliance, route optimization, and predictive ETA calculations.",
    stats: ["99.8% compliance", "24/7 tracking", "40% fuel savings"],
    bgClass: "from-blue-500/20 via-cyan-500/10",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    title: "Medical Device Intelligence",
    description:
      "Monitor critical medical equipment with HIPAA-compliant analytics, ensuring patient safety and regulatory compliance.",
    stats: ["HIPAA compliant", "0 false alarms", "99.99% uptime"],
    bgClass: "from-rose-500/20 via-pink-500/10",
  },
];

const partners = [
  { name: "SensorLink Corporation", logo: "SENSORLINK" },
  { name: "EdgeStream Partners", logo: "EDGESTREAM" },
  { name: "FactoryPulse", logo: "FACTORYPULSE" },
];

const testimonials = [
  {
    quote:
      "PavitInfoTech reduced our unplanned downtime by 73%. The predictive maintenance alerts have saved us millions in emergency repairs.",
    author: "Rafael Dominguez",
    role: "VP of Operations",
    company: "Global Manufacturing Corp",
    industry: "Manufacturing",
    rating: 5,
    image: "/Images/Testimonial-male.webp",
  },
  {
    quote:
      "The real-time analytics dashboard transformed how we monitor our energy grid. We're now achieving 99.9% uptime across 12,000 nodes.",
    author: "Nadia Kovač",
    role: "Chief Technology Officer",
    company: "EnergyFlow Systems",
    industry: "Smart Energy",
    rating: 5,
    image: "/Images/Testimonial-female.webp",
  },
  {
    quote:
      "Cold chain compliance used to be our biggest headache. Now we have full visibility and haven't had a single compliance violation in 18 months.",
    author: "Damon Volkov",
    role: "Director of Logistics",
    company: "FreshTrack Logistics",
    industry: "Logistics",
    rating: 5,
    image: "/Images/Testimonial-male1.webp",
  },
  {
    quote:
      "HIPAA compliance and medical device monitoring in one platform? Game changer. Our IT team finally sleeps at night.",
    author: "Amara Okonkwo",
    role: "Chief Medical Information Officer",
    company: "Regional Health Network",
    industry: "Healthcare",
    rating: 5,
    image: "/Images/Testimonial-female1.webp",
  },
];

export default function Home() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeIndustry, setActiveIndustry] = useState("manufacturing");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const activeTab =
    industryTabs.find((tab) => tab.id === activeIndustry) || industryTabs[0];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className='relative min-h-screen overflow-hidden bg-linear-to-br from-slate-900/80 via-[#071028]/70 to-slate-800/90 text-white'>
        {/* Background image */}
        <div className='absolute inset-0 bg-[url("/Images/Home-hero.webp")] bg-fixed bg-cover bg-no-repeat bg-center opacity-20 pointer-events-none' />
        {/* Decorative shapes behind the hero */}
        <div className='absolute -left-32 top-1/2 transform -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-linear-to-br from-primary/50 via-secondary/30 to-transparent opacity-30 blur-3xl pointer-events-none' />
        <div className='absolute -right-28 top-1/3 w-[520px] h-[520px] rounded-full bg-linear-to-tr from-secondary/40 via-primary/20 to-transparent opacity-25 blur-3xl pointer-events-none' />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative z-10 text-center'>
          <div className='space-y-6'>
            <div className='inline-block px-4 py-2 bg-accent border border-primary rounded-full text-sm font-semibold text-white'>
              Intelligent IoT Platform
            </div>

            <h1 className='font-serif font-extrabold tracking-tight leading-[0.86] text-[48px] md:text-[110px] lg:text-[140px] text-white mx-auto max-w-[1100px]'>
              <span className='block md:inline'>AI-Powered </span>
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

      {/* Section 2: The Data Chaos Problem */}
      <section className='py-24 bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              The Problem
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              90% of IoT Data Goes Unused
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Stop reacting to failures. Start predicting them.
            </p>
          </div>

          {/* Before/After Slider */}
          <div className='relative max-w-5xl mx-auto'>
            <div className='relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-border shadow-2xl'>
              {/* The Old Way (Left side) */}
              <div
                className='absolute inset-0 bg-linear-to-br from-red-950/90 via-slate-900 to-slate-950'
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className='absolute inset-0 p-8 md:p-12'>
                  <div className='flex items-center gap-2 mb-6'>
                    <div className='w-3 h-3 rounded-full bg-red-500 animate-pulse' />
                    <span className='text-red-400 font-semibold uppercase text-sm tracking-wider'>
                      The Old Way
                    </span>
                  </div>
                  <div className='space-y-6'>
                    <div className='bg-slate-800/50 rounded-lg p-4 border border-red-500/20'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-8 h-8 bg-red-500/20 rounded flex items-center justify-center'>
                          📊
                        </div>
                        <span className='font-medium text-slate-300'>
                          Static Spreadsheets
                        </span>
                      </div>
                      <div className='grid grid-cols-4 gap-2 text-xs text-slate-500'>
                        {[42, 78, 31, 95, 67, 23, 84, 56, 19, 73, 48, 62].map(
                          (val, i) => (
                            <div
                              key={i}
                              className='bg-slate-700/50 rounded p-2 text-center'
                            >
                              {val}
                            </div>
                          )
                        )}
                      </div>
                      <p className='text-red-400 text-sm mt-3'>
                        ⚠ Data from 3 days ago
                      </p>
                    </div>
                    <div className='bg-slate-800/50 rounded-lg p-4 border border-red-500/20'>
                      <p className='text-slate-400 text-sm'>
                        🔴 Reactive Maintenance
                      </p>
                      <p className='text-red-400 text-lg font-semibold mt-2'>
                        Machine failed 6 hours ago
                      </p>
                      <p className='text-slate-500 text-sm'>
                        Cost: $47,000 in downtime
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Pavit Way (Right side) */}
              <div
                className='absolute inset-0 bg-linear-to-br from-emerald-950/90 via-slate-900 to-slate-950'
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <div className='absolute inset-0 p-8 md:p-12'>
                  <div className='flex items-center gap-2 mb-6'>
                    <div className='w-3 h-3 rounded-full bg-emerald-500 animate-pulse' />
                    <span className='text-emerald-400 font-semibold uppercase text-sm tracking-wider'>
                      The Pavit Way
                    </span>
                  </div>
                  <div className='space-y-6'>
                    <div className='bg-slate-800/50 rounded-lg p-4 border border-emerald-500/20'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center'>
                          <Activity className='w-4 h-4 text-emerald-400' />
                        </div>
                        <span className='font-medium text-slate-300'>
                          Live Data Streams
                        </span>
                        <span className='ml-auto text-emerald-400 text-xs'>
                          ● LIVE
                        </span>
                      </div>
                      <div className='h-16 flex items-end gap-1'>
                        {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 68, 82].map(
                          (h, i) => (
                            <div
                              key={i}
                              className='flex-1 bg-emerald-500/40 rounded-t'
                              style={{ height: `${h}%` }}
                            />
                          )
                        )}
                      </div>
                      <p className='text-emerald-400 text-sm mt-3'>
                        ✓ Real-time, always current
                      </p>
                    </div>
                    <div className='bg-slate-800/50 rounded-lg p-4 border border-emerald-500/20'>
                      <p className='text-slate-400 text-sm'>
                        🟢 Predictive Intelligence
                      </p>
                      <p className='text-emerald-400 text-lg font-semibold mt-2'>
                        Anomaly detected: 72hrs warning
                      </p>
                      <p className='text-slate-500 text-sm'>
                        Maintenance scheduled automatically
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Control */}
              <div
                className='absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10'
                style={{ left: `${sliderPosition}%` }}
              >
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center'>
                  <span className='text-slate-900 font-bold text-sm'>⟷</span>
                </div>
              </div>

              {/* Slider Input */}
              <input
                type='range'
                min='1'
                max='99'
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className='absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20'
              />
            </div>

            <p className='text-center text-muted-foreground mt-4 text-sm'>
              ← Drag to compare →
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Intelligence Engine (Bento Grid) */}
      <section className='py-24 bg-slate-950'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              The Engine
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4 text-white'>
              Intelligence at Every Layer
            </h2>
            <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
              From data ingestion to automated action, built for enterprise
              scale.
            </p>
          </div>

          {/* Bento Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]'>
            {bentoFeatures.map((feature) => {
              const isLarge = feature.size === "large";
              return (
                <Card
                  key={feature.id}
                  className={`relative overflow-hidden bg-slate-900/50 border-slate-800 hover:border-primary/50 py-0 transition-all duration-300 group ${
                    isLarge ? "lg:col-span-2 lg:row-span-2" : "lg:row-span-1"
                  }`}
                >
                  <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <div
                    className={`relative ${
                      isLarge ? "p-10" : "p-6"
                    } h-full flex flex-col`}
                  >
                    <Image
                      src={feature.icon}
                      alt={`${feature.title} icon`}
                      width={250}
                      height={250}
                      className={`text-primary ${
                        isLarge ? "w-20 h-20 mb-4" : "w-10 h-10"
                      } object-contain rounded-2xl`}
                    />
                    <div className='flex-1'>
                      <h3
                        className={`${
                          isLarge ? "text-2xl" : "text-lg"
                        } font-bold text-white mb-1`}
                      >
                        {feature.title}
                      </h3>
                      <p className='text-primary text-sm font-medium mb-2'>
                        {feature.subtitle}
                      </p>
                      <p
                        className={`text-slate-400 ${
                          isLarge ? "text-base" : "text-sm"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                    {isLarge && (
                      <div className='mt-4 flex gap-2'>
                        <span className='px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300'>
                          {feature.id === "ingest" ? "MQTT" : "AES-256"}
                        </span>
                        <span className='px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300'>
                          {feature.id === "ingest" ? "HTTP" : "TLS 1.3"}
                        </span>
                        <span className='px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300'>
                          {feature.id === "ingest" ? "CoAP" : "Zero Trust"}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Industry Applications (Tabbed) */}
      <section className='py-24 bg-background relative overflow-hidden'>
        <div
          className={`absolute inset-0 bg-linear-to-br ${activeTab.bgClass} to-transparent transition-all duration-500`}
        />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-12'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Industries
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              Built for Your Industry
            </h2>
          </div>

          {/* Tabs */}
          <div className='flex flex-wrap justify-center gap-2 mb-12'>
            {industryTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveIndustry(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    activeIndustry === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  <TabIcon className='w-4 h-4' />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <h3 className='text-3xl md:text-4xl font-bold font-serif'>
                {activeTab.title}
              </h3>
              <p className='text-lg text-muted-foreground'>
                {activeTab.description}
              </p>
              <div className='flex flex-wrap gap-3'>
                {activeTab.stats.map((stat) => (
                  <span
                    key={stat}
                    className='px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium'
                  >
                    {stat}
                  </span>
                ))}
              </div>
              <Button size='lg' asChild className='mt-4'>
                <Link href='/features'>
                  Explore {activeTab.label} Solutions →
                </Link>
              </Button>
            </div>

            {/* Industry Visual */}
            <div className='relative h-[350px] rounded-2xl bg-slate-900/50 border border-border overflow-hidden'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <activeTab.icon className='w-32 h-32 text-primary/20' />
              </div>
              <div className='absolute inset-0 p-6'>
                <div className='grid grid-cols-2 gap-4 h-full'>
                  <div className='bg-slate-800/50 rounded-xl p-4 flex flex-col'>
                    <span className='text-xs text-slate-500 uppercase'>
                      Live Sensors
                    </span>
                    <span className='text-2xl font-bold text-white mt-1'>
                      2,847
                    </span>
                    <div className='flex-1 flex items-end'>
                      <div className='w-full h-16 flex items-end gap-1'>
                        {[60, 80, 45, 90, 70, 85].map((h, i) => (
                          <div
                            key={i}
                            className='flex-1 bg-primary/40 rounded-t'
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='bg-slate-800/50 rounded-xl p-4 flex flex-col'>
                    <span className='text-xs text-slate-500 uppercase'>
                      Health Score
                    </span>
                    <span className='text-2xl font-bold text-emerald-400 mt-1'>
                      98.7%
                    </span>
                    <div className='flex-1 flex items-center justify-center'>
                      <Gauge className='w-16 h-16 text-emerald-400/50' />
                    </div>
                  </div>
                  <div className='col-span-2 bg-slate-800/50 rounded-xl p-4'>
                    <span className='text-xs text-slate-500 uppercase'>
                      Recent Alerts
                    </span>
                    <div className='mt-2 space-y-2'>
                      <div className='flex items-center gap-2 text-sm'>
                        <div className='w-2 h-2 rounded-full bg-emerald-400' />
                        <span className='text-slate-300'>
                          All systems operational
                        </span>
                        <span className='text-slate-500 ml-auto'>2m ago</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <div className='w-2 h-2 rounded-full bg-amber-400' />
                        <span className='text-slate-300'>
                          Scheduled maintenance: Unit 7
                        </span>
                        <span className='text-slate-500 ml-auto'>1h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Live Dashboard Preview */}
      <section className='py-24 bg-slate-950 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              The Experience
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4 text-white'>
              See It In Action
            </h2>
            <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
              A dashboard built for clarity, speed, and actionable insights.
            </p>
          </div>

          {/* 3D Floating Dashboard */}
          <div className='relative'>
            {/* Main Dashboard (slanted) */}
            <div
              className='relative mx-auto max-w-5xl'
              style={{ perspective: "1500px" }}
            >
              <div
                className='relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700'
                style={{ transform: "rotateX(10deg) rotateY(-5deg)" }}
              >
                <Image
                  src={"/Images/Home-dashboard.webp"}
                  alt='Dashboard'
                  width={1200}
                  height={800}
                />
              </div>
            </div>

            {/* Floating Feature Callouts */}
            <div className='absolute top-10 -left-4 md:left-10 bg-slate-800 rounded-lg p-3 shadow-xl border border-primary/30 animate-pulse'>
              <div className='flex items-center gap-2'>
                <Activity className='w-4 h-4 text-primary' />
                <span className='text-sm text-white font-medium'>
                  Live Tickers
                </span>
              </div>
            </div>
            <div className='absolute top-1/3 -right-4 md:right-10 bg-slate-800 rounded-lg p-3 shadow-xl border border-emerald-500/30'>
              <div className='flex items-center gap-2'>
                <Gauge className='w-4 h-4 text-emerald-400' />
                <span className='text-sm text-white font-medium'>
                  Health Scores
                </span>
              </div>
            </div>
            <div className='absolute bottom-10 left-1/4 bg-slate-800 rounded-lg p-3 shadow-xl border border-blue-500/30'>
              <div className='flex items-center gap-2'>
                <Box className='w-4 h-4 text-blue-400' />
                <span className='text-sm text-white font-medium'>
                  Digital Twin
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Trust Strip */}
      <section className='py-16 bg-muted/30 border-y border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8'>
            Interoperable with the world's leading hardware
          </p>
          <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16'>
            {partners.map((partner) => (
              <div
                key={partner.name}
                className='text-2xl md:text-3xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors'
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className='py-24 bg-linear-to-b from-background via-slate-950/50 to-background overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Customer Stories
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              Endorsed by Teams Worldwide
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              See how enterprises across industries are transforming their IoT
              operations.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className='relative'>
            {/* Navigation Buttons */}
            <button
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
              className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:border-primary/50 transition-colors hidden md:flex'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='w-6 h-6 text-white' />
            </button>
            <button
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )
              }
              className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:border-primary/50 transition-colors hidden md:flex'
              aria-label='Next testimonial'
            >
              <ChevronRight className='w-6 h-6 text-white' />
            </button>

            {/* Carousel Container */}
            <div className='overflow-hidden mx-0 md:mx-16'>
              <div
                className='flex transition-transform duration-500 ease-out'
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className='w-full flex-shrink-0 px-4'>
                    <Card className='p-8 md:p-12 bg-slate-900/50 border-slate-800 relative'>
                      {/* Quote Icon */}
                      <Quote className='absolute top-6 right-6 w-12 h-12 text-primary/10' />

                      {/* Stars */}
                      <div className='flex gap-1 mb-6'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className='w-5 h-5 text-amber-400 fill-amber-400'
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className='text-xl md:text-2xl text-white font-medium leading-relaxed mb-8'>
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className='flex items-center gap-4'>
                        {/* Avatar */}
                        <div className='w-14 h-14 rounded-lg bg-linear-to-br from-primary/30 to-slate-700 flex items-center justify-center'>
                          <Image
                            src={
                              testimonial.image ||
                              "/Images/Avatar-placeholder.png"
                            }
                            alt={testimonial.author}
                            width={56}
                            height={56}
                            className='rounded-lg object-cover'
                          />
                        </div>
                        <div>
                          <p className='font-semibold text-white'>
                            {testimonial.author}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                        <div className='ml-auto hidden sm:block'>
                          <span className='px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full'>
                            {testimonial.industry}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className='flex justify-center gap-2 mt-8'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-primary w-8"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-slate-800'>
            {[
              { value: "500+", label: "Enterprise Clients" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "98%", label: "Customer Retention" },
              { value: "< 2hr", label: "Avg. Support Response" },
            ].map((metric) => (
              <div key={metric.label} className='text-center'>
                <p className='text-3xl md:text-4xl font-bold text-primary mb-2'>
                  {metric.value}
                </p>
                <p className='text-sm text-muted-foreground'>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='py-24 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold font-serif text-white mb-6'>
            Ready to Transform Your IoT Operations?
          </h2>
          <p className='text-xl text-slate-400 mb-8 max-w-2xl mx-auto'>
            Join hundreds of enterprises trusting PavitInfoTech for intelligent
            device management.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Button size='lg' asChild>
              <Link href='/auth/signup'>Start Free Trial</Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='/contact'>Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
