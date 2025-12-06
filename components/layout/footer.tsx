"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  SiX,
  SiLinkedin,
  SiFacebook,
  SiPinterest,
  SiYoutube,
} from "react-icons/si";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { subscribeNewsletter, MailApiError } from "@/lib/mail-client";

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

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    setSubscribeError(null);

    try {
      await subscribeNewsletter({ email: newsletterEmail });
      setSubscribeStatus("success");
      setNewsletterEmail("");
    } catch (error) {
      setSubscribeStatus("error");
      if (error instanceof MailApiError) {
        setSubscribeError(error.message || "Subscription failed");
      } else {
        setSubscribeError("Something went wrong");
      }
    } finally {
      setIsSubscribing(false);
    }
  };

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
  // f6s and cruncbase icon svg components
  const f6sIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 800 800'
      className='w-6 h-6 fill-current'
    >
      <path d='M156.9 180.1h136.8v57.8h-79.1v124.9h45.8v57.8h-45.8v199.3h-57.8V180.1z' />
      <path d='M372.4 237.9v124.9h68.5c16.6 0 31.1 14.5 31.1 31v194.7c0 16.7-14.5 31.4-31.1 31.4h-95c-16.6 0-31.1-14.3-31.1-30.6V212.3c0-16.8 14.4-32.2 30.3-32.2h95.9c16.6 0 31.1 14.5 31.1 31v72.7h-57.8v-45.8zm0 182.7v141.5h41.9V420.6h-41.9z' />
      <path d='M647.1 283.7h-57.8v-45.8h-41.9v124.9l69.1 0.02c16.4 0 30.5 19.7 30.5 35.8v189.7c0 16.8-14.3 31.6-30.5 31.6h-92.9c-16.3 0-30.5-14.4-30.5-30.7v-106l54.3-0.1v79.1h41.9v-141.5l-65.7 0.02c-16.2 0-30.5-14.6-30.5-31.1V211.3c0-16.6 14.3-31.2 30.5-31.2h92.9c16.3 0 30.5 14.6 30.5 31.2v72.4z' />
    </svg>
  );
  const cruncbaseIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 70 70'
      className='w-6 h-6'
    >
      <path
        className='fill-current'
        d='M13.94 33.658a2.962 2.962 0 110.034-2.44h2.296a5.167 5.167 0 100 2.44h-2.296zM23.51 27.257h-.379a5.098 5.098 0 00-2.526.89v-5.752h-2.095v14.794h2.107v-.54a5.167 5.167 0 102.893-9.392zm2.962 5.534v.092a2.94 2.94 0 01-.08.362 2.934 2.934 0 01-.144.373v.046a2.98 2.98 0 01-2.072 1.625l-.281.046h-.063a2.916 2.916 0 01-.322 0 2.962 2.962 0 01-.402-.029h-.057a2.934 2.934 0 01-.752-.23h-.057a2.974 2.974 0 01-.666-.447 2.991 2.991 0 01-.522-.626 2.962 2.962 0 01-.19-.367 2.945 2.945 0 01.035-2.44 2.968 2.968 0 012.377-1.682 2.934 2.934 0 01.304 0 2.968 2.968 0 012.928 2.882 2.957 2.957 0 010 .396z'
        transform='matrix(3 0 0 3 -17 -60)'
      />
    </svg>
  );
  const socialLinks = [
    {
      label: "X",
      href: "https://x.com/pavitinfotech",
      icon: <SiX className='w-5 h-5' />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/pavitinfo-tech/",
      icon: <SiLinkedin className='w-5 h-5' />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/pavitinfotech/",
      icon: <SiFacebook className='w-5 h-5' />,
    },
    {
      label: "Pinterest",
      href: "https://www.pinterest.com/Pavitinfotech/",
      icon: <SiPinterest className='w-5 h-5' />,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@Pavitinfotech",
      icon: <SiYoutube className='w-5 h-5' />,
    },
    {
      label: "F6S",
      href: "https://www.f6s.com/pavitinfotech",
      icon: f6sIcon,
    },
    {
      label: "Crunchbase",
      href: "https://www.crunchbase.com/organization/pavitinfotech",
      icon: cruncbaseIcon,
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
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Use the new Logo component. Not forcing a square allows the logo to keep its natural aspect. */}
                <Logo width={200} height={75} className='rounded-md' />
              </motion.div>
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
                {socialLinks.map(({ href, label, icon }) => (
                  <MagneticIcon key={label} href={href} label={label}>
                    {icon}
                  </MagneticIcon>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className='text-xs font-semibold text-white/40 uppercase tracking-wider mb-4'>
                Stay Updated
              </h3>
              {subscribeStatus === "success" ? (
                <div className='flex items-center gap-2 text-emerald-400 text-sm'>
                  <Check className='w-4 h-4' />
                  <span>Subscribed!</span>
                </div>
              ) : (
                <div className='space-y-2'>
                  <div className='flex'>
                    <input
                      type='email'
                      placeholder='Enter your email'
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (subscribeStatus === "error") {
                          setSubscribeStatus("idle");
                          setSubscribeError(null);
                        }
                      }}
                      className='flex-1 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-l-lg text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/40'
                    />
                    <button
                      onClick={handleNewsletterSubmit}
                      disabled={isSubscribing || !newsletterEmail}
                      className='px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-r-lg transition-colors flex items-center justify-center min-w-[100px]'
                    >
                      {isSubscribing ? (
                        <Loader2 className='w-4 h-4 animate-spin' />
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                  {subscribeStatus === "error" && subscribeError && (
                    <div className='flex items-center gap-1.5 text-red-400 text-xs'>
                      <AlertCircle className='w-3 h-3' />
                      <span>{subscribeError}</span>
                    </div>
                  )}
                </div>
              )}
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
