import React, { useState } from 'react';
import { CFO_KAMAL_URL } from '../constants';

interface PhaseBossProps {
  playerName: string;
  playerAvatar: string;
  onComplete: () => void;
  onShowSettings: () => void;
}

export const PhaseBoss: React.FC<PhaseBossProps> = ({ playerName, playerAvatar, onComplete, onShowSettings }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChoice = (choice: string) => {
    if (choice === 'bersama') {
      setFeedback("❌ Keputusan Ditolak. Cukai terlalu tinggi kerana pelepasan terhad.");
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-screen w-screen bg-background-light text-slate-900 font-display overflow-hidden flex flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <img src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png" alt="Logo Metroville" className="h-10 object-contain drop-shadow-sm" referrerPolicy="no-referrer"/>
          <div className="hidden md:block border-l-2 border-slate-200 pl-3 ml-1">
            <h2 className="text-lg font-bold text-slate-800 leading-tight">Keputusan Terakhir</h2>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3 items-center">
          <button onClick={onShowSettings} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-slate-200 hover:text-primary transition-colors hover:scale-105">
            <span className="material-symbols-outlined text-slate-700 text-sm md:text-base">settings</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 md:p-10 flex flex-col gap-6 sm:gap-8 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 shrink-0">
          <div className="flex flex-col gap-1.5 sm:gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-orange-100 text-orange-700 w-fit">
              <span className="material-symbols-outlined text-xs sm:text-sm">warning</span><span className="text-[10px] sm:text-xs font-bold uppercase">Keputusan Terakhir Datuk Bandar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">Pilih Strategi Taksiran Suami Isteri</h1>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg">Analisis jadual LHDN. Pilih kaedah taksiran yang dapat meminimumkan cukai pasangan VIP ini secara sah.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4 w-full md:max-w-md shadow-sm">
            <div className="size-10 sm:size-12 rounded-full overflow-hidden shrink-0 relative bg-slate-200">
              <img alt="CFO Kamal" className="w-full h-full character-portrait" src={CFO_KAMAL_URL} referrerPolicy="no-referrer"/>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">CFO Kamal says:</span>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">"Ingat kadar cukai progresif! Jika gaji digabungkan, mereka akan masuk ke banjaran peratusan cukai yang sangat tinggi."</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative mt-2 sm:mt-4 pb-8 sm:pb-12">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 size-12 sm:size-16 rounded-full bg-slate-900 text-white items-center justify-center border-4 border-background-light shadow-xl"><span className="font-black text-lg sm:text-xl italic">VS</span></div>
          
          {/* Joint Assessment */}
          <div className="group relative flex flex-col rounded-2xl sm:rounded-3xl border-2 border-slate-200 bg-white p-1 hover:border-slate-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col h-full rounded-[1rem] sm:rounded-[1.4rem] bg-slate-50 p-4 sm:p-6 md:p-8 gap-4 sm:gap-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5 sm:gap-1 z-10"><h3 className="text-lg sm:text-xl font-bold text-slate-900">Joint Assessment</h3><p className="text-xs sm:text-sm text-slate-500 font-medium">Taksiran Bersama</p></div>
                <span className="px-2 sm:px-3 py-1 rounded-md sm:rounded-lg bg-red-100 text-red-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Risiko Tinggi</span>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 border-b border-slate-200">
                <span className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-widest">Jumlah Cukai Dibayar</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">RM 18,500</span>
              </div>
              <ul className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2 sm:gap-3"><span className="material-symbols-outlined text-slate-400 shrink-0 text-lg sm:text-xl">account_balance_wallet</span><div><span className="font-bold block text-slate-900">Pendapatan Gabungan: RM 150,000</span></div></li>
                <li className="flex items-start gap-2 sm:gap-3"><span className="material-symbols-outlined text-red-500 shrink-0 text-lg sm:text-xl">gavel</span><div><span className="font-bold block text-slate-900">Kadar Cukai: 24%</span></div></li>
              </ul>
              <div className="mt-auto pt-4 sm:pt-6"><button onClick={() => handleChoice('bersama')} className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors btn-hover-effect">Pilih Taksiran Bersama</button></div>
            </div>
          </div>

          {/* Separate Assessment */}
          <div className="group relative flex flex-col rounded-2xl sm:rounded-3xl border-2 border-primary bg-primary/10 p-1 shadow-lg shadow-primary/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-4 lg:mt-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-slate-900 px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm z-20 flex items-center gap-1 whitespace-nowrap"><span className="material-symbols-outlined text-xs sm:text-sm">verified</span> Strategi Disyorkan</div>
            <div className="flex flex-col h-full rounded-[1rem] sm:rounded-[1.4rem] bg-white p-4 sm:p-6 md:p-8 gap-4 sm:gap-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5 sm:gap-1 z-10"><h3 className="text-lg sm:text-xl font-bold text-slate-900">Separate Assessment</h3><p className="text-xs sm:text-sm text-slate-500 font-medium">Taksiran Berasingan</p></div>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 border-b border-slate-100">
                <span className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-widest">Jumlah Cukai Dibayar</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-dark tracking-tight">RM 14,200</span>
              </div>
              <ul className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2 sm:gap-3"><span className="material-symbols-outlined text-primary shrink-0 text-lg sm:text-xl">pie_chart</span><div><span className="font-bold block text-slate-900">Pendapatan Diasingkan: RM 75k / RM 75k</span></div></li>
                <li className="flex items-start gap-2 sm:gap-3"><span className="material-symbols-outlined text-primary shrink-0 text-lg sm:text-xl">show_chart</span><div><span className="font-bold block text-slate-900">Kadar Cukai: 21% Sahaja</span></div></li>
              </ul>
              <div className="mt-auto pt-4 sm:pt-6"><button onClick={() => handleChoice('berasingan')} className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-primary hover:bg-primary-dark text-slate-900 font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 btn-hover-effect">Sahkan Taksiran Berasingan <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span></button></div>
            </div>
          </div>
        </div>
        {feedback && <p className="text-center font-bold text-sm sm:text-lg h-8 sm:h-10 mt-2 sm:mt-4 text-red-500">{feedback}</p>}
      </main>
    </div>
  );
};
