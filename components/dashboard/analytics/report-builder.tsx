"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  BarChart3,
  Table,
  FileSpreadsheet,
  GripVertical,
  Plus,
  Trash2,
  Download,
  Eye,
  LayoutGrid,
  X,
} from "lucide-react";

interface ReportWidget {
  id: string;
  type: "chart" | "summary" | "table" | "metric";
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AVAILABLE_WIDGETS: ReportWidget[] = [
  {
    id: "uptime-chart",
    type: "chart",
    title: "Uptime Chart",
    description: "Line chart showing uptime over time",
    icon: <BarChart3 className='w-5 h-5' />,
  },
  {
    id: "alert-chart",
    type: "chart",
    title: "Alert Distribution",
    description: "Bar chart of alerts by category",
    icon: <BarChart3 className='w-5 h-5' />,
  },
  {
    id: "device-summary",
    type: "summary",
    title: "Device Summary",
    description: "Overview of all connected devices",
    icon: <FileText className='w-5 h-5' />,
  },
  {
    id: "performance-summary",
    type: "summary",
    title: "Performance Summary",
    description: "Key performance indicators",
    icon: <FileText className='w-5 h-5' />,
  },
  {
    id: "events-table",
    type: "table",
    title: "Events Table",
    description: "Detailed event log data",
    icon: <Table className='w-5 h-5' />,
  },
  {
    id: "devices-table",
    type: "table",
    title: "Devices Table",
    description: "Full device inventory list",
    icon: <Table className='w-5 h-5' />,
  },
  {
    id: "kpi-metrics",
    type: "metric",
    title: "KPI Metrics",
    description: "Key metrics overview",
    icon: <FileSpreadsheet className='w-5 h-5' />,
  },
  {
    id: "efficiency-metrics",
    type: "metric",
    title: "Efficiency Score",
    description: "System efficiency breakdown",
    icon: <FileSpreadsheet className='w-5 h-5' />,
  },
];

function WidgetCard({
  widget,
  onAdd,
}: {
  widget: ReportWidget;
  onAdd: () => void;
}) {
  return (
    <motion.div
      draggable
      onDragStart={(e) => {
        (e as unknown as React.DragEvent).dataTransfer.setData(
          "application/json",
          JSON.stringify(widget)
        );
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className='group p-4 rounded-xl bg-[oklch(0.18_0.03_260)] border border-[oklch(0.25_0.05_260)] cursor-grab active:cursor-grabbing transition-all hover:border-primary/50'
    >
      <div className='flex items-start gap-3'>
        <div className='w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0'>
          {widget.icon}
        </div>
        <div className='flex-1 min-w-0'>
          <h4 className='font-medium text-sm'>{widget.title}</h4>
          <p className='text-xs text-muted-foreground mt-0.5 line-clamp-2'>
            {widget.description}
          </p>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={onAdd}
        >
          <Plus className='w-4 h-4' />
        </Button>
      </div>
    </motion.div>
  );
}

function DocumentPreviewItem({
  widget,
  onRemove,
}: {
  widget: ReportWidget;
  onRemove: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[oklch(0.30_0.03_260)]'
    >
      <div className='cursor-grab active:cursor-grabbing text-muted-foreground'>
        <GripVertical className='w-4 h-4' />
      </div>
      <div className='w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center text-primary shrink-0'>
        {widget.icon}
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium truncate'>{widget.title}</p>
        <p className='text-xs text-muted-foreground capitalize'>
          {widget.type}
        </p>
      </div>
      <Button
        variant='ghost'
        size='icon'
        className='h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-400/10'
        onClick={onRemove}
      >
        <Trash2 className='w-3.5 h-3.5' />
      </Button>
    </motion.div>
  );
}

export function ReportBuilder() {
  const [selectedWidgets, setSelectedWidgets] = useState<ReportWidget[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [reportId] = useState(() => Date.now().toString(36).toUpperCase());

  const handleDrop = useCallback((widget: ReportWidget) => {
    setSelectedWidgets((prev) => {
      // Avoid duplicates
      if (prev.some((w) => w.id === widget.id)) {
        return prev;
      }
      return [...prev, { ...widget, id: `${widget.id}-${Date.now()}` }];
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    setSelectedWidgets((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In production, this would trigger actual PDF generation
  };

  return (
    <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold font-serif'>Report Builder</h3>
          <p className='text-sm text-muted-foreground'>
            Drag widgets to build your custom report
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowPreview(!showPreview)}
            disabled={selectedWidgets.length === 0}
          >
            <Eye className='w-4 h-4 mr-2' />
            Preview
          </Button>
          <Button
            size='sm'
            onClick={handleGenerate}
            disabled={selectedWidgets.length === 0 || isGenerating}
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className='w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full'
                />
                Generating...
              </>
            ) : (
              <>
                <Download className='w-4 h-4 mr-2' />
                Generate PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Available Widgets */}
        <div className='lg:col-span-1 space-y-4'>
          <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
            <LayoutGrid className='w-4 h-4' />
            Available Widgets
          </div>
          <div className='grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2'>
            {AVAILABLE_WIDGETS.map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onAdd={() =>
                  handleDrop({ ...widget, id: `${widget.id}-${Date.now()}` })
                }
              />
            ))}
          </div>
        </div>

        {/* Document Preview */}
        <div className='lg:col-span-2'>
          <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4'>
            <FileText className='w-4 h-4' />
            Document Preview
          </div>

          <div
            className={cn(
              "relative min-h-[500px] rounded-xl border-2 border-dashed transition-all",
              isDragOver
                ? "border-primary bg-primary/10"
                : "border-[oklch(0.25_0.05_260)]",
              selectedWidgets.length > 0 &&
                "border-solid bg-[oklch(0.10_0.02_260)]"
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
                handleDrop(JSON.parse(data));
              }
            }}
          >
            {/* Document header */}
            <div className='p-6 border-b border-[oklch(0.20_0.03_260)]'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center'>
                  <FileText className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h4 className='font-semibold'>Analytics Report</h4>
                  <p className='text-xs text-muted-foreground'>
                    Generated on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className='p-6'>
              <AnimatePresence mode='popLayout'>
                {selectedWidgets.length === 0 ? (
                  <motion.div
                    key='empty'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='flex flex-col items-center justify-center py-16 text-muted-foreground'
                  >
                    <div className='w-20 h-20 rounded-full bg-[oklch(0.18_0.03_260)] flex items-center justify-center mb-4'>
                      <LayoutGrid className='w-10 h-10' />
                    </div>
                    <p className='text-sm font-medium'>No widgets added yet</p>
                    <p className='text-xs mt-1'>
                      Drag widgets from the left or click the + button
                    </p>
                  </motion.div>
                ) : (
                  <Reorder.Group
                    axis='y'
                    values={selectedWidgets}
                    onReorder={setSelectedWidgets}
                    className='space-y-3'
                  >
                    {selectedWidgets.map((widget) => (
                      <Reorder.Item key={widget.id} value={widget}>
                        <DocumentPreviewItem
                          widget={widget}
                          onRemove={() => handleRemove(widget.id)}
                        />
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {selectedWidgets.length > 0 && (
              <div className='p-4 border-t border-[oklch(0.20_0.03_260)] bg-[oklch(0.12_0.02_260)]'>
                <div className='flex items-center justify-between text-xs text-muted-foreground'>
                  <span>{selectedWidgets.length} widgets selected</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    onClick={() => setSelectedWidgets([])}
                  >
                    <X className='w-3 h-3 mr-1' />
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedWidgets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8'
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-xl shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              {/* PDF Preview Header */}
              <div className='p-8 border-b border-gray-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h1 className='text-2xl font-bold'>Analytics Report</h1>
                    <p className='text-gray-500'>PavitInfoTech IoT Dashboard</p>
                  </div>
                  <div className='text-right text-sm text-gray-500'>
                    <p>
                      Generated:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p>Report ID: RPT-{reportId}</p>
                  </div>
                </div>
              </div>

              {/* PDF Content */}
              <div className='p-8 space-y-8'>
                {selectedWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className='border border-gray-200 rounded-lg p-6'
                  >
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600'>
                        {widget.icon}
                      </div>
                      <h2 className='text-lg font-semibold'>{widget.title}</h2>
                    </div>
                    <div className='h-32 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400'>
                      {widget.type === "chart" && "[ Chart Visualization ]"}
                      {widget.type === "summary" && "[ Summary Content ]"}
                      {widget.type === "table" && "[ Data Table ]"}
                      {widget.type === "metric" && "[ Metrics Display ]"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Close button */}
              <Button
                variant='ghost'
                size='icon'
                className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                onClick={() => setShowPreview(false)}
              >
                <X className='w-5 h-5' />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
