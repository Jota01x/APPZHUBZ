import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Wand2, 
  Target, 
  Briefcase, 
  Users, 
  MessageSquare, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  Copy, 
  Check, 
  Layout, 
  Star, 
  Zap, 
  ExternalLink, 
  Terminal, 
  Sparkles,
  MapPin,
  Building2,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { View } from '../types';
import { storage } from '../lib/storage';

interface Props {
  setView: (view: View) => void;
}

const SiteCreator: React.FC<Props> = ({ setView }) => {
  const NICHE_OPTIONS = [
    "Academia", "Açaiteria", "Advogado", "Agência de Viagens", "Arquitetura",
    "Autoescola", "Barbearia", "Buffet Infantil", "Clínica de Estética", "Clínica de Psicologia",
    "Clínica Veterinária", "Concessionária", "Consultório Odontológico", "Contabilidade", "Engenharia",
    "Escola de Idiomas", "Escritório de Design", "Estúdio de Yoga", "Floricultura", "Fotógrafo",
    "Hamburgueria", "Imobiliária", "Loja de Informática", "Loja de Roupas", "Oficina Mecânica",
    "Pet Shop", "Pizzaria", "Restaurante Japonês", "Salão de Beleza", "Supermercado"
  ];

  const EXTRA_COMPONENTS = [
    { id: 'faq', name: 'FAQ (Perguntas Frequentes)', icon: MessageSquare },
    { id: 'gallery', name: 'Galeria de Fotos', icon: Globe },
    { id: 'menu', name: 'Cardápio / Serviços', icon: Layout },
    { id: 'testimonials', name: 'Depoimentos de Clientes', icon: Star },
    { id: 'contact', name: 'Formulário de Contato', icon: Target },
    { id: 'blog', name: 'Blog / Notícias', icon: Database },
  ];

  const INDIVIDUAL_COLORS = [
    { name: 'Vermelho Carmesim', hex: '#ef4444' },
    { name: 'Esmeralda', hex: '#10b981' },
    { name: 'Azul Real', hex: '#3b82f6' },
    { name: 'Âmbar', hex: '#f59e0b' },
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Violeta', hex: '#8b5cf6' },
    { name: 'Rosa Vibrante', hex: '#f43f5e' },
    { name: 'Ciano', hex: '#06b6d4' },
    { name: 'Laranja', hex: '#f97316' },
    { name: 'Lima', hex: '#84cc16' },
    { name: 'Fúcsia', hex: '#d946ef' },
    { name: 'Teal', hex: '#14b8a6' },
    { name: 'Céu', hex: '#0ea5e9' },
    { name: 'Amarelo', hex: '#eab308' },
    { name: 'Ardósia', hex: '#64748b' },
    { name: 'Branco Puro', hex: '#ffffff' },
    { name: 'Zinco Dark', hex: '#71717a' },
  ];

  const STYLE_PRESETS = [
    { id: 'futuristic', name: 'Futurista / Dark', desc: 'Contraste elevado com estética de alta tecnologia.' },
    { id: 'minimalist', name: 'Clean / Minimalista', desc: 'Espaçamentos generosos, foco tipográfico e clareza.' },
    { id: 'corporate', name: 'Profissional / Corporate', desc: 'Solidez e sobriedade para serviços corporativos.' },
    { id: 'glassmorphism', name: 'Glassmorphism', desc: 'Efeitos translúcidos e profundidade moderna.' },
    { id: 'maximalist', name: 'Bold / Maximalista', desc: 'Elementos visuais marcantes de alto impacto.' },
  ];

  const MODEL_PRESETS = [
    { id: 'landing_page', name: 'Página de Alta Conversão', description: 'Focada em um único produto ou serviço.' },
    { id: 'institutional', name: 'Site Institucional Premium', description: 'Para autoridade de marca e apresentação completa.' },
    { id: 'quiz', name: 'Quiz Interativo', description: 'Engajamento máximo com qualificação interativa.' },
    { id: 'funnel', name: 'Funil de Vendas Direto', description: 'Otimizado para captação ágil e vendas diretas.' },
    { id: 'portfolio', name: 'Portfólio de Projetos', description: 'Ideal para profissionais autônomos e mostruário.' },
  ];

  // Form states
  const [step, setStep] = useState(1);
  const [niche, setNiche] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [projectName, setProjectName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [offerPrice, setOfferPrice] = useState('500,00');
  const [observation, setObservation] = useState('');
  const [siteStyle, setSiteStyle] = useState('futuristic');
  const [selectedModel, setSelectedModel] = useState('landing_page');
  const [primaryColor, setPrimaryColor] = useState('#ef4444');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Step 4 Approach state
  const [activeApproach, setActiveApproach] = useState(0);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  const approaches = [
    {
      id: 1,
      title: "Abordagem 1 — Instagram & Contato Rápido",
      description: "Conexão amigável via Instagram, contraste com ausência no Google e oferta de prévia sem compromisso.",
      icon: <Sparkles className="text-emerald-400" size={18} />,
      fullText: `Oi! Tudo bem? 😊\n\nVi o trabalho da ${projectName || 'sua empresa'} no Instagram, muito bom! Posso te fazer uma pergunta rápida?\n\nEntão, procurei a ${projectName || 'sua empresa'} no Google e vi que vocês ainda não têm um site, né?\n\nTe pergunto porque criei um site recente para uma empresa de ${niche || 'segmento parecido'} e ele já está trazendo clientes novos pelo Google e pelo Instagram. Dá uma olhada: [link do site]\n\nFicou simples, rápido e já leva a pessoa direto para o WhatsApp. Achei que combinaria muito com a ${projectName || 'sua empresa'}.\n\nSe quiser, monto uma ideia de como ficaria o de vocês, sem compromisso. Faz sentido para você?`,
    },
    {
      id: 2,
      title: "Abordagem 2 — Demanda de Busca no Google",
      description: "Qualificação de canal de entrada de clientes e apresentação de oportunidade perdida nas buscas locais.",
      icon: <Target className="text-red-400" size={18} />,
      fullText: `Oiii! Tudo bem?\n\nHoje a maioria dos clientes de vocês chega mais por Instagram ou por indicação?\n\nEntendi! Isso é muito comum. A maioria das empresas que atendo estava assim também.\n\nNotei que a ${projectName || 'sua empresa'} ainda não aparece no Google quando alguém pesquisa "${niche ? `${niche} na sua cidade` : 'serviços na sua cidade'}". É um público que já quer comprar e hoje está indo para outros.\n\nFiz um site assim para uma empresa de ${niche || 'segmento parecido'}, olha como ficou: [link do site]\n\nEle aparece nas buscas e conecta com o Instagram, então um alimenta o outro. E o melhor: eu faço de um jeito leve e acessível, pensado para pequenos negócios.\n\nQuer que eu te mostre como ficaria o da ${projectName || 'sua empresa'}?`,
    },
    {
      id: 3,
      title: "Abordagem 3 — Prévia Rápida & Sem Atrito",
      description: "Pitch rápido de 1 minuto, valorizando o conteúdo atual do perfil e resolvendo a parte técnica sem burocracia.",
      icon: <Zap className="text-blue-400" size={18} />,
      fullText: `Olá! Tudo bem? Posso te mostrar uma ideia que fiz pensando em negócios como o seu? Leva 1 minuto 🙂\n\nCrio sites para empresas que querem atrair mais clientes pelo Google e redes sociais.\n\nFiz este aqui para uma empresa de referência no nicho de ${niche || 'atuação'}: [link do site]\n\nPercebi que a ${projectName || 'sua empresa'} ainda não tem um, e seu perfil tem tudo para converter bem: ótimo conteúdo, só falta ser encontrado por quem pesquisa no Google.\n\nO processo é simples: eu cuido de tudo e você não precisa entender nada de tecnologia. Se quiser, te mando uma prévia de como ficaria, sem custo e sem compromisso.`,
    }
  ];

  const getPromptText = () => {
    return `Crie um site para o nicho de "${niche || 'Geral'}".\n\n-- Identificação --\nNome do Projeto: ${projectName || 'Empresa Local'}\nEndereço: ${businessAddress || 'Endereço Comercial'}\nTelefone / WhatsApp: ${businessPhone || 'Telefone de Contato'}\n\n-- Arquitetura Visual --\nEstilo: ${STYLE_PRESETS.find(s => s.id === siteStyle)?.name}\nEstrutura: ${MODEL_PRESETS.find(m => m.id === selectedModel)?.name}\nCores: Primária ${primaryColor} / Secundária ${secondaryColor}${selectedExtras.length > 0 ? `\n\n-- Módulos Extras --\n${selectedExtras.map(id => EXTRA_COMPONENTS.find(e => e.id === id)?.name.split(' (')[0]).join(', ')}` : ''}${observation ? `\n\n-- Observações --\n${observation}` : ''}\n\nO site deve ser moderno, totalmente responsivo para celular e desktop, e focado em conversão de clientes via WhatsApp.`;
  };

  const steps = [
    { id: 1, number: '01', name: 'Nicho Alvo', icon: Target },
    { id: 2, number: '02', name: 'Localização', icon: MapPin },
    { id: 3, number: '03', name: 'Modelagem', icon: Briefcase },
    { id: 4, number: '04', name: 'Abordagem', icon: MessageSquare },
  ];

  const handleNext = () => {
    if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      storage.saveSite({
        name: projectName || `${niche || 'Estrutura'} Pro`,
        niche: niche || 'Negócios Locais',
        city: city || 'São Paulo',
        state: state || 'SP',
        phone: businessPhone || '',
        address: businessAddress || '',
        offerPrice: offerPrice || '500,00',
        status: 'prospecting',
        style: siteStyle,
        model: selectedModel,
        primaryColor,
        secondaryColor,
        extras: selectedExtras,
      });
      window.dispatchEvent(new Event('dashboard-refresh'));
      setView('dashboard');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const isStepValid = (s: number) => {
    if (s === 1) return niche.trim().length > 0;
    if (s === 2) return city.trim().length > 0;
    if (s === 3) return projectName.trim().length > 0;
    return true;
  };

  const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent((niche || 'empresas') + ' em ' + (city || 'São Paulo') + ' ' + state + ' ' + country)}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Criar Estrutura</h2>
        <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mt-1">Siga os passos para construir sua máquina de vendas.</p>
      </div>

      {/* High-End Stepper Architecture */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-900/60 p-2 sm:p-3 rounded-2xl border border-zinc-800/90 shadow-xl">
        {steps.map((s) => {
          const Icon = s.icon;
          const isCurrent = step === s.id;
          const isPast = step > s.id;
          const isClickable = true;

          return (
            <button
              key={s.id}
              onClick={() => {
                if (isClickable) setStep(s.id);
              }}
              disabled={!isClickable && !isCurrent}
              className={`flex items-center gap-3.5 p-3 sm:p-4 rounded-xl text-left transition-all border ${
                isCurrent 
                  ? 'bg-gradient-to-r from-red-950/80 to-zinc-900 border-red-500/60 shadow-lg shadow-red-950/40' 
                  : isPast
                  ? 'bg-zinc-950/40 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                  : 'bg-zinc-950/20 border-transparent text-zinc-600 opacity-60'
              }`}
            >
              <div 
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all font-mono font-bold text-xs ${
                  isCurrent 
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                    : isPast 
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400' 
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                }`}
              >
                {isPast ? <Check size={16} /> : <Icon size={16} />}
              </div>

              <div className="min-w-0">
                <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider block">
                  ETAPA {s.number}
                </span>
                <h3 className={`text-xs sm:text-sm font-black uppercase tracking-tight truncate ${isCurrent ? 'text-white' : 'text-zinc-400'}`}>
                  {s.name}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Canvas */}
      <div className="min-h-[460px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: NICHO ALVO */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                      <Target size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                        Selecione o Nicho Alvo
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Escolha um dos segmentos comprovados ou digite um nicho personalizado.
                      </p>
                    </div>
                  </div>
                  {niche && (
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-red-950/60 border border-red-500/30 rounded-xl text-xs font-black uppercase tracking-wider text-red-400 shrink-0 self-start sm:self-auto">
                      <CheckCircle2 size={14} />
                      <span>Nicho Ativo: {niche}</span>
                    </div>
                  )}
                </div>

                {/* Input Manual */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <span>Nicho Personalizado ou Busca Rápida</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      placeholder="Ex: Donos de Academias, Clínicas Odontológicas, Pizzaria, Barbearia..."
                      className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-white text-base font-bold placeholder:text-zinc-700 outline-none focus:border-red-500 transition-colors shadow-inner"
                    />
                    {niche && (
                      <button 
                        onClick={() => setNiche('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono font-bold px-2 py-1 bg-zinc-900 rounded"
                      >
                        LIMPAR
                      </button>
                    )}
                  </div>
                </div>

                {/* Presets Grid */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">
                    Sugestões de Alta Demanda ({NICHE_OPTIONS.length} segmentos)
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                    {NICHE_OPTIONS.map((opt) => {
                      const isSelected = niche === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setNiche(opt)}
                          className={`p-3 rounded-xl text-[11px] font-black uppercase tracking-wider text-center transition-all border flex items-center justify-center min-h-[48px] ${
                            isSelected
                              ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-[1.02]'
                              : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/40'
                          }`}
                        >
                          <span className="truncate">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LOCALIZAÇÃO & RADAR */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                        Localização da Empresa
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Identifique estabelecimentos da região para enriquecer sua proposta e demonstrar oportunidade real.
                      </p>
                    </div>
                  </div>

                  <div className="px-3.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-400 shrink-0 self-start sm:self-auto">
                    Nicho Selecionado: <span className="text-red-400 font-bold">{niche}</span>
                  </div>
                </div>

                {/* Location Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">País</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Brasil"
                      className="w-full px-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Estado (UF)</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Ex: SP, RJ, MG, PR..."
                      className="w-full px-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cidade Alvo</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: São Paulo, Campinas, Curitiba..."
                      className="w-full px-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Embedded Map */}
                {city ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Localização ativa para: <strong className="text-white">{niche}</strong> em <strong className="text-white">{city} ({state || 'BR'})</strong></span>
                      </span>

                      <a 
                        href={googleMapsSearchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
                      >
                        <Globe size={13} />
                        <span>Abrir no Google Maps</span>
                      </a>
                    </div>

                    <div className="h-[340px] md:h-[460px] rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950 relative shadow-2xl">
                      <iframe 
                        src={`https://www.google.com/maps?q=${encodeURIComponent(niche + ' em ' + city + ' ' + state + ' ' + country)}&output=embed`} 
                        className="w-full h-full border-none grayscale-[0.7] contrast-[1.15]"
                        title="Google Maps"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl text-center space-y-2">
                    <Building2 className="mx-auto text-zinc-600" size={32} />
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                      Informe a cidade acima para carregar o mapa territorial de estabelecimentos
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: MODELAGEM, DESIGN & PROMPT WORKSPACE */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Basic Business Info */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
                  <Building2 className="text-red-400" size={20} />
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    Dados Cadastrais da Empresa
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Nome da Empresa / Projeto *
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Ex: Pizzaria Forno Nobre, Clínica OdontoMax..."
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold focus:border-red-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Telefone / WhatsApp Comercial
                    </label>
                    <input
                      type="text"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold focus:border-red-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Valor da Oferta (R$)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-bold">R$</span>
                      <input
                        type="text"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        placeholder="500,00"
                        className="w-full pl-9 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-red-400 text-sm font-black focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Endereço Completo
                    </label>
                    <input
                      type="text"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="Rua, Número, Bairro, Cidade - UF"
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-bold focus:border-red-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Observações & Diferenciais
                    </label>
                    <textarea
                      rows={2}
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      placeholder="Ex: Destacar atendimento 24h, estacionamento gratuito, 10 anos de experiência..."
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs font-medium focus:border-red-500 outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Architecture Style & Model Selector */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
                  <Layout className="text-red-400" size={20} />
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    Arquitetura & Estrutura da Página
                  </h3>
                </div>

                {/* Model Presets */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Modelo Estrutural
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {MODEL_PRESETS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selectedModel === m.id
                            ? 'bg-red-600/15 border-red-500 text-white shadow-md'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase tracking-tight text-white">{m.name}</span>
                          {selectedModel === m.id && <Check size={14} className="text-red-400" />}
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-snug">{m.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Presets - Sem Ícones */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Estilo Visual (Design System)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {STYLE_PRESETS.map((s) => {
                      const isSelected = siteStyle === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSiteStyle(s.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-red-600/15 border-red-500 text-white shadow-md'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black uppercase tracking-tight text-white">{s.name}</span>
                            {isSelected && <Check size={14} className="text-red-400" />}
                          </div>
                          <p className="text-[10px] text-zinc-500 leading-snug">{s.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                    Identidade Visual & Cores
                  </label>

                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                    {/* Primary Color */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                          Cor Primária (Destaque & Botões): <strong className="text-white">{primaryColor}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <label className="relative flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-xl cursor-pointer text-[10px] font-mono font-bold text-zinc-200 hover:text-white transition-all shadow-sm">
                            <span className="w-3.5 h-3.5 rounded-md border border-white/40 shrink-0" style={{ backgroundColor: primaryColor }} />
                            <span>Escolher Cor</span>
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </label>
                          <input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            placeholder="#ef4444"
                            className="w-20 px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-mono text-white uppercase font-bold focus:border-red-500 outline-none text-center"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {INDIVIDUAL_COLORS.map(c => (
                          <button
                            key={`p-${c.hex}`}
                            title={c.name}
                            onClick={() => setPrimaryColor(c.hex)}
                            className={`w-6 h-6 rounded-lg border-2 transition-transform ${primaryColor === c.hex ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="space-y-2 pt-3 border-t border-zinc-900">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                          Cor Secundária (Acentos): <strong className="text-white">{secondaryColor}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <label className="relative flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-xl cursor-pointer text-[10px] font-mono font-bold text-zinc-200 hover:text-white transition-all shadow-sm">
                            <span className="w-3.5 h-3.5 rounded-md border border-white/40 shrink-0" style={{ backgroundColor: secondaryColor }} />
                            <span>Escolher Cor</span>
                            <input
                              type="color"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </label>
                          <input
                            type="text"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            placeholder="#10b981"
                            className="w-20 px-2 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-mono text-white uppercase font-bold focus:border-red-500 outline-none text-center"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {INDIVIDUAL_COLORS.map(c => (
                          <button
                            key={`s-${c.hex}`}
                            title={c.name}
                            onClick={() => setSecondaryColor(c.hex)}
                            className={`w-6 h-6 rounded-lg border-2 transition-transform ${secondaryColor === c.hex ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra Components */}
                <div className="space-y-2.5 pt-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Componentes & Seções Extras
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {EXTRA_COMPONENTS.map((extra) => {
                      const isChecked = selectedExtras.includes(extra.id);
                      const Icon = extra.icon;
                      return (
                        <button
                          key={extra.id}
                          onClick={() => {
                            if (isChecked) {
                              setSelectedExtras(selectedExtras.filter(id => id !== extra.id));
                            } else {
                              setSelectedExtras([...selectedExtras, extra.id]);
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                            isChecked
                              ? 'bg-red-600 border-red-500 text-white shadow-md'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <Icon size={14} className={isChecked ? 'text-white' : 'text-zinc-500'} />
                          <span className="text-[10px] font-black uppercase tracking-wider truncate">
                            {extra.name.split(' (')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Prompt Estrutural para IA - Posicionado no Final do Site */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                        Prompt Estrutural para IA
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-mono">Gerado em tempo real com seus parâmetros</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getPromptText());
                      setCopiedId(999);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-zinc-700/60 shrink-0 self-start sm:self-auto"
                  >
                    {copiedId === 999 ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedId === 999 ? 'Prompt Copiado!' : 'Copiar Prompt'}</span>
                  </button>
                </div>

                {/* Terminal Code Display */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl font-mono text-xs text-zinc-300 leading-relaxed max-h-[320px] overflow-y-auto custom-scrollbar shadow-inner space-y-3">
                  <div className="flex items-center justify-between text-[9px] text-zinc-500 border-b border-zinc-900 pb-2">
                    <span className="text-red-400 font-bold"># SISTEMA DE ENGENHARIA DE PROMPTS</span>
                    <span>FORMATO: MARKDOWN / TEXT</span>
                  </div>

                  <p className="whitespace-pre-wrap">
                    {getPromptText()}
                  </p>
                </div>

                {/* Action Area: Gerar Site */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-zinc-500 font-medium text-center sm:text-left flex-1">
                    💡 Ao clicar em <strong>Gerar Site</strong>, o prompt é automaticamente copiado para sua área de transferência para colar em <strong>New App</strong>.
                  </p>

                  <a 
                    href="https://aistudio.google.com/app/prompts/new" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(getPromptText());
                    }}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 py-4 px-8 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/25 active:scale-95"
                  >
                    <Wand2 size={16} />
                    <span>Gerar Site</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SCRIPTS DE ABORDAGEM & FECHAMENTO */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Summary Header */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">
                      Nome da Empresa
                    </span>
                    <span className="text-zinc-600 font-mono text-[10px]">·</span>
                    <span className="text-zinc-400 font-mono text-[10px]">{niche || 'Nicho'} · {city || 'Local'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight truncate">
                    {projectName || `${niche || 'Empresa'} Pro`}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <span className="text-[9px] text-zinc-500 uppercase block font-mono">Modelo</span>
                    <span className="text-zinc-200 font-bold uppercase text-xs">{MODEL_PRESETS.find(m => m.id === selectedModel)?.name}</span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <span className="text-[9px] text-zinc-500 uppercase block font-mono">Investimento</span>
                    <span className="text-emerald-400 font-bold text-xs">R$ {offerPrice || '500,00'}</span>
                  </div>

                  {/* Botão para levar ao WhatsApp o número adicionado na etapa 3 */}
                  <a
                    href={(() => {
                      const raw = businessPhone || '';
                      const cleanPhone = raw.replace(/\D/g, '');
                      const phoneToUse = cleanPhone.length >= 10 && !cleanPhone.startsWith('55') && cleanPhone.length <= 11 
                        ? `55${cleanPhone}` 
                        : cleanPhone;
                      const currentScriptMsg = approaches[activeApproach].fullText;
                      return phoneToUse 
                        ? `https://wa.me/${phoneToUse}?text=${encodeURIComponent(currentScriptMsg)}`
                        : `https://wa.me/?text=${encodeURIComponent(currentScriptMsg)}`;
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 active:scale-95 shrink-0"
                    title={businessPhone ? `Conversar com ${businessPhone}` : 'Abrir WhatsApp'}
                  >
                    <MessageCircle size={18} />
                    <span>{businessPhone ? `WhatsApp (${businessPhone})` : 'Abrir WhatsApp'}</span>
                  </a>
                </div>
              </div>

              {/* Approach Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {approaches.map((approach, index) => (
                  <button
                    key={approach.id}
                    onClick={() => {
                      setActiveApproach(index);
                    }}
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                      activeApproach === index 
                        ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-[1.02]' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div className={activeApproach === index ? 'text-white' : ''}>
                      {approach.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{approach.title.split(' — ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Approach Script Details */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center shrink-0">
                      {approaches[activeApproach].icon}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        {approaches[activeApproach].title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {approaches[activeApproach].description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(approaches[activeApproach].fullText);
                      setCopiedId(`full-${activeApproach}`);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0 ${
                      copiedId === `full-${activeApproach}`
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {copiedId === `full-${activeApproach}` ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedId === `full-${activeApproach}` ? 'Copiado!' : 'Copiar Texto Completo'}</span>
                  </button>
                </div>

                {/* Mensagem Completa Direta (Sem Sequência Fragmentada) */}
                <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 sm:p-7 relative group hover:border-zinc-700 transition-colors shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/70">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                        Mensagem de Prospecção Pronta para Uso
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(approaches[activeApproach].fullText);
                        setCopiedId(`msg-${activeApproach}`);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        copiedId === `msg-${activeApproach}` ? 'bg-emerald-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {copiedId === `msg-${activeApproach}` ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedId === `msg-${activeApproach}` ? 'Copiado' : 'Copiar Mensagem'}</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {approaches[activeApproach].fullText}
                  </p>
                </div>

                {/* Direct WhatsApp Call */}
                <div className="pt-2 border-t border-zinc-800">
                  <a
                    href={(() => {
                      const raw = businessPhone || '';
                      const cleanPhone = raw.replace(/\D/g, '');
                      const phoneToUse = cleanPhone.length >= 10 && !cleanPhone.startsWith('55') && cleanPhone.length <= 11 
                        ? `55${cleanPhone}` 
                        : cleanPhone;
                      const fullMsg = approaches[activeApproach].fullText;
                      return phoneToUse 
                        ? `https://wa.me/${phoneToUse}?text=${encodeURIComponent(fullMsg)}`
                        : `https://wa.me/?text=${encodeURIComponent(fullMsg)}`;
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/50 hover:shadow-emerald-600/30 active:scale-98"
                  >
                    <MessageCircle size={18} />
                    <span>
                      {businessPhone 
                        ? `Iniciar Conversa no WhatsApp com ${businessPhone}` 
                        : 'Abrir Conversa no WhatsApp'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Strategic Closing Tips */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex items-center gap-3 text-amber-400">
                  <Star size={20} />
                  <h4 className="text-sm font-black uppercase tracking-widest">Dicas Estratégicas para Fechamento Rápido</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { title: "Personalização", desc: "Sempre use o nome da empresa e do responsável para conexão imediata." },
                    { title: "Demonstração Visual", desc: "A prévia interativa gera valor instantâneo antes de falar de preço." },
                    { title: "Foco no Retorno (ROI)", desc: "1 cliente vindo do Google já paga todo o investimento do site." },
                    { title: "Urgência Real", desc: "Mencione que a estrutura base já está montada e pronta para ativar hoje." },
                    { title: "Quebra de Objeções", desc: "Reforce que eles não precisam entender nada de tecnologia nem programação." },
                    { title: "Investimento Único", desc: "Deixe claro que é taxa única sem mensalidades recorrentes abusivas." }
                  ].map((tip, i) => (
                    <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 hover:border-amber-500/30 transition-colors">
                      <p className="text-[10px] font-black text-white uppercase mb-1 tracking-wider">{tip.title}</p>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3.5 text-zinc-400 hover:text-white font-black uppercase tracking-wider text-xs disabled:opacity-0 transition-all rounded-xl hover:bg-zinc-900"
        >
          <ArrowLeft size={16} />
          <span>Etapa Anterior</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={
            (step === 1 && !isStepValid(1)) || 
            (step === 2 && !isStepValid(2)) || 
            (step === 3 && !isStepValid(3))
          }
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-600/25 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>
            {step === 1 && 'Avançar para Localização'}
            {step === 2 && 'Avançar para Modelagem'}
            {step === 3 && 'Gerar Scripts de Venda'}
            {step === 4 && 'Salvar e Concluir Projeto'}
          </span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SiteCreator;
