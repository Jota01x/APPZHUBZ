import React from 'react';
import { LayoutDashboard, Globe, Puzzle, Settings, LogOut, PanelLeftClose, PanelLeftOpen, MessageSquare, User, X, Check, Users } from 'lucide-react';
import { View } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../lib/storage';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const user = storage.getUser();

  const handleLogout = () => {
    storage.logout();
    window.location.reload();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
    { id: 'sites', label: 'Criar Estrutura', icon: Globe },
    { id: 'extensions', label: 'Extensões', icon: Puzzle },
    { id: 'referral', label: 'Indique e Ganhe', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-50 border-r border-zinc-800 flex flex-col p-4 bg-zinc-950 transition-all duration-300 lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <span className="text-xl font-semibold tracking-tight text-white uppercase whitespace-nowrap">APPZ<span className="text-indigo-500">HUB</span></span>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="space-y-2 flex-grow overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id as View);
                setIsOpen(false);
              }}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-medium relative group ${
                currentView === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
              }`}
            >
              <div className={`flex-shrink-0 ${currentView === item.id ? 'scale-110' : ''}`}>
                <item.icon size={20} />
              </div>
              <span className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
                {item.label}
              </span>
              
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-zinc-700 shadow-xl">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 text-zinc-400 hover:bg-red-900/20 hover:text-red-400 rounded-xl transition-all text-sm font-medium ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Sair da Conta</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
