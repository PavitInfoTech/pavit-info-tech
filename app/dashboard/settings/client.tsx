"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { RuleBuilder } from "@/components/dashboard/settings/rule-builder";
import { UserManagement } from "@/components/dashboard/settings/user-management";
import { Settings2, Sparkles } from "lucide-react";

export default function SettingsPageClient() {
  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='space-y-8'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='relative'
          >
            <div className='flex items-center gap-4 mb-2'>
              <div className='relative'>
                <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-primary/30 to-secondary/30 flex items-center justify-center'>
                  <Settings2 className='w-7 h-7 text-primary' />
                </div>
                <motion.div
                  className='absolute -top-1 -right-1'
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className='w-5 h-5 text-yellow-400' />
                </motion.div>
              </div>
              <div>
                <h1 className='text-3xl font-bold font-serif'>
                  The Control Room
                </h1>
                <p className='text-muted-foreground'>
                  Complex configurations made manageable
                </p>
              </div>
            </div>

            {/* Decorative line */}
            <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent' />
          </motion.div>

          {/* Rule Builder */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <RuleBuilder />
          </motion.section>

          {/* User Management */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UserManagement />
          </motion.section>
        </div>
      </div>
    </DashboardLayout>
  );
}
