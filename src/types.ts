export interface Site {
  id: string;
  userId?: string;
  name: string;
  niche: string;
  content?: string;
  city?: string;
  state?: string;
  phone?: string;
  address?: string;
  offerPrice?: string;
  status: 'active' | 'prospecting' | 'sold';
  style?: string;
  model?: string;
  primaryColor?: string;
  secondaryColor?: string;
  extras?: string[];
  createdAt: string;
}

export interface Script {
  id: string;
  userId: string;
  title: string;
  code: string;
  language: string;
  createdAt: any;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  company: string;
  niche: string;
  reason: string;
  status: 'lead' | 'contacted' | 'closed';
  createdAt: any;
}

export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  updatedAt: any;
}

export interface Sale {
  id: string;
  userId: string;
  customerName: string;
  value: number;
  description: string;
  createdAt: any;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  createdAt: any;
}

export type View = 'dashboard' | 'sites' | 'extensions' | 'settings' | 'approaches' | 'objections';
