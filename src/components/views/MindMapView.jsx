import { motion } from 'framer-motion'
import styles from './MindMapView.module.css'

export default function MindMapView({ data }) {
    if (!data) return null

    return (
        <div className={styles.container}>
            {/* School Name Center */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={styles.centerNode}
            >
                <div className={styles.centerIcon}>🏫</div>
                <div className={styles.centerName}>{data.school_name}</div>
                <div className={styles.centerSub}>Blueprint Pendidikan</div>
            </motion.div>

            {/* Pillars */}
            <div className={styles.pillarsLabel}>Pilar Keunggulan</div>
            <div className={styles.pillarsGrid}>
                {data.pillars?.map((pillar, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.pillarCard}
                        style={{ '--pillar-color': pillar.color }}
                        whileHover={{ y: -4, scale: 1.02 }}
                    >
                        <div className={styles.pillarIconWrap}>
                            <span className={styles.pillarIcon}>{pillar.icon}</span>
                        </div>
                        <div className={styles.pillarContent}>
                            <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                            <p className={styles.pillarDesc}>{pillar.desc}</p>
                        </div>
                        <div className={styles.pillarNum}>{String(i + 1).padStart(2, '0')}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


