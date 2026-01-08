
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Shield } from 'lucide-react';
import { Logo } from '../Logo';

interface AuthProps {
  type: 'login' | 'register';
  onSuccess: () => void;
  onToggle: () => void;
}

export const Auth: React.FC<AuthProps> = ({ type, onSuccess, onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#07070D] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[160px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        <div className="bg-[#12121A] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
            {type === 'login' ? 'Connexion Elite' : 'Créer un Compte'}
          </h2>
          <p className="text-slate-500 text-sm font-medium mb-8">
            {type === 'login' ? 'Accédez à votre cockpit de projet.' : 'Rejoignez les meilleurs bâtisseurs de projets IA.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Nom complet" 
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all font-medium" 
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email professionnel" 
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all font-medium" 
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe" 
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all font-medium" 
              />
            </div>

            <button className="w-full py-5 bg-green-500 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all flex items-center justify-center gap-3">
              {type === 'login' ? 'Se connecter' : 'C’est parti'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Ou continuer avec</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all">
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-500 font-medium">
          {type === 'login' ? 'Pas encore membre ?' : 'Déjà un compte ?'}{' '}
          <button onClick={onToggle} className="text-green-500 font-bold hover:underline">
            {type === 'login' ? 'Inscrivez-vous' : 'Connectez-vous'}
          </button>
        </p>

        <div className="mt-12 flex items-center justify-center gap-4 text-slate-600">
          <Shield size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Paiement et données sécurisées</span>
        </div>
      </motion.div>
    </div>
  );
};
