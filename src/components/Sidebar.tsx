import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Puzzle, 
  Settings, 
  LogOut, 
  PanelLeftClose, 
  PanelLeftOpen, 
  MessageSquare, 
  ShieldAlert, 
  X,
  Layers,
  Sparkles,
  Activity
} from 'lucide-react';
import { View } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../lib/storage';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavGroup {
  label: string;
  items: {
    id: View;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Visão Geral',
    items: [
      { id: 'dashboard', label: 'Painel Central', icon: LayoutDashboard }
    ]
  },
  {
    label: 'Ativos Estruturais',
    items: [
      { id: 'sites', label: 'Criar Estrutura', icon: Globe }
    ]
  },
  {
    label: 'Inteligência de Vendas',
    items: [
      { id: 'approaches', label: 'Abordagens', icon: MessageSquare },
      { id: 'objections', label: 'Matriz de Objeções', icon: ShieldAlert }
    ]
  },
  {
    label: 'Infraestrutura',
    items: [
      { id: 'extensions', label: 'Extensões & APIs', icon: Puzzle },
      { id: 'settings', label: 'Configurações', icon: Settings }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleLogout = () => {
    storage.logout();
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-50 border-r border-zinc-800/80 flex flex-col p-4 bg-zinc-950 transition-all duration-300 lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}>
        {/* Brand Lockup */}
        <div className="flex items-center justify-between mb-8 px-2 pt-1">
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase leading-none whitespace-nowrap">
                PAGEVO
              </span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mt-1.5">
                Engine v2.4
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl transition-colors shrink-0"
            title={isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Grouped Navigation */}
        <nav className="space-y-6 flex-grow overflow-y-auto custom-scrollbar font-sans px-1">
          {NAV_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500">
                  {group.label}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = currentView === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView(item.id);
                        setIsOpen(false);
                      }}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-bold relative group ${
                        isActive 
                          ? 'bg-red-600/10 text-red-400 border border-red-500/25 shadow-[0_0_20px_rgba(239,68,68,0.12)]' 
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
                      }`}
                    >
                      <div className={`shrink-0 transition-transform ${isActive ? 'scale-110 text-red-500' : 'group-hover:text-zinc-200'}`}>
                        <Icon size={18} />
                      </div>
                      
                      <span className={`transition-all duration-300 whitespace-nowrap uppercase tracking-wider ${isCollapsed ? 'opacity-0 w-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
                        {item.label}
                      </span>

                      {item.badge && !isCollapsed && (
                        <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/20">
                          {item.badge}
                        </span>
                      )}

                      {/* Floating tooltip when collapsed */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-zinc-700 shadow-2xl font-bold uppercase tracking-wider">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Operational Status Pill */}
        {!isCollapsed && (
          <div className="mt-4 p-3.5 bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800/80 rounded-2xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">Licença Vitalícia</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </div>
            <p className="text-[10px] text-zinc-500 leading-tight">
              Sistema ativo e operacional.
            </p>
          </div>
        )}

        {/* User Session & Logout */}
        <div className="mt-4 pt-4 border-t border-zinc-800/80 font-sans">
          <div className="flex items-center justify-between gap-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-zinc-200 truncate">Usuário Ativo</span>
                </div>
              </div>
            )}
            
            <button 
              onClick={handleLogout}
              title="Sair da Conta"
              className={`p-2.5 text-zinc-400 hover:bg-red-950/30 hover:text-red-400 border border-transparent hover:border-red-900/30 rounded-xl transition-all ${isCollapsed ? 'w-full flex items-center justify-center' : ''}`}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
