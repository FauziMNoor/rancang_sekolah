
        // ===== VIEW SWITCHING =====
        function switchView(view) {
            document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            document.getElementById('view-' + view).classList.add('active');
            event.target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const activeView = document.getElementById('view-' + view);
            const reveals = activeView.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
                el.classList.remove('visible');
                el.style.transitionDelay = (i * 0.1) + 's';
                setTimeout(() => el.classList.add('visible'), 50);
            });
        }

        // ===== EDIT MODE =====
        let editMode = false;
        let aiMode = false;  // â† PERBAIKAN: Inisialisasi variabel aiMode yang hilang
        const editableSelectors = '.hero-badge, .hero h1, .hero-arabic, .hero p, .section-title h2, .section-title p, .central-node .label, .central-node .sub, .pillar-title, .pillar-desc, .branch-title, .branch-items li, .tl-year-badge, .tl-phase-label, .tl-phase-desc, .tl-sem-badge, .tl-sem h4, .tl-sem-items li, .tl-output-label, .tl-output-tag, .skill-label, .skill-sub, .skill-num, .alumni-box h3, .alumni-trait, .quote-box blockquote, .footer p, .nav-brand';

        function toggleEditMode() {
            editMode = !editMode;
            // Turn off comment mode if on
            if (editMode && commentMode) toggleCommentMode();

            document.body.classList.toggle('edit-mode', editMode);
            document.getElementById('btn-edit').classList.toggle('active-mode', editMode);

            document.querySelectorAll(editableSelectors).forEach(el => {
                el.classList.toggle('editable', editMode);
                el.contentEditable = editMode;
            });

            showToast(editMode ? 'ðŸ–Šï¸ Edit Mode ON â€” klik teks manapun untuk mengedit' : 'âœ… Edit Mode OFF');
        }

        // ===== COMMENT MODE =====
        let commentMode = false;
        let commentCounter = 0;
        const commentableSelectors = '.hero, .central-node, .pillar, .branch-card, .tl-year, .tl-sem, .tl-phase, .tl-output, .skill-chip, .alumni-box, .quote-box, .footer';

        function toggleCommentMode() {
            commentMode = !commentMode;
            // Turn off edit mode if on
            if (commentMode && editMode) toggleEditMode();

            document.body.classList.toggle('comment-mode', commentMode);
            document.getElementById('btn-comment').classList.toggle('comment-active', commentMode);

            document.querySelectorAll(commentableSelectors).forEach(el => {
                el.classList.toggle('commentable', commentMode);
                if (commentMode) {
                    el.addEventListener('click', addComment);
                } else {
                    el.removeEventListener('click', addComment);
                }
            });

            showToast(commentMode ? 'ðŸ’¬ Comment Mode ON â€” klik area manapun untuk tambah catatan' : 'âœ… Comment Mode OFF');
        }

        function addComment(e) {
            if (!commentMode) return;
            e.stopPropagation();

            const target = e.currentTarget;
            // Don't add if clicking on existing comment
            if (e.target.closest('.comment-note')) return;

            commentCounter++;
            const noteId = 'note-' + commentCounter;

            const note = document.createElement('div');
            note.className = 'comment-note';
            note.id = noteId;
            note.innerHTML = `
                <div class="note-header">
                    <span class="note-label">ðŸ’¬ Catatan #${commentCounter}</span>
                    <button class="note-delete" onclick="deleteComment('${noteId}')" title="Hapus">âœ•</button>
                </div>
                <textarea placeholder="Ketik catatan di sini..." autofocus></textarea>
            `;
            target.appendChild(note);

            // Focus textarea
            const textarea = note.querySelector('textarea');
            textarea.focus();
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });

            updateCommentCount();
        }

        function deleteComment(noteId) {
            const note = document.getElementById(noteId);
            if (note) {
                note.style.opacity = '0';
                note.style.transform = 'translateY(-8px)';
                setTimeout(() => note.remove(), 200);
                setTimeout(updateCommentCount, 250);
            }
        }

        function updateCommentCount() {
            const count = document.querySelectorAll('.comment-note').length;
            const badge = document.getElementById('comment-count');
            const exportBtn = document.getElementById('btn-export');
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
            exportBtn.style.display = count > 0 ? 'flex' : 'none';
        }

        // ===== EXPORT COMMENTS =====
        function exportComments() {
            const notes = document.querySelectorAll('.comment-note');
            if (notes.length === 0) return;

            let output = 'ðŸ“‹ KOMENTAR VISUAL BLUEPRINT HSIBS\n';
            output += '================================\n\n';

            notes.forEach((note, i) => {
                const section = note.closest('.branch-card, .pillar, .tl-sem, .tl-phase, .tl-output, .skill-chip, .alumni-box, .central-node');
                let sectionName = 'Umum';

                if (section) {
                    if (section.classList.contains('branch-card')) {
                        sectionName = 'Arsitektur: ' + (section.querySelector('.branch-title')?.textContent || '');
                    } else if (section.classList.contains('pillar')) {
                        sectionName = 'Pilar: ' + (section.querySelector('.pillar-title')?.textContent || '');
                    } else if (section.classList.contains('tl-sem')) {
                        sectionName = 'Timeline: ' + (section.querySelector('h4')?.textContent || '');
                    } else if (section.classList.contains('tl-phase')) {
                        sectionName = 'Fase: ' + (section.querySelector('.tl-phase-label')?.textContent || '');
                    } else if (section.classList.contains('tl-output')) {
                        sectionName = 'Output';
                    } else if (section.classList.contains('skill-chip')) {
                        sectionName = 'Skill: ' + (section.querySelector('.skill-label')?.textContent || '');
                    } else if (section.classList.contains('alumni-box')) {
                        sectionName = 'Profil Alumni';
                    }
                }

                const textarea = note.querySelector('textarea');
                const text = textarea ? textarea.value.trim() : '(kosong)';
                output += `${i + 1}. [${sectionName}]\n   ${text || '(kosong)'}\n\n`;
            });

            navigator.clipboard.writeText(output).then(() => {
                showToast('âœ… Semua komentar berhasil di-copy ke clipboard!');
            }).catch(() => {
                // Fallback
                const ta = document.createElement('textarea');
                ta.value = output;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
                showToast('âœ… Semua komentar berhasil di-copy ke clipboard!');
            });
        }

        // ===== TOAST =====
        function showToast(msg) {
            const existing = document.querySelector('.toast');
            if (existing) existing.remove();

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = msg;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s';
                setTimeout(() => toast.remove(), 300);
            }, 2500);
        }

        // ===== SAVE & AUTO-SAVE FUNCTIONALITY =====
        const STORAGE_KEY = 'hsibs_blueprint_changes';
        let autoSaveTimeout = null;

        // Download HTML to file (manual - only when clicked)
        function downloadHTML() {
            // Get the full HTML
            const htmlContent = document.documentElement.outerHTML;
            
            // Create blob and download
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Visual Blueprint HSIBS - Edited.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showToast('âœ… File berhasil di-download! Timpa file lama dengan file ini.');
        }

        // Auto-save to localStorage (silent - no download)
        function autoSave() {
            const changes = {
                html: document.documentElement.outerHTML,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
            console.log('ðŸ“ Auto-saved at', changes.timestamp);
            
            // Show brief "saved" indicator
            const indicator = document.getElementById('auto-save-indicator');
            if (indicator) {
                indicator.classList.add('visible');
                setTimeout(() => {
                    indicator.classList.remove('visible');
                }, 2000);
            }
        }

        // Load from localStorage on page load
        function loadSavedChanges() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const changes = JSON.parse(saved);
                    const timestamp = new Date(changes.timestamp).toLocaleString('id-ID');
                    
                    // Show notification that there are saved changes
                    const notification = document.createElement('div');
                    notification.className = 'toast';
                    notification.style.cssText = 'max-width: 400px; line-height: 1.5; background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(14, 165, 233, 0.15)); border: 1px solid rgba(56, 189, 248, 0.3); color: var(--text-primary); bottom: 150px;';
                    notification.innerHTML = `
                        <strong>ðŸ“¦ Ada perubahan tersimpan</strong><br>
                        <small>Disimpan pada: ${timestamp}</small><br><br>
                        <button id="load-changes-btn" style="padding: 6px 16px; background: white; color: #0ea5e9; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem;">
                            ðŸ”„ Muat Perubahan
                        </button>
                        <button id="ignore-changes-btn" style="padding: 6px 16px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; margin-left: 8px;">
                            âŒ Abaikan
                        </button>
                    `;
                    document.body.appendChild(notification);
                    
                    // Load button click
                    document.getElementById('load-changes-btn').onclick = () => {
                        document.documentElement.outerHTML = changes.html;
                    };
                    
                    // Ignore button click
                    document.getElementById('ignore-changes-btn').onclick = () => {
                        notification.style.opacity = '0';
                        notification.style.transition = 'opacity 0.3s';
                        setTimeout(() => notification.remove(), 300);
                    };
                    
                    // Auto-hide after 10 seconds
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.style.opacity = '0';
                            notification.style.transition = 'opacity 0.3s';
                            setTimeout(() => notification.remove(), 300);
                        }
                    }, 10000);
                } catch (e) {
                    console.error('Failed to load saved changes:', e);
                }
            }
        }

        // Reset all changes
        function resetChanges() {
            if (confirm('âš ï¸ Apakah Anda yakin ingin menghapus semua perubahan tersimpan?\n\nPerubahan akan hilang dan kembali ke versi asli.')) {
                localStorage.removeItem(STORAGE_KEY);
                location.reload();
            }
        }

        // Setup auto-save listeners
        function setupAutoSave() {
            // Listen for content changes in editable elements
            document.addEventListener('input', (e) => {
                if (editMode && e.target.isContentEditable) {
                    clearTimeout(autoSaveTimeout);
                    autoSaveTimeout = setTimeout(autoSave, 1000); // Auto-save after 1 second
                }
                // Also save comment textarea changes
                if (e.target.closest('.comment-note textarea')) {
                    clearTimeout(autoSaveTimeout);
                    autoSaveTimeout = setTimeout(autoSave, 1000);
                }
            });
        }

        // ===== SYLLABUS DATA =====
        const coreSkillData = {
            skill1: {
                icon: 'ï¿½', 
                title: 'Aqidah', 
                color: 'var(--accent-violet)',
                bgColor: 'rgba(167, 139, 250, 0.15)',
                subtitle: 'Bermanhaj Salaf + Hafalan + Hadits + Karakter',
                description: 'Foundation utama alumni HSIBS. Bermanhaj Salaf yang kuat, hafal Al-Qur\'an 6-9 Juz mutqin, menghafal & mengamalkan 50 Hadits Arba\'in sebagai filter karakter, serta berkarakter tangguh dan siap menjadi Imam Tarawih di masyarakat.',
                subjects: [
                    { t: 'Aqidah Bermanhaj Salaf', d: 'Mulazamah (K10) â†’ Hifdzul Mutun (K11) â†’ HSI Akademik (K12)' },
                    { t: 'Tahfidz Al-Qur\'an', d: 'Juz 28-30 (K10) â†’ 4-6 Juz (K11) â†’ 6-9 Juz Mutqin (K12)' },
                    { t: '50 Hadits Arba\'in', d: 'Hafal + Diamalkan + Setoran Duduk' },
                    { t: 'Karakter Tangguh', d: 'Anti-Fragile + Resilience + Kepemimpinan Spiritual' }
                ]
            },
            skill2: {
                icon: 'ðŸ’»', 
                title: 'Software Engineer', 
                color: 'var(--accent-sky)',
                bgColor: 'rgba(56, 189, 248, 0.15)',
                subtitle: 'Fullstack Web Engineer â†’ Marketplace Islami Live',
                description: 'Fullstack Web Engineer yang mampu membangun produk nyata bertaraf industri, dari website portofolio hingga marketplace islami yang live production dengan payment gateway dan notifikasi otomatis.',
                subjects: [
                    { t: 'Website Portofolio', d: 'HTML/CSS/JS/Golang (K10)' },
                    { t: 'Dashboard Admin', d: 'React.js/Redux/RBAC (K11)' },
                    { t: 'Marketplace Islami Live', d: 'Next.js/Go Fiber/Payment Gateway (K12)' },
                    { t: 'Bot Notifikasi', d: 'Telegram/WhatsApp API Integration' }
                ]
            },
            skill3: {
                icon: 'ðŸ—£ï¸', 
                title: 'Bilingual', 
                color: 'var(--accent-gold)',
                bgColor: 'rgba(245, 158, 11, 0.15)',
                subtitle: 'Arab + Inggris Aktif',
                description: 'Kemampuan berbahasa Arab dan Inggris secara aktif â€” Arab untuk akses literatur agama dan diskusi mendalam, Inggris untuk dunia profesional dan industri global.',
                subjects: [
                    { t: 'Bahasa Arab Aktif', d: 'Survival Arabic (K10) â†’ Fluent (K11-K12)' },
                    { t: 'Bahasa Inggris Aktif', d: 'Presentasi, Komunikasi, Public Speaking (K11)' },
                    { t: 'Bilingual Dokumentasi', d: 'Marketplace Islami dalam Arab + Inggris' },
                    { t: 'Akses Literatur Global', d: 'Agama (Arab) + Industri (Inggris)' }
                ]
            },
            skill4: {
                icon: 'ðŸ‘‘', 
                title: 'Leadership & Resilience', 
                color: 'var(--accent-rose)',
                bgColor: 'rgba(251, 113, 133, 0.15)',
                subtitle: 'Anti-Fragile + Kepemimpinan Nyata',
                description: 'Berkarakter tangguh (Anti-Fragile, Resilience), memiliki kepemimpinan yang terbukti (Imam Tarawih, Project Leader), dan memiliki visi hidup yang bernilai ibadah dengan career roadmap yang jelas.',
                subjects: [
                    { t: 'Agile Mindset L1-L3', d: 'Anti-Fragile â†’ Resilience â†’ Leadership' },
                    { t: 'Kepemimpinan Nyata', d: 'Imam Tarawih + Project Leader + Mentorship' },
                    { t: 'Karakter Tangguh', d: 'Conflict Management, Design Thinking, Proactive Imperfection' },
                    { t: 'Visi Hidup Bernilai', d: 'Career Roadmap + 1-on-1 Mentorship + Purpose of Life' }
                ]
            }
        };

        function openCoreSkill(key) {
            if (editMode || commentMode || aiMode) return;
            const data = coreSkillData[key];
            if (!data) return;

            closeSyllabus();

            const overlay = document.createElement('div');
            overlay.className = 'syllabus-overlay';
            overlay.id = 'syl-overlay';
            overlay.onclick = closeSyllabus;
            document.body.appendChild(overlay);

            const modal = document.createElement('div');
            modal.className = 'syllabus-modal';
            modal.id = 'syl-modal';

            modal.innerHTML = `
                <div class="syl-header">
                    <div class="syl-header-icon" style="background:${data.bgColor}">${data.icon}</div>
                    <div class="syl-header-text">
                        <h2 style="color:${data.color}">${data.title}</h2>
                        <p>${data.subtitle}</p>
                    </div>
                    <button class="syl-close" onclick="closeSyllabus()">âœ•</button>
                </div>
                <div class="syl-body" style="padding: 1.5rem;">
                    <p style="margin-bottom: 1.5rem; line-height: 1.6; color: rgba(255,255,255,0.9);">${data.description}</p>
                    <h3 style="margin-bottom: 1rem; color: ${data.color}; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Mata Pelajaran Pendukung:</h3>
                    <div class="syl-grid" style="grid-template-columns: 1fr; gap: 0.75rem;">
                        ${data.subjects.map(sub => `
                            <div class="syl-item">
                                <div class="syl-item-title">${sub.t}</div>
                                <div class="syl-item-desc">${sub.d}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const alumniTraitData = {
            t1: {
                icon: 'ðŸ•Œ', title: 'Kuat Aqidah', color: 'var(--accent-violet)', bgColor: 'rgba(167, 139, 250, 0.15)',
                subtitle: 'Faqih Ibadah & Hafidz Mutqin',
                description: 'Lulus dengan aqidah bermanhaj salaf yang lurus dan kokoh, pemahaman fiqh ibadah yang mandiri dan benar, serta memiliki hafalan Al-Qur\'an 6-9 juz mutqin dan hafalan Hadits Arba\'in sebagai bekal siap terjun membimbing dan menjadi Imam di masyarakat.',
                subjects: [
                    { t: 'Aqidah & Manhaj Salaf', d: 'Akuisisi di asrama hingga kajian komprehensif' },
                    { t: 'Fiqh Ibadah Mandiri', d: 'Thaharah, Shalat, Zakat, Puasa, Haji, dan Jenazah' },
                    { t: 'Hafalan Mutqin', d: '6-9 Juz + 50 Hadits Arba\'in' }
                ]
            },
            t2: {
                icon: 'ðŸ’»', title: 'Software Engineer', color: 'var(--accent-sky)', bgColor: 'rgba(56, 189, 248, 0.15)',
                subtitle: 'Kreator Teknologi Industri',
                description: 'Bukan sekadar terekspos teknologi, melainkan menjadi kreator teknologi. Berkapasitas sebagai Fullstack Web Engineer yang luwes membangun produk nyata (Marketplace Islami) dan siap bersaing tajam memenuhi tuntutan tinggi dunia bursa industri IT rill.',
                subjects: [
                    { t: 'Rekayasa Digital', d: 'Membangun aplikasi modern (HTML, JS, React, Next.js, Go)' },
                    { t: 'Marketplace Islami Live', d: 'Membangun platform end-to-end lengkap dengan payment gateway' }
                ]
            },
            t3: {
                icon: 'ðŸ—£ï¸', title: 'Mahir Bahasa Arab & Inggris', color: 'var(--accent-gold)', bgColor: 'rgba(245, 158, 11, 0.15)',
                subtitle: 'Akses Literatur Agama & Karier Global',
                description: 'Bahasa diletakkan sebagai alat operasional mutlak. Penguasaan Bahasa Arab aktif ditujukan agar santri mampu mengakses dan mempelajari kitab literatur asli agama Islam dengan mandiri. Sedangkan kemahiran Bahasa Inggris dimanfaatkan sebagai alat komunikasi krusial untuk memenuhi standar literatur dunia kerja dan industri teknologi masa kini.',
                subjects: [
                    { t: 'Arab Intensif', d: 'Dapat berbicara, membaca dan mengartikan literatur agama asli' },
                    { t: 'Inggris Aktif', d: 'Dapat merujuk dokumentasi IT (bilingual) dan beradaptasi di ranah profesional.' }
                ]
            },
            t4: {
                icon: 'ðŸ‘‘', title: 'Pemimpin Tangguh & Mandiri', color: 'var(--accent-rose)', bgColor: 'rgba(244, 63, 94, 0.15)',
                subtitle: 'Karakter Anti-Fragile & Pembelajar Mandiri',
                description: 'Tahan banting (anti-fragile/resilience) menghadapi kerasnya tekanan masalah operasional maupun sosial, memiliki susunan adab/akhlak yang mulia, serta berjiwa pembelajar gigih sepanjang hayat yang tak perlu lagi disuruh-suruh untuk menuntut ilmu.',
                subjects: [
                    { t: 'Agile L1 - L3', d: 'Resilience, conflict management & continuous learning' },
                    { t: 'Tazkiyatun Nufus', d: 'Integritas, akhlak mulia, dan senantiasa muhasabah diri' },
                    { t: 'Program HSI Akademik', d: 'Membiasakan santri untuk mencari majelis ilmu dan bertanggung jawab sendiri' }
                ]
            }
        };

        function openAlumniTrait(key) {
            if (editMode || commentMode || aiMode) return;
            const data = alumniTraitData[key];
            if (!data) return;

            closeSyllabus();

            const overlay = document.createElement('div');
            overlay.className = 'syllabus-overlay';
            overlay.id = 'syl-overlay';
            overlay.onclick = closeSyllabus;
            document.body.appendChild(overlay);

            const modal = document.createElement('div');
            modal.className = 'syllabus-modal';
            modal.id = 'syl-modal';

            modal.innerHTML = `
                <div class="syl-header">
                    <div class="syl-header-icon" style="background:${data.bgColor}">${data.icon}</div>
                    <div class="syl-header-text">
                        <h2 style="color:${data.color}">${data.title}</h2>
                        <p>${data.subtitle}</p>
                    </div>
                    <button class="syl-close" onclick="closeSyllabus()">âœ•</button>
                </div>
                <div class="syl-body" style="padding: 1.5rem;">
                    <p style="margin-bottom: 1.5rem; line-height: 1.6; color: rgba(255,255,255,0.9);">${data.description}</p>
                    <h3 style="margin-bottom: 1rem; color: ${data.color}; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Pembentuk Profil Ini:</h3>
                    <div class="syl-grid" style="grid-template-columns: 1fr; gap: 0.75rem;">
                        ${data.subjects.map(sub => `
                            <div class="syl-item">
                                <div class="syl-item-title">${sub.t}</div>
                                <div class="syl-item-desc">${sub.d}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const syllabusData = {
            bahasa: {
                icon: 'ðŸ—£ï¸', title: 'Bahasa', color: 'var(--accent-gold)',
                bgColor: 'rgba(245, 158, 11, 0.15)',
                subtitle: 'Progresif: Arab intensif â†’ Inggris aktif â†’ Bilingual sebagai alat kerja',
                tabs: [
                    { label: 'ðŸŸ¡ Kelas 10', key: 'k10' },
                    { label: 'ðŸ”µ Kelas 11', key: 'k11' },
                    { label: 'ðŸ”´ Kelas 12', key: 'k12' }
                ],
                content: {
                    k10: {
                        sections: [
                            {
                                title: 'FASE PERSIAPAN', items: [
                                    { t: 'Bahasa Arab Survival', d: 'Ungkapan dasar kehidupan santri, komunikasi sederhana dalam aktivitas harian.' },
                                    { t: 'Pembiasaan Ungkapan Dasar', d: 'Ungkapan kelas, interaksi harian, respons bahasa Arab yang benar.' },
                                    { t: 'Penguatan Shorof', d: 'Struktur & komponen kata, pola kata, perubahan bentuk kata.' },
                                    { t: 'Pengenalan Nahwu', d: 'Konsep nahwu global, fungsi dalam memahami struktur kalimat.' }
                                ]
                            },
                            {
                                title: 'FASE PEMBENTUKAN â€” ABY (Al-Arabiyyah Bayna Yadayk)', items: [
                                    { t: 'ABY Jilid 1', d: 'Membaca teks sederhana, percakapan dasar, kosakata 500+ kata.' },
                                    { t: 'ABY Jilid 2', d: 'Membaca cerita pendek, menulis paragraf sederhana, percakapan lanjutan.' },
                                    { t: 'ABY Jilid 3', d: 'Membaca artikel, menulis esai pendek, diskusi bahasa Arab.' }
                                ]
                            },
                            {
                                title: 'FASE LANJUTAN â€” Nahwu & Jurumiyah', items: [
                                    { t: 'Nahwu Dasar (Jurumiyah)', d: 'Kalam & bagiannya, tanda-tanda i\'rab, marfu\'at & mansubat.' },
                                    { t: 'Qaidah Samiriyah', d: 'Tahajji (pelafalan huruf Arab) â€” pengenalan bentuk, makhraj, dan tajwid dasar.' }
                                ]
                            }
                        ],
                        output: ['Berani berbahasa Arab', 'Kosakata 1000+ kata', 'Bisa baca kitab sederhana', 'Nahwu dasar terbentuk']
                    },
                    k11: {
                        sections: [
                            {
                                title: 'BAHASA INGGRIS INTENSIF (22 MINGGU)', items: [
                                    { t: 'Foundation (Pekan 1-4)', d: 'Grammar dasar, vocabulary building, reading comprehension dasar.' },
                                    { t: 'Intermediate (Pekan 5-12)', d: 'Academic writing, presentation skills, listening & speaking practice.' },
                                    { t: 'Advanced Practice (Pekan 13-20)', d: 'Essay writing, debate, public speaking, academic reading.' },
                                    { t: 'Assessment (Pekan 21-22)', d: 'Final project + presentasi dalam bahasa Inggris.' }
                                ]
                            },
                            {
                                title: 'MAINTENANCE BAHASA ARAB', items: [
                                    { t: 'Bahasa Arab Pasif', d: 'Tidak ada pelajaran baru, tapi bahasa Arab tetap digunakan di lingkungan pondok dan kajian.' }
                                ]
                            }
                        ],
                        output: ['Bahasa Inggris aktif', 'Bisa presentasi dalam English', 'Global literacy terbentuk', 'Bahasa Arab tetap terjaga']
                    },
                    k12: {
                        sections: [
                            {
                                title: 'BILINGUAL SEBAGAI ALAT KERJA', items: [
                                    { t: 'Bahasa = Alat, Bukan Pelajaran', d: 'Tidak ada kelas bahasa baru. Arab & Inggris melebur 100% menjadi alat kerja di semua mata pelajaran.' },
                                    { t: 'Dokumentasi Proyek Bilingual', d: 'Marketplace Islami di-deploy dengan dokumentasi bilingual (Arab + Inggris).' },
                                    { t: 'Kajian Kitab Langsung', d: 'HSI Akademik 239 Halaqah menggunakan bahasa Arab langsung dari sumber asli.' }
                                ]
                            }
                        ],
                        output: ['Bilingual operasional', 'Baca kitab tanpa terjemah', 'Dokumentasi teknis bilingual', 'Siap lingkungan global']
                    }
                }
            },
            agama: {
                icon: 'ðŸ•Œ', title: 'Ilmu Agama', color: 'var(--accent-violet)',
                bgColor: 'rgba(167, 139, 250, 0.15)',
                subtitle: 'Berjenjang: Mulazamah dasar â†’ Hifdzul Mutun â†’ HSI Akademik komprehensif',
                tabs: [
                    { label: 'ðŸŸ¡ Kelas 10', key: 'k10' },
                    { label: 'ðŸ”µ Kelas 11', key: 'k11' },
                    { label: 'ðŸ”´ Kelas 12', key: 'k12' }
                ],
                content: {
                    k10: {
                        sections: [
                            {
                                title: 'AQIDATUNA â€” Aqidah Islamiyyah (Â±18 Hari)', items: [
                                    { t: 'Marhalah 1: Ushul Aqidah (Hal. 3â€“15)', d: 'Definisi aqidah, Al-Quran & Sunnah, Rukun Islam & Iman, Syahadat, Ibadah.' },
                                    { t: 'Marhalah 2: Tauhid & Syirik (Hal. 16â€“24)', d: 'Asma wa Sifat, Uluw & Istiwa, Syirik, Malaikat.' },
                                    { t: 'Marhalah 3: Manhaj & Akhirat (Hal. 25â€“34)', d: 'Kenabian, Hari Akhir, Takdir, Bid\'ah, Wala wal Bara.' }
                                ]
                            },
                            {
                                title: 'FATHUL ALI â€” Fiqh Ibadah', items: [
                                    { t: 'Fathul Ali (Mulazamah)', d: 'Fiqh ibadah dasar: thaharah, shalat, puasa â€” metode hafalan & pemahaman langsung.' }
                                ]
                            },
                            {
                                title: 'NABIYUNA â€” Sirah Nabi ï·º', items: [
                                    { t: 'Nabiyuna', d: 'Sirah Nabawiyah â€” perjalanan hidup Nabi Muhammad ï·º dari kelahiran hingga wafat.' }
                                ]
                            }
                        ],
                        output: ['Aqidah shahihah manhaj salaf', 'Hafal matan Aqidatuna', 'Fiqh ibadah dasar', 'Mengenal sirah Nabi ï·º']
                    },
                    k11: {
                        sections: [
                            {
                                title: 'HIFDZUL MUTUN â€” 4 Matan Dasar', items: [
                                    { t: 'Ushuluts Tsalatsah', d: '3 Prinsip Pokok: Mengenal Allah, Islam, dan Nabi Muhammad ï·º.' },
                                    { t: 'Al-Qawaid Al-Arba', d: '4 Kaidah syirik yang wajib pahami setiap Muslim.' },
                                    { t: 'Nawaqidhul Islam', d: '10 Pembatal Islam â€” perisai dari pembatal keislaman.' },
                                    { t: '6 Prinsip Pokok (Ushul Sittah)', d: 'Kaidah-kaidah dasar dalam beragama.' }
                                ]
                            },
                            {
                                title: 'SETORAN KE MASJID NABAWIY (DARING)', items: [
                                    { t: 'Setoran Matan ke Masjid Nabawiy', d: 'Santri menyetorkan hafalan matan secara online kepada pengajar di Masjid Nabawiy â€” validasi eksternal.' }
                                ]
                            }
                        ],
                        output: ['Hafal 4 matan dasar', 'Tersertifikasi Masjid Nabawiy', 'Paham kaidah tauhid mendalam', 'Siap level HSI Akademik']
                    },
                    k12: {
                        sections: [
                            {
                                title: 'HSI AKADEMIK â€” SEMESTER 1 (145 Halaqah)', items: [
                                    { t: 'Tafsir (40 Hlq)', d: 'Tafsir Juz 30 â€” memahami makna ayat-ayat pendek yang sering dibaca.' },
                                    { t: 'Fiqh 01 (40 Hlq)', d: 'Fiqh ibadah mendalam: Thaharah â†’ Shalat â†’ Jenazah â†’ Zakat lengkap.' },
                                    { t: 'Aqidah 01 (40 Hlq)', d: 'Pendalaman aqidah: Kaidah Asma wa Sifat, bantahan syubhat modern.' },
                                    { t: 'Hadits (25 Hlq)', d: 'Ilmu Hadits: Musthalah Hadits dasar, klasifikasi hadits, perawi.' }
                                ]
                            },
                            {
                                title: 'HSI AKADEMIK â€” SEMESTER 2 (94 Halaqah)', items: [
                                    { t: 'Aqidah 02 (25 Hlq)', d: 'Lanjutan aqidah: Iman, Kufur, Wala wal Bara level lanjut.' },
                                    { t: 'Fiqh 02 (25 Hlq)', d: 'Fiqh muamalah: Jual-beli, Nikah, Haji, Umrah.' },
                                    { t: 'Tazkiyatun Nufus (24 Hlq)', d: 'Penyucian jiwa terprogram: taubat, khauf, raja, tawakkal, sabar.' },
                                    { t: 'Manhaj (20 Hlq)', d: 'Manhaj Salaf: prinsip beragama, sikap terhadap perbedaan, adab bermanhaj.' }
                                ]
                            }
                        ],
                        output: ['Khatam 239 Halaqah', 'Faqih mandiri (Thaharah â†’ Haji)', 'Aqidah kuat anti-syubhat', 'Berjiwa tazkiyah', 'Habit Lifelong Learner Online']
                    }
                }
            },
            tahfidz: {
                icon: 'ðŸ“–', title: 'Tahfidz Al-Quran', color: 'var(--accent-emerald)',
                bgColor: 'rgba(16, 185, 129, 0.15)',
                subtitle: 'Progresif: Tahsin â†’ Hafal 2-3 Juz â†’ 4-6 Juz â†’ 6-9 Juz Mutqin + Imam Tarawih',
                tabs: [
                    { label: 'ðŸŸ¡ Kelas 10', key: 'k10' },
                    { label: 'ðŸ”µ Kelas 11', key: 'k11' },
                    { label: 'ðŸ”´ Kelas 12', key: 'k12' }
                ],
                content: {
                    k10: {
                        sections: [
                            {
                                title: 'POLA HARIAN TAHFIDZ', items: [
                                    { t: 'ðŸŒ… Subuh (Â±1 jam)', d: 'Hafalan baru â€” target Â±1 halaman per hari.' },
                                    { t: 'ðŸŒ‡ Magrib (Â±45 menit)', d: 'Muroja\'ah & setoran hafalan.' },
                                    { t: 'Tambahan Harian', d: 'Muroja\'ah mandiri antara adzan-iqamah + latihan imam rawatib bergilir.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 1 â€” Tahsin & Juz 30', items: [
                                    { t: 'Tahsin Juz 30', d: 'Perbaikan bacaan (An-Nas â†’ Al-Fajr) + hafalan Juz 30.' },
                                    { t: 'Target', d: 'Minimal 1 juz mutqin, progres menuju 2 juz.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Penyempurnaan', items: [
                                    { t: 'Juz 29 + Juz 28', d: 'Penyempurnaan Juz 29, tambahan Juz 28 (bagi yang mampu).' },
                                    { t: 'Ujian Semester', d: 'Setoran duduk 1 juz + ujian lisan acak 5-7 halaman.' }
                                ]
                            }
                        ],
                        output: ['Hafal 2-3 Juz', 'Tahsin bersertifikasi', 'Terbiasa muroja\'ah harian', 'Imam shalat rawatib']
                    },
                    k11: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Penambahan Hafalan', items: [
                                    { t: 'Tambah +1-2 Juz baru', d: 'Total kumulatif 4-5 juz, dengan muroja\'ah intensif juz lama.' },
                                    { t: 'Peer Teaching', d: 'Santri saling menyimak hafalan â€” melatih tanggung jawab.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Konsolidasi', items: [
                                    { t: 'Muroja\'ah intensif', d: 'Fokus kualitas (mutqin) bukan kuantitas â€” ujian acak lintas juz.' },
                                    { t: 'Imam Rawatib Regular', d: 'Santri sudah menjadi imam rawatib secara rutin.' }
                                ]
                            }
                        ],
                        output: ['Hafal 4-6 Juz', 'Peer Teaching aktif', 'Imam rawatib rutin', 'Kualitas mutqin']
                    },
                    k12: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Sprint Akhir', items: [
                                    { t: 'Tambah +1-2 Juz baru', d: 'Mengejar target 6-9 juz sebelum lulus.' },
                                    { t: 'Persiapan Imam Tarawih', d: 'Latihan intensif untuk menjadi imam tarawih di Ramadan.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Finalisasi', items: [
                                    { t: 'Imam Tarawih', d: 'Tampil sebagai imam tarawih â€” ujian akhir tahfidz yang sesungguhnya.' },
                                    { t: 'Setoran Final', d: 'Setoran duduk seluruh hafalan + ujian lisan komprehensif.' }
                                ]
                            }
                        ],
                        output: ['6-9 Juz Mutqin', 'Imam Tarawih', 'Setoran duduk komprehensif', 'Siap jadi hafidz mandiri']
                    }
                }
            },
            it: {
                icon: 'ðŸ’»', title: 'IT (Rekayasa Digital)', color: 'var(--accent-sky)',
                bgColor: 'rgba(56, 189, 248, 0.15)',
                subtitle: 'Build Real Things: Portfolio â†’ Dashboard â†’ Marketplace Islami berlevel industri',
                tabs: [
                    { label: 'ðŸŸ¡ Kelas 10', key: 'k10' },
                    { label: 'ðŸ”µ Kelas 11', key: 'k11' },
                    { label: 'ðŸ”´ Kelas 12', key: 'k12' }
                ],
                content: {
                    k10: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Fundamental Programming & Web', items: [
                                    { t: 'Fase 1: Logic & Problem Solving', d: 'Flowchart, if-else, looping, function, array â€” CLI dengan Golang.' },
                                    { t: 'Fase 2: Algorithm Foundation', d: 'Linear Search, Bubble Sort, Selection Sort, konsep kompleksitas.' },
                                    { t: 'Fase 3: Web Fundamental', d: 'HTML, CSS, Flexbox, Grid, Responsive Design, Tailwind intro.' },
                                    { t: 'Fase 4: UI/UX Fundamental', d: 'Wireframing, Layout, Typography, Color Theory, Figma.' },
                                    { t: 'ðŸš€ Project: Website Portfolio Statis', d: 'Profil diri + visi hidup + daftar karya + kontak. Tools: HTML, CSS, Figma.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Website Dinamis & Fullstack', items: [
                                    { t: 'Fase 1: JavaScript Foundation', d: 'DOM manipulation, event handling, form validation, to-do list.' },
                                    { t: 'Fase 2: Integrasi API', d: 'Fetch API, async/await, JSON, error handling.' },
                                    { t: 'Fase 3: Backend (Golang)', d: 'Struktur Go project, routing, REST API, CRUD dasar.' },
                                    { t: 'Fase 4: Database (MariaDB)', d: 'Table & relasi, SELECT/INSERT/UPDATE/DELETE, koneksi Go-MariaDB.' },
                                    { t: 'Fase 5: Autentikasi', d: 'Login, hash password, JWT dasar, proteksi route.' },
                                    { t: 'ðŸš€ Project: Portfolio Dinamis Fullstack', d: 'Blog + upload karya + login + dashboard + CRUD + database.' }
                                ]
                            }
                        ],
                        output: ['Website Portfolio Fullstack', 'Paham REST API & CRUD', 'Mental engineer terbentuk', 'Terbiasa debugging']
                    },
                    k11: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” React.js & Frontend Modern', items: [
                                    { t: 'React.js Fundamentals', d: 'Component, props, state, hooks, routing (React Router).' },
                                    { t: 'State Management (Redux)', d: 'Store, actions, reducers, middleware, async thunk.' },
                                    { t: 'ðŸš€ Project: Website Sekolah Dinamis', d: 'Landing page + berita + galeri + kontak â€” built with React.js.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Dashboard RBAC', items: [
                                    { t: 'Dashboard Admin (React + Go Fiber)', d: 'Multi-role system (Admin/Guru/Santri), CRUD data, charts.' },
                                    { t: 'RBAC (Role-Based Access Control)', d: 'Permission system, middleware auth, protected routes.' },
                                    { t: 'ðŸš€ Project: Dashboard Admin Live', d: 'Dashboard sekolah operasional dengan roles & data real.' }
                                ]
                            }
                        ],
                        output: ['Dashboard Admin RBAC', 'React.js + Redux mastery', 'Go Fiber backend', 'Sistem multi-role']
                    },
                    k12: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Marketplace Front-End', items: [
                                    { t: 'Next.js (SSR/SSG)', d: 'App Router, Server Components, API Routes, SEO optimization.' },
                                    { t: 'Payment Gateway Integration', d: 'Midtrans/Xendit, transaction flow, webhook handling.' },
                                    { t: 'ðŸš€ Project: Marketplace Islami (Buyer Side)', d: 'Katalog produk + keranjang + checkout + pembayaran.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Dashboard & DevOps', items: [
                                    { t: 'Dashboard Admin/Seller', d: 'Manajemen produk, order tracking, laporan penjualan.' },
                                    { t: 'Bot Notifikasi', d: 'WhatsApp/Telegram bot untuk notifikasi order & pembayaran.' },
                                    { t: 'ðŸš€ Project Final: Marketplace Islami Live', d: 'Full e-commerce platform â€” buyer + seller + admin + payment + notifikasi.' }
                                ]
                            }
                        ],
                        output: ['Marketplace Islami Live', 'Next.js + Go Fiber mastery', 'Payment gateway integrated', 'Siap magang/kerja']
                    }
                }
            },
            agile: {
                icon: 'ðŸ§ ', title: 'Agile Mindset', color: 'var(--accent-rose)',
                bgColor: 'rgba(251, 113, 133, 0.15)',
                subtitle: 'Berjenjang: Anti-Fragile â†’ Resilience â†’ Leadership & Career Mentorship',
                tabs: [
                    { label: 'ðŸŸ¡ Kelas 10', key: 'k10' },
                    { label: 'ðŸ”µ Kelas 11', key: 'k11' },
                    { label: 'ðŸ”´ Kelas 12', key: 'k12' }
                ],
                content: {
                    k10: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Memahami Agile & Mengelola Pola Pikir', items: [
                                    { t: 'Chapter 1: About Agile', d: 'Why Agile, What is Agile, Agile Mindset, Being & Doing.' },
                                    { t: 'Chapter 2: Anti-Fragile', d: 'Paradox of Happiness, Fake Happiness, Fragile & Robust, Anti-Fragile.' },
                                    { t: 'Chapter 3: Developing Mindset', d: 'ANTs (Automatic Negative Thoughts), Killing ANTs.' },
                                    { t: 'Coaching & Mentoring', d: '1-on-1 Coaching bersama Professional Agile Coach.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Pengendalian Diri & Tujuan Hidup', items: [
                                    { t: 'Chapter 4: Gratification', d: 'Instant Gratification, Marshmallow Research, Delayed Gratification.' },
                                    { t: 'Purpose of Life & Personal Goal', d: 'Clarify Purpose of Life, Develop Personal Goal.' },
                                    { t: 'Project & Simulation', d: 'Praktik Killing ANTs untuk orang lain + menyusun tujuan hidup.' },
                                    { t: 'Evaluasi Akhir', d: '1-on-1 Coaching akhir semester.' }
                                ]
                            }
                        ],
                        output: ['Anti-Fragile mindset', 'Personal Goal tertulis', 'Mampu killing ANTs', 'Pola pikir bertumbuh']
                    },
                    k11: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Resilience & Emotional Intelligence', items: [
                                    { t: 'Resilience Framework', d: 'Bounce back dari kegagalan, growth through adversity.' },
                                    { t: 'Emotional Intelligence', d: 'Self-awareness, self-regulation, empathy, social skills.' },
                                    { t: 'Zuhud & Detachment', d: 'Tidak terikat dunia, fokus akhirat tanpa meninggalkan dunia.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Team Dynamics', items: [
                                    { t: 'Team Building', d: 'Trust, accountability, collaborative problem solving.' },
                                    { t: 'Conflict Management', d: 'Mengelola konflik sehat, feedback loop, win-win solutions.' }
                                ]
                            }
                        ],
                        output: ['Resilient & adaptif', 'EQ tinggi', 'Mampu kelola konflik', 'Team player']
                    },
                    k12: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Leadership & Design Thinking', items: [
                                    { t: 'Servant Leadership', d: 'Memimpin dengan melayani, bukan memerintah.' },
                                    { t: 'Design Thinking', d: 'Empathize â†’ Define â†’ Ideate â†’ Prototype â†’ Test.' },
                                    { t: 'Conflict Resolution Advanced', d: 'Mediator, win-win negotiation, stakeholder management.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Career Mentorship', items: [
                                    { t: 'Career Roadmap', d: 'Mapping karir 5-10 tahun ke depan, skill gap analysis.' },
                                    { t: 'Personal Branding', d: 'Portfolio curation, LinkedIn, public profile.' },
                                    { t: 'Final Coaching', d: 'Exit coaching â€” kesiapan hidup pasca-pondok.' }
                                ]
                            }
                        ],
                        output: ['Servant leader', 'Career roadmap jelas', 'Personal brand kuat', 'Siap hidup mandiri']
                    }
                }
            },
            hadits: {
                icon: 'ðŸ“œ', title: 'Hadits Arba\'in', color: 'var(--accent-gold)',
                bgColor: 'rgba(245, 158, 11, 0.15)',
                subtitle: '50 Hadits Pilihan â€” dari fondasi karakter hingga visi akhirat',
                tabs: [
                    { label: 'ðŸŸ¡ Kelas 10 (Hadits 1-16)', key: 'k10' },
                    { label: 'ðŸ”µ Kelas 11 (Hadits 17-32)', key: 'k11' },
                    { label: 'ðŸ”´ Kelas 12 (Hadits 33-50)', key: 'k12' }
                ],
                content: {
                    k10: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Pondasi Iman & Niat (Hadits 1-8)', items: [
                                    { t: 'Hadits 1: Niat', d: 'Pentingnya niat dalam setiap amal â€” evaluasi & meluruskan niat.' },
                                    { t: 'Hadits 2: Islam, Iman, Ihsan', d: 'Tiga pilar agama â€” mengaitkan ihsan dengan kedisiplinan.' },
                                    { t: 'Hadits 3: Rukun Islam', d: 'Pondasi amal â€” evaluasi kualitas ibadah wajib.' },
                                    { t: 'Hadits 4: Tahapan Penciptaan', d: 'Takdir & tanggung jawab â€” optimis tanpa pasif.' },
                                    { t: 'Hadits 5: Larangan Bid\'ah', d: 'Komitmen terhadap Sunnah, sikap ittiba.' },
                                    { t: 'Hadits 6: Halal & Haram', d: 'Batasan halal-haram-syubhat, kehati-hatian.' },
                                    { t: 'Hadits 7: Nasihat', d: 'Agama adalah nasihat â€” adab memberi & menerima.' },
                                    { t: 'Hadits 8: Syahadat & Tauhid', d: 'Kedudukan tauhid, komitmen prinsip agama.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Adab & Akhlak (Hadits 9-16)', items: [
                                    { t: 'Hadits 9: Tinggalkan yang Meragukan', d: 'Wara\' â€” menjauhi syubhat.' },
                                    { t: 'Hadits 10: Allah itu Baik', d: 'Keikhlasan amal & kebersihan sumber rezeki.' },
                                    { t: 'Hadits 11: Tinggalkan yang Tidak Bermanfaat', d: 'Produktivitas & manajemen waktu.' },
                                    { t: 'Hadits 12: Tidak Sempurna Iman', d: 'Iman & kepedulian sosial â€” empati.' },
                                    { t: 'Hadits 13: Haramnya Darah & Harta', d: 'Menjaga hak orang lain â€” amanah.' },
                                    { t: 'Hadits 14: Hak Muslim atas Muslim', d: 'Adab sosial dalam kehidupan pondok.' },
                                    { t: 'Hadits 15: Berkata Baik atau Diam', d: 'Kontrol lisan dalam pergaulan.' },
                                    { t: 'Hadits 16: Jangan Marah', d: 'Kontrol emosi â€” sabar dalam interaksi.' }
                                ]
                            }
                        ],
                        output: ['Lurus Niat', 'Kokoh Prinsip', 'Bersih Akhlak', 'Terkontrol Emosi']
                    },
                    k11: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Zuhud & Tawakkal (Hadits 17-24)', items: [
                                    { t: 'Hadits 17-20: Ihsan & Taqwa', d: 'Ihsan dalam muamalah, bertaqwa di mana saja, menghapus dosa dengan kebaikan.' },
                                    { t: 'Hadits 21-24: Iman & Zuhud', d: 'Istiqamah, mencintai Allah, zuhud, tawakkal, berpegang pada Quran & Sunnah.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Sosial & Kedewasaan (Hadits 25-32)', items: [
                                    { t: 'Hadits 25-28: Amal Sosial', d: 'Sedekah, mendamaikan, menghilangkan kemungkaran, adab bermasyarakat.' },
                                    { t: 'Hadits 29-32: Kedewasaan', d: 'Menjaga yang wajib, meninggalkan yang haram, tidak berbuat mudarat.' }
                                ]
                            }
                        ],
                        output: ['Zuhud & tawakkal', 'Istiqamah', 'Aktif sosial', 'Bermental dewasa']
                    },
                    k12: {
                        sections: [
                            {
                                title: 'SEMESTER 1 â€” Visi Masa Depan (Hadits 33-41)', items: [
                                    { t: 'Hadits 33-37', d: 'La dharar, bayyinah, amar ma\'ruf â€” prinsip hukum Islam yang membentuk visi.' },
                                    { t: 'Hadits 38-41', d: 'Wali Allah, toleransi, dunia ladang akhirat, mengikuti Sunnah.' }
                                ]
                            },
                            {
                                title: 'SEMESTER 2 â€” Pematangan Final (Hadits 42-50)', items: [
                                    { t: 'Hadits 42-46', d: 'Ampunan Allah, keluasan rahmat, keutamaan ilmu, menjaga kehormatan.' },
                                    { t: 'Hadits 47-50 + Setoran Duduk', d: 'Akhirat sebagai tujuan, mahabbah fillah â€” setoran duduk 50 hadits + Ibnu Rajab.' }
                                ]
                            }
                        ],
                        output: ['Hafal 50 Hadits', 'Setoran Duduk + Ibnu Rajab', 'Visi akhirat kokoh', 'Karakter paripurna']
                    }
                }
            }
        };

        function openSyllabus(key) {
            if (editMode || commentMode || aiMode) return;
            const data = syllabusData[key];
            if (!data) return;

            closeSyllabus();

            const overlay = document.createElement('div');
            overlay.className = 'syllabus-overlay';
            overlay.id = 'syl-overlay';
            overlay.onclick = closeSyllabus;
            document.body.appendChild(overlay);

            const modal = document.createElement('div');
            modal.className = 'syllabus-modal';
            modal.id = 'syl-modal';

            const firstTab = data.tabs[0].key;
            modal.innerHTML = `
                <div class="syl-header">
                    <div class="syl-header-icon" style="background:${data.bgColor}">${data.icon}</div>
                    <div class="syl-header-text">
                        <h2 style="color:${data.color}">${data.title}</h2>
                        <p>${data.subtitle}</p>
                    </div>
                    <button class="syl-close" onclick="closeSyllabus()">âœ•</button>
                </div>
                <div class="syl-tabs" id="syl-tabs">
                    ${data.tabs.map((tab, i) => `<button class="syl-tab ${i === 0 ? 'active' : ''}" onclick="switchSylTab('${key}','${tab.key}',this)">${tab.label}</button>`).join('')}
                </div>
                <div class="syl-body" id="syl-body">
                    ${renderSylContent(data.content[firstTab], data.color)}
                </div>
            `;
            document.body.appendChild(modal);
        }

        function renderSylContent(content, color) {
            let html = '';
            content.sections.forEach(sec => {
                html += `<div class="syl-section">
                    <div class="syl-section-title">${sec.title}</div>
                    <div class="syl-grid">
                        ${sec.items.map(item => `
                            <div class="syl-item">
                                <div class="syl-item-title">${item.t}</div>
                                <div class="syl-item-desc">${item.d}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            });
            if (content.output) {
                html += `<div class="syl-output">
                    <div class="syl-output-label">ðŸŽ“ Output & Capaian</div>
                    <div class="syl-output-tags">
                        ${content.output.map(o => `<span class="syl-output-tag">${o}</span>`).join('')}
                    </div>
                </div>`;
            }
            return html;
        }

        function switchSylTab(key, tabKey, btn) {
            const data = syllabusData[key];
            document.querySelectorAll('.syl-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('syl-body').innerHTML = renderSylContent(data.content[tabKey], data.color);
        }

        function closeSyllabus() {
            const modal = document.getElementById('syl-modal');
            const overlay = document.getElementById('syl-overlay');
            if (modal) modal.remove();
            if (overlay) overlay.remove();
        }

        // Close syllabus on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSyllabus();
            
            // Ctrl+S to download
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                downloadHTML();
            }
        });

        // ===== INITIAL REVEAL =====
        window.addEventListener('DOMContentLoaded', () => {
            // Load saved changes from localStorage
            loadSavedChanges();
            
            // Setup auto-save listeners
            setupAutoSave();
            
            const allReveals = document.querySelectorAll('.reveal');
            allReveals.forEach((el, i) => {
                el.style.transitionDelay = (i * 0.08) + 's';
                setTimeout(() => el.classList.add('visible'), 100);
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.05 });
            allReveals.forEach(el => observer.observe(el));
        });
    
