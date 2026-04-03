import { motion } from 'framer-motion'
import styles from './RoadmapView.module.css'

export default function RoadmapView({ data }) {
    if (!data || !data.phases) return (
        <div className={styles.empty}>Belum ada data roadmap 5 tahun</div>
    )

    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.title}
            >
                🗺️ Peta Jalan & Roadmap Strategis (5 Tahun)
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={styles.subtitle}
            >
                Visi jangka panjang dan target strategis pengembangan institusi.
            </motion.p>

            <div className={styles.roadmapLine}>
                {data.phases.map((phase, i) => (
                    <motion.div
                        key={i}
                        className={styles.phaseNode}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + 0.2 }}
                    >
                        <div className={styles.dot} />
                        <div className={styles.contentBox}>
                            <div className={styles.phaseHeader}>
                                <span className={styles.phaseName}>{phase.name}</span>
                                <span className={styles.phaseYear}>{phase.year}</span>
                            </div>
                            <h3 className={styles.phaseFocus}>{phase.focus}</h3>
                            <p className={styles.phaseTarget}>{phase.target}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


