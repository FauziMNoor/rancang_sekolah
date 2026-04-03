import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, CalendarDays, Star, Compass, Loader2, Sparkles, Send, GraduationCap, Route, BarChart3, BookOpen } from 'lucide-react'
import MindMapView from './views/MindMapView'
import TimelineView from './views/TimelineView'
import CoreSkillsView from './views/CoreSkillsView'
import VisiMisiView from './views/VisiMisiView'
import ProfilAlumniView from './views/ProfilAlumniView'
import RoadmapView from './views/RoadmapView'
import DiferensiasiView from './views/DiferensiasiView'
import KurikulumView from './views/KurikulumView'
import styles from './PreviewPanel.module.css'

const TABS = [
    { id: 'mindmap', label: 'Mind Map', icon: Map, shortLabel: '🗺️' },
    { id: 'timeline', label: 'Timeline', icon: CalendarDays, shortLabel: '📅' },
    { id: 'coreskills', label: 'Core Skills', icon: Star, shortLabel: '🎯' },
    { id: 'visimisi', label: 'Visi & Misi', icon: Compass, shortLabel: '🧭' },
    { id: 'kurikulum', label: 'Kurikulum', icon: BookOpen, shortLabel: '📚' },
    { id: 'profilalumni', label: 'Profil Alumni', icon: GraduationCap, shortLabel: '🎓' },
    { id: 'roadmap', label: 'Roadmap', icon: Route, shortLabel: '🗺️' },
    { id: 'diferensiasi', label: 'Diferensiasi', icon: BarChart3, shortLabel: '📊' },
]

export default function PreviewPanel({ blueprint, isGenerating, loadingMessage, blueprintReady, onAIHighlight }) {
    const [activeTab, setActiveTab] = useState('mindmap')
    const [selection, setSelection] = useState(null)
    const [inlineInput, setInlineInput] = useState('')
    const inlineInputRef = useRef(null)

    useEffect(() => {
        const handleMouseUp = () => {
            const sel = window.getSelection()
            if (sel && sel.toString().trim().length > 0) {
                // Ensure the selection is within our panel logic
                const range = sel.getRangeAt(0)
                const rect = range.getBoundingClientRect()

                // Hide if it's too weird (like selecting input boxes)
                if (rect.width === 0) {
                    return;
                }

                setSelection({
                    text: sel.toString().trim(),
                    x: rect.left + rect.width / 2,
                    y: rect.top
                })
            } else if (document.activeElement !== inlineInputRef.current) {
                // Sembunyikan popup hanya jika klik di luar dan input field sedang tidak fokus
                setSelection(null)
            }
        }

        document.addEventListener('mouseup', handleMouseUp)
        return () => document.removeEventListener('mouseup', handleMouseUp)
    }, [])

    const handleAISendInline = (e) => {
        e?.preventDefault()
        if (selection && onAIHighlight && inlineInput.trim()) {
            onAIHighlight(selection.text, inlineInput.trim())
            setSelection(null)
            setInlineInput('')
            window.getSelection()?.removeAllRanges()
        }
    }

    if (!blueprintReady) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyInner}>
                    {isGenerating && loadingMessage ? (
                        <motion.div
                            key={loadingMessage.text}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={styles.generatingState}
                        >
                            <motion.div
                                className={styles.generatingIcon}
                                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                {loadingMessage.icon}
                            </motion.div>
                            <div className={styles.generatingText}>{loadingMessage.text}</div>
                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '85%' }}
                                    transition={{ duration: 5, ease: 'easeInOut' }}
                                />
                            </div>
                            <div className={styles.generatingSubtext}>Mohon tunggu, AI sedang bekerja untuk Anda...</div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={styles.waitingState}
                        >
                            <div className={styles.waitingPulse}>
                                <motion.div
                                    className={styles.pulseRing}
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <span style={{ fontSize: 40 }}>✏️</span>
                            </div>
                            <h3 className={styles.waitingTitle}>Blueprint Akan Muncul Di Sini</h3>
                            <p className={styles.waitingDesc}>
                                Jawab pertanyaan AI di sebelah kiri, dan blueprint sekolah Anda akan dihasilkan secara otomatis.
                            </p>
                            <div className={styles.waitingFeatures}>
                                {['🗺️ Mind Map', '📅 Timeline', '🎯 Core Skills', '🧭 Visi & Misi', '📚 Kurikulum', '🎓 Profil Alumni', '🗺️ Peta Jalan', '📊 Diferensiasi'].map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.15 + 0.3 }}
                                        className={styles.waitingFeature}
                                    >
                                        {f}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.panel}>
            {/* Tab Navigation */}
            <div className={styles.tabs}>
                {TABS.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            id={`tab-${tab.id}`}
                        >
                            <Icon size={15} />
                            <span className={styles.tabLabel}>{tab.label}</span>
                            <span className={styles.tabShort}>{tab.shortLabel}</span>
                            {activeTab === tab.id && (
                                <motion.div
                                    className={styles.tabIndicator}
                                    layoutId="tabIndicator"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div className={styles.content} id="pdf-export-content" style={{ padding: '20px', backgroundColor: 'var(--bg-primary)' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: '100%' }}
                    >
                        {activeTab === 'mindmap' && <MindMapView data={blueprint?.data_mindmap} />}
                        {activeTab === 'timeline' && <TimelineView data={blueprint?.data_timeline} />}
                        {activeTab === 'coreskills' && <CoreSkillsView data={blueprint?.data_coreskills} />}
                        {activeTab === 'visimisi' && <VisiMisiView data={blueprint?.data_visimisi} />}
                        {activeTab === 'kurikulum' && <KurikulumView data={blueprint?.data_kurikulum} />}
                        {activeTab === 'profilalumni' && <ProfilAlumniView data={blueprint?.data_profil_alumni} />}
                        {activeTab === 'roadmap' && <RoadmapView data={blueprint?.data_roadmap} />}
                        {activeTab === 'diferensiasi' && <DiferensiasiView data={blueprint?.data_diferensiasi} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* AI Highlight Toolbar */}
            <AnimatePresence>
                {selection && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, x: '-50%', y: '-100%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%', y: '-100%' }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, x: '-50%', y: '-100%' }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={styles.selectionToolbar}
                        style={{
                            position: 'fixed',
                            left: selection.x,
                            top: selection.y - 12, // slightly above the selection
                        }}
                    >
                        <form onSubmit={handleAISendInline} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', color: 'var(--accent-gold)' }}>
                                <Sparkles size={14} />
                            </div>
                            <input
                                ref={inlineInputRef}
                                type="text"
                                className={styles.inlineChatInput}
                                placeholder="Tanya AI tentang teks ini..."
                                value={inlineInput}
                                onChange={(e) => setInlineInput(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className={styles.inlineSendBtn}
                                disabled={!inlineInput.trim() || isGenerating}
                            >
                                <Send size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


