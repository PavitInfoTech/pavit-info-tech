"use client";

import type React from "react";
import { Sidebar } from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-[oklch(0.08_0.02_260)]'>
      <Sidebar />
      <main className='flex-1 overflow-auto md:ml-72'>
        <div className='min-h-screen bg-linear-to-br from-[oklch(0.08_0.02_260)] via-[oklch(0.10_0.02_260)] to-[oklch(0.08_0.02_260)]'>
          {children}
        </div>
      </main>
    </div>
  );
}
