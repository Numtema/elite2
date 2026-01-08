
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Rocket, 
  Target, 
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ProjectDashboardConfig, Trend } from '../../types';

interface OverviewProps {
  config: ProjectDashboardConfig;
}

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === 'up') return <TrendingUp size={16} className="text-green-500" />;
  if (trend === 'down') return <TrendingDown size={16} className="text-red-500" />;
  return <Minus size={16} className="text-slate-500" />;
};

export const Overview: React.FC<OverviewProps> = ({ config }) => {
  // Sécurité: fallback si config ou overview est undefined
  const project = config?.project || { name: 'Projet', target: 'people', startDate: '', type: '', owner: '', status: 'on_track' };
  const overview = config?.overview || { 
    kpiTiles: [], 
    spotlight: { badge: 'N/A', title: 'Pas de données', subtitle: '' },
    weeklyGoal: { percent: 0, title: 'Objectif', subtitle: '' }
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
              {project.target}
            </span>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Démarré le {project.startDate}
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            {project.name}
          </h1>
          <p className="text-slate-400 font-medium mt-2">{project.type} • Dirigé par {project.owner}</p>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</span>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            project.status === 'on_track' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
            project.status === 'at_risk' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' :
            'border-red-500/30 text-red-500 bg-red-500/5'
          }`}>
            <CheckCircle2 size={16} />
            <span className="text-sm font-black uppercase tracking-widest">
              {project.status?.replace('_', ' ')}
            </span>
          </div>
        </div>
      </header>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overview.kpiTiles?.map((tile, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#12121A] p-8 rounded-[2.5rem] border border-white/5 shadow-sm hover:border-green-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                {i === 0 && <Rocket size={24} />}
                {i === 1 && <Target size={24} />}
                {i === 2 && <Clock size={24} />}
                {i === 3 && <Zap size={24} />}
              </div>
              <TrendIcon trend={tile.trend} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{tile.label}</p>
            <h3 className="text-4xl font-black text-white">{tile.value}</h3>
            {tile.note && (
              <p className="text-[10px] text-slate-500 mt-4 italic">{tile.note}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spotlight block */}
        <div className="lg:col-span-2 bg-slate-900 dark:bg-[#12121A] rounded-[3rem] p-10 text-white relative overflow-hidden border border-white/5 shadow-xl">
          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-600 text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
              <AlertCircle size={12} /> {overview.spotlight?.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase leading-tight">
              {overview.spotlight?.title}
            </h2>
            <p className="text-slate-400 font-medium mb-8 max-w-lg">
              {overview.spotlight?.subtitle}
            </p>
            <button className="w-fit px-10 py-5 bg-green-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-500/20">
              Voir le jalon
            </button>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-500/5 rounded-full blur-[80px]" />
        </div>

        {/* Weekly Goal Circle */}
        <div className="bg-[#12121A] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
              <circle 
                cx="50" cy="50" r="42" 
                fill="none" stroke="#22c55e" 
                strokeWidth="8" 
                strokeDasharray={`${(overview.weeklyGoal?.percent || 0) * 2.64} 264`} 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">{overview.weeklyGoal?.percent}%</span>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Atteint</span>
            </div>
          </div>
          <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
            {overview.weeklyGoal?.title}
          </h4>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            {overview.weeklyGoal?.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
