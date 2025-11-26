"use client";

import { useState } from "react";
import { X, Filter } from "lucide-react";

export default function DeviceSearch({
  onChange,
  initialFilters = [],
}: {
  onChange?: (q: string, filters: string[]) => void;
  initialFilters?: string[];
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>(initialFilters);

  function addFilter(name: string) {
    if (!filters.includes(name)) {
      const next = [...filters, name];
      setFilters(next);
      onChange?.(query, next);
    }
  }

  function removeFilter(name: string) {
    const next = filters.filter((f) => f !== name);
    setFilters(next);
    onChange?.(query, next);
  }

  return (
    <div className='w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col gap-4'>
      {/* Search input */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex-1 focus-within:border-cyan-500/50 focus-within:bg-white/[0.06] transition-all'>
          <Filter className='w-5 h-5 text-white/40 mr-3 flex-shrink-0' />
          <input
            className='w-full bg-transparent outline-none text-sm placeholder:text-white/40 font-medium'
            placeholder='Search devices, IDs, or IPs — use chips to filter'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange?.(e.target.value, filters);
            }}
          />
        </div>
      </div>

      {/* Chips area */}
      <div className='flex items-center gap-2.5 flex-wrap'>
        {filters.length === 0 ? (
          <span className='text-xs text-white/40 font-medium mr-1'>
            Suggested filters:
          </span>
        ) : null}

        {filters.map((f) => (
          <div
            key={f}
            className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs'
          >
            <span className='text-xs font-medium text-cyan-300'>{f}</span>
            <button
              onClick={() => removeFilter(f)}
              className='text-cyan-400/60 hover:text-cyan-300 transition-colors'
            >
              <X className='w-3 h-3' />
            </button>
          </div>
        ))}

        {/* Quick add suggestions */}
        <button
          onClick={() => addFilter("Status: Online")}
          className='text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white/70 transition-all'
        >
          + Status: Online
        </button>
        <button
          onClick={() => addFilter("Location: Zone A")}
          className='text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white/70 transition-all'
        >
          + Location: Zone A
        </button>
        <button
          onClick={() => addFilter("Type: Sensor")}
          className='text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white/70 transition-all'
        >
          + Type: Sensor
        </button>
      </div>
    </div>
  );
}
