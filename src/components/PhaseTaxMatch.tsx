import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { audioService } from '../services/audioService';
import { GameHeader } from './GameHeader';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircle2, AlertCircle, ArrowRight, GripVertical } from 'lucide-react';
import { MAYOR_AVATAR_URL, CFO_KAMAL_URL } from '../constants';

const TAX_TYPES = [
  { id: 't1', name: 'Cukai Pendapatan' },
  { id: 't2', name: 'Cukai Jalan' },
  { id: 't3', name: 'Cukai Pintu' },
  { id: 't4', name: 'Cukai Tanah' },
  { id: 't5', name: 'Cukai Jualan & Perkhidmatan' },
];

const INITIAL_AGENCIES = [
  { id: 'a1', name: 'LHDN', matchId: 't1' },
  { id: 'a2', name: 'JPJ', matchId: 't2' },
  { id: 'a3', name: 'Pihak Berkuasa Tempatan', matchId: 't3' },
  { id: 'a4', name: 'Pejabat Tanah & Galian', matchId: 't4' },
  { id: 'a5', name: 'Jabatan Kastam Diraja', matchId: 't5' },
];

const INITIAL_CONSEQUENCES = [
  { id: 'c1', name: 'Denda 10% & Sekatan Perjalanan', matchId: 't1' },
  { id: 'c2', name: 'Saman & Kenderaan Disita', matchId: 't2' },
  { id: 'c3', name: 'Waran Tahanan & Sitaan Harta', matchId: 't3' },
  { id: 'c4', name: 'Tanah Dirampas Kerajaan Negeri', matchId: 't4' },
  { id: 'c5', name: 'Denda & Penjara', matchId: 't5' },
];

// Shuffle function
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface SortableItemProps {
  id: string;
  name: string;
  isCorrect?: boolean;
  showResult?: boolean;
}

function SortableItem({ id, name, isCorrect, showResult }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  let bgColor = 'bg-linear-to-br from-white to-slate-50/50';
  let borderColor = 'border-slate-200';
  let textColor = 'text-slate-800';
  
  if (showResult) {
    if (isCorrect) {
      bgColor = 'bg-linear-to-br from-emerald-50 to-emerald-100/50';
      borderColor = 'border-emerald-400';
      textColor = 'text-emerald-900';
    } else {
      bgColor = 'bg-linear-to-br from-red-50 to-red-100/50';
      borderColor = 'border-red-400';
      textColor = 'text-red-900';
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center p-2 md:p-3 rounded-xl border-2 ${borderColor} ${bgColor} ${isDragging ? 'shadow-lg opacity-90 scale-105 ring-2 ring-primary/20' : 'shadow-sm'} transition-all h-full hover:border-primary/40 group`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="mr-1 md:mr-2 cursor-grab active:cursor-grabbing text-slate-400 group-hover:text-primary transition-colors p-1 shrink-0"
      >
        <GripVertical size={16} className="md:w-[18px] md:h-[18px]" />
      </div>
      <span className={`text-[10px] md:text-sm font-bold ${textColor} flex-1 leading-tight`}>{name}</span>
      
      {showResult && (
        <div className="absolute right-1 md:right-2">
          {isCorrect ? (
            <CheckCircle2 size={16} className="text-emerald-500 md:w-[18px] md:h-[18px]" />
          ) : (
            <AlertCircle size={16} className="text-red-500 md:w-[18px] md:h-[18px]" />
          )}
        </div>
      )}
    </div>
  );
}

interface PhaseTaxMatchProps {
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

export function PhaseTaxMatch({ 
  fundLevel, 
  score,
  playerName, 
  playerAvatar, 
  onUpdateFund,
  onUpdateScore,
  onComplete, 
  onShowGuide, 
  onShowSettings 
}: PhaseTaxMatchProps) {
  const [taxTypes, setTaxTypes] = useState(TAX_TYPES);
  const [agencies, setAgencies] = useState(INITIAL_AGENCIES);
  const [consequences, setConsequences] = useState(INITIAL_CONSEQUENCES);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  useEffect(() => {
    // Shuffle on mount
    setTaxTypes(shuffleArray(TAX_TYPES));
    setAgencies(shuffleArray(INITIAL_AGENCIES));
    setConsequences(shuffleArray(INITIAL_CONSEQUENCES));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndTaxTypes = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTaxTypes((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndAgencies = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAgencies((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndConsequences = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setConsequences((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkAnswers = () => {
    let correct = true;
    for (let i = 0; i < taxTypes.length; i++) {
      if (agencies[i].matchId !== taxTypes[i].id || consequences[i].matchId !== taxTypes[i].id) {
        correct = false;
        break;
      }
    }
    if (correct) {
      audioService.playSuccess();
      onUpdateFund(5); // RM 2,500
      onUpdateScore(500);
    } else {
      onUpdateScore(-50);
    }
    setIsAllCorrect(correct);
    setIsSubmitted(true);
  };

  const resetGame = () => {
    setIsSubmitted(false);
    setIsAllCorrect(false);
    setTaxTypes(shuffleArray(TAX_TYPES));
    setAgencies(shuffleArray(INITIAL_AGENCIES));
    setConsequences(shuffleArray(INITIAL_CONSEQUENCES));
  };

  const formattedFund = ((fundLevel / 100) * 50000).toLocaleString();

  return (
    <div className="h-screen w-screen font-display bg-background-light text-slate-900 isometric-bg flex flex-col overflow-hidden relative">
      <GameHeader 
        fundLevel={fundLevel}
        score={score}
        playerAvatar={playerAvatar}
        title="Meja Kerja Taksiran"
        onShowSettings={onShowSettings}
        onShowGuide={onShowGuide}
      />

      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden p-4 md:p-6 gap-4 md:gap-6 min-h-0">
        <aside className="w-full lg:w-80 flex flex-col gap-6 justify-start shrink-0">
          <div className="glass-panel rounded-2xl p-5 md:p-6 shadow-xl border-l-4 border-l-primary flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="size-12 md:size-14 rounded-full bg-emerald-100 border-2 border-white overflow-hidden shadow-inner shrink-0">
                <img alt="CFO Kamal" className="w-full h-full character-portrait" src={CFO_KAMAL_URL}/>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">CFO Kamal</h3>
                <span className="text-[9px] md:text-[10px] bg-primary/20 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Advisor</span>
              </div>
            </div>
            <div className="relative bg-white/60 rounded-xl p-3 md:p-4 italic text-xs md:text-sm text-slate-700 leading-relaxed border border-white/80 font-medium">
              "Sebelum masuk ke Pengiraan Cukai, mari uji pengetahuan anda! Tarik dan susun kotak di lajur <span className="font-bold text-primary-dark">Badan Pungutan</span> dan <span className="font-bold text-primary-dark">Tindakan</span> supaya sepadan dengan Jenis Cukai."
              <div className="absolute -top-2 left-6 w-4 h-4 bg-white/60 rotate-45 border-l border-t border-white/80"></div>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-4 md:gap-6 overflow-y-auto custom-scrollbar pr-1 md:pr-2 pb-6">
          <div className="glass-panel rounded-3xl p-5 md:p-8 shadow-xl flex flex-col relative overflow-hidden shrink-0">
            <div className="w-full mb-6">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Padankan Maklumat Cukai</h2>
              <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-primary/10 rounded-xl border border-primary/20 max-w-fit mt-3">
                <span className="material-symbols-outlined text-primary text-lg">extension</span>
                <p className="text-[10px] md:text-[11px] font-bold text-emerald-800 leading-snug">Petunjuk: Pastikan agensi dan tindakan sepadan dengan jenis cukai.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-6 overflow-x-auto pb-4">
              {/* Column 1: Jenis Cukai (Sortable) */}
              <div className="flex flex-col min-w-[100px]">
                <div className="bg-slate-800 text-white font-bold p-2 md:p-3 rounded-t-xl text-center mb-2 text-xs md:text-base shadow-sm">
                  Jenis Cukai
                </div>
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndTaxTypes}
                >
                  <SortableContext 
                    items={taxTypes.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col">
                      {taxTypes.map((tax, index) => (
                        <div key={tax.id} className="h-[80px] md:h-[72px] mb-2">
                          <SortableItem 
                            id={tax.id} 
                            name={tax.name} 
                            showResult={isSubmitted}
                            isCorrect={agencies[index].matchId === tax.id && consequences[index].matchId === tax.id}
                          />
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              {/* Column 2: Badan Pungutan (Sortable) */}
              <div className="flex flex-col min-w-[120px]">
                <div className="bg-blue-600 text-white font-bold p-2 md:p-3 rounded-t-xl text-center mb-2 text-xs md:text-base shadow-sm">
                  Badan Pungutan
                </div>
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndAgencies}
                >
                  <SortableContext 
                    items={agencies.map(a => a.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col">
                      {agencies.map((agency, index) => (
                        <div key={agency.id} className="h-[80px] md:h-[72px] mb-2">
                          <SortableItem 
                            id={agency.id} 
                            name={agency.name} 
                            showResult={isSubmitted}
                            isCorrect={agency.matchId === taxTypes[index].id}
                          />
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              {/* Column 3: Tindakan (Sortable) */}
              <div className="flex flex-col min-w-[120px]">
                <div className="bg-red-600 text-white font-bold p-2 md:p-3 rounded-t-xl text-center mb-2 text-xs md:text-base shadow-sm">
                  Tindakan Jika Gagal
                </div>
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndConsequences}
                >
                  <SortableContext 
                    items={consequences.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col">
                      {consequences.map((cons, index) => (
                        <div key={cons.id} className="h-[80px] md:h-[72px] mb-2">
                          <SortableItem 
                            id={cons.id} 
                            name={cons.name} 
                            showResult={isSubmitted}
                            isCorrect={cons.matchId === taxTypes[index].id}
                          />
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-5 md:p-8 shadow-xl shrink-0 flex flex-col items-center justify-center">
            {!isSubmitted ? (
              <button
                onClick={checkAnswers}
                className="px-8 py-4 bg-primary text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-lg"
              >
                Semak Jawapan
                <CheckCircle2 size={24} />
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 w-full max-w-md"
              >
                {isAllCorrect ? (
                  <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 p-6 rounded-2xl text-center w-full shadow-lg">
                    <div className="flex justify-center mb-2">
                      <div className="bg-emerald-500 text-white p-3 rounded-full">
                        <CheckCircle2 size={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-1">Tahniah!</h3>
                    <p className="font-medium">Anda telah berjaya memadankan semua maklumat cukai dengan betul.</p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-2 border-red-500 text-red-800 p-6 rounded-2xl text-center w-full shadow-lg">
                    <div className="flex justify-center mb-2">
                      <div className="bg-red-500 text-white p-3 rounded-full">
                        <AlertCircle size={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-1">Ada Kesilapan</h3>
                    <p className="font-medium">Beberapa padanan masih salah. Sila cuba lagi!</p>
                  </div>
                )}

                <div className="flex gap-4 w-full mt-2">
                  {!isAllCorrect && (
                    <button
                      onClick={resetGame}
                      className="flex-1 py-3 bg-white border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Cuba Lagi
                    </button>
                  )}
                  
                  {isAllCorrect && (
                    <button
                      onClick={onComplete}
                      className="flex-1 py-4 bg-primary text-slate-900 font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
                    >
                      Teruskan ke Formula Cukai
                      <ArrowRight size={24} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
