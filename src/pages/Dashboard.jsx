import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import { supabase } from '../lib/supabase'
import { Plus, FileText, Clock, CheckCircle, ChevronRight, LogOut, Sparkles, Trash2, Loader2, Settings, X } from 'lucide-react'
import styles from './Dashboard.module.css'

const STATUS_MAP = {
    completed: { label: 'Selesai', color: 'var(--accent-emerald)', icon: CheckCircle },
    draft: { label: 'Draft', color: 'var(--accent-gold)', icon: Clock },
    generating: { label: 'Generating...', color: 'var(--accent-blue)', icon: Sparkles },
}

function formatDate(isoString) {
    if (!isoString) return '-'
    return new Date(isoString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Dashboard() {
    const { user, signOut } = useAuth()
    const { toggleSettings } = useSettings()
    const navigate = useNavigate()

    const [blueprints, setBlueprints] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(null)
    const [creating, setCreating] = useState(false)

    // New Blueprint Modal State
    const [showNewModal, setShowNewModal] = useState(false)
    const [newSchoolName, setNewSchoolName] = useState('')

    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna'

    // Fetch data nyata dari Supabase
    useEffect(() => {
        const fetchBlueprints = async () => {
            if (!user) return
            setLoading(true)
            const { data, error } = await supabase
                .from('blueprints')
                .select('*')
                .order('updated_at', { ascending: false })

            if (!error && data) {
                setBlueprints(data)
            }
            setLoading(false)
        }

        fetchBlueprints()
    }, [user])

    const handleNewClick = () => {
        setNewSchoolName('')
        setShowNewModal(true)
    }

    const handleCreateBlueprint = async (e) => {
        e.preventDefault()
        const schoolName = newSchoolName.trim() || 'Sekolah Impian Baru'

        setCreating(true)
        // Buat record kosong (draft) di Supabase lalu arahkan ke builder
        const { data, error } = await supabase
            .from('blueprints')
            .insert([{ user_id: user.id, title: schoolName, status: 'draft' }])
            .select()
            .single()

        setCreating(false)

        if (!error && data) {
            setShowNewModal(false)
            navigate(`/builder/${data.id}`, { state: { blueprint: data } })
        } else {
            console.error(error)
            alert('Gagal membuat blueprint baru: ' + (error?.message || 'Error Jaringan'))
        }
    }

    const handleOpen = (bp) => {
        navigate(`/builder/${bp.id}`, { state: { blueprint: bp } })
    }

    const handleDelete = async (id) => {
        setDeleting(id)

        // Hapus dari Supabase DB
        const { error } = await supabase.from('blueprints').delete().eq('id', id)

        if (!error) {
            setBlueprints(prev => prev.filter(b => b.id !== id))
        }
        setDeleting(null)
    }

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <div className={styles.page}>
            <div className={styles.bg}>
                <div className={styles.bgOrb} />
            </div>

            <header className={styles.topbar}>
                <div className={styles.topbarInner}>
                    <Link to="/" className={styles.logo}>
                        <span>🏫</span>
                        <span className="gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '18px' }}>Rancang Sekolah</span>
                    </Link>
                    <div className={styles.topbarRight}>
                        <div className={styles.userBadge}>
                            <div className={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
                            <span className={styles.userName}>{userName}</span>
                        </div>
                        <button className="btn btn-ghost" onClick={toggleSettings} id="settings-btn" title="Pengaturan AI">
                            <Settings size={16} />
                        </button>
                        <button className="btn btn-ghost" onClick={handleSignOut} id="signout-btn">
                            <LogOut size={16} />
                            <span>Keluar</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.pageHeader}
                >
                    <div>
                        <h1 className={styles.pageTitle} style={{ fontFamily: 'var(--font-serif)' }}>
                            Selamat datang, <span className="gradient-text">{userName}</span> 👋
                        </h1>
                        <p className={styles.pageSubtitle}>
                            Kelola dan rancang blueprint sekolah Anda bersama AI
                        </p>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className={styles.statsRow}>
                    {[
                        { label: 'Total Blueprint', value: blueprints.length, color: 'var(--accent-gold)' },
                        { label: 'Selesai', value: blueprints.filter(b => b.status === 'completed').length, color: 'var(--accent-emerald)' },
                        { label: 'Draft', value: blueprints.filter(b => b.status === 'draft').length, color: 'var(--accent-blue)' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className={`glass-card ${styles.statCard}`}
                        >
                            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
                            <div className={styles.statLabel}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Blueprints Grid */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FileText size={18} />
                        Blueprint Anda
                    </h2>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--accent-gold)' }}>
                            <Loader2 size={32} className="spin" />
                        </div>
                    ) : blueprints.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={styles.empty}
                        >
                            <span style={{ fontSize: 48 }}>📋</span>
                            <p>Belum ada blueprint yang tersimpan. Mulai sekarang!</p>
                            <button className="btn btn-primary" onClick={handleNewClick}>
                                <Plus size={16} /> Buat Blueprint Pertama
                            </button>
                        </motion.div>
                    ) : (
                        <div className={styles.grid}>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`glass-card ${styles.newCard}`}
                                onClick={handleNewClick}
                                id="new-blueprint-card"
                                whileHover={{ scale: 1.02, borderColor: 'var(--border-glow)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={styles.newCardIcon}>
                                    <Plus size={28} />
                                </div>
                                <span className={styles.newCardLabel}>Rancang Blueprint Baru</span>
                                <span className={styles.newCardSub}>Chat dengan AI ~10 menit</span>
                            </motion.button>

                            <AnimatePresence>
                                {blueprints.map((bp, i) => {
                                    const status = STATUS_MAP[bp.status] || STATUS_MAP.draft
                                    const StatusIcon = status.icon
                                    return (
                                        <motion.div
                                            key={bp.id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: deleting === bp.id ? 0 : 1, y: 0, scale: deleting === bp.id ? 0.95 : 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: (i + 1) * 0.08, duration: 0.4 }}
                                            className={`glass-card ${styles.bpCard}`}
                                            whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.2)' }}
                                        >
                                            <div className={styles.bpCardHeader}>
                                                <div className={styles.bpIcon}>📄</div>
                                                <div className={styles.bpStatus} style={{ color: status.color, background: `${status.color}15`, borderColor: `${status.color}30` }}>
                                                    <StatusIcon size={12} />
                                                    {status.label}
                                                </div>
                                            </div>

                                            <div className={styles.bpBody}>
                                                <h3 className={styles.bpTitle}>{bp.title}</h3>
                                                <p className={styles.bpDate}>{formatDate(bp.updated_at)}</p>

                                                {bp.data_mindmap && (
                                                    <div className={styles.bpPillars}>
                                                        {bp.data_mindmap.pillars?.slice(0, 3).map((p, pi) => (
                                                            <span key={pi} className={styles.bpPillar}>{p.icon} {p.title}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.bpActions}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleOpen(bp)}
                                                    id={`open-bp-${bp.id}`}
                                                    style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
                                                >
                                                    {bp.status === 'completed' ? 'Lihat/Edit' : 'Lanjutkan'}
                                                    <ChevronRight size={16} />
                                                </button>
                                                <button
                                                    className={`btn btn-ghost ${styles.deleteBtn}`}
                                                    onClick={() => handleDelete(bp.id)}
                                                    id={`delete-bp-${bp.id}`}
                                                    disabled={deleting === bp.id}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </section>
            </main>

            {/* Modal Blueprint Baru */}
            <AnimatePresence>
                {showNewModal && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        >
                            <div className={styles.modalHeader}>
                                <h2>Rancang Blueprint Baru</h2>
                                <button className={styles.closeBtn} onClick={() => setShowNewModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleCreateBlueprint}>
                                <div className={styles.modalBody}>
                                    <label>Nama Sekolah Impian Anda</label>
                                    <input
                                        type="text"
                                        placeholder="Cth: SD Islam Terpadu An-Nur"
                                        value={newSchoolName}
                                        onChange={e => setNewSchoolName(e.target.value)}
                                        className={styles.modalInput}
                                        autoFocus
                                    />
                                    <p className={styles.inputHint}>
                                        Saran: Gunakan nama yang spesifik untuk mempermudah identifikasi blueprint Anda nantinya.
                                    </p>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => setShowNewModal(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!newSchoolName.trim() || creating}
                                    >
                                        {creating ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
                                        {creating ? 'Membuka Asisten...' : 'Mulai Merancang'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


