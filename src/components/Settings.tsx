import React, { useState } from 'react';
import { 
  HelpCircle, 
  Copy, 
  Check, 
  Save, 
  DollarSign, 
  Webhook, 
  Sliders, 
  Mail,
  RefreshCw,
  BarChart3,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';
import { storage, DashboardStats } from '../lib/storage';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'commercial' | 'integrations' | 'support' | 'data'>('commercial');

  // Commercial / Pricing state
  const [ticketPrice, setTicketPrice] = useState(storage.getSalePrice().toString());
  const [ticketSaved, setTicketSaved] = useState(false);

  // Dashboard Stats state (Hoje, 7 dias, 30 dias, Histórico/Sempre)
  const [stats, setStats] = useState<DashboardStats>(storage.getStats());
  const [statsSaved, setStatsSaved] = useState(false);

  // Copy helpers
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dataResetDone, setDataResetDone] = useState(false);

  const handleSavePrice = () => {
    const val = parseFloat(ticketPrice.replace(',', '.'));
    if (!isNaN(val) && val > 0) {
      storage.saveSalePrice(val);
      setTicketSaved(true);
      setTimeout(() => setTicketSaved(false), 2500);
      window.dispatchEvent(new Event('dashboard-refresh'));
    }
  };

  const handleStatChange = (
    period: keyof DashboardStats,
    field: 'structures' | 'sold',
    val: string
  ) => {
    const parsed = parseInt(val, 10);
    const validNum = isNaN(parsed) ? 0 : Math.max(0, parsed);
    setStats(prev => ({
      ...prev,
      [period]: {
        ...prev[period],
        [field]: validNum
      }
    }));
  };

  const handleSaveStats = () => {
    storage.saveStats(stats);
    setStatsSaved(true);
    setTimeout(() => setStatsSaved(false), 2500);
    window.dispatchEvent(new Event('dashboard-refresh'));
  };

  const webhookUrl = 'https://api.pagevo.ia/v1/webhook/7f3e82b1-9c4d-4e5b-a6f9-0d21a8c3';

  const periodsConfig: Array<{
    key: keyof DashboardStats;
    label: string;
    sublabel: string;
  }> = [
    { key: 'hoje', label: 'Hoje', sublabel: 'Métricas do dia atual' },
    { key: '7dias', label: '7 Dias', sublabel: 'Métricas dos últimos 7 dias' },
    { key: '30dias', label: '30 Dias', sublabel: 'Métricas dos últimos 30 dias' },
    { key: 'sempre', label: 'Histórico', sublabel: 'Histórico consolidado (Sempre)' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-500 font-bold">
            GERENCIAMENTO DO NÚCLEO
          </span>
          <span className="text-zinc-600">·</span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            SISTEMA CONFIG
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Configurações do Sistema
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Gerencie parâmetros de oferta, métricas do painel e conexões externas.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-2xl gap-1 overflow-x-auto custom-scrollbar">
        {[
          { id: 'commercial', label: 'Parâmetros de Oferta & Painel', icon: DollarSign },
          { id: 'integrations', label: 'Webhooks & Conexões', icon: Webhook },
          { id: 'support', label: 'Canal de Suporte', icon: HelpCircle },
          { id: 'data', label: 'Dados & Cache', icon: RefreshCw },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Commercial & Dashboard Parameters */}
      {activeTab === 'commercial' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Base Ticket Price */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-400">
              <Sliders size={22} />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                Precificação Base da Oferta
              </h2>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
              Defina o valor base cobrado por estrutura de landing page. Esse valor é utilizado no cálculo do fluxo financeiro e nos demonstrativos do painel.
            </p>

            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Valor Padrão por Estrutura (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-bold">
                    R$
                  </span>
                  <input
                    type="text"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    placeholder="500,00"
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-base font-extrabold focus:border-red-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleSavePrice}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                {ticketSaved ? <Check size={16} /> : <Save size={16} />}
                <span>{ticketSaved ? 'Preço Salvo com Sucesso!' : 'Atualizar Preço Base'}</span>
              </button>
            </div>
          </div>

          {/* Edit Dashboard Metrics (Hoje, 7 dias, 30 dias, Histórico) */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-red-400">
                <BarChart3 size={22} />
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                    Editar Métricas do Painel (Dashboard)
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Configure as estruturas geradas e as vendas realizadas para cada período temporal.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveStats}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/25 active:scale-95 shrink-0"
              >
                {statsSaved ? <Check size={16} /> : <Save size={16} />}
                <span>{statsSaved ? 'Métricas Salvas!' : 'Salvar Métricas do Painel'}</span>
              </button>
            </div>

            {/* Grid of 4 Periods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {periodsConfig.map((period) => (
                <div
                  key={period.key}
                  className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <span>{period.label}</span>
                      </h3>
                      <p className="text-[10px] text-zinc-500 font-semibold">{period.sublabel}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-red-950/60 text-red-400 border border-red-900/50 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {period.key}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Structures Generated */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                        <Layers size={11} className="text-zinc-500" />
                        <span>Estruturas</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={stats[period.key].structures}
                        onChange={(e) => handleStatChange(period.key, 'structures', e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm font-black focus:border-red-500 outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>

                    {/* Sales Made */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                        <ShoppingBag size={11} className="text-emerald-500" />
                        <span>Vendas</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={stats[period.key].sold}
                        onChange={(e) => handleStatChange(period.key, 'sold', e.target.value)}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm font-black focus:border-red-500 outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Save Reminder */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
              <p className="text-[11px] text-zinc-500 font-medium text-center sm:text-left">
                💡 Ao salvar, o gráfico de evolução, faturamento e taxas de conversão do painel atualizarão instantaneamente.
              </p>
              <button
                onClick={handleSaveStats}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                {statsSaved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                <span>{statsSaved ? 'Atualizado no Painel' : 'Aplicar Alterações'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Integrations & Webhook */}
      {activeTab === 'integrations' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center gap-3 text-red-400">
            <Webhook size={22} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Conector Global de Webhooks
            </h2>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Utilize este endpoint para disparar notificações automáticas para CRM, Make ou Zapier quando uma nova estrutura for finalizada ou vendida.
          </p>

          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
              URL do Webhook Oficial
            </span>
            <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-xs font-mono text-zinc-300 truncate flex-1">
                {webhookUrl}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(webhookUrl);
                  setCopiedWebhook(true);
                  setTimeout(() => setCopiedWebhook(false), 2000);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                  copiedWebhook ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {copiedWebhook ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedWebhook ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Método: <span className="font-mono text-zinc-400 font-bold">POST</span> · Payload: <span className="font-mono text-zinc-400">JSON</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Tab 3: Support */}
      {activeTab === 'support' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center gap-3 text-red-400">
            <Mail size={22} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Canal de Atendimento Técnico
            </h2>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Precisa de auxílio com a estrutura, dúvidas sobre abordagem ou modelos de vendas? Fale diretamente com o suporte técnico.
          </p>

          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
              E-mail de Suporte Direto
            </span>
            <div className="flex items-center justify-between p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-xs font-mono font-bold text-zinc-200">
                rodrigosuporteapp@gmail.com
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('rodrigosuporteapp@gmail.com');
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  copiedEmail ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title="Copiar e-mail"
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Tempo médio de resposta: menos de 2 horas úteis.
            </p>
          </div>
        </motion.div>
      )}

      {/* Tab 4: Data & Cache */}
      {activeTab === 'data' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center gap-3 text-red-400">
            <RefreshCw size={22} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Gerenciamento de Armazenamento & Dados
            </h2>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Controle os dados persistidos no navegador local. Útil para resetar simulações ou restaurar as estruturas de demonstração originais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">
                Resetar Dados Locais
              </h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Remove todas as estruturas criadas e restaura os números iniciais do painel, mantendo sua sessão autenticada.
              </p>
              <button
                onClick={() => {
                  storage.clearAll();
                  setStats(storage.getStats());
                  setDataResetDone(true);
                  setTimeout(() => setDataResetDone(false), 2000);
                  window.dispatchEvent(new Event('dashboard-refresh'));
                }}
                className="w-full py-3 bg-zinc-900 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                {dataResetDone ? 'Dados Resetados!' : 'Limpar e Reiniciar'}
              </button>
            </div>

            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">
                Status do Sistema
              </h3>
              <div className="space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between border-b border-zinc-900 pb-1">
                  <span>Versão do Sistema</span>
                  <span className="text-red-400 font-bold">Engine v2.4</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-1">
                  <span>Modo de Operação</span>
                  <span className="text-emerald-400 font-bold">Produção Local</span>
                </div>
                <div className="flex justify-between">
                  <span>Chave Operacional</span>
                  <span className="text-zinc-300 font-bold">5050 (Fixa)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
