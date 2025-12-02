"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Bell,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/use-auth";
import { useSubscription } from "@/lib/use-subscription";

const menuItems = [
  {
    label: "Command Center",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & metrics",
  },
  {
    label: "Device Network",
    href: "/dashboard/devices",
    icon: Zap,
    description: "Connected systems",
    badge: 12,
  },
  {
    label: "The Data Lab",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Analytics & insights",
  },
  {
    label: "Control Room",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Configuration hub",
  },
];

// Animated neural network background
function NeuralBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {/* Animated gradient orbs */}
      <div className='absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse' />
      <div className='absolute top-1/2 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000' />
      <div className='absolute bottom-20 left-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500' />

      {/* Neural connection lines */}
      <svg className='absolute inset-0 w-full h-full opacity-[0.03]'>
        <defs>
          <pattern
            id='neural-grid'
            width='40'
            height='40'
            patternUnits='userSpaceOnUse'
          >
            <circle cx='20' cy='20' r='1' fill='currentColor' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#neural-grid)' />
      </svg>
    </div>
  );
}

function NavItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof menuItems)[0];
  isActive: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link href={item.href} onClick={onClick}>
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
          isActive
            ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
            : "hover:bg-white/5 border border-transparent"
        )}
      >
        {/* Active indicator glow */}
        {isActive && (
          <motion.div
            layoutId='activeTab'
            className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-blue-400 to-purple-500 rounded-full'
          />
        )}

        {/* Icon container */}
        <div
          className={cn(
            "relative w-9 h-9 rounded-lg flex items-center justify-center transition-all",
            isActive
              ? "bg-linear-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
              : "bg-white/5 group-hover:bg-white/10"
          )}
        >
          <Icon
            className={cn(
              "w-4 h-4 transition-colors",
              isActive ? "text-white" : "text-white/60 group-hover:text-white"
            )}
          />
          {isActive && (
            <div className='absolute inset-0 rounded-lg bg-linear-to-br from-blue-400/50 to-purple-500/50 blur animate-pulse' />
          )}
        </div>

        {/* Label and description */}
        <div className='flex-1 min-w-0'>
          <p
            className={cn(
              "text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-white/70 group-hover:text-white"
            )}
          >
            {item.label}
          </p>
          <p className='text-[10px] text-white/40 truncate'>
            {item.description}
          </p>
        </div>

        {/* Badge or arrow */}
        {item.badge ? (
          <span className='px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-400 rounded-full'>
            {item.badge}
          </span>
        ) : (
          <ChevronRight
            className={cn(
              "w-4 h-4 opacity-0 -translate-x-2 transition-all",
              "group-hover:opacity-50 group-hover:translate-x-0"
            )}
          />
        )}
      </motion.div>
    </Link>
  );
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [notifications] = useState(3);
  const router = useRouter();
  const { user } = useAuth();
  const { plan } = useSubscription();

  const displayName = user
    ? user.first_name || user.last_name
      ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
      : user.username
    : "John Doe";

  const initials = user
    ? user.first_name || user.last_name
      ? `${user.first_name} ${user.last_name ?? ""}`
          .trim()
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase())
          .join("")
      : user.username.slice(0, 2).toUpperCase()
    : "JD";

  return (
    <>
      {/* Mobile Menu Button */}
      <div className='md:hidden fixed top-4 left-4 z-40'>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className='p-2.5 bg-[oklch(0.15_0.03_260)] border border-[oklch(0.25_0.05_260)] rounded-xl shadow-lg backdrop-blur-sm'
        >
          <AnimatePresence mode='wait'>
            {isOpen ? (
              <motion.div
                key='close'
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key='menu'
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-72 flex flex-col transition-transform duration-300 md:translate-x-0 z-30",
          "bg-[oklch(0.10_0.02_260)] border-r border-[oklch(0.20_0.03_260)]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NeuralBackground />

        {/* Logo Section */}
        <div className='relative h-20 flex items-center px-6 border-b border-[oklch(0.20_0.03_260)]'>
          <Link
            href='/dashboard'
            className='flex items-center gap-3 group'
            onClick={() => setIsOpen(false)}
          >
            {/* Animated Logo */}
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className='relative w-10 h-10'
            >
              <div className='absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl' />
              <div className='absolute inset-0.5 bg-[oklch(0.12_0.02_260)] rounded-[10px] flex items-center justify-center'>
                <Sparkles className='w-5 h-5 text-blue-400' />
              </div>
              <div className='absolute inset-0 bg-linear-to-br from-blue-400/30 to-purple-500/30 rounded-xl blur animate-pulse' />
            </motion.div>

            <div>
              <h1 className='font-serif font-bold text-lg bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent'>
                PavitInfoTech
              </h1>
              <p className='text-[10px] text-white/40 uppercase tracking-widest'>
                Neural Hub
              </p>
            </div>
          </Link>
        </div>

        {/* Quick Stats Bar */}
        <div className='px-4 py-3 border-b border-[oklch(0.20_0.03_260)]'>
          <div className='flex items-center justify-between p-2 rounded-lg bg-white/5'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
              <span className='text-xs text-white/60'>System Status</span>
            </div>
            <span className='text-xs font-semibold text-emerald-400'>
              Optimal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-3 py-4 space-y-1 overflow-y-auto'>
          <p className='px-4 py-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest'>
            Navigation
          </p>
          {menuItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              }
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>

        {/* Notifications Preview */}
        <div className='px-4 py-3 border-t border-[oklch(0.20_0.03_260)]'>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='p-3 rounded-xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 cursor-pointer'
          >
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <Bell className='w-5 h-5 text-amber-400' />
                {notifications > 0 && (
                  <span className='absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[10px] font-bold flex items-center justify-center'>
                    {notifications}
                  </span>
                )}
              </div>
              <div className='flex-1'>
                <p className='text-xs font-medium text-amber-400'>
                  {notifications} Alerts
                </p>
                <p className='text-[10px] text-white/40'>Require attention</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* User Section */}
        <div className='relative p-4 border-t border-[oklch(0.20_0.03_260)]'>
          <Link
            href='/dashboard/profile'
            className='block'
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer'
            >
              {/* Avatar with status ring */}
              <div className='relative'>
                <div className='w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm'>
                  {initials}
                </div>
                <div className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[oklch(0.10_0.02_260)]' />
              </div>

              <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold truncate'>{displayName}</p>
                <div className='flex items-center gap-1'>
                  <Crown className='w-3 h-3 text-amber-400' />
                  <span className='text-[10px] text-amber-400 font-medium'>
                    {plan ? `${plan.name} Plan` : "No Plan"}
                  </span>
                </div>
              </div>

              <ChevronRight className='w-4 h-4 text-white/30' />
            </motion.div>
          </Link>

          {/* Sign Out */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              setIsOpen(false);
              const { apiLogout } = await import("@/lib/auth-client");
              await apiLogout();
              router.push("/");
            }}
            className='w-full mt-2 flex items-center gap-2 px-4 py-2.5 text-sm text-white/50 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors'
          >
            <LogOut className='w-4 h-4' />
            <span>Sign Out</span>
          </motion.button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-20'
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
