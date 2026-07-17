import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Briefcase, Zap, MessageSquare, Copy, Check, MessageCircle, Star, ChevronRight, Search } from 'lucide-react';
import { View } from '../types';

interface Props {
  setView?: (view: View) => void;
}

const Approaches: React.FC<Props> = ({ setView }) => {
  const [projectName, setProjectName] = useState('');
  const [niche, setNiche] = useState('');
  const [offerPrice, setOfferPrice] = useState('500,00');
  const [businessPhone, setBusinessPhone] = useState('');
  const [activeApproach, setActiveApproach] = useState(0);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [showContinuation, setShowContinuation] = useState(false);

  const approaches = [
    {
      id: 1,
      title: "Abordagem 1 — Curiosidade e Valor",
      description: "Foco em mostrar o modelo personalizado sem compromisso.",
      icon: <Search className="text-emerald-400" size={18} />,
      steps: [
        { label: "1. Abertura", msg: `Olá! Tudo bem? Eu falo com o proprietário da ${projectName || '(empresa)'}?` },
        { label: "2. O Contexto", msg: "Estava pesquisando empresas da sua região no Google e encontrei a de vocês." },
        { label: "3. A Oportunidade", msg: "Percebi que ainda existem algumas oportunidades para atrair mais clientes pelo Google, então resolvi criar um modelo de página personalizado para mostrar como a empresa poderia ficar." },
        { label: "4. Desapego", msg: "Não fiz isso para gerar nenhum compromisso, apenas achei que poderia agregar valor." },
        { label: "5. Chamada para Ação", msg: "Posso te enviar o link para você dar uma olhada? Se gostar, te explico como ele pode ajudar a gerar mais clientes através do Google." },
      ],
      continuationSteps: [
        { label: "Confirmação", msg: "Perfeito! 😄" },
        { label: "Envio do Link", msg: "Segue o link para você conferir:\n*[LINK DO SITE]*" },
        { label: "Proposta de Valor", msg: "Criei esse modelo pensando na sua empresa, com foco em transmitir mais credibilidade, facilitar o contato dos clientes e aumentar as chances de ser encontrada no Google." },
        { label: "Orçamento", msg: "Se esse estilo fizer sentido para o seu negócio, posso fazer um orçamento sem compromisso." },
        { label: "Diferencial", msg: "O orçamento é *100% gratuito*, sem qualquer obrigação de fechar. E caso decida seguir, o site é entregue com *pagamento único*, sem mensalidades ou assinaturas, sendo seu de forma vitalícia." },
        { label: "Chamada para Ação", msg: "Se quiser receber o orçamento, é só me responder *\"Pode enviar\"*. 😊" }
      ]
    },
    {
      id: 2,
      title: "Abordagem 2 — Portfólio e Estilo",
      description: "Foco em mostrar autoridade através de projetos anteriores.",
      icon: <Zap className="text-blue-400" size={18} />,
      steps: [
        { label: "1. Abertura", msg: `Olá! Tudo bem? Eu falo com o proprietário da ${projectName || '(empresa)'}?` },
        { label: "2. Apresentação", msg: "Estou desenvolvendo páginas focadas em ajudar empresas a aparecerem melhor no Google e conquistarem mais clientes." },
        { label: "3. Prova Social", msg: "Recentemente finalizei alguns projetos e achei que poderia fazer sentido mostrar para vocês como eles ficaram." },
        { label: "4. A Proposta", msg: "Posso te enviar alguns exemplos? Se você gostar do estilo, consigo criar um modelo totalmente personalizado para a sua empresa também." },
      ],
      continuationSteps: [
        { label: "Confirmação", msg: "Perfeito! 😄" },
        { label: "Envio do Modelo", msg: "Segue o modelo que preparei para a sua empresa:\n*[LINK DO SITE]*" },
        { label: "Objetivo", msg: "A ideia é mostrar como sua empresa pode ter uma presença mais profissional na internet e aumentar as oportunidades de conquistar clientes pelo Google." },
        { label: "Orçamento", msg: "Se você gostar da proposta, posso preparar um orçamento totalmente sem compromisso." },
        { label: "Diferencial", msg: "Você *não paga nada para receber o orçamento* e, caso aprove, o site é adquirido com *pagamento único*, sem mensalidades, ficando seu de forma vitalícia." },
        { label: "Chamada para Ação", msg: "Se fizer sentido para você, me responda apenas *\"Quero o orçamento\"* que eu preparo tudo." }
      ]
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

      {/* Configuração Rápida */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center space-x-3 text-indigo-400 mb-2">
          <Search size={18} />
          <h3 className="text-xs font-black uppercase tracking-[0.2em]">Configuração dos Scripts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nome da Empresa</label>
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Ex: Pizzaria Valle"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nicho da Empresa</label>
            <input 
              type="text" 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Ex: Pizzaria"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Valor do site (R$)</label>
            <input 
              type="text" 
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="500,00"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">WhatsApp (Opcional)</label>
            <input 
              type="text" 
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {approaches.map((approach, index) => (
          <button
            key={approach.id}
            onClick={() => {
              setActiveApproach(index);
              setShowContinuation(false);
            }}
            className={`flex items-center justify-center space-x-3 px-4 py-4 rounded-2xl border transition-all ${
              activeApproach === index 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105' 
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
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center">
                {approaches[activeApproach].icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-zinc-100 uppercase tracking-tight">{approaches[activeApproach].title}</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  {approaches[activeApproach].description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {approaches[activeApproach].steps.map((step, sIndex) => (
                <div key={sIndex} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{step.label}</span>
                    <button 
                      onClick={() => handleCopyPreset(step.msg, `${activeApproach}-${sIndex}`)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        copiedId === `${activeApproach}-${sIndex}` ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {copiedId === `${activeApproach}-${sIndex}` ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copiedId === `${activeApproach}-${sIndex}` ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <p className="text-sm font-medium text-zinc-300 leading-relaxed">
                    "{step.msg}"
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              {!showContinuation ? (
                <button
                  onClick={() => setShowContinuation(true)}
                  className="w-full py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-3 group"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  Ver Continuação da Abordagem
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Sequência de Continuação</span>
                  </div>
                  
                  <div className="space-y-3">
                    {approaches[activeApproach].continuationSteps?.map((step, sIndex) => (
                      <div key={sIndex} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 relative group hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{step.label}</span>
                          <button 
                            onClick={() => handleCopyPreset(step.msg, `${activeApproach}-cont-${sIndex}`)}
                            className={`flex items-center space-x-2 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                              copiedId === `${activeApproach}-cont-${sIndex}` ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                            }`}
                          >
                            {copiedId === `${activeApproach}-cont-${sIndex}` ? <Check size={8} /> : <Copy size={8} />}
                            <span>{copiedId === `${activeApproach}-cont-${sIndex}` ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>
                        <p className="text-sm font-medium text-zinc-300 leading-relaxed whitespace-pre-wrap">
                          {step.msg}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowContinuation(false)}
                    className="text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors mx-auto block mt-4"
                  >
                    Ocultar Continuação
                  </button>
                </motion.div>
              )}
            </div>

            {/* WhatsApp Action */}
            {businessPhone && (
              <div className="pt-8 border-t border-zinc-800">
                <button
                  onClick={() => {
                    const phone = businessPhone.replace(/\D/g, '');
                    const fullMsg = approaches[activeApproach].steps.map(s => s.msg).join('\n\n');
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMsg)}`;
                    window.open(url, '_blank');
                  }}
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] group active:scale-95"
                >
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  Iniciar Conversa no WhatsApp
                </button>
              </div>
            )}
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

        <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-3xl p-6 flex items-center gap-6">
          <Zap size={24} className="text-indigo-400 shrink-0" />
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
            Lembre-se: vender <span className="text-indigo-400">resultados</span> é mais poderoso que vender apenas um site. Use os modelos acima como base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Approaches;
