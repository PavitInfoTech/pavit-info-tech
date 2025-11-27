"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  Calendar,
  Cpu,
  TrendingUp,
  TrendingDown,
  Minus,
  GripVertical,
  X,
} from "lucide-react";

interface ComparisonItem {
  id: string;
  name: string;
  type: "device" | "period";
  icon?: React.ReactNode;
  data: {
    uptime: number;
    alerts: number;
    dataPoints: number;
    avgResponseTime: number;
    efficiency: number;
  };
}

interface ComparisonEngineProps {
  devices: ComparisonItem[];
  periods: ComparisonItem[];
}

function DifferenceIndicator({
  value,
  suffix = "",
  inverse = false,
}: {
  value: number;
  suffix?: string;
  inverse?: boolean;
}) {
  const isPositive = inverse ? value < 0 : value > 0;
  const isNegative = inverse ? value > 0 : value < 0;

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm font-mono",
        isPositive && "text-emerald-400",
        isNegative && "text-red-400",
        !isPositive && !isNegative && "text-muted-foreground"
      )}
    >
      {isPositive ? (
        <TrendingUp className='w-4 h-4' />
      ) : isNegative ? (
        <TrendingDown className='w-4 h-4' />
      ) : (
        <Minus className='w-4 h-4' />
      )}
      <span>
        {value > 0 ? "+" : ""}
        {value.toFixed(1)}
        {suffix}
      </span>
    </div>
  );
}

function DroppableSlot({
  item,
  onDrop,
  onRemove,
  placeholder,
  side,
}: {
  item: ComparisonItem | null;
  onDrop: (item: ComparisonItem) => void;
  onRemove: () => void;
  placeholder: string;
  side: "left" | "right";
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className={cn(
        "relative flex-1 min-h-[200px] rounded-xl border-2 border-dashed transition-all",
        isDragOver
          ? "border-primary bg-primary/10"
          : "border-[oklch(0.25_0.05_260)]",
        item && "border-solid bg-[oklch(0.15_0.03_260)]"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const data = e.dataTransfer.getData("application/json");
        if (data) {
          onDrop(JSON.parse(data));
        }
      }}
    >
      <AnimatePresence mode='wait'>
        {item ? (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className='p-6 h-full'
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center'>
                  {item.type === "device" ? (
                    <Cpu className='w-5 h-5 text-primary' />
                  ) : (
                    <Calendar className='w-5 h-5 text-primary' />
                  )}
                </div>
                <div>
                  <h4 className='font-semibold'>{item.name}</h4>
                  <p className='text-xs text-muted-foreground capitalize'>
                    {item.type}
                  </p>
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={onRemove}
              >
                <X className='w-4 h-4' />
              </Button>
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between items-center py-2 border-b border-[oklch(0.25_0.05_260)]'>
                <span className='text-sm text-muted-foreground'>Uptime</span>
                <span className='font-mono font-semibold'>
                  {item.data.uptime}%
                </span>
              </div>
              <div className='flex justify-between items-center py-2 border-b border-[oklch(0.25_0.05_260)]'>
                <span className='text-sm text-muted-foreground'>Alerts</span>
                <span className='font-mono font-semibold'>
                  {item.data.alerts}
                </span>
              </div>
              <div className='flex justify-between items-center py-2 border-b border-[oklch(0.25_0.05_260)]'>
                <span className='text-sm text-muted-foreground'>
                  Data Points
                </span>
                <span className='font-mono font-semibold'>
                  {item.data.dataPoints.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between items-center py-2 border-b border-[oklch(0.25_0.05_260)]'>
                <span className='text-sm text-muted-foreground'>
                  Avg Response
                </span>
                <span className='font-mono font-semibold'>
                  {item.data.avgResponseTime}ms
                </span>
              </div>
              <div className='flex justify-between items-center py-2'>
                <span className='text-sm text-muted-foreground'>
                  Efficiency
                </span>
                <span className='font-mono font-semibold'>
                  {item.data.efficiency}%
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='placeholder'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 flex flex-col items-center justify-center text-muted-foreground'
          >
            <div className='w-16 h-16 rounded-full bg-[oklch(0.20_0.03_260)] flex items-center justify-center mb-4'>
              {side === "left" ? (
                <Cpu className='w-8 h-8' />
              ) : (
                <ArrowLeftRight className='w-8 h-8' />
              )}
            </div>
            <p className='text-sm'>{placeholder}</p>
            <p className='text-xs mt-1'>Drag and drop here</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DraggableItem({ item }: { item: ComparisonItem }) {
  return (
    <motion.div
      draggable
      onDragStart={(e) => {
        (e as unknown as React.DragEvent).dataTransfer.setData(
          "application/json",
          JSON.stringify(item)
        );
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className='flex items-center gap-3 p-3 rounded-lg bg-[oklch(0.18_0.03_260)] border border-[oklch(0.25_0.05_260)] cursor-grab active:cursor-grabbing'
    >
      <GripVertical className='w-4 h-4 text-muted-foreground' />
      <div className='w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center'>
        {item.type === "device" ? (
          <Cpu className='w-4 h-4 text-primary' />
        ) : (
          <Calendar className='w-4 h-4 text-primary' />
        )}
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium truncate'>{item.name}</p>
        <p className='text-xs text-muted-foreground capitalize'>{item.type}</p>
      </div>
    </motion.div>
  );
}

export function ComparisonEngine({ devices, periods }: ComparisonEngineProps) {
  const [leftItem, setLeftItem] = useState<ComparisonItem | null>(null);
  const [rightItem, setRightItem] = useState<ComparisonItem | null>(null);
  const [activeTab, setActiveTab] = useState<"devices" | "periods">("devices");

  const differences = useMemo(() => {
    if (!leftItem || !rightItem) return null;

    return {
      uptime: rightItem.data.uptime - leftItem.data.uptime,
      alerts: rightItem.data.alerts - leftItem.data.alerts,
      dataPoints: rightItem.data.dataPoints - leftItem.data.dataPoints,
      avgResponseTime:
        rightItem.data.avgResponseTime - leftItem.data.avgResponseTime,
      efficiency: rightItem.data.efficiency - leftItem.data.efficiency,
    };
  }, [leftItem, rightItem]);

  const availableItems = activeTab === "devices" ? devices : periods;

  return (
    <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold font-serif'>
            Comparison Engine
          </h3>
          <p className='text-sm text-muted-foreground'>
            Drag items to compare side-by-side
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant={activeTab === "devices" ? "default" : "ghost"}
            size='sm'
            onClick={() => setActiveTab("devices")}
          >
            <Cpu className='w-4 h-4 mr-2' />
            Devices
          </Button>
          <Button
            variant={activeTab === "periods" ? "default" : "ghost"}
            size='sm'
            onClick={() => setActiveTab("periods")}
          >
            <Calendar className='w-4 h-4 mr-2' />
            Time Periods
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Item picker */}
        <div className='lg:col-span-1 space-y-3 max-h-[400px] overflow-y-auto pr-2'>
          <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2'>
            Available {activeTab}
          </p>
          {availableItems.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>

        {/* Comparison area */}
        <div className='lg:col-span-3'>
          <div className='flex gap-4 items-stretch'>
            <DroppableSlot
              item={leftItem}
              onDrop={setLeftItem}
              onRemove={() => setLeftItem(null)}
              placeholder='Drop first item'
              side='left'
            />

            {/* Center divider with differences */}
            <div className='flex flex-col items-center justify-center w-32 shrink-0'>
              <div className='w-10 h-10 rounded-full bg-[oklch(0.20_0.03_260)] border border-[oklch(0.30_0.05_260)] flex items-center justify-center mb-4'>
                <ArrowLeftRight className='w-5 h-5 text-primary' />
              </div>

              {differences && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='space-y-2 text-center'
                >
                  <div className='py-1'>
                    <p className='text-xs text-muted-foreground'>Uptime</p>
                    <DifferenceIndicator
                      value={differences.uptime}
                      suffix='%'
                    />
                  </div>
                  <div className='py-1'>
                    <p className='text-xs text-muted-foreground'>Alerts</p>
                    <DifferenceIndicator value={differences.alerts} inverse />
                  </div>
                  <div className='py-1'>
                    <p className='text-xs text-muted-foreground'>Response</p>
                    <DifferenceIndicator
                      value={differences.avgResponseTime}
                      suffix='ms'
                      inverse
                    />
                  </div>
                  <div className='py-1'>
                    <p className='text-xs text-muted-foreground'>Efficiency</p>
                    <DifferenceIndicator
                      value={differences.efficiency}
                      suffix='%'
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <DroppableSlot
              item={rightItem}
              onDrop={setRightItem}
              onRemove={() => setRightItem(null)}
              placeholder='Drop second item'
              side='right'
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
