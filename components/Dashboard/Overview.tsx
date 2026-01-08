
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Minus, Rocket, Target, Zap, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { ProjectDashboardConfig, Trend } from '../../types';

interface OverviewProps {
  config: ProjectDashboardConfig;
}

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === 'up') return <TrendingUp size={14} className="text-green-500" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-slate-500" />;
};

export const Overview: React.FC<OverviewProps> = ({ config }) => {
  const project = config?.project || { name: 'Elite Project', target: 'people', startDate: '2024', type: 'IA', owner: 'Admin', status: 'on_track' };
  const overview = config?.overview || { kpiTiles: [], spotlight: { badge: 'N/A', title: '', subtitle: '' }, weeklyGoal: { percent: 0, title: '', subtitle: '' } };

  const safeKpiTiles = (overview.kpiTiles && overview.kpiTiles.length > 0) ? overview.kpiTiles : [];

  return (
    <div className="space-y-8 sm:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
              {project.target}
            </span>
            <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{project.startDate}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
            {project.name}
          </h1>
        </div>
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
          project.status === 'on_track' ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-red-500/30 text-red-500 bg-red-500/5'
        }`}>
          <CheckCircle2 size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">{project.status}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {safeKpiTiles.map((tile, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-[#12121A] p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-500/10 w-10 h-10 rounded-xl flex items-center justify-center text-green-500">
                {i === 0 ? <Rocket size={18} /> : i === 1 ? <Target size={18} /> : i === 2 ? <Clock size={18} /> : <Zap size={18} />}
              </div>
              <TrendIcon trend={tile.trend} />
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{tile.label}</p>
            <h3 className="text-3xl font-black text-white leading-none">{tile.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-[#12121A] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 relative overflow-hidden border border-white/5">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600 text-[9px] font-black uppercase tracking-widest mb-6">
              <AlertCircle size={10} /> {overview.spotlight?.badge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase leading-tight text-white">{overview.spotlight?.title}</h2>
            <p className="text-slate-400 text-sm font-medium mb-8 max-w-lg leading-relaxed">{overview.spotlight?.subtitle}</p>
            <button className="px-8 py-4 bg-green-500 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl">Action</button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-500/5 rounded-full blur-[60px]" />
        </div>

        <div className="bg-[#12121A] border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 flex flex-col items-center justify-center text-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray={`${(overview.weeklyGoal?.percent || 0) * 2.64} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-white">{overview.weeklyGoal?.percent || 0}%</span>
            </div>
          </div>
          <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">{overview.weeklyGoal?.title}</h4>
          <p className="text-slate-500 text-xs leading-relaxed">{overview.weeklyGoal?.subtitle}</p>
        </div>
      </div>
    </div>
  );
};
