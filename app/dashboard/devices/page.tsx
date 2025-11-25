import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DeviceCard } from "@/components/dashboard/device-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

const allDevices = [
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
  {
    id: "5",
    name: "Sensor Unit Epsilon",
    type: "Light Sensor",
    status: "inactive" as const,
    lastSeen: "2 hours ago",
    metrics: { signal: 0 },
  },
  {
    id: "6",
    name: "Sensor Unit Zeta",
    type: "Door Sensor",
    status: "active" as const,
    lastSeen: "3 minutes ago",
    metrics: { signal: 92 },
  },
]

export const metadata = {
  title: "Devices | PavitInfoTech Dashboard",
  description: "Manage your IoT devices",
}

export default function DevicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2">Devices</h1>
            <p className="text-muted-foreground">Manage and monitor all your connected devices</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Device
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search devices..." className="pl-10" />
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDevices.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
