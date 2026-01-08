
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { 
  Search, Bell, ArrowRight, Award, ShieldCheck, Users, Building, Star, Globe, Menu, X 
} from 'lucide-react';
import { Sidebar } from './components/Dashboard/Sidebar';
import { Overview } from './components/Dashboard/Overview';
import { AiBuilder } from './components/Dashboard/AiBuilder';
import { DataArchitect } from './components/Dashboard/DataArchitect';
import { AiChatbot } from './components/Dashboard/AiChatbot';
import { Backlog, Risks } from './components/Dashboard/ProjectModules';
import { MilestonesView, DeliverablesView, KPIsView, DocsView } from './components/Dashboard/ProjectViews';
import { Auth } from './components/Auth/Auth';
import { ProjectService } from './services/projectService';
import { ProjectDashboardConfig, Target as TargetType } from './types';
import { Logo } from './components/Logo';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const InfiniteMarquee = () => (
  <div className="w-full border-y border-white/5 py-6 sm:py-8 overflow-hidden select-none bg-[#0B0B0F]">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center mx-6 sm:mx-10">
          <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-4 sm:gap-6 text-slate-500">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Elite Project Mastery • AI Generated Dashboards • Operational Excellence
          </span>
        </div>
      ))}
    </div>
  </div>
);

const RotatingText = () => {
  const words = ["L'EXCELLENCE", "LA PRÉCISION", "LA PERFORMANCE", "LE PILOTAGE"];
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 italic block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
    <div className="min-h-screen bg-[#07070D] font-['Poppins']">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-8 flex justify-center pt-safe">
        <div className="glass-dark rounded-2xl sm:rounded-3xl flex items-center justify-between px-6 sm:px-10 py-3 sm:py-5 w-full max-w-7xl shadow-2xl">
          <Logo />
          <div className="hidden lg:flex items-center gap-12">
            {['Services', 'Tarifs'].map((l) => (
              <button key={l} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-green-500 transition-all">{l}</button>
            ))}
          </div>
          <button onClick={() => setView('auth')} className="px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-green-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-500/20">
            Connexion
          </button>
        </div>
      </nav>

      <section className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 text-center overflow-hidden">
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-20" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-12">
            <Award size={14} /> L'IA AU SERVICE DE VOTRE RÉUSSITE
          </div>
          <h1 className="text-4xl sm:text-7xl lg:text-[110px] font-black tracking-tighter leading-[0.9] mb-12 text-white uppercase max-w-5xl">
            MAÎTRISEZ <br /> <RotatingText />
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10">
            <button onClick={() => setView('auth')} className="w-full sm:w-auto px-10 py-5 sm:py-7 bg-green-500 text-white rounded-[1.5rem] sm:rounded-[2.5rem] font-black text-xl sm:text-2xl shadow-2xl shadow-green-500/30 hover:scale-105 transition-all flex items-center justify-center gap-4">
              Démarrer <ArrowRight size={24} />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 sm:py-7 glass-dark border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] font-black text-xl sm:text-2xl text-white">
              Démo
            </button>
          </div>
        </div>
      </section>

      <InfiniteMarquee />

      <section className="py-24 sm:py-48 px-4 sm:px-6 bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter mb-8 text-white uppercase leading-[0.9]">
              CHOISISSEZ <br /> <span className="text-green-500 italic">VOTRE ÉLITE</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {[
              { id: 'people', icon: <Users size={32} />, title: 'INDÉS', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' },
              { id: 'business', icon: <Building size={32} />, title: 'BUSINESS', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
              { id: 'university', icon: <Star size={32} />, title: 'CAMPUS', img: 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&w=800&q=80' },
              { id: 'government', icon: <Globe size={32} />, title: 'PUBLIC', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80' }
            ].map((cat, i) => (
              <motion.div key={cat.id} {...fadeInUp} onClick={() => { changePreset(cat.id as TargetType); setView('auth'); }} className="group relative h-[350px] sm:h-[500px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 bg-[#12121A] p-8 sm:p-12 flex flex-col justify-end cursor-pointer transition-all hover:-translate-y-2">
                <div className="absolute inset-0">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-[#12121A]/80 to-transparent" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 mb-6">
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center pb-[calc(2rem+var(--safe-bottom))]">
        <Logo />
        <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] mt-8">© 2026 ELITE PROJECT MASTER</p>
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
              <input type="text" placeholder="Chercher..." className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl text-xs font-medium outline-none text-white" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:flex items-center bg-black/40 p-1 rounded-xl border border-white/5">
               {['people', 'business'].map(t => (
                 <button key={t} onClick={() => changePreset(t as TargetType)} className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${currentConfig.project.target === t ? 'bg-green-500 text-white' : 'text-slate-500 hover:text-white'}`}>
                   {t}
                 </button>
               ))}
            </div>
            <button className="text-slate-400 hover:text-green-500"><Bell size={20} /></button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-black text-xs sm:text-sm">AE</div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-10 overflow-y-auto custom-scrollbar pb-[calc(5rem+var(--safe-bottom))]">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {activeTab === 'overview' && <Overview config={currentConfig} />}
              {activeTab === 'backlog' && <Backlog config={currentConfig} />}
              {activeTab === 'risks' && <Risks config={currentConfig} />}
              {activeTab === 'milestones' && <MilestonesView config={currentConfig} />}
              {activeTab === 'deliverables' && <DeliverablesView config={currentConfig} />}
              {activeTab === 'kpis' && <KPIsView config={currentConfig} />}
              {activeTab === 'docs' && <DocsView config={currentConfig} />}
              {activeTab === 'ai-builder' && <AiBuilder onConfigGenerated={handleConfigGenerated} />}
              {activeTab === 'data-architect' && <DataArchitect />}
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
