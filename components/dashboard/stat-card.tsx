"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: "cyan" | "purple" | "emerald" | "amber";
  sparklineData?: number[];
}

export function StatCard({
  label,
  value,
  change,
  icon,
  color = "cyan",
  sparklineData = [40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 70],
}: StatCardProps) {
  const isPositive = change ? change > 0 : false;

  const colorConfig = {
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/20",
      glow: "rgba(6, 182, 212, 0.15)",
      sparkline: "rgb(6, 182, 212)",
    },
    purple: {
      text: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
      glow: "rgba(168, 85, 247, 0.15)",
      sparkline: "rgb(168, 85, 247)",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      glow: "rgba(52, 211, 153, 0.15)",
      sparkline: "rgb(52, 211, 153)",
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      glow: "rgba(251, 191, 36, 0.15)",
      sparkline: "rgb(251, 191, 36)",
    },
  };

  const config = colorConfig[color];

  // Generate sparkline path
  const maxValue = Math.max(...sparklineData);
  const minValue = Math.min(...sparklineData);
  const range = maxValue - minValue || 1;
  const width = 100;
  const height = 40;
  const points = sparklineData.map((val, i) => {
    const x = (i / (sparklineData.length - 1)) * width;
    const y = height - ((val - minValue) / range) * height;
    return `${x},${y}`;
  });
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white/[0.03] border ${config.border} p-5 group`}
      whileHover={{
        borderColor: config.sparkline,
        boxShadow: `0 0 30px ${config.glow}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Sparkline Background */}
      <div className='absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-50 transition-opacity'>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className='w-full h-full'
          preserveAspectRatio='none'
        >
          <defs>
            <linearGradient
              id={`gradient-${color}`}
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='0%'
                stopColor={config.sparkline}
                stopOpacity='0.3'
              />
              <stop
                offset='100%'
                stopColor={config.sparkline}
                stopOpacity='0'
              />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#gradient-${color})`} />
          <path
            d={linePath}
            fill='none'
            stroke={config.sparkline}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <div className='flex items-start justify-between mb-3'>
          <p className='text-xs font-medium text-white/40 uppercase tracking-wider'>
            {label}
          </p>
          <div className={`p-2 rounded-lg ${config.bg} ${config.text}`}>
            {icon}
          </div>
        </div>

        <motion.p
          className={`text-3xl font-mono font-bold ${config.text}`}
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.p>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs mt-2 ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUp className='w-3 h-3' />
            ) : (
              <ArrowDown className='w-3 h-3' />
            )}
            <span className='font-mono'>{Math.abs(change)}%</span>
            <span className='text-white/30'>vs last week</span>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <motion.div
        className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
        style={{
          background: `radial-gradient(circle at 50% 50%, ${config.glow}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
