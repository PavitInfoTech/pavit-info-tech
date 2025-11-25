import type React from "react"
import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  change?: number
  icon: React.ReactNode
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const isPositive = change ? change > 0 : false

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm mt-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span>{Math.abs(change)}% from last week</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
      </div>
    </Card>
  )
}
