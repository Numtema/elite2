
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { 
  Search, Bell, Plus, ArrowRight, Zap, Users, Building, Star, Globe, 
  Menu, X, MessageCircle, Phone, Award, ShieldCheck, Rocket, Target, Clock, Compass, ChevronRight, LogOut
} from 'lucide-react';
import { Sidebar } from './components/Dashboard/Sidebar';
import { Overview } from './components/Dashboard/Overview';
import { AiBuilder } from './components/Dashboard/AiBuilder';
import { Backlog, Risks } from './components/Dashboard/ProjectModules';
import { MilestonesView, DeliverablesView, KPIsView, DocsView } from './components/Dashboard/ProjectViews';
import { Auth } from './components/Auth/Auth';
import { ProjectService } from './services/projectService';
import { ProjectDashboardConfig, Target as TargetType } from './types';
import { Logo } from './components/Logo';

// --- Animations Helper (Style Luxury) ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// --- Landing Components (Style Luxury) ---

const InfiniteMarquee = () => (
  <div className="w-full border-y border-white/5 py-6 overflow-hidden select-none bg-[#0B0B0F]">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center mx-10">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-4 text-slate-500">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            AI Precision • Dashboard Elite • Enterprise ROI • Smart Management
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
          transition={{ duration: 0.4, ease: "easeOut" }}
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
    <div className="min-h-screen bg-[#07070D] selection:bg-green-500 selection:text-white overflow-x-hidden font-['Poppins']">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-green-500 z-[60] origin-left" style={{ scaleX }} />
      
      {/* Navbar (Style Luxury) */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-center">
        <div className="glass-dark rounded-2xl flex items-center justify-between px-8 py-4 w-full max-w-7xl border border-white/5 shadow-2xl">
          <Logo />
          <div className="hidden lg:flex items-center gap-10">
            {['Services', 'Dashboard', 'IA Builder', 'Tarifs'].map((l) => (
              <button key={l} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-green-500 transition-colors relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-green-500 transition-all group-hover:w-full" />
              </button>
            ))}
          </div>
          <button 
            onClick={() => setView('auth')}
            className="px-8 py-2.5 rounded-xl bg-green-500 text-white text-[10px] font-black shadow-lg shadow-green-500/20 hover:bg-green-600 transition-all uppercase tracking-widest flex items-center gap-2"
          >
            <ShieldCheck size={14} /> Connexion
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[100%] h-[800px] bg-green-500/5 rounded-full blur-[200px] -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-black uppercase tracking-[0.4em] mb-14 shadow-lg shadow-green-500/10"
          >
            <Award size={14} className="animate-pulse" />
            VOTRE PROJET, L'IA EN PLUS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] mb-16 text-white max-w-5xl uppercase"
          >
            BÂTISSEZ VOTRE <br />
            <RotatingText />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-medium max-w-2xl mb-20 leading-relaxed text-slate-400"
          >
            Propulsez vos landing pages et formations avec Elite Project. Le dashboard piloté par l'IA pour une excellence sans compromis.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
          >
            <button 
              onClick={() => setView('auth')}
              className="px-16 py-7 bg-green-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-green-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              Démarrer le Projet <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-16 py-7 glass-dark border border-white/10 rounded-2xl font-black text-xl hover:border-green-500/50 transition-all text-white">
              Démo IA
            </button>
          </motion.div>
        </div>
      </section>

      <InfiniteMarquee />

      {/* Secteurs Section (Style Services Luxury) */}
      <section className="py-40 px-6 bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-green-500/20">
              NOS PRÉSETS ÉLITE
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
              SÉLECTIONNEZ <br /> <span className="text-green-500">VOTRE CIBLE</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'people', icon: <Users size={32} />, title: 'Indépendants', desc: 'Landing pages conversion B2C rapides.' },
              { id: 'business', icon: <Building size={32} />, title: 'Entreprises', desc: 'ROI, Sales et sécurité des données.' },
              { id: 'university', icon: <Star size={32} />, title: 'Académique', desc: 'Formations, LMS et intégrité IA.' },
              { id: 'government', icon: <Globe size={32} />, title: 'Gouvernement', desc: 'Compliance, RGPD et traçabilité.' }
            ].map((cat, i) => (
              <motion.div 
                key={cat.id}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                onClick={() => { changePreset(cat.id as TargetType); setView('auth'); }}
                className="group relative h-[450px] rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#12121A] shadow-2xl p-10 flex flex-col justify-end cursor-pointer"
              >
                <div className="absolute top-10 left-10 w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all shadow-xl">
                  {cat.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">{cat.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                  {cat.desc}
                </p>
                <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-green-500/30 rounded-[3.5rem] transition-all pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-[#07070D]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <Logo />
          <p className="text-slate-600 text-sm font-bold uppercase tracking-widest mt-10">
            © 2026 ELITE PROJECT — IA MASTERY INFRASTRUCTURE
          </p>
        </div>
      </footer>
    </div>
  );

  const DashboardLayout = () => (
    <div className="flex min-h-screen bg-[#07070D] font-['Poppins'] text-slate-100 selection:bg-green-500 selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setView('landing')} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 px-10 flex items-center justify-between bg-[#12121A] border-b border-white/5 shrink-0">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Chercher une tâche, un risque, un jalon..." 
              className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/5 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 outline-none transition-all text-white"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-black/40 p-1.5 rounded-2xl border border-white/5 mr-6">
               {(['people', 'business', 'university', 'government'] as TargetType[]).map(t => (
                 <button 
                  key={t}
                  onClick={() => changePreset(t)}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    currentConfig.project.target === t ? 'bg-green-500 text-white' : 'text-slate-500 hover:text-white'
                  }`}
                 >
                   {t}
                 </button>
               ))}
            </div>
            <button className="relative text-slate-400 hover:text-green-500 transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-[#12121A]" />
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-white uppercase leading-none">Admin Elite</p>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">Project Master</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                AE
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {activeTab === 'overview' && <Overview config={currentConfig} />}
              {activeTab === 'backlog' && <Backlog config={currentConfig} />}
              {activeTab === 'risks' && <Risks config={currentConfig} />}
              {activeTab === 'milestones' && <MilestonesView config={currentConfig} />}
              {activeTab === 'deliverables' && <DeliverablesView config={currentConfig} />}
              {activeTab === 'kpis' && <KPIsView config={currentConfig} />}
              {activeTab === 'docs' && <DocsView config={currentConfig} />}
              {activeTab === 'ai-builder' && <AiBuilder onConfigGenerated={handleConfigGenerated} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
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
