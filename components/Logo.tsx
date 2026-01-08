
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 select-none flex-nowrap shrink-0">
      <div className="relative w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-green-500/20 shrink-0">
        <span className="text-white font-black text-xl -rotate-3">E</span>
      </div>
      <div className="flex flex-col shrink-0">
        <span className="text-xl font-black tracking-tighter text-white leading-none uppercase whitespace-nowrap">
          ELITE <span className="text-green-500">PROJECT</span>
        </span>
        <span className="text-[9px] font-bold tracking-[0.3em] text-slate-500 uppercase whitespace-nowrap">
          AI Mastery
        </span>
      </div>
    </div>
  );
};
