import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CoreSkillsView.module.css'

export default function CoreSkillsView({ data }) {
    const [selected, setSelected] = useState(null)

    if (!data) return null

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>9 Core Skills Alumni</h2>
                <p className={styles.subtitle}>Klik pada kartu untuk melihat detail kemampuan</p>
            </div>

            <div className={styles.grid}>
                {data.map((skill, i) => (
                    <motion.button
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 + 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`${styles.skillCard} ${selected?.id === skill.id ? styles.skillActive : ''}`}
                        onClick={() => setSelected(selected?.id === skill.id ? null : skill)}
                        id={`skill-card-${skill.id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className={styles.skillIcon}>{skill.icon}</div>
                        <div className={styles.skillNum}>{String(skill.id).padStart(2, '0')}</div>
                        <div className={styles.skillLabel}>{skill.label}</div>
                    </motion.button>
                ))}
            </div>

            {/* Detail Panel */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3 }}
                        className={styles.detail}
                    >
                        <div className={styles.detailIcon}>{selected.icon}</div>
                        <div className={styles.detailContent}>
                            <h3 className={styles.detailTitle}>{selected.label}</h3>
                            <p className={styles.detailSub}>{selected.sub}</p>
                        </div>
                        <button
                            className={styles.detailClose}
                            onClick={() => setSelected(null)}
                        >✕</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


