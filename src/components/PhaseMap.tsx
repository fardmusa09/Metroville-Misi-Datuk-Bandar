import React, { useState, useEffect } from 'react';
import { POI_DATA, MAYOR_AVATAR_URL, CFO_KAMAL_URL } from '../constants';
import { POICase } from '../types';
import { GameHeader } from './GameHeader';
import { audioService } from '../services/audioService';

interface PhaseMapProps {
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

export const PhaseMap: React.FC<PhaseMapProps> = ({ 
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
  const [exploredItems, setExploredItems] = useState<Set<string>>(new Set());
  const [activePoi, setActivePoi] = useState<POICase | null>(null);
  const [currentPoiStep, setCurrentPoiStep] = useState(0);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    // Start new BGM for the map phase
    audioService.playBgm('https://raw.githubusercontent.com/fardmusa09/Metroville-Game/5bc395055d30f690a94f6878ef3d0b247d095eeb/Simulated_Serenity.mp3');
  }, []);

  const startInvestigation = (poi: POICase) => {
    setActivePoi(poi);
    setCurrentPoiStep(0);
    setShowActions(false);
  };

  const nextDialogue = () => {
    if (activePoi && currentPoiStep < activePoi.dialogues.length - 1) {
      setCurrentPoiStep(prev => prev + 1);
    } else {
      setShowActions(true);
    }
  };

  const solveInvestigation = () => {
    if (activePoi) {
      setExploredItems(prev => new Set(prev).add(activePoi.id));
      onUpdateFund(2); // RM 1,000
      onUpdateScore(100);
      setActivePoi(null);
    }
  };

  const isAllExplored = exploredItems.size >= 5;

  const formattedFund = ((fundLevel / 100) * 50000).toLocaleString();

  return (
    <div className="h-screen w-screen bg-slate-100 font-display overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-cover bg-center grayscale-[0.1] brightness-105" style={{ backgroundImage: "url('https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/920559eab48c28c8c70df4aded58f2a3d087ae54/Game%20Map.png')" }}></div>
      
      {/* POI Markers */}
      {POI_DATA.map((poi, idx) => {
        const isVisited = exploredItems.has(poi.id);
        const positions = [
          { top: '28%', left: '28%' },
          { top: '18%', left: '70%' },
          { top: '42%', left: '68%' },
          { top: '70%', left: '65%' },
          { top: '52%', left: '38%' }
        ];
        const pos = positions[idx];
        
        return (
          <div 
            key={poi.id}
            className={`absolute z-50 group cursor-pointer pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${isVisited ? 'visited' : ''}`}
            style={{ top: pos.top, left: pos.left }}
            onClick={() => !isVisited && startInvestigation(poi)}
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Pulsing shadow/base */}
              {!isVisited && (
                <div className="absolute -bottom-2 w-6 h-2 bg-black/40 rounded-[100%] blur-[2px] animate-pulse"></div>
              )}
              
              {/* The Pin */}
              <div className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${isVisited ? 'bg-slate-400' : 'bg-primary'} rounded-full rounded-br-none rotate-45 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.2),_4px_4px_10px_rgba(0,0,0,0.3)] group-hover:-translate-y-2 transition-transform duration-300 ${!isVisited ? 'animate-bounce' : ''}`}>
                {/* Inner circle */}
                <div className={`absolute w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-inner`}>
                  <span className={`material-symbols-outlined -rotate-45 ${isVisited ? 'text-slate-400' : 'text-primary'} font-black text-base sm:text-lg md:text-xl`}>
                    {poi.id === 'roadtax' ? 'directions_car' : 
                     poi.id === 'sst' ? 'storefront' : 
                     poi.id === 'property' ? 'apartment' : 
                     poi.id === 'income' ? 'person_search' : 'landscape'}
                  </span>
                </div>
              </div>
            </div>
            <div className={`mt-1 sm:mt-1.5 bg-white ${isVisited ? 'text-slate-400' : 'text-slate-800'} text-[8px] sm:text-[9px] md:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap transition-colors`}>
              {poi.id === 'roadtax' ? 'Cukai Jalan' : 
               poi.id === 'sst' ? 'Aduan Kafe (SST)' : 
               poi.id === 'property' ? 'Cukai Pintu' : 
               poi.id === 'income' ? 'Cukai Pendapatan' : 'Isu Cukai Tanah'}
            </div>
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        <GameHeader 
          fundLevel={fundLevel}
          score={score}
          playerAvatar={playerAvatar}
          title="Metroville"
          onShowSettings={onShowSettings}
          onShowGuide={onShowGuide}
        />
        
        <div className="flex-1 flex flex-col items-start justify-start px-2 sm:px-4 md:px-6 gap-2 sm:gap-3 md:gap-4 min-h-0">
          <div className="w-full sm:w-64 md:w-72 bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/50 shadow-2xl flex flex-col shrink-0 pointer-events-auto max-h-[25vh] sm:max-h-[30vh] md:max-h-[40vh] overflow-hidden mt-2 sm:mt-4 md:mt-6">
            <div className="p-1.5 sm:p-2 md:p-4 border-b border-slate-100 shrink-0 bg-white/95 backdrop-blur-xl z-10">
              <h3 className="text-slate-900 font-black text-[10px] sm:text-xs md:text-sm flex items-center gap-1 sm:gap-2">
                <span className="material-symbols-outlined text-primary text-sm sm:text-base md:text-lg">assignment</span>
                Aktual Misi
              </h3>
            </div>
            <div className="p-1 sm:p-1.5 md:p-2 flex flex-col gap-0.5 md:gap-1 overflow-y-auto custom-scrollbar">
              {POI_DATA.map((poi, idx) => {
                const isVisited = exploredItems.has(poi.id);
                return (
                  <div key={poi.id} className="flex items-center gap-1.5 sm:gap-2 md:gap-3 p-1 sm:p-2 rounded-lg sm:rounded-xl">
                    <span className={`material-symbols-outlined ${isVisited ? 'text-primary-dark' : 'text-slate-400'} text-sm sm:text-base md:text-xl shrink-0`}>
                      {isVisited ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[9px] sm:text-[10px] md:text-sm font-bold ${isVisited ? 'text-slate-400 line-through' : 'text-slate-900'} leading-tight truncate`}>
                        {poi.title.replace('Siasatan ', '')}
                      </p>
                      <p className={`text-[7px] sm:text-[8px] md:text-[10px] ${isVisited ? 'text-slate-400' : 'text-slate-500'} font-medium leading-tight mt-0.5 truncate`}>
                        {idx === 0 ? 'Jumpa Unit Trafik di parkir.' : 
                         idx === 1 ? 'Semak resit pelanggan.' : 
                         idx === 2 ? 'Selesai isu tunggakan blok.' : 
                         idx === 3 ? 'Taksiran LHDN individu VIP.' : 'Tinjau status lot kosong.'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="p-2 sm:p-4 md:p-6 mt-auto pointer-events-auto shrink-0 relative z-20">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl border-2 sm:border-[3px] border-primary p-3 sm:p-4 md:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-2 sm:gap-4 md:gap-6">
            <div className="relative shrink-0 hidden sm:block">
              <div className="size-12 sm:size-16 md:size-20 rounded-lg sm:rounded-xl md:rounded-2xl bg-slate-200 border-2 border-slate-300 overflow-hidden shadow-inner">
                <img alt="CFO Kamal" className="w-full h-full character-portrait" src={CFO_KAMAL_URL} referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-primary px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg text-[8px] sm:text-[9px] md:text-[10px] font-black text-slate-900 uppercase shadow-md border border-white sm:border-2">
                CFO
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-primary-dark font-black uppercase tracking-tighter text-[10px] sm:text-[11px] md:text-sm mb-0.5 sm:mb-1">
                Kamal <span className="text-slate-400 font-medium ml-1 hidden sm:inline">| Penasihat Kewangan</span>
              </h4>
              <p className="text-slate-800 text-[10px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed font-semibold">
                {isAllExplored 
                  ? `Syabas ${playerName}! Semua siasatan telah direkodkan dengan jayanya. Sila ke Klinik Cukai untuk memulakan pengiraan denda dan taksiran rasmi kepada pesalah.`
                  : `${playerName}! Dana pembangunan kita berada pada tahap kritikal. Jika kita tidak mengutip cukai yang tertunggak segera, projek pembaikan jalan terpaksa dihentikan! Klik ikon di peta untuk menyiasat.`}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
              {isAllExplored && (
                <button onClick={onComplete} className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-primary text-slate-900 font-bold rounded-lg sm:rounded-xl shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm btn-hover-effect">
                  Klinik Cukai <span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-sm">chevron_right</span>
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Investigation Modal */}
      {activePoi && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 pointer-events-auto">
          <div className="w-full max-w-6xl h-[90vh] sm:h-[85vh] bg-slate-100 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-300 relative">
            <div className="absolute inset-0 z-0 bg-cover bg-center blur-sm scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-white/70"></div>
            </div>

            <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-3 sm:py-4 glass-panel border-b border-primary/20 shrink-0 gap-2 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-primary p-1.5 sm:p-2 rounded-lg text-slate-900">
                  <span className="material-symbols-outlined block text-lg sm:text-2xl">gavel</span>
                </div>
                <div>
                  <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">{activePoi.title}</h1>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">Case ID: {activePoi.caseId}</p>
                </div>
              </div>
              <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-slate-700 rounded-full border border-slate-500 text-[10px] sm:text-sm font-bold text-yellow-400 shadow-inner self-end sm:self-auto">
                {showActions ? 'Tindakan Diambil' : `Dialog: ${currentPoiStep + 1}/${activePoi.dialogues.length}`}
              </div>
            </header>
            
            <main className="relative z-10 flex-1 flex flex-col md:flex-row gap-4 sm:gap-6 p-3 sm:p-6 overflow-hidden">
              <aside className="w-full md:w-1/4 flex flex-row md:flex-col shrink-0 md:flex gap-3 sm:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 md:p-6 shadow-xl border-b-4 border-primary grow flex flex-row md:flex-col items-center md:items-stretch gap-3 sm:gap-4 md:gap-0 min-w-[250px] md:min-w-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-full md:aspect-square bg-slate-100 rounded-xl overflow-hidden md:mb-4 border border-slate-200 flex items-center justify-center shrink-0">
                    <img src={activePoi.suspectImage} alt={activePoi.suspectName} className="w-full h-full character-portrait" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-2 md:space-y-4 flex-1">
                    <div>
                      <h2 className="text-sm sm:text-base md:text-2xl font-black text-slate-900 leading-tight">{activePoi.suspectName}</h2>
                      <p className="text-primary-dark font-bold text-[10px] sm:text-xs md:text-sm mt-0.5 md:mt-1">{activePoi.suspectRole}</p>
                    </div>
                    <div className="p-2 sm:p-3 md:p-4 bg-red-50 rounded-lg md:rounded-xl border border-red-100 hidden md:block">
                      <div className="flex items-center gap-1.5 md:gap-2 text-red-600 mb-1">
                        <span className="material-symbols-outlined text-xs md:text-sm">report_problem</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase">Kesalahan Disyaki</span>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-red-800 leading-snug">{activePoi.offense}</p>
                      <p className="text-[9px] md:text-[11px] text-red-700 mt-1 font-medium">{activePoi.offenseDetail}</p>
                    </div>
                  </div>
                </div>
                {/* Mobile Offense Details */}
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 md:hidden min-w-[200px] shrink-0 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-red-600 mb-1">
                    <span className="material-symbols-outlined text-xs">report_problem</span>
                    <span className="text-[9px] font-black uppercase">Kesalahan Disyaki</span>
                  </div>
                  <p className="text-xs font-bold text-red-800 leading-snug">{activePoi.offense}</p>
                  <p className="text-[9px] text-red-700 mt-1 font-medium line-clamp-2">{activePoi.offenseDetail}</p>
                </div>
              </aside>
              
              <section className="flex-1 flex flex-col gap-3 sm:gap-6 relative min-h-0">
                {!showActions ? (
                  <>
                    <div className="relative grow bg-slate-200/50 rounded-xl overflow-hidden glass-panel flex items-center justify-center p-2 sm:p-4 min-h-[150px]">
                      <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/50 bg-slate-800 flex items-center justify-center">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay blur-sm" src={activePoi.evidenceImage} alt="Evidence Background" referrerPolicy="no-referrer"/>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="rounded-xl sm:rounded-2xl p-1 bg-red-500/20 backdrop-blur-sm border-2 sm:border-4 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-slate-900 rounded-lg sm:rounded-xl overflow-hidden flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                              <img className="absolute inset-0 w-full h-full object-cover object-top animate-zoom-in-subtle" src={activePoi.evidenceImage} alt="Evidence" referrerPolicy="no-referrer"/>
                              <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-600 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded uppercase shadow-md">EVIDENCE</div>
                              <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-slate-900/80 p-1 sm:p-1.5 rounded-md sm:rounded-lg backdrop-blur-sm border border-white/20">
                                <span className="material-symbols-outlined text-base sm:text-xl md:text-2xl text-white/90">{activePoi.evidenceIcon}</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-red-600"></div>
                            <div className="bg-red-600 text-white text-[9px] sm:text-[10px] md:text-xs font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full whitespace-nowrap shadow-lg uppercase tracking-wider">
                              {activePoi.evidenceText}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="min-h-[6rem] sm:min-h-[8rem] md:h-40 flex items-center gap-2 sm:gap-3 md:gap-6 p-2 sm:p-4 md:px-6 glass-panel rounded-xl sm:rounded-2xl shadow-xl border-l-4 sm:border-l-8 border-primary-dark bg-white/95 relative shrink-0">
                      {/* Speech bubble tail */}
                      <div className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] sm:border-t-[10px] border-t-transparent border-r-[10px] sm:border-r-[15px] border-r-primary-dark border-b-[6px] sm:border-b-[10px] border-b-transparent"></div>
                      
                      <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-2 sm:border-4 border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner relative">
                        {activePoi.dialogues[currentPoiStep].speaker === "Datuk Bandar" ? (
                          <img src={playerAvatar} className="w-full h-full character-portrait" alt={playerName} referrerPolicy="no-referrer" />
                        ) : activePoi.dialogues[currentPoiStep].speaker === "CFO Kamal" ? (
                          <img src={CFO_KAMAL_URL} className="w-full h-full character-portrait" alt="Kamal" referrerPolicy="no-referrer" />
                        ) : (
                          <img src={activePoi.suspectImage} className="w-full h-full character-portrait" alt="Suspect" referrerPolicy="no-referrer" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                          <span className={`text-[10px] sm:text-xs md:text-base font-black uppercase tracking-tighter truncate ${activePoi.dialogues[currentPoiStep].speaker === "Datuk Bandar" ? 'text-primary-dark' : 'text-slate-800'}`}>
                            {activePoi.dialogues[currentPoiStep].speaker === "Datuk Bandar" ? playerName : activePoi.dialogues[currentPoiStep].speaker}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium text-[9px] sm:text-[11px] md:text-base leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                          {activePoi.dialogues[currentPoiStep].text.replace(/Datuk Bandar/g, playerName)}
                        </p>
                      </div>
                      <button onClick={nextDialogue} className="bg-slate-800 text-white p-1.5 sm:px-3 sm:py-2 md:px-6 md:py-4 rounded-lg sm:rounded-xl font-bold text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 hover:bg-slate-900 transition-all shadow-md btn-hover-effect shrink-0">
                        <span className="hidden sm:inline">Teruskan</span> <span className="material-symbols-outlined text-base sm:text-lg md:text-xl">chevron_right</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative grow bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden glass-panel flex flex-col items-center justify-center p-4 sm:p-8 text-center border-2 sm:border-4 border-primary shadow-2xl">
                    <span className="material-symbols-outlined text-5xl sm:text-7xl text-primary mb-2 sm:mb-4 drop-shadow-md">fact_check</span>
                    <h3 className="font-black text-slate-800 text-xl sm:text-3xl mb-2 sm:mb-3">Maklumat Direkodkan</h3>
                    <p className="text-slate-600 mb-4 sm:mb-8 max-w-md text-xs sm:text-base md:text-lg font-medium">Pihak yang terlibat telah diberi penerangan tentang kesalahan serta tindakan undang-undang atas pengabaian cukai tersebut.</p>
                    <button onClick={solveInvestigation} className="bg-primary hover:bg-primary-dark text-slate-900 font-bold text-sm sm:text-lg py-2.5 sm:py-4 px-6 sm:px-10 rounded-full shadow-lg hover:-translate-y-1 transition-all">Selesai & Tutup Kes</button>
                  </div>
                )}
              </section>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};
