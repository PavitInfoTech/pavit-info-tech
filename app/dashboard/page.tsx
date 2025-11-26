"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { HealthTicker } from "@/components/dashboard/health-ticker";
import { StatusOrb } from "@/components/dashboard/status-orb";
import { EventLog } from "@/components/dashboard/event-log";
import { AlertList } from "@/components/dashboard/alert-list";
import { Cpu, Zap, Database, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Health Ticker - Full Width */}
      <HealthTicker />

      <div className='p-6 lg:p-8'>
        {/* Header Row */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8'>
          {/* Welcome Section */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-2xl lg:text-3xl font-bold text-white mb-2'
            >
              Good morning, John
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='text-white/50 text-sm'
            >
              Your infrastructure overview at a glance
            </motion.p>
          </div>

          {/* Status Orb - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className='hidden lg:block'
          >
            <StatusOrb />
          </motion.div>
        </div>

        {/* Main Bento Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left Column - KPI Cards */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Mobile Status Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className='lg:hidden flex justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10'
            >
              <StatusOrb />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard
                label='Total Devices'
                value='4,021'
                change={12}
                icon={<Cpu className='w-5 h-5' />}
                color='cyan'
                sparklineData={[35, 45, 52, 48, 55, 60, 58, 65, 70, 68, 75, 80]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard
                label='Power Consumption'
                value='2.4 MW'
                change={-8}
                icon={<Zap className='w-5 h-5' />}
                color='amber'
                sparklineData={[80, 75, 78, 72, 68, 65, 70, 68, 62, 58, 55, 52]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard
                label='Data Processed'
                value='1.2 TB'
                change={24}
                icon={<Database className='w-5 h-5' />}
                color='purple'
                sparklineData={[
                  20, 28, 35, 42, 48, 55, 62, 70, 78, 85, 92, 100,
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatCard
                label='Prediction Accuracy'
                value='94.2%'
                change={2.5}
                icon={<TrendingUp className='w-5 h-5' />}
                color='emerald'
                sparklineData={[88, 89, 90, 89, 91, 92, 91, 93, 92, 94, 93, 94]}
              />
            </motion.div>
          </div>

          {/* Center Column - Map Placeholder + Activity */}
          <div className='lg:col-span-6 space-y-6'>
            {/* Map Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='relative h-[400px] rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden'
            >
              {/* Dark map placeholder with device clusters */}
              <div className='absolute inset-0 bg-[#0d0f14]'>
                {/* Grid pattern */}
                <div
                  className='absolute inset-0 opacity-10'
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                  }}
                />

                {/* Simulated device clusters */}
                <div className='absolute inset-0'>
                  {/* Cluster 1 - Large */}
                  <motion.div
                    className='absolute left-[30%] top-[35%]'
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className='relative'>
                      <div className='w-16 h-16 rounded-full bg-cyan-400/20 blur-xl' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-8 h-8 rounded-full bg-cyan-400/40 flex items-center justify-center'>
                          <span className='text-[10px] font-mono text-cyan-400 font-bold'>
                            1.2K
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cluster 2 - Medium */}
                  <motion.div
                    className='absolute left-[55%] top-[25%]'
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className='relative'>
                      <div className='w-12 h-12 rounded-full bg-cyan-400/15 blur-lg' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-6 h-6 rounded-full bg-cyan-400/40 flex items-center justify-center'>
                          <span className='text-[8px] font-mono text-cyan-400 font-bold'>
                            842
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cluster 3 - Warning pulse */}
                  <motion.div
                    className='absolute left-[70%] top-[55%]'
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className='relative'>
                      <div className='w-10 h-10 rounded-full bg-amber-400/20 blur-lg' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-5 h-5 rounded-full bg-amber-400/50 flex items-center justify-center'>
                          <span className='text-[8px] font-mono text-amber-400 font-bold'>
                            56
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cluster 4 - Critical pulse */}
                  <motion.div
                    className='absolute left-[20%] top-[65%]'
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className='relative'>
                      <div className='w-8 h-8 rounded-full bg-red-400/30 blur-lg' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-4 h-4 rounded-full bg-red-400/60 flex items-center justify-center'>
                          <span className='text-[6px] font-mono text-red-400 font-bold'>
                            12
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cluster 5 - Small */}
                  <motion.div
                    className='absolute left-[45%] top-[60%]'
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className='relative'>
                      <div className='w-10 h-10 rounded-full bg-purple-400/15 blur-lg' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-5 h-5 rounded-full bg-purple-400/40 flex items-center justify-center'>
                          <span className='text-[8px] font-mono text-purple-400 font-bold'>
                            384
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Map overlay label */}
                <div className='absolute top-4 left-4'>
                  <span className='text-xs font-medium text-white/40 uppercase tracking-wider'>
                    Global Device Distribution
                  </span>
                </div>

                {/* Legend */}
                <div className='absolute bottom-4 left-4 flex items-center space-x-4'>
                  <div className='flex items-center space-x-1.5'>
                    <div className='w-2 h-2 rounded-full bg-cyan-400' />
                    <span className='text-[10px] text-white/40'>Active</span>
                  </div>
                  <div className='flex items-center space-x-1.5'>
                    <div className='w-2 h-2 rounded-full bg-amber-400' />
                    <span className='text-[10px] text-white/40'>Warning</span>
                  </div>
                  <div className='flex items-center space-x-1.5'>
                    <div className='w-2 h-2 rounded-full bg-red-400' />
                    <span className='text-[10px] text-white/40'>Critical</span>
                  </div>
                </div>

                {/* Zoom controls placeholder */}
                <div className='absolute bottom-4 right-4 flex flex-col space-y-1'>
                  <button className='w-8 h-8 rounded bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center text-lg'>
                    +
                  </button>
                  <button className='w-8 h-8 rounded bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center text-lg'>
                    −
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='grid grid-cols-3 gap-4'
            >
              <div className='p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center'>
                <div className='flex items-center justify-center space-x-2 mb-2'>
                  <Activity className='w-4 h-4 text-cyan-400' />
                  <span className='text-xs text-white/40'>Events/min</span>
                </div>
                <p className='text-2xl font-mono font-bold text-white'>847</p>
              </div>
              <div className='p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center'>
                <div className='flex items-center justify-center space-x-2 mb-2'>
                  <Database className='w-4 h-4 text-purple-400' />
                  <span className='text-xs text-white/40'>Queries/sec</span>
                </div>
                <p className='text-2xl font-mono font-bold text-white'>12.4K</p>
              </div>
              <div className='p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center'>
                <div className='flex items-center justify-center space-x-2 mb-2'>
                  <Zap className='w-4 h-4 text-amber-400' />
                  <span className='text-xs text-white/40'>Response</span>
                </div>
                <p className='text-2xl font-mono font-bold text-white'>42ms</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Event Log & Alerts */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Event Log */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='h-[280px]'
            >
              <EventLog />
            </motion.div>

            {/* Alert List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='h-[360px]'
            >
              <AlertList />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
