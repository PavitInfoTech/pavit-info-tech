"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Wifi,
  Cloud,
  Database,
  Brain,
  TrendingUp,
  BarChart3,
  Box,
  Thermometer,
  RotateCcw,
  Gauge,
  Zap,
  Settings,
  AlertTriangle,
  Shield,
  Lock,
  FileCheck,
  Users,
  ClipboardList,
  Smartphone,
  Server,
  Radio,
  HardDrive,
  CheckCircle2,
  ChevronRight,
  Pause,
  Play,
  ZoomIn,
} from "lucide-react";

// Edge computing features
const edgeFeatures = [
  {
    icon: Radio,
    title: "Edge Filtering",
    description:
      "Process and filter data at the source, reducing noise and transmitting only actionable insights.",
    stat: "90% data reduction",
  },
  {
    icon: Wifi,
    title: "Bandwidth Optimization",
    description:
      "Intelligent compression and delta encoding minimize network usage without losing fidelity.",
    stat: "10x less bandwidth",
  },
  {
    icon: HardDrive,
    title: "Offline Buffering",
    description:
      "Local storage ensures zero data loss during network outages with automatic sync on reconnection.",
    stat: "99.99% data integrity",
  },
];

// ML models for AI section
const mlModels = [
  {
    name: "Time-Series Regression",
    description:
      "LSTM networks predict continuous sensor values and detect drift patterns over time.",
    accuracy: "97.3%",
  },
  {
    name: "Anomaly Classification",
    description:
      "Random Forest classifiers identify failure modes from multi-dimensional sensor data.",
    accuracy: "99.1%",
  },
  {
    name: "Remaining Useful Life",
    description:
      "Survival analysis models estimate equipment lifespan with confidence intervals.",
    accuracy: "94.8%",
  },
];

// Digital twin metrics
const twinMetrics = [
  {
    icon: Thermometer,
    label: "Thermal Output",
    value: "72.4°C",
    status: "normal",
  },
  {
    icon: RotateCcw,
    label: "Rotation Speed",
    value: "3,450 RPM",
    status: "normal",
  },
  { icon: Gauge, label: "Pressure", value: "2.1 bar", status: "warning" },
  { icon: Zap, label: "Power Draw", value: "847 kW", status: "normal" },
];

// Security certifications
const certifications = [
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "SOC 2 Type II", description: "Service Organization Controls" },
  { name: "GDPR", description: "EU Data Protection Regulation" },
  { name: "HIPAA", description: "Healthcare Data Compliance" },
];

const securityFeatures = [
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Granular permissions with custom roles, team hierarchies, and asset-level access policies.",
  },
  {
    icon: ClipboardList,
    title: "Comprehensive Audit Logs",
    description:
      "Immutable audit trails for every action, API call, and configuration change with 7-year retention.",
  },
  {
    icon: Smartphone,
    title: "Multi-Factor Authentication",
    description:
      "TOTP, hardware keys (FIDO2), and biometric options with mandatory 2FA for admin accounts.",
  },
];

export default function FeaturesPage() {
  // State for the rules engine demo
  const [ruleCondition1, setRuleCondition1] = useState({
    metric: "Temperature",
    operator: ">",
    value: "80",
    unit: "°C",
  });
  const [ruleCondition2, setRuleCondition2] = useState({
    metric: "Vibration",
    operator: ">",
    value: "50",
    unit: "Hz",
  });
  const [ruleAction, setRuleAction] = useState("Trigger Emergency Stop");
  const [ruleActive, setRuleActive] = useState(false);

  // Feature Hero interactivity
  const [heroLayer, setHeroLayer] = useState<
    "hardware" | "edge" | "network" | "cloud" | null
  >(null);

  // Particle flow controls (section 2)
  const [particlesRunning, setParticlesRunning] = useState(true);
  const [particleSpeed, setParticleSpeed] = useState(3); // seconds per loop

  // AI Core interactive controls
  const [predictedSeverity, setPredictedSeverity] = useState(70); // 0..100

  // Digital twin interactivity
  const [selectedTwinMetric, setSelectedTwinMetric] = useState(
    twinMetrics[0].label
  );
  const [twinSimRunning, setTwinSimRunning] = useState(false);
  const [simulatedMetrics, setSimulatedMetrics] = useState<
    Record<string, string>
  >({});

  // 3D View Controls
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  useEffect(() => {
    if (!twinSimRunning) return;
    const id = setInterval(() => {
      // randomly perturb the selected metric slightly
      setSimulatedMetrics((prev) => {
        const cur = prev[selectedTwinMetric] || "0";
        const match = cur.match(/-?\d+[\d.,]?(?:\d+)?/);
        if (!match) return prev;
        const num = parseFloat(match[0].replace(/,/g, ""));
        const delta = (Math.random() - 0.5) * 2.5; // +/-1.25
        const newNum = Math.max(0, +(num + delta).toFixed(1));
        const newVal = cur.replace(match[0], String(newNum));
        return { ...prev, [selectedTwinMetric]: newVal };
      });
    }, 1500);

    return () => clearInterval(id);
  }, [twinSimRunning, selectedTwinMetric, setSimulatedMetrics]);

  function tweakMetric(label: string, delta: number) {
    setSimulatedMetrics((prev) => {
      const cur = prev[label] || "0";
      const match = cur.match(/-?\d+[\d.,]?(?:\d+)?/);
      if (!match) return prev;
      const num = parseFloat(match[0].replace(/,/g, ""));
      const newNum = Math.max(0, +(num + delta).toFixed(1));
      const newVal = cur.replace(match[0], String(newNum));
      return { ...prev, [label]: newVal };
    });
  }

  function evaluateRule() {
    // Evaluate both conditions against sampleTelemetry
    const evalCond = (c: {
      metric: string;
      operator: string;
      value: string;
    }) => {
      const left = sampleTelemetry[c.metric as keyof typeof sampleTelemetry];
      const right = parseFloat(String(c.value));
      if (typeof left !== "number" || Number.isNaN(right))
        return { ok: false, reason: "invalid values" };
      if (c.operator === ">")
        return { ok: left > right, reason: `${left} > ${right}` };
      if (c.operator === "<")
        return { ok: left < right, reason: `${left} < ${right}` };
      if (c.operator === "=")
        return { ok: left === right, reason: `${left} === ${right}` };
      return { ok: false, reason: "unknown operator" };
    };

    const r1 = evalCond(ruleCondition1);
    const r2 = evalCond(ruleCondition2);
    const passed = r1.ok && r2.ok;
    const explanation = passed
      ? `Both conditions matched. ${ruleAction} would be triggered.`
      : `Condition check failed: ${
          !r1.ok ? `${ruleCondition1.metric} (${r1.reason})` : ""
        }${!r1.ok && !r2.ok ? " and " : ""}${
          !r2.ok ? `${ruleCondition2.metric} (${r2.reason})` : ""
        }`;

    setRuleTestResult({ passed, explanation });
    return { passed, explanation };
  }

  // Rule engine tester (sample telemetry)
  const sampleTelemetry = {
    Temperature: 82,
    Vibration: 60,
    Pressure: 2.0,
    Power: 900,
  };
  const [ruleTestResult, setRuleTestResult] = useState<null | {
    passed: boolean;
    explanation: string;
  }>(null);

  // Security card expand/collapse
  const [expandedSecurity, setExpandedSecurity] = useState<string | null>(null);

  return (
    <MainLayout>
      {/* Section 1: Feature Hero */}
      <section className='relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white'>
        <div className='absolute inset-0 overflow-hidden'>
          {/* Animated grid background */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-size-[50px_50px]' />
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <span className='inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-primary'>
                Enterprise IoT Platform
              </span>
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight'>
                Full-Stack IoT
                <span className='block text-primary'>Intelligence.</span>
              </h1>
              <p className='text-xl text-slate-400 max-w-xl'>
                From edge sensors to cloud analytics — a unified platform
                architected for scale, security, and real-time decision making.
              </p>
              <div className='flex flex-wrap gap-4 pt-4'>
                <Button size='lg'>View Documentation</Button>
                <Button size='lg' variant='outline'>
                  API Reference
                </Button>
              </div>
            </div>

            {/* Exploded IoT Device Visual */}
            <div className='relative h-[400px] md:h-[500px]'>
              {/* Central turbine/device */}
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-slate-800 border-4 border-primary/50 flex items-center justify-center shadow-2xl shadow-primary/20'>
                <Settings
                  className='w-16 h-16 text-primary animate-spin'
                  style={{ animationDuration: "8s" }}
                />
              </div>

              {/* Layer 1: Hardware */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed border-slate-700 animate-pulse ${
                  heroLayer === "hardware" ? "ring-2 ring-primary/40" : ""
                }`}
                style={{ animationDuration: "3s" }}
                onMouseEnter={() => setHeroLayer("hardware")}
                onMouseLeave={() => setHeroLayer(null)}
              >
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 rounded text-xs text-slate-400'>
                  Hardware Layer
                </div>
              </div>

              {/* Layer 2: Edge */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 border-dashed border-blue-900/50 ${
                  heroLayer === "edge" ? "ring-2 ring-blue-600/30" : ""
                }`}
                onMouseEnter={() => setHeroLayer("edge")}
                onMouseLeave={() => setHeroLayer(null)}
              >
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-900/50 rounded text-xs text-blue-400'>
                  Edge Computing
                </div>
                <Cpu className='absolute top-4 right-8 w-6 h-6 text-blue-400' />
                <Database className='absolute bottom-8 left-4 w-6 h-6 text-blue-400' />
              </div>

              {/* Layer 3: Network */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-dashed border-emerald-900/50 ${
                  heroLayer === "network" ? "ring-2 ring-emerald-600/30" : ""
                }`}
                onMouseEnter={() => setHeroLayer("network")}
                onMouseLeave={() => setHeroLayer(null)}
              >
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-900/50 rounded text-xs text-emerald-400'>
                  Network Layer
                </div>
                <Wifi className='absolute top-8 left-8 w-6 h-6 text-emerald-400' />
                <Server className='absolute bottom-12 right-8 w-6 h-6 text-emerald-400' />
              </div>

              {/* Layer 4: Cloud */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border-2 border-dashed border-purple-900/50 ${
                  heroLayer === "cloud" ? "ring-2 ring-purple-600/30" : ""
                }`}
                onMouseEnter={() => setHeroLayer("cloud")}
                onMouseLeave={() => setHeroLayer(null)}
              >
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-900/50 rounded text-xs text-purple-400'>
                  Cloud Intelligence
                </div>
                <Cloud className='absolute top-4 right-20 w-6 h-6 text-purple-400' />
                <Brain className='absolute bottom-16 left-12 w-6 h-6 text-purple-400' />
              </div>

              {/* Floating data particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-2 h-2 rounded-full bg-primary animate-ping'
                  style={{
                    left: `${30 + i * 5}%`,
                    top: `${20 + i * 7}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${
                      particlesRunning ? 2 / (particleSpeed / 3) : 0
                    }s`,
                    animationPlayState: particlesRunning ? "running" : "paused",
                  }}
                />
              ))}

              {/* Layer selector legend (for CTO/engineer exploration) */}
              <div className='absolute right-6 top-6 w-44 p-3 bg-slate-900/60 border border-slate-700 rounded-lg text-sm'>
                <div className='font-semibold mb-2'>View Layers</div>
                <div className='flex flex-col gap-2'>
                  <button
                    onClick={() => setHeroLayer("hardware")}
                    className='text-xs text-slate-200 text-left hover:text-white'
                  >
                    • Hardware Layer — sensors & actuators
                  </button>
                  <button
                    onClick={() => setHeroLayer("edge")}
                    className='text-xs text-slate-200 text-left hover:text-white'
                  >
                    • Edge Computing — filter & preprocess
                  </button>
                  <button
                    onClick={() => setHeroLayer("network")}
                    className='text-xs text-slate-200 text-left hover:text-white'
                  >
                    • Network — routing, qos
                  </button>
                  <button
                    onClick={() => setHeroLayer("cloud")}
                    className='text-xs text-slate-200 text-left hover:text-white'
                  >
                    • Cloud — analytics & models
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Data Acquisition & Edge Computing */}
      <section className='py-24 bg-background relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Data Acquisition
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              Edge-First Architecture
            </h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Process data where it's generated. Our edge computing layer
              filters, aggregates, and buffers data before it ever hits the
              network.
            </p>
          </div>

          {/* Particle Flow Animation */}
          <div className='flex items-center justify-center gap-4 mb-6'>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setParticlesRunning(!particlesRunning)}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  particlesRunning
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {particlesRunning ? "Pause Flow" : "Resume Flow"}
              </button>
            </div>

            <div className='flex items-center gap-2 text-sm text-slate-400'>
              <label htmlFor='particleSpeed' className='text-xs'>
                Speed
              </label>
              <input
                id='particleSpeed'
                type='range'
                min='1'
                max='6'
                value={particleSpeed}
                onChange={(e) => setParticleSpeed(Number(e.target.value))}
                className='w-40'
              />
              <span className='text-xs text-slate-300'>{particleSpeed}s</span>
            </div>
          </div>
          <div className='relative h-32 mb-16 hidden md:block'>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3'>
              <div className='w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center'>
                <Cpu className='w-10 h-10 text-blue-400' />
              </div>
              <span className='text-sm font-medium text-slate-400'>
                Edge Device
              </span>
            </div>

            <div className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3'>
              <span className='text-sm font-medium text-slate-400'>
                Cloud Platform
              </span>
              <div className='w-20 h-20 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center'>
                <Cloud className='w-10 h-10 text-primary' />
              </div>
            </div>

            {/* Flow line */}
            <div className='absolute left-28 right-36 top-1/2 h-1 bg-linear-to-r from-blue-500/20 via-primary/40 to-primary/20 rounded-full' />

            {/* Filter indicator */}
            <div className='absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2'>
              <div className='w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center'>
                <span className='text-amber-400 text-xs font-bold'>90%↓</span>
              </div>
              <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap'>
                Filtered
              </span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className='grid md:grid-cols-3 gap-6'>
            {edgeFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className='p-6 bg-slate-900/50 border-slate-800 hover:border-primary/30 transition-colors'
                >
                  <div className='flex items-start justify-between mb-4'>
                    <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                      <IconComponent className='w-6 h-6 text-primary' />
                    </div>
                    <span className='px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full'>
                      {feature.stat}
                    </span>
                  </div>
                  <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                  <p className='text-muted-foreground'>{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: The AI Core (Deep Dive) */}
      <section className='py-24 bg-slate-950'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
                AI Core
              </span>
              <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-6 text-white'>
                Predictive Maintenance Models
              </h2>
              <p className='text-lg text-slate-400 mb-8'>
                Our ML pipeline combines time-series forecasting with
                classification models to predict failures weeks in advance — not
                hours.
              </p>

              {/* ML Models List */}
              <div className='space-y-4'>
                {mlModels.map((model) => (
                  <div
                    key={model.name}
                    className='p-4 bg-slate-900/50 rounded-xl border border-slate-800'
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold text-white'>{model.name}</h4>
                      <span className='px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded'>
                        {model.accuracy} accuracy
                      </span>
                    </div>
                    <p className='text-sm text-slate-400'>
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive model control: predicted severity */}
              <div className='mt-6 p-4 bg-slate-900/30 rounded-lg border border-slate-800'>
                <label className='text-sm text-slate-300 font-medium'>
                  Prediction horizon / confidence
                </label>
                <div className='flex items-center gap-3 mt-2'>
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={predictedSeverity}
                    onChange={(e) =>
                      setPredictedSeverity(Number(e.target.value))
                    }
                    className='w-full'
                  />
                  <div className='text-sm font-mono text-emerald-400 w-16 text-right'>
                    {predictedSeverity}%
                  </div>
                </div>
                <p className='text-xs text-slate-400 mt-2'>
                  Adjust the model's predicted severity/lead-time to see how the
                  predicted failure point shifts and the estimated savings.
                </p>
              </div>
            </div>

            {/* Prediction Graph Visual */}
            <div className='relative'>
              <Card className='p-6 bg-slate-900 border-slate-800'>
                <div className='flex items-center justify-between mb-6'>
                  <h4 className='font-semibold text-white'>
                    Bearing Degradation Forecast
                  </h4>
                  <div className='flex gap-4 text-xs'>
                    <span className='flex items-center gap-1'>
                      <div className='w-3 h-3 rounded-full bg-blue-500' />
                      Predicted
                    </span>
                    <span className='flex items-center gap-1'>
                      <div className='w-3 h-3 rounded-full bg-red-500' />
                      Actual
                    </span>
                  </div>
                </div>

                {/* Graph */}
                <div className='relative h-64 border-l-2 border-b-2 border-slate-700'>
                  {/* Y-axis label */}
                  <span className='absolute -left-12 top-1/2 -rotate-90 text-xs text-slate-500'>
                    Health Score
                  </span>

                  {/* X-axis label */}
                  <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500'>
                    Time (weeks)
                  </span>

                  {/* Predicted line (blue) */}
                  <svg
                    className='absolute inset-0 w-full h-full'
                    viewBox='0 0 100 100'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M 0 10 Q 20 12, 40 25 T 70 55 T 100 85'
                      fill='none'
                      stroke='rgb(59, 130, 246)'
                      strokeWidth='2'
                      strokeDasharray='4 2'
                    />
                    {/* Actual line (red, shorter) */}
                    <path
                      d='M 0 10 Q 20 14, 40 28 T 65 58'
                      fill='none'
                      stroke='rgb(239, 68, 68)'
                      strokeWidth='2'
                    />
                  </svg>

                  {/* Predicted failure point */}
                  <div
                    className='absolute'
                    style={{
                      left: `${30 + predictedSeverity * 0.5}%`,
                      top: `${50 + (100 - predictedSeverity) * 0.08}%`,
                    }}
                  >
                    <div className='w-4 h-4 rounded-full bg-blue-500 border-2 border-white animate-pulse' />
                    <div className='absolute left-6 top-0 whitespace-nowrap'>
                      <span className='text-xs text-blue-400 font-medium'>
                        Predicted Failure
                      </span>
                      <span className='block text-xs text-slate-500'>
                        Week 7
                      </span>
                    </div>
                  </div>

                  {/* Maintenance window */}
                  <div
                    className='absolute bg-emerald-500/10 border-l-2 border-emerald-500'
                    style={{
                      left: "50%",
                      top: "0",
                      width: "20%",
                      height: "100%",
                    }}
                  >
                    <span className='absolute top-2 left-2 text-xs text-emerald-400'>
                      Maintenance Window
                    </span>
                  </div>

                  {/* Actual failure point (if no intervention) */}
                  <div className='absolute' style={{ left: "65%", top: "58%" }}>
                    <div className='w-4 h-4 rounded-full bg-red-500 border-2 border-white' />
                    <div className='absolute left-6 top-0 whitespace-nowrap'>
                      <span className='text-xs text-red-400 font-medium'>
                        Actual Failure
                      </span>
                      <span className='block text-xs text-slate-500'>
                        (if unaddressed)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Savings callout */}
                <div className='mt-8 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30'>
                  <div className='flex items-center gap-3'>
                    <TrendingUp className='w-8 h-8 text-emerald-400' />
                    <div>
                      <span className='text-2xl font-bold text-emerald-400'>
                        $
                        {Math.round(
                          247000 * (predictedSeverity / 100)
                        ).toLocaleString()}
                      </span>
                      <p className='text-sm text-slate-400'>
                        Estimated savings by early prediction
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Digital Twin Visualization */}
      <section className='py-24 bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Digital Twin
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              1:1 Asset Mapping
            </h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Visualize thermal output, rotation speed, and pressure in a
              real-time 3D browser environment. Every physical asset has a
              living digital counterpart.
            </p>
          </div>

          <div className='grid lg:grid-cols-5 gap-6'>
            {/* 3D Preview Panel */}
            <div className='lg:col-span-3'>
              <Card className='h-[400px] bg-slate-900 border-slate-800 relative overflow-hidden'>
                {/* Fake 3D scene */}
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]' />

                {/* Grid floor */}
                <div
                  className='absolute bottom-0 left-0 right-0 h-1/3 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-size-[20px_20px]'
                  style={{
                    transform: "perspective(500px) rotateX(60deg)",
                    transformOrigin: "bottom",
                  }}
                />

                {/* Central 3D object representation */}
                <div
                  className='absolute left-1/2 top-1/2'
                  style={{
                    transform: `translate(-50%, -50%) scale(${zoom}) rotateY(${rotation}deg)`,
                    transition: isAutoRotating ? "none" : "transform 0.5s ease",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className='relative transform-style-3d'>
                    {/* Turbine base */}
                    <div className='w-40 h-40 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center transform rotate-12 shadow-2xl'>
                      <Box className='w-20 h-20 text-slate-400' />
                    </div>

                    {/* Rotating element */}
                    <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24'>
                      <div
                        className='w-full h-full rounded-full border-4 border-primary/50 animate-spin'
                        style={{ animationDuration: "3s" }}
                      >
                        <div className='absolute top-0 left-1/2 w-1 h-6 bg-primary -translate-x-1/2 -translate-y-1' />
                        <div className='absolute bottom-0 left-1/2 w-1 h-6 bg-primary -translate-x-1/2 translate-y-1' />
                        <div className='absolute left-0 top-1/2 w-6 h-1 bg-primary -translate-y-1/2 -translate-x-1' />
                        <div className='absolute right-0 top-1/2 w-6 h-1 bg-primary -translate-y-1/2 translate-x-1' />
                      </div>
                    </div>

                    {/* Heat visualization */}
                    <div className='absolute -right-16 top-0 w-12 h-32 rounded bg-linear-to-t from-blue-500/20 via-amber-500/40 to-red-500/60' />
                  </div>
                </div>

                {/* View controls */}
                <div className='absolute bottom-4 right-4 flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className={`bg-slate-800 border-slate-700 ${
                      isAutoRotating ? "text-primary border-primary/50" : ""
                    }`}
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                  >
                    {isAutoRotating ? (
                      <Pause className='w-4 h-4 mr-2' />
                    ) : (
                      <Play className='w-4 h-4 mr-2' />
                    )}
                    Rotate
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='bg-slate-800 border-slate-700'
                    onClick={() => setZoom((z) => (z >= 1.5 ? 0.8 : z + 0.2))}
                  >
                    <ZoomIn className='w-4 h-4 mr-2' />
                    Zoom {(zoom * 100).toFixed(0)}%
                  </Button>
                </div>

                {/* Live badge */}
                <div className='absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full'>
                  <div className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
                  <span className='text-xs text-red-400 font-medium'>LIVE</span>
                </div>
              </Card>
            </div>

            {/* Metrics Panel */}
            <div className='lg:col-span-2 space-y-4'>
              <div className='flex items-center justify-between mb-4 gap-4'>
                <h3 className='font-semibold text-lg'>Real-Time Metrics</h3>

                <div className='flex items-center gap-3 text-sm'>
                  <label className='text-xs text-slate-400'>Metric</label>
                  <select
                    value={selectedTwinMetric}
                    onChange={(e) => setSelectedTwinMetric(e.target.value)}
                    className='bg-slate-800 px-2 py-1 rounded text-sm text-white'
                  >
                    {twinMetrics.map((m) => (
                      <option key={m.label} value={m.label}>
                        {m.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => tweakMetric(selectedTwinMetric, 1)}
                    className='px-2 py-1 bg-slate-700 rounded text-xs'
                  >
                    +1
                  </button>
                  <button
                    onClick={() => tweakMetric(selectedTwinMetric, -1)}
                    className='px-2 py-1 bg-slate-700 rounded text-xs'
                  >
                    -1
                  </button>

                  <button
                    onClick={() => setTwinSimRunning(!twinSimRunning)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      twinSimRunning
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {twinSimRunning ? "Stop Sim" : "Simulate"}
                  </button>
                </div>
              </div>
              {twinMetrics.map((metric) => {
                const IconComponent = metric.icon;
                const statusColor =
                  metric.status === "warning"
                    ? "text-amber-400"
                    : "text-emerald-400";
                const statusBg =
                  metric.status === "warning"
                    ? "bg-amber-500/10"
                    : "bg-emerald-500/10";
                return (
                  <Card
                    key={metric.label}
                    className='p-4 bg-slate-900/50 border-slate-800'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`w-10 h-10 rounded-lg ${statusBg} flex items-center justify-center`}
                        >
                          <IconComponent className={`w-5 h-5 ${statusColor}`} />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>
                            {metric.label}
                          </p>
                          <p className='text-xl font-bold font-mono'>
                            {simulatedMetrics[metric.label] ?? metric.value}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          metric.status === "warning"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Automation & Rules Engine */}
      <section className='py-24 bg-slate-950'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Automation
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4 text-white'>
              Rules Engine
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto'>
              Build complex automation rules with a visual editor. No code
              required — just logic.
            </p>
          </div>

          {/* Interactive Rule Builder */}
          <Card className='max-w-4xl mx-auto p-8 bg-slate-900 border-slate-800'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-white'>Build a Rule</h3>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-slate-400'>Rule Status:</span>
                <button
                  onClick={() => setRuleActive(!ruleActive)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    ruleActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-700 text-slate-400 border border-slate-600"
                  }`}
                >
                  {ruleActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>

            {/* Rule Visual */}
            <div className='space-y-4'>
              {/* IF Block */}
              <div className='flex items-center gap-3 flex-wrap'>
                <span className='px-4 py-2 bg-blue-500/20 text-blue-400 font-mono font-bold rounded'>
                  IF
                </span>

                {/* Condition 1 */}
                <div className='flex items-center gap-2 p-2 bg-slate-800 rounded-lg border border-slate-700'>
                  <select
                    value={ruleCondition1.metric}
                    onChange={(e) =>
                      setRuleCondition1({
                        ...ruleCondition1,
                        metric: e.target.value,
                      })
                    }
                    className='bg-transparent text-white font-medium focus:outline-none cursor-pointer'
                  >
                    <option value='Temperature'>Temperature</option>
                    <option value='Vibration'>Vibration</option>
                    <option value='Pressure'>Pressure</option>
                    <option value='Power'>Power</option>
                  </select>
                  <select
                    value={ruleCondition1.operator}
                    onChange={(e) =>
                      setRuleCondition1({
                        ...ruleCondition1,
                        operator: e.target.value,
                      })
                    }
                    className='bg-slate-700 px-2 py-1 rounded text-white font-mono focus:outline-none cursor-pointer'
                  >
                    <option value='>'>&gt;</option>
                    <option value='<'>&lt;</option>
                    <option value='='>=</option>
                  </select>
                  <input
                    type='number'
                    value={ruleCondition1.value}
                    onChange={(e) =>
                      setRuleCondition1({
                        ...ruleCondition1,
                        value: e.target.value,
                      })
                    }
                    className='w-16 bg-slate-700 px-2 py-1 rounded text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <span className='text-slate-400 font-mono'>
                    {ruleCondition1.unit}
                  </span>
                </div>
              </div>

              {/* AND Block */}
              <div className='flex items-center gap-3 flex-wrap'>
                <span className='px-4 py-2 bg-purple-500/20 text-purple-400 font-mono font-bold rounded'>
                  AND
                </span>

                {/* Condition 2 */}
                <div className='flex items-center gap-2 p-2 bg-slate-800 rounded-lg border border-slate-700'>
                  <select
                    value={ruleCondition2.metric}
                    onChange={(e) =>
                      setRuleCondition2({
                        ...ruleCondition2,
                        metric: e.target.value,
                      })
                    }
                    className='bg-transparent text-white font-medium focus:outline-none cursor-pointer'
                  >
                    <option value='Temperature'>Temperature</option>
                    <option value='Vibration'>Vibration</option>
                    <option value='Pressure'>Pressure</option>
                    <option value='Power'>Power</option>
                  </select>
                  <select
                    value={ruleCondition2.operator}
                    onChange={(e) =>
                      setRuleCondition2({
                        ...ruleCondition2,
                        operator: e.target.value,
                      })
                    }
                    className='bg-slate-700 px-2 py-1 rounded text-white font-mono focus:outline-none cursor-pointer'
                  >
                    <option value='>'>&gt;</option>
                    <option value='<'>&lt;</option>
                    <option value='='>=</option>
                  </select>
                  <input
                    type='number'
                    value={ruleCondition2.value}
                    onChange={(e) =>
                      setRuleCondition2({
                        ...ruleCondition2,
                        value: e.target.value,
                      })
                    }
                    className='w-16 bg-slate-700 px-2 py-1 rounded text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <span className='text-slate-400 font-mono'>
                    {ruleCondition2.unit}
                  </span>
                </div>
              </div>

              {/* THEN Block */}
              <div className='flex items-center gap-3 flex-wrap'>
                <span className='px-4 py-2 bg-amber-500/20 text-amber-400 font-mono font-bold rounded'>
                  THEN
                </span>

                <div className='flex items-center gap-2 p-2 bg-slate-800 rounded-lg border border-slate-700'>
                  <select
                    value={ruleAction}
                    onChange={(e) => setRuleAction(e.target.value)}
                    className='bg-transparent text-white font-medium focus:outline-none cursor-pointer'
                  >
                    <option value='Trigger Emergency Stop'>
                      🚨 Trigger Emergency Stop
                    </option>
                    <option value='Send Alert to Team'>
                      📧 Send Alert to Team
                    </option>
                    <option value='Reduce Power Output'>
                      ⚡ Reduce Power Output
                    </option>
                    <option value='Schedule Maintenance'>
                      🔧 Schedule Maintenance
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rule Preview */}
            <div className='mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700'>
              <div className='flex items-start gap-3'>
                <BarChart3 className='w-5 h-5 text-primary mt-0.5' />
                <div>
                  <p className='text-sm text-slate-400 mb-1'>Rule Preview:</p>
                  <p className='font-mono text-sm text-white'>
                    IF{" "}
                    <span className='text-blue-400'>
                      [{ruleCondition1.metric}]
                    </span>{" "}
                    {ruleCondition1.operator} {ruleCondition1.value}
                    {ruleCondition1.unit} AND{" "}
                    <span className='text-purple-400'>
                      [{ruleCondition2.metric}]
                    </span>{" "}
                    {ruleCondition2.operator} {ruleCondition2.value}
                    {ruleCondition2.unit} THEN{" "}
                    <span className='text-amber-400'>[{ruleAction}]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Rule test result (if any) */}
            {ruleTestResult && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  ruleTestResult.passed
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-amber-500/10 border border-amber-500/20"
                }`}
              >
                <div className='text-sm text-white'>
                  {ruleTestResult.explanation}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className='flex gap-3 mt-6'>
              <Button
                className='flex-1'
                onClick={() => setRuleTestResult(null)}
              >
                <CheckCircle2 className='w-4 h-4 mr-2' />
                Save Rule
              </Button>
              <Button onClick={() => evaluateRule()} className='flex-1'>
                <AlertTriangle className='w-4 h-4 mr-2' />
                Test Rule
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 6: Enterprise Security & Compliance */}
      <section className='py-24 bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
              Security
            </span>
            <h2 className='text-4xl md:text-5xl font-bold font-serif mt-3 mb-4'>
              Enterprise-Grade Security
            </h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Built with security-first architecture. Compliant with global
              standards and ready for the most demanding enterprise
              environments.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-16'>
            {certifications.map((cert) => (
              <Card
                key={cert.name}
                onClick={() =>
                  setExpandedSecurity(
                    expandedSecurity === cert.name ? null : cert.name
                  )
                }
                className={`p-6 text-left bg-slate-900/50 border-slate-800 hover:border-primary/30 transition-colors cursor-pointer ${
                  expandedSecurity === cert.name ? "ring-2 ring-primary/30" : ""
                }`}
              >
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                    <Shield className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-bold text-lg mb-1'>{cert.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {cert.description}
                    </p>
                  </div>
                </div>
                {expandedSecurity === cert.name && (
                  <div className='mt-3 text-sm text-slate-300 border-t border-slate-700 pt-3'>
                    <p>
                      Implementation notes: we perform quarterly audits,
                      maintain control matrices that map devices to
                      classification levels, and run continuous compliance
                      checks.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Security Features */}
          <div className='grid md:grid-cols-3 gap-6'>
            {securityFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  onClick={() =>
                    setExpandedSecurity(
                      expandedSecurity === feature.title ? null : feature.title
                    )
                  }
                  className={`p-6 bg-slate-900/50 border-slate-800 cursor-pointer ${
                    expandedSecurity === feature.title
                      ? "ring-2 ring-primary/30"
                      : ""
                  }`}
                >
                  <div className='flex items-start gap-3 mb-4'>
                    <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                      <IconComponent className='w-6 h-6 text-primary' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold mb-2'>
                        {feature.title}
                      </h3>
                      <p className='text-muted-foreground'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {expandedSecurity === feature.title && (
                    <div className='mt-3 text-sm text-slate-300 border-t border-slate-700 pt-3'>
                      <p>
                        Implementation details: RBAC policies live in a
                        centralized access service, audit logs are forwarded to
                        an immutable store and retained per customer configs,
                        and MFA is enforced for administrative flows.
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Security Architecture */}
          <Card className='mt-12 p-8 bg-slate-900 border-slate-800'>
            <h3 className='text-2xl font-bold mb-6 text-center text-white'>
              Security Architecture
            </h3>
            <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
              <div className='flex items-center gap-3 p-4 bg-slate-800 rounded-lg'>
                <Lock className='w-6 h-6 text-emerald-400' />
                <div>
                  <p className='font-semibold text-white'>TLS 1.3</p>
                  <p className='text-xs text-slate-400'>In Transit</p>
                </div>
              </div>
              <ChevronRight className='w-6 h-6 text-slate-600 rotate-90 md:rotate-0' />
              <div className='flex items-center gap-3 p-4 bg-slate-800 rounded-lg'>
                <Shield className='w-6 h-6 text-blue-400' />
                <div>
                  <p className='font-semibold text-white'>AES-256</p>
                  <p className='text-xs text-slate-400'>At Rest</p>
                </div>
              </div>
              <ChevronRight className='w-6 h-6 text-slate-600 rotate-90 md:rotate-0' />
              <div className='flex items-center gap-3 p-4 bg-slate-800 rounded-lg'>
                <FileCheck className='w-6 h-6 text-purple-400' />
                <div>
                  <p className='font-semibold text-white'>SHA-256</p>
                  <p className='text-xs text-slate-400'>Data Integrity</p>
                </div>
              </div>
              <ChevronRight className='w-6 h-6 text-slate-600 rotate-90 md:rotate-0' />
              <div className='flex items-center gap-3 p-4 bg-slate-800 rounded-lg'>
                <Smartphone className='w-6 h-6 text-amber-400' />
                <div>
                  <p className='font-semibold text-white'>FIDO2</p>
                  <p className='text-xs text-slate-400'>Authentication</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-24 bg-linear-to-br from-primary/10 via-background to-background'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold font-serif mb-6'>
            Ready to See It in Action?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Schedule a technical deep-dive with our engineering team. We'll walk
            through your architecture requirements.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Button size='lg'>Request Technical Demo</Button>
            <Button size='lg' variant='outline'>
              Download Architecture PDF
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
