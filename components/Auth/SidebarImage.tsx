
import React from 'react';
import { motion } from 'framer-motion';

export const SidebarImage: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden rounded-[2.5rem] shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
        alt="Elite Productivity"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] via-transparent to-transparent opacity-80" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-12 left-12 right-12"
      >
        <div className="backdrop-blur-xl bg-white/5 p-8 rounded-[2rem] border border-white/10">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Maîtrisez vos projets</h3>
          <p className="text-slate-300 text-sm font-medium leading-relaxed">
            L'intelligence artificielle au service de votre excellence opérationnelle. 
            Rejoignez l'élite des bâtisseurs.
          </p>
          <div className="mt-6 flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-1 w-8 bg-green-500 rounded-full" />
            ))}
            <div className="h-1 w-8 bg-white/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
