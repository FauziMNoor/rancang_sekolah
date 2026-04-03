import { motion } from 'framer-motion'
import styles from './VisiMisiView.module.css'

export default function VisiMisiView({ data }) {
    if (!data) return null

    return (
        <div className={styles.container}>
            {/* Visi */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.visiCard}
            >
                <div className={styles.visiLabel}>🧭 Visi</div>
                <blockquote className={styles.visiText}>
                    "{data.visi}"
                </blockquote>
                <div className={styles.visiDecor} />
            </motion.div>

            {/* Misi */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className={styles.section}
            >
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionIcon}>📋</span>
                    <h2 className={styles.sectionTitle}>Misi</h2>
                </div>
                <div className={styles.misiList}>
                    {data.misi?.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                            className={styles.misiItem}
                        >
                            <span className={styles.misiNum}>{i + 1}</span>
                            <span className={styles.misiText}>{m}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Tujuan */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={styles.section}
            >
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionIcon}>🎯</span>
                    <h2 className={styles.sectionTitle}>Tujuan Strategis</h2>
                </div>
                <div className={styles.tujuanGrid}>
                    {data.tujuan?.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 + 0.4, duration: 0.4 }}
                            className={styles.tujuanCard}
                        >
                            <span className={styles.tujuanCheck}>✓</span>
                            <span className={styles.tujuanText}>{t}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}


