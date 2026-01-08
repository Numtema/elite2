
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Plus, 
  ArrowRight, 
  Zap, 
  Users, 
  Building, 
  Star, 
  Globe 
} from 'lucide-react';
import { Sidebar } from './components/Dashboard/Sidebar';
import { Overview } from './components/Dashboard/Overview';
import { AiBuilder } from './components/Dashboard/AiBuilder';
import { Backlog, Risks } from './components/Dashboard/ProjectModules';
import { MilestonesView, DeliverablesView, KPIsView, DocsView } from './components/Dashboard/ProjectViews';
import { Auth } from './components/Auth/Auth';
import { ProjectService } from './services/projectService';
import { ProjectDashboardConfig, Target } from './types';
import { Logo } from './components/Logo';

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [currentConfig, setCurrentConfig] = useState<ProjectDashboardConfig>(() => {
    return ProjectService.loadFromLocalStorage() || ProjectService.getPreset('people');
  });

  const handleConfigGenerated = (config: ProjectDashboardConfig) => {
    setCurrentConfig(config);
    ProjectService.saveToLocalStorage(config);
    setActiveTab('overview');
  };

  const changePreset = (target: Target) => {
    const config = ProjectService.getPreset(target);
    setCurrentConfig(config);
    ProjectService.saveToLocalStorage(config);
    setActiveTab('overview');
  };

  const LandingPage = () => (
    <div className="min-h-screen relative overflow-hidden bg-[#07070D] flex flex-col font-['Poppins']">
      <div className="absolute inset-0 hero-grid pointer-events-none opacity-30" />
      
      <nav className="h-24 px-10 flex items-center justify-between z-50">
        <Logo />
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => setView('auth')} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-black text-white uppercase tracking-widest hover:border-green-500/40 transition-all">
            Connexion
          </button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[10px] font-black uppercase tracking-widest mb-8">
            <Zap size={12} /> Excellence en Management de Projet
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase">
            Bâtissez votre <br /> 
            <span className="text-green-500 text-shadow-glow">Elite Master</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-14 leading-relaxed">
            Propulsez vos landing pages et formations avec notre dashboard piloté par l'IA. 
            Précision chirurgicale. Performance maximale.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setView('auth')} 
              className="px-12 py-6 bg-green-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-green-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              Démarrer l'aventure <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>

        <div className="mt-32 w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            { id: 'people', icon: <Users />, label: 'Indépendants', desc: 'Landing Pages B2C' },
            { id: 'business', icon: <Building />, label: 'Entreprises', desc: 'Solutions SaaS ROI' },
            { id: 'university', icon: <Star />, label: 'Académique', desc: 'LMS & Formation' },
            { id: 'government', icon: <Globe />, label: 'Gouvernement', desc: 'Compliance & RGPD' }
          ].map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => { changePreset(cat.id as Target); setView('auth'); }}
              className="bg-[#12121A] border border-white/5 p-8 rounded-[2.5rem] text-left hover:border-green-500/30 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-white font-black uppercase text-lg mb-1">{cat.label}</h3>
              <p className="text-slate-500 text-xs font-medium">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40 w-full overflow-hidden py-8 border-y border-white/5 bg-white/5">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-12 gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                AI Driven Dashboards • Elite Mastery • Precision Workflow
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DashboardLayout = () => (
    <div className="flex min-h-screen bg-[#07070D] font-['Poppins'] text-slate-100 selection:bg-green-500 selection:text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setView('landing')} 
      />
      
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
               {(['people', 'business', 'university', 'government'] as Target[]).map(t => (
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
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
