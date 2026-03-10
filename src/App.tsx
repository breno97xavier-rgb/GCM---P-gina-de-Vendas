import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShieldCheck, 
  MessageCircle, 
  Mail, 
  Instagram,
  Smartphone,
  Tablet,
  Laptop,
  ArrowRight,
  BarChart3,
  BookOpen,
  Target,
  Zap,
  Clock,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1 bg-neon-blue mx-auto mt-6 rounded-full glow-blue"></div>
  </div>
);

const CTAButton = ({ children, onClick, className = "", secondary = false }: { children: React.ReactNode; onClick?: () => void; className?: string; secondary?: boolean }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
      secondary 
        ? "bg-navy-800 text-white border border-navy-700 hover:bg-navy-700" 
        : "bg-neon-blue text-white glow-blue hover:brightness-110"
    } ${className}`}
  >
    {children}
  </button>
);

const AccordionItem: React.FC<{ title: string; content: string; isOpen: boolean; onClick: () => void }> = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-navy-800 last:border-0">
    <button 
      className="w-full py-5 flex items-center justify-between text-left hover:text-neon-blue transition-colors"
      onClick={onClick}
    >
      <span className="text-lg font-medium">{title}</span>
      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-slate-400 leading-relaxed">
            {content}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const CountdownTimer = ({ compact = false }: { compact?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (compact) {
    return (
      <div className="mt-6 pt-6 border-t border-white/5">
        <p className="text-[10px] text-slate-500 uppercase font-bold mb-3 tracking-widest">Oferta expira em:</p>
        <div className="flex justify-center items-center gap-3">
          {[
            { label: 'H', value: timeLeft.hours },
            { label: 'M', value: timeLeft.minutes },
            { label: 'S', value: timeLeft.seconds }
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <div className="text-xl font-black text-neon-blue tracking-tighter">
                  {formatNumber(item.value)}
                </div>
              </div>
              {i < 2 && <div className="text-lg font-black text-white/20">:</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-10 bg-navy-800/30 p-8 rounded-3xl border border-neon-blue/20">
      <h3 className="text-neon-blue font-black text-xl md:text-2xl mb-2 uppercase tracking-tighter">
        OFERTA PROMOCIONAL DISPONÍVEL POR TEMPO LIMITADO
      </h3>
      <p className="text-slate-400 text-sm mb-8">
        Aproveite o acesso promocional ao material completo antes que o valor volte ao normal.
      </p>
      <div className="flex justify-center items-center gap-3 md:gap-6">
        {[
          { label: 'HH', value: timeLeft.hours },
          { label: 'MM', value: timeLeft.minutes },
          { label: 'SS', value: timeLeft.seconds }
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {formatNumber(item.value)}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 font-bold">{item.label}</span>
            </div>
            {i < 2 && <div className="text-4xl md:text-6xl font-black text-neon-blue/50 mb-4">:</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const plansRef = useRef<HTMLElement>(null);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const galleryImages = [
    "https://i.ibb.co/Y7kprRpK/3.png",
    "https://i.ibb.co/93cTjt8Z/6.png",
    "https://i.ibb.co/p6F2RSF0/7.png",
    "https://i.ibb.co/SXmzB7dB/8.png",
    "https://i.ibb.co/RGbJ6t7k/10.png",
    "https://i.ibb.co/d0SF6HnR/11.png",
    "https://i.ibb.co/VY4X2DyZ/13.png"
  ];

  const accordionItems = [
    { title: "1 — Língua Portuguesa", content: "Domine interpretação de texto, gramática normativa e os temas mais recorrentes em provas municipais." },
    { title: "2 — Matemática", content: "Matemática básica e aplicada para concursos, focada em resolução rápida de problemas." },
    { title: "3 — Conhecimentos Gerais e Atualidades", content: "Fatos marcantes do Brasil e do mundo que costumam ser cobrados em provas de GCM." },
    { title: "4 — Direito Constitucional", content: "Direitos fundamentais, organização do estado e os artigos essenciais para a segurança pública." },
    { title: "5 — Direito Administrativo", content: "Princípios da administração, atos administrativos e poderes do estado de forma simplificada." },
    { title: "6 — Raciocínio Lógico", content: "Lógica proposicional, sequências e estruturas lógicas que derrubam candidatos despreparados." },
    { title: "7 — Legislação para GCM", content: "Estatuto das Guardas (Lei 13.022), CTB e legislações específicas da carreira." },
    { title: "8 — Noções de Arquivologia", content: "Conceitos fundamentais de gestão de documentos e organização de arquivos públicos." },
    { title: "9 — Informática Básica", content: "Windows, Word, Excel, Internet e segurança da informação direto ao ponto." },
    { title: "10 — Ético no Serviço Público", content: "Código de ética, conduta profissional e valores essenciais para o servidor da GCM." },
  ];

  const faqs = [
    { q: "O material é atualizado?", a: "Sim! Nosso material é revisado constantemente com base nos editais mais recentes publicados em 2024 e 2025." },
    { q: "Como recebo o acesso?", a: "O acesso é imediato. Assim que o pagamento for confirmado, você receberá os dados de acesso em seu e-mail." },
    { q: "Serve para qualquer GCM?", a: "Sim. O material foi construído com base no 'núcleo comum' de 95% dos editais de GCM de todo o Brasil." },
    { q: "Preciso esperar edital abrir?", a: "Não! O segredo da aprovação é o estudo pré-edital. Quem começa antes, garante a vaga." },
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      
      {/* 1 — HERO SECTION */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent_70%)] -z-10"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span>MATERIAL 100% ATUALIZADO</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              MAIS DE 25 MIL VAGAS PARA <br />
              <span className="text-neon-blue text-glow uppercase">Guarda Civil Municipal em todo o Brasil</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium mb-4">
              Comece hoje sua preparação com o <strong>material baseado nos editais reais das provas de Guarda Municipal</strong>.
            </p>
            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              Salários iniciais entre <strong>R$ 2.500 e R$ 5.500</strong>, dependendo do município.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <CTAButton onClick={scrollToPlans} className="w-full sm:w-auto">
                COMEÇAR A ESTUDAR AGORA
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-neon-blue" /> Acesso imediato</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-neon-blue" /> Material atualizado</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-neon-blue" /> Estudo direto ao ponto</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-neon-blue/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
            <img 
              src="https://i.ibb.co/KjK5xyFz/Whats-App-Image-2026-03-08-at-16-22-47.jpg" 
              alt="Mockup GCM" 
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </header>

      {/* NEW SECTION: POR QUE BUSCAR GCM */}
      <section className="py-24 px-6 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <SectionTitle>
            Por que milhares de pessoas buscam o concurso de Guarda Municipal
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: "🛡️", 
                title: "Estabilidade no serviço público", 
                desc: "Cargo efetivo com segurança profissional e estabilidade após o estágio probatório." 
              },
              { 
                icon: "💰", 
                title: "Salários iniciais atrativos", 
                desc: "Remuneração média entre R$ 2.500 e R$ 5.500, dependendo da cidade." 
              },
              { 
                icon: "📈", 
                title: "Crescimento na carreira", 
                desc: "Possibilidade de progressão e aumento salarial ao longo dos anos." 
              },
              { 
                icon: "🏙️", 
                title: "Concursos frequentes em todo o Brasil", 
                desc: "Prefeituras abrem concursos regularmente para reforçar a segurança municipal." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-900/50 p-8 rounded-2xl border border-white/5 hover:border-neon-blue/30 transition-all text-center"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-lg font-bold text-white mb-4">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — SEÇÃO "O PADRÃO OCULTO DOS EDITAIS" */}
      <section className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Os editais de GCM possuem um padrão recorrente de cobrança de conteúdo. Este material foi estruturado analisando todos os editais municipais do Brasil.">
            O padrão oculto dos editais de GCM
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Português e Legislação", value: "85%", color: "text-neon-blue" },
              { label: "Raciocínio Lógico", value: "70%", color: "text-emerald-400" },
              { label: "Informática", value: "65%", color: "text-amber-400" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-800/50 p-8 rounded-2xl border border-white/5 text-center hover:border-neon-blue/30 transition-colors"
              >
                <div className={`text-5xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-400 font-medium">dos editais cobram {stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — SEÇÃO "DADOS REAIS. NÃO OPINIÃO." */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Esse material foi organizado com base em levantamento de editais reais de concursos GCM, priorizando os conteúdos que realmente decidem a aprovação.">
            Dados reais. Não opinião.
          </SectionTitle>
          
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy-800 text-white font-bold">
                  <th className="p-4 md:p-6">Matéria</th>
                  <th className="p-4 md:p-6">Frequência</th>
                  <th className="p-4 md:p-6">Prioridade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Português", freq: "98%", prio: "Alta", color: "text-emerald-400" },
                  { name: "Legislação", freq: "95%", prio: "Alta", color: "text-emerald-400" },
                  { name: "Raciocínio Lógico", freq: "72%", prio: "Média", color: "text-amber-400" },
                  { name: "Informática", freq: "68%", prio: "Média", color: "text-amber-400" },
                  { name: "Atualidades", freq: "55%", prio: "Média", color: "text-amber-400" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 md:p-6 font-medium">{row.name}</td>
                    <td className="p-4 md:p-6 text-slate-400">{row.freq}</td>
                    <td className={`p-4 md:p-6 font-bold ${row.color}`}>{row.prio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 — SEÇÃO "O QUE ENTRA / O QUE FICA FORA" */}
      <section className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> O QUE ENTRA
            </h3>
            <ul className="space-y-4">
              {[
                "Conteúdo que mais cai em prova",
                "Matérias essenciais",
                "Explicação direta",
                "Estrutura para estudo rápido"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-rose-500/5 border border-rose-500/20 p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6" /> O QUE FICA FORA
            </h3>
            <ul className="space-y-4">
              {[
                "Conteúdos raros em edital",
                "Teoria excessiva",
                "Material desorganizado",
                "Assuntos irrelevantes"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <XCircle className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 5 — SEÇÃO "AS MATÉRIAS QUE DECIDEM SUA NOTA" */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle>As matérias que realmente decidem sua nota</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Português", 
                items: ["interpretação de texto", "gramática aplicada", "ortografia", "concordância"],
                icon: <BookOpen className="w-6 h-6 text-neon-blue" />
              },
              { 
                title: "Legislação", 
                items: ["direitos e deveres", "estatuto da guarda municipal", "legislação municipal", "direitos humanos"],
                icon: <ShieldCheck className="w-6 h-6 text-neon-blue" />
              },
              { 
                title: "Raciocínio Lógico", 
                items: ["proposições", "porcentagem", "lógica de argumentação", "problemas matemáticos"],
                icon: <Target className="w-6 h-6 text-neon-blue" />
              },
              { 
                title: "Informática", 
                items: ["noções de sistemas", "internet", "pacote office", "segurança digital"],
                icon: <Laptop className="w-6 h-6 text-neon-blue" />
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-800/40 p-8 rounded-2xl border border-white/5 hover:border-neon-blue/50 transition-all group"
              >
                <div className="mb-4 bg-navy-900 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{card.title}</h4>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="text-slate-400 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-blue"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — SEÇÃO "MATERIAL ORGANIZADO" */}
      <section className="py-24 bg-navy-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <SectionTitle subtitle="O material foi organizado para permitir estudo rápido e revisão eficiente, focando apenas nos conteúdos que aparecem nas provas.">
            Material organizado. Estudo rápido.
          </SectionTitle>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryImages.slice(0, 5).map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="cursor-pointer group relative"
                onClick={() => setSelectedImage(img)}
              >
                <div className="absolute inset-0 bg-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center z-10">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <img 
                  src={img} 
                  alt={`Página ${i}`} 
                  className="w-full h-auto rounded-xl border border-white/10 shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm mt-12 uppercase tracking-widest font-bold">Clique nas páginas para ampliar o conteúdo</p>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-950/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <XCircle className="w-8 h-8" />
              </button>
              <img 
                src={selectedImage} 
                alt="Preview do Material" 
                className="w-full h-auto rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7 — SEÇÃO "MAPEAMENTO TÉCNICO UNIVERSAL" */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>O Mapeamento Técnico Universal para concursos GCM</SectionTitle>
          <div className="bg-navy-900/50 rounded-3xl p-4 md:p-8 border border-white/5">
            {accordionItems.map((item, i) => (
              <AccordionItem 
                key={i}
                title={item.title}
                content={item.content}
                isOpen={openAccordion === i}
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8 — SEÇÃO "DEPOIMENTOS" */}
      <section className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle>Quem estuda com esse material recomenda</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "@pedro_robt", avatar: "https://i.ibb.co/yBcQNdzS/download-23.jpg", text: "Material direto ao ponto mesmo. Consegui organizar meus estudos muito melhor. Partiu aprovação SP 🚀", platform: "Instagram" },
              { name: "Mariana Silva", avatar: "https://i.ibb.co/hR4FZYFw/download-24.jpg", text: "Finalmente encontrei uma apostila focada no que realmente cai. O mapeamento técnico é sensacional.", platform: "WhatsApp" },
              { name: "@luca.s.trind", avatar: "https://i.ibb.co/PvP7t4Kc/Taurus-baby.jpg", text: "Estudava por uns material ai bem fraco na internet e não evoluia nada. Com esse material meu estudo melhorou ai uns 40% em um mês", platform: "Instagram" },
              { name: "Anderson Oliveira", avatar: "https://i.ibb.co/hRHGyNxM/Hugo-Simplement-gay-beard-bearded-boy-hairy-hairyguy-french-frenchguy-frenchgay-fr.jpg", text: "Eu tenho um amigo que tá estudando comigo. Eu recomendei pra ele e agora estamos os dois estudando juntos. Vamo 💪", platform: "WhatsApp" },
              { name: "@anaaaa.marquess", avatar: "https://i.ibb.co/0jShjpwF/download-22.jpg", text: "A plataforma é muito intuitiva e o material em PDF é muito bem diagramado. Vale cada centavo.", platform: "Instagram" },
            ].map((dep, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-navy-800 p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-300 italic mb-6">"{dep.text}"</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={dep.avatar} 
                      alt={dep.name} 
                      className="w-10 h-10 rounded-full object-cover border border-neon-blue/30"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-bold text-white text-sm">{dep.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-400 uppercase tracking-wider">{dep.platform}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — SEÇÃO "PLATAFORMA DE ESTUDOS" */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-8 leading-tight">
              Vá além da apostila: <br />
              <span className="text-neon-blue">Plataforma completa de estudos</span>
            </h2>
            <ul className="space-y-6 mb-10">
              {[
                "Apostila digital completa",
                "Conteúdo organizado",
                "Atualizações incluídas",
                "Acesso imediato"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xl text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-neon-blue" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-6">
              <Laptop className="w-8 h-8 text-slate-500" />
              <Tablet className="w-8 h-8 text-slate-500" />
              <Smartphone className="w-8 h-8 text-slate-500" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-neon-blue/10 blur-3xl rounded-full -z-10"></div>
            <img 
              src="https://i.ibb.co/KjK5xyFz/Whats-App-Image-2026-03-08-at-16-22-47.jpg" 
              alt="Plataforma GCM" 
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 10 — OFERTA */}
      <section ref={plansRef} className="py-24 px-6 bg-navy-900/80 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Escolha o plano que melhor se adapta ao seu momento de estudo.">
            Invista no seu futuro hoje
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Plano 1: Simples (Básico) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-navy-900/40 p-8 rounded-3xl border border-white/5 flex flex-col opacity-90 hover:opacity-100 transition-opacity"
            >
              <h3 className="text-xl font-bold text-slate-300 mb-2">Plano Simples</h3>
              <p className="text-slate-500 text-sm mb-6">Material Básico em PDFs</p>
              <div className="text-4xl font-black text-slate-200 mb-8">R$ 14,90</div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-2 text-sm text-slate-500">
                  <Check className="w-4 h-4 text-slate-600 mt-1 shrink-0" />
                  Material Teórico em PDF
                </li>
              </ul>
              <a href="https://pay.wiapy.com/M3B-5sPWi0" target="_blank" rel="noopener noreferrer">
                <CTAButton secondary className="w-full py-3 text-sm bg-navy-800 border-navy-700 text-slate-400 hover:text-white">COMPRAR AGORA</CTAButton>
              </a>
            </motion.div>

            {/* Plano 2: Essencial (Atraente) */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-navy-800/60 p-8 rounded-3xl border border-neon-blue/30 flex flex-col hover:border-neon-blue/60 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">Plano Essencial</h3>
              <p className="text-slate-400 text-sm mb-6">Completo para sua aprovação</p>
              <div className="text-4xl font-black text-white mb-8">R$ 28,90</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Material Teórico Completo",
                  "Questões Gabaritadas Inéditas",
                  "Mapas Mentais Esquematizados",
                  "Plataforma de Estudos Personalizada"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-neon-blue mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://pay.wiapy.com/1FbubZA4SC" target="_blank" rel="noopener noreferrer">
                <CTAButton className="w-full bg-navy-700 border border-neon-blue/50 hover:bg-neon-blue/20">COMPRAR AGORA</CTAButton>
              </a>
            </motion.div>

            {/* Plano 3: Combo Aprovação (O Mais Atrativo) */}
            <div className="flex flex-col">
              <motion.div 
                whileHover={{ y: -15 }}
                className="bg-navy-800 p-8 rounded-3xl border-2 border-neon-blue relative flex flex-col glow-blue shadow-[0_0_40px_rgba(59,130,246,0.2)] z-10 scale-105 h-full"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-navy-950 text-xs font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  MAIS ESCOLHIDO
                </div>
                <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                  Combo Aprovação <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                </h3>
                <p className="text-neon-blue font-semibold text-sm mb-6">O arsenal definitivo para sua vaga</p>
                
                <div className="mb-8">
                  <div className="text-sm text-slate-500 line-through mb-1">De R$ 96,90</div>
                  <div className="text-5xl font-black text-white flex items-baseline gap-1">
                    <span className="text-lg font-normal text-slate-400">Por R$</span> 48,90
                  </div>
                </div>

                <ul className="space-y-3 mb-10 flex-grow">
                  {[
                    "Material Teórico Completo",
                    "Questões Gabaritadas Inéditas",
                    "Mapas Mentais Esquematizados",
                    "Plataforma de Estudos Personalizada",
                    "Simulados Esquematizados",
                    "Redação Discursiva",
                    "Como Estudar com PDFs",
                    "Controle Emocional",
                    "Disciplina de Ferro",
                    "Atualizações Prioritárias",
                    "Suporte Vip 24h"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white font-medium">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://pay.wiapy.com/SMVdhXaWOI" target="_blank" rel="noopener noreferrer">
                  <CTAButton className="w-full py-5 text-xl !bg-emerald-500 hover:!bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 shadow-xl">ACESSO IMEDIATO</CTAButton>
                </a>
                <CountdownTimer compact />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — GARANTIA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-navy-900/50 p-12 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl rounded-full"></div>
          <ShieldCheck className="w-20 h-20 text-neon-blue mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Garantia de 7 Dias</h2>
          <div className="text-2xl font-black text-neon-blue mb-6">RISCO ZERO</div>
          <p className="text-slate-400 text-lg leading-relaxed">
            Se em até <strong>7 dias</strong> você não ficar satisfeito com o material, basta solicitar reembolso. <br />
            Completamente Seguro.
          </p>
        </div>
      </section>

      {/* 12 — FAQ */}
      <section className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>Dúvidas Frequentes</SectionTitle>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-navy-800/50 p-6 rounded-2xl border border-white/5">
                <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — CTA FINAL */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent_70%)] -z-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Comece a estudar hoje para a <br />
            <span className="text-neon-blue">próxima prova de GCM</span>
          </h2>
          <CTAButton onClick={scrollToPlans} className="mx-auto text-xl px-12 py-6">
            QUERO MEU MATERIAL AGORA
            <ArrowRight className="w-6 h-6" />
          </CTAButton>
          <div className="mt-12 flex items-center justify-center gap-8 opacity-50">
            <ShieldCheck className="w-12 h-12" />
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-left">
              <div className="text-white font-bold">Pagamento Seguro</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Criptografia SSL</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RODAPÉ */}
      <footer className="py-20 px-6 bg-navy-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a href="https://editoraeditalconcursos.vercel.app" className="flex items-center gap-4 mb-6 group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neon-blue group-hover:scale-110 transition-transform">
                <img 
                  src="https://i.ibb.co/0pQc7Mrp/1000112350.webp" 
                  alt="Editora Edital Concursos" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xl font-black text-white">Editora Edital Concursos</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Excelência em Aprovação</div>
              </div>
            </a>
            <p className="text-slate-500 text-sm max-w-sm">
              Transformando a vida de milhares de brasileiros através da educação estratégica para concursos públicos municipais.
            </p>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Links Úteis</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Política de Privacidade</a></li>
              <li><a href="https://editoraeditalconcursos.vercel.app" className="hover:text-neon-blue transition-colors">Site Oficial</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Contato</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neon-blue" />
                <a href="mailto:editoraeditalconcursos@gmail.com" className="hover:text-neon-blue transition-colors">editoraeditalconcursos@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-neon-blue" />
                <a href="https://wa.me/5541988420201" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">WhatsApp Suporte</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-neon-blue" />
                <a href="https://www.instagram.com/editoraeditalconcursos/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">@editoraeditalconcursos</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Editora Edital Concursos. Todos os direitos reservados. <br />
          Este site não faz parte do Google ou do Facebook. Além disso, este site NÃO é endossado pelo Google ou Facebook de nenhuma maneira.
        </div>
      </footer>
    </div>
  );
}
