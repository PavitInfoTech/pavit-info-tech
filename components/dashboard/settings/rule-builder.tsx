"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Thermometer,
  Droplets,
  Gauge,
  Bell,
  Mail,
  MessageSquare,
  Power,
  Clock,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Trash2,
  GripVertical,
  Play,
  Pause,
  Zap,
  ArrowRight,
  X,
  Save,
  Settings,
  TestTube,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Node types
type NodeType = "sensor" | "condition" | "action";

interface NodeConfig {
  [key: string]: string | number;
}

interface RuleNode {
  id: string;
  type: NodeType;
  category: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  config: NodeConfig;
}

interface Connection {
  id: string;
  fromId: string;
  toId: string;
  active?: boolean;
}

interface NodeTemplate {
  category: string;
  label: string;
  type: NodeType;
  icon: React.ReactNode;
  color: string;
}

const NODE_TEMPLATES: NodeTemplate[] = [
  // Sensors
  {
    category: "temperature",
    label: "Temperature Sensor",
    type: "sensor",
    icon: <Thermometer className='w-5 h-5' />,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    category: "humidity",
    label: "Humidity Sensor",
    type: "sensor",
    icon: <Droplets className='w-5 h-5' />,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    category: "pressure",
    label: "Pressure Sensor",
    type: "sensor",
    icon: <Gauge className='w-5 h-5' />,
    color: "from-purple-500/20 to-pink-500/20",
  },
  // Conditions
  {
    category: "greater_than",
    label: "Greater Than",
    type: "condition",
    icon: <ChevronRight className='w-5 h-5' />,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    category: "less_than",
    label: "Less Than",
    type: "condition",
    icon: <ChevronLeft className='w-5 h-5' />,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    category: "equals",
    label: "Equals",
    type: "condition",
    icon: <MoreHorizontal className='w-5 h-5' />,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    category: "time_window",
    label: "Time Window",
    type: "condition",
    icon: <Clock className='w-5 h-5' />,
    color: "from-green-500/20 to-teal-500/20",
  },
  // Actions
  {
    category: "email_alert",
    label: "Email Alert",
    type: "action",
    icon: <Mail className='w-5 h-5' />,
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    category: "sms_alert",
    label: "SMS Alert",
    type: "action",
    icon: <MessageSquare className='w-5 h-5' />,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    category: "push_notification",
    label: "Push Notification",
    type: "action",
    icon: <Bell className='w-5 h-5' />,
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    category: "device_control",
    label: "Device Control",
    type: "action",
    icon: <Power className='w-5 h-5' />,
    color: "from-red-500/20 to-pink-500/20",
  },
];

function getNodeColor(type: NodeType): string {
  switch (type) {
    case "sensor":
      return "border-cyan-500/50 bg-cyan-500/10";
    case "condition":
      return "border-yellow-500/50 bg-yellow-500/10";
    case "action":
      return "border-emerald-500/50 bg-emerald-500/10";
    default:
      return "border-white/20 bg-white/5";
  }
}

function getNodeGlow(type: NodeType): string {
  switch (type) {
    case "sensor":
      return "shadow-cyan-500/30";
    case "condition":
      return "shadow-yellow-500/30";
    case "action":
      return "shadow-emerald-500/30";
    default:
      return "";
  }
}

// Default configurations for each node category
function getDefaultConfig(category: string): NodeConfig {
  switch (category) {
    case "temperature":
      return { deviceId: "", unit: "celsius", pollInterval: 60 };
    case "humidity":
      return { deviceId: "", unit: "percent", pollInterval: 60 };
    case "pressure":
      return { deviceId: "", unit: "hPa", pollInterval: 120 };
    case "greater_than":
      return { threshold: 75, unit: "" };
    case "less_than":
      return { threshold: 25, unit: "" };
    case "equals":
      return { value: 50, tolerance: 1 };
    case "time_window":
      return { startTime: "09:00", endTime: "17:00", days: "weekdays" };
    case "email_alert":
      return { recipient: "", subject: "IoT Alert", template: "default" };
    case "sms_alert":
      return { phoneNumber: "", message: "Alert triggered" };
    case "push_notification":
      return {
        title: "Alert",
        body: "A condition was triggered",
        priority: "high",
      };
    case "device_control":
      return { targetDevice: "", action: "toggle", value: "" };
    default:
      return {};
  }
}

// Configuration modal component
function NodeConfigModal({
  node,
  onClose,
  onSave,
}: {
  node: RuleNode;
  onClose: () => void;
  onSave: (config: NodeConfig) => void;
}) {
  const [config, setConfig] = useState<NodeConfig>(node.config);

  const handleChange = (key: string, value: string | number) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const renderConfigFields = () => {
    switch (node.category) {
      case "temperature":
      case "humidity":
      case "pressure":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Device ID
              </label>
              <Input
                value={config.deviceId as string}
                onChange={(e) => handleChange("deviceId", e.target.value)}
                placeholder='Enter device ID'
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Poll Interval (seconds)
              </label>
              <Input
                type='number'
                value={config.pollInterval as number}
                onChange={(e) =>
                  handleChange("pollInterval", parseInt(e.target.value) || 60)
                }
                className='bg-white/5 border-white/10'
              />
            </div>
          </>
        );
      case "greater_than":
      case "less_than":
        return (
          <div className='space-y-2'>
            <label className='text-xs font-medium text-muted-foreground'>
              Threshold Value
            </label>
            <Input
              type='number'
              value={config.threshold as number}
              onChange={(e) =>
                handleChange("threshold", parseFloat(e.target.value) || 0)
              }
              className='bg-white/5 border-white/10'
            />
            <p className='text-xs text-muted-foreground'>
              Trigger when value is{" "}
              {node.category === "greater_than" ? "above" : "below"} this
              threshold
            </p>
          </div>
        );
      case "equals":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Target Value
              </label>
              <Input
                type='number'
                value={config.value as number}
                onChange={(e) =>
                  handleChange("value", parseFloat(e.target.value) || 0)
                }
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Tolerance (±)
              </label>
              <Input
                type='number'
                value={config.tolerance as number}
                onChange={(e) =>
                  handleChange("tolerance", parseFloat(e.target.value) || 0)
                }
                className='bg-white/5 border-white/10'
              />
            </div>
          </>
        );
      case "time_window":
        return (
          <>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-xs font-medium text-muted-foreground'>
                  Start Time
                </label>
                <Input
                  type='time'
                  value={config.startTime as string}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className='bg-white/5 border-white/10'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-medium text-muted-foreground'>
                  End Time
                </label>
                <Input
                  type='time'
                  value={config.endTime as string}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className='bg-white/5 border-white/10'
                />
              </div>
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Active Days
              </label>
              <select
                value={config.days as string}
                onChange={(e) => handleChange("days", e.target.value)}
                className='w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm'
              >
                <option value='weekdays'>Weekdays Only</option>
                <option value='weekends'>Weekends Only</option>
                <option value='all'>All Days</option>
              </select>
            </div>
          </>
        );
      case "email_alert":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Recipient Email
              </label>
              <Input
                type='email'
                value={config.recipient as string}
                onChange={(e) => handleChange("recipient", e.target.value)}
                placeholder='email@example.com'
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Subject
              </label>
              <Input
                value={config.subject as string}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder='Alert subject'
                className='bg-white/5 border-white/10'
              />
            </div>
          </>
        );
      case "sms_alert":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Phone Number
              </label>
              <Input
                type='tel'
                value={config.phoneNumber as string}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                placeholder='+1 234 567 8900'
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Message
              </label>
              <Input
                value={config.message as string}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder='Alert message'
                className='bg-white/5 border-white/10'
              />
            </div>
          </>
        );
      case "push_notification":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Notification Title
              </label>
              <Input
                value={config.title as string}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder='Alert title'
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Body
              </label>
              <Input
                value={config.body as string}
                onChange={(e) => handleChange("body", e.target.value)}
                placeholder='Notification body'
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Priority
              </label>
              <select
                value={config.priority as string}
                onChange={(e) => handleChange("priority", e.target.value)}
                className='w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm'
              >
                <option value='low'>Low</option>
                <option value='normal'>Normal</option>
                <option value='high'>High</option>
              </select>
            </div>
          </>
        );
      case "device_control":
        return (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Target Device ID
              </label>
              <Input
                value={config.targetDevice as string}
                onChange={(e) => handleChange("targetDevice", e.target.value)}
                placeholder='Device ID to control'
                className='bg-white/5 border-white/10'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Action
              </label>
              <select
                value={config.action as string}
                onChange={(e) => handleChange("action", e.target.value)}
                className='w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm'
              >
                <option value='toggle'>Toggle On/Off</option>
                <option value='on'>Turn On</option>
                <option value='off'>Turn Off</option>
                <option value='set'>Set Value</option>
              </select>
            </div>
          </>
        );
      default:
        return (
          <p className='text-sm text-muted-foreground'>
            No configuration available
          </p>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className='w-full max-w-md bg-[oklch(0.15_0.03_260)] border border-[oklch(0.25_0.05_260)] rounded-xl shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-4 border-b border-[oklch(0.25_0.05_260)]'>
          <div className='flex items-center gap-3'>
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                node.type === "sensor" && "bg-cyan-500/20 text-cyan-400",
                node.type === "condition" && "bg-yellow-500/20 text-yellow-400",
                node.type === "action" && "bg-emerald-500/20 text-emerald-400"
              )}
            >
              {node.icon}
            </div>
            <div>
              <h3 className='font-semibold'>{node.label}</h3>
              <p className='text-xs text-muted-foreground capitalize'>
                Configure {node.type}
              </p>
            </div>
          </div>
          <Button variant='ghost' size='icon' onClick={onClose}>
            <X className='w-4 h-4' />
          </Button>
        </div>

        <div className='p-4 space-y-4'>{renderConfigFields()}</div>

        <div className='flex items-center justify-end gap-3 p-4 border-t border-[oklch(0.25_0.05_260)]'>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(config);
              onClose();
            }}
          >
            <Save className='w-4 h-4 mr-2' />
            Save Configuration
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DraggableNode({
  node,
  isSelected,
  onSelect,
  onDrag,
  onDelete,
  onConfigure,
  onStartConnection,
  onEndConnection,
}: {
  node: RuleNode;
  isSelected: boolean;
  onSelect: () => void;
  onDrag: (x: number, y: number) => void;
  onDelete: () => void;
  onConfigure: () => void;
  onStartConnection: () => void;
  onEndConnection: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".connection-handle")) return;
    if ((e.target as HTMLElement).closest(".config-button")) return;
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfigure();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = nodeRef.current?.parentElement;
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - dragOffset.current.x;
      const y = e.clientY - canvasRect.top - dragOffset.current.y;
      onDrag(
        Math.max(0, Math.min(x, canvasRect.width - 180)),
        Math.max(0, Math.min(y, canvasRect.height - 80))
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onDrag]);

  return (
    <motion.div
      ref={nodeRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className={cn(
        "absolute w-44 rounded-xl border-2 p-3 cursor-move transition-shadow",
        getNodeColor(node.type),
        isSelected &&
          `ring-2 ring-white/50 shadow-lg ${getNodeGlow(node.type)}`,
        isDragging && "z-50"
      )}
      style={{ left: node.x, top: node.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {/* Input handle (left) */}
      {node.type !== "sensor" && (
        <div
          className='connection-handle absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 border-2 border-white/40 cursor-crosshair hover:bg-white/40 transition-colors flex items-center justify-center'
          onMouseUp={onEndConnection}
        >
          <div className='w-2 h-2 rounded-full bg-white/60' />
        </div>
      )}

      {/* Content */}
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center'>
          {node.icon}
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-xs font-medium truncate'>{node.label}</p>
          <p className='text-[10px] text-muted-foreground capitalize'>
            {node.type}
          </p>
        </div>
      </div>

      {/* Config indicator */}
      {Object.keys(node.config).some(
        (k) => node.config[k] !== "" && node.config[k] !== 0
      ) && (
        <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-[9px] text-emerald-400'>
          configured
        </div>
      )}

      {/* Output handle (right) */}
      {node.type !== "action" && (
        <div
          className='connection-handle absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 border-2 border-white/40 cursor-crosshair hover:bg-white/40 transition-colors flex items-center justify-center'
          onMouseDown={(e) => {
            e.stopPropagation();
            onStartConnection();
          }}
        >
          <ArrowRight className='w-2.5 h-2.5 text-white/60' />
        </div>
      )}

      {/* Action buttons when selected */}
      {isSelected && (
        <>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='config-button absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/80 hover:bg-primary text-white flex items-center justify-center'
            onClick={(e) => {
              e.stopPropagation();
              onConfigure();
            }}
          >
            <Settings className='w-3 h-3' />
          </motion.button>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center'
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className='w-3 h-3' />
          </motion.button>
        </>
      )}
    </motion.div>
  );
}

function ConnectionLine({
  from,
  to,
  active,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active?: boolean;
}) {
  const path = `M ${from.x} ${from.y} C ${from.x + 80} ${from.y}, ${
    to.x - 80
  } ${to.y}, ${to.x} ${to.y}`;

  return (
    <g>
      {/* Glow effect when active */}
      {active && (
        <motion.path
          d={path}
          fill='none'
          stroke='url(#activeGlow)'
          strokeWidth='8'
          strokeLinecap='round'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {/* Main line */}
      <motion.path
        d={path}
        fill='none'
        stroke={active ? "url(#activeGradient)" : "url(#inactiveGradient)"}
        strokeWidth='3'
        strokeLinecap='round'
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Animated pulse when active */}
      {active && (
        <motion.circle
          r='4'
          fill='#22d3ee'
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath: `path("${path}")`,
          }}
        />
      )}
    </g>
  );
}

function NodePalette({
  onAddNode,
}: {
  onAddNode: (template: NodeTemplate) => void;
}) {
  const [activeTab, setActiveTab] = useState<NodeType>("sensor");

  const filteredTemplates = NODE_TEMPLATES.filter((t) => t.type === activeTab);

  return (
    <div className='w-64 shrink-0 space-y-4'>
      <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
        Drag to Canvas
      </p>

      {/* Tabs */}
      <div className='flex gap-1 p-1 bg-white/5 rounded-lg'>
        {(["sensor", "condition", "action"] as NodeType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={cn(
              "flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors capitalize",
              activeTab === type
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white/80"
            )}
          >
            {type}s
          </button>
        ))}
      </div>

      {/* Templates */}
      <div className='space-y-2 max-h-[400px] overflow-y-auto pr-2'>
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.category}
            draggable
            onDragEnd={() => onAddNode(template)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-grab active:cursor-grabbing bg-linear-to-r",
              template.color
            )}
          >
            <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center'>
              {template.icon}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium'>{template.label}</p>
              <p className='text-xs text-muted-foreground capitalize'>
                {template.type}
              </p>
            </div>
            <GripVertical className='w-4 h-4 text-white/30' />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RuleBuilder() {
  const [nodes, setNodes] = useState<RuleNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [configNode, setConfigNode] = useState<RuleNode | null>(null);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = useCallback((template: NodeTemplate) => {
    const newNode: RuleNode = {
      id: `node-${Date.now()}`,
      type: template.type,
      category: template.category,
      label: template.label,
      icon: template.icon,
      x: 150 + Math.random() * 200,
      y: 100 + Math.random() * 150,
      config: getDefaultConfig(template.category),
    };
    setNodes((prev) => [...prev, newNode]);
  }, []);

  const updateNodePosition = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)));
  }, []);

  const updateNodeConfig = useCallback((id: string, config: NodeConfig) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, config } : n)));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setConnections((prev) =>
      prev.filter((c) => c.fromId !== id && c.toId !== id)
    );
    setSelectedNodeId(null);
  }, []);

  const startConnection = useCallback((fromId: string) => {
    setConnectingFrom(fromId);
  }, []);

  const testRule = useCallback(() => {
    // Simulate rule testing
    const hasSensor = nodes.some((n) => n.type === "sensor");
    const hasCondition = nodes.some((n) => n.type === "condition");
    const hasAction = nodes.some((n) => n.type === "action");
    const hasConnections = connections.length > 0;

    if (!hasSensor) {
      setTestResult({
        success: false,
        message: "Missing sensor node. Add at least one sensor.",
      });
    } else if (!hasCondition) {
      setTestResult({
        success: false,
        message: "Missing condition node. Add a condition to evaluate.",
      });
    } else if (!hasAction) {
      setTestResult({
        success: false,
        message: "Missing action node. Add an action to trigger.",
      });
    } else if (!hasConnections) {
      setTestResult({
        success: false,
        message: "No connections found. Connect nodes to create a flow.",
      });
    } else {
      setTestResult({
        success: true,
        message: "Rule validated successfully! All components are connected.",
      });
    }

    // Auto-hide after 5 seconds
    setTimeout(() => setTestResult(null), 5000);
  }, [nodes, connections]);

  const endConnection = useCallback(
    (toId: string) => {
      if (connectingFrom && connectingFrom !== toId) {
        // Check if connection already exists
        const exists = connections.some(
          (c) => c.fromId === connectingFrom && c.toId === toId
        );
        if (!exists) {
          setConnections((prev) => [
            ...prev,
            {
              id: `conn-${Date.now()}`,
              fromId: connectingFrom,
              toId,
              active: isActive,
            },
          ]);
        }
      }
      setConnectingFrom(null);
    },
    [connectingFrom, connections, isActive]
  );

  const getNodeCenter = useCallback(
    (nodeId: string, side: "left" | "right") => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return { x: 0, y: 0 };
      return {
        x: node.x + (side === "left" ? 0 : 176),
        y: node.y + 40,
      };
    },
    [nodes]
  );

  return (
    <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold font-serif'>Rule Builder</h3>
          <p className='text-sm text-muted-foreground'>
            Create automation rules by connecting nodes
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button
            variant={isActive ? "default" : "outline"}
            size='sm'
            onClick={() => {
              setIsActive(!isActive);
              setConnections((prev) =>
                prev.map((c) => ({ ...c, active: !isActive }))
              );
            }}
          >
            {isActive ? (
              <>
                <Pause className='w-4 h-4 mr-2' />
                Active
              </>
            ) : (
              <>
                <Play className='w-4 h-4 mr-2' />
                Inactive
              </>
            )}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={testRule}
            disabled={nodes.length === 0}
          >
            <TestTube className='w-4 h-4 mr-2' />
            Test
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setNodes([]);
              setConnections([]);
            }}
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Clear
          </Button>
        </div>
      </div>

      {/* Test Result Banner */}
      <AnimatePresence>
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "mb-4 p-3 rounded-lg flex items-center gap-3",
              testResult.success
                ? "bg-emerald-500/20 border border-emerald-500/30"
                : "bg-red-500/20 border border-red-500/30"
            )}
          >
            {testResult.success ? (
              <CheckCircle2 className='w-5 h-5 text-emerald-400' />
            ) : (
              <AlertCircle className='w-5 h-5 text-red-400' />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                testResult.success ? "text-emerald-400" : "text-red-400"
              )}
            >
              {testResult.message}
            </span>
            <button
              onClick={() => setTestResult(null)}
              className='ml-auto text-white/50 hover:text-white/80'
            >
              <X className='w-4 h-4' />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex gap-6'>
        {/* Node Palette */}
        <NodePalette onAddNode={addNode} />

        {/* Canvas */}
        <div
          ref={canvasRef}
          className='flex-1 relative h-[500px] rounded-xl border-2 border-dashed border-[oklch(0.25_0.05_260)] bg-[oklch(0.10_0.02_260)] overflow-hidden'
          onClick={() => setSelectedNodeId(null)}
        >
          {/* Grid pattern */}
          <svg className='absolute inset-0 w-full h-full pointer-events-none opacity-30'>
            <defs>
              <pattern
                id='grid'
                width='20'
                height='20'
                patternUnits='userSpaceOnUse'
              >
                <path
                  d='M 20 0 L 0 0 0 20'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='0.5'
                  className='text-white/10'
                />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>

          {/* Connections SVG */}
          <svg className='absolute inset-0 w-full h-full pointer-events-none'>
            <defs>
              <linearGradient
                id='activeGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#22d3ee' />
                <stop offset='100%' stopColor='#10b981' />
              </linearGradient>
              <linearGradient
                id='inactiveGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#525252' />
                <stop offset='100%' stopColor='#404040' />
              </linearGradient>
              <linearGradient id='activeGlow' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#22d3ee' stopOpacity='0.5' />
                <stop offset='100%' stopColor='#10b981' stopOpacity='0.5' />
              </linearGradient>
            </defs>
            {connections.map((conn) => (
              <ConnectionLine
                key={conn.id}
                from={getNodeCenter(conn.fromId, "right")}
                to={getNodeCenter(conn.toId, "left")}
                active={conn.active}
              />
            ))}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node) => (
              <DraggableNode
                key={node.id}
                node={node}
                isSelected={selectedNodeId === node.id}
                onSelect={() => setSelectedNodeId(node.id)}
                onDrag={(x, y) => updateNodePosition(node.id, x, y)}
                onDelete={() => deleteNode(node.id)}
                onConfigure={() => setConfigNode(node)}
                onStartConnection={() => startConnection(node.id)}
                onEndConnection={() => endConnection(node.id)}
              />
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {nodes.length === 0 && (
            <div className='absolute inset-0 flex flex-col items-center justify-center text-muted-foreground'>
              <div className='w-20 h-20 rounded-full bg-[oklch(0.18_0.03_260)] flex items-center justify-center mb-4'>
                <Zap className='w-10 h-10' />
              </div>
              <p className='text-sm font-medium'>No rules created yet</p>
              <p className='text-xs mt-1'>
                Drag nodes from the palette to create automation rules
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rule summary */}
      {nodes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-6 p-4 rounded-lg bg-white/5 border border-white/10'
        >
          <div className='flex items-center gap-2 text-sm'>
            <Zap
              className={cn(
                "w-4 h-4",
                isActive ? "text-emerald-400" : "text-muted-foreground"
              )}
            />
            <span className='font-medium'>Rule Summary:</span>
            <span className='text-muted-foreground'>
              {nodes.filter((n) => n.type === "sensor").length} sensors →{" "}
              {nodes.filter((n) => n.type === "condition").length} conditions →{" "}
              {nodes.filter((n) => n.type === "action").length} actions
            </span>
            <span
              className={cn(
                "ml-auto px-2 py-0.5 rounded-full text-xs font-medium",
                isActive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-white/10 text-white/50"
              )}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Configuration Modal */}
      <AnimatePresence>
        {configNode && (
          <NodeConfigModal
            node={configNode}
            onClose={() => setConfigNode(null)}
            onSave={(config) => updateNodeConfig(configNode.id, config)}
          />
        )}
      </AnimatePresence>
    </Card>
  );
}
