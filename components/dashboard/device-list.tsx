"use client";

import { useState, useMemo } from "react";
import { ConnectionStrength } from "@/components/ui/connection-strength";
import { ProgressRing } from "@/components/ui/progress-ring";

interface Device {
  id: string;
  name: string;
  type: string;
  ip?: string;
  status: "online" | "offline" | "warn";
  battery?: number; // 0-100
  signal?: number; // 0-4
  lastSeen?: string;
}

export default function DeviceList({ devices }: { devices: Device[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((s) => {
      const c = new Set(s);
      if (c.has(id)) c.delete(id);
      else c.add(id);
      return c;
    });
  };

  const rows = useMemo(() => devices, [devices]);

  return (
    <div className='w-full overflow-auto rounded-2xl bg-white/[0.02] border border-white/10'>
      {/* Table header */}
      <div className='w-full text-xs font-mono text-white/40 uppercase tracking-wider px-5 py-4 border-b border-white/10 hidden md:flex items-center bg-white/[0.02]'>
        <div className='w-10' />
        <div className='w-20'>ID</div>
        <div className='flex-1 min-w-[180px]'>Name / IP</div>
        <div className='w-44'>Type</div>
        <div className='w-28'>Signal</div>
        <div className='w-24'>Battery</div>
        <div className='w-32'>Last Seen</div>
        <div className='w-36' />
      </div>

      {/* Table rows */}
      <div className='divide-y divide-white/5'>
        {rows.map((row, i) => (
          <div
            key={row.id}
            className={`flex items-center px-5 py-4 text-sm transition-colors hover:bg-white/[0.03] ${
              i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
            }`}
          >
            <div className='w-10 flex items-center justify-center'>
              <input
                type='checkbox'
                checked={selected.has(row.id)}
                onChange={() => toggle(row.id)}
                className='w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50'
              />
            </div>
            <div className='w-20 font-mono text-xs text-white/50'>
              #{row.id}
            </div>
            <div className='flex-1 min-w-[180px] pr-6'>
              <div className='text-sm font-medium text-white/90'>
                {row.name}
              </div>
              <div className='text-xs text-white/40 font-mono mt-0.5'>
                {row.ip ?? "—"}
              </div>
            </div>
            <div className='w-44 text-sm text-white/60'>{row.type}</div>
            <div className='w-28'>
              <ConnectionStrength level={row.signal ?? 0} size={20} />
            </div>
            <div className='w-24'>
              <ProgressRing value={row.battery ?? 0} size={40} stroke={3} />
            </div>
            <div className='w-32 text-xs text-white/40 font-mono'>
              {row.lastSeen}
            </div>
            <div className='w-36 flex justify-end gap-2'>
              <a
                href={`/dashboard/devices/${row.id}`}
                className='px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-cyan-400/15 text-white/80 hover:text-white transition-colors'
              >
                Details
              </a>
              <button className='px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 transition-colors'>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
