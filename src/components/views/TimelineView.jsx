import { motion } from 'framer-motion'
import styles from './TimelineView.module.css'

export default function TimelineView({ data }) {
    if (!data) return null

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Perjalanan Pendidikan</h2>
                <p className={styles.subtitle}>Roadmap transformasi dari hari pertama hingga kelulusan</p>
            </div>

            <div className={styles.timeline}>
                {data.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.timelineItem}
                    >
                        {/* Connector Line */}
                        {i < data.length - 1 && <div className={styles.connector} style={{ '--color': item.color }} />}

                        {/* Year Node */}
                        <div className={styles.yearNode} style={{ '--color': item.color }}>
                            <span className={styles.yearLabel}>{item.label}</span>
                        </div>

                        {/* Content Card */}
                        <div className={styles.card} style={{ '--color': item.color }}>
                            <div className={styles.cardHeader}>
                                <div className={styles.phaseNum} style={{ color: item.color }}>Phase {item.year}</div>
                                <h3 className={styles.phase}>{item.phase}</h3>
                            </div>

                            <div className={styles.semesters}>
                                {item.semesters?.map((s, si) => (
                                    <div key={si} className={styles.semester}>
                                        <span className={styles.semDot} style={{ background: item.color }} />
                                        <span>{s}</span>
                                    </div>
                                ))}
                            </div>

                            {item.output_tags?.length > 0 && (
                                <div className={styles.outputSection}>
                                    <span className={styles.outputLabel}>Output Lulusan:</span>
                                    <div className={styles.tags}>
                                        {item.output_tags.map((tag, ti) => (
                                            <span key={ti} className={styles.tag} style={{ '--color': item.color }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


