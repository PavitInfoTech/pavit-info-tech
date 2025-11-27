"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Plus,
  MoreHorizontal,
  Shield,
  Eye,
  Edit3,
  Users,
  Crown,
  UserCog,
  Mail,
  Trash2,
  RefreshCw,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "inactive";
}

interface Permission {
  id: string;
  name: string;
  description: string;
  admin: boolean;
  editor: boolean;
  viewer: boolean;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@pavitinfo.com",
    avatar: "SC",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@pavitinfo.com",
    avatar: "MJ",
    role: "editor",
    status: "active",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@pavitinfo.com",
    avatar: "ER",
    role: "editor",
    status: "active",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@pavitinfo.com",
    avatar: "DK",
    role: "viewer",
    status: "active",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa@pavitinfo.com",
    avatar: "LW",
    role: "viewer",
    status: "pending",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james@pavitinfo.com",
    avatar: "JW",
    role: "admin",
    status: "active",
  },
  {
    id: "7",
    name: "Anna Martinez",
    email: "anna@pavitinfo.com",
    avatar: "AM",
    role: "editor",
    status: "inactive",
  },
];

const PERMISSIONS: Permission[] = [
  {
    id: "view_dashboard",
    name: "View Dashboard",
    description: "Access to view dashboard and analytics",
    admin: true,
    editor: true,
    viewer: true,
  },
  {
    id: "view_devices",
    name: "View Devices",
    description: "View device inventory and status",
    admin: true,
    editor: true,
    viewer: true,
  },
  {
    id: "manage_devices",
    name: "Manage Devices",
    description: "Add, edit, or remove devices",
    admin: true,
    editor: true,
    viewer: false,
  },
  {
    id: "configure_alerts",
    name: "Configure Alerts",
    description: "Set up and modify alert rules",
    admin: true,
    editor: true,
    viewer: false,
  },
  {
    id: "export_data",
    name: "Export Data",
    description: "Download reports and data exports",
    admin: true,
    editor: true,
    viewer: false,
  },
  {
    id: "manage_users",
    name: "Manage Users",
    description: "Invite, remove, or modify user roles",
    admin: true,
    editor: false,
    viewer: false,
  },
  {
    id: "billing_access",
    name: "Billing Access",
    description: "View and manage billing settings",
    admin: true,
    editor: false,
    viewer: false,
  },
  {
    id: "api_keys",
    name: "API Keys",
    description: "Create and manage API keys",
    admin: true,
    editor: false,
    viewer: false,
  },
  {
    id: "system_settings",
    name: "System Settings",
    description: "Configure global system settings",
    admin: true,
    editor: false,
    viewer: false,
  },
];

function AvatarStack({ users }: { users: User[] }) {
  const displayUsers = users.slice(0, 5);
  const remaining = users.length - 5;

  return (
    <div className='flex items-center'>
      <div className='flex -space-x-3'>
        {displayUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-[oklch(0.13_0.03_260)]",
              user.role === "admin" &&
                "bg-linear-to-br from-amber-500 to-orange-600",
              user.role === "editor" &&
                "bg-linear-to-br from-blue-500 to-cyan-600",
              user.role === "viewer" &&
                "bg-linear-to-br from-purple-500 to-pink-600"
            )}
            style={{ zIndex: displayUsers.length - index }}
          >
            {user.avatar}
            {user.status === "active" && (
              <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[oklch(0.13_0.03_260)]' />
            )}
          </motion.div>
        ))}
        {remaining > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className='relative w-10 h-10 rounded-full bg-white/10 border-2 border-[oklch(0.13_0.03_260)] flex items-center justify-center text-sm font-semibold'
          >
            +{remaining}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function RoleIcon({ role }: { role: "admin" | "editor" | "viewer" }) {
  switch (role) {
    case "admin":
      return <Crown className='w-4 h-4' />;
    case "editor":
      return <Edit3 className='w-4 h-4' />;
    case "viewer":
      return <Eye className='w-4 h-4' />;
  }
}

function RoleBadge({ role }: { role: "admin" | "editor" | "viewer" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        role === "admin" && "bg-amber-500/20 text-amber-400",
        role === "editor" && "bg-blue-500/20 text-blue-400",
        role === "viewer" && "bg-purple-500/20 text-purple-400"
      )}
    >
      <RoleIcon role={role} />
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: "active" | "pending" | "inactive";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs",
        status === "active" && "bg-emerald-500/20 text-emerald-400",
        status === "pending" && "bg-yellow-500/20 text-yellow-400",
        status === "inactive" && "bg-white/10 text-white/50"
      )}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "active" && "bg-emerald-400",
          status === "pending" && "bg-yellow-400",
          status === "inactive" && "bg-white/40"
        )}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function PermissionCheck({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <div className='w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center'>
      <Check className='w-4 h-4 text-emerald-400' />
    </div>
  ) : (
    <div className='w-6 h-6 rounded-full bg-white/5 flex items-center justify-center'>
      <X className='w-4 h-4 text-white/30' />
    </div>
  );
}

// Invite User Modal
function InviteModal({
  onClose,
  onInvite,
}: {
  onClose: () => void;
  onInvite: (email: string, role: User["role"]) => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User["role"]>("viewer");
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      onInvite(email, role);
      onClose();
    }
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
          <div className='w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center'>
            <Mail className='w-5 h-5 text-blue-400' />
          </div>
          <div>
            <h3 className='font-semibold'>Invite Team Member</h3>
            <p className='text-sm text-muted-foreground'>
              Send an invitation to join your team
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>
              Email Address
            </label>
            <Input
              type='email'
              placeholder='colleague@company.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white/5 border-[oklch(0.25_0.05_260)]'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Role</label>
            <div className='relative'>
              <button
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className='w-full flex items-center justify-between px-3 py-2 bg-white/5 border border-[oklch(0.25_0.05_260)] rounded-lg text-sm'
              >
                <div className='flex items-center gap-2'>
                  <RoleIcon role={role} />
                  <span className='capitalize'>{role}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isRoleOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {isRoleOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className='absolute top-full left-0 right-0 mt-1 bg-[oklch(0.18_0.03_260)] border border-[oklch(0.25_0.05_260)] rounded-lg overflow-hidden z-10'
                  >
                    {(["admin", "editor", "viewer"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRole(r);
                          setIsRoleOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 transition-colors",
                          role === r && "bg-white/5"
                        )}
                      >
                        <RoleIcon role={r} />
                        <span className='capitalize'>{r}</span>
                        {role === r && (
                          <Check className='w-4 h-4 ml-auto text-emerald-400' />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className='p-3 rounded-lg bg-blue-500/10 border border-blue-500/20'>
            <p className='text-xs text-blue-400'>
              {role === "admin" &&
                "Admins have full access to all features including billing and user management."}
              {role === "editor" &&
                "Editors can manage devices, configure alerts, and export data."}
              {role === "viewer" &&
                "Viewers have read-only access to dashboards and reports."}
            </p>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button
            className='flex-1'
            onClick={handleSubmit}
            disabled={!email.includes("@")}
          >
            <Mail className='w-4 h-4 mr-2' />
            Send Invite
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Delete Confirmation Modal
function DeleteModal({
  user,
  onClose,
  onConfirm,
}: {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}) {
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
          <div className='w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center'>
            <AlertTriangle className='w-5 h-5 text-red-400' />
          </div>
          <div>
            <h3 className='font-semibold text-red-400'>Remove User</h3>
            <p className='text-sm text-muted-foreground'>
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className='p-4 rounded-lg bg-white/5 border border-white/10 mb-4'>
          <div className='flex items-center gap-3'>
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                user.role === "admin" &&
                  "bg-linear-to-br from-amber-500 to-orange-600",
                user.role === "editor" &&
                  "bg-linear-to-br from-blue-500 to-cyan-600",
                user.role === "viewer" &&
                  "bg-linear-to-br from-purple-500 to-pink-600"
              )}
            >
              {user.avatar}
            </div>
            <div>
              <p className='font-medium'>{user.name}</p>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
            </div>
          </div>
        </div>

        <p className='text-sm text-muted-foreground mb-6'>
          Are you sure you want to remove{" "}
          <span className='text-white font-medium'>{user.name}</span> from your
          team? They will lose access to all resources immediately.
        </p>

        <div className='flex gap-3'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            className='flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400'
            onClick={onConfirm}
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Remove User
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// User Actions Dropdown
function UserActions({
  user,
  onChangeRole,
  onChangeStatus,
  onDelete,
}: {
  user: User;
  onChangeRole: (role: User["role"]) => void;
  onChangeStatus: (status: User["status"]) => void;
  onDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowRoles(false);
        setShowStatus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={menuRef}>
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8'
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal className='w-4 h-4' />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            className='absolute right-0 top-full mt-1 w-48 bg-[oklch(0.18_0.03_260)] border border-[oklch(0.25_0.05_260)] rounded-lg shadow-xl overflow-hidden z-20'
          >
            {/* Change Role */}
            <div className='relative'>
              <button
                onClick={() => {
                  setShowRoles(!showRoles);
                  setShowStatus(false);
                }}
                className='w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-white/10 transition-colors'
              >
                <div className='flex items-center gap-2'>
                  <Crown className='w-4 h-4 text-amber-400' />
                  Change Role
                </div>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    showRoles && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {showRoles && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className='border-t border-[oklch(0.25_0.05_260)] bg-white/5 overflow-hidden'
                  >
                    {(["admin", "editor", "viewer"] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          onChangeRole(role);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-1.5 text-sm hover:bg-white/10 transition-colors",
                          user.role === role && "text-emerald-400"
                        )}
                      >
                        <RoleIcon role={role} />
                        <span className='capitalize'>{role}</span>
                        {user.role === role && (
                          <Check className='w-3 h-3 ml-auto' />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Change Status */}
            <div className='relative'>
              <button
                onClick={() => {
                  setShowStatus(!showStatus);
                  setShowRoles(false);
                }}
                className='w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-white/10 transition-colors'
              >
                <div className='flex items-center gap-2'>
                  <RefreshCw className='w-4 h-4 text-blue-400' />
                  Change Status
                </div>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    showStatus && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {showStatus && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className='border-t border-[oklch(0.25_0.05_260)] bg-white/5 overflow-hidden'
                  >
                    {(["active", "pending", "inactive"] as const).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => {
                            onChangeStatus(status);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2 px-4 py-1.5 text-sm hover:bg-white/10 transition-colors",
                            user.status === status && "text-emerald-400"
                          )}
                        >
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              status === "active" && "bg-emerald-400",
                              status === "pending" && "bg-yellow-400",
                              status === "inactive" && "bg-white/40"
                            )}
                          />
                          <span className='capitalize'>{status}</span>
                          {user.status === status && (
                            <Check className='w-3 h-3 ml-auto' />
                          )}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className='border-t border-[oklch(0.25_0.05_260)]'>
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors'
              >
                <Trash2 className='w-4 h-4' />
                Remove User
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function UserManagement() {
  const [selectedTab, setSelectedTab] = useState<"users" | "roles">("users");
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const usersByRole = {
    admin: users.filter((u) => u.role === "admin"),
    editor: users.filter((u) => u.role === "editor"),
    viewer: users.filter((u) => u.role === "viewer"),
  };

  const handleInviteUser = (email: string, role: User["role"]) => {
    const initials = email
      .split("@")[0]
      .split(".")
      .map((part) => part[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].replace(".", " "),
      email,
      avatar: initials || "??",
      role,
      status: "pending",
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleChangeRole = (userId: string, role: User["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  };

  const handleChangeStatus = (userId: string, status: User["status"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setDeleteUser(null);
  };

  return (
    <Card className='p-6 bg-[oklch(0.13_0.03_260)] border-[oklch(0.25_0.05_260)]'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold font-serif'>User Management</h3>
          <p className='text-sm text-muted-foreground'>
            Manage team members and their permissions
          </p>
        </div>
        <div className='flex items-center gap-3'>
          {/* Tabs */}
          <div className='flex gap-1 p-1 bg-white/5 rounded-lg'>
            <button
              onClick={() => setSelectedTab("users")}
              className={cn(
                "flex items-center gap-2 py-1.5 px-3 text-sm font-medium rounded-md transition-colors",
                selectedTab === "users"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              <Users className='w-4 h-4' />
              Users
            </button>
            <button
              onClick={() => setSelectedTab("roles")}
              className={cn(
                "flex items-center gap-2 py-1.5 px-3 text-sm font-medium rounded-md transition-colors",
                selectedTab === "roles"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              <Shield className='w-4 h-4' />
              Roles
            </button>
          </div>
          <Button size='sm' onClick={() => setShowInviteModal(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Invite User
          </Button>
        </div>
      </div>

      {selectedTab === "users" ? (
        <div className='space-y-6'>
          {/* Avatar Stack Overview */}
          <div className='flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10'>
            <div className='flex items-center gap-4'>
              <AvatarStack users={users} />
              <div>
                <p className='font-medium'>{users.length} Team Members</p>
                <p className='text-sm text-muted-foreground'>
                  {usersByRole.admin.length} admins, {usersByRole.editor.length}{" "}
                  editors, {usersByRole.viewer.length} viewers
                </p>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className='rounded-xl border border-[oklch(0.25_0.05_260)] overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white/5 border-b border-[oklch(0.25_0.05_260)]'>
                  <th className='text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3'>
                    User
                  </th>
                  <th className='text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3'>
                    Role
                  </th>
                  <th className='text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3'>
                    Status
                  </th>
                  <th className='text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[oklch(0.20_0.03_260)]'>
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                    className='hover:bg-white/5 transition-colors'
                  >
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold",
                            user.role === "admin" &&
                              "bg-linear-to-br from-amber-500 to-orange-600",
                            user.role === "editor" &&
                              "bg-linear-to-br from-blue-500 to-cyan-600",
                            user.role === "viewer" &&
                              "bg-linear-to-br from-purple-500 to-pink-600"
                          )}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <p className='font-medium text-sm'>{user.name}</p>
                          <p className='text-xs text-muted-foreground'>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <RoleBadge role={user.role} />
                    </td>
                    <td className='px-4 py-3'>
                      <StatusBadge status={user.status} />
                    </td>
                    <td className='px-4 py-3 text-right'>
                      <UserActions
                        user={user}
                        onChangeRole={(role) => handleChangeRole(user.id, role)}
                        onChangeStatus={(status) =>
                          handleChangeStatus(user.id, status)
                        }
                        onDelete={() => setDeleteUser(user)}
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* Role Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {(["admin", "editor", "viewer"] as const).map((role) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-4 rounded-xl border",
                  role === "admin" && "border-amber-500/30 bg-amber-500/5",
                  role === "editor" && "border-blue-500/30 bg-blue-500/5",
                  role === "viewer" && "border-purple-500/30 bg-purple-500/5"
                )}
              >
                <div className='flex items-center gap-3 mb-3'>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      role === "admin" && "bg-amber-500/20 text-amber-400",
                      role === "editor" && "bg-blue-500/20 text-blue-400",
                      role === "viewer" && "bg-purple-500/20 text-purple-400"
                    )}
                  >
                    <RoleIcon role={role} />
                  </div>
                  <div>
                    <p className='font-semibold capitalize'>{role}</p>
                    <p className='text-xs text-muted-foreground'>
                      {usersByRole[role].length} users
                    </p>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {role === "admin" &&
                    "Full access to all features and settings"}
                  {role === "editor" &&
                    "Can manage devices and configure alerts"}
                  {role === "viewer" &&
                    "Read-only access to dashboard and reports"}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Permission Matrix */}
          <div className='rounded-xl border border-[oklch(0.25_0.05_260)] overflow-hidden'>
            <div className='bg-white/5 border-b border-[oklch(0.25_0.05_260)] px-4 py-3'>
              <div className='flex items-center gap-2'>
                <UserCog className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm font-medium'>Permission Matrix</span>
              </div>
            </div>
            <table className='w-full'>
              <thead>
                <tr className='bg-white/5 border-b border-[oklch(0.25_0.05_260)]'>
                  <th className='text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 w-1/2'>
                    Permission
                  </th>
                  <th className='text-center text-xs font-medium uppercase tracking-wider px-4 py-3'>
                    <div className='flex items-center justify-center gap-1.5 text-amber-400'>
                      <Crown className='w-3.5 h-3.5' />
                      Admin
                    </div>
                  </th>
                  <th className='text-center text-xs font-medium uppercase tracking-wider px-4 py-3'>
                    <div className='flex items-center justify-center gap-1.5 text-blue-400'>
                      <Edit3 className='w-3.5 h-3.5' />
                      Editor
                    </div>
                  </th>
                  <th className='text-center text-xs font-medium uppercase tracking-wider px-4 py-3'>
                    <div className='flex items-center justify-center gap-1.5 text-purple-400'>
                      <Eye className='w-3.5 h-3.5' />
                      Viewer
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[oklch(0.20_0.03_260)]'>
                {PERMISSIONS.map((permission) => (
                  <motion.tr
                    key={permission.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='hover:bg-white/5 transition-colors'
                  >
                    <td className='px-4 py-3'>
                      <p className='font-medium text-sm'>{permission.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {permission.description}
                      </p>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex justify-center'>
                        <PermissionCheck allowed={permission.admin} />
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex justify-center'>
                        <PermissionCheck allowed={permission.editor} />
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex justify-center'>
                        <PermissionCheck allowed={permission.viewer} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <InviteModal
            onClose={() => setShowInviteModal(false)}
            onInvite={handleInviteUser}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteUser && (
          <DeleteModal
            user={deleteUser}
            onClose={() => setDeleteUser(null)}
            onConfirm={() => handleDeleteUser(deleteUser.id)}
          />
        )}
      </AnimatePresence>
    </Card>
  );
}
