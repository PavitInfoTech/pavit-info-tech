"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Cpu,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import { useAuth } from "@/lib/use-auth";

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  // Check if current path matches link (exact for home, startsWith for others)
  const isActivePath = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle spotlight effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const platformItems = [
    {
      icon: Cpu,
      title: "Device Management",
      description: "Monitor and control all your IoT devices in real-time",
      href: "/dashboard/devices",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Powerful insights with interactive data visualization",
      href: "/dashboard/analytics",
    },
    {
      icon: Shield,
      title: "Security Suite",
      description: "Enterprise-grade security for your IoT infrastructure",
      href: "/dashboard/settings",
    },
    {
      icon: Zap,
      title: "Automation Rules",
      description: "Create smart workflows and automated responses",
      href: "/dashboard",
    },
  ];

  return (
    <>
      {/* Spacer to prevent content from going under fixed nav */}
      <div className='h-20' />

      <motion.nav
        ref={navRef}
        initial={{ width: "100%", top: 0 }}
        animate={{
          width: isScrolled ? "85%" : "100%",
          top: isScrolled ? 20 : 0,
          borderRadius: isScrolled ? 50 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onMouseMove={handleMouseMove}
        className='fixed left-1/2 -translate-x-1/2 z-50 overflow-visible'
        style={{
          background: isScrolled
            ? "rgba(15, 17, 26, 0.85)"
            : "rgba(15, 17, 26, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: isScrolled
            ? "1px solid rgba(6, 182, 212, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(6, 182, 212, 0.1)"
            : "none",
        }}
      >
        {/* Spotlight Effect */}
        <div
          className='pointer-events-none absolute inset-0 transition-opacity duration-300'
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.12), transparent 40%)`,
            borderRadius: isScrolled ? 50 : 0,
          }}
        />

        <div className='relative max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center space-x-2 font-serif font-bold text-lg text-white group'
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Logo
                  width={120}
                  height={50}
                />
              </motion.div>
              <span className='bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent'>
                PavitInfoTech
              </span>
            </Link>

            {/* Desktop Navigation (centered) */}
            <div className='hidden lg:flex flex-1 justify-center items-center space-x-1 px-4'>
              {navLinks.map((link) => {
                const isActive = isActivePath(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                      isActive
                        ? "text-cyan-400"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className='relative z-10'>{link.label}</span>
                    {isActive && (
                      <motion.div
                        className='absolute inset-0 bg-cyan-400/10 rounded-full border border-cyan-400/20'
                        layoutId='activeNav'
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <motion.div
                      className={`absolute inset-0 bg-white/5 rounded-full ${
                        isActive
                          ? "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  </Link>
                );
              })}

              {/* Platform Mega Menu Trigger */}
              <div
                className='relative'
                onMouseEnter={() => setIsPlatformOpen(true)}
                onMouseLeave={() => setIsPlatformOpen(false)}
              >
                <button className='flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group'>
                  <span>Platform</span>
                  <motion.div
                    animate={{ rotate: isPlatformOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className='w-4 h-4' />
                  </motion.div>
                </button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {isPlatformOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className='absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] p-6 rounded-2xl'
                      style={{
                        background: "rgba(15, 17, 26, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(6, 182, 212, 0.2)",
                        boxShadow:
                          "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(6, 182, 212, 0.1)",
                      }}
                    >
                      <div className='grid grid-cols-2 gap-4'>
                        {platformItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors'
                          >
                            <div className='flex-shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400/20 to-cyan-600/20 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors'>
                              <item.icon className='w-5 h-5 text-cyan-400' />
                            </div>
                            <div>
                              <h4 className='text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors'>
                                {item.title}
                              </h4>
                              <p className='text-xs text-white/50 mt-1'>
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Mini Chart Visual */}
                      <div className='mt-4 pt-4 border-t border-white/10'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <div className='flex space-x-1 items-end'>
                              {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                                <motion.div
                                  key={i}
                                  className='w-2 bg-linear-to-t from-cyan-600 to-cyan-400 rounded-full'
                                  initial={{ height: 0 }}
                                  animate={{ height: height * 0.3 }}
                                  transition={{
                                    delay: i * 0.05,
                                    duration: 0.3,
                                  }}
                                />
                              ))}
                            </div>
                            <span className='text-xs text-white/50 self-end'>
                              Real-time metrics
                            </span>
                          </div>
                          <Link
                            href='/dashboard'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-xs text-cyan-400 hover:text-cyan-300 font-medium'
                          >
                            Go to Dashboard →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Actions (CTAs) */}
            <div className='hidden lg:flex items-center space-x-4 gap-2 flex-wrap justify-end'>
              {/* System Online Indicator */}
              <div className='flex items-center space-x-1.5 xl:space-x-2 px-2 xl:px-3 py-1 xl:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20'>
                <motion.div
                  className='w-1.5 xl:w-2 h-1.5 xl:h-2 rounded-full bg-emerald-400'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className='text-[10px] xl:text-xs font-medium text-emerald-400 whitespace-nowrap'>
                  Online
                </span>
              </div>

              {!authLoading && isAuthenticated ? (
                /* Authenticated: Show Dashboard button */
                <Button
                  size='sm'
                  className='bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white border-0 shadow-lg shadow-cyan-500/25 gap-1.5 xl:gap-2 text-xs xl:text-sm px-2.5 xl:px-4'
                  asChild
                >
                  <Link
                    href='/dashboard'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <LayoutDashboard className='w-3.5 xl:w-4 h-3.5 xl:h-4' />
                    <span className='hidden xl:inline'>Dashboard</span>
                    <span className='xl:hidden'>Dash</span>
                  </Link>
                </Button>
              ) : (
                /* Not authenticated: Show Login + Request Demo */
                <>
                  <Link
                    href='/auth/signin'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs xl:text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap'
                  >
                    Log In
                  </Link>

                  <Button
                    size='sm'
                    className='bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white border-0 shadow-lg shadow-cyan-500/25 text-xs xl:text-sm px-2.5 xl:px-4'
                    asChild
                  >
                    <Link href='/contact' className='whitespace-nowrap'>
                      <span className='hidden xl:inline'>Request Demo</span>
                      <span className='xl:hidden'>Request Demo</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className='lg:hidden flex items-center space-x-3'>
              {/* Mobile System Indicator */}
              <motion.div
                className='w-2 h-2 rounded-full bg-emerald-400'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='text-white p-2'
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='lg:hidden overflow-hidden'
            >
              <div className='px-6 pb-6 space-y-2'>
                {navLinks.map((link, index) => {
                  const isActive = isActivePath(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                          isActive
                            ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Platform Section in Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className='px-4 py-3'
                >
                  <p className='text-xs font-semibold text-white/40 uppercase tracking-wider mb-3'>
                    Platform
                  </p>
                  <div className='space-y-2'>
                    {platformItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors'
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className='w-5 h-5 text-cyan-400' />
                        <span className='text-sm text-white/70'>
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <div className='pt-4 space-y-3'>
                  {!authLoading && isAuthenticated ? (
                    /* Authenticated: Show Dashboard button */
                    <Button
                      size='sm'
                      className='w-full bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white gap-2'
                      asChild
                    >
                      <Link
                        href='/dashboard'
                        target='_blank'
                        rel='noopener noreferrer'
                        onClick={() => setIsOpen(false)}
                      >
                        <LayoutDashboard className='w-4 h-4' />
                        Open Dashboard
                      </Link>
                    </Button>
                  ) : (
                    /* Not authenticated: Show Login + Request Demo */
                    <>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full bg-transparent border-white/20 text-white hover:bg-white/5'
                        asChild
                      >
                        <Link
                          href='/auth/signin'
                          onClick={() => setIsOpen(false)}
                        >
                          Log In
                        </Link>
                      </Button>
                      <Button
                        size='sm'
                        className='w-full bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white'
                        asChild
                      >
                        <Link href='/contact' onClick={() => setIsOpen(false)}>
                          Request Demo
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
