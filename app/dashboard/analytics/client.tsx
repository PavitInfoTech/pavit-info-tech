"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { HeatmapCalendar } from "@/components/dashboard/analytics/heatmap-calendar";
import { ComparisonEngine } from "@/components/dashboard/analytics/comparison-engine";
import { ReportBuilder } from "@/components/dashboard/analytics/report-builder";
import { FlaskConical, Sparkles } from "lucide-react";

// Generate mock heatmap data for the year
function generateHeatmapData(year: number, metric: "uptime" | "alerts") {
  const data = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    let value: number;

    if (metric === "uptime") {
      // Uptime typically high (85-100%)
      value = Math.floor(85 + Math.random() * 15);
      // Occasional dips
      if (Math.random() < 0.05) {
        value = Math.floor(50 + Math.random() * 35);
      }
    } else {
      // Alerts typically low (0-5) with occasional spikes
      value = Math.floor(Math.random() * 5);
      if (Math.random() < 0.08) {
        value = Math.floor(5 + Math.random() * 20);
      }
    }

    data.push({ date: dateStr, value });
  }

  return data;
}

// Mock devices for comparison
const COMPARISON_DEVICES = [
  {
    id: "dev-1",
    name: "Temperature Sensor A1",
    type: "device" as const,
    data: {
      uptime: 99.2,
      alerts: 12,
      dataPoints: 125000,
      avgResponseTime: 45,
      efficiency: 94,
    },
  },
  {
    id: "dev-2",
    name: "Humidity Monitor B2",
    type: "device" as const,
    data: {
      uptime: 97.8,
      alerts: 28,
      dataPoints: 118000,
      avgResponseTime: 52,
      efficiency: 89,
    },
  },
  {
    id: "dev-3",
    name: "Pressure Gauge C3",
    type: "device" as const,
    data: {
      uptime: 99.9,
      alerts: 3,
      dataPoints: 142000,
      avgResponseTime: 38,
      efficiency: 98,
    },
  },
  {
    id: "dev-4",
    name: "Flow Meter D4",
    type: "device" as const,
    data: {
      uptime: 95.4,
      alerts: 45,
      dataPoints: 98000,
      avgResponseTime: 67,
      efficiency: 82,
    },
  },
  {
    id: "dev-5",
    name: "Vibration Sensor E5",
    type: "device" as const,
    data: {
      uptime: 98.6,
      alerts: 18,
      dataPoints: 156000,
      avgResponseTime: 41,
      efficiency: 91,
    },
  },
];

// Mock time periods for comparison
const COMPARISON_PERIODS = [
  {
    id: "period-1",
    name: "This Week",
    type: "period" as const,
    data: {
      uptime: 99.1,
      alerts: 8,
      dataPoints: 42000,
      avgResponseTime: 44,
      efficiency: 95,
    },
  },
  {
    id: "period-2",
    name: "Last Week",
    type: "period" as const,
    data: {
      uptime: 98.4,
      alerts: 14,
      dataPoints: 41500,
      avgResponseTime: 48,
      efficiency: 92,
    },
  },
  {
    id: "period-3",
    name: "This Month",
    type: "period" as const,
    data: {
      uptime: 98.8,
      alerts: 42,
      dataPoints: 186000,
      avgResponseTime: 46,
      efficiency: 93,
    },
  },
  {
    id: "period-4",
    name: "Last Month",
    type: "period" as const,
    data: {
      uptime: 97.2,
      alerts: 67,
      dataPoints: 178000,
      avgResponseTime: 53,
      efficiency: 88,
    },
  },
  {
    id: "period-5",
    name: "Q3 2025",
    type: "period" as const,
    data: {
      uptime: 98.1,
      alerts: 156,
      dataPoints: 520000,
      avgResponseTime: 49,
      efficiency: 90,
    },
  },
  {
    id: "period-6",
    name: "Q2 2025",
    type: "period" as const,
    data: {
      uptime: 96.8,
      alerts: 203,
      dataPoints: 498000,
      avgResponseTime: 55,
      efficiency: 86,
    },
  },
];

export default function AnalyticsPageClient() {
  const currentYear = new Date().getFullYear();

  const uptimeData = useMemo(
    () => generateHeatmapData(currentYear, "uptime"),
    [currentYear]
  );
  const alertData = useMemo(
    () => generateHeatmapData(currentYear, "alerts"),
    [currentYear]
  );

  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='space-y-8'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='relative'
          >
            <div className='flex items-center gap-4 mb-2'>
              <div className='relative'>
                <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-primary/30 to-secondary/30 flex items-center justify-center'>
                  <FlaskConical className='w-7 h-7 text-primary' />
                </div>
                <motion.div
                  className='absolute -top-1 -right-1'
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className='w-5 h-5 text-yellow-400' />
                </motion.div>
              </div>
              <div>
                <h1 className='text-3xl font-bold font-serif'>The Data Lab</h1>
                <p className='text-muted-foreground'>
                  Historical trends and business intelligence
                </p>
              </div>
            </div>

            {/* Decorative line */}
            <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent' />
          </motion.div>

          {/* Heatmaps Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className='grid grid-cols-1 gap-6'>
              <HeatmapCalendar
                data={uptimeData}
                title='Uptime Heatmap'
                metric='uptime'
                year={currentYear}
              />
              <HeatmapCalendar
                data={alertData}
                title='Alert Frequency'
                metric='alerts'
                year={currentYear}
              />
            </div>
          </motion.section>

          {/* Comparison Engine */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ComparisonEngine
              devices={COMPARISON_DEVICES}
              periods={COMPARISON_PERIODS}
            />
          </motion.section>

          {/* Report Builder */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ReportBuilder />
          </motion.section>
        </div>
      </div>
    </DashboardLayout>
  );
}
