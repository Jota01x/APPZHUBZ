import { Site, Script, Customer, Sale } from '../types';

const KEYS = {
  SITES: 'omnisaas_sites',
  SCRIPTS: 'omnisaas_scripts',
  CUSTOMERS: 'omnisaas_customers',
  SALES: 'omnisaas_sales',
  SETTINGS: 'omnisaas_settings',
  USER: 'omnisaas_user',
  WEBHOOKS: 'omnisaas_webhooks',
  STATS: 'omnisaas_stats_v2',
  SALE_PRICE: 'omnisaas_sale_price'
};

export interface DashboardStats {
  hoje: { structures: number, sold: number },
  '7dias': { structures: number, sold: number },
  '30dias': { structures: number, sold: number },
  sempre: { structures: number, sold: number }
}

const DEFAULT_STATS: DashboardStats = {
  hoje: { structures: 0, sold: 0 },
  '7dias': { structures: 0, sold: 0 },
  '30dias': { structures: 0, sold: 0 },
  sempre: { structures: 0, sold: 0 }
};

export const storage = {
  getStats: (): DashboardStats => {
    const stats = localStorage.getItem(KEYS.STATS);
    if (!stats) {
      localStorage.setItem(KEYS.STATS, JSON.stringify(DEFAULT_STATS));
      return DEFAULT_STATS;
    }
    return JSON.parse(stats);
  },
  saveStats: (stats: DashboardStats) => {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  },
  getSalePrice: (): number => {
    const price = localStorage.getItem(KEYS.SALE_PRICE);
    return price ? parseFloat(price) : 500.00;
  },
  saveSalePrice: (price: number) => {
    localStorage.setItem(KEYS.SALE_PRICE, price.toString());
  },
  incrementStructures: () => {
    const stats = storage.getStats();
    stats.hoje.structures += 1;
    stats['7dias'].structures += 1;
    stats['30dias'].structures += 1;
    stats.sempre.structures += 1;
    storage.saveStats(stats);
  },
  incrementSales: () => {
    const stats = storage.getStats();
    stats.hoje.sold += 1;
    stats['7dias'].sold += 1;
    stats['30dias'].sold += 1;
    stats.sempre.sold += 1;
    storage.saveStats(stats);
  },
  getSites: (): Site[] => JSON.parse(localStorage.getItem(KEYS.SITES) || '[]'),
  saveSite: (site: Omit<Site, 'id' | 'createdAt'>) => {
    const sites = storage.getSites();
    const newSite = { ...site, id: Math.random().toString(36).substring(2, 11), createdAt: new Date().toISOString() };
    localStorage.setItem(KEYS.SITES, JSON.stringify([...sites, newSite]));
    return newSite;
  },

  getScripts: (): Script[] => JSON.parse(localStorage.getItem(KEYS.SCRIPTS) || '[]'),
  saveScript: (script: Omit<Script, 'id' | 'createdAt'>) => {
    const scripts = storage.getScripts();
    const newScript = { ...script, id: Math.random().toString(36).substring(2, 11), createdAt: new Date().toISOString() };
    localStorage.setItem(KEYS.SCRIPTS, JSON.stringify([...scripts, newScript]));
    return newScript;
  },

  getCustomers: (): Customer[] => JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '[]'),
  saveCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const customers = storage.getCustomers();
    const newCustomer = { ...customer, id: Math.random().toString(36).substring(2, 11), createdAt: new Date().toISOString() };
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify([...customers, newCustomer]));
    return newCustomer;
  },

  getSales: (): Sale[] => JSON.parse(localStorage.getItem(KEYS.SALES) || '[]'),
  saveSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => {
    const sales = storage.getSales();
    const newSale = { ...sale, id: Math.random().toString(36).substring(2, 11), createdAt: new Date().toISOString() };
    localStorage.setItem(KEYS.SALES, JSON.stringify([...sales, newSale]));
    return newSale;
  },

  getUser: () => JSON.parse(localStorage.getItem(KEYS.USER) || 'null'),
  setUser: (user: any) => localStorage.setItem(KEYS.USER, JSON.stringify(user)),
  logout: () => localStorage.removeItem(KEYS.USER),
  
  getWebhooks: (): any[] => JSON.parse(localStorage.getItem(KEYS.WEBHOOKS) || '[]'),
  saveWebhook: (webhook: any) => {
    const webhooks = storage.getWebhooks();
    const newWebhook = { ...webhook, id: Math.random().toString(36).substring(2, 11), createdAt: new Date().toISOString() };
    localStorage.setItem(KEYS.WEBHOOKS, JSON.stringify([...webhooks, newWebhook]));
    return newWebhook;
  },
  removeWebhook: (id: string) => {
    const webhooks = storage.getWebhooks();
    localStorage.setItem(KEYS.WEBHOOKS, JSON.stringify(webhooks.filter((w: any) => w.id !== id)));
  },
  
  clearAll: () => {
    Object.values(KEYS).forEach(key => {
      if (key !== KEYS.USER) { // Keep user logged in
        localStorage.removeItem(key);
      }
    });
    window.location.reload();
  }
};
