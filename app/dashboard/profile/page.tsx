"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Building2,
  Phone,
  Camera,
  Shield,
  Key,
  Smartphone,
  Crown,
  Sparkles,
  Check,
  AlertTriangle,
  CreditCard,
  Zap,
  ChevronRight,
  Trash2,
  X,
  Eye,
  EyeOff,
  Laptop,
  TabletSmartphone,
  Monitor,
  MoreVertical,
  LogOut,
} from "lucide-react";

// Profile Avatar with upload capability
function ProfileAvatar({
  initials,
  onUpload,
}: {
  initials: string;
  onUpload?: () => void;
}) {
  return (
    <div className='relative group'>
      {/* Outer glow ring */}
      <div className='absolute -inset-2 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-50 blur-lg group-hover:opacity-75 transition-opacity' />

      {/* Avatar container */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className='relative w-28 h-28 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'
      >
        <span className='text-3xl font-bold'>{initials}</span>

        {/* Status ring */}
        <div className='absolute inset-0 rounded-full border-4 border-emerald-500/50' />

        {/* Upload overlay */}
        <motion.button
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          onClick={onUpload}
          className='absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
        >
          <Camera className='w-6 h-6' />
        </motion.button>

        {/* Online indicator */}
        <div className='absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[oklch(0.13_0.03_260)]' />
      </motion.div>
    </div>
  );
}

// Animated input field
function FormField({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='space-y-2'
    >
      <label className='flex items-center gap-2 text-sm font-medium text-white/70'>
        <Icon className='w-4 h-4' />
        {label}
      </label>
      <div className='relative'>
        <Input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "bg-white/5 border-[oklch(0.25_0.05_260)] h-12 pl-4 transition-all",
            isFocused && "border-blue-500/50 ring-2 ring-blue-500/20"
          )}
        />
        {isFocused && (
          <motion.div
            layoutId='inputFocus'
            className='absolute inset-0 rounded-lg border-2 border-blue-500/50 pointer-events-none'
          />
        )}
      </div>
    </motion.div>
  );
}

// Password Input with visibility toggle
function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-white/70'>{label}</label>
      <div className='relative'>
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='bg-white/5 border-[oklch(0.25_0.05_260)] h-11 pr-10'
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors'
        >
          {showPassword ? (
            <EyeOff className='w-4 h-4' />
          ) : (
            <Eye className='w-4 h-4' />
          )}
        </button>
      </div>
    </div>
  );
}

// Password Strength Indicator
function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  if (!password) return null;

  return (
    <div className='space-y-2'>
      <div className='flex gap-1'>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < strength ? colors[strength - 1] : "bg-white/10"
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-xs",
          strength <= 2 ? "text-red-400" : "text-emerald-400"
        )}
      >
        Password strength: {labels[strength - 1] || "Very Weak"}
      </p>
    </div>
  );
}

// Change Password Modal
function ChangePasswordModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsChanging(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsChanging(false);
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className='bg-[oklch(0.15_0.03_260)] border border-[oklch(0.25_0.05_260)] rounded-xl p-6 w-full max-w-md shadow-2xl'
      >
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center'>
            <Key className='w-5 h-5 text-purple-400' />
          </div>
          <div>
            <h3 className='font-semibold'>Change Password</h3>
            <p className='text-sm text-muted-foreground'>
              Update your account password
            </p>
          </div>
          <button
            onClick={onClose}
            className='ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        <div className='space-y-4'>
          <PasswordInput
            label='Current Password'
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder='Enter current password'
          />

          <PasswordInput
            label='New Password'
            value={newPassword}
            onChange={(v) => {
              setNewPassword(v);
              setError("");
            }}
            placeholder='Enter new password'
          />

          <PasswordStrength password={newPassword} />

          <PasswordInput
            label='Confirm New Password'
            value={confirmPassword}
            onChange={(v) => {
              setConfirmPassword(v);
              setError("");
            }}
            placeholder='Confirm new password'
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-sm text-red-400 flex items-center gap-2'
            >
              <AlertTriangle className='w-4 h-4' />
              {error}
            </motion.p>
          )}
        </div>

        <div className='flex gap-3 mt-6'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button
            className='flex-1'
            onClick={handleSubmit}
            disabled={
              isChanging || !currentPassword || !newPassword || !confirmPassword
            }
          >
            {isChanging ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Sparkles className='w-4 h-4' />
              </motion.div>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Mock connected devices data
const CONNECTED_DEVICES = [
  {
    id: "1",
    name: "MacBook Pro",
    type: "laptop" as const,
    location: "San Francisco, CA",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    type: "phone" as const,
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    name: "iPad Pro",
    type: "tablet" as const,
    location: "New York, NY",
    lastActive: "Yesterday",
    current: false,
  },
  {
    id: "4",
    name: "Windows PC",
    type: "desktop" as const,
    location: "Los Angeles, CA",
    lastActive: "3 days ago",
    current: false,
  },
];

// Device Icon component
function DeviceIcon({ type }: { type: "laptop" | "phone" | "tablet" | "desktop" }) {
  switch (type) {
    case "laptop":
      return <Laptop className='w-5 h-5' />;
    case "phone":
      return <Smartphone className='w-5 h-5' />;
    case "tablet":
      return <TabletSmartphone className='w-5 h-5' />;
    case "desktop":
      return <Monitor className='w-5 h-5' />;
  }
}

// Connected Device Row
function DeviceRow({
  device,
  onRemove,
}: {
  device: (typeof CONNECTED_DEVICES)[0];
  onRemove: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition-colors",
        device.current
          ? "bg-blue-500/10 border-blue-500/30"
          : "bg-white/5 border-[oklch(0.25_0.05_260)] hover:bg-white/10"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          device.current ? "bg-blue-500/20 text-blue-400" : "bg-white/10"
        )}
      >
        <DeviceIcon type={device.type} />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2'>
          <p className='font-medium truncate'>{device.name}</p>
          {device.current && (
            <span className='px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-400 rounded-full'>
              This Device
            </span>
          )}
        </div>
        <p className='text-xs text-muted-foreground'>
          {device.location} • {device.lastActive}
        </p>
      </div>

      {!device.current && (
        <div className='relative'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical className='w-4 h-4' />
          </Button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                className='absolute right-0 top-full mt-1 w-40 bg-[oklch(0.18_0.03_260)] border border-[oklch(0.25_0.05_260)] rounded-lg shadow-xl overflow-hidden z-10'
              >
                <button
                  onClick={() => {
                    onRemove();
                    setShowMenu(false);
                  }}
                  className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors'
                >
                  <LogOut className='w-4 h-4' />
                  Sign Out Device
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// Delete confirmation modal
function DeleteModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [confirmText, setConfirmText] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className='bg-[oklch(0.15_0.03_260)] border border-red-500/30 rounded-xl p-6 w-full max-w-md shadow-2xl'
      >
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center'>
            <AlertTriangle className='w-6 h-6 text-red-400' />
          </div>
          <div>
            <h3 className='font-semibold text-lg text-red-400'>
              Delete Account
            </h3>
            <p className='text-sm text-muted-foreground'>
              This action is irreversible
            </p>
          </div>
          <button
            onClick={onClose}
            className='ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        <div className='space-y-4'>
          <p className='text-sm text-white/70'>
            This will permanently delete your account and all associated data
            including:
          </p>
          <ul className='space-y-2 text-sm text-white/50'>
            <li className='flex items-center gap-2'>
              <div className='w-1.5 h-1.5 rounded-full bg-red-400' />
              All device configurations and history
            </li>
            <li className='flex items-center gap-2'>
              <div className='w-1.5 h-1.5 rounded-full bg-red-400' />
              Analytics data and reports
            </li>
            <li className='flex items-center gap-2'>
              <div className='w-1.5 h-1.5 rounded-full bg-red-400' />
              Team memberships and permissions
            </li>
          </ul>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>
              Type{" "}
              <span className='text-red-400 font-mono'>DELETE MY ACCOUNT</span>{" "}
              to confirm
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='DELETE MY ACCOUNT'
              className='bg-white/5 border-red-500/30 font-mono'
            />
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            className='flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400'
            onClick={onConfirm}
            disabled={confirmText !== "DELETE MY ACCOUNT"}
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Delete Forever
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "Tech Corp",
    phone: "+1 (555) 123-4567",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [devices, setDevices] = useState(CONNECTED_DEVICES);
  const [showBillingToast, setShowBillingToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setPasswordChanged(true);
    setTimeout(() => setPasswordChanged(false), 3000);
  };

  const handleRemoveDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
  };

  const handleManageBilling = () => {
    setShowBillingToast(true);
    setTimeout(() => setShowBillingToast(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Header with Avatar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-linear-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-[oklch(0.25_0.05_260)]'
          >
            <ProfileAvatar
              initials={`${formData.firstName[0]}${formData.lastName[0]}`}
            />

            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-3xl font-bold font-serif mb-1'>
                {formData.firstName} {formData.lastName}
              </h1>
              <p className='text-muted-foreground mb-3'>{formData.email}</p>
              <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium'>
                  <div className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                  Active Account
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium'>
                  <Crown className='w-3 h-3' />
                  Pro Plan
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium'>
                  <Shield className='w-3 h-3' />
                  Verified
                </span>
              </div>
            </div>

            <div className='hidden lg:block text-right'>
              <p className='text-xs text-muted-foreground'>Member since</p>
              <p className='font-semibold'>January 2024</p>
            </div>
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Main Profile Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className='lg:col-span-2'
            >
              <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
                    <User className='w-5 h-5 text-blue-400' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>
                      Personal Information
                    </h2>
                    <p className='text-xs text-muted-foreground'>
                      Update your profile details
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      label='First Name'
                      icon={User}
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <FormField
                      label='Last Name'
                      icon={User}
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <FormField
                    label='Email Address'
                    icon={Mail}
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FormField
                    label='Company'
                    icon={Building2}
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                  />

                  <FormField
                    label='Phone Number'
                    icon={Phone}
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <div className='pt-4 flex items-center gap-3'>
                    <Button
                      type='submit'
                      disabled={isSaving}
                      className='relative overflow-hidden'
                    >
                      {isSaving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className='w-4 h-4' />
                        </motion.div>
                      ) : saveSuccess ? (
                        <Check className='w-4 h-4' />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    {saveSuccess && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='text-sm text-emerald-400'
                      >
                        Changes saved successfully!
                      </motion.span>
                    )}
                  </div>
                </form>
              </Card>
            </motion.div>

            {/* Side Panel - Plan & Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='space-y-6'
            >
              {/* Current Plan */}
              <Card className='p-5 bg-linear-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center'>
                    <Crown className='w-5 h-5 text-amber-400' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Pro Plan</h3>
                    <p className='text-xs text-muted-foreground'>$999/month</p>
                  </div>
                </div>

                <div className='space-y-3 mb-4'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-white/60'>Status</span>
                    <span className='text-emerald-400 font-medium'>Active</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-white/60'>Next billing</span>
                    <span className='font-medium'>Jan 15, 2025</span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-white/60'>Devices</span>
                    <span className='font-medium'>12 / Unlimited</span>
                  </div>
                </div>

                <Button
                  variant='outline'
                  className='w-full border-amber-500/30 hover:bg-amber-500/10'
                  onClick={handleManageBilling}
                >
                  <CreditCard className='w-4 h-4 mr-2' />
                  Manage Billing
                </Button>
              </Card>

              {/* Quick Stats */}
              <Card className='p-5 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
                <h3 className='font-semibold mb-4 flex items-center gap-2'>
                  <Zap className='w-4 h-4 text-blue-400' />
                  Quick Stats
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-white/60'>API Calls</span>
                    <span className='text-sm font-semibold'>48.2K</span>
                  </div>
                  <div className='h-1.5 rounded-full bg-white/10 overflow-hidden'>
                    <div
                      className='h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full'
                      style={{ width: "48%" }}
                    />
                  </div>
                  <p className='text-xs text-white/40'>
                    48,200 / 100,000 monthly
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center'>
                    <Shield className='w-5 h-5 text-purple-400' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>Security Settings</h2>
                    <p className='text-xs text-muted-foreground'>
                      Manage your account security
                    </p>
                  </div>
                </div>

                {/* Password Changed Success */}
                <AnimatePresence>
                  {passwordChanged && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm'
                    >
                      <Check className='w-4 h-4' />
                      Password updated!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Change Password Button */}
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPasswordModal(true)}
                className='w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-[oklch(0.25_0.05_260)] hover:bg-white/10 transition-colors text-left mb-6'
              >
                <div className='w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center'>
                  <Key className='w-5 h-5 text-purple-400' />
                </div>
                <div className='flex-1'>
                  <p className='font-medium'>Change Password</p>
                  <p className='text-xs text-muted-foreground'>
                    Update your account password
                  </p>
                </div>
                <ChevronRight className='w-4 h-4 text-white/30' />
              </motion.button>

              {/* Connected Devices */}
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Smartphone className='w-4 h-4 text-blue-400' />
                    <h3 className='font-medium'>Connected Devices</h3>
                  </div>
                  <span className='text-xs text-muted-foreground'>
                    {devices.length} devices
                  </span>
                </div>

                <div className='space-y-3'>
                  <AnimatePresence>
                    {devices.map((device) => (
                      <DeviceRow
                        key={device.id}
                        device={device}
                        onRemove={() => handleRemoveDevice(device.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className='p-6 bg-red-500/5 border-red-500/20'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center'>
                  <AlertTriangle className='w-5 h-5 text-red-400' />
                </div>
                <div>
                  <h2 className='text-lg font-semibold text-red-400'>
                    Danger Zone
                  </h2>
                  <p className='text-xs text-muted-foreground'>
                    Irreversible and destructive actions
                  </p>
                </div>
              </div>

              <p className='text-sm text-white/60 mb-4'>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>

              <Button
                variant='destructive'
                className='bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className='w-4 h-4 mr-2' />
                Delete Account
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => setShowDeleteModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <ChangePasswordModal
            onClose={() => setShowPasswordModal(false)}
            onSuccess={handlePasswordSuccess}
          />
        )}
      </AnimatePresence>

      {/* Billing Toast */}
      <AnimatePresence>
        {showBillingToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className='fixed bottom-6 left-1/2 z-50 px-4 py-3 bg-[oklch(0.18_0.03_260)] border border-amber-500/30 rounded-xl shadow-xl flex items-center gap-3'
          >
            <div className='w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center'>
              <CreditCard className='w-4 h-4 text-amber-400' />
            </div>
            <p className='text-sm'>
              Redirecting to billing portal...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
