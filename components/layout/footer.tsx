import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "How It Works", href: "/how-it-works" },
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
    <footer className='bg-card border-t border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <Link
              href='/'
              className='flex items-center space-x-2 font-serif font-bold text-primary'
            >
              <div className='w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg' />
              <span>PavitInfoTech</span>
            </Link>
            <p className='text-sm text-muted-foreground'>
              Enterprise-grade AI-powered IoT platform for intelligent device
              management
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className='font-semibold text-sm mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className='mt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {currentYear} PavitInfoTech. All rights reserved.
          </p>
          <div className='flex items-center space-x-6'>
            <Link
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              Twitter
            </Link>
            <Link
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              LinkedIn
            </Link>
            <Link
              href='#'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
