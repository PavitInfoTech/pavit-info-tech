"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SiX, SiLinkedin, SiGithub } from "react-icons/si";

// Magnetic social icon component
function MagneticIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 100) {
      const strength = (100 - distance) / 100;
      setPosition({
        x: distanceX * strength * 0.4,
        y: distanceY * strength * 0.4,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseLeave={handleMouseLeave}
      className='relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-colors group'
    >
      {children}
    </motion.a>
  );
}

// Animated particles background
function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${
              0.1 * (1 - distance / 120)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full pointer-events-none'
    />
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState({
    latency: 24,
    devices: 1024302,
  });

  // Live ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        latency: Math.floor(Math.random() * 20) + 18,
        devices: 1024302 + Math.floor(Math.random() * 100) - 50,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className='relative md:fixed bottom-0 left-0 w-full h-auto md:h-[500px] z-0 bg-[#050608] overflow-hidden'>
      {/* Particles Background - Desktop only */}
      <div className='hidden md:block'>
        <ParticlesBackground />
      </div>

      {/* Massive Background Typography */}
      <div className='absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden hidden md:block'>
        <h1
          className='text-[12rem] lg:text-[18rem] xl:text-[22rem] font-bold leading-none tracking-tighter'
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(6, 182, 212, 0.08)",
            transform: "translateY(20%)",
          }}
        >
          PAVIT
        </h1>
      </div>

      {/* Grid Lines - Asymmetrical */}
      <div className='absolute inset-0 hidden md:block pointer-events-none'>
        <div className='absolute left-[20%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-cyan-400/10 to-transparent' />
        <div className='absolute left-[55%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-cyan-400/10 to-transparent' />
        <div className='absolute left-[80%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-cyan-400/10 to-transparent' />
        <div className='absolute left-0 right-0 top-[40%] h-px bg-linear-to-r from-transparent via-cyan-400/10 to-transparent' />
      </div>

      {/* Main Footer Content */}
      <div className='relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4'>
          {/* Brand + Server Status */}
          <div className='md:col-span-4 space-y-8'>
            {/* Logo */}
            <Link href='/' className='inline-flex items-center space-x-3 group'>
              <motion.div
                className='w-10 h-10 bg-linear-to-br from-cyan-400 to-cyan-600 rounded-xl'
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <span className='font-serif font-bold text-xl text-white'>
                PavitInfoTech
              </span>
            </Link>

            <p className='text-sm text-white/50 max-w-xs'>
              Enterprise-grade AI-powered IoT platform for intelligent device
              management and real-time analytics.
            </p>

            {/* Live Server Status */}
            <div className='space-y-3 p-4 rounded-xl bg-white/5 border border-white/10'>
              <div className='flex items-center space-x-2'>
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
                <span className='text-xs font-medium text-emerald-400 uppercase tracking-wider'>
                  System Status
                </span>
              </div>

              <div className='space-y-2 text-xs'>
                <div className='flex justify-between items-center'>
                  <span className='text-white/40'>API Latency</span>
                  <motion.span
                    key={stats.latency}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-cyan-400 font-mono'
                  >
                    {stats.latency}ms
                  </motion.span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-white/40'>Devices Active</span>
                  <motion.span
                    key={stats.devices}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-cyan-400 font-mono'
                  >
                    {stats.devices.toLocaleString()}
                  </motion.span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-white/40'>Security</span>
                  <span className='text-emerald-400 font-medium flex items-center space-x-1'>
                    <svg
                      className='w-3 h-3'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Encrypted</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='md:col-span-5 grid grid-cols-3 gap-8'>
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className='text-xs font-semibold text-white/40 uppercase tracking-wider mb-4'>
                  {section.title}
                </h3>
                <ul className='space-y-3'>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className='text-sm text-white/60 hover:text-cyan-400 transition-colors'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social + Newsletter */}
          <div className='md:col-span-3 space-y-8'>
            <div>
              <h3 className='text-xs font-semibold text-white/40 uppercase tracking-wider mb-4'>
                Connect
              </h3>
              <div className='flex items-center space-x-3'>
                <MagneticIcon href='https://x.com' label='X (Twitter)'>
                  <SiX className='w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors' />
                </MagneticIcon>
                <MagneticIcon href='https://linkedin.com' label='LinkedIn'>
                  <SiLinkedin className='w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors' />
                </MagneticIcon>
                <MagneticIcon href='https://github.com' label='GitHub'>
                  <SiGithub className='w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors' />
                </MagneticIcon>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className='text-xs font-semibold text-white/40 uppercase tracking-wider mb-4'>
                Stay Updated
              </h3>
              <div className='flex'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-l-lg text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/40'
                />
                <button className='px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium rounded-r-lg transition-colors'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10'>
          <p className='text-xs text-white/40'>
            © {currentYear} PavitInfoTech. All rights reserved.
          </p>
          <div className='flex items-center space-x-6 text-xs text-white/40'>
            <Link
              href='/privacy'
              className='hover:text-cyan-400 transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='hover:text-cyan-400 transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/cookies'
              className='hover:text-cyan-400 transition-colors'
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
