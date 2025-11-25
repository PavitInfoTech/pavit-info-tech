"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "Tech Corp",
    phone: "+1 (555) 123-4567",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Profile updated:", formData)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input name="company" value={formData.company} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>

        {/* Plan Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Your Plan</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$999/month</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-500">Active</p>
                <p className="text-xs text-muted-foreground">Renews Jan 15, 2025</p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Manage Subscription
            </Button>
          </div>
        </Card>

        {/* Security Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Security</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Connected Devices
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-500/20 bg-red-500/5">
          <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}
