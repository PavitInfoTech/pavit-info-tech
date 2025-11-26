"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TickerStats {
  active: number;
  offline: number;
  latency: number;
  dataRate: string;
  uptime: string;
}

export function HealthTicker() {
  const [stats, setStats] = useState<TickerStats>({
    active: 4021,
    offline: 12,
    latency: 42,
    dataRate: "1.2 TB/s",
    uptime: "99.97%",
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        active: prev.active + Math.floor(Math.random() * 5) - 2,
        offline: Math.max(0, prev.offline + Math.floor(Math.random() * 3) - 1),
        latency: Math.floor(Math.random() * 20) + 35,
        dataRate: `${(Math.random() * 0.5 + 1).toFixed(1)} TB/s`,
        uptime: `${(99.9 + Math.random() * 0.09).toFixed(2)}%`,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tickerItems = [
    {
      label: "ACTIVE",
      value: stats.active.toLocaleString(),
      color: "text-emerald-400",
    },
    {
      label: "OFFLINE",
      value: stats.offline.toString(),
      color: "text-red-400",
    },
    {
      label: "AVG LATENCY",
      value: `${stats.latency}ms`,
      color: "text-cyan-400",
    },
    { label: "DATA RATE", value: stats.dataRate, color: "text-purple-400" },
    { label: "UPTIME", value: stats.uptime, color: "text-emerald-400" },
  ];

  // Duplicate for seamless loop
  const allItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className='relative overflow-hidden bg-white/[0.02] border-b border-white/5'>
      <div className='absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#0a0b0f] to-transparent z-10' />
      <div className='absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#0a0b0f] to-transparent z-10' />

      <motion.div
        className='flex items-center py-3 whitespace-nowrap'
        animate={{ x: [0, -33.33 + "%"] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {allItems.map((item, index) => (
          <div key={index} className='flex items-center space-x-2 mx-8'>
            <span className='text-xs font-medium text-white/40 tracking-wider'>
              {item.label}:
            </span>
            <span className={`font-mono text-sm font-semibold ${item.color}`}>
              {item.value}
            </span>
            <span className='text-white/10 mx-4'>|</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
