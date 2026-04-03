import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Sparkles, ArrowRight, MapPin, Clock, Star, ChevronDown } from 'lucide-react'
import styles from './LandingPage.module.css'

const FEATURES = [
    { icon: '🗺️', title: 'Mind Map Interaktif', desc: 'Visualisasi pilar-pilar keunggulan sekolah Anda dalam diagram yang elegan dan mudah dipresentasikan.' },
    { icon: '📅', title: 'Timeline Pendidikan', desc: 'Perjalanan belajar per tahun/semester yang terstruktur, dari orientasi hingga kelulusan.' },
    { icon: '🎯', title: '9 Core Skills Alumni', desc: 'Profil lengkap kemampuan inti yang akan dimiliki setiap lulusan sekolah Anda.' },
    { icon: '🧭', title: 'Visi & Misi Otomatis', desc: 'Pernyataan visi, misi, dan tujuan yang powerful, ditulis AI berdasarkan wawancara mendalam.' },
]

const STEPS = [
    { num: '01', title: 'Ceritakan Visi Anda', desc: 'Ngobrol dengan AI selama 5-10 menit. Ceritakan impian, nilai, dan fokus sekolah Anda.' },
    { num: '02', title: 'AI Memproses', desc: 'AI menganalisis seluruh percakapan dan merancang blueprint komprehensif untuk Anda.' },
    { num: '03', title: 'Blueprint Siap!', desc: 'Dapatkan 4 artefak visual yang siap dipresentasikan kepada stakeholder dan dinas pendidikan.' },
]

export default function LandingPage() {
    const { user } = useAuth()

    return (
        <div className={styles.page}>
            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgOrb1} />
                <div className={styles.bgOrb2} />
                <div className={styles.bgGrid} />
            </div>

            {/* Navbar */}
            <nav className={styles.nav}>
                <div className={styles.navInner}>
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🏫</span>
                        <span className="gradient-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700 }}>Rancang Sekolah</span>
                    </Link>
                    <div className={styles.navLinks}>
                        {user ? (
                            <Link to="/dashboard" className="btn btn-primary">
                                Ke Dashboard <ArrowRight size={16} />
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost">Masuk</Link>
                                <Link to="/login?mode=signup" className="btn btn-primary">
                                    Mulai Gratis <Sparkles size={16} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.heroContent}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className={styles.heroBadge}
                    >
                        <Sparkles size={14} />
                        <span>Didukung Kecerdasan Buatan (AI)</span>
                    </motion.div>

                    <h1 className={styles.heroTitle}>
                        <span style={{ fontFamily: 'var(--font-serif)' }}>Rancang Blueprint</span>
                        <br />
                        <span className="gradient-text" style={{ fontFamily: 'var(--font-serif)' }}>Sekolah Impian Anda</span>
                        <br />
                        <span style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 400, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>dalam 10 Menit, Bersama AI</span>
                    </h1>

                    <p className={styles.heroDesc}>
                        Cukup ceritakan visi dan nilai sekolah Anda kepada AI.
                        Kami akan otomatis menghasilkan <strong>mind map, timeline, core skills,</strong> dan <strong>visi-misi</strong> yang siap dipresentasikan.
                    </p>

                    <div className={styles.heroCta}>
                        <Link to={user ? '/dashboard' : '/login?mode=signup'} className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                            Mulai Merancang Sekarang
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/login" className="btn btn-secondary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                            Lihat Contoh Blueprint
                        </Link>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}><MapPin size={14} /><span>Dibuat untuk Sekolah Indonesia</span></div>
                        <div className={styles.statDot} />
                        <div className={styles.stat}><Clock size={14} /><span>Selesai dalam 10 Menit</span></div>
                        <div className={styles.statDot} />
                        <div className={styles.stat}><Star size={14} /><span>Gratis untuk Memulai</span></div>
                    </div>
                </motion.div>

                {/* Hero Preview Card */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.heroPreview}
                >
                    <div className={`glass-card glow-gold ${styles.previewCard}`}>
                        <div className={styles.previewHeader}>
                            <div className={styles.previewDots}>
                                <span style={{ background: '#fb7185' }} />
                                <span style={{ background: '#c9a84c' }} />
                                <span style={{ background: '#34d399' }} />
                            </div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Blueprint Preview</span>
                        </div>
                        <div className={styles.previewTabs}>
                            {['🗺️ Mind Map', '📅 Timeline', '🎯 Skills', '🧭 Visi Misi'].map((t, i) => (
                                <span key={i} className={`${styles.previewTab} ${i === 0 ? styles.previewTabActive : ''}`}>{t}</span>
                            ))}
                        </div>
                        <div className={styles.previewBody}>
                            <div className={styles.previewTitle}>SMA IT Harapan Bangsa</div>
                            <div className={styles.previewPillars}>
                                {['🕌 Spiritual', '📚 Akademik', '👑 Kepemimpinan', '💻 Digital', '🌿 Kesehatan'].map((p, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className={styles.previewPillar}
                                    >
                                        {p}
                                    </motion.div>
                                ))}
                            </div>
                            <div className={styles.previewGenerating}>
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={styles.previewDot}
                                />
                                <span>Blueprint siap diunduh</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={styles.scrollIndicator}
            >
                <ChevronDown size={20} />
            </motion.div>

            {/* Features */}
            <section className={styles.section}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={styles.sectionHeader}
                >
                    <p className={styles.sectionLabel}>Yang Anda Dapatkan</p>
                    <h2 className={`${styles.sectionTitle} font-serif`}>4 Artefak Visual <span className="gradient-text">dalam Sekejap</span></h2>
                </motion.div>
                <div className={styles.featuresGrid}>
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`glass-card ${styles.featureCard}`}
                            whileHover={{ y: -4, borderColor: 'var(--border-glow)' }}
                        >
                            <div className={styles.featureIcon}>{f.icon}</div>
                            <h3 className={styles.featureTitle}>{f.title}</h3>
                            <p className={styles.featureDesc}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className={styles.section}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.sectionHeader}
                >
                    <p className={styles.sectionLabel}>Cara Kerja</p>
                    <h2 className={`${styles.sectionTitle} font-serif`}>Semudah <span className="gradient-text">Bercerita</span></h2>
                </motion.div>
                <div className={styles.stepsGrid}>
                    {STEPS.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className={styles.step}
                        >
                            <div className={styles.stepNum}>{s.num}</div>
                            <div>
                                <h3 className={styles.stepTitle}>{s.title}</h3>
                                <p className={styles.stepDesc}>{s.desc}</p>
                            </div>
                            {i < STEPS.length - 1 && <div className={styles.stepLine} />}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.ctaCard}
                >
                    <div className={styles.ctaGlow} />
                    <p className={styles.sectionLabel} style={{ marginBottom: 16 }}>Siap Memulai?</p>
                    <h2 className={`font-serif`} style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>
                        Wujudkan Sekolah Impian Anda <br />
                        <span className="gradient-text">Hari Ini Juga</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
                        Bergabunglah dengan ratusan kepala sekolah dan konsultan pendidikan yang telah menggunakan Rancang Sekolah untuk merancang masa depan pendidikan Indonesia.
                    </p>
                    <Link to={user ? '/dashboard' : '/login?mode=signup'} className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 40px' }}>
                        Mulai Gratis Sekarang
                        <Sparkles size={18} />
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <span className="gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>Rancang Sekolah</span>
                <span style={{ color: 'var(--text-muted)' }}>© 2026 · Dibuat dengan ❤️ untuk Pendidikan Indonesia</span>
            </footer>
        </div>
    )
}


