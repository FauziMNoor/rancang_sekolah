import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2, X, AlertCircle } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'
import styles from './SettingsModal.module.css'

export default function SettingsModal() {
    const { settings, updateSettings, isSettingsOpen, toggleSettings } = useSettings()

    // Form states
    const [apiKey, setApiKey] = useState(settings.apiKey)
    const [baseUrl, setBaseUrl] = useState(settings.baseUrl)
    const [aiModel, setAiModel] = useState(settings.aiModel)

    // Memastikan form selalu mamasok data terbaru dari localStorage tiap kali modal terbuka
    useEffect(() => {
        if (isSettingsOpen) {
            setApiKey(settings.apiKey || '')
            setBaseUrl(settings.baseUrl || 'https://api.openai.com/v1')
            setAiModel(settings.aiModel || 'gpt-4o')
        }
    }, [isSettingsOpen, settings])

    const handleSave = () => {
        updateSettings({ apiKey, baseUrl, aiModel })
        toggleSettings() // Tutup layar jika berhasil disimpan
    }

    return (
        <AnimatePresence>
            {isSettingsOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={styles.modal}
                    >
                        <div className={styles.header}>
                            <div className={styles.titleGroup}>
                                <div className={styles.iconWrap}>
                                    <Settings2 size={20} />
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-serif)' }}>Kredensial AI Model</h2>
                            </div>
                            <button className={styles.closeBtn} onClick={toggleSettings}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className={styles.body}>
                            <div className={styles.providerHint}>
                                <AlertCircle size={14} style={{ display: 'inline', marginBottom: '-2px', marginRight: '6px' }} />
                                Konfigurasi di bawah bersifat <strong>lokal (tersimpan otomatis di browser)</strong>. Sangat aman dan mengizinkan Anda menggunakan <em>provider</em> apa pun (OpenAI, Anthropic, atau model Custom LLM Pribadi).
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Base URL API</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="https://api.openai.com/v1"
                                    value={baseUrl}
                                    onChange={(e) => setBaseUrl(e.target.value)}
                                />
                                <span className={styles.hint}>Ubah URL jika Anda memakai Proxy atau model Lokal (Ollama).</span>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Nama Model (LLM Model)</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="gpt-4o / claude-3-opus-20240229"
                                    value={aiModel}
                                    onChange={(e) => setAiModel(e.target.value)}
                                />
                                <span className={styles.hint}>Ketikkan kode model target secara presisi, misalnya <code style={{ color: 'var(--accent-gold)' }}>gpt-3.5-turbo</code></span>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>API Key / Secret Token</label>
                                <input
                                    type="password"
                                    className={styles.input}
                                    placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <span className={styles.hint}>Kunci akses unik dari provider AI Anda.</span>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <button className="btn btn-ghost" onClick={toggleSettings}>Batal</button>
                            <button className="btn btn-primary" onClick={handleSave}>Simpan Kredensial</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}


