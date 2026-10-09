import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, MessageSquare, Zap, Target, Repeat, ArrowRight, Copy, Check, HeartCrack, Search, Filter } from 'lucide-react';

const Objections: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const objections = [
    {
      id: 'ig-only',
      category: 'Redes Sociais',
      title: "Já tenho Instagram, não preciso de site",
      situation: "O cliente acredita que as redes sociais são suficientes para vender.",
      pain: "Dependência de algoritmo, falta de profissionalismo e perda de clientes que buscam no Google.",
      rebuttal: "No Instagram você 'aluga' um público, no Google você 'é dono' da sua vitrine oficial. Quem busca no Google já quer comprar, quem está no Insta está apenas passeando.",
      script: "Entendo perfeitamente, o Instagram é ótimo para relacionamento. Mas já parou para pensar que quando alguém realmente decide COMPRAR algo, ela vai no Google pesquisar? Se você não está lá com um site oficial, você está entregando esse cliente de bandeja para o seu concorrente que tem um site."
    },
    {
      id: 'price',
      category: 'Preço & ROI',
      title: "Está muito caro / Não tenho dinheiro agora",
      situation: "O cliente foca no custo e não no retorno sobre o investimento.",
      pain: "Perda de lucro diário por falta de posicionamento digital.",
      rebuttal: "Um site não é um gasto, é um vendedor que trabalha 24h por dia. O custo de NÃO ter um site é muito maior do que o investimento de ter um.",
      script: "Compreendo, o momento exige cautela. Mas deixe-me te perguntar: quanto custa para o seu negócio perder apenas 1 cliente por dia por não ser encontrado no Google? Em um mês, esse valor pagaria o site várias vezes. Estou te propondo uma ferramenta que se paga sozinha em pouquíssimo tempo."
    },
    {
      id: 'later',
      category: 'Procrastinação',
      title: "Vou deixar para depois / Outro momento",
      situation: "O cliente procrastina a decisão por medo ou falta de urgência.",
      pain: "Atraso no crescimento e perda de terreno para a concorrência.",
      rebuttal: "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor é agora. A internet não espera.",
      script: "Eu entendo que você tenha outras prioridades. Porém, o Google leva um tempo para indexar e dar relevância para sites novos. Quanto mais cedo começarmos, mais rápido você domina a sua região. Enquanto deixamos para depois, o seu concorrente está ganhando autoridade no seu lugar."
    },
    {
      id: 'friend',
      category: 'Concorrência Amadora',
      title: "Tenho um conhecido que faz mais barato",
      situation: "O cliente compara um trabalho profissional com amadorismo.",
      pain: "Site lento, que não converte, sem SEO e que pode sair do ar a qualquer momento.",
      rebuttal: "O barato sai caro quando o assunto é a imagem da sua empresa e a captação de clientes.",
      script: "Existem sim opções mais baratas, mas o que eu entrego não é apenas um site 'bonitinho'. É uma estrutura estratégica de vendas validada para o seu nicho. Um site amador pode afastar clientes ao invés de atrair. Você prefere economizar um pouco agora ou ter uma máquina de vendas profissional?"
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredObjections = objections.filter(obj => {
    const matchesSearch = obj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          obj.pain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          obj.rebuttal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || obj.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Manual de Objeções</h2>
          <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest">TRANSFORME O "NÃO" EM UMA OPORTUNIDADE DE FECHAMENTO.</p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar objeção..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-red-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {['all', 'Redes Sociais', 'Preço & ROI', 'Procrastinação', 'Concorrência Amadora'].map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedTag === tag 
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {tag === 'all' ? 'Todas as Categorias' : tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredObjections.length > 0 ? (
          filteredObjections.map((obj) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-red-500/30 transition-all shadow-xl"
          >
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldAlert className="text-red-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-zinc-100 uppercase tracking-tight">{obj.title}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Situação: {obj.situation}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center space-x-2 text-red-400 mb-2">
                    <HeartCrack size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">A Dor do Cliente</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">{obj.pain}</p>
                </div>
                <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                  <div className="flex items-center space-x-2 text-red-400 mb-2">
                    <Zap size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">A Lógica da Reversão</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">{obj.rebuttal}</p>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <MessageSquare size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Script de Reversão</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(obj.script, obj.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                      copiedId === obj.id ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {copiedId === obj.id ? <Check size={10} /> : <Copy size={10} />}
                    <span>{copiedId === obj.id ? 'Copiado' : 'Copiar Script'}</span>
                  </button>
                </div>
                <p className="text-sm font-medium text-zinc-200 leading-relaxed italic">
                  "{obj.script}"
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="p-12 text-center bg-zinc-900 border border-zinc-800 rounded-3xl">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
            Nenhuma objeção encontrada para os filtros atuais.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedTag('all'); }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Limpar Filtros
          </button>
        </div>
      )}
      </div>

      {/* Call to Action for Sales */}
      <div className="bg-red-600 border border-red-500 rounded-3xl p-8 relative overflow-hidden group shadow-xl shadow-red-600/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-black text-white uppercase tracking-tight">Entenda antes de atender</h4>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">A venda acontece quando a solução é maior que o medo.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <p className="text-[8px] font-black text-white/50 uppercase tracking-widest mb-1 text-center">Foco Total</p>
              <p className="text-sm font-black text-white uppercase tracking-widest text-center">Tocar na Dor</p>
            </div>
            <div className="w-8 h-[2px] bg-white/30 hidden md:block" />
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mb-1 text-center">Resultado</p>
              <p className="text-sm font-black text-zinc-950 uppercase tracking-widest text-center">Fechamento</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center gap-6">
        <Repeat size={24} className="text-amber-400 shrink-0" />
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
          Dica de Ouro: <span className="text-zinc-300">O cliente não compra um site, ele compra o que o site faz por ele.</span> Sempre foque nos novos clientes e na autoridade que ele ganhará.
        </p>
      </div>
    </div>
  );
};

export default Objections;
