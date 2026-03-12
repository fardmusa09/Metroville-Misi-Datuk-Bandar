import React, { useState } from 'react';
import { MAYOR_AVATAR_URL, CFO_KAMAL_URL } from '../constants';
import { audioService } from '../services/audioService';
import { GameHeader } from './GameHeader';

interface PhaseClinicProps {
  fundLevel: number;
  score: number;
  playerName: string;
  playerAvatar: string;
  onComplete: () => void;
  onShowGuide: () => void;
  onUpdateFund: (amount: number) => void;
  onUpdateScore: (points: number) => void;
  onShowSettings: () => void;
}

const CLINIC_CASES = [
  {
    id: "income",
    header: "Taksiran Cukai Pendapatan",
    desc: "Bantu Encik Ravi kira cukai LHDN!",
    suspect: { 
      name: "Encik Ravi", 
      role: "Jurutera Awam", 
      warning: "LHDN Audit", 
      formLabel: "FORM BE 2023", 
      avatar: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/En%20Ravi.png" 
    },
    data: {
      income: 85000,
      donation: 500,
      reliefs: {
        individual: 9000,
        kwsp: 6000,
        medical: 2200,
        lifestyle: 1500
      }
    },
    verify: (inputs: any) => {
      const { don, rel, base, bal } = inputs;
      return don === 500 && rel === 18700 && base === 1800 && bal === 2212;
    }
  },
  {
    id: "roadtax",
    header: "Taksiran Cukai Jalan",
    desc: "Kira Cukai Jalan (LKM) mengikut jadual JPJ.",
    suspect: { 
      name: "Pak Samad", 
      role: "Pemandu Teksi", 
      warning: "LKM Mati", 
      formLabel: "RENEWAL LKM", 
      avatar: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/Pak%20Samad.png" 
    },
    data: {
      cc: 1860,
      baseRate: 280,
      excessRate: 0.50
    },
    verify: (inputs: any) => {
      const { base, prog } = inputs;
      return base === 280 && prog === 30;
    }
  },
  {
    id: "sst",
    header: "Taksiran Cukai SST",
    desc: "Kira Cukai Jualan (SST) bagi Kafe.",
    suspect: { 
      name: "Puan Mei", 
      role: "Pemilik Kafe", 
      warning: "Aduan Resit", 
      formLabel: "RESIT JUALAN", 
      avatar: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/Puan%20Mei.png" 
    },
    data: {
      amount: 150,
      rate: 0.06
    },
    verify: (inputs: any) => {
      const { tax } = inputs;
      return parseFloat(tax) === 9;
    }
  },
  {
    id: "property",
    header: "Taksiran Cukai Pintu",
    desc: "Kira Cukai Pintu untuk pangsapuri.",
    suspect: { 
      name: "Encik Ali", 
      role: "Pemilik Rumah", 
      warning: "Tunggakan PBT", 
      formLabel: "BIL PBT", 
      avatar: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/En%20Ali.png" 
    },
    data: {
      monthlyRent: 1200,
      rate: 0.05
    },
    verify: (inputs: any) => {
      const { ann, tax } = inputs;
      return parseInt(ann) === 14400 && parseInt(tax) === 720;
    }
  },
  {
    id: "land",
    header: "Taksiran Cukai Tanah",
    desc: "Kira Cukai Tanah bagi lot kosong.",
    suspect: { 
      name: "Enc. Abdullah", 
      role: "Pemilik Tanah", 
      warning: "Abaikan Notis", 
      formLabel: "BIL TANAH", 
      avatar: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/En%20Abdullah.png" 
    },
    data: {
      area: 300,
      rate: 0.15
    },
    verify: (inputs: any) => {
      const { tax } = inputs;
      return parseInt(tax) === 45;
    }
  }
];

export const PhaseClinic: React.FC<PhaseClinicProps> = ({ 
  fundLevel, 
  score,
  playerName, 
  playerAvatar, 
  onComplete, 
  onShowGuide, 
  onUpdateFund, 
  onUpdateScore,
  onShowSettings 
}) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [inputs, setInputs] = useState<any>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    // Lower BGM volume to 8% during investigation
    audioService.setBgmVolume(8);
    return () => {
      // Restore BGM volume to 80% when leaving investigation
      audioService.setBgmVolume(80);
    };
  }, []);

  const currentCase = CLINIC_CASES[caseIndex];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const handleVerify = () => {
    const numericInputs = Object.keys(inputs).reduce((acc: any, key) => {
      acc[key] = parseFloat(inputs[key]);
      return acc;
    }, {});

    if (currentCase.verify(numericInputs)) {
      setFeedback("Taksiran Disahkan!");
      setIsSuccess(true);
      audioService.playTaxPayment();
      onUpdateFund(10); // RM 5,000
      onUpdateScore(1000);
      setTimeout(() => {
        if (caseIndex < CLINIC_CASES.length - 1) {
          setCaseIndex(prev => prev + 1);
          setInputs({});
          setFeedback(null);
          setIsSuccess(false);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setFeedback("Ralat Pengiraan. Penalti RM 500.");
      onUpdateFund(-1); // RM 500 penalty
      onUpdateScore(-200);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const formattedFund = ((fundLevel / 100) * 50000).toLocaleString();

  return (
    <div className="h-screen w-screen font-display bg-background-light text-slate-900 isometric-bg flex flex-col overflow-hidden relative">
      <GameHeader 
        fundLevel={fundLevel}
        score={score}
        playerAvatar={playerAvatar}
        title="Klinik Cukai Bergerak"
        onShowSettings={onShowSettings}
        onShowGuide={onShowGuide}
      />

      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden p-4 md:p-6 gap-4 md:gap-6 min-h-0 max-w-[1400px] mx-auto w-full z-10">
        {/* Left Panel */}
        <aside className="w-full lg:w-[350px] flex flex-col gap-4 shrink-0">
          <div className="glass-panel rounded-2xl p-4 shadow-xl shrink-0 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/20 text-primary-dark px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border border-primary/30">Sesi {caseIndex + 1} / 5</span>
              <h1 className="text-base font-display font-black text-slate-800 tracking-tight leading-none">{currentCase.header}</h1>
            </div>
            
            <div className="flex items-center gap-3 mt-3 bg-white/60 p-2 rounded-xl border border-white/50">
              <div className="bg-slate-200 flex items-center justify-center rounded-full w-12 h-12 border-2 border-white shadow-sm shrink-0 overflow-hidden">
                <img src={currentCase.suspect.avatar} alt={currentCase.suspect.name} className="w-full h-full character-portrait" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-slate-800 leading-tight">{currentCase.suspect.name}</h3>
                <p className="text-slate-500 font-bold bg-slate-100/80 px-1.5 py-0.5 rounded text-[9px] mt-0.5 w-fit">{currentCase.suspect.role}</p>
              </div>
              <div className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-1 rounded-lg border border-red-100 flex flex-col items-center justify-center shrink-0 shadow-sm text-center">
                <span className="material-symbols-outlined text-base mb-0.5">warning</span> {currentCase.suspect.warning}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl flex-1 flex flex-col min-h-0 overflow-hidden shadow-xl">
            <div className="p-3 border-b border-white/50 bg-white/40 shrink-0">
              <h4 className="text-slate-800 font-black text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-dark text-[14px]">folder_open</span>
                Rekod Taksiran & Data
              </h4>
            </div>
            <div className="p-3 flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
              {currentCase.id === 'income' && (
                <>
                  <div className="bg-green-50 rounded-xl p-2.5 flex justify-between items-center border border-green-100 shadow-sm">
                    <div><p className="text-slate-800 font-bold text-xs">Gaji Kasar Tahunan</p></div>
                    <p className="text-green-700 font-display font-bold text-sm">RM 85,000</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-2.5 flex justify-between items-center border border-pink-100 shadow-sm">
                    <div><p className="text-slate-800 font-bold text-xs">Sumbangan Derma</p></div>
                    <p className="text-pink-600 font-display font-bold text-sm">RM 500</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Pelepasan</p>
                    <div className="bg-orange-50 rounded-xl p-2 flex justify-between items-center border border-orange-100">
                      <p className="text-slate-800 text-[11px] font-bold">Individu</p>
                      <p className="text-slate-800 font-display font-bold text-xs">RM 9,000</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-2 flex justify-between items-center border border-orange-100">
                      <p className="text-slate-800 text-[11px] font-bold">Ins. & KWSP</p>
                      <p className="text-slate-800 font-display font-bold text-xs">RM 6,000</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-2 flex justify-between items-center border border-orange-100">
                      <p className="text-slate-800 text-[11px] font-bold">Perubatan</p>
                      <p className="text-slate-800 font-display font-bold text-xs">RM 2,200</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-2 flex justify-between items-center border border-orange-100">
                      <p className="text-slate-800 text-[11px] font-bold">Gaya Hidup</p>
                      <p className="text-slate-800 font-display font-bold text-xs">RM 1,500</p>
                    </div>
                  </div>
                </>
              )}
              {currentCase.id === 'roadtax' && (
                <div className="bg-blue-50 rounded-xl p-2.5 flex justify-between items-center border border-blue-100 shadow-sm">
                  <div><p className="text-slate-800 font-bold text-xs">Proton Saga (1,860 cc)</p></div>
                  <p className="text-blue-700 font-display font-bold text-sm">1,860 cc</p>
                </div>
              )}
              {currentCase.id === 'sst' && (
                <div className="bg-orange-50 rounded-xl p-2.5 flex justify-between items-center border border-orange-100 shadow-sm">
                  <p className="text-slate-800 font-bold text-xs">Makanan & Minuman</p>
                  <p className="text-orange-700 font-display font-bold text-sm">RM 150.00</p>
                </div>
              )}
              {currentCase.id === 'property' && (
                <div className="bg-purple-50 rounded-xl p-2.5 flex justify-between items-center border border-purple-100 shadow-sm">
                  <p className="text-slate-800 font-bold text-xs">Sewa Bulanan</p>
                  <p className="text-purple-700 font-display font-bold text-sm">RM 1,200</p>
                </div>
              )}
              {currentCase.id === 'land' && (
                <div className="bg-green-50 rounded-xl p-2.5 flex justify-between items-center border border-green-100 shadow-sm">
                  <p className="text-slate-800 font-bold text-xs">Keluasan Tanah</p>
                  <p className="text-green-700 font-display font-bold text-sm">300 m²</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Panel */}
        <section className="flex-1 flex flex-col min-h-0">
          <div className="glass-panel rounded-3xl flex flex-col h-full relative overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/50 bg-white/40 flex justify-between items-center shrink-0">
              <h2 className="text-sm md:text-base font-black text-slate-800 tracking-tight flex items-center gap-2">
                <div className="bg-primary text-slate-900 p-1.5 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-base">calculate</span>
                </div>
                Ruang Pengiraan
              </h2>
              <div className="text-[9px] font-black text-primary-dark bg-white border border-primary/20 px-2 py-1 rounded shadow-sm uppercase">
                {currentCase.suspect.formLabel}
              </div>
            </div>

            <div className="flex-1 p-3 md:p-5 flex flex-col gap-3 overflow-y-auto custom-scrollbar bg-slate-50/50">
              {currentCase.id === 'income' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                    <h3 className="text-slate-800 font-display font-bold text-sm mb-2">Langkah 1: Pendapatan Bercukai</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-600">Tolak: Pengecualian (Derma)</label>
                        <input id="don" value={inputs.don || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-600">Tolak: Jumlah Pelepasan</label>
                        <input id="rel" value={inputs.rel || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                    <h3 className="text-slate-800 font-display font-bold text-sm mb-2">Langkah 2: Cukai Perlu Dibayar</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-600">Cukai Asas (RM 50k)</label>
                        <input id="base" value={inputs.base || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-600">Cukai Atas Baki (14%)</label>
                        <input id="bal" value={inputs.bal || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentCase.id === 'roadtax' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                    <h3 className="text-slate-800 font-display font-bold text-sm mb-2">Pengiraan Cukai Jalan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-600">Cukai Asas</label>
                        <input id="base" value={inputs.base || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-600">Cukai Progresif (60cc x 0.50)</label>
                        <input id="prog" value={inputs.prog || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentCase.id === 'sst' && (
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                  <h3 className="text-slate-800 font-display font-bold text-sm mb-2">Pengiraan SST (6%)</h3>
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-slate-600">Jumlah Cukai</label>
                    <input id="tax" value={inputs.tax || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                  </div>
                </div>
              )}
              {currentCase.id === 'property' && (
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                  <h3 className="text-slate-800 font-display font-bold text-sm mb-2">Pengiraan Cukai Pintu (5%)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-slate-600">Nilai Tahunan (Sewa x 12)</label>
                      <input id="ann" value={inputs.ann || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-slate-600">Cukai Pintu</label>
                      <input id="tax" value={inputs.tax || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                    </div>
                  </div>
                </div>
              )}
              {currentCase.id === 'land' && (
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
                  <h3 className="text-slate-800 font-display font-bold text-sm mb-2">Pengiraan Cukai Tanah (RM 0.15/m²)</h3>
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-slate-600">Cukai Tanah</label>
                    <input id="tax" value={inputs.tax || ''} onChange={handleInputChange} className="w-32 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm font-bold" type="number" placeholder="RM"/>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/50 bg-white/80 shrink-0 flex justify-between items-center rounded-b-3xl">
              <div className="flex flex-col">
                <span className={`text-[10px] font-bold ${isSuccess ? 'text-primary-dark' : 'text-slate-500'}`}>
                  {feedback || "Lengkapkan maklumat taksiran."}
                </span>
              </div>
              <button 
                onClick={handleVerify} 
                disabled={isSuccess}
                className={`flex items-center justify-center gap-1.5 text-slate-900 font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all ${isSuccess ? 'bg-slate-200 opacity-50' : 'bg-primary hover:bg-primary-dark hover:translate-y-0.5'}`}
              >
                <span className="material-symbols-outlined text-sm">send</span>
                Hantar Taksiran
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
