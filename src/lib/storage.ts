import { Site, Script, Customer, Sale } from '../types';

const KEYS = {
  SITES: 'pagevo_sites_v2',
  SCRIPTS: 'pagevo_scripts',
  CUSTOMERS: 'pagevo_customers',
  SALES: 'pagevo_sales',
  SETTINGS: 'pagevo_settings',
  USER: 'pagevo_user',
  WEBHOOKS: 'pagevo_webhooks',
  STATS: 'pagevo_stats_v2',
  SALE_PRICE: 'pagevo_sale_price',
  PASSWORD: 'pagevo_access_password'
};

export interface DashboardStats {
  hoje: { structures: number, sold: number },
  '7dias': { structures: number, sold: number },
  '30dias': { structures: number, sold: number },
  sempre: { structures: number, sold: number }
}

const DEFAULT_STATS: DashboardStats = {
  hoje: { structures: 2, sold: 1 },
  '7dias': { structures: 6, sold: 3 },
  '30dias': { structures: 14, sold: 8 },
  sempre: { structures: 24, sold: 12 }
};

const SEED_SITES: Site[] = [
  {
    id: 'site-1',
    name: 'Pizzaria Don Giovanni',
    niche: 'Pizzaria',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 98765-4321',
    address: 'Rua Augusta, 1420 - Consolação',
    offerPrice: '500,00',
    status: 'sold',
    style: 'futuristic',
    model: 'landing_page',
    primaryColor: '#ef4444',
    secondaryColor: '#10b981',
    extras: ['menu', 'testimonials', 'contact'],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'site-2',
    name: 'Clínica OdontoPrime',
    niche: 'Consultório Odontológico',
    city: 'Curitiba',
    state: 'PR',
    phone: '(41) 99123-5566',
    address: 'Av. Batel, 890 - Batel',
    offerPrice: '750,00',
    status: 'prospecting',
    style: 'corporate',
    model: 'institutional',
    primaryColor: '#ef4444',
    secondaryColor: '#3b82f6',
    extras: ['faq', 'testimonials', 'contact'],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'site-3',
    name: 'Estúdio de Treinamento IronGym',
    niche: 'Academia',
    city: 'Belo Horizonte',
    state: 'MG',
    phone: '(31) 98844-1122',
    address: 'Rua da Bahia, 320 - Centro',
    offerPrice: '600,00',
    status: 'active',
    style: 'maximalist',
    model: 'landing_page',
    primaryColor: '#ef4444',
    secondaryColor: '#f59e0b',
    extras: ['gallery', 'testimonials'],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const storage = {
  getPassword: (): string => {
    return '5050';
  },
  savePassword: () => {
    // Senha fixa permanentemente em 5050
  },

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
  getSites: (): Site[] => {
    const data = localStorage.getItem(KEYS.SITES);
    if (!data) {
      localStorage.setItem(KEYS.SITES, JSON.stringify(SEED_SITES));
      return SEED_SITES;
    }
    return JSON.parse(data);
  },
  saveSite: (site: Omit<Site, 'id' | 'createdAt'>) => {
    const sites = storage.getSites();
    const newSite: Site = { 
      ...site, 
      id: 'site-' + Math.random().toString(36).substring(2, 9), 
      createdAt: new Date().toISOString() 
    };
    localStorage.setItem(KEYS.SITES, JSON.stringify([newSite, ...sites]));
    storage.incrementStructures();
    return newSite;
  },
  updateSiteStatus: (id: string, status: 'active' | 'prospecting' | 'sold') => {
    const sites = storage.getSites();
    const updated = sites.map(s => {
      if (s.id === id) {
        if (s.status !== 'sold' && status === 'sold') {
          storage.incrementSales();
        }
        return { ...s, status };
      }
      return s;
    });
    localStorage.setItem(KEYS.SITES, JSON.stringify(updated));
    return updated;
  },
  deleteSite: (id: string) => {
    const sites = storage.getSites();
    const filtered = sites.filter(s => s.id !== id);
    localStorage.setItem(KEYS.SITES, JSON.stringify(filtered));
    return filtered;
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
