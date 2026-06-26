import React, { useState } from 'react';
import { User, HelpCircle, Copy, Check, X, BarChart3, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage, DashboardStats } from '../lib/storage';

const Settings: React.FC = () => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tempStats, setTempStats] = useState<DashboardStats>(storage.getStats());
  const [tempPrice, setTempPrice] = useState<number>(storage.getSalePrice());
  
  const user = storage.getUser();

  const handleSaveStats = () => {
    storage.saveStats(tempStats);
    storage.saveSalePrice(tempPrice);
    setIsStatsModalOpen(false);
    window.location.reload();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('appzhub@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { 
      title: 'Dashboard', 
      icon: BarChart3, 
      desc: 'Modificar métricas de vendas e estruturas.',
      onClick: () => {
        setTempStats(storage.getStats());
        setIsStatsModalOpen(true);
      }
    },
    { 
      title: 'Suporte', 
      icon: HelpCircle, 
      desc: 'Fale com nossa equipe técnica e tire suas dúvidas.',
      onClick: () => setIsSupportModalOpen(true)
    },
  ];

  return (
    <div className="max-w-4xl space-y-8 relative">
      <div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Configurações</h2>
        <p className="text-zinc-400 font-medium text-sm">Acesse nossos canais de auxílio técnico e gerência.</p>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="divide-y divide-zinc-800/50">
          {sections.map((section) => (
            <button
              key={section.title}
              onClick={section.onClick}
              className="w-full flex items-center p-8 hover:bg-zinc-950 transition-all text-left group"
            >
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-500 group-hover:text-indigo-400 group-hover:border-indigo-900/50 transition-all mr-6">
                <section.icon size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-zinc-100 uppercase tracking-tighter text-sm mb-1">{section.title}</h4>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors font-medium">{section.desc}</p>
              </div>
              <div className="text-zinc-800 group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1">
                <span className="text-2xl font-light">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Modal de Dashboard */}
      <AnimatePresence>
        {isStatsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStatsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                   <div className="p-3 bg-indigo-600/10 rounded-2xl">
                     <BarChart3 className="text-indigo-500" size={24} />
                   </div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tighter">Gerenciar Métricas</h3>
                </div>
                <button 
                  onClick={() => setIsStatsModalOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8 p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Webhook de Integração</h4>
                <div className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-mono text-zinc-500 truncate">https://api.omnisaas.com.br/webhook/v1/7f3e82b1-9c4d-4e5b-a6f9-0d21a8c3</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('https://api.omnisaas.com.br/webhook/v1/7f3e82b1-9c4d-4e5b-a6f9-0d21a8c3');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-2 px-1">Copie esta URL para integrar com plataformas externas</p>
              </div>

              <div className="mb-8 p-6 bg-indigo-600/5 border border-indigo-600/20 rounded-2xl space-y-4">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Configuração de Valor</h4>
                <div className="space-y-2">
                  <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest px-1">Valor por Venda (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold text-xs focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(Object.keys(tempStats) as Array<keyof DashboardStats>).map((range) => (
                  <div key={range} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{range}</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest px-1">Estruturas</label>
                        <input 
                          type="number"
                          value={tempStats[range].structures}
                          onChange={(e) => setTempStats({
                            ...tempStats,
                            [range]: { ...tempStats[range], structures: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest px-1">Vendas</label>
                        <input 
                          type="number"
                          value={tempStats[range].sold}
                          onChange={(e) => setTempStats({
                            ...tempStats,
                            [range]: { ...tempStats[range], sold: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveStats}
                className="w-full mt-8 py-5 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-100 transition-all flex items-center justify-center space-x-3"
              >
                <Save size={16} />
                <span>Salvar Painel</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Suporte */}
      <AnimatePresence>
        {isSupportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
              
              <button 
                onClick={() => setIsSupportModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="text-indigo-500" size={32} />
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Canal de Suporte</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                Copie o endereço abaixo para iniciar um atendimento via e-mail.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center justify-between group">
                <span className="font-mono text-xs text-indigo-400 font-bold">appzhub@gmail.com</span>
                <button 
                  onClick={copyEmail}
                  className="p-2 hover:bg-zinc-900 rounded-lg transition-colors text-zinc-500 hover:text-indigo-400"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsSupportModalOpen(false)}
                  className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                >
                  Entendi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
