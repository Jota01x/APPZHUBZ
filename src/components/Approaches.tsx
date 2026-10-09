import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Copy, Check, Star, Search } from 'lucide-react';
import { View } from '../types';

interface Props {
  setView?: (view: View) => void;
}

const Approaches: React.FC<Props> = ({ setView }) => {
  const [activeApproach, setActiveApproach] = useState(0);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  const approaches = [
    {
      id: 1,
      title: "Abordagem 1 — Instagram & Contato Rápido",
      description: "Conexão amigável via Instagram, contraste com ausência no Google e oferta de prévia sem compromisso.",
      icon: <Search className="text-emerald-400" size={18} />,
      fullText: `Oi! Tudo bem? 😊\n\nVi o trabalho da sua empresa no Instagram, muito bom! Posso te fazer uma pergunta rápida?\n\nEntão, procurei sua empresa no Google e vi que vocês ainda não têm um site, né?\n\nTe pergunto porque criei um site recente para uma empresa de mesmo segmento e ele já está trazendo clientes novos pelo Google e pelo Instagram. Dá uma olhada: [link do site]\n\nFicou simples, rápido e já leva a pessoa direto para o WhatsApp. Achei que combinaria muito com vocês.\n\nSe quiser, monto uma ideia de como ficaria o de vocês, sem compromisso. Faz sentido para você?`,
    },
    {
      id: 2,
      title: "Abordagem 2 — Demanda de Busca no Google",
      description: "Qualificação de canal de entrada de clientes e apresentação de oportunidade perdida nas buscas locais.",
      icon: <Target className="text-red-400" size={18} />,
      fullText: `Oiii! Tudo bem?\n\nHoje a maioria dos clientes de vocês chega mais por Instagram ou por indicação?\n\nEntendi! Isso é muito comum. A maioria das empresas que atendo estava assim também.\n\nNotei que sua empresa ainda não aparece no Google quando alguém pesquisa na sua região. É um público que já quer comprar e hoje está indo para outros.\n\nFiz um site assim para uma empresa de segmento parecido, olha como ficou: [link do site]\n\nEle aparece nas buscas e conecta com o Instagram, então um alimenta o outro. E o melhor: eu faço de um jeito leve e acessível, pensado para pequenos negócios.\n\nQuer que eu te mostre como ficaria o de vocês?`,
    },
    {
      id: 3,
      title: "Abordagem 3 — Prévia Rápida & Sem Atrito",
      description: "Pitch rápido de 1 minuto, valorizando o conteúdo atual do perfil e resolvendo a parte técnica sem burocracia.",
      icon: <Zap className="text-blue-400" size={18} />,
      fullText: `Olá! Tudo bem? Posso te mostrar uma ideia que fiz pensando em negócios como o seu? Leva 1 minuto 🙂\n\nCrio sites para empresas que querem atrair mais clientes pelo Google e redes sociais.\n\nFiz este aqui para uma empresa no seu nicho de atuação: [link do site]\n\nPercebi que seu negócio ainda não tem um site, e seu perfil tem tudo para converter bem: ótimo conteúdo, só falta ser encontrado por quem pesquisa no Google.\n\nO processo é simples: eu cuido de tudo e você não precisa entender nada de tecnologia. Se quiser, te mando uma prévia de como ficaria, sem custo e sem compromisso.`,
    }
  ];

  const handleCopyPreset = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-2">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Abordagens de Vendas</h2>
        <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest">MODELOS DE SCRIPTS DE ALTA CONVERSÃO PARA PROSPECÇÃO.</p>
      </div>

      {/* Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {approaches.map((approach, index) => (
          <button
            key={approach.id}
            onClick={() => {
              setActiveApproach(index);
            }}
            className={`flex items-center justify-center space-x-3 px-4 py-4 rounded-2xl border transition-all ${
              activeApproach === index 
                ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/20 scale-[1.02]' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
            }`}
          >
            <div className={activeApproach === index ? 'text-white' : ''}>
              {approach.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">{approach.title.split(' — ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          key={approaches[activeApproach].id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0">
                  {approaches[activeApproach].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-100 uppercase tracking-tight">{approaches[activeApproach].title}</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
                    {approaches[activeApproach].description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  handleCopyPreset(approaches[activeApproach].fullText, `full-${activeApproach}`);
                }}
                className={`px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0 ${
                  copiedId === `full-${activeApproach}`
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {copiedId === `full-${activeApproach}` ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === `full-${activeApproach}` ? 'Texto Completo Copiado!' : 'Copiar Texto Completo'}</span>
              </button>
            </div>

            {/* Mensagem Completa Direta */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-7 relative group hover:border-zinc-700 transition-colors shadow-inner">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/80">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                  Script de Alta Conversão
                </span>
                <button 
                  onClick={() => handleCopyPreset(approaches[activeApproach].fullText, `card-${activeApproach}`)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    copiedId === `card-${activeApproach}` ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {copiedId === `card-${activeApproach}` ? <Check size={10} /> : <Copy size={10} />}
                  <span>{copiedId === `card-${activeApproach}` ? 'Copiado' : 'Copiar Script'}</span>
                </button>
              </div>
              <p className="text-sm sm:text-base font-medium text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                {approaches[activeApproach].fullText}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dicas de Vendas */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center space-x-3 text-amber-400">
            <Star size={20} />
            <h4 className="text-md font-black uppercase tracking-widest">Dicas para Fechamento</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Personalização", desc: "Sempre use o nome da pessoa para criar conexão humana imediata." },
              { title: "Impacto Visual", desc: "Mostre o preview do site logo após o diagnóstico para impacto real." },
              { title: "Foco no ROI", desc: "Venda lucro e autoridade, mostre como ele recupera o investimento." },
              { title: "Urgência Real", desc: "Mencione que a estrutura está pronta para ser ativada hoje mesmo." },
              { title: "Objeções", desc: "Explique que o Google é onde o cliente busca quando quer comprar." },
              { title: "Garantia", desc: "Reforce que o pagamento é único e o site é vitalício, sem taxas." }
            ].map((tip, i) => (
              <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-amber-500/30 transition-all">
                <p className="text-[10px] font-black text-white uppercase mb-1 tracking-widest">{tip.title}</p>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-600/5 border border-red-500/10 rounded-3xl p-6 flex items-center gap-6">
          <Zap size={24} className="text-red-400 shrink-0" />
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
            Lembre-se: vender <span className="text-red-400">resultados</span> é mais poderoso que vender apenas um site. Use os modelos acima como base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Approaches;
