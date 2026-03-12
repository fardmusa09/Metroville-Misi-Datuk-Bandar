import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { audioService } from '../services/audioService';

interface PhaseIntroProps {
  onComplete: () => void;
}

export const PhaseIntro: React.FC<PhaseIntroProps> = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playIntro = () => {
    setStarted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.warn("Video play failed:", e));
    }
  };

  const handleComplete = () => {
    // Start BGM only after intro video ends or is skipped
    audioService.playBgm('https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3');
    onComplete();
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center relative overflow-hidden z-[100]">
      {!started ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <img 
            src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png" 
            alt="Logo Metroville" 
            className="h-80 md:h-[32rem] mb-8 object-contain drop-shadow-[0_0_20px_rgba(19,236,91,0.5)]"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={playIntro} 
            className="bg-primary text-slate-900 font-bold text-xl py-4 px-10 rounded-full shadow-[0_0_30px_rgba(19,236,91,0.4)] transition-transform hover:scale-105 flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-3xl">play_circle</span> Mulakan Pengalaman
          </button>
        </div>
      ) : null}

      <video 
        ref={videoRef}
        className={`w-full h-full object-cover ${!started ? 'hidden' : ''}`} 
        playsInline 
        onEnded={handleComplete}
      >
        <source src="https://cdn.jsdelivr.net/gh/fardiansyahmusa-ai/agro-edugame-assets@2404b7526e4a9c8e0e305fa162835270b453045c/Animate_logo_like_sims_intro_delpmaspu_.mp4" type="video/mp4" />
      </video>

      {/* Skip Button */}
      {started && (
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={handleComplete} 
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white font-bold py-2.5 px-6 rounded-full border border-white/30 transition-colors flex items-center gap-2 shadow-lg"
        >
          Langkau <span className="material-symbols-outlined text-base">skip_next</span>
        </motion.button>
      )}
    </div>
  );
};
