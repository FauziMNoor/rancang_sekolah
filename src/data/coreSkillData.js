export const coreSkillData = {
  skill1: {
    icon: '🕌',
    title: 'Diniyyah',
    color: 'var(--accent-violet)',
    bgColor: 'rgba(167, 139, 250, 0.15)',
    subtitle: 'Bermanhaj Salaf + Hafidz Mutqin',
    description: 'Foundation utama alumni HSIBS. Bermanhaj Salaf yang kuat, hafal Al-Qur\'an 6-9 Juz mutqin, menghafal & mengamalkan 50 Hadits Arba\'in sebagai pedoman hidup dan filter karakter.',
    subjects: [
      { t: 'Aqidah Bermanhaj Salaf', d: 'Mulazamah (K10) → Hifdzul Mutun (K11) → HSI Akademik (K12)' },
      { t: 'Tahfidz Al-Qur\'an', d: 'Juz 28-30 (K10) → 4-6 Juz (K11) → 6-9 Juz Mutqin (K12)' },
      { t: '50 Hadits Arba\'in', d: 'Hafal + Diamalkan + Setoran Duduk' },
      { t: 'Fiqh Ibadah Mandiri', d: 'Thaharah, Shalat, Zakat, Puasa, Haji, Jenazah' }
    ]
  },
  skill2: {
    icon: '💻',
    title: 'IT',
    color: 'var(--accent-sky)',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    subtitle: 'Fullstack Web Engineer → Marketplace Islami Live',
    description: 'Fullstack Web Engineer yang mampu membangun produk nyata bertaraf industri, dari website portofolio hingga marketplace islami yang live production dengan payment gateway dan notifikasi otomatis.',
    subjects: [
      { t: 'Website Portofolio', d: 'HTML/CSS/JS/Golang (K10)' },
      { t: 'Dashboard Admin', d: 'React.js/Redux/RBAC (K11)' },
      { t: 'Marketplace Islami Live', d: 'Next.js/Go Fiber/Payment Gateway (K12)' },
      { t: 'Bot Notifikasi', d: 'Telegram/WhatsApp API Integration' }
    ]
  },
  skill3: {
    icon: '🗣️',
    title: 'Trilingual',
    color: 'var(--accent-gold)',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    subtitle: 'Arab (Agama) + Inggris (Industri) + Indonesia (Ibu)',
    description: 'Kemampuan berbahasa Arab, Inggris, dan Indonesia secara aktif — Arab untuk akses literatur agama dan diskusi mendalam, Inggris untuk dunia profesional dan industri global, Indonesia sebagai bahasa ibu yang kuat.',
    subjects: [
      { t: 'Bahasa Arab Aktif', d: 'Survival Arabic (K10) → Fluent (K11-K12)' },
      { t: 'Bahasa Inggris Aktif', d: 'Presentasi, Komunikasi, Public Speaking (K11)' },
      { t: 'Bahasa Indonesia', d: 'Bahasa ibu yang kuat — dokumentasi, presentasi, komunikasi formal' },
      { t: 'Akses Literatur Global', d: 'Agama (Arab) + Industri (Inggris) + Lokal (Indonesia)' }
    ]
  },
  skill4: {
    icon: '👑',
    title: 'Karakter',
    color: 'var(--accent-rose)',
    bgColor: 'rgba(251, 113, 133, 0.15)',
    subtitle: 'Berakhlaq Qurani — Anti-Fragile & Siap Memimpin',
    description: 'Berakhlaq Qurani dalam kehidupan nyata — berkarakter tangguh (Anti-Fragile, Resilience), memiliki kepemimpinan yang terbukti (Imam Tarawih, Project Leader), dan memiliki visi hidup yang bernilai ibadah.',
    subjects: [
      { t: 'Karakter Tangguh', d: 'Anti-Fragile + Resilience + Kepemimpinan Spiritual' },
      { t: 'Agile Mindset L1-L3', d: 'Anti-Fragile → Resilience → Leadership' },
      { t: 'Kepemimpinan Nyata', d: 'Imam Tarawih + Project Leader + Mentorship' },
      { t: 'Visi Hidup Bernilai', d: 'Career Roadmap + 1-on-1 Mentorship + Purpose of Life' }
    ]
  }
};

export const skillDistribution = [
  { label: 'Diniyyah', percentage: 60, color: 'var(--accent-violet)', key: 'skill1' },
  { label: 'IT', percentage: 25, color: 'var(--accent-sky)', key: 'skill2' },
  { label: 'Trilingual', percentage: 10, color: 'var(--accent-gold)', key: 'skill3' },
  { label: 'Karakter', percentage: 5, color: 'var(--accent-rose)', key: 'skill4' }
];


