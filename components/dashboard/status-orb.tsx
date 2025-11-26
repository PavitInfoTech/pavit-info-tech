"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type SystemStatus = "healthy" | "warning" | "critical";

interface StatusOrbProps {
  status?: SystemStatus;
}

export function StatusOrb({ status: propStatus }: StatusOrbProps) {
  const [internalStatus, setInternalStatus] = useState<SystemStatus>("healthy");
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    network: 98,
  });

  // Use prop if provided, otherwise use internal state
  const status = propStatus || internalStatus;

  // Simulate status changes only when uncontrolled
  useEffect(() => {
    if (propStatus) return;

    const interval = setInterval(() => {
      const newMetrics = {
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 50,
        network: Math.floor(Math.random() * 10) + 90,
      };
      setMetrics(newMetrics);

      // Determine status based on metrics
      if (newMetrics.cpu > 80 || newMetrics.memory > 90) {
        setInternalStatus("critical");
      } else if (newMetrics.cpu > 60 || newMetrics.memory > 75) {
        setInternalStatus("warning");
      } else {
        setInternalStatus("healthy");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [propStatus]);

  const statusConfig = {
    healthy: {
      color: "rgb(52, 211, 153)", // emerald-400
      bgColor: "rgba(52, 211, 153, 0.1)",
      glowColor: "rgba(52, 211, 153, 0.4)",
      label: "All Systems Operational",
    },
    warning: {
      color: "rgb(251, 191, 36)", // amber-400
      bgColor: "rgba(251, 191, 36, 0.1)",
      glowColor: "rgba(251, 191, 36, 0.4)",
      label: "Performance Degradation",
    },
    critical: {
      color: "rgb(248, 113, 113)", // red-400
      bgColor: "rgba(248, 113, 113, 0.1)",
      glowColor: "rgba(248, 113, 113, 0.4)",
      label: "Critical Alert",
    },
  };

  const config = statusConfig[status];

  return (
    <div className='relative flex flex-col items-center'>
      {/* Orb Container */}
      <div className='relative'>
        {/* Outer glow rings */}
        <motion.div
          className='absolute inset-0 rounded-full'
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle ring */}
        <motion.div
          className='absolute inset-2 rounded-full border-2'
          style={{
            borderColor: config.color,
            opacity: 0.3,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Main orb */}
        <motion.div
          className='relative w-20 h-20 rounded-full flex items-center justify-center'
          style={{
            background: `radial-gradient(circle at 30% 30%, ${config.color}, ${config.bgColor})`,
            boxShadow: `0 0 30px ${config.glowColor}, inset 0 0 20px ${config.bgColor}`,
          }}
          animate={{
            boxShadow: [
              `0 0 30px ${config.glowColor}, inset 0 0 20px ${config.bgColor}`,
              `0 0 50px ${config.glowColor}, inset 0 0 30px ${config.bgColor}`,
              `0 0 30px ${config.glowColor}, inset 0 0 20px ${config.bgColor}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Inner core */}
          <motion.div
            className='w-8 h-8 rounded-full'
            style={{
              background: `radial-gradient(circle at 40% 40%, white, ${config.color})`,
            }}
            animate={{
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Rotating ring */}
        <motion.div
          className='absolute inset-[-8px] rounded-full border border-dashed'
          style={{ borderColor: `${config.color}40` }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Status Label */}
      <div className='mt-4 text-center'>
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-xs font-medium tracking-wider'
          style={{ color: config.color }}
        >
          {config.label}
        </motion.p>
      </div>

      {/* Mini metrics */}
      <div className='mt-3 flex items-center space-x-4 text-[10px] text-white/40'>
        <div className='flex items-center space-x-1'>
          <span>CPU</span>
          <span className='font-mono text-white/60'>{metrics.cpu}%</span>
        </div>
        <div className='flex items-center space-x-1'>
          <span>MEM</span>
          <span className='font-mono text-white/60'>{metrics.memory}%</span>
        </div>
        <div className='flex items-center space-x-1'>
          <span>NET</span>
          <span className='font-mono text-white/60'>{metrics.network}%</span>
        </div>
      </div>
    </div>
  );
}
