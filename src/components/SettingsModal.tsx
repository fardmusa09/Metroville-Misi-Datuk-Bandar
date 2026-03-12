import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioService } from '../services/audioService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onRestart }) => {
  const [bgmVolume, setBgmVolume] = useState(80);
  const [sfxVolume, setSfxVolume] = useState(65);
  const [language, setLanguage] = useState<'ms' | 'en'>('ms');

  const handleBgmChange = (val: number) => {
    setBgmVolume(val);
    audioService.setBgmVolume(val);
  };

  const handleSfxChange = (val: number) => {
    setSfxVolume(val);
    audioService.setSfxVolume(val);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blurred Game Background Placeholder / Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0" 
            onClick={onClose} 
            style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(20, 40, 20, 0.3)' }}
          />
          
          {/* Settings Popup Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden flex flex-col border-2 border-white z-10 shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-emerald-50/50">
              <div className="flex items-center gap-3">
                <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white shadow-md shadow-primary/30">
                  <span className="material-symbols-outlined text-lg">settings</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800 leading-tight">Tetapan Permainan</h1>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Metroville</p>
                </div>
              </div>
              <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white transition-all active:scale-95">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {/* Audio Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                  <h2 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest">Audio</h2>
                </div>
                <div className="space-y-4 px-1">
                  {/* BGM Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-600">Muzik Latar (BGM)</label>
                      <span className="text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full shadow-sm">{bgmVolume}%</span>
                    </div>
                    <div className="relative flex items-center h-4">
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${bgmVolume}%` }}></div>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={bgmVolume} 
                        onChange={(e) => handleBgmChange(Number(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      />
                      <div className="absolute size-4 bg-white border-[3px] border-primary rounded-full shadow-md pointer-events-none transition-transform" style={{ left: `calc(${bgmVolume}% - 8px)` }}></div>
                    </div>
                  </div>
                  
                  {/* SFX Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-600">Kesan Bunyi (SFX)</label>
                      <span className="text-[10px] font-bold text-white bg-primary/70 px-2 py-0.5 rounded-full shadow-sm">{sfxVolume}%</span>
                    </div>
                    <div className="relative flex items-center h-4">
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${sfxVolume}%` }}></div>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={sfxVolume} 
                        onChange={(e) => handleSfxChange(Number(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      />
                      <div className="absolute size-4 bg-white border-[3px] border-primary rounded-full shadow-md pointer-events-none transition-transform" style={{ left: `calc(${sfxVolume}% - 8px)` }}></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Language Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">language</span>
                  <h2 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest">Bahasa</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setLanguage('ms')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 font-bold text-xs transition-all shadow-sm ${language === 'ms' ? 'border-primary bg-primary/10 text-primary-dark' : 'border-slate-100 text-slate-500 hover:bg-slate-50 active:scale-95'}`}
                  >
                    {language === 'ms' && <span className="material-symbols-outlined text-sm">check_circle</span>}
                    Bahasa Melayu
                  </button>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 font-bold text-xs transition-all shadow-sm ${language === 'en' ? 'border-primary bg-primary/10 text-primary-dark' : 'border-slate-100 text-slate-500 hover:bg-slate-50 active:scale-95'}`}
                  >
                    {language === 'en' && <span className="material-symbols-outlined text-sm">check_circle</span>}
                    English
                  </button>
                </div>
              </section>

              {/* Controls Section */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">gamepad</span>
                  <h2 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest">Kawalan</h2>
                </div>
                <div className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100">
                      <span className="material-symbols-outlined text-primary text-sm">mouse</span>
                    </div>
                    <div className="text-[10px]">
                      <p className="font-bold text-slate-700">Klik Kiri</p>
                      <p className="text-slate-500">Pilih / Bina</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100">
                      <span className="material-symbols-outlined text-primary text-sm">drag_pan</span>
                    </div>
                    <div className="text-[10px]">
                      <p className="font-bold text-slate-700">Seret</p>
                      <p className="text-slate-500">Gerak Kamera</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Action & Links */}
            <footer className="p-4 border-t border-slate-100 bg-slate-50">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      onRestart();
                      onClose();
                    }}
                    className="flex-1 py-2.5 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-red-200"
                  >
                    <span className="material-symbols-outlined text-sm">delete_forever</span>
                    Mula Semula
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-1.5 border-b-2 border-primary-dark"
                  >
                    Simpan & Tutup
                  </button>
                </div>
                <div className="flex justify-center gap-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <a className="hover:text-primary transition-colors" href="#">Kredit</a>
                  <a className="hover:text-primary transition-colors" href="#">Bantuan</a>
                  <a className="hover:text-primary transition-colors" href="#">Privasi</a>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
