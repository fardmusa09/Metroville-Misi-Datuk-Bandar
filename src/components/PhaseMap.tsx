import React, { useState } from 'react';
import { POI_DATA, MAYOR_AVATAR_URL, CFO_KAMAL_URL } from '../constants';
import { POICase } from '../types';
import { GameHeader } from './GameHeader';

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
            <div className="relative flex items-center justify-center">
              {!isVisited && <div className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/60 rounded-full animate-ping"></div>}
              <div className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${isVisited ? 'bg-slate-400 border-slate-300' : 'bg-primary border-white'} rounded-full flex items-center justify-center shadow-lg border-2 sm:border-[3px] group-hover:scale-110 transition-transform`}>
                {/* Sims Plumbob for unvisited markers */}
                {!isVisited && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                    <div className="w-2 h-4 sm:w-3 sm:h-5 bg-sim-green rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-bounce"></div>
                  </div>
                )}
                <span className={`material-symbols-outlined ${isVisited ? 'text-slate-200' : 'text-white'} font-bold text-lg sm:text-xl md:text-2xl`}>
                  {poi.id === 'roadtax' ? 'directions_car' : 
                   poi.id === 'sst' ? 'storefront' : 
                   poi.id === 'property' ? 'apartment' : 
                   poi.id === 'income' ? 'person_search' : 'landscape'}
                </span>
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
        
        <div className="flex-1 flex flex-col items-start justify-start px-4 md:px-6 gap-3 md:gap-4 min-h-0">
          <div className="w-64 md:w-72 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl flex flex-col shrink-0 hidden sm:flex pointer-events-auto">
            <div className="p-3 md:p-4 border-b border-slate-100 shrink-0">
              <h3 className="text-slate-900 font-black text-xs md:text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base md:text-lg">assignment</span>
                Aktual Misi
              </h3>
            </div>
            <div className="p-2 flex flex-col gap-0.5 md:gap-1">
              {POI_DATA.map((poi, idx) => {
                const isVisited = exploredItems.has(poi.id);
                return (
                  <div key={poi.id} className="flex items-center gap-2 md:gap-3 p-2 rounded-xl">
                    <span className={`material-symbols-outlined ${isVisited ? 'text-primary-dark' : 'text-slate-400'} text-lg md:text-xl`}>
                      {isVisited ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div>
                      <p className={`text-xs md:text-sm font-bold ${isVisited ? 'text-slate-400 line-through' : 'text-slate-900'} leading-tight`}>
                        {poi.title.replace('Siasatan ', '')}
                      </p>
                      <p className={`text-[9px] md:text-[10px] ${isVisited ? 'text-slate-400' : 'text-slate-500'} font-medium leading-tight mt-0.5`}>
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

        <footer className="p-4 md:p-6 mt-auto pointer-events-auto shrink-0 relative z-20">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl border-[3px] border-primary p-4 md:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center gap-4 md:gap-6">
            <div className="relative shrink-0 hidden sm:block">
              <div className="size-16 md:size-20 rounded-xl md:rounded-2xl bg-slate-200 border-2 border-slate-300 overflow-hidden shadow-inner">
                <img alt="CFO Kamal" className="w-full h-full character-portrait" src={CFO_KAMAL_URL} referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] font-black text-slate-900 uppercase shadow-md border-2 border-white">
                CFO
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-primary-dark font-black uppercase tracking-tighter text-[11px] md:text-sm mb-1">
                Kamal <span className="text-slate-400 font-medium ml-1">| Penasihat Kewangan</span>
              </h4>
              <p className="text-slate-800 text-xs md:text-sm leading-relaxed font-semibold">
                {isAllExplored 
                  ? `Syabas ${playerName}! Semua siasatan telah direkodkan dengan jayanya. Sila ke Klinik Cukai untuk memulakan pengiraan denda dan taksiran rasmi kepada pesalah.`
                  : `${playerName}! Dana pembangunan kita berada pada tahap kritikal. Jika kita tidak mengutip cukai yang tertunggak segera, projek pembaikan jalan terpaksa dihentikan! Klik ikon di peta untuk menyiasat.`}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              {isAllExplored && (
                <button onClick={onComplete} className="px-5 py-2.5 md:px-6 md:py-3 bg-primary text-slate-900 font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-transform flex items-center gap-1 md:gap-2 text-xs md:text-sm btn-hover-effect">
                  Klinik Cukai <span className="material-symbols-outlined text-[16px] md:text-sm">chevron_right</span>
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Investigation Modal */}
      {activePoi && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 pointer-events-auto">
          <div className="w-full max-w-6xl h-[85vh] bg-slate-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-300 relative">
            <div className="absolute inset-0 z-0 bg-cover bg-center blur-sm scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-white/70"></div>
            </div>

            <header className="relative z-10 flex items-center justify-between px-8 py-4 glass-panel border-b border-primary/20 shrink-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-2 rounded-lg text-slate-900">
                  <span className="material-symbols-outlined block">gavel</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">{activePoi.title}</h1>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Case ID: {activePoi.caseId}</p>
                </div>
              </div>
              <div className="px-4 py-1.5 bg-slate-700 rounded-full border border-slate-500 text-sm font-bold text-yellow-400 shadow-inner">
                {showActions ? 'Tindakan Diambil' : `Dialog: ${currentPoiStep + 1}/${activePoi.dialogues.length}`}
              </div>
            </header>
            
            <main className="relative z-10 flex-1 flex gap-6 p-6 overflow-hidden">
              <aside className="w-1/4 flex flex-col shrink-0 hidden md:flex">
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl border-b-4 border-primary grow flex flex-col">
                  <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4 border border-slate-200 flex items-center justify-center">
                    <img src={activePoi.suspectImage} alt={activePoi.suspectName} className="w-full h-full character-portrait" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 right-2">
                      <div className="w-4 h-6 bg-sim-green rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-bounce"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 leading-tight">{activePoi.suspectName}</h2>
                      <p className="text-primary-dark font-bold text-sm mt-1">{activePoi.suspectRole}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex items-center gap-2 text-red-600 mb-1">
                        <span className="material-symbols-outlined text-sm">report_problem</span>
                        <span className="text-[10px] font-black uppercase">Kesalahan Disyaki</span>
                      </div>
                      <p className="text-sm font-bold text-red-800 leading-snug">{activePoi.offense}</p>
                      <p className="text-[11px] text-red-700 mt-1 font-medium">{activePoi.offenseDetail}</p>
                    </div>
                  </div>
                </div>
              </aside>
              
              <section className="flex-1 flex flex-col gap-6 relative">
                {!showActions ? (
                  <>
                    <div className="relative grow bg-slate-200/50 rounded-xl overflow-hidden glass-panel flex items-center justify-center p-4">
                      <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/50 bg-slate-800 flex items-center justify-center">
                        <img className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" src={activePoi.evidenceImage} alt="Evidence" referrerPolicy="no-referrer"/>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="rounded-2xl p-1 bg-red-500/20 backdrop-blur-sm border-4 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            <div className="relative w-48 h-48 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                              <span className="material-symbols-outlined text-6xl text-white/90 animate-pulse">{activePoi.evidenceIcon}</span>
                              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">EVIDENCE</div>
                            </div>
                          </div>
                          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-1 h-10 bg-red-600"></div>
                            <div className="bg-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-full whitespace-nowrap shadow-lg uppercase tracking-wider">
                              {activePoi.evidenceText}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-36 md:h-40 flex items-center gap-6 px-6 glass-panel rounded-2xl shadow-xl border-l-8 border-primary-dark bg-white/95 relative">
                      {/* Speech bubble tail */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-primary-dark border-b-[10px] border-b-transparent"></div>
                      
                      <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner relative">
                        {activePoi.dialogues[currentPoiStep].speaker === "Datuk Bandar" ? (
                          <img src={playerAvatar} className="w-full h-full character-portrait" alt={playerName} referrerPolicy="no-referrer" />
                        ) : activePoi.dialogues[currentPoiStep].speaker === "CFO Kamal" ? (
                          <img src={CFO_KAMAL_URL} className="w-full h-full character-portrait" alt="Kamal" referrerPolicy="no-referrer" />
                        ) : (
                          <img src={activePoi.suspectImage} className="w-full h-full character-portrait" alt="Suspect" referrerPolicy="no-referrer" />
                        )}
                        {/* Plumbob for active speaker */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                          <div className="w-2 h-3 bg-sim-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-base font-black uppercase tracking-tighter ${activePoi.dialogues[currentPoiStep].speaker === "Datuk Bandar" ? 'text-primary-dark' : 'text-slate-800'}`}>
                            {activePoi.dialogues[currentPoiStep].speaker === "Datuk Bandar" ? playerName : activePoi.dialogues[currentPoiStep].speaker}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">
                          {activePoi.dialogues[currentPoiStep].text}
                        </p>
                      </div>
                      <button onClick={nextDialogue} className="bg-slate-800 text-white px-6 py-4 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-900 transition-all shadow-md btn-hover-effect shrink-0">
                        Teruskan <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative grow bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden glass-panel flex flex-col items-center justify-center p-8 text-center border-4 border-primary shadow-2xl">
                    <span className="material-symbols-outlined text-7xl text-primary mb-4 drop-shadow-md">fact_check</span>
                    <h3 className="font-black text-slate-800 text-3xl mb-3">Maklumat Direkodkan</h3>
                    <p className="text-slate-600 mb-8 max-w-md text-lg font-medium">Pihak yang terlibat telah diberi penerangan tentang kesalahan serta tindakan undang-undang atas pengabaian cukai tersebut.</p>
                    <button onClick={solveInvestigation} className="bg-primary hover:bg-primary-dark text-slate-900 font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:-translate-y-1 transition-all">Selesai & Tutup Kes</button>
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
