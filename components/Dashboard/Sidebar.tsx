
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, ListTodo, Flag, Box, AlertTriangle, BarChart3, FileText, Sparkles, ChevronRight, LogOut, Database 
} from 'lucide-react';
import { Logo } from '../Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  overview: <LayoutDashboard size={20} />,
  backlog: <ListTodo size={20} />,
  milestones: <Flag size={20} />,
  deliverables: <Box size={20} />,
  risks: <AlertTriangle size={20} />,
  kpis: <BarChart3 size={20} />,
  docs: <FileText size={20} />,
  'ai-builder': <Sparkles size={20} />,
  'data-architect': <Database size={20} />,
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
    { id: 'data-architect', label: "Data Architect" },
  ];

  return (
    <aside className="w-[280px] h-full flex flex-col bg-[#0B0B0F] border-r border-white/5 pt-safe shrink-0">
      <div className="p-8">
        <Logo />
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden ${
              activeTab === item.id 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                : 'text-slate-500 hover:bg-white/5 hover:text-green-500'
            }`}
          >
            <span className="relative z-10">{iconMap[item.id] || <Box size={20} />}</span>
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] flex-1 text-left">
              {item.label}
            </span>
            {activeTab === item.id && <ChevronRight size={14} className="relative z-10" />}
            
            {activeTab === item.id && (
              <motion.div layoutId="active-nav" className="absolute inset-0 bg-green-500 -z-0" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto pb-[calc(1.5rem+var(--safe-bottom))]">
        <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest">
          <LogOut size={20} /> Quitter
        </button>
      </div>
    </aside>
  );
};
