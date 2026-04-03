export const timelineData = [
  {
    year: 10,
    badge: '🟡 Kelas 10',
    phase: 'Fase Akuisisi Fundamental',
    description: 'Prioritas utama adalah penguasaan perangkat dasar (Bahasa Inggris dan Logika Coding). Santri belum dituntut membuat maha karya kompleks, melainkan membangun kebiasaan. Segala hal yang menjadi "alat utama" untuk kelas berikutnya secara intens diakuisisi (di-instal) di sini dari tahap paling dasar.',
    semesters: [
      {
        sem: 1,
        title: 'Bahasa Inggris Intensif + Mulazamah Aqidah & Fiqh',
        items: [
          { emoji: '📖', text: 'Tahajji (Qaidah Samiriyyah) — 2 Pekan Awal' },
          { emoji: '🗣️', text: 'Bahasa Inggris Intensif (13 Minggu Block Time Siang)' },
          { emoji: '📿', text: 'Tahfidz — Hafalan Baru Subuh (±1 jam) + Muroja\'ah Maghrib (±45 mnt)' },
          { emoji: '🕌', text: 'Aqidah (Mulazamah Intensif)' },
          { emoji: '⚖️', text: 'Fiqh (Mulazamah)' },
          { emoji: '📜', text: 'Hadits Arba\'in 1-8' },
          { emoji: '💻', text: 'IT Dasar (HTML, CSS, JS — Malam ±2 Jam/Hari)' },
          { emoji: '📱', text: 'HSI Reguler — 5-10 Mnt/Hari via Laptop/HP (Diniyyah, sela waktu IT)' },
          { emoji: '🧠', text: 'Agile Mindset Level 1' }
        ],
        load: [
          { label: 'Bahasa Inggris', pct: 32, color: '#3b82f6', ref: '13 minggu × 30 jam block time siang = 390 jam dari total ~1.227 jam Sem 1. (Berkurang dari rencana awal karena Aqidah & Fiqh masuk Sem 1)' },
          { label: 'Tahfidz', pct: 22, color: '#10b981', ref: '22 minggu × (1 jam Subuh + 0.75 jam Maghrib) × 6 hari = ±270 jam' },
          { label: 'IT', pct: 21, color: '#8b5cf6', ref: '22 minggu × 2 jam malam × 6 hari = 264 jam' },
          { label: 'Fiqh', pct: 10, color: '#a78bfa', ref: '4 minggu × 30 jam block time siang = 120 jam (Mulazamah beruntun setelah Aqidah)' },
          { label: 'Aqidah', pct: 7, color: '#f59e0b', ref: '3 minggu × 30 jam block time siang = 90 jam (Mulazamah intensif di pertengahan Sem 1)' },
          { label: 'Tahajji', pct: 5, color: '#fbbf24', ref: '2 pekan × 30 jam block time = 60 jam (khusus awal semester, fondasi pelafalan)' },
          { label: 'Hadits', pct: 2, color: '#f97316', ref: '1x/pekan × 1 jam × 22 minggu = 22 jam' },
          { label: 'Agile', pct: 1, color: '#ec4899', ref: '1x/2 pekan × 1 jam × 22 minggu = 11 jam' }
        ]
      },
      {
        sem: 2,
        title: 'Bootcamp Inggris + Mulazamah Sirah',
        items: [
          { emoji: '🗣️', text: 'Bahasa Inggris — Bootcamp Penuh 1 Bulan (Block Time)' },
          { emoji: '📿', text: 'Tahfidz — Hafalan Baru + Muroja\'ah + Intensif Ramadhan' },
          { emoji: '📗', text: 'Sirah — Sirah Nabi ﷺ (Mulazamah 2 Pekan)' },
          { emoji: '📜', text: 'Hadits Arba\'in 9-16' },
          { emoji: '💻', text: 'IT Lanjutan (Golang + REST API + MariaDB)' },
          { emoji: '📱', text: 'HSI Reguler — 5-10 Mnt/Hari via Laptop/HP (Diniyyah, sela waktu IT)' },
          { emoji: '🧠', text: 'Agile Mindset Level 1 (Lanjutan)' }
        ],
        load: [
          { label: 'Tahfidz', pct: 37, color: '#10b981', ref: '20 minggu aktif × 12.25 jam (subuh+maghrib) + bonus Ramadhan 63 jam = ±308 jam, dihitung dari total ~823 jam Sem 2 aktif bersih (libur & Nahwu dikecualikan)' },
          { label: 'IT', pct: 30, color: '#8b5cf6', ref: '20 minggu aktif × 2 jam malam × 6 hari = 240 jam + ujian IT ±10 jam = ±250 jam dari 823 jam total' },
          { label: 'Bahasa Inggris', pct: 16, color: '#3b82f6', ref: 'Bootcamp 1 bulan (4 minggu × 30 jam = 120 jam) + ujian akhir Bootcamp (10 jam) = 130 jam' },
          { label: 'Sirah', pct: 13, color: '#34d399', ref: '2 minggu mulazamah (60 jam) + muroja\'ah & ujian Sirah (50 jam) = 110 jam total' },
          { label: 'Hadits', pct: 3, color: '#f97316', ref: '1x/pekan × 1 jam × 20 mgg + ujian hadits = ±25 jam' },
          { label: 'Agile', pct: 1, color: '#ec4899', ref: '1x/2 pekan × 1 jam × 20 minggu = 10 jam' }
        ]
      }
    ],
    outputs: [
      '🌐 Website Portofolio',
      '📖 Hafal Juz 28-30',
      '🗣️ Berani Berbahasa Inggris',
      '🕌 Aqidah Bersih',
      '📜 Hafal 16 Hadits Arba\'in',
      '🧠 Karakter Anti-Fragile'
    ],
    outputLoad: [
      { label: 'Tahfidz', pct: 28, color: '#10b981', ref: 'Sem1: 270j + Sem2: 308j = 578 jam dari total ~2.050 jam aktif setahun. Rutin subuh & maghrib + intensif Ramadhan' },
      { label: 'Bahasa Inggris', pct: 25, color: '#3b82f6', ref: 'Sem1: 390j (13 mgg intensif block time) + Sem2: 130j (bootcamp+ujian) = 520 jam dari 2.050 jam' },
      { label: 'IT', pct: 25, color: '#8b5cf6', ref: 'Sem1: 264j + Sem2: 250j (incl. ujian IT) = 514 jam. Rutin setiap malam ±2 jam' },
      { label: 'Diniyah', pct: 16, color: '#f59e0b', ref: 'Sem1: Aqidah (90j) + Fiqh (120j). Sem2: Sirah (110j). Total 320 jam. Nahwu dihapus dari K10 TA 2026/2027' },
      { label: 'Tahajji', pct: 3, color: '#fbbf24', ref: '2 minggu awal Sem1 = 60 jam. Fondasi pelafalan huruf Arab & Al-Qur\'an sebelum intensif bahasa' },
      { label: 'Hadits', pct: 2, color: '#f97316', ref: 'Sem1: 22j + Sem2: 25j = 47 jam. 1x/pekan kajian adab & akhlak sepanjang tahun' },
      { label: 'Agile', pct: 1, color: '#ec4899', ref: 'Sem1: 11j + Sem2: 10j = 21 jam. 1x/2 pekan sesi pembentukan mental Anti-Fragile' }
    ]
  },

  {
    year: 11,
    badge: '🔵 Kelas 11',
    phase: 'Fase Eskalasi & Transisi',
    description: 'Jika K10 adalah penguasaan alat internal, K11 adalah transisi pandangan ke luar (Global). Fase Akuisisi bergeser dari penguasaan Bahasa Arab murni ke penguasaan Bahasa Inggris aktif. Di sisi IT, mereka dituntut membangun "sistem" (Dashboard Admin) bukan lagi sekadar portofolio. Tanggung jawab keagamaan juga ditingkatkan melalui ujian langsung oleh pihak eksternal (Setoran ke Masjid Nabawiy via daring).',
    semesters: [
      {
        sem: 1,
        title: 'Global Literacy & React.js',
        items: [
          { emoji: '🗣️', text: 'Bahasa Inggris Intensif (13 Minggu Block Time Siang)' },
          { emoji: '📿', text: 'Tahfidz — Hafalan Baru Subuh (±1 jam) + Muroja\'ah Maghrib (±45 mnt)' },
          { emoji: '💻', text: 'IT — Website Sekolah Dinamis (React.js)' },
          { emoji: '📜', text: 'Hadits Arba\'in 1-16' },
          { emoji: '📱', text: 'HSI Reguler — 5-10 Mnt/Hari via Laptop/HP (Diniyyah, sela waktu IT)' },
          { emoji: '🧠', text: 'Agile Mindset Level 1' }
        ],
        load: [
          { label: 'Bahasa Inggris', pct: 32, color: '#3b82f6', ref: '13 minggu × 30 jam block time siang = 390 jam dari total ~1.227 jam Sem 1. Pola sama dengan K10 Sem 1.' },
          { label: 'IT', pct: 21, color: '#8b5cf6', ref: '22 minggu × 2 jam malam × 6 hari = 264 jam. Fokus React.js + project website sekolah.' },
          { label: 'Tahfidz', pct: 19, color: '#10b981', ref: '22 minggu × (1 jam Subuh + 0.75 jam Maghrib) × 6 hari = ±231 jam. Lanjutan hafalan dari K10, target +1-2 Juz.' },
          { label: 'Hadits', pct: 2, color: '#f97316', ref: '1x/pekan × 1 jam × 22 minggu = 22 jam. Hadits Arba\'in 1-16.' },
          { label: 'Agile', pct: 1, color: '#ec4899', ref: '1x/2 pekan × 1 jam × 22 minggu = 11 jam. Agile Mindset Level 1 — Anti-Fragile & Purpose of Life.' }
        ]
      },
      {
        sem: 2,
        title: 'Hifdzul Mutun & Dashboard RBAC',
        items: [
          { emoji: '🗣️', text: 'Bahasa Inggris — Bootcamp Penuh 1 Bulan (Block Time)' },
          { emoji: '📿', text: 'Tahfidz — Hafalan Baru + Muroja\'ah + Intensif Ramadhan' },
          { emoji: '🕌', text: '4 Matan Dasar + Setoran ke Syaikh' },
          { emoji: '💻', text: 'IT — Dashboard Admin RBAC (Redux + Go Fiber)' },
          { emoji: '📜', text: 'Hadits Arba\'in 17-32' },
          { emoji: '📱', text: 'HSI Reguler — 5-10 Mnt/Hari via Laptop/HP (Diniyyah, sela waktu IT)' },
          { emoji: '🧠', text: 'Agile Mindset Level 2' }
        ],
        load: [
          { label: 'Tahfidz', pct: 37, color: '#10b981', ref: '20 minggu aktif × (1j Subuh + 0.75j Maghrib) × 6 hari + bonus Ramadhan 63 jam = ±308 jam dari total ~823 jam Sem 2 aktif bersih.' },
          { label: 'IT', pct: 30, color: '#8b5cf6', ref: '20 minggu aktif × 2 jam malam × 6 hari = 240 jam + ujian IT ±10 jam = ±250 jam. Fokus Dashboard Admin RBAC (Redux + Go Fiber).' },
          { label: 'Bahasa Inggris', pct: 16, color: '#3b82f6', ref: 'Bootcamp 1 bulan (4 minggu × 30 jam = 120 jam) + ujian akhir Bootcamp (10 jam) = 130 jam. Pola sama dengan K10 Sem 2.' },
          { label: 'Hifdzul Mutun', pct: 10, color: '#a78bfa', ref: '2 minggu mulazamah (60 jam) + muroja\'ah & ujian setoran ke Syaikh (20 jam) = 80 jam. 4 Matan Dasar: Ushuluts Tsalatsah, Al-Qawaid Al-Arba, Nawaqidhul Islam, 6 Prinsip Pokok.' },
          { label: 'Hadits', pct: 3, color: '#f97316', ref: '1x/pekan × 1 jam × 20 mgg + ujian hadits = ±25 jam. Hadits Arba\'in 17-32.' },
          { label: 'Agile', pct: 1, color: '#ec4899', ref: '1x/2 pekan × 1 jam × 20 minggu = 10 jam. Agile Mindset Level 2 — Resilience & EQ.' }
        ]
      }
    ],
    outputs: [
      '💻 Dashboard Admin Live',
      '📖 Hafal 4-6 Juz',
      '🌍 Bahasa Inggris Aktif',
      '🕌 Sertifikasi Masjid Nabawiy',
      '📜 Hafal 32 Hadits Arba\'in',
      '🧠 Mental Resilien & Beradab'
    ],
    outputLoad: [
      { label: 'Tahfidz', pct: 26, color: '#10b981', ref: 'Sem1: 231j + Sem2: 308j = 539 jam dari total ~2.050 jam aktif setahun. Rutin subuh & maghrib + intensif Ramadhan. Target +1-2 Juz (total 4-6 Juz).' },
      { label: 'Bahasa Inggris', pct: 25, color: '#3b82f6', ref: 'Sem1: 390j (13 mgg intensif block time) + Sem2: 130j (bootcamp+ujian) = 520 jam dari 2.050 jam. Pola identik dengan K10.' },
      { label: 'IT', pct: 25, color: '#8b5cf6', ref: 'Sem1: 264j (React.js) + Sem2: 250j (Dashboard RBAC, incl. ujian) = 514 jam. Rutin setiap malam ±2 jam.' },
      { label: 'Hifdzul Mutun', pct: 4, color: '#a78bfa', ref: 'Sem2: 80 jam. 4 Matan Dasar + Setoran ke Masjid Nabawiy. Validasi eksternal internasional.' },
      { label: 'Hadits', pct: 2, color: '#f97316', ref: 'Sem1: 22j + Sem2: 25j = 47 jam. 1x/pekan kajian adab & akhlak. Hadits Arba\'in 1-32.' },
      { label: 'Agile', pct: 1, color: '#ec4899', ref: 'Sem1: 11j + Sem2: 10j = 21 jam. 1x/2 pekan. Sem1: Level 1 (Anti-Fragile), Sem2: Level 2 (Resilience & EQ).' }
    ]
  },
  {
    year: 12,
    badge: '🔴 Kelas 12',
    phase: 'Fase Aplikasi — Bahasa Melebur Menjadi Alat',
    description: 'Di Kelas 12, tidak ada pelajaran bahasa eksplisit baru yang diajarkan dari nol. Kedua bahasa (Arab & Inggris) melebur 100% dari "Mata Pelajaran" menjadi "Alat Kerja". Inilah masa panen — mereka dipecut menghasilkan produk akhir berstandar industri (Marketplace Islami) dilengkapi sertifikasi final setoran hafalan (50 Hadits & Imam Tarawih).',
    semesters: [
      {
        sem: 1,
        title: 'Marketplace Front-End & HSI Akademik',
        items: [
          { emoji: '💻', text: 'IT — Next.js + Go Fiber + Payment Gateway' },
          { emoji: '📜', text: 'Hadits Arba\'in 33-41' },
          { emoji: '🧠', text: 'Agile Level 3 (Conflict & Design Thinking)' },
          { emoji: '🕌', text: 'HSI Akademik (145 Hlq)' },
          { emoji: '🗣️', text: 'Trilingual Project Maintenance (Arab & Inggris)' }
        ]
      },
      {
        sem: 2,
        title: 'Dashboard Admin & Pematangan Final',
        items: [
          { emoji: '💻', text: 'IT — Dashboard Admin/Seller + Bot Notifikasi' },
          { emoji: '📜', text: 'Setoran Duduk 50 Hadits Arba\'in + Ibnu Rajab' },
          { emoji: '📖', text: 'Imam Tarawih + Finalisasi 6-9 Juz' },
          { emoji: '🕌', text: 'HSI Akademik (94 Hlq)' },
          { emoji: '🧠', text: 'Agile Level 3 (Conflict & Design Thinking)' },
          { emoji: '🗣️', text: 'Trilingual Project Maintenance (Lanjutan)' }
        ]
      }
    ],
    outputs: [
      '💻 Marketplace Islami Live',
      '📖 6-9 Juz Mutqin',
      '📜 50 Hadits Setoran Duduk',
      '🕌 Khatam 239 Hlq HSI Akademik',
      '👑 Imam Tarawih',
      '🗣️ Generasi Muslim Unggul & Trilingual Aktif'
    ]
  }
];
