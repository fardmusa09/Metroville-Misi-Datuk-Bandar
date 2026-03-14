import React, { useState } from 'react';
import { motion } from 'motion/react';

import { MAYOR_AVATAR_URL } from '../constants';

interface PhaseRegistrationProps {
  onComplete: (name: string, avatar: string) => void;
  onShowSettings: () => void;
}

const AVATARS = [
  MAYOR_AVATAR_URL,
  "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/7293e55ae87f298bcecc5b0ad3bd973a198c958a/Datuk%20Bandar%203.png",
  "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/7293e55ae87f298bcecc5b0ad3bd973a198c958a/Datuk%20Bandar%205.png",
  "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/7293e55ae87f298bcecc5b0ad3bd973a198c958a/Datuk%20Bandar%206.png"
];

export const PhaseRegistration: React.FC<PhaseRegistrationProps> = ({ onComplete, onShowSettings }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name, selectedAvatar);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#e0f2f1] flex items-center justify-center relative overflow-hidden font-display">
      {/* Background Blur Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>

      {/* Server Status Badge */}
      <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 flex items-center gap-2 z-10">
        <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Pelayan: Aktif</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-white z-10 p-8 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png" 
            alt="Metroville Logo" 
            className="h-24 object-contain drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800 mb-1">Daftar Datuk Bandar</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Sila isi maklumat anda</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="material-symbols-outlined text-primary text-sm">person</span>
              <label className="text-[10px] font-black uppercase tracking-wider">Nama Datuk Bandar</label>
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama anda..."
              className="w-full py-3 px-5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm text-slate-800 placeholder:text-slate-300"
              required
            />
          </div>

          {/* Avatar Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="material-symbols-outlined text-primary text-sm">face</span>
              <label className="text-[10px] font-black uppercase tracking-wider">Pilih Avatar Anda</label>
            </div>
            <div className="flex justify-center gap-4">
              {AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`relative size-16 rounded-xl overflow-hidden border-2 transition-all ${selectedAvatar === url ? 'border-primary scale-105 shadow-lg shadow-primary/20' : 'border-slate-100 grayscale hover:grayscale-0 hover:border-slate-200'}`}
                >
                  <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full character-portrait" referrerPolicy="no-referrer" />
                  {selectedAvatar === url && (
                    <div className="absolute top-1 right-1 bg-primary text-white size-4 rounded-full flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 bg-[#4ade80] text-white font-black text-lg rounded-2xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-3 border-b-4 border-emerald-600"
          >
            MULA BERKHIDMAT <span className="material-symbols-outlined">rocket_launch</span>
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 flex gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <button onClick={onShowSettings} className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">settings</span> Tetapan
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">help</span> Bantuan
          </button>
        </div>
      </motion.div>
    </div>
  );
};
