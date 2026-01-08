
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../Logo';
import { SidebarImage } from './SidebarImage';
import { LoginForm, RegisterForm, ForgotForm } from './AuthForms';
import { ELITE_THEME } from '../../eliteTheme';
import { Shield } from 'lucide-react';

interface AuthProps {
  onSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  return (
    <div className="min-h-screen bg-[#07070D] flex flex-col md:flex-row p-4 md:p-6 lg:p-8 font-['Poppins']">
      {/* Colonne Formulaire */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 lg:px-24 py-12 z-10">
        <div className="max-w-md w-full mx-auto md:mx-0">
          <header className="mb-12">
            <Logo />
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={authView}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">
                  {authView === 'login' ? 'Connectez-vous !' : 
                   authView === 'register' ? 'Rejoignez l\'Élite' : 
                   'Récupération'}
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  {authView === 'login' ? (
                    <>
                      Pas encore de compte ?{' '}
                      <button onClick={() => setAuthView('register')} className="text-green-500 font-bold hover:underline">
                        Inscrivez-vous ici
                      </button>
                    </>
                  ) : (
                    <>
                      Déjà membre ?{' '}
                      <button onClick={() => setAuthView('login')} className="text-green-500 font-bold hover:underline">
                        Connectez-vous
                      </button>
                    </>
                  )}
                </p>
              </div>

              {authView === 'login' && <LoginForm onSuccess={onSuccess} onSwitch={setAuthView} />}
              {authView === 'register' && <RegisterForm onSuccess={onSuccess} onSwitch={setAuthView} />}
              {authView === 'forgot' && <ForgotForm onSwitch={() => setAuthView('login')} />}

              <div className="pt-8 flex items-center justify-center gap-4 text-slate-700">
                <Shield size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Elite Security Protocol v2.4</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Colonne Visuelle */}
      <div className="hidden md:flex w-1/2 items-stretch">
        <SidebarImage />
      </div>
    </div>
  );
};
