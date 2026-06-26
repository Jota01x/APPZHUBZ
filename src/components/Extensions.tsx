import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Puzzle, CheckCircle2, Download, Star, Webhook, Plus, Trash2, Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { storage } from '../lib/storage';

import { View } from '../types';

interface ExtensionsProps {
  setView?: (view: View) => void;
}

const Extensions: React.FC<ExtensionsProps> = ({ setView }) => {
  const [webhooks, setWebhooks] = useState<{ id: string; name: string; url: string }[]>([]);
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newWebhookName, setNewWebhookName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setWebhooks(storage.getWebhooks());
  }, []);

  const extensions = [
    { 
      title: 'Netlify Pro', 
      desc: 'A melhor plataforma para hospedar e gerenciar seus sites com performance e segurança.', 
      icon: '🌐', 
      rating: 4.8, 
      buttonText: 'Acessar Netlify',
      url: 'https://www.netlify.com/' 
    },
    { 
      title: 'WA Web Sender', 
      desc: 'Solução completa para automação de mensagens e marketing no WhatsApp.', 
      icon: '💬', 
      rating: 5.0, 
      buttonText: 'Download Extensão',
      url: 'https://wawebsender.com/br' 
    },
    { 
      title: 'Webhook Integrator', 
      desc: 'Conecte o APPZHUB com Zapier, Make e outros sistemas via Webhooks.', 
      icon: '⚡', 
      rating: 4.9, 
      isTool: true
    },
  ];

  const addWebhook = () => {
    // Simulação de integração - limpa os campos e volta para o painel
    setShowAddWebhook(false);
    setNewWebhookName('');
    setNewWebhookUrl('');
    
    if (setView) {
      setView('dashboard');
    }
  };

  const removeWebhook = (id: string) => {
    storage.removeWebhook(id);
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Mercado de Extensões</h2>
        <p className="text-zinc-400 font-medium text-sm">Acesse ferramentas exclusivas para potencializar seus resultados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extensions.map((ext, index) => (
          <motion.div
            key={ext.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl flex flex-col h-full group hover:border-indigo-500/30 transition-all relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${ext.isTool ? 'bg-indigo-600/5' : ext.title.includes('Netlify') ? 'bg-indigo-600/5' : 'bg-emerald-600/5'} blur-3xl -mr-16 -mt-16`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center text-3xl border border-zinc-800 shadow-xl group-hover:scale-110 transition-transform">
                {ext.icon}
              </div>
              <div className={`flex items-center space-x-1.5 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl ${ext.isTool || ext.title.includes('Netlify') ? 'text-indigo-400' : 'text-emerald-500'}`}>
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-black text-zinc-100">{ext.rating}</span>
              </div>
            </div>
            
            <div className="relative z-10 flex-1">
              <h3 className={`font-black text-2xl text-zinc-100 mb-2 uppercase tracking-tight group-hover:${ext.isTool || ext.title.includes('Netlify') ? 'text-indigo-400' : 'text-emerald-400'} transition-colors`}>{ext.title}</h3>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wide leading-relaxed opacity-80">{ext.desc}</p>
            </div>
            
            <div className="mt-8 relative z-10">
              {ext.url ? (
                <a 
                  href={ext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center space-x-2 py-5 ${ext.title.includes('Netlify') ? 'bg-zinc-100 text-zinc-950 hover:bg-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'} rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95`}
                >
                  {ext.title.includes('Netlify') ? <Globe size={18} /> : <Download size={18} />}
                  <span>{ext.buttonText}</span>
                </a>
              ) : (
                <button 
                  onClick={() => setShowAddWebhook(true)}
                  className="w-full flex items-center justify-center space-x-2 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  <Webhook size={18} />
                  <span>Configurar Webhook</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddWebhook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <Webhook size={24} />
                  <h3 className="text-xl font-bold uppercase tracking-tight">Nova Integração Webhook</h3>
                </div>
                <button onClick={() => setShowAddWebhook(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Fake APPZHUB Webhook URL */}
                <div className="p-6 bg-indigo-600/5 border border-indigo-600/20 rounded-2xl">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Conector APPZHUB (Recomendado)</h4>
                  <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] font-mono text-zinc-400 truncate">https://api.appzhub.com.br/v1/webhook/7f3e82b1-9c4d-4e5b-a6f9-0d21a8c3</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('https://api.appzhub.com.br/v1/webhook/7f3e82b1-9c4d-4e5b-a6f9-0d21a8c3', 'appzhub-fake')}
                      className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    >
                      {copiedId === 'appzhub-fake' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-2 px-1">Copie este link para integrar sua estrutura com o ecossistema APPZHUB.</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-800"></span>
                  </div>
                  <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-black text-zinc-700">
                    <span className="bg-zinc-900 px-4">Ou adicione manualmente</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Nome da Integração</label>
                    <input
                      type="text"
                      value={newWebhookName}
                      onChange={(e) => setNewWebhookName(e.target.value)}
                      placeholder="Ex: Enviar para o Zapier"
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-800 font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">URL do Webhook</label>
                    <input
                      type="text"
                      value={newWebhookUrl}
                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                      placeholder="https://hooks.zapier.com/..."
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-800 font-bold"
                    />
                  </div>

                  <button 
                    onClick={addWebhook}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                  >
                    Confirmar Integração Personalizada
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {webhooks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-indigo-400 mb-4 px-2">
            <CheckCircle2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Minhas Integrações Ativas</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {webhooks.map((webhook) => (
              <motion.div 
                layout
                key={webhook.id}
                className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400">
                    <Webhook size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-100 text-sm">{webhook.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-medium truncate max-w-[200px]">{webhook.url}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => copyToClipboard(webhook.url, webhook.id)}
                    className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white hover:border-zinc-700 transition-all"
                    title="Copiar URL"
                  >
                    {copiedId === webhook.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                  <button 
                    onClick={() => removeWebhook(webhook.id)}
                    className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-red-500 hover:border-red-900/50 transition-all"
                    title="Remover"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* API Documentation Shortcut */}
      <div className="p-8 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-400 border border-zinc-800">
            <ExternalLink size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white uppercase tracking-tight">Documentação da API</h3>
            <p className="text-xs text-zinc-500 font-medium uppercase">Aprenda a conectar aplicativos externos ao APPZHUB via REST API.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-zinc-800 text-zinc-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all active:scale-95">
          Ver Documentação
        </button>
      </div>
    </div>
  );
};

export default Extensions;
