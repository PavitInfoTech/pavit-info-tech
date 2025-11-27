"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeatmapData {
  date: string;
  value: number;
  label?: string;
}

interface HeatmapCalendarProps {
  data: HeatmapData[];
  title: string;
  metric: "uptime" | "alerts";
  year?: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeeksInYear(year: number): Date[][] {
  const weeks: Date[][] = [];
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);

  // Start from the first Sunday of or before Jan 1
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const currentDate = new Date(startDate);

  while (currentDate <= lastDay || weeks.length < 53) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
    if (currentDate > lastDay && weeks.length >= 52) break;
  }

  return weeks;
}

function getColorForValue(
  value: number,
  max: number,
  metric: "uptime" | "alerts"
): string {
  if (value === 0) return "bg-[oklch(0.15_0.02_260)]";

  const normalized = Math.min(value / max, 1);

  if (metric === "uptime") {
    // For uptime: higher is better (blue -> cyan -> white)
    if (normalized < 0.25) return "bg-[oklch(0.30_0.15_240)]";
    if (normalized < 0.5) return "bg-[oklch(0.45_0.18_230)]";
    if (normalized < 0.75) return "bg-[oklch(0.60_0.20_220)]";
    if (normalized < 0.9) return "bg-[oklch(0.75_0.15_200)]";
    return "bg-[oklch(0.90_0.05_200)]";
  } else {
    // For alerts: lower is better (inverted scale)
    if (normalized < 0.1) return "bg-[oklch(0.30_0.15_240)]";
    if (normalized < 0.25) return "bg-[oklch(0.45_0.18_230)]";
    if (normalized < 0.5) return "bg-[oklch(0.60_0.18_50)]";
    if (normalized < 0.75) return "bg-[oklch(0.65_0.20_30)]";
    return "bg-[oklch(0.60_0.22_25)]";
  }
}

export function HeatmapCalendar({
  data,
  title,
  metric,
  year = new Date().getFullYear(),
}: HeatmapCalendarProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const { weeks, dataMap, maxValue, monthPositions } = useMemo(() => {
    const weeks = getWeeksInYear(year);
    const dataMap = new Map(data.map((d) => [d.date, d]));
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    // Calculate month label positions
    const positions: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week.find((d) => d.getFullYear() === year);
      if (firstDayOfWeek) {
        const month = firstDayOfWeek.getMonth();
        if (month !== lastMonth) {
          positions.push({ month: MONTHS[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return { weeks, dataMap, maxValue, monthPositions: positions };
  }, [data, year]);

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold font-serif'>{title}</h3>
          <p className='text-sm text-muted-foreground'>
            {metric === "uptime" ? "Daily uptime percentage" : "Alerts per day"}
          </p>
        </div>
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <span>Less</span>
          <div className='flex gap-0.5'>
            <div className='w-3 h-3 rounded-sm bg-[oklch(0.15_0.02_260)]' />
            <div className='w-3 h-3 rounded-sm bg-[oklch(0.30_0.15_240)]' />
            <div className='w-3 h-3 rounded-sm bg-[oklch(0.45_0.18_230)]' />
            <div className='w-3 h-3 rounded-sm bg-[oklch(0.60_0.20_220)]' />
            <div className='w-3 h-3 rounded-sm bg-[oklch(0.75_0.15_200)]' />
            <div className='w-3 h-3 rounded-sm bg-[oklch(0.90_0.05_200)]' />
          </div>
          <span>More</span>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[800px]'>
          {/* Month labels */}
          <div className='flex mb-2 pl-8'>
            {monthPositions.map(({ month, weekIndex }, i) => (
              <div
                key={`${month}-${i}`}
                className='text-xs text-muted-foreground'
                style={{
                  marginLeft: i === 0 ? weekIndex * 14 : undefined,
                  width:
                    i < monthPositions.length - 1
                      ? (monthPositions[i + 1].weekIndex - weekIndex) * 14
                      : undefined,
                }}
              >
                {month}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className='flex gap-1'>
            {/* Day labels */}
            <div className='flex flex-col gap-0.5 pr-2'>
              {DAYS.map((day, i) => (
                <div
                  key={day}
                  className={cn(
                    "text-xs text-muted-foreground h-3 flex items-center",
                    i % 2 === 0 ? "opacity-100" : "opacity-0"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className='flex gap-0.5'>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className='flex flex-col gap-0.5'>
                  {week.map((date) => {
                    const dateStr = formatDate(date);
                    const cellData = dataMap.get(dateStr);
                    const value = cellData?.value ?? 0;
                    const isCurrentYear = date.getFullYear() === year;

                    return (
                      <motion.div
                        key={dateStr}
                        className={cn(
                          "w-3 h-3 rounded-sm cursor-pointer transition-all",
                          isCurrentYear
                            ? getColorForValue(value, maxValue, metric)
                            : "bg-transparent",
                          hoveredCell?.date === dateStr &&
                            "ring-2 ring-white/50"
                        )}
                        whileHover={{ scale: 1.3 }}
                        onMouseEnter={(e) => {
                          if (isCurrentYear) {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setHoveredCell({
                              date: dateStr,
                              value,
                              x: rect.left,
                              y: rect.top,
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className='fixed z-50 px-3 py-2 text-xs bg-[oklch(0.20_0.03_260)] border border-[oklch(0.30_0.05_260)] rounded-lg shadow-xl pointer-events-none'
          style={{
            left: hoveredCell.x,
            top: hoveredCell.y - 50,
          }}
        >
          <div className='font-semibold'>
            {new Date(hoveredCell.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className='text-muted-foreground'>
            {metric === "uptime"
              ? `${hoveredCell.value}% uptime`
              : `${hoveredCell.value} alerts`}
          </div>
        </motion.div>
      )}
    </Card>
  );
}
