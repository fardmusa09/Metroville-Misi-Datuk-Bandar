import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phase } from './types';
import { audioService } from './services/audioService';
import { PhaseIntro } from './components/PhaseIntro';
import { PhaseRegistration } from './components/PhaseRegistration';
import { PhaseMenu } from './components/PhaseMenu';
import { PhaseDialogue } from './components/PhaseDialogue';
import { PhaseMap } from './components/PhaseMap';
import { PhaseFormula } from './components/PhaseFormula';
import { PhaseTaxMatch } from './components/PhaseTaxMatch';
import { PhaseClinic } from './components/PhaseClinic';
import { PhaseBoss } from './components/PhaseBoss';
import { PhaseVictory } from './components/PhaseVictory';
import { SettingsModal } from './components/SettingsModal';
import { GuideModal } from './components/GuideModal';
import { MAYOR_AVATAR_URL } from './constants';

export default function App() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [fundLevel, setFundLevel] = useState(10);
  const [score, setScore] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [playerName, setPlayerName] = useState('Datuk Bandar');
  const [playerAvatar, setPlayerAvatar] = useState(MAYOR_AVATAR_URL);

  const handleShowSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleShowGuide = () => setIsGuideOpen(true);
  const handleCloseGuide = () => setIsGuideOpen(false);
  const handleRestartGame = () => {
    setFundLevel(10);
    setScore(0);
    setPhase('menu');
  };

  const handleRegistrationComplete = (name: string, avatar: string) => {
    const formattedName = name.toLowerCase().startsWith('datuk bandar') 
      ? name 
      : `Datuk Bandar ${name}`;
    setPlayerName(formattedName);
    setPlayerAvatar(avatar);
    setPhase('menu');
  };

  const updateFund = (amount: number) => {
    setFundLevel(prev => {
      const next = prev + amount;
      if (next < 0) return 0;
      return next > 100 ? 100 : next;
    });
  };

  const updateScore = (points: number) => {
    setScore(prev => {
      const next = prev + points;
      return next < 0 ? 0 : next;
    });
  };

  useEffect(() => {
    // Add Material Symbols link to head
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const phaseVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background-light">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div 
            key="intro"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseIntro onComplete={() => setPhase('registration')} />
          </motion.div>
        )}

        {phase === 'registration' && (
          <motion.div 
            key="registration"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseRegistration 
              onComplete={handleRegistrationComplete} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'menu' && (
          <motion.div 
            key="menu"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseMenu 
              playerName={playerName}
              playerAvatar={playerAvatar}
              onStart={() => setPhase('dialogue')} 
              onShowGuide={handleShowGuide} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'dialogue' && (
          <motion.div 
            key="dialogue"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseDialogue 
              playerName={playerName}
              playerAvatar={playerAvatar}
              onComplete={() => setPhase('map')} 
            />
          </motion.div>
        )}
        
        {phase === 'map' && (
          <motion.div 
            key="map"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseMap 
              fundLevel={fundLevel} 
              score={score}
              playerName={playerName}
              playerAvatar={playerAvatar}
              onUpdateFund={updateFund}
              onUpdateScore={updateScore}
              onComplete={() => setPhase('taxMatch')} 
              onShowGuide={handleShowGuide} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'taxMatch' && (
          <motion.div 
            key="taxMatch"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseTaxMatch 
              fundLevel={fundLevel}
              score={score}
              playerName={playerName}
              playerAvatar={playerAvatar}
              onUpdateFund={updateFund}
              onUpdateScore={updateScore}
              onComplete={() => setPhase('formula')} 
              onShowGuide={handleShowGuide} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'formula' && (
          <motion.div 
            key="formula"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseFormula 
              fundLevel={fundLevel} 
              score={score}
              playerName={playerName}
              playerAvatar={playerAvatar}
              onUpdateFund={updateFund}
              onUpdateScore={updateScore}
              onComplete={() => setPhase('clinic')} 
              onShowGuide={handleShowGuide} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'clinic' && (
          <motion.div 
            key="clinic"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseClinic 
              fundLevel={fundLevel} 
              score={score}
              playerName={playerName}
              playerAvatar={playerAvatar}
              onUpdateFund={updateFund}
              onUpdateScore={updateScore}
              onComplete={() => setPhase('boss')} 
              onShowGuide={handleShowGuide} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'boss' && (
          <motion.div 
            key="boss"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseBoss 
              playerName={playerName}
              playerAvatar={playerAvatar}
              onComplete={() => setPhase('victory')} 
              onShowSettings={handleShowSettings}
            />
          </motion.div>
        )}
        
        {phase === 'victory' && (
          <motion.div 
            key="victory"
            variants={phaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="h-full w-full"
          >
            <PhaseVictory 
              playerName={playerName}
              playerAvatar={playerAvatar}
              fundLevel={fundLevel}
              score={score}
              onRestart={() => {
                setFundLevel(10);
                setScore(0);
                setPhase('menu');
              }} 
              onMenu={() => setPhase('menu')} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={handleCloseSettings} 
        onRestart={handleRestartGame} 
      />

      <GuideModal 
        isOpen={isGuideOpen} 
        onClose={handleCloseGuide} 
      />
    </div>
  );
}
