"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      // Show after a small delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDeny = () => {
    localStorage.setItem("cookie-consent", "denied")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl p-4 md:p-6 z-30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold">Cookie Preference</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience. By continuing to browse this site, you agree to our use of
              cookies. Read our{" "}
              <Link href="/cookies" className="text-primary hover:underline">
                Cookie Policy
              </Link>{" "}
              for more information.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={handleDeny} className="whitespace-nowrap bg-transparent">
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept} className="whitespace-nowrap">
              Accept All
            </Button>
            <button onClick={handleDeny} className="p-1 hover:bg-muted rounded-md transition-colors" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
