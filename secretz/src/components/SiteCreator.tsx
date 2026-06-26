import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Wand2, Target, Briefcase, Users, MessageSquare, MessageCircle, ArrowRight, ArrowLeft, Loader2, Database, Copy, Check, Eye, ChevronDown, ChevronUp, ChevronRight, Layout, PanelLeftClose, PanelLeftOpen, Star, Zap, ExternalLink, Terminal, DollarSign } from 'lucide-react';
import { View } from '../types';
import { storage } from '../lib/storage';

interface Props {
  setView: (view: View) => void;
}

const SiteCreator: React.FC<Props> = ({ setView }) => {
  const NICHE_OPTIONS = [
    "Pizzaria", "Açaiteria", "Advogado", "Clínica de Estética", "Academia",
    "Restaurante Japonês", "Hamburgueria", "Consultório Odontológico", "Contabilidade", "Pet Shop",
    "Imobiliária", "Salão de Beleza", "Autoescola", "Concessionária", "Oficina Mecânica",
    "Estúdio de Yoga", "Clínica Veterinária", "Barbearia", "Buffet Infantil", "Fotógrafo",
    "Escola de Idiomas", "Loja de Informática", "Loja de Roupas", "Arquitetura", "Engenharia",
    "Escritório de Design", "Clínica de Psicologia", "Agência de Viagens", "Supermercado", "Floricultura"
  ];

  const EXTRA_COMPONENTS = [
    { id: 'faq', name: 'FAQ (Perguntas Frequentes)', icon: MessageSquare },
    { id: 'gallery', name: 'Galeria de Fotos', icon: Globe },
    { id: 'menu', name: 'Cardápio / Serviços', icon: Layout },
    { id: 'testimonials', name: 'Depoimentos de Clientes', icon: Star },
    { id: 'contact', name: 'Formulário de Contato', icon: Target },
    { id: 'blog', name: 'Blog / Notícias', icon: Database },
  ];

  const [observation, setObservation] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  const [siteStyle, setSiteStyle] = useState('futuristic');
  const [offerPrice, setOfferPrice] = useState('497,00');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [selectedModel, setSelectedModel] = useState('landing_page');
  const [openSection, setOpenSection] = useState<'style' | 'colors' | 'models' | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [niche, setNiche] = useState('');

  const INDIVIDUAL_COLORS = [
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Esmeralda', hex: '#10b981' },
    { name: 'Rosa', hex: '#f43f5e' },
    { name: 'Âmbar', hex: '#f59e0b' },
    { name: 'Azul', hex: '#3b82f6' },
    { name: 'Violeta', hex: '#8b5cf6' },
    { name: 'Ardósia', hex: '#64748b' },
    { name: 'Ciano', hex: '#06b6d4' },
    { name: 'Laranja', hex: '#f97316' },
    { name: 'Lima', hex: '#84cc16' },
    { name: 'Vermelho', hex: '#ef4444' },
    { name: 'Fúcsia', hex: '#d946ef' },
    { name: 'Teal', hex: '#14b8a6' },
    { name: 'Céu', hex: '#0ea5e9' },
    { name: 'Amarelo', hex: '#eab308' },
    { name: 'Branco', hex: '#ffffff' },
    { name: 'Zinco', hex: '#71717a' },
  ];

  const COLOR_PRESETS = [
    { name: 'Indigo Moderno', primary: '#6366f1', secondary: '#ec4899' },
    { name: 'Crescimento Esmeralda', primary: '#10b981', secondary: '#3b82f6' },
    { name: 'Ouro da Meia-noite', primary: '#f59e0b', secondary: '#1e1b4b' },
    { name: 'Slate Profissional', primary: '#334155', secondary: '#64748b' },
    { name: 'Poder Carmesim', primary: '#ef4444', secondary: '#111827' },
  ];

  const STYLE_PRESETS = [
    { id: 'futuristic', name: 'Futurista / Dark', icon: Wand2 },
    { id: 'minimalist', name: 'Clean / Minimalista', icon: Eye },
    { id: 'corporate', name: 'Profissional / Corporate', icon: Briefcase },
    { id: 'high_contrast', name: 'Alto Contraste', icon: Globe },
  ];

  const MODEL_PRESETS = [
    { id: 'landing_page', name: 'Página de Alta Conversão', description: 'Focada em um único produto ou serviço.' },
    { id: 'institutional', name: 'Site Institucional Premium', description: 'Para mostrar autoridade e história da empresa.' },
    { id: 'funnel', name: 'Funil de Vendas Direto', description: 'Otimizado para leads e vendas imediatas.' },
    { id: 'portfolio', name: 'Portfólio de Projetos', description: 'Ideal para profissionais criativos e prestadores de serviços.' },
  ];

  const [country, setCountry] = useState('Brasil');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [activeApproach, setActiveApproach] = useState(0);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  const approaches = [
    {
      id: 1,
      title: "Abordagem 1 — Curiosidade",
      description: "Foco em despertar o interesse perguntando sobre a presença digital atual.",
      icon: <Target className="text-emerald-400" size={18} />,
      steps: [
        { label: "1. Abertura", msg: `Oi, tudo bem? Eu falo com o proprietário do ${projectName || 'seu negócio'}?` },
        { label: "2. Apresentação", msg: `Vi que vocês fazem um ótimo trabalho no Instagram, mas notei que muitos clientes que buscam no Google podem estar tendo dificuldade de encontrar o ${projectName || 'seu negócio'} de forma oficial.` },
        { label: "3. Diagnóstico", msg: "Minha intenção é justamente ajudar vocês a não dependerem apenas de algoritmos de redes sociais e terem um canal próprio que traga clientes qualificados todos os dias através do Google." },
        { label: "4. Proposta de Valor", msg: "Eu tomei a liberdade de adiantar uma solução estrutural que resolve esse gargalo e já deixei um preview pronto pra você ver como sua marca pode ser valorizada no digital:" },
        { label: "5. Fechamento", msg: `É algo vitalício, sem taxas mensais, focado em retorno. Fica apenas 12x de R$ ${(parseFloat((offerPrice || '0').replace(',', '.')) / 12).toFixed(2).replace('.', ',')}. Acredito que isso vai facilitar muito o seu crescimento. Podemos conversar?` }
      ]
    },
    {
      id: 2,
      title: "Abordagem 2 — Autoridade",
      description: "Foco no posicionamento de mercado e profissionalismo do negócio.",
      icon: <Briefcase className="text-blue-400" size={18} />,
      steps: [
        { label: "1. Abertura", msg: `Olá! Tudo bem? Eu falo com o responsável pelo ${projectName || 'seu negócio'}?` },
        { label: "2. Apresentação", msg: `Estava analisando o mercado de ${niche || 'seu nicho'} e percebi que o serviço de vocês é de altíssimo nível, mas senti que falta um detalhe para transmitir toda essa autoridade online.` },
        { label: "3. Diagnóstico", msg: "Muitas vezes o cliente quer fechar, mas busca aquela segurança extra de um site institucional que o Instagram não passa sozinho. Quero te ajudar a resolver essa 'quebra' de confiança." },
        { label: "4. Proposta de Valor", msg: "Criei uma estrutura premium que comunica exatamente a qualidade do que vocês entregam. Dá uma olhada no impacto e na seriedade que isso traz para a marca:" },
        { label: "5. Fechamento", msg: `É um investimento único para elevar o nível do jogo. Fica 12x de R$ ${(parseFloat((offerPrice || '0').replace(',', '.')) / 12).toFixed(2).replace('.', ',')}. Faz sentido pra você ter essa presença profissional agora?` }
      ]
    },
    {
      id: 3,
      title: "Abordagem 3 — Dor / Google",
      description: "Foco na perda de clientes para a concorrência que aparece no Google.",
      icon: <Zap className="text-amber-400" size={18} />,
      steps: [
        { label: "1. Abertura", msg: `Bom dia! Tudo bem? Eu falo com o dono do ${projectName || 'seu negócio'}?` },
        { label: "2. Apresentação", msg: `Notei que o ${projectName || 'seu negócio'} é uma excelente opção na região, mas vi que alguns concorrentes estão aparecendo na frente de vocês no Google de forma injusta.` },
        { label: "3. Diagnóstico", msg: "Quero te ajudar a retomar esse espaço. O objetivo não é apenas ter um site, mas garantir que o cliente te ache primeiro e não acabe indo para o vizinho por falta de visibilidade oficial." },
        { label: "4. Proposta de Valor", msg: "Preparei uma estrutura otimizada justamente para o seu nicho dominar essas buscas locais. Veja como ficou o projeto que eu pensei para ajudar vocês:" },
        { label: "5. Fechamento", msg: `É uma solução definitiva, sem mensalidades. Apenas 12x de R$ ${(parseFloat((offerPrice || '0').replace(',', '.')) / 12).toFixed(2).replace('.', ',')}. Vamos colocar o seu negócio no topo hoje?` }
      ]
    }
  ];

  const handleCopyPreset = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNext = () => {
    if (step === 3) {
      setStep(prev => prev + 1);
    } else if (step === 4) {
      storage.incrementStructures();
      window.dispatchEvent(new Event('dashboard-refresh'));
      setView('dashboard');
    } else {
      setStep(prev => prev + 1);
    }
  };
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(niche + ' em ' + city + ' ' + state + ' ' + country)}`;

  const steps = [
    { id: 1, name: 'Identificação', icon: Target },
    { id: 2, name: 'Leads', icon: Users },
    { id: 3, name: 'Negócio', icon: Briefcase },
    { id: 4, name: 'Abordagem', icon: MessageSquare },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Criar Estrutura</h2>
          <p className="text-zinc-400 font-medium text-sm">Siga os passos para construir sua máquina de vendas.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between bg-zinc-900/50 p-3 sm:p-4 rounded-2xl border border-zinc-800">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center space-y-1.5 flex-1">
              <div 
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                  step >= s.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                <s.icon size={16} className="sm:w-5 sm:h-5" />
              </div>
              <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-center ${step >= s.id ? 'text-zinc-100' : 'text-zinc-600'} ${step !== s.id ? 'hidden sm:block' : 'block'}`}>
                {s.name}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-px flex-1 mx-1 sm:mx-2 ${step > s.id ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <Target size={24} />
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Nicho de Atuação</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Selecione o Nicho Alvo</label>
                    <input
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      placeholder="Ex: Donos de Academias, Clínicas de Odontologia, E-commerce de Moda..."
                      className="w-full p-4 sm:p-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-700 text-sm"
                    />
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-4">
                      {NICHE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setNiche(opt)}
                          className={`px-2 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border shadow-sm flex items-center justify-center text-center leading-tight min-h-[44px] ${
                            niche === opt 
                              ? 'bg-white border-white text-zinc-950 scale-105 shadow-lg shadow-white/10' 
                              : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800/60'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <Users size={24} />
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Localização dos Leads</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">País</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Brasil"
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Estado</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Ex: SP, RJ, MG..."
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Cidade</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: São Paulo, Curitiba..."
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                {city && state && (
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                       <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">Extraindo dados para: <span className="text-indigo-400">{niche}</span> em <span className="text-indigo-400">{city}</span></p>
                       <a 
                        href={googleMapsSearchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 font-bold text-[10px] uppercase tracking-widest"
                       >
                         <Globe size={14} />
                         <span>Abrir em aba cheia</span>
                       </a>
                    </div>
                    <div className="h-[300px] md:h-[450px] rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950">
                      <iframe 
                        src={`https://www.google.com/maps?q=${encodeURIComponent(niche + ' em ' + city + ' ' + state + ' ' + country)}&output=embed`} 
                        className="w-full h-full border-none grayscale-[0.8] contrast-[1.2]"
                        title="Google Maps Leads"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-8">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <Briefcase size={24} />
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Modelagem de Negócio</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Nome do Negócio</label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Pizzaria do Vale..."
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Telefone de Contato</label>
                    <input
                      type="text"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Endereço Completo</label>
                    <input
                      type="text"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="Rua, Bairro, Cidade..."
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Valor da Oferta (R$)</label>
                    <input
                      type="text"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="497,00"
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-indigo-400 focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm font-bold placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Observações Adicionais</label>
                    <textarea
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      placeholder={niche === 'Advogado' ? "Ex: Direito Civil, Trabalhista..." : "Ex: Destaque entrega rápida..."}
                      className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm placeholder:text-zinc-700 h-14 resize-none scrollbar-thin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
                  {/* Estilo Visual */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <Wand2 size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Estilo Visual</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {STYLE_PRESETS.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSiteStyle(style.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            siteStyle === style.id ? 'bg-white border-white text-zinc-950 scale-105 shadow-lg' : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800/60'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <style.icon size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">{style.name}</span>
                          </div>
                          {siteStyle === style.id && <Check size={10} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estrutura */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <Layout size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Estrutura</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {MODEL_PRESETS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                            selectedModel === model.id ? 'bg-white border-white text-zinc-950 scale-105 shadow-lg' : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800/60'
                          }`}
                        >
                          <span className="text-[9px] font-black uppercase tracking-widest">{model.name}</span>
                          {selectedModel === model.id && <Check size={10} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Identidade Visual */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <Globe size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Cores</span>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Cor Principal</label>
                        <div className="flex flex-wrap gap-1.5">
                          {INDIVIDUAL_COLORS.map((c) => (
                            <button
                              key={`p-${c.hex}`}
                              onClick={() => setPrimaryColor(c.hex)}
                              className={`w-6 h-6 rounded-lg border-2 transition-all ${primaryColor === c.hex ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Cor Secundária</label>
                        <div className="flex flex-wrap gap-1.5">
                          {INDIVIDUAL_COLORS.map((c) => (
                            <button
                              key={`s-${c.hex}`}
                              onClick={() => setSecondaryColor(c.hex)}
                              className={`w-6 h-6 rounded-lg border-2 transition-all ${secondaryColor === c.hex ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Complementos Extras */}
                  <div className="space-y-4 md:col-span-3 pt-6 border-t border-zinc-800">
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <Zap size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Complementos Extras</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {EXTRA_COMPONENTS.map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => {
                            if (selectedExtras.includes(extra.id)) {
                              setSelectedExtras(selectedExtras.filter(id => id !== extra.id));
                            } else {
                              setSelectedExtras([...selectedExtras, extra.id]);
                            }
                          }}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-3 ${
                            selectedExtras.includes(extra.id) 
                              ? 'bg-white border-white text-zinc-950 scale-105 shadow-lg shadow-white/10' 
                              : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800/60'
                          }`}
                        >
                          <extra.icon size={18} />
                          <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">
                            {extra.name.split(' (')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Prompt e Geração - Movidos para baixo */}
                <div className="space-y-6 pt-8 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Instruções de Geração</h3>
                      <p className="text-zinc-400 font-medium text-sm">Copie o prompt abaixo para usar no Google AI Studio</p>
                    </div>
                    <div className="w-10 h-10 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                      <Terminal className="text-indigo-400" size={20} />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute right-4 top-4 z-20">
                      <button
                        onClick={() => {
                          const promptText = `Crie um site para o nicho de "${niche}". 
Nome do Projeto: ${projectName}
Estilo Visual: ${STYLE_PRESETS.find(s => s.id === siteStyle)?.name}
Estrutura: ${MODEL_PRESETS.find(m => m.id === selectedModel)?.name}
Cores: Primária ${primaryColor}, Secundária ${secondaryColor}
Endereço: ${businessAddress}
Telefone: ${businessPhone}
${selectedExtras.length > 0 ? `Funcionalidades Extras: ${selectedExtras.map(id => EXTRA_COMPONENTS.find(e => e.id === id)?.name).join(', ')}\n` : ''}
${observation ? `Observações Importantes: ${observation}\n` : ''}
O site deve ser moderno, totalmente responsivo para celular e desktop, e focado em conversão.`;
                          navigator.clipboard.writeText(promptText);
                          setCopiedId(999);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg active:scale-95"
                      >
                        {copiedId === 999 ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedId === 999 ? 'Copiado!' : 'Copiar Prompt'}</span>
                      </button>
                    </div>
                    
                    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 font-mono text-[10px] text-zinc-400 leading-relaxed uppercase whitespace-pre-wrap shadow-inner">
                      <span className="text-indigo-500 font-black"># SISTEMA DE GERAÇÃO ESTRUTURAL</span>
                      {`\n\nCrie um site para o nicho de "`}
                      <span className="text-white font-bold">{niche}</span>
                      {`".\n\n`}
                      <span className="text-zinc-600">-- Parâmetros do Negócio --</span>
                      {`\nNome: `}<span className="text-white">{projectName}</span>
                      {`\nLocalização: `}<span className="text-white">{businessAddress}</span>
                      {`\nContato: `}<span className="text-white">{businessPhone}</span>
                      {selectedExtras.length > 0 && (
                        <>
                          {`\nExtras: `}<span className="text-indigo-400 font-bold">{selectedExtras.map(id => EXTRA_COMPONENTS.find(e => e.id === id)?.name.split(' (')[0]).join(', ')}</span>
                        </>
                      )}
                      {observation && (
                        <>
                          {`\nObservações: `}<span className="text-white">{observation}</span>
                        </>
                      )}
                      {`\n\n`}
                      <span className="text-zinc-600">-- Identidade Visual --</span>
                      {`\nEstilo: `}<span className="text-indigo-400 font-bold">{STYLE_PRESETS.find(s => s.id === siteStyle)?.name}</span>
                      {`\nEstrutura: `}<span className="text-violet-400 font-bold">{MODEL_PRESETS.find(m => m.id === selectedModel)?.name}</span>
                      {`\nCores: `}<span className="text-white">{primaryColor}</span> / <span className="text-white">{secondaryColor}</span>
                      {`\n\n`}
                      <span className="text-indigo-500 font-black">O SITE DEVE SER MODERNO, TOTALMENTE RESPONSIVO PARA CELULAR E DESKTOP, E FOCADO EM CONVERSÃO DE CLIENTES VIA WHATSAPP.</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-indigo-500/30 transition-all">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center space-x-3 text-indigo-400">
                        <ExternalLink size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Acesso ao Workspace Externo</h4>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                        Clique no botão ao lado para abrir o Google AI Studio. Cole o prompt acima e inicie o processo de criação com sua conta pessoal.
                      </p>
                    </div>
                    <a 
                      href="https://aistudio.google.com/app/prompts/new" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-auto flex items-center justify-center space-x-4 bg-white text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-100 transition-all shadow-2xl active:scale-95 shrink-0"
                    >
                      <span>Gerar Site com IA</span>
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Resumo do Projeto Selecionado */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-wrap items-center gap-8 shadow-xl">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Negócio</p>
                  <p className="text-xs font-black text-white uppercase">{projectName || '---'}</p>
                </div>
                <div className="w-px h-8 bg-zinc-800 hidden md:block" />
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Estilo / Estrutura</p>
                   <p className="text-xs font-black text-indigo-400 uppercase">
                     {STYLE_PRESETS.find(s => s.id === siteStyle)?.name || '---'} / {MODEL_PRESETS.find(m => m.id === selectedModel)?.name || '---'}
                   </p>
                </div>
                <div className="w-px h-8 bg-zinc-800 hidden md:block" />
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Identidade</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full border border-zinc-950" style={{ backgroundColor: primaryColor }} />
                      <div className="w-3 h-3 rounded-full border border-zinc-950" style={{ backgroundColor: secondaryColor }} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{primaryColor}</span>
                  </div>
                </div>
              </div>

              {/* Approach Selection Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {approaches.map((approach, index) => (
                  <button
                    key={approach.id}
                    onClick={() => setActiveApproach(index)}
                    className={`flex items-center justify-center space-x-3 px-4 py-4 rounded-2xl border transition-all ${
                      activeApproach === index 
                        ? 'bg-white border-white text-zinc-950 shadow-lg shadow-white/5 scale-105' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    <div className={activeApproach === index ? 'text-zinc-950' : ''}>
                      {approach.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{approach.title.split(' — ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Active Approach Content */}
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
                              onClick={() => {
                                navigator.clipboard.writeText(step.msg);
                                setCopiedId(`${activeApproach}-${sIndex}`);
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
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

                    {/* WhatsApp Action */}
                    <div className="pt-6 border-t border-zinc-800">
                      <button
                        onClick={() => {
                          const phone = businessPhone.replace(/\D/g, '');
                          const url = `https://wa.me/${phone}`;
                          window.open(url, '_blank');
                        }}
                        className="w-full flex items-center justify-center space-x-4 bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-emerald-600/10 active:scale-95"
                      >
                        <MessageCircle size={20} />
                        <span>Iniciar Conversa no WhatsApp</span>
                      </button>
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

                <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-3xl p-6 flex items-center gap-6">
                  <Zap size={24} className="text-indigo-400 shrink-0" />
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                    Lembre-se: vender <span className="text-indigo-400">resultados</span> é mais poderoso que vender apenas um site. Use os modelos acima como base.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className="flex items-center space-x-2 px-6 py-3 text-zinc-400 hover:text-zinc-100 font-bold uppercase tracking-widest text-xs disabled:opacity-0 transition-all"
        >
          <ArrowLeft size={16} />
          <span>Anterior</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={(step === 1 && !niche) || (step === 2 && !city) || (step === 3 && !projectName)}
          className="flex items-center space-x-3 bg-zinc-100 text-zinc-950 px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl active:scale-95 disabled:opacity-40"
        >
          <span>
            {step === 3 ? 'Finalizar Estrutura' : step === 4 ? 'Concluir Projeto' : 'Próximo Passo'}
          </span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SiteCreator;
