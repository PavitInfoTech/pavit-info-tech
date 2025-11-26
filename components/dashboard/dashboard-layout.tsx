"use client";

import type React from "react";
import { Sidebar } from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-[#0a0b0f]'>
      <Sidebar />
      <main className='flex-1 overflow-auto md:ml-64'>
        <div className='min-h-screen bg-linear-to-br from-[#0a0b0f] via-[#0f1015] to-[#0a0b0f]'>
          {children}
        </div>
      </main>
    </div>
  );
}
