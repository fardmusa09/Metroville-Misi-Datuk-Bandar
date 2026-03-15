import React from 'react';
import { motion } from 'motion/react';

interface GameHeaderProps {
  fundLevel: number;
  score: number;
  playerAvatar: string;
  title: string;
  onShowSettings: () => void;
  onShowGuide: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  fundLevel,
  score,
  playerAvatar,
  title,
  onShowSettings,
  onShowGuide,
}) => {
  const formattedFund = ((fundLevel / 100) * 50000).toLocaleString();
  
  // Determine status colors
  const getStatusColor = () => {
    if (fundLevel < 40) return 'text-red-500';
    if (fundLevel < 75) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getBarColor = () => {
    if (fundLevel < 40) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    if (fundLevel < 75) return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
    return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  };

  const getStatusText = () => {
    if (fundLevel < 40) return 'Kritikal';
    if (fundLevel < 75) return 'Membaik';
    return 'Stabil';
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-2 md:gap-4 p-2 md:p-6 z-50 shrink-0 relative w-full max-w-[1600px] mx-auto pointer-events-auto">
      {/* Left: Logo Section */}
      <div className="flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-md p-1.5 md:p-2 pr-2 md:pr-4 rounded-xl md:rounded-2xl border border-white/50 shadow-lg shrink-0">
        <div className="bg-primary/20 p-1 md:p-1.5 rounded-lg md:rounded-xl hidden sm:block">
          <img 
            src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png" 
            alt="Logo Metroville" 
            className="h-6 md:h-10 object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[10px] md:text-sm font-black text-slate-800 uppercase tracking-tight leading-none">Metroville</h1>
          <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 md:mt-1 truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">{title}</p>
        </div>
      </div>

      {/* Center: City Development Fund (The Vault) */}
      <div className="flex flex-col items-center gap-1 bg-slate-900/90 backdrop-blur-xl px-3 py-2 md:px-6 md:py-2.5 rounded-xl md:rounded-2xl border border-white/10 shadow-2xl w-full order-last sm:order-none sm:w-auto sm:flex-1 md:min-w-[400px] max-w-2xl relative overflow-hidden group">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="flex w-full justify-between items-end mb-1.5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="material-symbols-outlined text-primary text-[14px]">account_balance</span>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">City Development Fund</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="text-base md:text-xl font-black text-white tracking-tight">RM {formattedFund}</span>
              <span className={`text-[8px] md:text-[10px] font-black uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md bg-white/5 ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="material-symbols-outlined text-amber-400 text-[14px]">stars</span>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Reputation</span>
            </div>
            <span className="text-xs md:text-base font-black text-amber-400 tabular-nums">{score.toLocaleString()} <span className="text-[8px] md:text-[10px] text-slate-500">PTS</span></span>
          </div>
        </div>

        <div className="w-full h-2 md:h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5 relative p-[1px]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${fundLevel}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full transition-all duration-500 relative ${getBarColor()}`}
          >
            {/* Glossy effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-full"></div>
            {/* Animated pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] -translate-x-full"></div>
          </motion.div>
        </div>
      </div>

      {/* Right: Profile & Actions */}
      <div className="flex gap-2 md:gap-3 items-center">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Datuk Bandar</span>
          <span className="text-xs font-bold text-slate-700">Online</span>
        </div>
        
        <div className="flex gap-1.5 md:gap-2 items-center">
          <button 
            onClick={onShowSettings} 
            className="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all hover:scale-105 group"
          >
            <span className="material-symbols-outlined text-sm md:text-base group-hover:rotate-90 transition-transform duration-500">settings</span>
          </button>
          <button 
            onClick={onShowGuide} 
            className="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-sm md:text-base">menu_book</span>
          </button>
          <div className="relative">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border-2 border-primary overflow-hidden shadow-xl p-0.5 bg-white">
              <div 
                className="w-full h-full rounded-md md:rounded-lg bg-cover bg-center" 
                style={{ backgroundImage: `url('${playerAvatar}')` }}
              ></div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </header>
  );
};
