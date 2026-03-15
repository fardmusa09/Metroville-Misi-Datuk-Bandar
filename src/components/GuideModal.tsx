import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaxBracket {
  range: string;
  calculation: React.ReactNode;
  rate: string;
  tax: string;
  logic: string;
}

interface TaxType {
  name: string;
  agency: string;
  description: string;
  icon: string;
  formula: string;
  example: string;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'jenis' | 'kadar'>('jenis');

  const taxTypes: TaxType[] = [
    {
      name: "Cukai Jalan",
      agency: "Jabatan Pengangkutan Jalan (JPJ)",
      description: "Wajib dibayar setiap tahun untuk kenderaan bermotor. Hasil kutipan digunakan untuk perlindungan dan penyelenggaraan jalan raya awam.",
      icon: "directions_car",
      formula: "Kadar Asas + Kadar Progresif (berdasarkan kapasiti enjin cc)",
      example: "Kereta 1600cc di Semenanjung Malaysia = RM 90 setahun."
    },
    {
      name: "Cukai Jualan dan Perkhidmatan (SST)",
      agency: "Jabatan Kastam Diraja Malaysia (JKDM)",
      description: "Dikenakan pada kadar tertentu (cth: 6%) ke atas perkhidmatan bercukai. Wajib didaftar jika nilai jualan melepasi nilai ambang (cth: RM 1,500,000).",
      icon: "receipt_long",
      formula: "Nilai Perkhidmatan / Barangan × Kadar SST (6%, 8%, atau 10%)",
      example: "Bil makan di restoran RM 100 × 6% = RM 6 Cukai Perkhidmatan."
    },
    {
      name: "Cukai Pintu (Taksiran)",
      agency: "Pihak Berkuasa Tempatan (PBT)",
      description: "Dikutip oleh majlis perbandaran untuk membiayai kos penyelenggaraan bandar seperti kutipan sampah, lampu jalan, dan pembersihan longkang.",
      icon: "domain",
      formula: "Anggaran Sewa Tahunan × Kadar Peratusan PBT",
      example: "Sewa tahunan RM 12,000 × 4% = RM 480 setahun."
    },
    {
      name: "Cukai Pendapatan Individu",
      agency: "Lembaga Hasil Dalam Negeri (LHDN)",
      description: "Dikenakan ke atas individu yang mempunyai pendapatan penggajian atau perniagaan yang layak dicukai. Digunakan untuk pembangunan dan kemudahan negara.",
      icon: "account_balance_wallet",
      formula: "Pendapatan Bercukai × Kadar Banjaran (0% - 30%)",
      example: "Sila rujuk tab 'Kadar Pendapatan' untuk jadual pengiraan lengkap."
    },
    {
      name: "Cukai Tanah",
      agency: "Pejabat Tanah dan Galian Negeri",
      description: "Cukai tahunan yang wajib dibayar oleh semua pemilik tanah berdaftar berdasarkan keluasan dan jenis kegunaan tanah tersebut.",
      icon: "landscape",
      formula: "Keluasan Tanah × Kadar Cukai (mengikut jenis kegunaan & lokasi)",
      example: "Tanah kediaman 1,500 kaki persegi × RM 0.04 = RM 60 setahun."
    }
  ];

  const taxBrackets: TaxBracket[] = [
    {
      range: "0 - 5,000",
      calculation: "5,000 pertama",
      rate: "0",
      tax: "0",
      logic: "Pendapatan di bawah RM 5,000 tidak dikenakan sebarang cukai pendapatan."
    },
    {
      range: "5,001 - 20,000",
      calculation: <div className="flex flex-col"><span>5,000 pertama</span><span>15,000 berikutnya</span></div>,
      rate: "1",
      tax: "150",
      logic: "Cukai dikira 1% ke atas baki selepas RM 5,000 pertama. Maksimum cukai bagi banjaran ini ialah RM 150."
    },
    {
      range: "20,001 - 35,000",
      calculation: <div className="flex flex-col"><span>20,000 pertama</span><span>15,000 berikutnya</span></div>,
      rate: "3",
      tax: "450",
      logic: "Cukai RM 150 bagi RM 20,000 pertama, ditambah 3% ke atas baki sehingga RM 35,000."
    },
    {
      range: "35,001 - 50,000",
      calculation: <div className="flex flex-col"><span>35,000 pertama</span><span>15,000 berikutnya</span></div>,
      rate: "8",
      tax: "1,200",
      logic: "Cukai RM 600 bagi RM 35,000 pertama, ditambah 8% ke atas baki sehingga RM 50,000."
    },
    {
      range: "50,001 - 70,000",
      calculation: <div className="flex flex-col"><span>50,000 pertama</span><span>20,000 berikutnya</span></div>,
      rate: "14",
      tax: "2,800",
      logic: "Cukai RM 1,800 bagi RM 50,000 pertama, ditambah 14% ke atas baki sehingga RM 70,000."
    },
    {
      range: "70,001 - 100,000",
      calculation: <div className="flex flex-col"><span>70,000 pertama</span><span>30,000 berikutnya</span></div>,
      rate: "21",
      tax: "6,300",
      logic: "Cukai RM 4,600 bagi RM 70,000 pertama, ditambah 21% ke atas baki sehingga RM 100,000."
    },
    {
      range: "100,001 - 250,000",
      calculation: <div className="flex flex-col"><span>100,000 pertama</span><span>150,000 berikutnya</span></div>,
      rate: "24",
      tax: "36,000",
      logic: "Cukai RM 10,900 bagi RM 100,000 pertama, ditambah 24% ke atas baki sehingga RM 250,000."
    },
    {
      range: "250,001 - 400,000",
      calculation: <div className="flex flex-col"><span>250,000 pertama</span><span>150,000 berikutnya</span></div>,
      rate: "24.5",
      tax: "36,750",
      logic: "Cukai RM 46,900 bagi RM 250,000 pertama, ditambah 24.5% ke atas baki sehingga RM 400,000."
    },
    {
      range: "400,001 - 600,000",
      calculation: <div className="flex flex-col"><span>400,000 pertama</span><span>200,000 berikutnya</span></div>,
      rate: "25",
      tax: "50,000",
      logic: "Cukai RM 83,650 bagi RM 400,000 pertama, ditambah 25% ke atas baki sehingga RM 600,000."
    },
    {
      range: "600,001 - 1,000,000",
      calculation: <div className="flex flex-col"><span>600,000 pertama</span><span>400,000 berikutnya</span></div>,
      rate: "26",
      tax: "104,000",
      logic: "Cukai RM 133,650 bagi RM 600,000 pertama, ditambah 26% ke atas baki sehingga RM 1,000,000."
    },
    {
      range: "1,000,001 - 2,000,000",
      calculation: <div className="flex flex-col"><span>1,000,000 pertama</span><span>1,000,000 berikutnya</span></div>,
      rate: "28",
      tax: "280,000",
      logic: "Cukai RM 237,650 bagi RM 1,000,000 pertama, ditambah 28% ke atas baki sehingga RM 2,000,000."
    },
    {
      range: "Melebihi 2,000,000",
      calculation: <div className="flex flex-col"><span>2,000,000 pertama</span><span>Setiap ringgit berikutnya</span></div>,
      rate: "30",
      tax: "...",
      logic: "Cukai RM 517,650 bagi RM 2,000,000 pertama, ditambah 30% ke atas baki melebihi RM 2,000,000."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0" 
            onClick={onClose} 
            style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(20, 40, 20, 0.3)' }}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-3xl overflow-hidden flex flex-col border-2 border-white z-10 shadow-2xl"
          >
            <header className="flex flex-col px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-emerald-50/50">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="size-8 sm:size-10 flex items-center justify-center bg-primary rounded-lg sm:rounded-xl text-white shadow-md shadow-primary/30 shrink-0">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">menu_book</span>
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">Panduan Cukai Hero</h1>
                    <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">Rujukan Rasmi Datuk Bandar</p>
                  </div>
                </div>
                <button onClick={onClose} className="size-8 sm:size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white transition-all active:scale-95 shrink-0">
                  <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-1.5 sm:gap-2 bg-slate-200/50 p-1 rounded-lg sm:rounded-xl w-full max-w-md mx-auto sm:mx-0">
                <button 
                  onClick={() => setActiveTab('jenis')}
                  className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'jenis' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Jenis-jenis Cukai
                </button>
                <button 
                  onClick={() => setActiveTab('kadar')}
                  className={`flex-1 py-2 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'kadar' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Kadar Pendapatan
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30">
              {activeTab === 'jenis' && (
                <div className="space-y-4 animate-fade-in-up">
                  {taxTypes.map((tax, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-start hover:border-primary/50 transition-colors">
                      <div className="flex gap-4 w-full md:w-1/2">
                        <div className="size-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                          <span className="material-symbols-outlined text-3xl text-emerald-500">{tax.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-800 mb-1">{tax.name}</h3>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">account_balance</span>
                            Agensi: {tax.agency}
                          </p>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">{tax.description}</p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-primary">calculate</span>
                          Kadar & Pengiraan
                        </h4>
                        <p className="text-sm text-slate-600 font-bold mb-1">{tax.formula}</p>
                        <p className="text-xs text-slate-500 italic">Contoh: {tax.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'kadar' && (
                <div className="animate-fade-in-up">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 text-slate-600 text-xs font-black uppercase tracking-widest border-b border-slate-200">
                          <th className="px-4 py-4">Banjaran Pendapatan Bercukai (RM)</th>
                          <th className="px-4 py-4">Pengiraan (RM)</th>
                          <th className="px-4 py-4 text-center">Kadar (%)</th>
                          <th className="px-4 py-4 text-right">Cukai (RM)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {taxBrackets.map((bracket, index) => (
                          <React.Fragment key={index}>
                            <tr 
                              onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                              className={`hover:bg-primary/5 transition-colors cursor-pointer group ${selectedRow === index ? 'bg-primary/10' : ''}`}
                            >
                              <td className="px-4 py-4 font-bold text-slate-700 text-sm">{bracket.range}</td>
                              <td className="px-4 py-4 text-slate-600 text-xs leading-relaxed">{bracket.calculation}</td>
                              <td className="px-4 py-4 text-center">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black ${Number(bracket.rate) > 20 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                  {bracket.rate}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-right font-black text-slate-800 text-sm">{bracket.tax}</td>
                            </tr>
                            {selectedRow === index && (
                              <tr className="bg-primary/5">
                                <td colSpan={4} className="px-4 py-3">
                                  <div className="flex items-start gap-2 text-xs font-bold text-slate-700 animate-fade-in-up">
                                    <span className="material-symbols-outlined text-primary text-sm">info</span>
                                    <p>{bracket.logic}</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <h3 className="text-blue-700 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">lightbulb</span>
                        Tips Pengiraan
                      </h3>
                      <p className="text-[11px] text-blue-600 leading-relaxed font-bold">
                        Cukai dikira secara berperingkat. Anda hanya membayar kadar yang lebih tinggi untuk jumlah yang melebihi banjaran sebelumnya.
                      </p>
                    </div>
                    <div className="flex-1 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                      <h3 className="text-amber-700 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        Nota Penting
                      </h3>
                      <p className="text-[11px] text-amber-600 leading-relaxed font-bold">
                        * Tertakluk kepada perubahan dari semasa ke semasa. (Sumber: Portal Rasmi Lembaga Hasil Dalam Negeri Malaysia)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
              <button 
                onClick={onClose}
                className="px-8 py-2.5 bg-primary text-white font-black text-sm rounded-xl shadow-md shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 border-b-4 border-primary-dark"
              >
                FAHAM & TUTUP
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
