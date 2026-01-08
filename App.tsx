
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { 
  Search, Bell, Plus, ArrowRight, Zap, Users, Building, Star, Globe, 
  Menu, X, MessageCircle, Phone, Award, ShieldCheck, Rocket, Target, Clock, Compass, ChevronRight, LogOut
} from 'lucide-react';
import { Sidebar } from './components/Dashboard/Sidebar';
import { Overview } from './components/Dashboard/Overview';
import { AiBuilder } from './components/Dashboard/AiBuilder';
import { AiChatbot } from './components/Dashboard/AiChatbot';
import { Backlog, Risks } from './components/Dashboard/ProjectModules';
import { MilestonesView, DeliverablesView, KPIsView, DocsView } from './components/Dashboard/ProjectViews';
import { Auth } from './components/Auth/Auth';
import { ProjectService } from './services/projectService';
import { ProjectDashboardConfig, Target as TargetType } from './types';
import { Logo } from './components/Logo';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const InfiniteMarquee = () => (
  <div className="w-full border-y border-white/5 py-8 overflow-hidden select-none bg-[#0B0B0F]">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center mx-10">
          <span className="text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-6 text-slate-500">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]" />
            Elite Project Mastery • AI Generated Dashboards • Precision Management • Operational Excellence
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
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-green-500 z-[60] origin-left" style={{ scaleX }} />
      
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-center">
        <div className="glass-dark rounded-3xl flex items-center justify-between px-10 py-5 w-full max-w-7xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <Logo />
          <div className="hidden lg:flex items-center gap-12">
            {['Services', 'Dashboard', 'IA Builder', 'Tarifs'].map((l) => (
              <button key={l} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-green-500 transition-all relative group">
                {l}
                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-green-500 transition-all group-hover:w-full" />
              </button>
            ))}
          </div>
          <button 
            onClick={() => setView('auth')}
            className="px-10 py-3.5 rounded-2xl bg-green-500 text-white text-xs font-black shadow-2xl shadow-green-500/20 hover:bg-green-600 transition-all uppercase tracking-widest flex items-center gap-3 transform active:scale-95"
          >
            <ShieldCheck size={16} /> Connexion
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1000px] bg-green-500/5 rounded-full blur-[250px] -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[11px] font-black uppercase tracking-[0.5em] mb-16 shadow-2xl shadow-green-500/10"
          >
            <Award size={16} className="animate-pulse" />
            L'IA AU SERVICE DE VOTRE RÉUSSITE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black tracking-tighter leading-[0.8] mb-20 text-white max-w-6xl uppercase"
          >
            MAÎTRISEZ <br />
            <RotatingText />
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full mt-10"
          >
            <button 
              onClick={() => setView('auth')}
              className="px-20 py-8 bg-green-500 text-white rounded-[2.5rem] font-black text-2xl shadow-[0_20px_60px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-5 group"
            >
              Démarrer le Projet <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
            </button>
            <button className="px-20 py-8 glass-dark border border-white/10 rounded-[2.5rem] font-black text-2xl hover:border-green-500/50 transition-all text-white">
              Démo Interactive
            </button>
          </motion.div>
        </div>
      </section>

      <InfiniteMarquee />

      {/* Secteurs - Visuel Premium */}
      <section className="py-56 px-6 bg-[#0B0B0F] relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#07070D] to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 max-w-5xl mx-auto">
            <div className="inline-block px-5 py-2 rounded-full bg-green-500/10 text-green-500 text-[11px] font-black uppercase tracking-[0.5em] mb-10 border border-green-500/20">
              SOLUTIONS SUR MESURE
            </div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 leading-[0.85] text-white">
              CHOISISSEZ <br /> <span className="text-green-500 italic">VOTRE ÉLITE</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Chaque secteur a ses propres défis. L'IA Elite adapte votre infrastructure en fonction de vos besoins spécifiques.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { id: 'people', icon: <Users size={40} />, title: 'PROS / INDÉS', desc: 'Landing pages haute conversion et tunnel de vente.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' },
              { id: 'business', icon: <Building size={40} />, title: 'ENTREPRISES', desc: 'Logiciel SaaS, ROI, Sécurité et pilotage multi-équipes.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
              { id: 'university', icon: <Star size={40} />, title: 'ACADÉMIQUE', desc: 'Campus digitaux, LMS, Intégrité IA et Syllabus.', img: 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&w=800&q=80' },
              { id: 'government', icon: <Globe size={40} />, title: 'INSTITUTIONS', desc: 'Compliance, RGPD, Traçabilité et Secteur Public.', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80' }
            ].map((cat, i) => (
              <motion.div 
                key={cat.id}
                {...fadeInUp}
                transition={{ delay: i * 0.15 }}
                onClick={() => { changePreset(cat.id as TargetType); setView('auth'); }}
                className="group relative h-[550px] rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#12121A] shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-12 flex flex-col justify-end cursor-pointer transition-all hover:-translate-y-4"
              >
                <div className="absolute inset-0 z-0">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-[#12121A]/80 to-transparent" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all shadow-2xl mb-8">
                    {cat.icon}
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter leading-none">{cat.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-100 transition-colors">
                    {cat.desc}
                  </p>
                </div>
                <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-green-500/30 rounded-[3.5rem] transition-all pointer-events-none z-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-32 px-6 border-t border-white/5 bg-[#07070D]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <Logo />
          <div className="mt-16 flex gap-12 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <button className="hover:text-green-500">Politique</button>
            <button className="hover:text-green-500">Conditions</button>
            <button className="hover:text-green-500">Contact</button>
          </div>
          <p className="text-slate-700 text-[11px] font-black uppercase tracking-[0.5em] mt-20">
            © 2026 ELITE PROJECT — IA MASTERY INFRASTRUCTURE LUXURY
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
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    currentConfig.project.target === t ? 'bg-green-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'
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
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">IA MASTER</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-white font-black text-lg shadow-xl">
                AE
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-10 overflow-y-auto custom-scrollbar">
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
