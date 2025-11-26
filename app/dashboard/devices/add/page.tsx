"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Cpu,
  MapPin,
  Wifi,
  Tag,
  Save,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

const deviceTypes = [
  "Temperature Sensor",
  "Humidity Sensor",
  "Pressure Sensor",
  "Motion Sensor",
  "Light Sensor",
  "Door Sensor",
  "Gas Sensor",
  "Water Sensor",
];

const locations = [
  "Zone A - Building 1",
  "Zone A - Building 2",
  "Zone B - Warehouse",
  "Zone C - Factory Floor",
  "Zone D - Office Complex",
  "Zone E - External",
];

export default function AddDevicePage() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    ipAddress: "",
    macAddress: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // In real app, redirect to device list or new device page
  };

  const handleReset = () => {
    setFormData({
      name: "",
      type: "",
      location: "",
      ipAddress: "",
      macAddress: "",
      notes: "",
    });
  };

  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='max-w-3xl mx-auto pb-12'>
          {/* Header */}
          <div className='mb-8'>
            <Link
              href='/dashboard/devices'
              className='inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-6'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Device Inventory
            </Link>

            <h1 className='text-3xl md:text-4xl font-bold font-serif mb-3 tracking-tight'>
              Add New Device
            </h1>
            <p className='text-muted-foreground text-base'>
              Register a new IoT device to your fleet. Fill in the details below
              to get started.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit}>
            <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8'>
              {/* Device Identity Section */}
              <div className='space-y-6'>
                <div className='flex items-center gap-3 pb-4 border-b border-white/10'>
                  <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center'>
                    <Cpu className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>Device Identity</h2>
                    <p className='text-sm text-white/50'>
                      Basic information about the device
                    </p>
                  </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white/70'>
                      Device Name *
                    </label>
                    <Input
                      placeholder='e.g., Temp-Sensor-001'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className='bg-white/5 border-white/10 focus:border-cyan-500/50'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white/70'>
                      Device Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className='w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors'
                      required
                    >
                      <option value='' className='bg-zinc-900'>
                        Select device type
                      </option>
                      {deviceTypes.map((type) => (
                        <option key={type} value={type} className='bg-zinc-900'>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className='space-y-6'>
                <div className='flex items-center gap-3 pb-4 border-b border-white/10'>
                  <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center'>
                    <MapPin className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>Location</h2>
                    <p className='text-sm text-white/50'>
                      Where is this device installed?
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white/70'>
                    Zone / Building
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className='w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors'
                  >
                    <option value='' className='bg-zinc-900'>
                      Select location
                    </option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className='bg-zinc-900'>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Network Section */}
              <div className='space-y-6'>
                <div className='flex items-center gap-3 pb-4 border-b border-white/10'>
                  <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
                    <Wifi className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>
                      Network Configuration
                    </h2>
                    <p className='text-sm text-white/50'>
                      Network identifiers for the device
                    </p>
                  </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white/70'>
                      IP Address
                    </label>
                    <Input
                      placeholder='e.g., 10.0.1.100'
                      value={formData.ipAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, ipAddress: e.target.value })
                      }
                      className='bg-white/5 border-white/10 focus:border-cyan-500/50 font-mono'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white/70'>
                      MAC Address
                    </label>
                    <Input
                      placeholder='e.g., AA:BB:CC:DD:EE:FF'
                      value={formData.macAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, macAddress: e.target.value })
                      }
                      className='bg-white/5 border-white/10 focus:border-cyan-500/50 font-mono'
                    />
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className='space-y-6'>
                <div className='flex items-center gap-3 pb-4 border-b border-white/10'>
                  <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center'>
                    <Tag className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>Additional Notes</h2>
                    <p className='text-sm text-white/50'>
                      Any extra information about this device
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white/70'>
                    Notes
                  </label>
                  <textarea
                    placeholder='Add any notes, installation details, or special configurations...'
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={4}
                    className='w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm focus:border-cyan-500/50 focus:outline-none transition-colors resize-none'
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-between mt-8 pt-6 border-t border-white/10'>
              <Button
                type='button'
                variant='outline'
                onClick={handleReset}
                className='gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset Form
              </Button>

              <div className='flex items-center gap-3'>
                <Link href='/dashboard/devices'>
                  <Button type='button' variant='ghost'>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='gap-2 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500'
                >
                  <Save className='w-4 h-4' />
                  {isSubmitting ? "Adding Device..." : "Add Device"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
