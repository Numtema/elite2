
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, FileJson, Copy, Download, Wand2, Loader2, Eye, Code, Rocket } from 'lucide-react';
import { ProjectService } from '../../services/projectService';
import { ProjectDashboardConfig } from '../../types';
import { Overview } from './Overview';

interface AiBuilderProps {
  onConfigGenerated: (config: ProjectDashboardConfig) => void;
}

export const AiBuilder: React.FC<AiBuilderProps> = ({ onConfigGenerated }) => {
  const [brief, setBrief] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProjectDashboardConfig | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('code');

  const handleGenerate = async () => {
    if (!brief.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const config = await ProjectService.buildFromBrief(brief);
      setResult(config);
      setActiveTab('preview'); // Bascule sur preview pour effet wow
    } catch (err: any) {
      setError("Erreur IA: Vérifiez votre connexion ou clé API.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyConfig = () => {
    if (result) {
      onConfigGenerated(result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-green-500" size={32} />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">AI Dashboard Builder</h1>
        </div>
        <p className="text-slate-400 font-medium">L'IA de pilotage génère votre infrastructure projet en secondes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Panel Gauche: Input */}
        <div className="lg:col-span-5 bg-[#12121A] border border-white/5 rounded-[3rem] p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-500">
              <Terminal size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Périmètre du Projet</span>
            </div>
            <button onClick={() => setBrief('')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white">RAZ</button>
          </div>

          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Ex: Landing page formation IA pour entreprises, focus ROI et sécurité des données..."
            className="w-full h-80 bg-black/40 border border-white/5 rounded-2xl p-6 text-white text-sm font-medium focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 outline-none transition-all resize-none placeholder:text-slate-700"
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading || !brief.trim()}
            className="w-full py-5 bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all active:scale-[0.98]"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={24} />}
            {isLoading ? "Ingestion..." : "Générer la configuration"}
          </button>
        </div>

        {/* Panel Droit: Preview/Code */}
        <div className="lg:col-span-7 bg-[#12121A] border border-white/5 rounded-[3rem] p-8 flex flex-col min-h-[600px] shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 z-10">
              <button 
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'code' ? 'bg-green-500 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Code size={14} /> Code JSON
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                disabled={!result}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-green-500 text-white' : 'text-slate-500 hover:text-white disabled:opacity-20'}`}
              >
                <Eye size={14} /> Prévisualisation
              </button>
            </div>
            
            {result && activeTab === 'code' && (
              <div className="flex gap-4 z-10">
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))} className="p-2 text-slate-500 hover:text-green-500"><Copy size={18} /></button>
                <button className="p-2 text-slate-500 hover:text-green-500"><Download size={18} /></button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-6 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {!result ? (
                <div key="empty" className="h-full flex flex-col items-center justify-center text-slate-700 text-center italic gap-4">
                  <Rocket size={48} className="opacity-10" />
                  La structure apparaîtra <br /> après génération...
                </div>
              ) : activeTab === 'code' ? (
                <motion.pre key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-auto font-mono text-[10px] text-green-500/80 leading-relaxed">
                  {JSON.stringify(result, null, 2)}
                </motion.pre>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto custom-scrollbar">
                  <div className="scale-[0.7] origin-top transform-gpu">
                    <Overview config={result} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 z-10">
            <button
              onClick={applyConfig}
              disabled={!result}
              className="w-full py-5 border-2 border-green-500 disabled:border-slate-800 disabled:text-slate-600 text-green-500 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-500/5 transition-all"
            >
              <Rocket size={24} /> Déployer ce Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
