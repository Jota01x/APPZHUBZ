import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Globe, 
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { View } from '../types';
import { storage } from '../lib/storage';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [activeRange, setActiveRange] = useState<'hoje' | '7dias' | '30dias' | 'sempre'>('7dias');
  const [dbStats, setDbStats] = useState(storage.getStats());

  const refreshData = () => {
    setDbStats(storage.getStats());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('dashboard-refresh', refreshData);
    return () => window.removeEventListener('dashboard-refresh', refreshData);
  }, [activeRange]);

  const currentPrice = storage.getSalePrice();

  // Chart data simulation tailored to activeRange (Receitas em R$)
  const getChartData = () => {
    const soldCount = dbStats[activeRange].sold;
    const price = currentPrice;

    switch (activeRange) {
      case 'hoje': {
        const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
        return hours.map((hour, idx) => {
          const ratio = (idx + 1) / hours.length;
          const sales = Math.round(soldCount * ratio);
          return {
            time: hour,
            value: sales * price,
            sales,
          };
        });
      }
      case '7dias': {
        const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
        return days.map((day, idx) => {
          const ratio = (idx + 1) / days.length;
          const sales = Math.max(1, Math.round(soldCount * ratio));
          return {
            time: day,
            value: sales * price,
            sales,
          };
        });
      }
      case '30dias': {
        const periods = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
        return periods.map((period, idx) => {
          const ratio = (idx + 1) / periods.length;
          const sales = Math.max(1, Math.round(soldCount * ratio));
          return {
            time: period,
            value: sales * price,
            sales,
          };
        });
      }
      case 'sempre': {
        const months = [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        return months.map((month, idx) => {
          const ratio = (idx + 1) / months.length;
          const sales = Math.max(1, Math.round(soldCount * ratio));
          return {
            time: month,
            value: sales * price,
            sales,
          };
        });
      }
      default:
        return [];
    }
  };

  const chartData = getChartData();
  const currentTotal = dbStats[activeRange].sold * currentPrice;
  const currentStructures = dbStats[activeRange].structures;
  const conversionRate = currentStructures > 0 ? Math.round((dbStats[activeRange].sold / currentStructures) * 100) : 0;

  const ranges = [
    { id: 'hoje', label: 'Hoje' },
    { id: '7dias', label: '7 Dias' },
    { id: '30dias', label: '30 Dias' },
    { id: 'sempre', label: 'Histórico Completo' },
  ] as const;

  return (
    <div className="flex flex-col space-y-8 w-full max-w-7xl mx-auto py-2">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-500 font-bold">
              CENTRAL OPERACIONAL
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              TELEMETRIA COMERCIAL ATIVA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Painel de Controle
          </h1>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {/* Range Switcher */}
          <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-inner shrink-0">
            {ranges.map((range) => (
              <button
                key={range.id}
                onClick={() => setActiveRange(range.id)}
                className={`px-3 sm:px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-all whitespace-nowrap ${
                  activeRange === range.id 
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Precision KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: Faturamento */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Receita Realizada
            </span>
            <div className="p-2 bg-red-600/10 text-red-400 rounded-xl border border-red-500/20">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              R$ {currentTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
            <ArrowUpRight size={12} />
            <span>+24.8% vs período anterior</span>
          </div>
        </motion.div>

        {/* KPI 2: Estruturas Criadas */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Estruturas Geradas
            </span>
            <div className="p-2 bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-700/50">
              <Globe size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {currentStructures}
            </h3>
            <span className="text-xs text-zinc-500 font-bold">ativos</span>
          </div>
          <div className="text-[10px] text-zinc-400 font-medium">
            Modelos prontos para prospecção
          </div>
        </motion.div>

        {/* KPI 3: Sites Vendidos */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Contratos Fechados
            </span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {dbStats[activeRange].sold}
            </h3>
            <span className="text-xs text-emerald-400 font-bold">({conversionRate}%)</span>
          </div>
          <div className="text-[10px] text-zinc-400 font-medium">
            Taxa de conversão por abordagem
          </div>
        </motion.div>
      </div>

      {/* Main Unified Performance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-4 sm:p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-1">
              Fluxo Financeiro
            </span>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Evolução e Receitas
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
              <span>Receitas</span>
            </div>
          </div>
        </div>

        {/* Chart View */}
        <div className="h-[280px] sm:h-[300px] w-full overflow-hidden" key={activeRange}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 32, left: 32, bottom: 25 }}>
              <defs>
                <linearGradient id="panelSalesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis 
                dataKey="time" 
                interval={0}
                axisLine={false} 
                tickLine={false} 
                padding={{ left: 24, right: 24 }}
                tick={(props) => {
                  const { x, y, payload, index } = props;
                  const label = payload.value;
                  const total = chartData.length;
                  // For the very first item, use start anchor if close to border or middle with positive offset
                  const textAnchor = index === 0 ? 'start' : index === total - 1 ? 'end' : 'middle';
                  const dx = index === 0 ? -10 : index === total - 1 ? 10 : 0;
                  
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={dx}
                        y={0}
                        dy={14}
                        textAnchor={textAnchor}
                        fill="#a1a1aa"
                        className="text-[9px] sm:text-xs font-bold select-none"
                      >
                        {label}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis 
                hide 
                domain={['auto', 'auto']} 
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl shadow-2xl">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                          {data.time}
                        </span>
                        <span className="text-base font-black text-white block mt-0.5">
                          R$ {Number(payload[0].value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium mt-1 block">
                          Receita acumulada ({data.sales} {Number(data.sales) === 1 ? 'venda' : 'vendas'})
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#panelSalesGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Launchpad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
        <div 
          onClick={() => setView('approaches')}
          className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl cursor-pointer hover:border-red-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              CONVERSÃO RÁPIDA
            </span>
            <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase group-hover:text-red-400 transition-colors mb-1">
            Scripts de Abordagem WhatsApp
          </h3>
          <p className="text-xs text-zinc-500">
            Modelos de mensagem validados com técnica de desapego e envio de link.
          </p>
        </div>

        <div 
          onClick={() => setView('objections')}
          className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl cursor-pointer hover:border-red-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              QUEBRA DE BARREIRAS
            </span>
            <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase group-hover:text-red-400 transition-colors mb-1">
            Matriz de Reversão de Objeções
          </h3>
          <p className="text-xs text-zinc-500">
            Respostas para "já tenho Instagram", "está caro" e "conhecido faz mais barato".
          </p>
        </div>

        <div 
          onClick={() => setView('extensions')}
          className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl cursor-pointer hover:border-red-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              INTEGRAÇÃO
            </span>
            <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase group-hover:text-red-400 transition-colors mb-1">
            Webhooks & Hub de Automação
          </h3>
          <p className="text-xs text-zinc-500">
            Conecte suas estruturas com Zapier, Make e plataformas de entrega automática.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
