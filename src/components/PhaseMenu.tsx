import React from 'react';

interface PhaseMenuProps {
  playerName: string;
  playerAvatar: string;
  onStart: () => void;
  onShowGuide: () => void;
  onShowSettings: () => void;
}

export const PhaseMenu: React.FC<PhaseMenuProps> = ({ playerName, playerAvatar, onStart, onShowGuide, onShowSettings }) => {
  return (
    <main className="h-screen w-screen relative flex flex-col items-center justify-between overflow-hidden" id="game-container">
      {/* BEGIN: Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* City Background Image */}
        <img 
          alt="Isometric City Background" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5f7Wk2v6wELd1AtuJe7ZgFXyxbuvJDdbOQFskZbzPOWbw1Lqegldd2-jTwqPdCp7Qk3LEAGPOWAXtS3GnGW6Kp4NX4l7lDinI-mpbcZcLMqT1h4VSIdjo_Q-TQYZeEGG6He07C0m1T9iU_XIE9pCT6h9pu_Zf-blExQfp6UR6bALARHHG3O7gKC2xunAtsB7g-eBZiBA5md6e_O_SADbElQ3hmoIPRvsBWZrwDhTG0EZvZ4QzSt5HksLMbHfkBS3rs3Dilnjo-3de"
          referrerPolicy="no-referrer"
        />
        
        {/* Cloud Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[-10%] opacity-60 animate-drift" style={{ animationDelay: '0s' }}>
            <svg fill="white" height="60" viewBox="0 0 120 60" width="120"><ellipse cx="60" cy="30" rx="60" ry="30"></ellipse></svg>
          </div>
          <div className="absolute top-40 left-[-10%] opacity-40 animate-drift" style={{ animationDelay: '-15s' }}>
            <svg fill="white" height="80" viewBox="0 0 180 80" width="180"><ellipse cx="90" cy="40" rx="90" ry="40"></ellipse></svg>
          </div>
          <div className="absolute top-24 left-[-10%] opacity-50 animate-drift" style={{ animationDelay: '-35s' }}>
            <svg fill="white" height="50" viewBox="0 0 100 50" width="100"><ellipse cx="50" cy="25" rx="50" ry="25"></ellipse></svg>
          </div>
        </div>

        {/* Car Movement Simulations */}
        <div className="car-sim" style={{ top: '55%', left: '40%', animationDelay: '0s' }}></div>
        <div className="car-sim" style={{ top: '58%', left: '45%', animationDelay: '4s', background: '#ef4444' }}></div>
        <div className="car-sim" style={{ top: '48%', left: '30%', animationDelay: '2s', background: '#3b82f6' }}></div>
      </div>
      {/* END: Animated Background */}

      {/* BEGIN: UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-8 px-6 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/30">
        
        {/* Top Right Actions */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-30">
          <button 
            onClick={onShowGuide}
            className="glass-panel size-12 rounded-full flex items-center justify-center text-slate-700 hover:text-primary-dark hover:bg-white transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-2xl">menu_book</span>
          </button>
          <button 
            onClick={onShowSettings}
            className="glass-panel size-12 rounded-full flex items-center justify-center text-slate-700 hover:text-primary-dark hover:bg-white transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
          <div className="glass-panel h-12 px-4 rounded-full flex items-center gap-2 border-primary/30">
            <div className="w-8 h-8 rounded-full border border-primary overflow-hidden shadow-sm bg-slate-100">
              <img src={playerAvatar} alt={playerName} className="w-full h-full object-cover object-top scale-[2.5] origin-top" referrerPolicy="no-referrer" />
            </div>
            <span className="text-xs font-black text-slate-800 tracking-wide uppercase">{playerName}</span>
          </div>
        </div>

        {/* BEGIN: Top Header */}
        <header className="flex flex-col items-center text-center animate-float mt-12 md:mt-4">
          {/* Game Logo */}
          <div className="mb-2">
            <img 
              alt="Metroville Logo" 
              className="h-64 md:h-[28rem] object-contain drop-shadow-[0_0_30px_rgba(19,236,91,0.4)]" 
              src="https://raw.githubusercontent.com/fardiansyahmusa-ai/agro-edugame-assets/afb38981765fad8d84db02ba9f85df6934a7f422/ChatGPT%20Image%20Mar%203%2C%202026%2C%2010_25_20%20AM.png"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Secondary Title/Subheader */}
          <h2 className="text-white text-lg md:text-xl font-black tracking-widest uppercase bg-primary-dark/80 px-8 py-2.5 rounded-full border-2 border-white/50 shadow-xl" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            Selamat Datang {playerName}
          </h2>
        </header>
        {/* END: Top Header */}

        {/* BEGIN: Main Menu Buttons */}
        <nav className="flex flex-col gap-4 w-full max-w-xs mb-8">
          <button 
            onClick={onStart}
            className="group relative w-full h-16 rounded-2xl bg-gradient-to-b from-primary to-primary-dark shadow-2xl border-4 border-white btn-hover-effect overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-2xl"></div>
            <div className="relative flex items-center justify-center gap-3 h-full">
              <span className="font-display text-2xl text-slate-900 font-black tracking-wide drop-shadow-sm uppercase">Mula Bermain</span>
            </div>
          </button>
          
          <button className="text-white/70 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors duration-200 mt-2">
            Kredit & Sumber
          </button>
        </nav>
        {/* END: Main Menu Buttons */}

        {/* BEGIN: Footer Info */}
        <footer className="w-full flex justify-between items-end text-white/80">
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-mono">
            v1.0.4-beta | server: global-01
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-tighter opacity-70">Simulated Economics Engine Active</p>
          </div>
        </footer>
        {/* END: Footer Info */}
      </div>
      {/* END: UI Overlay */}
    </main>
  );
};
