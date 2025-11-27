"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ConnectionStrength } from "@/components/ui/connection-strength";
import {
  ArrowLeft,
  Cpu,
  MapPin,
  Wifi,
  Activity,
  Settings,
  Power,
  FileText,
  Bell,
  RefreshCw,
  Edit,
  Trash2,
  Clock,
  Thermometer,
  Droplets,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Mock device data - in real app, fetch from API
const getDevice = (id: string) => {
  const typePool = [
    "Temperature Sensor",
    "Humidity Sensor",
    "Pressure Sensor",
    "Motion Sensor",
    "Light Sensor",
    "Door Sensor",
  ];
  const statusPool: Array<"online" | "offline" | "warn"> = [
    "online",
    "online",
    "warn",
    "offline",
  ];
  const i = parseInt(id) - 1;

  return {
    id,
    name: `Device-${id.padStart(3, "0")}`,
    type: typePool[i % typePool.length],
    status: statusPool[i % statusPool.length],
    lastSeen: `${(i % 60) + 1} min ago`,
    ip: `10.0.1.${(i % 254) + 1}`,
    mac: `AA:BB:CC:DD:EE:${id.padStart(2, "0")}`,
    signal: Math.floor(Math.random() * 5),
    battery: Math.floor(Math.random() * 101),
    firmware: "v2.4.1",
    location: ["Zone A - Building 1", "Zone B - Warehouse", "Zone C - Factory"][
      i % 3
    ],
    installedDate: "2024-01-15",
    lastMaintenance: "2024-12-01",
    uptime: "45d 12h 33m",
    dataPoints: Math.floor(Math.random() * 50000) + 10000,
    alerts: Math.floor(Math.random() * 5),
    readings: [
      { label: "Temperature", value: "23.5°C", icon: Thermometer },
      { label: "Humidity", value: "45%", icon: Droplets },
      { label: "Power", value: "3.3V", icon: Zap },
    ],
    recentEvents: [
      {
        time: "2 min ago",
        event: "Data transmitted",
        type: "info",
      },
      {
        time: "15 min ago",
        event: "Temperature reading: 23.5°C",
        type: "info",
      },
      {
        time: "1 hour ago",
        event: "Connection restored",
        type: "success",
      },
      {
        time: "1 hour ago",
        event: "Connection lost",
        type: "warning",
      },
      {
        time: "3 hours ago",
        event: "Firmware update available",
        type: "info",
      },
    ],
  };
};

export function DeviceDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const device = getDevice(id);

  const statusColor = {
    online: "bg-emerald-400 shadow-emerald-400/50",
    warn: "bg-amber-400 shadow-amber-400/50",
    offline: "bg-white/20",
  };

  const statusText = {
    online: "Online",
    warn: "Warning",
    offline: "Offline",
  };

  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='pb-12'>
          {/* Header */}
          <div className='mb-8'>
            <Link
              href='/dashboard/devices'
              className='inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-6'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Device Inventory
            </Link>

            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
              <div className='flex items-start gap-4'>
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30'>
                  <Cpu className='w-8 h-8' />
                </div>
                <div>
                  <div className='flex items-center gap-3 mb-1'>
                    <h1 className='text-2xl md:text-3xl font-bold font-serif tracking-tight'>
                      {device.name}
                    </h1>
                    <div
                      className={`w-3 h-3 rounded-full shadow-lg ${
                        statusColor[device.status]
                      }`}
                    />
                    <span className='text-sm text-white/60'>
                      {statusText[device.status]}
                    </span>
                  </div>
                  <p className='text-white/50 text-sm font-mono'>
                    #{device.id} • {device.type} • {device.location}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2 border-white/10'
                >
                  <RefreshCw className='w-4 h-4' />
                  Reboot
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2 border-white/10'
                >
                  <Edit className='w-4 h-4' />
                  Edit
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10'
                >
                  <Trash2 className='w-4 h-4' />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
            <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-5'>
              <div className='flex items-center gap-2 mb-3 text-white/50'>
                <Wifi className='w-4 h-4' />
                <span className='text-xs font-medium uppercase tracking-wider'>
                  Signal
                </span>
              </div>
              <ConnectionStrength level={device.signal} size={24} />
            </div>

            <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-5'>
              <div className='flex items-center gap-2 mb-3 text-white/50'>
                <Power className='w-4 h-4' />
                <span className='text-xs font-medium uppercase tracking-wider'>
                  Battery
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <ProgressRing value={device.battery} size={48} stroke={4} />
                <span className='text-lg font-bold font-mono'>
                  {device.battery}%
                </span>
              </div>
            </div>

            <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-5'>
              <div className='flex items-center gap-2 mb-3 text-white/50'>
                <Clock className='w-4 h-4' />
                <span className='text-xs font-medium uppercase tracking-wider'>
                  Uptime
                </span>
              </div>
              <span className='text-lg font-bold font-mono'>
                {device.uptime}
              </span>
            </div>

            <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-5'>
              <div className='flex items-center gap-2 mb-3 text-white/50'>
                <Bell className='w-4 h-4' />
                <span className='text-xs font-medium uppercase tracking-wider'>
                  Alerts
                </span>
              </div>
              <span
                className={`text-lg font-bold font-mono ${
                  device.alerts > 0 ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {device.alerts}
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className='grid lg:grid-cols-3 gap-6'>
            {/* Left Column - Device Info */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Current Readings */}
              <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <Activity className='w-5 h-5 text-cyan-400' />
                  <h2 className='text-lg font-semibold'>Current Readings</h2>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  {device.readings.map((reading) => (
                    <div
                      key={reading.label}
                      className='bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center'
                    >
                      <reading.icon className='w-6 h-6 text-cyan-400 mx-auto mb-2' />
                      <div className='text-xl font-bold font-mono mb-1'>
                        {reading.value}
                      </div>
                      <div className='text-xs text-white/50'>
                        {reading.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Network Info */}
              <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <Wifi className='w-5 h-5 text-cyan-400' />
                  <h2 className='text-lg font-semibold'>
                    Network Configuration
                  </h2>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        IP Address
                      </div>
                      <div className='font-mono text-sm'>{device.ip}</div>
                    </div>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        MAC Address
                      </div>
                      <div className='font-mono text-sm'>{device.mac}</div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        Firmware Version
                      </div>
                      <div className='font-mono text-sm'>{device.firmware}</div>
                    </div>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        Data Points Collected
                      </div>
                      <div className='font-mono text-sm'>
                        {device.dataPoints.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <Settings className='w-5 h-5 text-cyan-400' />
                  <h2 className='text-lg font-semibold'>Device Information</h2>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        Device Type
                      </div>
                      <div className='text-sm'>{device.type}</div>
                    </div>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        Location
                      </div>
                      <div className='text-sm flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-white/40' />
                        {device.location}
                      </div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        Installation Date
                      </div>
                      <div className='text-sm'>{device.installedDate}</div>
                    </div>
                    <div>
                      <div className='text-xs text-white/50 uppercase tracking-wider mb-1'>
                        Last Maintenance
                      </div>
                      <div className='text-sm'>{device.lastMaintenance}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Event Log */}
            <div className='space-y-6'>
              <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <FileText className='w-5 h-5 text-cyan-400' />
                    <h2 className='text-lg font-semibold'>Recent Events</h2>
                  </div>
                  <button className='text-xs text-cyan-400 hover:text-cyan-300'>
                    View All
                  </button>
                </div>

                <div className='space-y-4'>
                  {device.recentEvents.map((event, i) => (
                    <div
                      key={i}
                      className='flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0'
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          event.type === "success"
                            ? "bg-emerald-400"
                            : event.type === "warning"
                            ? "bg-amber-400"
                            : "bg-white/30"
                        }`}
                      />
                      <div className='min-w-0 flex-1'>
                        <div className='text-sm text-white/80'>
                          {event.event}
                        </div>
                        <div className='text-xs text-white/40 mt-0.5'>
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-6'>
                <h2 className='text-lg font-semibold mb-4'>Quick Actions</h2>
                <div className='space-y-3'>
                  <button className='w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-left flex items-center gap-3 transition-colors'>
                    <RefreshCw className='w-4 h-4 text-cyan-400' />
                    Force Sync
                  </button>
                  <button className='w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-left flex items-center gap-3 transition-colors'>
                    <Power className='w-4 h-4 text-amber-400' />
                    Restart Device
                  </button>
                  <button className='w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-left flex items-center gap-3 transition-colors'>
                    <FileText className='w-4 h-4 text-purple-400' />
                    Download Logs
                  </button>
                  <button className='w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-left flex items-center gap-3 transition-colors'>
                    <Settings className='w-4 h-4 text-white/60' />
                    Configure Device
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
