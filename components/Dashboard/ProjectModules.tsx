
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  ChevronDown, 
  Clock, 
  User, 
  AlertTriangle, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ProjectDashboardConfig } from '../../types';

export const Backlog: React.FC<{ config: ProjectDashboardConfig }> = ({ config }) => {
  const items = config.backlog.items;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Backlog Projet</h2>
        <button className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-2">
          <Plus size={18} /> Nouvelle tâche
        </button>
      </div>

      <div className="bg-[#12121A] border border-white/5 rounded-[2rem] overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">ID</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Titre</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Priorité</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Propriétaire</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Échéance</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.length > 0 ? items.map((item, i) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6 text-green-500 font-black text-xs">{item.id}</td>
                <td className="px-8 py-6 text-white font-bold text-sm">{item.title}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    item.priority === 'P0' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    item.priority === 'P1' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                    'bg-slate-500/10 text-slate-500 border-slate-500/20'
                  }`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'done' ? 'bg-green-500' :
                      item.status === 'doing' ? 'bg-blue-500' : 'bg-slate-700'
                    }`} />
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] font-black text-green-500">
                      {item.owner.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-white text-xs font-medium">{item.owner}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-slate-400 text-xs font-medium">{item.dueDate}</td>
                <td className="px-8 py-6 text-right">
                  <button className="text-slate-600 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-8 py-20 text-center text-slate-600 italic">
                  Aucune tâche dans le backlog. Utilisez l'AI Builder pour en générer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Risks: React.FC<{ config: ProjectDashboardConfig }> = ({ config }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Registre des Risques</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.risks.items.length > 0 ? config.risks.items.map((risk, i) => (
          <div key={i} className="bg-[#12121A] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                risk.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
              }`}>
                {risk.severity} Severity
              </span>
              <AlertTriangle className={risk.severity === 'high' ? 'text-red-500' : 'text-yellow-500'} />
            </div>
            <h3 className="text-xl font-black text-white mb-4 uppercase leading-tight">{risk.risk}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed"><strong>Mitigation:</strong> {risk.mitigation}</p>
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Owner: {risk.owner}</span>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{risk.status}</span>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600">
             <ShieldCheck size={48} className="mb-4 opacity-20" />
             <p className="font-bold uppercase tracking-widest">Aucun risque identifié</p>
          </div>
        )}
      </div>
    </div>
  );
};
