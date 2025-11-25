import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Zap, AlertCircle, CheckCircle } from "lucide-react"

interface DeviceCardProps {
  id: string
  name: string
  type: string
  status: "active" | "warning" | "inactive"
  lastSeen: string
  metrics: {
    temperature?: number
    humidity?: number
    signal?: number
  }
}

export function DeviceCard({ id, name, type, status, lastSeen, metrics }: DeviceCardProps) {
  const statusConfig = {
    active: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
    warning: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    inactive: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <Link href={`/dashboard/devices/${id}`}>
      <Card className="p-6 hover:shadow-lg transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
              <p className="text-xs text-muted-foreground">{type}</p>
            </div>
          </div>
          <StatusIcon className={`w-5 h-5 ${statusConfig[status].color}`} />
        </div>

        <div className="space-y-3">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground capitalize">{key}</span>
              <span className="font-semibold">
                {value}
                {key === "signal" ? "%" : "°C"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Last seen: {lastSeen}</p>
        </div>
      </Card>
    </Link>
  )
}
