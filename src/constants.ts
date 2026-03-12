import { POICase, DialogueStep } from './types';

export const MAYOR_AVATAR_URL = "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/Datuk%20Bandar.png"; 
export const CFO_KAMAL_URL = "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/CFO%20Kamal.png";

export const STORY: DialogueStep[] = [
  { 
    speaker: "Sistem Pusat", 
    text: "AMARAN: DANA PERBENDAHARAAN BANDAR METROVILLE PADA TAHAP KRITIKAL. JALAN RAYA ROSAK. HOSPITAL KEKURANGAN BEKALAN.", 
    choices: [{ text: "Kenal pasti punca...", nextId: 1 }] 
  },
  { 
    speaker: "CFO Kamal", 
    text: "Selamat pagi, Datuk Bandar. Maafkan keadaan kelam-kabut ini. Bandar kita sedang lumpuh kerana kekurangan dana.", 
    choices: [{ text: "Ke mana hilangnya wang kita?", nextId: 2 }] 
  },
  { 
    speaker: "CFO Kamal", 
    text: "Rakyat kurang pendedahan tentang percukaian dan mengelak bayar cukai. Cukai adalah sumber kewangan utama kerajaan untuk mentadbir dan membangunkan negara.", 
    choices: [{ text: "Maksudnya... hasil cukai ini yang bina kemudahan awam?", nextId: 3 }] 
  },
  { 
    speaker: "CFO Kamal", 
    text: "Tepat sekali. Cukai juga meningkatkan kualiti hidup. Tanpanya, infrastruktur hancur.", 
    choices: [{ text: "Tugas saya perlu beri amaran dan kutip cukai mereka?", nextId: 4 }] 
  },
  { 
    speaker: "CFO Kamal", 
    text: "Ya. Mari mulakan tinjauan bandar. Anda perlu siasat jenis-jenis cukai dan kesan pengelakannya di atas peta.", 
    choices: [{ text: "Mula Tinjauan Bandar Raya", nextId: 99 }] 
  }
];

export const POI_DATA: POICase[] = [
  { 
    id: "roadtax",
    title: "Siasatan Cukai Jalan", 
    caseId: "#TX-2023-JPJ", 
    suspectName: "Pak Samad", 
    suspectRole: "Pemandu Teksi", 
    offense: "Cukai Jalan Tamat Tempoh", 
    offenseDetail: "Tidak Diperbaharui", 
    evidenceIcon: "directions_off", 
    evidenceText: "Kenderaan LKM Mati",
    evidenceImage: "https://images.unsplash.com/photo-1594051664234-2720be560383?q=80&w=800&auto=format&fit=crop", // Stylized car
    suspectImage: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/Pak%20Samad.png",
    dialogues: [
      { speaker: "Pak Samad", emoji: "😡", text: "Kenapa kereta saya ditahan Datuk Bandar?! Cukai jalan saya baru tamat tempoh sebulan." },
      { speaker: "Datuk Bandar", emoji: "👨‍💼", text: "Pak Samad, Cukai Jalan wajib dibayar kepada Jabatan Pengangkutan Jalan (JPJ) setiap tahun. Hasilnya untuk perlindungan dan penyelenggaraan jalan raya awam kita." },
      { speaker: "CFO Kamal", emoji: "👨‍💼", text: "Jika gagal, anda boleh didenda maksimum RM2,000 di bawah Akta Pengangkutan Jalan 1987. Sila beri kerjasama." }
    ]
  },
  { 
    id: "sst",
    title: "Siasatan Cukai SST", 
    caseId: "#TX-2023-KASTAM", 
    suspectName: "Puan Mei", 
    suspectRole: "Pemilik Kafe Selesa", 
    offense: "Tidak Mendaftar Cukai Perkhidmatan", 
    offenseDetail: "Aduan Pelanggan Tempatan", 
    evidenceIcon: "receipt_long", 
    evidenceText: "Resit Tidak Jelas",
    evidenceImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop", // Cozy cafe
    suspectImage: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/Puan%20Mei.png",
    dialogues: [
      { speaker: "Puan Mei", emoji: "😟", text: "Datuk Bandar, pelanggan merungut kenapa resit tiada caj cukai sedangkan saya ini perniagaan besar?" },
      { speaker: "Datuk Bandar", emoji: "👨‍💼", text: "Puan, Cukai Jualan dan Perkhidmatan (SST) pada kadar 6% patut dikutip oleh Jabatan Kastam Diraja Malaysia (JKDM) jika jualan melepasi nilai ambang RM 1,500,000." },
      { speaker: "CFO Kamal", emoji: "👨‍💼", text: "Syarikat yang culas atau gagal mendaftar boleh didenda sehingga RM50,000 atau penjara 3 tahun! Sila patuhi akta." }
    ]
  },
  { 
    id: "property",
    title: "Siasatan Cukai Pintu", 
    caseId: "#TX-2023-PBT", 
    suspectName: "Encik Ali", 
    suspectRole: "Pemilik Pangsapuri", 
    offense: "Tunggakan Cukai Pintu", 
    offenseDetail: "Tidak Dibayar Sejak Tahun Lepas", 
    evidenceIcon: "domain_disabled", 
    evidenceText: "Aduan PBT",
    evidenceImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", // Modern building
    suspectImage: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/En%20Ali.png",
    dialogues: [
      { speaker: "Encik Ali", emoji: "🤔", text: "Saya keliru, kenapa saya terima dua bil? Bukankah Cukai Pintu dan Cukai Tanah tu benda yang sama?" },
      { speaker: "Datuk Bandar", emoji: "👨‍💼", text: "Berbeza! Cukai Pintu (Taksiran) dikutip oleh Pihak Berkuasa Tempatan (PBT) untuk membiayai kos penyelenggaraan bandar seperti kutip sampah dan cuci longkang." },
      { speaker: "CFO Kamal", emoji: "👨‍💼", text: "Jika tunggakan gagal dijelaskan, Waran Tahanan boleh dikeluarkan dan harta mudah alih di dalam premis boleh disita!" }
    ]
  },
  { 
    id: "income",
    title: "Siasatan Cukai Pendapatan", 
    caseId: "#TX-2023-LHDN", 
    suspectName: "Encik Ravi", 
    suspectRole: "Jurutera Awam", 
    offense: "Gagal Lapor Cukai", 
    offenseDetail: "Gaji Besar Tiada BNCP", 
    evidenceIcon: "account_balance_wallet", 
    evidenceText: "LHDN Audit",
    evidenceImage: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800&auto=format&fit=crop", // Office desk
    suspectImage: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/En%20Ravi.png",
    dialogues: [
      { speaker: "Encik Ravi", emoji: "🤫", text: "Saya tak mahu isytihar pendapatan. Boleh jimat duit." },
      { speaker: "Datuk Bandar", emoji: "👨‍💼", text: "Tindakan itu salah di sisi undang-undang! Cukai Pendapatan Individu wajib dibayar kepada Lembaga Hasil Dalam Negeri (LHDN) untuk kemudahan seluruh negara." },
      { speaker: "CFO Kamal", emoji: "👨‍💼", text: "Elak cukai boleh didenda RM20,000 hingga RM100,000 atau penjara 3 tahun! Sila ke klinik cukai untuk kita taksirkan fail anda." }
    ]
  },
  { 
    id: "land",
    title: "Siasatan Cukai Tanah", 
    caseId: "#TX-2023-PTG", 
    suspectName: "Encik Abdullah", 
    suspectRole: "Pemilik Tanah Kosong", 
    offense: "Tunggakan Cukai Tanah", 
    offenseDetail: "Abaikan Notis Borang 6A", 
    evidenceIcon: "landscape", 
    evidenceText: "Tanah Terbiar",
    evidenceImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop", // Empty land
    suspectImage: "https://raw.githubusercontent.com/fardmusa09/Metroville-Game/1f085a32ef9d9932fb7fef4860d49bdc8e2965b2/En%20Abdullah.png",
    dialogues: [
      { speaker: "Encik Abdullah", emoji: "🙄", text: "Tanah saya kosong tak buat apa-apa, kenapa saya kena bayar cukai tanah pula?" },
      { speaker: "Datuk Bandar", emoji: "👨‍💼", text: "Semua pemilik tanah wajib membayar Cukai Tanah kepada Pejabat Tanah dan Galian negeri berdasarkan keluasan tanah." },
      { speaker: "CFO Kamal", emoji: "👨‍💼", text: "Jika masih gagal menjelaskan jumlah dituntut, tanah anda boleh dirampas atau dilucuthak di bawah Seksyen 100 Kanun Tanah Negara 1965!" }
    ]
  }
];
