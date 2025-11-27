import type React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Main content wrapper - sits above the footer */}
      <div className='relative z-10 bg-[#0f111a] min-h-screen mb-0 md:mb-[500px] shadow-2xl'>
        <Navbar />
        <main className='flex-1'>{children}</main>
      </div>

      {/* Footer reveals from behind on desktop, stacks normally on mobile */}
      <Footer />
    </>
  );
}
