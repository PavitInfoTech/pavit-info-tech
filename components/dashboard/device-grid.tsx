"use client";

import Link from "next/link";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ConnectionStrength } from "@/components/ui/connection-strength";

interface Device {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline" | "warn";
  battery?: number;
  signal?: number;
  lastSeen?: string;
}

export default function DeviceGrid({ devices }: { devices: Device[] }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
      {devices.map((d) => (
        <div
          key={d.id}
          className='rounded-2xl p-5 bg-white/[0.03] border border-white/10 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/15 hover:shadow-xl hover:shadow-black/20 group'
        >
          {/* Header with avatar and status */}
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20'>
                {d.name
                  .split("-")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className='min-w-0'>
                <div className='text-sm font-semibold truncate'>{d.name}</div>
                <div className='text-xs text-white/40 font-mono truncate'>
                  #{d.id} • {d.type}
                </div>
              </div>
            </div>
            <div
              className={`w-2.5 h-2.5 rounded-full mt-1 ${
                d.status === "online"
                  ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  : d.status === "warn"
                  ? "bg-amber-400 shadow-lg shadow-amber-400/50"
                  : "bg-white/20"
              }`}
            />
          </div>

          {/* Stats row */}
          <div className='flex items-center justify-between mb-4 py-3 px-3 rounded-xl bg-white/[0.02] border border-white/5'>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col items-center'>
                <ConnectionStrength level={d.signal ?? 0} size={18} />
                <span className='text-[10px] text-white/30 mt-1'>Signal</span>
              </div>
              <div className='flex flex-col items-center'>
                <ProgressRing value={d.battery ?? 10} size={38} stroke={3} />
              </div>
            </div>
            <div className='text-right'>
              <div className='text-xs text-white/50'>{d.lastSeen}</div>
              <div className='text-[10px] text-white/30'>Last seen</div>
            </div>
          </div>

          {/* Mini health bar */}
          <div className='w-full h-1.5 rounded-full bg-white/5 mb-5 relative overflow-hidden'>
            <div
              className='absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500'
              style={{
                width: `${((d.signal ?? 0) / 4) * 100}%`,
                transition: "width 300ms ease-out",
              }}
            />
          </div>

          {/* Actions */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <button className='px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-400/15 text-xs font-medium transition-colors'>
                Reboot
              </button>
              <button className='px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium transition-colors'>
                Logs
              </button>
            </div>
            <Link
              href={`/dashboard/devices/${d.id}`}
              className='text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5 transform duration-200'
            >
              Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
