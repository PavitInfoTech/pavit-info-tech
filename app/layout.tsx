import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { Chatbot } from "@/components/chatbot/chatbot"
import { CookieConsent } from "@/components/consent/cookie-consent"
import "./globals.css"

import { Manrope, Space_Grotesk, Manrope as V0_Font_Manrope, Space_Grotesk as V0_Font_Space_Grotesk } from 'next/font/google'

// Initialize fonts
const _manrope = V0_Font_Manrope({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"] })
const _spaceGrotesk = V0_Font_Space_Grotesk({ subsets: ['latin'], weight: ["300","400","500","600","700"] })

export const metadata: Metadata = {
  title: "PavitInfoTech - AI-Powered IoT Platform",
  description:
    "Enterprise-grade AI-powered IoT platform with real-time monitoring, predictive analytics, and anomaly detection",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
        <Chatbot />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
