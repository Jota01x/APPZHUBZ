import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Copy, Check, Users, TrendingUp, DollarSign, Share2, Eye, EyeOff } from 'lucide-react';

const Referral: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const referralLink = "https://appzhub.site/cupom";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Indicações Totais', value: '8', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Indicações Convertidas', value: '8', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Total Recebido', value: 'R$ 400,00', icon: Gift, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ];

  return (
    <div className="h-full flex flex-col space-y-8 overflow-hidden max-w-[1200px] mx-auto w-full py-4 px-2">
      <header className="flex flex-col">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Indique e Ganhe</h2>
        <p className="text-zinc-400 font-medium text-sm">Convide amigos e ganhe R$ 50,00 quando eles realizarem a primeira venda</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              {stat.label === 'Total Recebido' && (
                <button 
                  onClick={() => setIsVisible(!isVisible)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-500 hover:text-white"
                >
                  {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-white tracking-tighter">
              {stat.label === 'Total Recebido' && !isVisible ? '••••••' : stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[#09090b] border border-zinc-900 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl">
                <Share2 size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Seu Link de Afiliado</h4>
                <p className="text-zinc-500 text-xs font-medium">Compartilhe este link para começar a ganhar</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
              <div className="flex-1 w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl font-mono text-xs text-zinc-400 overflow-hidden truncate">
                {referralLink}
              </div>
              <button
                onClick={copyToClipboard}
                className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95 shadow-xl shadow-white/5'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-500">1</div>
                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Compartilhe</h5>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase">Envie seu link para contatos interessados em vender mais.</p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-500">2</div>
                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Eles Assinam</h5>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase">Seu indicado contrata um de nossos planos profissionais.</p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-500">3</div>
                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Você Ganha</h5>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase">Receba R$ 50,00 fixos assim que seu indicado realizar a primeira venda.</p>
              </div>
            </div>

            <div className="mt-10 p-4 bg-indigo-600/5 border border-indigo-600/10 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-indigo-600/10 text-indigo-500 rounded-lg shrink-0">
                <Gift size={16} />
              </div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed tracking-wider">
                <span className="text-white">Aviso Importante:</span> O bônus de R$ 50,00 é fornecido diretamente pela nossa plataforma e é válido <span className="text-indigo-400">apenas uma vez</span> por indicado. O crédito é liberado automaticamente após a <span className="text-white">primeira venda</span> realizada pelo seu convidado.
              </p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col"
        >
          <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Últimas Atividades</h4>
          <div className="space-y-6">
            {[
              { name: 'Rafael', date: 'Ontem', status: 'Indicação', amount: 'R$ 50,00' },
              { name: 'Beatriz M.', date: 'Ontem', status: 'Indicação', amount: 'R$ 50,00' },
              { name: 'Rafael', date: 'Há 2 dias', status: 'Inscrito', amount: null },
              { name: 'Beatriz M.', date: 'Há 2 dias', status: 'Inscrito', amount: null },
              { name: 'Lucas H.', date: 'Há 2 dias', status: 'Indicação', amount: 'R$ 50,00' },
              { name: 'Pedro Lima', date: 'Há 2 dias', status: 'Indicação', amount: 'R$ 50,00' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between pb-6 border-b border-zinc-800 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-400">
                    {activity.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-tight">{activity.name}</p>
                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-[9px] font-black uppercase tracking-widest ${activity.status === 'Indicação' ? 'text-emerald-500' : 'text-blue-500'}`}>
                    {activity.status}
                  </p>
                  {activity.amount && <p className="text-xs font-black text-white mt-0.5">{activity.amount}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Referral;
