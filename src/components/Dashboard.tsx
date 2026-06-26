import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShoppingBag, BarChart3, Plus, Globe, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { View } from '../types';
import { storage } from '../lib/storage';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [activeRange, setActiveRange] = useState<'hoje' | '7dias' | '30dias' | 'sempre'>('7dias');
  const [dbStats, setDbStats] = useState(storage.getStats());

  useEffect(() => {
    const refresh = () => setDbStats(storage.getStats());
    refresh();

    window.addEventListener('dashboard-refresh', refresh);
    return () => window.removeEventListener('dashboard-refresh', refresh);
  }, [activeRange]);

  const getChartData = () => {
    switch (activeRange) {
      case 'hoje':
        return [
          { time: '00h', value: 12 },
          { time: '06h', value: 45 },
          { time: '12h', value: 89 },
          { time: '18h', value: 64 },
          { time: '23h', value: 32 },
        ];
      case '7dias':
        return [
          { time: 'Segunda', value: 450 },
          { time: 'Terça', value: 380 },
          { time: 'Quarta', value: 520 },
          { time: 'Quinta', value: 610 },
          { time: 'Sexta', value: 490 },
          { time: 'Sábado', value: 720 },
          { time: 'Domingo', value: 680 },
        ];
      case '30dias':
        return [
          { time: 'Semana 1', value: 2400 },
          { time: 'Semana 2', value: 3100 },
          { time: 'Semana 3', value: 2800 },
          { time: 'Semana 4', value: 4200 },
        ];
      case 'sempre':
        return [
          { time: 'Jan', value: 12000 },
          { time: 'Fev', value: 15000 },
          { time: 'Mar', value: 18500 },
          { time: 'Abr', value: 16200 },
          { time: 'Mai', value: 21000 },
          { time: 'Jun', value: 24500 },
        ];
      default:
        return [];
    }
  };

  const chartData = getChartData();
  const currentPrice = storage.getSalePrice();

  const data = {
    hoje: { 
      sales: chartData, 
      total: `R$ ${(dbStats.hoje.sold * currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      structures: dbStats.hoje.structures, 
      sold: dbStats.hoje.sold 
    },
    '7dias': { 
      sales: chartData, 
      total: `R$ ${(dbStats['7dias'].sold * currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      structures: dbStats['7dias'].structures, 
      sold: dbStats['7dias'].sold 
    },
    '30dias': { 
      sales: chartData, 
      total: `R$ ${(dbStats['30dias'].sold * currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      structures: dbStats['30dias'].structures, 
      sold: dbStats['30dias'].sold 
    },
    sempre: { 
      sales: chartData, 
      total: `R$ ${(dbStats.sempre.sold * currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      structures: dbStats.sempre.structures, 
      sold: dbStats.sempre.sold 
    }
  };

  const ranges = [
    { id: 'hoje', label: 'Hoje' },
    { id: '7dias', label: '7 Dias' },
    { id: '30dias', label: '30 Dias' },
    { id: 'sempre', label: 'Tudo' },
  ] as const;

  return (
    <div className="flex flex-col space-y-6 w-full max-w-[1200px] mx-auto py-4">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Visão Geral</h2>
          <p className="text-zinc-400 font-medium text-sm">Métricas de performance em tempo real</p>
        </div>
        
        <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-full shadow-lg">
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => setActiveRange(range.id)}
              className={`px-5 py-2 text-[9px] uppercase font-black tracking-widest rounded-full transition-all duration-300 ${
                activeRange === range.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Unified Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-none bg-[#09090b] border border-zinc-900 rounded-[2.5rem] flex flex-col relative overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]"
      >
        {/* Info Area */}
        <div className="p-10 pb-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Fluxo de Vendas Ativo</span>
          </div>

          <div className="flex items-baseline gap-4">
            <h3 className="text-5xl font-black text-white tracking-tighter leading-none">
              {data[activeRange].total}
            </h3>
            <span className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.2em] mt-2">Receita Bruta</span>
          </div>
        </div>

        {/* Chart View */}
        <div className="h-[280px] w-full mt-4" key={activeRange}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 60 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#3f3f46', fontSize: 11, fontWeight: 900 }}
                dy={20}
                padding={{ left: 60, right: 60 }}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #18181b', borderRadius: '16px', padding: '16px' }}
                itemStyle={{ display: 'none' }}
                labelStyle={{ color: '#fff', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}
                cursor={{ stroke: '#eab308', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#eab308" 
                strokeWidth={5}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Row Grid (Internal) */}
        <div className="grid grid-cols-2 border-t border-zinc-900 bg-zinc-950/30">
          <div className="p-8 border-r border-zinc-900 flex flex-col items-center justify-center hover:bg-zinc-900/40 transition-colors">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-3">Estruturas Criadas</p>
            <div className="flex items-center gap-4">
              <h4 className="text-4xl font-black text-white tracking-tighter">{data[activeRange].structures}</h4>
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                <BarChart3 size={18} />
              </div>
            </div>
          </div>
          <div className="p-8 flex flex-col items-center justify-center hover:bg-zinc-900/40 transition-colors">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-3">Sites Vendidos</p>
            <div className="flex items-center gap-4">
              <h4 className="text-4xl font-black text-white tracking-tighter">{data[activeRange].sold}</h4>
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                <ShoppingBag size={18} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary Action Button (Centered) */}
      <div className="flex justify-center pb-12">
        <button 
          onClick={() => setView('sites')}
          className="px-12 py-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-white rounded-2xl transition-all group flex items-center gap-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] active:scale-95"
        >
          <span className="text-[12px] font-black uppercase tracking-[0.4em]">Criar Nova Estrutura</span>
          <div className="p-1 bg-white/5 rounded-lg group-hover:bg-white group-hover:text-zinc-950 transition-all">
            <TrendingUp size={18} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
