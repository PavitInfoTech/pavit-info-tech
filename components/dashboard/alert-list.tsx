"use client";

import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, XCircle, Clock } from "lucide-react";

interface Alert {
  id: string;
  severity: "critical" | "high" | "medium";
  title: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

interface AlertListProps {
  alerts?: Alert[];
}

const defaultAlerts: Alert[] = [
  {
    id: "1",
    severity: "critical",
    title: "Database connection pool exhausted",
    source: "db-cluster-primary",
    timestamp: "2 min ago",
    acknowledged: false,
  },
  {
    id: "2",
    severity: "critical",
    title: "Memory usage exceeded 95% threshold",
    source: "worker-node-03",
    timestamp: "5 min ago",
    acknowledged: false,
  },
  {
    id: "3",
    severity: "high",
    title: "API response time degradation",
    source: "api-gateway",
    timestamp: "12 min ago",
    acknowledged: true,
  },
  {
    id: "4",
    severity: "high",
    title: "Sensor offline for 10+ minutes",
    source: "sensor-gamma-019",
    timestamp: "18 min ago",
    acknowledged: false,
  },
  {
    id: "5",
    severity: "medium",
    title: "SSL certificate expiring in 7 days",
    source: "edge-server-02",
    timestamp: "1 hour ago",
    acknowledged: true,
  },
];

export function AlertList({ alerts = defaultAlerts }: AlertListProps) {
  const severityConfig = {
    critical: {
      icon: XCircle,
      color: "text-red-400",
      border: "border-l-red-500",
      bg: "bg-red-500/5",
      glow: "hover:shadow-red-500/10",
    },
    high: {
      icon: AlertTriangle,
      color: "text-amber-400",
      border: "border-l-amber-500",
      bg: "bg-amber-500/5",
      glow: "hover:shadow-amber-500/10",
    },
    medium: {
      icon: AlertCircle,
      color: "text-yellow-400",
      border: "border-l-yellow-500",
      bg: "bg-yellow-500/5",
      glow: "hover:shadow-yellow-500/10",
    },
  };

  return (
    <div className='h-full flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]'>
        <div className='flex items-center space-x-2'>
          <AlertTriangle className='w-4 h-4 text-amber-400' />
          <span className='text-sm font-medium text-white/80'>
            Priority Alerts
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-xs font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full'>
            {alerts.filter((a) => !a.acknowledged).length} active
          </span>
        </div>
      </div>

      {/* Alert List */}
      <div className='flex-1 overflow-y-auto'>
        {alerts.map((alert, index) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative border-l-4 ${config.border} ${
                config.bg
              } p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
                alert.acknowledged ? "opacity-50" : ""
              }`}
            >
              {/* Pulse for unacknowledged critical alerts */}
              {!alert.acknowledged && alert.severity === "critical" && (
                <motion.div
                  className='absolute inset-0 bg-red-500/5'
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className='relative flex items-start space-x-3'>
                <div className={`mt-0.5 ${config.color}`}>
                  <Icon className='w-4 h-4' />
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-white/90 truncate group-hover:text-white transition-colors'>
                      {alert.title}
                    </p>
                  </div>

                  <div className='flex items-center space-x-3 mt-1.5'>
                    <span className='text-xs font-mono text-purple-400/70'>
                      {alert.source}
                    </span>
                    <div className='flex items-center space-x-1 text-white/30'>
                      <Clock className='w-3 h-3' />
                      <span className='text-xs'>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Acknowledge button */}
                {!alert.acknowledged && (
                  <button className='opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-[10px] font-medium text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded'>
                    ACK
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className='px-4 py-3 border-t border-white/10 bg-white/[0.02]'>
        <button className='text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors'>
          View all alerts →
        </button>
      </div>
    </div>
  );
}
