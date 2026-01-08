
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Terminal, FileCode, Copy, Download, Wand2, Loader2, Eye, TableProperties, ShieldAlert } from 'lucide-react';
import { GeminiInfrastructure } from '../../services/geminiService';

export const DataArchitect: React.FC = () => {
  const [brief, setBrief] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!brief.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const markdown = await GeminiInfrastructure.generateDataLayer(brief);
      setResult(markdown);
    } catch (err: any) {
      setError("Erreur DataBuilder: Vérifiez votre connexion.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Spécifications copiées !");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Database className="text-green-500" size={32} />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">SaaS Data Architect</h1>
        </div>
        <p className="text-slate-400 font-medium">Concevez vos schémas PostgreSQL et API Contracts en un instant.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-[#12121A] border border-white/5 rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <Terminal size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Brief Backend / Data</span>
          </div>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Décrivez votre SaaS (Entités, Roles, KPIs, Multi-tenant...)"
            className="w-full h-96 bg-black/40 border border-white/5 rounded-2xl p-6 text-white text-sm font-medium focus:ring-2 focus:ring-green-500/20 outline-none resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !brief.trim()}
            className="w-full py-5 bg-green-500 text-white rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-green-600 transition-all"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={24} />}
            {isLoading ? "Ingénierie..." : "Architecturer la Data"}
          </button>
        </div>

        <div className="lg:col-span-8 bg-[#12121A] border border-white/5 rounded-[2rem] p-8 flex flex-col min-h-[600px] relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-slate-500">
              <TableProperties size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Spécifications Techniques (Markdown)</span>
            </div>
            {result && (
              <div className="flex gap-4">
                <button onClick={copyToClipboard} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-green-500">
                  <Copy size={14} /> Copier
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {!result ? (
                <div key="empty" className="h-full flex flex-col items-center justify-center text-slate-700 text-center gap-4 opacity-30">
                  <FileCode size={48} />
                  <p className="font-bold uppercase tracking-widest">En attente de brief...</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto custom-scrollbar">
                  <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed selection:bg-green-500/30">
                    {result}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4 text-slate-600">
             <ShieldAlert size={16} />
             <span className="text-[9px] font-bold uppercase tracking-widest">PostgreSQL Standard • RGPD Compliance deduit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
