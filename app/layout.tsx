import type React from "react";
import type { Metadata } from "next";

// import { Analytics } from "@vercel/analytics/next";
import { Chatbot } from "@/components/chatbot/chatbot";
import { ChatProvider } from "@/components/chatbot/chat-context";
import { CookieConsent } from "@/components/consent/cookie-consent";
import "./globals.css";

import { Manrope, Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";

// Initialize fonts
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "PavitInfoTech - AI-Powered IoT Platform",
  description:
    "Enterprise-grade AI-powered IoT platform with real-time monitoring, predictive analytics, and anomaly detection",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${GeistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ChatProvider>
          {children}
          <Chatbot />
        </ChatProvider>
        <CookieConsent />
        {/* { <Analytics />} */}
      </body>
    </html>
  );
}
