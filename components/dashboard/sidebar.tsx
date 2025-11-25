"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Devices",
    href: "/dashboard/devices",
    icon: Zap,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className='md:hidden fixed top-4 left-4 z-40'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='p-2 hover:bg-sidebar-accent rounded-lg transition-colors'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-30`}
      >
        {/* Logo */}
        <div className='h-16 flex items-center px-6 border-b border-sidebar-border'>
          <Link
            href='/dashboard'
            className='flex items-center space-x-2 font-serif font-bold text-lg'
          >
            <div className='w-8 h-8 bg-linear-to-br from-sidebar-primary to-secondary rounded-lg' />
            <span>PavitInfoTech</span>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className='flex-1 px-3 py-6 space-y-2'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className='flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors'
                onClick={() => setIsOpen(false)}
              >
                <Icon className='w-5 h-5' />
                <span className='text-sm font-medium'>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className='p-3 border-t border-sidebar-border space-y-2'>
          <Link
            href='/dashboard/profile'
            className='flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors'
            onClick={() => setIsOpen(false)}
          >
            <div className='w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sm font-bold'>
              JD
            </div>
            <div className='flex-1'>
              <p className='text-xs font-semibold'>John Doe</p>
              <p className='text-xs text-sidebar-foreground/70'>Pro Plan</p>
            </div>
          </Link>

          <Button
            variant='outline'
            size='sm'
            className='w-full justify-start gap-2 bg-transparent'
            asChild
          >
            <Link href='/auth/signin'>
              <LogOut className='w-4 h-4' />
              Sign Out
            </Link>
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 md:hidden z-20'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
