
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Video, Wand2, Loader2, Download, Play, Plus } from 'lucide-react';
import { GeminiInfrastructure } from '../../services/geminiService';

export const MediaLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [isGeneratingVid, setIsGeneratingVid] = useState(false);
  const [assets, setAssets] = useState<{ type: 'img' | 'vid', url: string, prompt: string }[]>([]);

  const handleGenImage = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingImg(true);
    try {
      const url = await GeminiInfrastructure.generateMarketingImage(prompt);
      setAssets(prev => [{ type: 'img', url, prompt }, ...prev]);
    } finally { setIsGeneratingImg(false); }
  };

  const handleGenVideo = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingVid(true);
    try {
      const url = await GeminiInfrastructure.generateVideoDemo(prompt);
      setAssets(prev => [{ type: 'vid', url, prompt }, ...prev]);
    } finally { setIsGeneratingVid(false); }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Media Lab</h1>
        <p className="text-slate-400 font-medium">Générez vos visuels Hero et vidéos de démo en un clic.</p>
      </header>

      <div className="bg-[#12121A] border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Concept Visuel</label>
          <input 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Futuristic SaaS dashboard, glassmorphism, glowing connections..."
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-white text-lg font-bold outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={handleGenImage}
            disabled={isGeneratingImg || isGeneratingVid}
            className="flex-1 py-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 text-white font-black uppercase tracking-widest hover:bg-green-500 transition-all group"
          >
            {isGeneratingImg ? <Loader2 className="animate-spin" /> : <ImageIcon />}
            Générer Image (2.5 Flash)
          </button>
          <button 
            onClick={handleGenVideo}
            disabled={isGeneratingImg || isGeneratingVid}
            className="flex-1 py-6 bg-green-500 text-white rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-500/20"
          >
            {isGeneratingVid ? <Loader2 className="animate-spin" /> : <Video />}
            Générer Démo Vidéo (Veo)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {assets.map((asset, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#12121A] border border-white/5 rounded-[2rem] overflow-hidden group relative"
            >
              {asset.type === 'img' ? (
                <img src={asset.url} className="w-full h-64 object-cover" />
              ) : (
                <video src={asset.url} controls className="w-full h-64 object-cover" />
              )}
              <div className="p-6">
                <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{asset.prompt}</p>
                <div className="mt-4 flex gap-2">
                  <a href={asset.url} download className="flex-1 py-2 bg-white/5 text-xs font-black uppercase text-center rounded-lg hover:bg-green-500 transition-all">Download</a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
