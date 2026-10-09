import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  ChevronRight, 
  Check, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  User,
  X
} from 'lucide-react';
import { View } from '../types';
import { storage } from '../lib/storage';
import { motion, AnimatePresence } from 'motion/react';

interface TopHeaderProps {
  currentView: View;
  setView: (view: View) => void;
  onOpenMobileMenu: () => void;
}

const VIEW_TITLES: Record<View, { section: string; title: string }> = {
  dashboard: { section: 'Núcleo', title: 'Painel de Controle' },
  sites: { section: 'Ativos', title: 'Criador de Estrutura' },
  approaches: { section: 'Vendas', title: 'Scripts de Abordagem' },
  objections: { section: 'Vendas', title: 'Matriz de Objeções' },
  extensions: { section: 'Ecossistema', title: 'Extensões & Webhooks' },
  settings: { section: 'Sistema', title: 'Configurações' },
};

export const TopHeader: React.FC<TopHeaderProps> = ({ currentView, setView, onOpenMobileMenu }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    { id: 1, title: 'Sistema Operacional', desc: 'Protocolo de segurança operacional ativo.', time: 'Sessão atual' },
    { id: 3, title: 'Ambiente Seguro', desc: 'Chave de acesso 5050 autenticada com sucesso.', time: 'Sessão atual' },
  ];

  const quickSearchItems = [
    { label: 'Criar Nova Estrutura', view: 'sites' as View, category: 'Ações' },
    { label: 'Ver Métricas de Vendas', view: 'dashboard' as View, category: 'Painel' },
    { label: 'Abordagem Instagram & Contato Rápido', view: 'approaches' as View, category: 'Scripts' },
    { label: 'Abordagem Demanda de Busca no Google', view: 'approaches' as View, category: 'Scripts' },
    { label: 'Abordagem Prévia Rápida & Sem Atrito', view: 'approaches' as View, category: 'Scripts' },
    { label: 'Objeção "Já tenho Instagram"', view: 'objections' as View, category: 'Objeções' },
    { label: 'Configurar Webhook', view: 'extensions' as View, category: 'Extensões' },
    { label: 'Alterar Chave de Acesso', view: 'settings' as View, category: 'Segurança' },
  ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const currentInfo = VIEW_TITLES[currentView] || { section: 'Geral', title: 'Painel' };

  return (
    <>
      <header className="h-16 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 transition-all">
        {/* Zone 1: Breadcrumb Trail & Status */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Abrir menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-current rounded-full" />
              <span className="w-full h-0.5 bg-current rounded-full" />
              <span className="w-full h-0.5 bg-current rounded-full" />
            </div>
          </button>

          <nav className="flex items-center gap-2 text-xs" aria-label="Breadcrumb">
            <span className="font-semibold text-zinc-400">
              {currentInfo.section}
            </span>
            <ChevronRight size={12} className="text-zinc-600" />
            <span className="font-bold text-zinc-100">
              {currentInfo.title}
            </span>
          </nav>

          <div className="hidden xl:flex items-center gap-1.5 ml-3 pl-3 border-l border-zinc-800 text-[10px] text-zinc-500 font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Núcleo Operacional</span>
          </div>
        </div>

        {/* Zone 2: Global Search Trigger */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
          <button
            onClick={() => setShowSearchModal(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search size={14} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
              <span className="font-medium text-xs">Pesquisar no sistema...</span>
            </div>
            <kbd className="text-[10px] font-mono bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700/60">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Zone 3: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setView('sites')}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Nova Estrutura</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all relative"
              aria-label="Notificações"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 sm:w-88 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Central de Alertas</span>
                        <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-1.5 py-0.5 rounded border border-red-500/20">{notifications.length} novos</span>
                      </div>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="divide-y divide-zinc-800/60 mt-1">
                      {notifications.map(item => (
                        <div key={item.id} className="py-2.5 px-1 hover:bg-zinc-800/30 rounded-lg transition-colors">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold text-zinc-200">{item.title}</span>
                            <span className="text-[10px] text-zinc-500 font-bold">{item.time}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearchModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                <Search size={18} className="text-red-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquise por rotas, scripts, nichos ou configurações..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                />
                <button 
                  onClick={() => setShowSearchModal(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                {quickSearchItems.length > 0 ? (
                  quickSearchItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setView(item.view);
                        setShowSearchModal(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/60 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-bold text-zinc-200 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                        {item.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-zinc-500">
                    Nenhum resultado encontrado para "{searchQuery}".
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
