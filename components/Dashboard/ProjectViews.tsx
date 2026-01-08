
import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Box, BarChart3, FileText, CheckCircle2, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { ProjectDashboardConfig } from '../../types';

export const MilestonesView: React.FC<{ config: ProjectDashboardConfig }> = ({ config }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Chronologie des Jalons</h2>
      <div className="space-y-4">
        {config.milestones.items.map((m, i) => (
          <div key={m.id} className="bg-[#12121A] border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                m.status === 'done' ? 'bg-green-500/20 text-green-500' : 
                m.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-500/20 text-slate-500'
              }`}>
                <Flag size={20} />
              </div>
              <div>
                <h3 className="text-white font-black uppercase text-lg">{m.title}</h3>
                <p className="text-slate-500 text-xs mt-1">{m.notes}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">{m.date}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-1">{m.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DeliverablesView: React.FC<{ config: ProjectDashboardConfig }> = ({ config }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Livrables & Validations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.deliverables.items.map((d) => (
          <div key={d.id} className="bg-[#12121A] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-500/10 p-3 rounded-xl text-green-500"><Box size={24} /></div>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                d.status === 'approved' ? 'bg-green-500/20 text-green-500' : 'bg-slate-500/20 text-slate-400'
              }`}>{d.status}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-2 uppercase leading-none">{d.title}</h3>
            <p className="text-slate-500 text-xs mb-8">Validé par: <span className="text-slate-300 font-bold">{d.validator}</span></p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <Clock size={12} /> Échéance: {d.dueDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const KPIsView: React.FC<{ config: ProjectDashboardConfig }> = ({ config }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Indicateurs de Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#12121A] border border-white/5 p-10 rounded-[3rem]">
          <h3 className="text-white font-black uppercase tracking-tight mb-8">Avancement par module</h3>
          <div className="space-y-6">
            {['Copywriting', 'Design UX', 'Développement', 'SEO'].map((m, i) => (
              <div key={m} className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-slate-400">{m}</span>
                  <span className="text-white">{[80, 45, 12, 0][i]}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${[80, 45, 12, 0][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#12121A] border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full border-4 border-green-500/30 flex items-center justify-center mb-6">
            <BarChart3 className="text-green-500" size={48} />
          </div>
          <h3 className="text-white font-black uppercase tracking-tight mb-2">Score de Santé Projet</h3>
          <p className="text-slate-500 text-sm font-medium">Calculé sur la base des risques, délais et budget.</p>
          <div className="mt-6 text-5xl font-black text-white">82/100</div>
        </div>
      </div>
    </div>
  );
};

export const DocsView: React.FC<{ config: ProjectDashboardConfig }> = ({ config }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Documentation & Décisions</h2>
      <div className="bg-[#12121A] border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-3 text-green-500">
          <FileText size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Registre des décisions (Decision Log)</span>
        </div>
        <div className="divide-y divide-white/5">
          {config.docs.decisionLog.map((log) => (
            <div key={log.id} className="p-8 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-black uppercase text-lg">{log.decision}</h4>
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">{log.date}</span>
              </div>
              <p className="text-slate-500 text-sm italic">Impact: {log.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
