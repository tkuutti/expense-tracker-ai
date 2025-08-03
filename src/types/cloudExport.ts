export type ServiceType = 'storage' | 'communication' | 'productivity' | 'automation' | 'analytics';
export type ServiceStatus = 'connected' | 'disconnected' | 'error' | 'connecting';
export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'scheduled' | 'cancelled';
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
export type PermissionLevel = 'view' | 'comment' | 'edit' | 'admin';
export type TemplateCategory = 'financial' | 'tax' | 'business' | 'personal' | 'compliance';

export interface IntegratedService {
  id: string;
  name: string;
  displayName: string;
  type: ServiceType;
  status: ServiceStatus;
  icon: string;
  description: string;
  capabilities: string[];
  lastSync?: Date;
  connectedAt?: Date;
  errorMessage?: string;
  isPopular?: boolean;
  userCount?: number;
  config?: Record<string, unknown>;
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  format: 'csv' | 'json' | 'pdf' | 'excel';
  icon: string;
  fields: string[];
  filters?: Record<string, unknown>;
  customization?: Record<string, unknown>;
  isBuiltIn: boolean;
  isPublic: boolean;
  createdBy?: string;
  usageCount?: number;
  rating?: number;
  tags: string[];
  previewData?: Record<string, unknown>[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: PermissionLevel;
  joinedAt: Date;
  lastActive?: Date;
  isOnline?: boolean;
}

export interface ShareSettings {
  id: string;
  isPublic: boolean;
  allowComments: boolean;
  allowDownload: boolean;
  expiresAt?: Date;
  password?: string;
  permissions: PermissionLevel;
  allowedEmails?: string[];
  viewCount: number;
  downloadCount: number;
}

export interface CloudExport {
  id: string;
  name: string;
  template: ExportTemplate;
  destination: IntegratedService[];
  status: ExportStatus;
  format: 'csv' | 'json' | 'pdf' | 'excel';
  recordCount: number;
  fileSize?: number;
  downloadUrl?: string;
  shareLink?: string;
  shareSettings?: ShareSettings;
  sharedWith: TeamMember[];
  scheduledFor?: Date;
  recurringSchedule?: RecurringSchedule;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  processingTime?: number;
  errorMessage?: string;
}

export interface RecurringSchedule {
  id: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  interval: number;
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  timezone: string;
  isActive: boolean;
  nextRun: Date;
  lastRun?: Date;
  endDate?: Date;
}

export interface BackgroundJob {
  id: string;
  type: 'export' | 'sync' | 'share' | 'schedule';
  name: string;
  description: string;
  status: JobStatus;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  estimatedDuration?: number;
  result?: Record<string, unknown>;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;
  priority: 'low' | 'medium' | 'high';
  relatedExportId?: string;
}

export interface ExportHistory {
  exports: CloudExport[];
  jobs: BackgroundJob[];
  totalExports: number;
  totalSize: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'export' | 'share' | 'connect' | 'schedule' | 'collaborate';
  title: string;
  description: string;
  timestamp: Date;
  userId: string;
  relatedId?: string;
  metadata?: Record<string, unknown>;
}

export interface Integration {
  service: IntegratedService;
  isConnected: boolean;
  connectionHealth: 'good' | 'warning' | 'error';
  lastSyncStatus: 'success' | 'failed' | 'pending';
  syncFrequency: string;
  dataMapping: Record<string, string>;
  settings: Record<string, unknown>;
}

export interface CloudExportAnalytics {
  totalExports: number;
  totalShares: number;
  popularTemplates: { template: ExportTemplate; count: number }[];
  topDestinations: { service: IntegratedService; count: number }[];
  exportsByMonth: { month: string; count: number }[];
  collaborationStats: {
    teamMembers: number;
    sharedExports: number;
    comments: number;
  };
  usageMetrics: {
    averageExportTime: number;
    successRate: number;
    totalDataExported: number;
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired?: boolean;
  actionUrl?: string;
  relatedId?: string;
}

export interface CloudExportContext {
  // Export Management
  exports: CloudExport[];
  templates: ExportTemplate[];
  integrations: Integration[];
  
  // Team & Collaboration
  teamMembers: TeamMember[];
  currentUser: TeamMember;
  
  // Background Processing
  jobs: BackgroundJob[];
  notifications: Notification[];
  
  // Analytics
  analytics: CloudExportAnalytics;
  
  // Methods
  createExport: (config: Partial<CloudExport>) => Promise<CloudExport>;
  scheduleExport: (exportId: string, schedule: RecurringSchedule) => Promise<void>;
  shareExport: (exportId: string, settings: ShareSettings) => Promise<string>;
  connectService: (serviceId: string, config: Record<string, unknown>) => Promise<void>;
  disconnectService: (serviceId: string) => Promise<void>;
  inviteTeamMember: (email: string, role: PermissionLevel) => Promise<void>;
  getExportHistory: () => ExportHistory;
  retryJob: (jobId: string) => Promise<void>;
  cancelJob: (jobId: string) => Promise<void>;
}