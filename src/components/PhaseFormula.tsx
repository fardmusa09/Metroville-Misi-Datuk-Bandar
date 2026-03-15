import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MAYOR_AVATAR_URL, CFO_KAMAL_URL } from '../constants';
import { audioService } from '../services/audioService';
import { GameHeader } from './GameHeader';

interface PhaseFormulaProps {
  fundLevel: number;
  score: number;
  playerName: string;
  playerAvatar: string;
  onUpdateFund: (amount: number) => void;
  onUpdateScore: (points: number) => void;
  onComplete: () => void;
  onShowGuide: () => void;
  onShowSettings: () => void;
}

export const PhaseFormula: React.FC<PhaseFormulaProps> = ({ 
  fundLevel, 
  score,
  playerName, 
  playerAvatar, 
  onUpdateFund,
  onUpdateScore,
  onComplete, 
  onShowGuide, 
  onShowSettings
}) => {
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [usedBlocks, setUsedBlocks] = useState<Set<string>>(new Set());
  const [showSuccessDialogue, setShowSuccessDialogue] = useState(false);

  const blocks = [
    { text: 'Jumlah Pendapatan Tahunan', icon: 'account_balance_wallet', color: 'blue' },
    { text: 'Pengecualian Cukai', icon: 'content_cut', color: 'orange' },
    { text: 'Pelepasan Cukai', icon: 'volunteer_activism', color: 'purple' }
  ];

  const handleSlotClick = (index: number) => {
    if (selectedBlock) {
      const newSlots = [...slots];
      if (newSlots[index]) {
        setUsedBlocks(prev => {
          const next = new Set(prev);
          next.delete(newSlots[index]!);
          return next;
        });
      }
      newSlots[index] = selectedBlock;
      setSlots(newSlots);
      setUsedBlocks(prev => new Set(prev).add(selectedBlock));
      setSelectedBlock(null);
      audioService.playSfx('https://cdn.pixabay.com/audio/2022/03/15/audio_834164b383.mp3'); // Pop sound
    } else if (slots[index]) {
      setUsedBlocks(prev => {
        const next = new Set(prev);
        next.delete(slots[index]!);
        return next;
      });
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
    }
  };

  const verifyFormula = () => {
    const [s1, s2, s3] = slots;
    if (s1 === "Jumlah Pendapatan Tahunan" && 
        ((s2 === "Pengecualian Cukai" && s3 === "Pelepasan Cukai") || 
         (s2 === "Pelepasan Cukai" && s3 === "Pengecualian Cukai"))) {
      audioService.playSuccess();
      onUpdateFund(5); // RM 2,500
      onUpdateScore(500);
      setShowSuccessDialogue(true);
    } else {
      onUpdateScore(-50);
      audioService.playSfx('https://cdn.pixabay.com/audio/2022/03/10/audio_c352730652.mp3'); // Error sound
    }
  };

  const isReady = slots.every(s => s !== null);
  const formattedFund = ((fundLevel / 100) * 50000).toLocaleString();

  return (
    <div className="h-screen w-screen font-display bg-background-light text-slate-900 isometric-bg flex flex-col overflow-hidden relative">
      <GameHeader 
        fundLevel={fundLevel}
        score={score}
        playerAvatar={playerAvatar}
        title="Meja Kerja Taksiran"
        onShowSettings={onShowSettings}
        onShowGuide={onShowGuide}
      />

      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden p-2 sm:p-4 md:p-6 gap-3 sm:gap-4 md:gap-6 min-h-0">
        <aside className="w-full lg:w-80 flex flex-col gap-3 sm:gap-4 md:gap-6 justify-start shrink-0">
          <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border-l-4 border-l-primary flex flex-col gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="size-10 sm:size-12 md:size-14 rounded-full bg-emerald-100 border-2 border-white overflow-hidden shadow-inner shrink-0">
                <img alt="CFO Kamal" className="w-full h-full character-portrait" src={CFO_KAMAL_URL}/>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm md:text-base">CFO Kamal</h3>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] bg-primary/20 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Advisor</span>
              </div>
            </div>
            <div className="relative bg-white/60 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 italic text-[10px] sm:text-xs md:text-sm text-slate-700 leading-relaxed border border-white/80 font-medium">
              "Bagus, {playerName}! Sebelum kita mula mengira cukai rakyat di Klinik Cukai, kita perlu tahu formula asas mencari <span className="font-bold text-primary-dark">Pendapatan Bercukai</span>."
              <div className="absolute -top-1.5 sm:-top-2 left-4 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-white/60 rotate-45 border-l border-t border-white/80"></div>
            </div>
          </div>
        </aside>
        
        <section className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6 overflow-y-auto custom-scrollbar pr-1 md:pr-2 pb-4 sm:pb-6">
          <div className="glass-panel rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[200px] sm:min-h-[300px] md:min-h-[380px] shrink-0">
            <div className="w-full mb-3 sm:mb-4 md:mb-6 text-center sm:text-left">
              <h2 className="text-base sm:text-lg md:text-2xl font-black text-slate-800 tracking-tight">Susun Kepingan Di Bawah</h2>
              <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 md:gap-3 p-1.5 sm:p-2 md:p-3 bg-primary/10 rounded-lg sm:rounded-xl border border-primary/20 max-w-fit mt-1.5 sm:mt-2 md:mt-3 mx-auto sm:mx-0">
                <span className="material-symbols-outlined text-primary text-xs sm:text-sm md:text-lg shrink-0 mt-0.5 sm:mt-0">lightbulb</span>
                <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-emerald-800 leading-snug text-left">Petunjuk: Pendapatan Bercukai = Jumlah Pendapatan - (Pengecualian + Pelepasan)</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-4 mt-1 sm:mt-2">
              {slots.map((slot, idx) => (
                <React.Fragment key={idx}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSlotClick(idx)}
                    className={`w-20 h-10 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-48 lg:h-20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 sm:border-4 flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${slot ? 'bg-primary border-primary-dark shadow-md' : 'border-dashed border-slate-300 bg-slate-100/40 hover:border-primary/50'}`}
                  >
                    <AnimatePresence mode="wait">
                      {slot ? (
                        <motion.div 
                          key={slot}
                          initial={{ scale: 0.5, opacity: 0, y: 20 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg sm:rounded-xl shadow-sm border-2 border-primary overflow-hidden px-1 sm:px-2 pointer-events-none"
                        >
                          <span className="text-slate-800 font-display font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-center leading-tight">{slot}</span>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center"
                        >
                          <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1 pointer-events-none">Langkah {idx + 1}</span>
                          <span className="material-symbols-outlined text-[14px] sm:text-base md:text-xl lg:text-2xl text-slate-300 group-hover:text-primary transition-colors pointer-events-none">add_circle</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {idx < 2 && <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-slate-400 shrink-0">-</div>}
                </React.Fragment>
              ))}
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-slate-400 shrink-0">=</div>
              
              <div className="w-24 h-12 sm:w-28 sm:h-14 md:w-40 md:h-20 lg:w-56 lg:h-24 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl bg-primary/20 border-2 sm:border-4 border-primary border-double flex flex-col items-center justify-center shadow-xl mt-1 sm:mt-2 md:mt-0">
                <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-0.5">Hasil</span>
                <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-emerald-900 text-center px-1 sm:px-2 md:px-3 lg:px-4 leading-tight">Pendapatan Bercukai</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-8 shadow-xl shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="size-2 sm:size-2.5 md:size-3 rounded-full bg-primary animate-pulse"></div>
                <h3 className="font-black text-slate-800 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">Blok Komponen</h3>
              </div>
              <button 
                onClick={verifyFormula} 
                disabled={!isReady} 
                className={`text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-10 md:py-3.5 rounded-full font-extrabold shadow-xl transition-all flex items-center justify-center gap-1 sm:gap-1.5 md:gap-3 border-2 border-white/20 text-[10px] sm:text-xs md:text-sm ${isReady ? 'bg-blue-600 hover:scale-105 animate-pulse' : 'bg-slate-400 opacity-50 cursor-not-allowed'}`}
              >
                <span>Semak Jawapan</span>
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">rocket_launch</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-4 justify-center md:justify-start">
              {blocks.map((block, idx) => {
                const isUsed = usedBlocks.has(block.text);
                const isSelected = selectedBlock === block.text;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={!isUsed ? { scale: 1.05, y: -5 } : {}}
                    whileTap={!isUsed ? { scale: 0.95 } : {}}
                    className={`cursor-pointer p-1.5 sm:p-2 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl border-2 shadow-md transition-all flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 sm:flex-none min-w-[120px] sm:min-w-[140px] md:min-w-[200px] relative ${isUsed ? 'opacity-30 pointer-events-none grayscale' : isSelected ? 'border-primary bg-blue-50 shadow-[0_0_20px_rgba(19,236,91,0.4)]' : 'bg-white border-slate-200 hover:border-primary hover:bg-slate-50'}`}
                    onClick={() => setSelectedBlock(block.text)}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="glow"
                        className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-primary animate-pulse pointer-events-none"
                        style={{ boxShadow: '0 0 15px rgba(19,236,91,0.5)' }}
                      />
                    )}
                    <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg shrink-0 ${block.color === 'blue' ? 'bg-blue-100 text-blue-600' : block.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                      <span className="material-symbols-outlined text-sm sm:text-base md:text-2xl">{block.icon}</span>
                    </div>
                    <span className="font-bold text-[9px] sm:text-xs md:text-sm text-slate-700 leading-tight">{block.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showSuccessDialogue && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 md:border-4 border-primary relative"
            >
              <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center text-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="size-16 sm:size-24 md:size-32 rounded-xl sm:rounded-2xl bg-emerald-100 border-2 sm:border-4 border-white overflow-hidden shadow-xl">
                    <img alt="CFO Kamal" className="w-full h-full character-portrait" src={CFO_KAMAL_URL} />
                  </div>
                  <div className="absolute -bottom-1.5 sm:-bottom-2 -right-1.5 sm:-right-2 bg-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black text-slate-900 uppercase shadow-md border sm:border-2 border-white">
                    CFO
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 mb-3 sm:mb-4 tracking-tight">
                  Syabas, {playerName}!
                </h3>
                
                <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 mb-6 sm:mb-8 relative">
                  <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                    Maklum Balas Advisor
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-semibold italic">
                    "Tepat sekali! Pemahaman anda tentang formula Pendapatan Bercukai sangat mengagumkan. Ingat, kita perlu menolak semua pengecualian dan pelepasan daripada jumlah pendapatan untuk mendapatkan nilai yang adil bagi rakyat."
                  </p>
                </div>

                <button 
                  onClick={onComplete}
                  className="w-full md:w-auto px-6 sm:px-12 py-3 sm:py-4 bg-primary text-slate-900 font-black rounded-xl sm:rounded-2xl shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg btn-hover-effect"
                >
                  Teruskan ke Klinik Cukai
                  <span className="material-symbols-outlined text-base sm:text-xl">arrow_forward</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
