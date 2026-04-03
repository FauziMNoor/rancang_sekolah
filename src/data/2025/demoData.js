export const MOCK_TIMELINE = [
    {
        year: 1, phase: 'Fondasi & Orientasi', label: 'Kelas 10',
        semesters: ['Orientasi nilai', 'Dasar STEM & digital literacy', 'Pembentukan karakter'],
        output_tags: ['Fondasi Kuat', 'Basic Skills', 'Public Speaking'],
        color: '#4f8ef7'
    },
    {
        year: 2, phase: 'Eksplorasi & Pengembangan', label: 'Kelas 11',
        semesters: ['Pendalaman bidang minat', 'Proyek riset kolaboratif', 'Leadership training'],
        output_tags: ['Leadership Camp', 'Proyek Kolaborasi', 'Keterampilan Analitis'],
        color: '#a78bfa'
    },
    {
        year: 3, phase: 'Kristalisasi & Kontribusi', label: 'Kelas 12',
        semesters: ['Capstone project', 'Persiapan universitas', 'Program pengabdian'],
        output_tags: ['Karya Tulis Ilmiah', 'Community Project', 'Siap Karir/Kampus'],
        color: '#c9a84c'
    },
];

export const MOCK_CORESKILLS = [
    { id: 1, label: 'Kecerdasan Spiritual', sub: 'Akhlak, Integritas, Fiqih Kehidupan', icon: '🕌' },
    { id: 2, label: 'Critical Thinking', sub: 'Analisis, Logika, Problem Solving', icon: '🧠' },
    { id: 3, label: 'Digital Mastery', sub: 'AI, Coding, Data Literacy', icon: '💻' },
    { id: 4, label: 'Communication', sub: 'Public Speaking, Menulis, Bahasa', icon: '🗣️' },
    { id: 5, label: 'Leadership', sub: 'Kepemimpinan, Organisasi, Manajemen', icon: '👑' },
    { id: 6, label: 'Creativity & Innovation', sub: 'Desain, Seni, Entrepreneurship', icon: '✨' },
    { id: 7, label: 'Emotional Intelligence', sub: 'Empati, Kolaborasi, Resiliensi', icon: '💛' },
    { id: 8, label: 'Global Citizenship', sub: 'Bahasa Asing, Budaya, Wawasan Dunia', icon: '🌍' },
    { id: 9, label: 'Health & Wellbeing', sub: 'Olahraga, Nutrisi, Mental Health', icon: '🌿' },
];

export const LOADING_MESSAGES = [
    { text: 'Merakit Pilar Kurikulum...', icon: '🏗️' },
    { text: 'Menata Perjalanan Pendidikan...', icon: '📅' },
    { text: 'Mengkristalkan Core Skills...', icon: '💎' },
    { text: 'Menenun Visi dan Misi...', icon: '🧵' },
    { text: 'Menyusun Struktur Kurikulum...', icon: '📚' },
    { text: 'Melahirkan Profil Profil Alumni...', icon: '🎓' },
    { text: 'Memproyeksikan Roadmap 5 Tahun...', icon: '🗺️' },
    { text: 'Menganalisis Pesaing & Diferensiasi...', icon: '📊' },
    { text: 'Menyempurnakan Blueprint...', icon: '✨' },
]

export const INITIAL_AI_MESSAGE = `Assalamu'alaikum! 👋

Saya adalah **Asisten Perancang Kurikulum AI** Anda. Saya siap menyulap ide atau dokumen rumit Anda menjadi struktur *Blueprint* modern dan tertata rapi.

Anda bisa memilih **salah satu** dari 2 cara kerja berikut:
1. **Mode Interaktif:** Saya akan mewawancarai Anda dengan 4 pertanyaan singkat. Terus jawab saja pertanyaan saya.
2. **Jalur Cepat (*Reverse Engineering*):** Silakan *copy-paste* (tempelkan) isi dokumen silabus, proposal, visi-misi, atau panduan sekolah yang *sudah Anda miliki* ke kolom obrolan di bawah.

Apa pun pilihan Anda, saya akan membedah dan mengubahnya menjadi **8 artefak visual yang komprehensif**:
- 🗺️ Mind Map pilar keunggulan sekolah
- 📅 Timeline perjalanan pendidikan
- 🎯 9 Core Skills alumni yang terstruktur
- 🧭 Visi & Misi yang powerful
- 📚 Struktur Kurikulum & Mata Pelajaran
- 🎓 Profil Kelulusan Ideal
- 🗺️ Peta Jalan & Roadmap Strategis 5 Tahun
- 📊 Tabel Diferensiasi Kompetitif

**Mari kita mulai!** 🚀

👉 *Silakan ketik jawaban untuk mulai mengobrol, ATAU paste langsung teks dokumen kurikulum Anda di kolom di bawah ini!*`

export const AI_QUESTIONS = [
    'Apa **nilai inti (core values)** yang ingin Anda tanamkan pada setiap siswa? Dan seperti apa **karakter ideal lulusan** yang Anda bayangkan?',
    'Siapa **target siswa** Anda? (usia, latar belakang keluarga, dll). Dan apa **keunggulan kompetitif** sekolah Anda dibanding sekolah lain di sekitarnya?',
    'Bagaimana **pendekatan kurikulum** yang Anda inginkan? Apakah lebih ke akademik formal, karakter & agama, kecakapan vokasional, atau kombinasi dari semuanya?',
    'Mengenai **struktur spesifik Mata Pelajaran**, bagaimana Anda membayangkan pembagian porsinya? (Misal: 40% Diniyah, 30% Umum, 30% IT) Adakah pelajaran unggulan wajib?',
    'Terima kasih! Saya sudah memiliki gambaran yang cukup komprehensif tentang visi sekolah Anda. Izinkan saya sekarang **merancang blueprint lengkap** berdasarkan semua informasi yang telah Anda bagikan. Ini akan membutuhkan beberapa detik...'
]


