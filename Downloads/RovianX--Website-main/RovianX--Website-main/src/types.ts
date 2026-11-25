export type ServiceCategory = 
  | 'all'
  | 'software'
  | 'ai-data'
  | 'growth-design'
  | 'cloud-enterprise';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  businessImpact: string;
  deliverables: string[];
  techStack: string[];
  sampleDeliverables: string[];
  iconName: string;
}

export interface EngagementModel {
  id: string;
  title: string;
  badge: string;
  description: string;
  idealFor: string;
  deliverables: string[];
  features: string[];
  actionLabel: string;
}

export interface ClientLead {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite?: string;
  selectedServices: string[];
  engagementModel: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  status: 'new' | 'contacted' | 'in_discovery' | 'proposal_sent' | 'closed';
  notes?: string;
  syncedToGoogleSheets?: boolean;
}

export interface SheetsStatus {
  configured: boolean;
  hasCredentialsJson: boolean;
  hasSheetId: boolean;
  clientEmail?: string;
  sheetId?: string;
  tabName?: string;
  error?: string;
  lastSyncTime?: string;
  totalSyncedCount: number;
}

export interface EstimatorState {
  primaryGoal: string;
  selectedServiceIds: string[];
  scale: 'mvp' | 'standard' | 'enterprise';
  timeline: string;
  targetLaunch: string;
}
