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
      
      <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-12 max-w-5xl mx-auto w-full h-full">
        <div className="flex items-end gap-6 relative">
          <div className={`w-40 h-40 ${isSystem ? 'bg-red-900 border-red-500' : 'bg-slate-800 border-slate-600'} border-4 rounded-full shadow-2xl flex items-center justify-center overflow-hidden shrink-0 z-20`}>
            {isSystem ? (
              <img src="https://cdn-icons-png.flaticon.com/512/888/888034.png" className="w-full h-full object-cover p-8" alt="System" referrerPolicy="no-referrer" />
            ) : isPlayer ? (
              <img src={playerAvatar} className="w-full h-full character-portrait" alt={playerName} referrerPolicy="no-referrer" />
            ) : (
              <img src={CFO_KAMAL_URL} className="w-full h-full character-portrait" alt="Kamal" referrerPolicy="no-referrer" />
            )}
          </div>
          
          <div className="flex-1 bg-slate-800/90 backdrop-blur-xl border border-slate-600 rounded-3xl p-8 shadow-2xl relative">
            <div className={`absolute -top-4 left-10 ${isSystem ? 'bg-red-600 border-red-700' : 'bg-primary text-slate-900'} text-white font-black px-6 py-1.5 rounded-full text-sm tracking-widest uppercase shadow-md border`}>
              {isPlayer ? playerName : step.speaker}
            </div>
            <p className="text-xl text-slate-200 leading-relaxed font-medium mt-2 mb-8">
              {step.text.replace(/Datuk Bandar/g, playerName)}
            </p>
            <div className="flex flex-col gap-3 items-end">
              {step.choices.map((choice, idx) => (
                <button 
                  key={idx}
                  className="bg-slate-700 hover:bg-primary hover:text-slate-900 text-white font-medium py-3 px-6 rounded-xl border border-slate-500 transition-colors flex items-center gap-2 btn-hover-effect" 
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
