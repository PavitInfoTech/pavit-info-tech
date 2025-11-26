"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className='fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center space-x-2 font-serif font-bold text-xl text-primary'
          >
            <div className='w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg' />
            <span>PavitInfoTech</span>
          </Link>

          {/* Desktop Navigation (centered) */}
          <div className='hidden md:flex flex-1 justify-center items-center space-x-8 px-4'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm font-medium text-foreground/70 hover:text-foreground transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions (CTAs) */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button
              variant='outline'
              size='sm'
              className='whitespace-nowrap'
              asChild
            >
              <Link href='/contact'>Post A Job For Free</Link>
            </Button>
            <Button size='sm' className='whitespace-nowrap' asChild>
              <Link href='/auth/signup'>Get Started</Link>
            </Button>
            {/* Small login link */}
            <Link
              href='/auth/signin'
              className='text-sm text-foreground/70 hover:text-foreground ml-2'
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-4'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-foreground'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden pb-4 space-y-2'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-md transition-colors'
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className='pt-2 space-y-2 px-4'>
              <Button
                variant='outline'
                size='sm'
                className='w-full bg-transparent'
                asChild
              >
                <Link href='/auth/signin'>Sign In</Link>
              </Button>
              <Button size='sm' className='w-full' asChild>
                <Link href='/auth/signup'>Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
