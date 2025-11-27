"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EventLogEntry {
  id: string;
  timestamp: Date;
  type: "info" | "warning" | "error" | "success";
  source: string;
  message: string;
}

const generateRandomEvent = (): EventLogEntry => {
  const types: EventLogEntry["type"][] = [
    "info",
    "warning",
    "error",
    "success",
  ];
  const sources = [
    "sensor-alpha-001",
    "sensor-beta-042",
    "gateway-main",
    "api-server",
    "db-cluster",
    "auth-service",
    "analytics-worker",
  ];
  const messages = {
    info: [
      "Heartbeat received",
      "Data sync completed",
      "Connection established",
      "Cache refreshed",
      "Metric update processed",
    ],
    warning: [
      "High memory usage detected",
      "Response time exceeding threshold",
      "Connection pool nearing limit",
      "Rate limit approaching",
    ],
    error: [
      "Connection timeout",
      "Authentication failed",
      "Data validation error",
      "Service unavailable",
    ],
    success: [
      "Deployment successful",
      "Backup completed",
      "Health check passed",
      "Configuration updated",
    ],
  };

  const type = types[Math.floor(Math.random() * types.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const typeMessages = messages[type];
  const message = typeMessages[Math.floor(Math.random() * typeMessages.length)];

  return {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date(),
    type,
    source,
    message,
  };
};

export function EventLog() {
  const [events, setEvents] = useState<EventLogEntry[]>(() =>
    Array.from({ length: 15 }, generateRandomEvent)
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Add new events periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = generateRandomEvent();
      setEvents((prev) => [...prev.slice(-50), newEvent]);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events, autoScroll]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setAutoScroll(isAtBottom);
    }
  };

  const typeConfig = {
    info: { color: "text-cyan-400", bg: "bg-cyan-400/10", prefix: "INFO" },
    warning: { color: "text-amber-400", bg: "bg-amber-400/10", prefix: "WARN" },
    error: { color: "text-red-400", bg: "bg-red-400/10", prefix: "ERR!" },
    success: {
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      prefix: "OK  ",
    },
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className='h-full flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]'>
        <div className='flex items-center space-x-2'>
          <div className='flex space-x-1.5'>
            <div className='w-3 h-3 rounded-full bg-red-500/80' />
            <div className='w-3 h-3 rounded-full bg-amber-500/80' />
            <div className='w-3 h-3 rounded-full bg-emerald-500/80' />
          </div>
          <span className='text-xs font-mono text-white/40 ml-2'>
            system.log
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <motion.div
            className='w-2 h-2 rounded-full bg-emerald-400'
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className='text-[10px] text-white/30 font-mono'>LIVE</span>
        </div>
      </div>

      {/* Event List */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent'
      >
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const config = typeConfig[event.type];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className='flex items-start space-x-2 py-1 px-2 rounded hover:bg-white/[0.02] group'
              >
                <span className='text-white/20 shrink-0'>
                  {formatTime(event.timestamp)}
                </span>
                <span
                  className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] ${config.bg} ${config.color}`}
                >
                  {config.prefix}
                </span>
                <span className='text-purple-400/80 shrink-0'>
                  [{event.source}]
                </span>
                <span className='text-white/60 group-hover:text-white/80 transition-colors'>
                  {event.message}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Auto-scroll indicator */}
      {!autoScroll && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => setAutoScroll(true)}
          className='absolute bottom-4 right-4 px-3 py-1.5 text-xs font-mono bg-cyan-400/20 text-cyan-400 rounded-full border border-cyan-400/30 hover:bg-cyan-400/30 transition-colors'
        >
          ↓ New events
        </motion.button>
      )}
    </div>
  );
}
