
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { ELITE_THEME } from '../../eliteTheme';

interface FormProps {
  onSuccess: () => void;
  onSwitch: (view: 'login' | 'register' | 'forgot') => void;
}

export const LoginForm: React.FC<FormProps> = ({ onSuccess, onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }} className="space-y-6">
      <div className="space-y-2">
        <label className={ELITE_THEME.typography.label}>Email professionnel</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-green-500 transition-colors" />
          </div>
          <div className="absolute inset-y-4 left-[3.5rem] border-l border-white/10" />
          <input
            type="email"
            required
            placeholder="Saisissez votre e-mail"
            className={`w-full pl-16 pr-5 py-5 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none transition-all text-white font-medium`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={ELITE_THEME.typography.label}>Mot de passe</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-green-500 transition-colors" />
          </div>
          <div className="absolute inset-y-4 left-[3.5rem] border-l border-white/10" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Saisissez votre mot de passe"
            className={`w-full pl-16 pr-14 py-5 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none transition-all text-white font-medium`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-500 hover:text-green-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={() => onSwitch('forgot')} className="text-xs font-bold text-green-500 hover:underline">
          Mot de passe oublié ?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-green-500 hover:bg-green-600 text-white font-black text-lg uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transform active:scale-[0.98] transition-all"
      >
        Se connecter <ArrowRight size={22} />
      </button>
    </form>
  );
};

export const RegisterForm: React.FC<FormProps> = ({ onSuccess, onSwitch }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }} className="space-y-6">
      <div className="space-y-2">
        <label className={ELITE_THEME.typography.label}>Nom complet</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-500" />
          </div>
          <div className="absolute inset-y-4 left-[3.5rem] border-l border-white/10" />
          <input type="text" required placeholder="John Doe" className="w-full pl-16 pr-5 py-5 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-green-500/50" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className={ELITE_THEME.typography.label}>Email</label>
        <input type="email" required placeholder="contact@entreprise.com" className="w-full px-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-green-500/50" />
      </div>

      <div className="space-y-2">
        <label className={ELITE_THEME.typography.label}>Mot de passe</label>
        <input type="password" required className="w-full px-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-green-500/50" />
      </div>

      <button type="submit" className="w-full py-5 bg-green-500 hover:bg-green-600 text-white font-black text-lg uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transition-all">
        Créer mon compte <ArrowRight size={22} />
      </button>
    </form>
  );
};

export const ForgotForm: React.FC<{ onSwitch: (view: 'login') => void }> = ({ onSwitch }) => {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <label className={ELITE_THEME.typography.label}>Email de récupération</label>
        <input type="email" required placeholder="votre@email.com" className="w-full px-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-green-500/50" />
      </div>
      <button type="submit" className="w-full py-5 bg-green-500 text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-xl shadow-green-500/20">
        Envoyer le lien
      </button>
      <button type="button" onClick={() => onSwitch('login')} className="w-full text-sm font-bold text-slate-500 hover:text-white uppercase tracking-widest">
        Retour à la connexion
      </button>
    </form>
  );
};
