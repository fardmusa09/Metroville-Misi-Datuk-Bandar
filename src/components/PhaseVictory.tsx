import React, { useEffect } from 'react';
import { MAYOR_AVATAR_URL } from '../constants';
import { audioService } from '../services/audioService';

interface PhaseVictoryProps {
  playerName: string;
  playerAvatar: string;
  fundLevel: number;
  score: number;
  onRestart: () => void;
  onMenu: () => void;
}

export const PhaseVictory: React.FC<PhaseVictoryProps> = ({ playerName, playerAvatar, fundLevel, score, onRestart, onMenu }) => {
  useEffect(() => {
    audioService.playSuccess();
  }, []);

  const formattedFund = ((fundLevel / 100) * 50000).toLocaleString();

  return (
    <div className="h-screen w-screen bg-[#E6F3FF] font-display text-slate-800 overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-[radial-gradient(#13ec5b_2px,transparent_2px),radial-gradient(#f59e0b_2px,transparent_2px)] bg-[length:40px_40px] animate-[confetti_4s_linear_infinite]"></div>
      
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/90 backdrop-blur-md shrink-0">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png" alt="Logo Metroville" className="h-10 object-contain drop-shadow-sm" referrerPolicy="no-referrer"/>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="bg-white/90 px-3 md:px-4 py-1.5 rounded-full border border-primary/20 shadow-sm flex items-center gap-1 md:gap-2">
              <span className="text-[9px] md:text-[10px] font-black text-primary-dark uppercase tracking-wider hidden sm:inline">Reputasi:</span>
              <span className="text-xs md:text-sm font-black text-slate-800">{score} PTS</span>
            </div>
            <div className="h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border-2 border-primary bg-slate-100 bg-[length:250%] bg-[center_top] shrink-0" style={{ backgroundImage: `url('${playerAvatar}')` }}></div>
          </div>
        </div>
      </header>

      <main className="flex-grow relative w-full overflow-y-auto custom-scrollbar">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 z-20 relative flex flex-col items-center">
          <div className="text-center mb-8 relative z-20 mt-4">
            <img src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png" alt="Logo Metroville" className="h-24 md:h-32 mx-auto mb-6 object-contain drop-shadow-lg" referrerPolicy="no-referrer"/>
            <div className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-2 mb-4 border-4 border-white shadow-lg">
              <span className="material-symbols-outlined text-white mr-2 text-xl">emoji_events</span>
              <span className="text-base font-black text-white uppercase tracking-wider">Misi Selesai!</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight">Tahniah, {playerName}!</h2>
            <h2 className="text-4xl md:text-5xl font-black text-primary-dark mb-6 tracking-tight">Bandar Kembali Gemilang</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Anda telah berjaya menguruskan pelbagai hasil cukai dengan tepat dan membina semula infrastruktur bandar ini.</p>
          </div>

          <div className="mb-10 w-full max-w-2xl bg-white rounded-xl p-4 shadow-sm border border-slate-100 relative z-20">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_balance</span>
                <span className="text-sm font-bold">Dana Pembangunan Bandar: RM {formattedFund}</span>
              </div>
              <span className="text-sm font-bold text-primary">{fundLevel}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-green-400 shadow-[0_0:10px_rgba(19,236,91,0.5)]" style={{ width: `${fundLevel}%` }}></div>
            </div>
          </div>

          <div className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl mb-10 group border-8 border-white bg-slate-200">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABIOdHAzPOCEMlPzKg4-RRrwoFp-tMdPnZGKnzl3LB0L_pHls6q22czdbqY2D7OkQ1J4YWOAFPv3Ydj-oflARbnyihkU8uJ1W5C3WycIOj0vnYN_Zcj6Jue_bnSXaXWFN2RKUO1rOJm2qb1hzz8d4WkLMiiu6XuYG4lqDLy6t-Nb5QUVCjMXti1CqB_xjmJBbFj6hvIG_FmVWE2PYykYvPzeQEn5GG9SRvj_rmRaNSG4iYKFkKj-rbWA6iZElaPxZz8ED99D_o7BFk')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl flex items-end justify-center px-4 md:px-20 pb-0">
              <div className="relative w-full h-48 md:h-64 flex justify-center items-end">
                <div className="bg-white/90 backdrop-blur text-slate-900 px-6 py-4 rounded-t-xl text-center max-w-lg shadow-lg mb-6">
                  <p className="font-bold text-lg mb-1">Encik Johan & Puan Sara</p>
                  <p className="text-sm text-slate-600">"Terima kasih {playerName}! Segala taksiran cukai kami berjalan lancar. Jalan raya sudah baiki, hospital juga lengkap!"</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20 pb-12 w-full max-w-md">
            <button onClick={onRestart} className="w-full px-10 py-5 bg-primary hover:bg-primary-dark text-slate-900 font-black rounded-full shadow-lg hover:scale-105 transition-transform btn-hover-effect">MAIN SEMULA</button>
            <button onClick={onMenu} className="w-full px-10 py-5 bg-white text-slate-700 font-black rounded-full shadow-lg hover:scale-105 transition-transform btn-hover-effect">MENU UTAMA</button>
          </div>
        </div>
      </main>
    </div>
  );
};
