import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { DeviceCard } from "@/components/dashboard/device-card";
import { Card } from "@/components/ui/card";
import { Zap, AlertCircle, TrendingUp, Activity } from "lucide-react";

const mockDevices = [
  {
    id: "1",
    name: "Sensor Unit Alpha",
    type: "Temperature Sensor",
    status: "active" as const,
    lastSeen: "2 minutes ago",
    metrics: { temperature: 24.5, humidity: 65 },
  },
  {
    id: "2",
    name: "Sensor Unit Beta",
    type: "Humidity Sensor",
    status: "active" as const,
    lastSeen: "5 minutes ago",
    metrics: { humidity: 72, signal: 95 },
  },
  {
    id: "3",
    name: "Sensor Unit Gamma",
    type: "Pressure Sensor",
    status: "warning" as const,
    lastSeen: "15 minutes ago",
    metrics: { temperature: 22.1, signal: 60 },
  },
  {
    id: "4",
    name: "Sensor Unit Delta",
    type: "Motion Sensor",
    status: "active" as const,
    lastSeen: "1 minute ago",
    metrics: { signal: 98 },
  },
];

export const metadata = {
  title: "Dashboard | PavitInfoTech",
  description: "IoT Device Management Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className='space-y-8'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold font-serif mb-2'>
            Welcome back, John!
          </h1>
          <p className='text-muted-foreground'>
            Here&#39;s what&#39;s happening with your IoT infrastructure
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard
            label='Active Devices'
            value='24'
            change={12}
            icon={<Activity className='w-6 h-6' />}
          />
          <StatCard
            label='Alerts'
            value='3'
            change={-25}
            icon={<AlertCircle className='w-6 h-6' />}
          />
          <StatCard
            label='Avg Performance'
            value='94%'
            change={8}
            icon={<TrendingUp className='w-6 h-6' />}
          />
          <StatCard
            label='Uptime'
            value='99.9%'
            change={0.5}
            icon={<Zap className='w-6 h-6' />}
          />
        </div>

        {/* Devices Section */}
        <div>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold font-serif'>Recent Devices</h2>
            <a
              href='/dashboard/devices'
              className='text-primary hover:underline text-sm font-semibold'
            >
              View All
            </a>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {mockDevices.map((device) => (
              <DeviceCard key={device.id} {...device} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <Card className='p-6'>
          <h3 className='text-lg font-semibold mb-4'>Recent Activity</h3>
          <div className='space-y-4'>
            {[
              {
                time: "2 min ago",
                message: "Sensor Unit Alpha reported temperature spike",
              },
              {
                time: "15 min ago",
                message: "Maintenance alert for Sensor Unit Gamma",
              },
              {
                time: "1 hour ago",
                message: "New device Sensor Unit Delta connected",
              },
              {
                time: "3 hours ago",
                message: "Anomaly detected in Sensor Unit Beta",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className='flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0'
              >
                <div className='w-2 h-2 rounded-full bg-primary mt-2 shrink-0' />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm'>{activity.message}</p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
