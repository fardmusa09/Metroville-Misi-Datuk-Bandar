import React, { useState } from 'react';
import { STORY, CFO_KAMAL_URL } from '../constants';

interface PhaseDialogueProps {
  playerName: string;
  playerAvatar: string;
  onComplete: () => void;
}

export const PhaseDialogue: React.FC<PhaseDialogueProps> = ({ playerName, playerAvatar, onComplete }) => {
  const [stepId, setStepId] = useState(0);
  const step = STORY[stepId];

  const handleChoice = (nextId: number) => {
    if (nextId === 99) {
      onComplete();
    } else {
      setStepId(nextId);
    }
  };

  const isSystem = step.speaker === "Sistem Pusat";
  const isPlayer = step.speaker === "Datuk Bandar";

  return (
    <div className="h-screen w-screen bg-slate-900 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #0ea641 0%, transparent 50%), radial-gradient(circle at 80% 20%, #13ec5b 0%, transparent 30%)" }}></div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-end p-4 md:p-8 pb-8 md:pb-12 max-w-5xl mx-auto w-full h-full">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 relative">
          <div className={`w-24 h-24 md:w-40 md:h-40 ${isSystem ? 'bg-red-900 border-red-500' : 'bg-slate-800 border-slate-600'} border-4 rounded-full shadow-2xl flex items-center justify-center overflow-hidden shrink-0 z-20`}>
            {isSystem ? (
              <img src="https://cdn-icons-png.flaticon.com/512/888/888034.png" className="w-full h-full object-cover p-4 md:p-8" alt="System" referrerPolicy="no-referrer" />
            ) : isPlayer ? (
              <img src={playerAvatar} className="w-full h-full character-portrait" alt={playerName} referrerPolicy="no-referrer" />
            ) : (
              <img src={CFO_KAMAL_URL} className="w-full h-full character-portrait" alt="Kamal" referrerPolicy="no-referrer" />
            )}
          </div>
          
          <div className="flex-1 w-full bg-slate-800/90 backdrop-blur-xl border border-slate-600 rounded-3xl p-5 md:p-8 shadow-2xl relative mt-4 md:mt-0">
            <div className={`absolute -top-4 left-6 md:left-10 ${isSystem ? 'bg-red-600 border-red-700' : 'bg-primary text-slate-900'} text-white font-black px-4 md:px-6 py-1 md:py-1.5 rounded-full text-xs md:text-sm tracking-widest uppercase shadow-md border`}>
              {isPlayer ? playerName : step.speaker}
            </div>
            <p className="text-base md:text-xl text-slate-200 leading-relaxed font-medium mt-3 md:mt-2 mb-6 md:mb-8">
              {step.text.replace(/Datuk Bandar/g, playerName)}
            </p>
            <div className="flex flex-col gap-2 md:gap-3 items-end">
              {step.choices.map((choice, idx) => (
                <button 
                  key={idx}
                  className="w-full md:w-auto text-left md:text-center bg-slate-700 hover:bg-primary hover:text-slate-900 text-white font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-xl border border-slate-500 transition-colors flex items-center gap-2 btn-hover-effect text-sm md:text-base" 
                  onClick={() => handleChoice(choice.nextId)}
                >
                  ▶ {choice.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
