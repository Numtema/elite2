
import React from 'react';
// Added motion import from framer-motion
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ListTodo, 
  Flag, 
  Box, 
  AlertTriangle, 
  BarChart3, 
  FileText, 
  Sparkles,
  ChevronRight,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { Logo } from '../Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  overview: <LayoutDashboard size={22} />,
  backlog: <ListTodo size={22} />,
  milestones: <Flag size={22} />,
  deliverables: <Box size={22} />,
  risks: <AlertTriangle size={22} />,
  kpis: <BarChart3 size={22} />,
  docs: <FileText size={22} />,
  'ai-builder': <Sparkles size={22} />,
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'overview', label: "Vue d'ensemble" },
    { id: 'backlog', label: "Backlog" },
    { id: 'milestones', label: "Jalons" },
    { id: 'deliverables', label: "Livrables" },
    { id: 'risks', label: "Risques" },
    { id: 'kpis', label: "KPIs" },
    { id: 'docs', label: "Docs" },
    { id: 'ai-builder', label: "AI Builder" },
  ];

  return (
    <aside className="w-80 h-screen border-r border-white/5 flex flex-col bg-[#0B0B0F] sticky top-0 z-40">
      <div className="p-10">
        <Logo />
      </div>

      <nav className="flex-1 px-6 mt-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all group relative overflow-hidden ${
              activeTab === item.id 
                ? 'bg-green-600 text-white shadow-2xl shadow-green-600/30' 
                : 'text-slate-500 hover:bg-white/5 hover:text-green-500'
            }`}
          >
            <span className={`relative z-10 ${activeTab === item.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
              {iconMap[item.id] || <Box size={22} />}
            </span>
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] flex-1 text-left">
              {item.label}
            </span>
            {activeTab === item.id && <ChevronRight size={16} className="relative z-10" />}
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 -z-0"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-8 mt-auto">
        <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Besoin d'aide ?</p>
          <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">L'IA Assistant est prête à structurer vos idées.</p>
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B0B0F] bg-green-500/20 flex items-center justify-center">
                <Sparkles size={12} className="text-green-500" />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-5 px-6 py-5 rounded-[2rem] text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition-all font-black text-[11px] uppercase tracking-widest"
        >
          <LogOut size={22} />
          Quitter
        </button>
      </div>
    </aside>
  );
};
