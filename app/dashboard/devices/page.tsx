"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Plus, List, Grid } from "lucide-react";
import DeviceSearch from "@/components/dashboard/device-search";
import DeviceList from "@/components/dashboard/device-list";
import DeviceGrid from "@/components/dashboard/device-grid";

const allDevices = Array.from({ length: 36 }).map((_, i) => {
  const id = (i + 1).toString();
  const typePool = [
    "Temperature Sensor",
    "Humidity Sensor",
    "Pressure Sensor",
    "Motion Sensor",
    "Light Sensor",
    "Door Sensor",
  ];
  const statusPool: Array<"online" | "offline" | "warn"> = [
    "online",
    "online",
    "warn",
    "offline",
  ];
  return {
    id,
    name: `Device-${id.padStart(3, "0")}`,
    type: typePool[i % typePool.length],
    status: statusPool[i % statusPool.length] as "online" | "offline" | "warn",
    lastSeen: `${(i % 60) + 1} min ago`,
    ip: `10.0.1.${(i % 254) + 1}`,
    signal: Math.floor(Math.random() * 5),
    battery: Math.floor(Math.random() * 101),
  };
});

export default function DevicesPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDevices.filter((d) => {
      if (q && !`${d.id} ${d.name} ${d.ip} ${d.type}`.toLowerCase().includes(q))
        return false;
      // naive chip matching like 'Status: Online' or 'Type: Sensor'
      for (const f of filters) {
        const lower = f.toLowerCase();
        if (
          lower.startsWith("status:") &&
          !d.status.includes(lower.split(":")[1].trim().split(" ")[0])
        )
          return false;
        if (
          lower.startsWith("type:") &&
          !d.type
            .toLowerCase()
            .includes(lower.split(":")[1].trim().split(" ")[0])
        )
          return false;
        if (lower.startsWith("location:")) {
          // placeholder: match by odd/even
          if (
            (d.id as unknown as number) % 2 === 0 &&
            !lower.includes("zone a")
          )
            return false;
        }
      }
      return true;
    });
  }, [query, filters]);

  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='space-y-8 pb-8'>
          {/* Header */}
          <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between pt-2'>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold font-serif mb-3 tracking-tight'>
                Device Inventory
              </h1>
              <p className='text-muted-foreground text-base'>
                Filter, search and manage thousands of assets — high density
                mode
              </p>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center rounded-full bg-white/5 border border-white/10 p-1.5'>
                <button
                  onClick={() => setView("list")}
                  className={`p-2.5 rounded-full transition-colors ${
                    view === "list"
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/60 hover:text-white/80"
                  }`}
                  title='List view'
                >
                  <List className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`p-2.5 rounded-full transition-colors ${
                    view === "grid"
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/60 hover:text-white/80"
                  }`}
                  title='Grid view'
                >
                  <Grid className='w-4 h-4' />
                </button>
              </div>

              <Link href='/dashboard/devices/add'>
                <Button className='gap-2 px-5 py-2.5'>
                  <Plus className='w-4 h-4' />
                  Add Device
                </Button>
              </Link>
            </div>
          </div>

          {/* Search + filters */}
          <DeviceSearch
            initialFilters={filters}
            onChange={(q, f) => {
              setQuery(q);
              setFilters(f);
            }}
          />

          {/* Device list/grid area */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between px-1 text-sm text-white/60 font-medium'>
              <div className='flex items-center gap-2'>
                <span className='text-white font-semibold'>
                  {filtered.length.toLocaleString()}
                </span>
                <span>devices found</span>
              </div>
              <div className='hidden md:flex items-center gap-2 text-white/40'>
                <span>View:</span>
                <span className='text-white/60 uppercase tracking-wider text-xs'>
                  {view}
                </span>
              </div>
            </div>

            {view === "grid" ? (
              <DeviceGrid devices={filtered} />
            ) : (
              <DeviceList devices={filtered} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
