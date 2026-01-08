import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { 
  Search, Bell, ArrowRight, Award, ShieldCheck, Users, Building, Star, Globe, Menu, X, Zap, Target, Cpu, Database, Image as ImageIcon, Mic
} from 'lucide-react';
import { Sidebar } from './components/Dashboard/Sidebar';
import { Overview } from './components/Dashboard/Overview';
import { AiBuilder } from './components/Dashboard/AiBuilder';
import { DataArchitect } from './components/Dashboard/DataArchitect';
import { MediaLab } from './components/Dashboard/MediaLab';
import { StrategyHub } from './components/Dashboard/StrategyHub';
import { AiChatbot } from './components/Dashboard/AiChatbot';
import { Backlog, Risks } from './components/Dashboard/ProjectModules';
import { MilestonesView, DeliverablesView, KPIsView, DocsView } from './components/Dashboard/ProjectViews';
import { Auth } from './components/Auth/Auth';
import { ProjectService } from './services/projectService';
import { ProjectDashboardConfig, Target as TargetType } from './types';
import { Logo } from './components/Logo';

// Fix: Adding 'as const' to resolve Framer Motion transition type issues
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
} as const;

const InfiniteMarquee = () => (
  <div className="w-full border-y border-white/5 py-8 overflow-hidden select-none bg-[#0B0B0F]">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center mx-10">
          <span className="text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-8 text-slate-500">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            Elite Project Mastery • AI Generated Dashboards • Data Architecture • Media Lab • Strategy Live
          </span>
        </div>
      ))}
    </div>
  </div>
);

const RotatingText = () => {
  const words = ["L'EXCELLENCE", "VOTRE SAAS", "LA PERFORMANCE", "VOTRE VISION"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[1.2em] overflow-hidden inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 italic block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<ProjectDashboardConfig>(() => {
    return ProjectService.loadFromLocalStorage() || ProjectService.getPreset('people');
  });

  const handleConfigGenerated = (config: ProjectDashboardConfig) => {
    setCurrentConfig(config);
    ProjectService.saveToLocalStorage(config);
    setActiveTab('overview');
    setView('dashboard');
  };

  const changePreset = (target: TargetType) => {
    const config = ProjectService.getPreset(target);
    setCurrentConfig(config);
    ProjectService.saveToLocalStorage(config);
    setActiveTab('overview');
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-[#07070D] font-['Poppins'] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-center pt-safe">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-dark rounded-[2.5rem] flex items-center justify-between px-10 py-5 w-full max-w-7xl shadow-2xl border border-white/10"
        >
          <Logo />
          <div className="hidden lg:flex items-center gap-12">
            {['Solutions', 'Ecosystème', 'Tarifs'].map((l) => (
              <button key={l} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-green-500 transition-all">{l}</button>
            ))}
          </div>
          <button onClick={() => setView('auth')} className="px-10 py-4 rounded-2xl bg-green-500 text-white text-xs font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            Accès Membre
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-30" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[11px] font-black uppercase tracking-[0.4em] mb-12">
            <Zap size={14} className="animate-pulse" /> PROPULSÉ PAR GEMINI 2.5 & VEO 3.1
          </div>
          <h1 className="text-5xl sm:text-8xl lg:text-[130px] font-black tracking-tighter leading-[0.85] mb-12 text-white uppercase max-w-6xl">
            BÂTISSEZ <br /> <RotatingText />
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
            L'infrastructure IA tout-en-un pour concevoir, prototyper et lancer vos SaaS avec une précision chirurgicale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button onClick={() => setView('auth')} className="w-full sm:w-auto px-12 py-7 bg-green-500 text-white rounded-[2rem] font-black text-2xl shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-4">
              Démarrer le Blueprint <ArrowRight size={28} />
            </button>
            <button className="w-full sm:w-auto px-12 py-7 glass-dark border border-white/10 rounded-[2rem] font-black text-2xl text-white hover:bg-white/5 transition-all">
              Voir la démo
            </button>
          </div>
        </motion.div>
      </section>

      <InfiniteMarquee />

      {/* Pillars Section */}
      <section className="py-32 px-6 bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div {...fadeInUp} className="group p-10 rounded-[3rem] bg-[#12121A] border border-white/5 hover:border-green-500/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 group-hover:scale-110 transition-transform">
                <Database size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Data Architect</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Générez des schémas PostgreSQL complexes, des migrations SQL et des contrats d'API complets à partir d'un simple brief.</p>
              <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} /> Ready for Production
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="group p-10 rounded-[3rem] bg-[#12121A] border border-white/5 hover:border-green-500/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 group-hover:scale-110 transition-transform">
                <ImageIcon size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Media Lab</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Créez vos visuels Hero 4K et vos vidéos de démo produit via Veo 3.1. L'IA génère vos assets marketing en temps réel.</p>
              <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                <Cpu size={14} /> Cinematic Generation
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="group p-10 rounded-[3rem] bg-[#12121A] border border-white/5 hover:border-green-500/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 group-hover:scale-110 transition-transform">
                <Mic size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Strategy Hub</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Brainez votre stratégie avec un expert vocal en direct. Une conversation audio fluide pour affiner vos KPIs et votre business plan.</p>
              <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                <Target size={14} /> Real-time Coaching
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-48 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 {...fadeInUp} className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter mb-16 text-white uppercase leading-[0.9]">
            UNE INTERFACE <br /> <span className="text-green-500 italic">SUR-MESURE</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbdac8a28a16?auto=format&fit=crop&w=1600&q=80" 
              className="w-full grayscale opacity-50"
              alt="Elite Dashboard"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] to-transparent" />
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-10">
              <button onClick={() => setView('auth')} className="px-16 py-8 bg-green-500 text-white rounded-3xl font-black text-2xl uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                Entrer dans l'Élite
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center bg-[#0B0B0F]">
        <Logo />
        <div className="flex justify-center gap-10 my-10">
          {['LinkedIn', 'Twitter', 'Documentation'].map(link => (
            <button key={link} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-all">{link}</button>
          ))}
        </div>
        <p className="text-slate-800 text-[9px] font-black uppercase tracking-[0.6em]">© 2026 ELITE PROJECT MASTER — DESIGNED FOR BUILDERS</p>
      </footer>
    </div>
  );

  const DashboardLayout = () => (
    <div className="flex h-dvh bg-[#07070D] overflow-hidden pl-safe pr-safe">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-[55] transform transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} onLogout={() => setView('landing')} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between bg-[#12121A] border-b border-white/5 pt-safe shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white">
              <Menu size={24} />
            </button>
            <div className="hidden sm:block relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={16} />
              <input type="text" placeholder="Chercher dans Elite..." className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs font-medium outline-none text-white focus:border-green-500/50" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-lg shadow-green-500/20">AE</div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-10 overflow-y-auto custom-scrollbar pb-[calc(5rem+var(--safe-bottom))]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <Overview config={currentConfig} />}
              {activeTab === 'backlog' && <Backlog config={currentConfig} />}
              {activeTab === 'ai-builder' && <AiBuilder onConfigGenerated={handleConfigGenerated} />}
              {activeTab === 'data-architect' && <DataArchitect />}
              {activeTab === 'media-lab' && <MediaLab />}
              {activeTab === 'strategy-hub' && <StrategyHub />}
              {activeTab === 'kpis' && <KPIsView config={currentConfig} />}
              {activeTab === 'docs' && <DocsView config={currentConfig} />}
              {activeTab === 'milestones' && <MilestonesView config={currentConfig} />}
              {activeTab === 'deliverables' && <DeliverablesView config={currentConfig} />}
              {activeTab === 'risks' && <Risks config={currentConfig} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <AiChatbot />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07070D]">
      <AnimatePresence mode="wait">
        {view === 'landing' && <LandingPage key="landing" />}
        {view === 'auth' && <Auth key="auth" onSuccess={() => setView('dashboard')} />}
        {view === 'dashboard' && <DashboardLayout key="dashboard" />}
      </AnimatePresence>
    </div>
  );
}