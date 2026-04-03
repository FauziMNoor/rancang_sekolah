import { motion } from 'framer-motion'
import styles from './KurikulumView.module.css'

export default function KurikulumView({ data }) {
    if (!data || data.length === 0) return (
        <div className={styles.empty}>Belum ada data struktur kurikulum</div>
    )

    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.title}
            >
                📚 Struktur Kurikulum & Mata Pelajaran
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={styles.subtitle}
            >
                Pembagian kelompok mata pelajaran dan persentase porsinya dalam kegiatan belajar mengajar.
            </motion.p>

            {/* Visualisasi Bar Persentase */}
            <motion.div
                className={styles.progressBarWrapper}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
            >
                {data.map((cat, i) => (
                    <div
                        key={i}
                        className={styles.progressSegment}
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color || 'var(--accent-blue)' }}
                        title={`${cat.category}: ${cat.percentage}%`}
                    >
                        {cat.percentage >= 15 && <span className={styles.progressLabel}>{cat.percentage}%</span>}
                    </div>
                ))}
            </motion.div>

            {/* Grid Kategori Mata Pelajaran */}
            <div className={styles.grid}>
                {data.map((cat, i) => (
                    <motion.div
                        key={i}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        style={{ borderTopColor: cat.color || 'var(--border-subtle)' }}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{cat.category}</h3>
                            <span className={styles.cardPercent} style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                                {cat.percentage}%
                            </span>
                        </div>
                        <ul className={styles.subjectList}>
                            {cat.subjects?.map((sub, j) => (
                                <li key={j} className={styles.subjectItem}>
                                    <span className={styles.bullet} style={{ backgroundColor: cat.color }}></span>
                                    {sub}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


