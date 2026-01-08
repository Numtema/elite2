
import React from 'react';
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
  LogOut
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
    <aside className="w-72 h-screen border-r border-white/5 flex flex-col bg-[#0B0B0F] sticky top-0 z-40 transition-colors duration-300">
      <div className="p-8">
        <Logo />
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
              activeTab === item.id 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-green-500'
            }`}
          >
            <span className={`${activeTab === item.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
              {iconMap[item.id] || <Box size={20} />}
            </span>
            <span className="text-sm font-bold uppercase tracking-widest flex-1 text-left">
              {item.label}
            </span>
            {activeTab === item.id && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:text-green-500 hover:bg-green-500/10 transition-all font-bold text-sm uppercase tracking-widest"
        >
          <LogOut size={20} />
          Quitter
        </button>
      </div>
    </aside>
  );
};
