export const syllabusData = {
  bahasa: {
    icon: '🗣️',
    title: 'Bahasa',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    subtitle: 'Progresif: Arab intensif → Inggris aktif → Trilingual sebagai alat kerja',
    tabs: [
      { label: '🟡 Kelas 10', key: 'k10' },
      { label: '🔵 Kelas 11', key: 'k11' },
      { label: '🔴 Kelas 12', key: 'k12' }
    ],
    content: {
      k10: {
        sections: [
          {
            title: 'FASE PERSIAPAN',
            items: [
              { t: 'Bahasa Arab Survival', d: 'Ungkapan dasar kehidupan santri, komunikasi sederhana dalam aktivitas harian.' },
              { t: 'Pembiasaan Ungkapan Dasar', d: 'Ungkapan kelas, interaksi harian, respons bahasa Arab yang benar.' },
              { t: 'Penguatan Shorof', d: 'Struktur & komponen kata, pola kata, perubahan bentuk kata.' }
            ]
          },
          {
            title: 'FASE PEMBENTUKAN — ABY',
            items: [
              { t: 'ABY Jilid 1', d: 'Membaca teks sederhana, percakapan dasar, kosakata 500+ kata.' },
              { t: 'ABY Jilid 2', d: 'Membaca cerita pendek, menulis paragraf sederhana, percakapan lanjutan.' },
              { t: 'ABY Jilid 3', d: 'Membaca artikel, menulis esai pendek, diskusi bahasa Arab.' }
            ]
          }
        ],
        output: ['Berani berbahasa Arab', 'Kosakata 1000+ kata', 'Bisa baca kitab sederhana']
      },
      k11: {
        sections: [
          {
            title: 'BAHASA INGGRIS INTENSIF (22 MINGGU)',
            items: [
              { t: 'Foundation (Pekan 1-4)', d: 'Grammar dasar, vocabulary building, reading comprehension dasar.' },
              { t: 'Intermediate (Pekan 5-12)', d: 'Academic writing, presentation skills, listening & speaking practice.' },
              { t: 'Advanced Practice (Pekan 13-20)', d: 'Essay writing, debate, public speaking, academic reading.' },
              { t: 'Assessment (Pekan 21-22)', d: 'Final project + presentasi dalam bahasa Inggris.' }
            ]
          }
        ],
        output: ['Bahasa Inggris aktif', 'Bisa presentasi dalam English', 'Global literacy terbentuk', 'Bahasa Arab tetap terjaga']
      },
      k12: {
        sections: [
          {
            title: 'TRILINGUAL SEBAGAI ALAT KERJA',
            items: [
              { t: 'Bahasa = Alat, Bukan Pelajaran', d: 'Tidak ada kelas bahasa baru. Arab, Inggris & Indonesia melebur 100% menjadi alat kerja.' },
              { t: 'Dokumentasi Proyek Trilingual', d: 'Marketplace Islami di-deploy dengan dokumentasi Trilingual (Arab + Inggris + Indonesia).' },
              { t: 'Kajian Kitab Langsung', d: 'HSI Akademik 239 Halaqah menggunakan bahasa Arab langsung dari sumber asli.' }
            ]
          }
        ],
        output: ['Trilingual operasional', 'Baca kitab tanpa terjemah', 'Dokumentasi teknis Trilingual', 'Siap lingkungan global']
      }
    }
  }
};


export const syllabusDataAgama = {
  diniyyah: {
    icon: '🕌',
    title: 'Diniyyah',
    color: '#a78bfa',
    bgColor: 'rgba(167, 139, 250, 0.15)',
    subtitle: 'Ilmu Agama Terpadu: Aqidah → Fiqh → Tahfidz → Hadits dalam satu ekosistem pembelajaran',
    tabs: [
      { label: '🟡 Kelas 10', key: 'k10' },
      { label: '🔵 Kelas 11', key: 'k11' },
      { label: '🔴 Kelas 12', key: 'k12' }
    ],
    content: {
      k10: {
        sections: [
          {
            title: 'AQIDAH & FIQH DASAR',
            items: [
              { t: 'Aqidah — Aqidah Islamiyyah', d: 'Marhalah 1-3: Ushul Aqidah, Tauhid & Syirik, Manhaj & Akhirat.' },
              { t: 'Fiqh — Fiqh Ibadah', d: 'Fiqh ibadah dasar: thaharah, shalat, puasa — metode hafalan & pemahaman langsung.' },
              { t: 'Sirah — Sirah Nabi ﷺ', d: 'Sirah Nabawiyah — perjalanan hidup Nabi Muhammad ﷺ dari kelahiran hingga wafat.' }
            ]
          },
          {
            title: 'TAHFIDZ & HADITS',
            items: [
              { t: 'Tahfidz Juz 28-30', d: 'Hafalan baru ±1 halaman per hari, muroja\'ah intensif, tahsin bersertifikasi.' },
              { t: 'Hadits Arba\'in 1-16', d: 'Fondasi Karakter & Moral: Niat, Islam-Iman-Ihsan, Rukun Islam, Takdir, Bid\'ah, Halal-Haram, Nasihat, Syahadat.' },
              { t: 'Imam Rawatib Bergilir', d: 'Latihan menjadi imam shalat rawatib — tanggung jawab spiritual harian.' }
            ]
          }
        ],
        output: ['Aqidah shahihah', 'Hafal 2-3 Juz', 'Hafal 16 Hadits', 'Fiqh ibadah dasar', 'Imam rawatib']
      },
      k11: {
        sections: [
          {
            title: 'HIFDZUL MUTUN & ILMU AGAMA LANJUTAN',
            items: [
              { t: 'Hifdzul Mutun — 4 Matan Dasar', d: 'Ushuluts Tsalatsah, Al-Qawaid Al-Arba, Nawaqidhul Islam, 6 Prinsip Pokok.' },
              { t: 'Setoran ke Masjid Nabawiy', d: 'Santri menyetorkan hafalan matan secara online — validasi eksternal dari Masjid Nabawiy.' },
              { t: 'Tahfidz Penambahan', d: 'Tambah +1-2 Juz baru (total 4-6 Juz), muroja\'ah intensif, peer teaching aktif.' },
              { t: 'Hadits Arba\'in 17-32', d: 'Zuhud & Tawakkal: Ihsan, Taqwa, Iman, Zuhud, Tawakkal, Sedekah, Damai, Kemungkaran.' }
            ]
          }
        ],
        output: ['Hafal 4 matan dasar', 'Hafal 4-6 Juz', 'Hafal 32 Hadits', 'Tersertifikasi Masjid Nabawiy', 'Peer teaching aktif']
      },
      k12: {
        sections: [
          {
            title: 'HSI AKADEMIK SEMESTER 1 (145 Halaqah)',
            items: [
              { t: 'Tafsir (40 Hlq)', d: 'Tafsir Juz 30 — memahami makna ayat-ayat pendek yang sering dibaca.' },
              { t: 'Fiqh 01 (40 Hlq)', d: 'Fiqh ibadah mendalam: Thaharah → Shalat → Jenazah → Zakat lengkap.' },
              { t: 'Aqidah 01 (40 Hlq)', d: 'Pendalaman aqidah: Kaidah Asma wa Sifat, bantahan syubhat modern.' },
              { t: 'Hadits (25 Hlq)', d: 'Ilmu Hadits: Musthalah Hadits dasar, klasifikasi hadits, perawi.' }
            ]
          },
          {
            title: 'HSI AKADEMIK SEMESTER 2 (94 Halaqah) + TAHFIDZ FINAL',
            items: [
              { t: 'Aqidah 02 (25 Hlq)', d: 'Lanjutan aqidah: Iman, Kufur, Wala wal Bara level lanjut.' },
              { t: 'Fiqh 02 (25 Hlq)', d: 'Fiqh muamalah: Jual-beli, Nikah, Haji, Umrah.' },
              { t: 'Tazkiyatun Nufus (24 Hlq)', d: 'Penyucian jiwa terprogram: taubat, khauf, raja, tawakkal, sabar.' },
              { t: 'Tahfidz Final + Imam Tarawih', d: 'Finalisasi 6-9 Juz Mutqin, setoran duduk komprehensif, tampil sebagai imam tarawih.' },
              { t: 'Hadits Arba\'in 33-50', d: 'Visi Akhirat: La dharar, Bayyinah, Amar Ma\'ruf, Wali Allah, Toleransi, Dunia Ladang Akhirat.' }
            ]
          }
        ],
        output: ['Khatam 239 Halaqah', '6-9 Juz Mutqin', '50 Hadits Setoran Duduk', 'Imam Tarawih', 'Faqih mandiri', 'Aqidah kuat anti-syubhat']
      }
    }
  }
};

export const syllabusDataIT = {
  it: {
    icon: '💻',
    title: 'IT (Rekayasa Digital)',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    subtitle: 'Build Real Things: Portfolio → Dashboard → Marketplace Islami berlevel industri',
    tabs: [
      { label: '🟡 Kelas 10', key: 'k10' },
      { label: '🔵 Kelas 11', key: 'k11' },
      { label: '🔴 Kelas 12', key: 'k12' }
    ],
    content: {
      k10: {
        sections: [
          {
            title: 'SEMESTER 1 — Fundamental Programming & Web',
            items: [
              { t: 'Fase 1: Logic & Problem Solving', d: 'Flowchart, if-else, looping, function, array — CLI dengan Golang.' },
              { t: 'Fase 2: Algorithm Foundation', d: 'Linear Search, Bubble Sort, Selection Sort, konsep kompleksitas.' },
              { t: 'Fase 3: Web Fundamental', d: 'HTML, CSS, Flexbox, Grid, Responsive Design, Tailwind intro.' },
              { t: '🚀 Project: Website Portfolio Statis', d: 'Profil diri + visi hidup + daftar karya + kontak.' }
            ]
          }
        ],
        output: ['Website Portfolio Fullstack', 'Paham REST API & CRUD', 'Mental engineer terbentuk', 'Terbiasa debugging']
      },
      k11: {
        sections: [
          {
            title: 'SEMESTER 1 — React.js & Frontend Modern',
            items: [
              { t: 'React.js Fundamentals', d: 'Component, props, state, hooks, routing (React Router).' },
              { t: 'State Management (Redux)', d: 'Store, actions, reducers, middleware, async thunk.' },
              { t: '🚀 Project: Website Sekolah Dinamis', d: 'Landing page + berita + galeri + kontak — built with React.js.' }
            ]
          }
        ],
        output: ['Dashboard Admin RBAC', 'React.js + Redux mastery', 'Go Fiber backend', 'Sistem multi-role']
      },
      k12: {
        sections: [
          {
            title: 'SEMESTER 1 — Marketplace Front-End',
            items: [
              { t: 'Next.js (SSR/SSG)', d: 'App Router, Server Components, API Routes, SEO optimization.' },
              { t: 'Payment Gateway Integration', d: 'Midtrans/Xendit, transaction flow, webhook handling.' },
              { t: '🚀 Project: Marketplace Islami (Buyer Side)', d: 'Katalog produk + keranjang + checkout + pembayaran.' }
            ]
          }
        ],
        output: ['Marketplace Islami Live', 'Next.js + Go Fiber mastery', 'Payment gateway integrated', 'Siap magang/kerja']
      }
    }
  }
};

export const syllabusDataAgile = {
  agile: {
    icon: '🧠',
    title: 'Agile Mindset',
    color: '#fb7185',
    bgColor: 'rgba(251, 113, 133, 0.15)',
    subtitle: 'Berjenjang: Anti-Fragile → Resilience → Leadership & Career Mentorship',
    tabs: [
      { label: '🟡 Kelas 10', key: 'k10' },
      { label: '🔵 Kelas 11', key: 'k11' },
      { label: '🔴 Kelas 12', key: 'k12' }
    ],
    content: {
      k10: {
        sections: [
          {
            title: 'SEMESTER 1 — Memahami Agile & Mengelola Pola Pikir',
            items: [
              { t: 'Chapter 1: About Agile', d: 'Why Agile, What is Agile, Agile Mindset, Being & Doing.' },
              { t: 'Chapter 2: Anti-Fragile', d: 'Paradox of Happiness, Fake Happiness, Fragile & Robust, Anti-Fragile.' },
              { t: 'Chapter 3: Developing Mindset', d: 'ANTs (Automatic Negative Thoughts), Killing ANTs.' }
            ]
          }
        ],
        output: ['Anti-Fragile mindset', 'Personal Goal tertulis', 'Mampu killing ANTs', 'Pola pikir bertumbuh']
      },
      k11: {
        sections: [
          {
            title: 'SEMESTER 1 — Resilience & Emotional Intelligence',
            items: [
              { t: 'Resilience Framework', d: 'Bounce back dari kegagalan, growth through adversity.' },
              { t: 'Emotional Intelligence', d: 'Self-awareness, self-regulation, empathy, social skills.' },
              { t: 'Zuhud & Detachment', d: 'Tidak terikat dunia, fokus akhirat tanpa meninggalkan dunia.' }
            ]
          }
        ],
        output: ['Resilient & adaptif', 'EQ tinggi', 'Mampu kelola konflik', 'Team player']
      },
      k12: {
        sections: [
          {
            title: 'SEMESTER 1 — Leadership & Design Thinking',
            items: [
              { t: 'Servant Leadership', d: 'Memimpin dengan melayani, bukan memerintah.' },
              { t: 'Design Thinking', d: 'Empathize → Define → Ideate → Prototype → Test.' },
              { t: 'Conflict Resolution Advanced', d: 'Mediator, win-win negotiation, stakeholder management.' }
            ]
          }
        ],
        output: ['Servant leader', 'Career roadmap jelas', 'Personal brand kuat', 'Siap hidup mandiri']
      }
    }
  }
};

// Merge all data
export const allSyllabusData = {
  ...syllabusData,
  ...syllabusDataAgama,
  ...syllabusDataIT,
  ...syllabusDataAgile
};


